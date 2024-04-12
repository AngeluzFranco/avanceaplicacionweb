import React, { useState, useEffect } from 'react';
import { Button, Table, Spinner, Modal, Label, FloatingLabel } from 'flowbite-react';
import CloseIcon from '@mui/icons-material/Close';

import './menu.css';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';

// SELECT CREAR MENU 
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import { API_BASE_URL } from '../backend.js';
import{useNavigate} from 'react-router-dom';


function VistaMenu() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/menus/`, {
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


    // CREAR MENU   
    const resetForm = () => {
        setNombre('');
        setDescripcion('');
        setPlatilloName([]);
    };

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const crearMenu = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/menus/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion,

            })
        });

        if (!response.ok) {
            throw new Error('Hubo un error en la petición');
        }

        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData.data.idMenu; // Asume que el ID del platillo se devuelve en la propiedad idPlatillo
    };

    //   GUARDAR LOS PLATILLOS DEL MENU 
    const asignarPlatillos = async (idMenu, platillosSeleccionados) => {
        await Promise.all(platillosSeleccionados.map(async (platillo) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/platillo/${platillo.idPlatillo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    nombre: platillo.nombre,
                    categoria: platillo.categoria,
                    precio: platillo.precio,
                    estado: platillo.estado,
                    menu: {
                        idMenu: idMenu
                    }
                })
            });

            if (!response.ok) {
                throw new Error('Hubo un error en la petición');
            }
        }));
    };



    // MOSTRAR PLATILLOS    
    const [PlatilloName, setPlatilloName] = React.useState([]);
    const [platillos, setPlatillos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${API_BASE_URL}/platillo/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setPlatillos(data.data))
            .catch(error => console.error(error));
    }, []);

    // QUITAR PLATILLO TACHE
    const handleRemove = (platillo) => {
        setPlatilloName(PlatilloName.filter(i => i.idPlatillo !== platillo.idPlatillo));
    };




    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        // value es un array de ingredientes seleccionados
        const selectedPlatillos = value;

        // Crear una copia del estado actual de IngredienteName
        let newPlatilloName = [...PlatilloName];

        // Iterar sobre los ingredientes seleccionados
        for (let platillo of selectedPlatillos) {
            // Si el ingrediente no está en newPlatilloName, agregarlo
            if (!newPlatilloName.some(i => i.idPlatillo === platillo.idPlatillo)) {
                newPlatilloName.push(platillo);
            }
        }

        // Filtrar newPlatilloName para eliminar los ingredientes que no están en selectedIngredients
        newPlatilloName = newPlatilloName.filter(i => selectedPlatillos.some(si => si.idPlatillo === i.idPlatillo));

        // Establecer IngredienteName a newPlatilloName
        setPlatilloName(newPlatilloName);
    };


    //MOSTRAR INFORMACION DEL MENU
    const [platilloData, setPlatilloData] = useState(null);
    const [menuData, setMenuData] = useState(null);

    const fetchPlatilloData = async (idMenu) => {
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
        const platillosDelMenu = jsonData.data.filter(platillo => platillo.menu && platillo.menu.idMenu === idMenu);
        setPlatilloData(platillosDelMenu);
        // Establece los platillos del menú como los platillos seleccionados
        setPlatilloName(platillosDelMenu);

        platillosOriginales = platillosDelMenu;
    };

    const fetchMenuData = async (idMenu) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/menus/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Hubo un error en la petición');
            }
            const jsonData = await response.json();
            const menu = jsonData.data.find(menu => menu.idMenu === idMenu);
            setMenuData(menu);
        } catch (error) {
            console.error('Error fetching menu data:', error);
        }
    };

    //ELIMINAR MENU
    const MenuDelete = async (idMenu) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/menus/${idMenu}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Hubo un error en la petición');
        }
        // Aquí puedes actualizar tu estado o refetch los datos para reflejar la eliminación
    };

    const updatePlatillos = async (idMenu) => {
        const token = localStorage.getItem('token');
        const platillos = Array.isArray(platilloData) ? platilloData.reduce((acc, platillo) => {
            if (platillo.menu && platillo.menu.idMenu === idMenu) {
                acc.push(platillo);
            }
            return acc;
        }, []) : [];
        for (let platillo of platillos) {
            const response = await fetch(`${API_BASE_URL}/platillo/${platillo.idPlatillo}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...platillo,
                    menu: null
                })
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Hubo un error en la petición');
            }
        }
    };

    const handleDelete = async (idMenu) => {
        try {
            await fetchMenuData(idMenu);
            await updatePlatillos(idMenu); // Actualiza los platillos primero
            // Agrega un retraso de 1 segundo (1000 milisegundos)
            const deleteResponse = await MenuDelete(idMenu); // Luego elimina el menú
            return deleteResponse;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };


    // ACTUALIZAR MENU
    let platillosOriginales = [];


    const onEditButtonClick = async (idMenu) => {
        // Obtiene los datos del menú y los platillos de la API
        await fetchMenuData(idMenu);
        await fetchPlatilloData(idMenu);
        // Abre el modal
        setactualizarModal(true);
    }

    const actualizarMenu = async (idMenu) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/menus/${idMenu}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion,
            })
        });

        if (!response.ok) {
            throw new Error('Hubo un error en la petición');
        }

        const jsonData = await response.json();
        console.log(jsonData);


        return jsonData.data.idMenu; // Asume que el ID del menú se devuelve en la propiedad idMenu



    };

    useEffect(() => {
        if (menuData) {
            setNombre(menuData.nombre);
            setDescripcion(menuData.descripcion);
        }
    }, [menuData]);


    //PDF
    const handleDownloadClick = (menuId) => {
        navigate(`/download-page/${menuId}`);
    };














    const [showSpinner, setShowSpinner] = useState(false);

    const [actualizarModal, setactualizarModal] = useState(false);
    const actualizarClose = () => setactualizarModal(false);

    const [crearModal, setcrearModal] = React.useState(false);
    const crearClose = () => setcrearModal(false);

    const [mostrarOpen, setmostrarOpen] = useState(false);
    const mostrarClose = () => setmostrarOpen(false);

    return (
        <div className="h-screen " >
            <div className="container-table flex items-center justify-center flex-wrap">
                <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-2xl" style={{ width: "60%", border: 'solid 1px #ebebeb' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Menus disponibles</h1>
                        <Button onClick={() => { setcrearModal(true); resetForm(); }} className="agregar">Agregar</Button>
                    </div>

                    <div className=' overflow-y-auto divScroll' style={{ maxHeight: '65vh' }}>
                        <Table>
                            <Table.Head style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                                <Table.HeadCell className="border-r border-b border-gray-300 text-center">#</Table.HeadCell>
                                <Table.HeadCell className="border-r border-b border-gray-300 text-center">Nombre</Table.HeadCell>
                                <Table.HeadCell className="border-r border-b border-gray-300 text-center">Descripcion</Table.HeadCell>
                                <Table.HeadCell className="border-b border-gray-300">
                                    <span className="sr-only">Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {data && data.map((item, index) => (

                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell key={item.idMenu} className="text-center border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {index + 1}
                                        </Table.Cell>
                                        <Table.Cell className='text-center border-r border-gray-300'>{item.nombre}</Table.Cell>
                                        <Table.Cell className='text-center border-r border-gray-300'>{item.descripcion}</Table.Cell>
                                        <Table.Cell className='text-center' style={{ width: '20%' }}>
                                            <Stack direction="row" spacing={0} className='flex items-center justify-center'>
                                                <IconButton aria-label="VisibilityIcon" sx={{ color: '#000000' }} onClick={() => {
                                                    fetchPlatilloData(item.idMenu);
                                                    fetchMenuData(item.idMenu);
                                                    setmostrarOpen(true);
                                                }}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton aria-label="DeleteIcon" sx={{ color: '#000000' }} onClick={async () => {
                                                    await handleDelete(item.idMenu);
                                                    await fetchData();
                                                }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => onEditButtonClick(item.idMenu)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="DownloadIcon" sx={{ color: '#000000' }} onClick={() => handleDownloadClick(item.idMenu)}>
                                                    <DownloadIcon />
                                                </IconButton>
                                            </Stack>
                                            {showSpinner && <Spinner aria-label="Default status example" />}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>

                </div>
            </div>

            {/* MODAL ACTUALIZAR MENU  */}
            <Modal show={actualizarModal} onClose={actualizarClose} size="4xl">
                <Modal.Header>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">Actualiza tu menú</h2>
                </Modal.Header>
                <Modal.Body>

                    <div className="space-y-4">
                        <div className="flex justify-between gap-4">
                            <div className='w-1/3'>
                                <FloatingLabel
                                    variant="outlined"
                                    label="Nombre"
                                    className='text-base'
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div className='w-2/3'>
                                <FloatingLabel
                                    variant="outlined"
                                    label="Descripción"
                                    className='text-base'
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between gap-4">
                            <div className="w-full lg:w-2/3 p-4 h-64" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }} >
                                <FormControl className='w-full'>
                                    <InputLabel id="demo-multiple-checkbox-label">Platillos</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={PlatilloName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Platillos" />}
                                        renderValue={(selected) => selected.map(platillo => platillo.nombre).join(', ')}
                                        MenuProps={MenuProps}
                                        className='mb-3'
                                    >
                                        {platillos.map((platillo) => (
                                            <MenuItem key={platillo.idPlatillo} value={platillo}>
                                                <Checkbox
                                                    checked={PlatilloName.some(i => i.idPlatillo === platillo.idPlatillo)}
                                                />
                                                <ListItemText primary={platillo.nombre} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className="mt-2 flex flex-wrap gap-2 overflow-y-auto max-h-36 divScroll">
                                    {PlatilloName.map((platillo) => (
                                        <div key={platillo.idPlatillo} className="relative m-1">
                                            <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                                <span className="text-sm font-medium text-gray-700">{platillo.nombre}</span>
                                                <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none" onClick={() => handleRemove(platillo)}>
                                                    <CloseIcon />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                            <div className="w-64">
                                <Label htmlFor="ingredientesNoDisponibles" className="mb-2 text-red-500 flex justify-center w-full">Platillos no disponibles</Label>
                                <div className='pb-4 px-2 pt-2' style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }}>
                                    <div className=" rounded  text-center">
                                        <div className="grid grid-cols-1 gap-2 mt-0 overflow-y-auto divScroll" style={{ maxHeight: 200 }}>
                                            <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Pescado empanizado</span>
                                            <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chilaquiles</span>
                                            <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Salmón a la plancha</span>
                                            <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Pescado empanizado</span>
                                            <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chilaquiles</span>
                                            <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Salmón a la plancha</span>

                                        </div>
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
                            className='w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800'
                            onClick={async () => {
                                await actualizarMenu(menuData.idMenu); // Asume que el ID del menú se almacena en menuData.idMenu
                                await asignarPlatillos(menuData.idMenu, PlatilloName);


                                fetchData();
                                actualizarClose();
                            }}
                        >
                            Actualizar
                        </Button>

                    </div>
                </Modal.Footer>
            </Modal>

            {/* MODAL CREAR MENU */}
            <Modal show={crearModal} onClose={crearClose} size="4xl">
                <Modal.Header>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">Crea tu menú</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <div className="flex justify-between gap-4">
                            <div className='w-1/3'>
                                <FloatingLabel variant="outlined" label="Nombre" className='text-base' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className='w-2/3'>
                                <FloatingLabel variant="outlined" label="Descripcion" className='text-base' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                            </div>



                        </div>

                        <div className="flex justify-between gap-4">
                            <div className="w-full lg:w-2/3 p-4 h-64" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }} >
                                <FormControl className='w-full'>
                                    <InputLabel id="demo-multiple-checkbox-label">Platillos</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={PlatilloName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Platillos" />}
                                        renderValue={(selected) => selected.map(platillo => platillo.nombre).join(', ')}
                                        MenuProps={MenuProps}
                                        className='mb-3'
                                    >
                                        {platillos.map((platillo) => (
                                            <MenuItem key={platillo.idPlatillo} value={platillo}>
                                                <Checkbox
                                                    checked={PlatilloName.some(i => i.idPlatillo === platillo.idPlatillo)}
                                                />
                                                <ListItemText primary={platillo.nombre} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className="mt-2 flex flex-wrap gap-2 overflow-y-auto max-h-36 divScroll">
                                    {PlatilloName.map((platillo) => (
                                        <div key={platillo.idPlatillo} className="relative m-1">
                                            <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                                <span className="text-sm font-medium text-gray-700">{platillo.nombre}</span>
                                                <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none" onClick={() => handleRemove(platillo)}>
                                                    <CloseIcon />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>
                            <div className="w-64">
                                <Label htmlFor="ingredientesNoDisponibles" className="mb-2 text-red-500 flex justify-center w-full">Platillos no disponibles</Label>
                                <div className='pb-4 px-2 pt-2' style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }}>
                                    <div className=" rounded  text-center">
                                        <div className="grid grid-cols-1 gap-2 mt-0 overflow-y-auto divScroll" style={{ maxHeight: 200 }}>
                                            <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Pescado empanizado</span>
                                            <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chilaquiles</span>
                                            <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Salmón a la plancha</span>
                                            <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Pescado empanizado</span>
                                            <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chilaquiles</span>
                                            <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Salmón a la plancha</span>

                                        </div>
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
                            className='w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800'
                            onClick={async () => {
                                const idMenu = await crearMenu();
                                await asignarPlatillos(idMenu, PlatilloName);
                                resetForm();
                                setcrearModal(false);
                                fetchData();
                            }}
                        >
                            Crear
                        </Button>

                    </div>
                </Modal.Footer>
            </Modal>

            {/* MODAL MOSTRAR MENU */}
            <Modal show={mostrarOpen} onClose={mostrarClose} size="7xl">
                <Modal.Header>
                    <h2 className="text-2xl text-center">Información del menú “{menuData?.nombre}”</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <div className="border p-4 rounded">
                            <h3 className="text-lg mb-0" style={{ color: '#005D48' }}>Descripción</h3>
                            <div className="p-4 border rounded">
                                <p>{menuData?.descripcion}</p>
                            </div>
                            <h3 className="text-2xl mt-4 text-center p-5" style={{ color: '#005D48' }}>Platillos</h3>
                            <div className="grid grid-cols-3  gap-4 mt-2 overflow-y-auto max-h-72 min-h-72 divScroll">
                                {platilloData?.map(platillo => (
                                    <div className="p-6 m-3 h-28 rounded fondoVerde text-center divScroll overflow-y-auto" key={platillo.idPlatillo}>
                                        <p className='p-1'>Nombre: {platillo.nombre}</p>
                                        <p className='p-1'>Precio: ${platillo.precio}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                  
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default VistaMenu;