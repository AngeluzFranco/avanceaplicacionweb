import React, { useState, useEffect } from 'react';

import { Button, Table, Modal, Label, Select as SelectFlow, FloatingLabel } from 'flowbite-react';
import CloseIcon from '@mui/icons-material/Close';
import './platillos.css'


import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

// SELECT CREAR PLATILLO
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import { API_BASE_URL } from '../backend.js';
import Swal from 'sweetalert2';


function VistaPlatillos() {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/platillo/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Hubo un error en la petición');
            }
            const jsonData = await response.json();
            setData(jsonData.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = [
        'Cilantro',
        'Ajo',
        'Cebolla',
        'Tomate',
        'Chile',
        'Pescado',
        'Salmón',
        'Zanahoria',
    ];

    // CREAR PLATILLO 
    const resetForm = () => {
        setNombre('');
        setPrecio('');
        setCategoria('');
        setIngredienteName([]);
        setCantidades({});
    };

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');

    const crearPlatillo = async () => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¿Deseas crear este platillo?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, crear platillo'
            });

            if (result.isConfirmed) {
                // Usuario confirmó, procede con la creación del platillo
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_BASE_URL}/platillo/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        nombre: nombre,
                        categoria: categoria,
                        precio: precio
                    })
                });

                if (!response.ok) {
                    throw new Error('Hubo un error en la petición');
                }

                const jsonData = await response.json();
                console.log(jsonData);
                Swal.fire({
                    title: 'Creado!',
                    text: 'El platillo ha sido creado exitosamente.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 800
                });
                return jsonData.data.idPlatillo; // Asume que el ID del platillo se devuelve en la propiedad idPlatillo
            }
        } catch (error) {
            console.error(error);
            // Muestra una alerta de error si algo sale mal
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al crear el platillo. Por favor, inténtalo de nuevo.'
            });
        }
    };

    const [cantidades, setCantidades] = useState({});

    //   GUARDAR LOS INGREDIENTES DEL PLATILLO 
    const asignarIngredientes = async (idPlatillo, ingredientes) => {
        await Promise.all(ingredientes.map(async (ingrediente) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/platilloingredientes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    cantidad: cantidades[ingrediente.idIngrediente] || 1, // Usar cantidades
                    platillo: {
                        idPlatillo: idPlatillo
                    },
                    ingrediente: {
                        idIngrediente: ingrediente.idIngrediente // Asume que ingrediente es el ID del ingrediente
                    }
                })
            });

            if (!response.ok) {
                throw new Error('Hubo un error en la petición');
            }
        }));
    };

    const handleQuantityChange = (ingrediente, cantidad) => {
        // Si cantidad es una cadena vacía, permitir que el valor del input sea vacío
        // De lo contrario, convertir cantidad a un número y usar 1 como valor por defecto
        const newCantidad = cantidad === '' ? '' : Number(cantidad) || 1;

        // Actualizar cantidades
        setCantidades(prev => ({ ...prev, [ingrediente.idIngrediente]: newCantidad }));
    };

    // MOSTRAR INGREDIENTES
    const [IngredienteName, setIngredienteName] = React.useState([]);
    const [ingredientes, setIngredientes] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${API_BASE_URL}/ingredientes/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setIngredientes(data.data))
            .catch(error => console.error(error));
    }, []);

    // QUITAR INGREDIENTE TACHE
    const handleRemove = (ingrediente) => {
        setIngredienteName(IngredienteName.filter(i => i.idIngrediente !== ingrediente.idIngrediente));
    };

    // SELECCIONAR CATEGORIA 
    const [categoria, setCategoria] = useState('');

    const cambioCategoria = (event) => {
        setCategoria(event.target.value);
    };


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        // value es un array de ingredientes seleccionados
        const selectedIngredients = value;

        // Crear una copia del estado actual de IngredienteName
        let newIngredienteName = [...IngredienteName];

        // Iterar sobre los ingredientes seleccionados
        for (let ingrediente of selectedIngredients) {
            // Si el ingrediente no está en newIngredienteName, agregarlo
            if (!newIngredienteName.some(i => i.idIngrediente === ingrediente.idIngrediente)) {
                newIngredienteName.push(ingrediente);

                // Establecer un valor inicial para la cantidad del nuevo ingrediente en cantidades
                setCantidades(prev => ({ ...prev, [ingrediente.idIngrediente]: 1 }));
            }
        }

        // Filtrar newIngredienteName para eliminar los ingredientes que no están en selectedIngredients
        newIngredienteName = newIngredienteName.filter(i => selectedIngredients.some(si => si.idIngrediente === i.idIngrediente));

        // Establecer IngredienteName a newIngredienteName
        setIngredienteName(newIngredienteName);
    };

    // VER INFORMACION DEL PLATILLO
    const [selectedPlatillo, setSelectedPlatillo] = useState(null);

    const [selectedIngredients, setSelectedIngredients] = useState([]);


    useEffect(() => {
        if (selectedPlatillo) {
            const token = localStorage.getItem('token');
            fetch(`${API_BASE_URL}/platillo/${selectedPlatillo.idPlatillo}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setSelectedIngredients(data.data.platilloIngredienteBean);
                    setIngredienteName(data.data.platilloIngredienteBean); // inicializar IngredienteName
                })
                .catch(error => console.error(error));
        }
    }, [selectedPlatillo]);

    useEffect(() => {
        if (selectedPlatillo) {
            const token = localStorage.getItem('token');
            fetch(`${API_BASE_URL}/ingredientes/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    const ingredientsForSelectedPlatillo = data.data.filter(ingrediente =>
                        ingrediente.platilloIngredienteBean.some(platilloIngrediente => platilloIngrediente.platillo.idPlatillo === selectedPlatillo.idPlatillo)
                    );
                    setSelectedIngredients(ingredientsForSelectedPlatillo);

                })
                .catch(error => console.error(error));
        }
    }, [selectedPlatillo]);





    const handleOpenModal = (platillo) => {
        // Actualizar el platillo seleccionado
        setSelectedPlatillo(platillo);

        // Abrir el modal
        setmostrarOpen(true);
    };







    // ACTUALIZAR PLATILLO


    // quitar ingrediente tache
    const handleRemoveUp = (ingrediente) => {
        setIngredienteNameUp(IngredienteNameUp.filter(i => i.idIngrediente !== ingrediente.idIngrediente));
    };

    const [IngredienteNameUp, setIngredienteNameUp] = React.useState([]);

    const handleOpenUpdateModal = (platillo) => {
        // Actualizar el platillo seleccionado
        setSelectedPlatillo(platillo);

        // Inicializar los estados con los valores actuales del platillo
        setNombre(platillo.nombre);
        setCategoria(platillo.categoria);
        setPrecio(platillo.precio);

        // Cargar los ingredientes del platillo
        loadPlatilloIngredientes(platillo);

        // Abrir el modal de actualización
        setactualizarOpen(true);
    };

    const [platillos, setPlatillos] = useState([]);

    const cargarDatos = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/platillo/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const platillos = await response.json();
            setPlatillos(platillos);
        } else {
            console.error('Algo salió mal al cargar los platillos');
        }
    };



const actualizarPlatillo = async () => {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas actualizar este platillo?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar platillo'
    });

    if (result.isConfirmed) {
        const platilloActualizado = {
            nombre: nombre,
            categoria: categoria,
            precio: precio,
            ingredientes: IngredienteNameUp.map(ingrediente => ({
                idIngrediente: ingrediente.idIngrediente,
                cantidad: cantidades[ingrediente.idIngrediente] || 1
            }))
        };

        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/platillo/${selectedPlatillo.idPlatillo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(platilloActualizado)
        });

        if (response.ok) {
            // Si la respuesta es exitosa, cierra el modal y recarga los datos
            setactualizarOpen(false);
            Swal.fire({
                title: '¡Actualizado!',
                text:  'El platillo ha sido actualizado exitosamente.',
                icon: 'success',
                showConfirmButton: false,
                timer: 800
              });
            cargarDatos();
        } else {
            // Si algo salió mal, muestra un mensaje de error
            console.error('Algo salió mal al actualizar el platillo');
        }

        // Enviar los ingredientes actualizados a la URL proporcionada
        for (const ingrediente of platilloActualizado.ingredientes) {
            const platilloIngrediente = selectedPlatillo.platilloIngredienteBean.find(i => i.ingrediente.idIngrediente === ingrediente.idIngrediente);
            const ingredienteActualizado = {
                idPlatilloIngrediente: platilloIngrediente?.idPlatilloIngrediente,
                cantidad: ingrediente.cantidad,
                platillo: {
                    idPlatillo: selectedPlatillo.idPlatillo
                },
                ingrediente: {
                    idIngrediente: ingrediente.idIngrediente
                }
            };

            const method = platilloIngrediente ? 'PUT' : 'POST';
            const url = platilloIngrediente ? `${API_BASE_URL}/platilloingredientes/${ingredienteActualizado.idPlatilloIngrediente}` : `${API_BASE_URL}/platilloingredientes/`;

            const ingredientesResponse = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(ingredienteActualizado)
            });

            if (!ingredientesResponse.ok) {
                // Si algo salió mal, muestra un mensaje de error
                console.error('Algo salió mal al actualizar los ingredientes del platillo');
            }
        }

        // Eliminar los ingredientes que ya no están presentes
        for (const platilloIngrediente of selectedPlatillo.platilloIngredienteBean) {
            if (!platilloActualizado.ingredientes.find(i => i.idIngrediente === platilloIngrediente.ingrediente.idIngrediente)) {
                const ingredientesResponse = await fetch(`${API_BASE_URL}/platilloingredientes/${platilloIngrediente.idPlatilloIngrediente}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!ingredientesResponse.ok) {
                    // Si algo salió mal, muestra un mensaje de error
                    console.error('Algo salió mal al eliminar el ingrediente del platillo');
                }
            }
        }
        fetchData();
    }
};

    const loadPlatilloIngredientes = async (platillo) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/ingredientes/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            // Filtrar los ingredientes que pertenecen al platillo seleccionado
            const platilloIngredientes = data.data.filter(ingrediente =>
                ingrediente.platilloIngredienteBean.some(platilloIngrediente => platilloIngrediente.platillo.idPlatillo === platillo.idPlatillo)
            );
            setIngredienteNameUp(platilloIngredientes);

            // Inicializar cantidades con las cantidades de los ingredientes del platillo seleccionado
            const newCantidades = {};
            for (let ingrediente of platilloIngredientes) {
                for (let platilloIngrediente of ingrediente.platilloIngredienteBean) {
                    if (platilloIngrediente.platillo.idPlatillo === platillo.idPlatillo) {
                        newCantidades[ingrediente.idIngrediente] = platilloIngrediente.cantidad;
                        break;
                    }
                }
            }
            setCantidades(newCantidades);
        } else {
            console.error('Hubo un error al obtener los ingredientes del platillo');
        }
    };

    const handleUpdateChange = (event) => {
        const {
            target: { value },
        } = event;

        // value is an array of selected ingredients
        const selectedIngredients = value;

        // Create a copy of the current state of IngredienteName
        let newIngredienteName = [...IngredienteNameUp];

        // Iterate over the selected ingredients
        for (let ingrediente of selectedIngredients) {
            // If the ingredient is not in newIngredienteName, add it
            if (!newIngredienteName.some(i => i.idIngrediente === ingrediente.idIngrediente)) {
                newIngredienteName.push(ingrediente);
            }
        }

        // Filter newIngredienteName to remove the ingredients that are not in selectedIngredients
        newIngredienteName = newIngredienteName.filter(i => selectedIngredients.some(si => si.idIngrediente === i.idIngrediente));

        // Set IngredienteName to newIngredienteName
        setIngredienteNameUp(newIngredienteName);

        // After IngredienteNameUp is updated, then update cantidades
        const newCantidades = { ...cantidades };
        for (let ingrediente of newIngredienteName) {
            if (!selectedIngredients.some(i => i.idIngrediente === ingrediente.idIngrediente)) {
                delete newCantidades[ingrediente.idIngrediente];
            } else if (!cantidades[ingrediente.idIngrediente]) {
                // Set an initial value for the quantity of the new ingredient in cantidades
                newCantidades[ingrediente.idIngrediente] = 1;
            }
        }
        setCantidades(newCantidades);
    };


    // ELIMINAR PLATILLO 
    const loadPlatilloIngredientesDelete = async (platillo) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/ingredientes/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            // Filtrar los ingredientes que pertenecen al platillo seleccionado
            const platilloIngredientes = data.data.filter(ingrediente =>
                ingrediente.platilloIngredienteBean.some(platilloIngrediente => platilloIngrediente.platillo.idPlatillo === platillo.idPlatillo)
            );
            return platilloIngredientes;
        } else {
            console.error('Hubo un error al obtener los ingredientes del platillo');
            return [];
        }
    };




    const [mostrarOpen, setmostrarOpen] = useState(false);
    const closeModal = () => setmostrarOpen(false);

    const [actualizarOpen, setactualizarOpen] = useState(false);
    const handleClose = () => setactualizarOpen(false);

    const [crearOpen, setcrearOpen] = useState(false);

    return (
        <div className="h-screen">
            <div className="container-table flex items-center justify-center flex-wrap">
                <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-2xl" style={{ width: "60%", border: 'solid 1px #ebebeb' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Lista de platillos</h1>
                        <Button onClick={() => { setcrearOpen(true); resetForm(); }} className="agregar">Agregar</Button>
                    </div>

                    <div className=' overflow-y-auto divScroll' style={{ maxHeight: '65vh' }}>
                        <Table>
                            <Table.Head style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                                <Table.HeadCell className='text-center border-r border-b border-gray-300'>#</Table.HeadCell>
                                <Table.HeadCell className="text-center border-r border-b border-gray-300">Nombre</Table.HeadCell>
                                <Table.HeadCell className="text-center border-r border-b border-gray-300">Categoria</Table.HeadCell>
                                <Table.HeadCell className="text-center border-r border-b border-gray-300">Precio</Table.HeadCell>
                                <Table.HeadCell className="text-center border-b border-gray-300">
                                    <span className="sr-only">Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {data && data.map((item, index) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="text-center border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {index + 1}
                                        </Table.Cell>
                                        <Table.Cell className="text-center border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {item.nombre}
                                        </Table.Cell>
                                        <Table.Cell className='text-center border-r border-gray-300'>{item.categoria}</Table.Cell>
                                        <Table.Cell className='text-center border-r border-gray-300'>${item.precio}</Table.Cell>
                                        <Table.Cell className='text-center' style={{ width: '17%' }}>
                                            <Stack direction="row" spacing={0} className='flex items-center justify-center'>
                                                <IconButton aria-label="VisibilityIcon" sx={{ color: '#000000' }} onClick={() => handleOpenModal(item)}>
                                                    <VisibilityIcon />
                                                </IconButton>

                                                <IconButton
                                                    aria-label="delete"
                                                    sx={{ color: '#000000' }}
                                                    onClick={async () => {
                                                        const result = await Swal.fire({
                                                            title: '¿Estás seguro?',
                                                            text: '¿Deseas eliminar este platillo?',
                                                            icon: 'question',
                                                            showCancelButton: true,
                                                            confirmButtonColor: '#3085d6',
                                                            cancelButtonColor: '#d33',
                                                            confirmButtonText: 'Sí, eliminar platillo'
                                                        });

                                                        if (result.isConfirmed) {
                                                            const token = localStorage.getItem('token');

                                                            // Primero, obtener los ingredientes del platillo
                                                            const platilloIngredientes = await loadPlatilloIngredientesDelete(item);

                                                            // Luego, eliminar cada ingrediente del platillo
                                                            for (const ingrediente of platilloIngredientes) {
                                                                for (const platilloIngrediente of ingrediente.platilloIngredienteBean) {
                                                                    if (platilloIngrediente.platillo.idPlatillo === item.idPlatillo) {
                                                                        const deleteIngredientResponse = await fetch(`${API_BASE_URL}/platilloingredientes/${platilloIngrediente.idPlatilloIngrediente}`, {
                                                                            method: 'DELETE',
                                                                            headers: {
                                                                                'Authorization': `Bearer ${token}`
                                                                            }
                                                                        });

                                                                        if (!deleteIngredientResponse.ok) {
                                                                            console.error('Algo salió mal al eliminar un ingrediente del platillo');
                                                                            return;
                                                                        }
                                                                    }
                                                                }
                                                            }

                                                            // Finalmente, eliminar el platillo
                                                            const deletePlatilloResponse = await fetch(`${API_BASE_URL}/platillo/${item.idPlatillo}`, {
                                                                method: 'DELETE',
                                                                headers: {
                                                                    'Authorization': `Bearer ${token}`
                                                                }
                                                            });

                                                            if (deletePlatilloResponse.ok) {
                                                                console.log("Se elimino correctamente")
                                                                Swal.fire({
                                                                    title: 'Eliminado!',
                                                                    text:  'El platillo ha sido eliminado exitosamente.',
                                                                    icon: 'success',
                                                                    showConfirmButton: false,
                                                                    timer: 800
                                                                  });
                                                                fetchData();
                                                            } else {
                                                                // Si algo salió mal, muestra un mensaje de error
                                                                console.error('Algo salió mal al eliminar el platillo');
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => handleOpenUpdateModal(item)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Stack>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>

                </div>
            </div>


            {/* MODAL MAS INFORMACION DEL PLATILLO */}
            <Modal show={mostrarOpen} onClose={closeModal} size="6xl">
                <Modal.Header>
                    <h5 className="text-xl font-medium leading-normal text-gray-800 dark:text-white">
                        Información del platillo
                    </h5>
                </Modal.Header>
                <Modal.Body>

                    <div className="space-y-4">
                        <div className="flex justify-content gap-4 ">
                            <div className='w-6/12'>
                                <FloatingLabel variant="outlined" disabled={true} label="Nombre" sizing='sm' className='text-base' value={selectedPlatillo ? selectedPlatillo.nombre : ''} />
                            </div>
                            <div className='w-6/12 text-base'>
                                <label htmlFor="countries" className="block text-xs absolute font-small z-10 p-1   ml-2 mb-3 text-gray-700" style={{ marginTop: -10, backgroundColor: 'white', color: '#898e9a' }}>Categoria</label>
                                <SelectFlow id="countries" disabled={true} style={{ fontSize: 16, height: 52 }} required value={selectedPlatillo ? selectedPlatillo.categoria : ''} >
                                    <option selected disabled >Categoria</option>
                                    <option value="Entrada">Entrada</option>
                                    <option value="Fuerte">Fuerte</option>
                                    <option value="Postre">Postre</option>
                                </SelectFlow>
                            </div >
                            <div className='w-1/12'>
                                <FloatingLabel variant="outlined" disabled={true} label="Precio $" sizing='sm' className='text-base' value={selectedPlatillo ? selectedPlatillo.precio : ''} />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-full  p-4 h-100" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }} >
                                <h3 className="text-3xl mb-3  text-center p-2" style={{ color: '#005D48' }}>Ingredientes</h3>
                                <div className="mt-2 flex flex-wrap gap-2 overflow-y-auto max-h-72 min-h-72 divScroll justify-center">

                                    {selectedIngredients.map(ingrediente => {
                                        const platilloIngrediente = ingrediente.platilloIngredienteBean.find(
                                            platilloIngrediente => platilloIngrediente.platillo.idPlatillo === selectedPlatillo.idPlatillo
                                        );

                                        // Si platilloIngrediente es undefined, retornar null para no renderizar nada
                                        if (!platilloIngrediente) {
                                            return null;
                                        }

                                        return (
                                            <div className="relative m-3">
                                                <input type="number" disabled={true} className="absolute top-[-10px] left-[-15px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} value={platilloIngrediente.cantidad} />
                                                <div className="inline-flex items-center rounded-md bg-gray-100 pl-15 px-10 py-3">
                                                    <span className="text-lg font-medium text-gray-600">{ingrediente.nombre}</span>

                                                </div>
                                            </div>
                                        );
                                    })}








                                </div>

                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* MODAL ACTUALIZAR PLATILLO */}
            <Modal show={actualizarOpen} onClose={handleClose} size="7xl">
                <Modal.Header>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">Actualiza tu platillo</h3>
                </Modal.Header>
                <Modal.Body>

                    <div className="space-y-4">
                        <div className="flex justify-content gap-4">
                            <div className='w-6/12'>
                                <FloatingLabel variant="outlined" label="Nombre" sizing='sm' className='text-base' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className='w-6/12 text-base'>
                                <SelectFlow id="countries" style={{ fontSize: 16, height: 52 }} value={categoria} onChange={cambioCategoria} required>
                                    <option disabled value="">Categoria</option>
                                    <option value="Entrada">Entrada</option>
                                    <option value="Fuerte">Fuerte</option>
                                    <option value="Postre">Postre</option>
                                    <option value="Bebidas">Bebidas</option>
                                </SelectFlow>
                            </div >
                            <div className='w-1/12'>
                                <FloatingLabel variant="outlined" label="Precio $" sizing='sm' className='text-base' value={precio} onChange={(e) => setPrecio(e.target.value)} />
                            </div>



                        </div>


                        <div className="flex justify-between gap-4">
                            <div className="w-full lg:w-4/5 p-4 h-100" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }} >
                                <FormControl className='w-full'>
                                    <InputLabel id="demo-multiple-checkbox-label">Ingredientes</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={IngredienteNameUp} // Cambiado de IngredienteName a IngredienteNameUp
                                        onChange={handleUpdateChange}
                                        input={<OutlinedInput label="Ingredientes" />}
                                        renderValue={(selected) => selected.map(ingrediente => ingrediente.nombre).join(', ')}
                                        MenuProps={MenuProps}
                                        className='mb-3'
                                    >
                                        {ingredientes.map((ingrediente) => (
                                            <MenuItem key={ingrediente.idIngrediente} value={ingrediente}>
                                                <Checkbox
                                                    checked={IngredienteNameUp.some(i => i.idIngrediente === ingrediente.idIngrediente)}
                                                    onChange={handleUpdateChange}
                                                />
                                                <ListItemText primary={ingrediente.nombre} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className="mt-2 flex flex-wrap gap-2 overflow-y-auto max-h-64 min-h-64 divScroll">
                                    {Array.isArray(IngredienteNameUp) && IngredienteNameUp.map((ingrediente) => (
                                        <div key={ingrediente.idIngrediente} className="relative m-3">
                                            <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" onChange={(e) => handleQuantityChange(ingrediente, e.target.value)} value={cantidades[ingrediente.idIngrediente] !== undefined ? cantidades[ingrediente.idIngrediente] : ''} style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                            <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                                <span className="text-lg font-medium text-gray-600">{ingrediente.nombre}</span>
                                                <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none" onClick={() => handleRemoveUp(ingrediente)}>
                                                    <CloseIcon />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>



                            </div>
                            <div className="w-64 p-2" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }}>

                                <Label htmlFor="ingredientesNoDisponiblesName" className="mb-2 text-red-500 flex justify-center w-full">Ingredientes no disponibles</Label>

                                <div className=" rounded  text-center">
                                    <div className="grid grid-cols-1 gap-2 mt-0 overflow-y-auto divScroll" style={{ maxHeight: 320 }}>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Cilantro</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Rabano</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Ajo</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chile</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Ajo</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chile</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Ajo</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chile</span>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button
                            outline
                            className=' w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800'
                            onClick={actualizarPlatillo}
                        >
                            Actualizar
                        </Button>

                    </div>
                </Modal.Footer>
            </Modal>

            {/* MODAL CREAR PLATILLO */}
            <Modal show={crearOpen} onClose={() => setcrearOpen(false)} size="7xl">
                <Modal.Header>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">Crea tu platillo</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <div className="flex justify-content gap-4">
                            <div className='w-6/12'>
                                <FloatingLabel variant="outlined" label="Nombre" sizing='sm' className='text-base' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className='w-6/12 text-base'>
                                <SelectFlow id="countries" style={{ fontSize: 16, height: 52 }} value={categoria} onChange={cambioCategoria} required>
                                    <option disabled value="">Categoria</option>
                                    <option value="Entrada">Entrada</option>
                                    <option value="Fuerte">Fuerte</option>
                                    <option value="Postre">Postre</option>
                                    <option value="Bebidas">Bebidas</option>
                                </SelectFlow>
                            </div >
                            <div className='w-1/12'>
                                <FloatingLabel variant="outlined" label="Precio $" sizing='sm' className='text-base' value={precio} onChange={(e) => setPrecio(e.target.value)} />
                            </div>



                        </div>


                        <div className="flex justify-between gap-4">
                            <div className="w-full lg:w-4/5 p-4 h-100" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }} >
                                <FormControl className='w-full'>
                                    <InputLabel id="demo-multiple-checkbox-label">Ingredientes</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={IngredienteName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Ingredientes" />}
                                        renderValue={(selected) => selected.map(ingrediente => ingrediente.nombre).join(', ')}
                                        MenuProps={MenuProps}
                                        className='mb-3'
                                    >
                                        {ingredientes.map((ingrediente) => (
                                            <MenuItem key={ingrediente.idIngrediente} value={ingrediente}>
                                                <Checkbox
                                                    checked={IngredienteName.some(i => i.idIngrediente === ingrediente.idIngrediente)}
                                                />
                                                <ListItemText primary={ingrediente.nombre} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className="mt-2 flex flex-wrap gap-2 overflow-y-auto max-h-64 min-h-64 divScroll">
                                    {IngredienteName.map((ingrediente) => (
                                        <div key={ingrediente.idIngrediente} className="relative m-3">
                                            <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" onChange={(e) => handleQuantityChange(ingrediente, e.target.value)} value={cantidades[ingrediente.idIngrediente] !== undefined ? cantidades[ingrediente.idIngrediente] : ''} style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                            <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                                <span className="text-lg font-medium text-gray-600">{ingrediente.nombre}</span>
                                                <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none" onClick={() => handleRemove(ingrediente)}>
                                                    <CloseIcon />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>



                            </div>
                            <div className="w-64 p-2" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }}>

                                <Label htmlFor="ingredientesNoDisponiblesName" className="mb-2 text-red-500 flex justify-center w-full">Ingredientes no disponibles</Label>

                                <div className=" rounded  text-center">
                                    <div className="grid grid-cols-1 gap-2 mt-0 overflow-y-auto divScroll" style={{ maxHeight: 320 }}>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Cilantro</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Rabano</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Ajo</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chile</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Ajo</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chile</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Ajo</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chile</span>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button
                            outline
                            className=' w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800'
                            onClick={async () => {
                                const idPlatillo = await crearPlatillo();
                                IngredienteName.forEach(ingrediente => {
                                    console.log(ingrediente.idIngrediente);
                                });
                                await asignarIngredientes(idPlatillo, IngredienteName);

                                setcrearOpen(false);
                                fetchData();
                            }}
                        >
                            Crear
                        </Button>

                    </div>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default VistaPlatillos;
