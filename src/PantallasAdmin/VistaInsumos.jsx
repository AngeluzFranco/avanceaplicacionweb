import React, { useState, useEffect } from 'react';

import { Button, Table, Modal, Select, FloatingLabel } from 'flowbite-react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Swal from 'sweetalert2'; // Importa Swal de sweetalert2

// VALIDACIONES CON FORMIK Y YUP
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { API_BASE_URL } from '../backend.js';

function VistaInsumos() {
    //estado para mostrar todos los insumos en la tabla
    const [data, setData] = useState(null);
    //estado para abrir el modal de crear insumo
    const [crearOpen, setcrearOpen] = React.useState(false);
    //funcion para cerrar el modal de crear insumo
    const handleClose = () => setcrearOpen(false);
    //estado para abrir el modal de actualizar insumo
    const [actualizarOpen, setActualizarOpen] = React.useState(false);
    //estado para cerrar el modal de actualizar insumo
    const actualizarClose = () => setActualizarOpen(false);
    // Estado para almacenar la información del insumo seleccionado para actualizar
    const [selectedInsumo, setSelectedInsumo] = useState(null);

    //funcion para obtener todos los insumos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/ingredientes/`);
                if (!response.ok) {
                    throw new Error('Hubo un error en la petición');
                }
                const jsonData = await response.json();
                setData(jsonData.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    //funcion para crear un insumo
    const handleCreateSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const confirmResult = await Swal.fire({
                title: '¿Estás seguro de crear este insumo?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, crear',
                cancelButtonText: 'Cancelar'
            });
            if (confirmResult.isConfirmed) {
                const response = await fetch(`${API_BASE_URL}/ingredientes/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });
                if (!response.ok) {
                    if (response.status === 409) {
                        throw new Error('El insumo ya existe');
                    } else {
                        throw new Error('Hubo un error al crear el insumo');
                    }
                }
                const data = await response.json();
                setData(prevData => [...prevData, data.data]);
                Swal.fire('¡Éxito!', 'El insumo se creó correctamente', 'success');
                handleClose();
                resetForm();
            }
        } catch (error) {
            Swal.fire('¡Error!', error.message, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    //funcion para actualizar un insumo
    const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const confirmResult = await Swal.fire({
                title: '¿Estás seguro de actualizar este insumo?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, actualizar',
                cancelButtonText: 'Cancelar'
            });
            if (confirmResult.isConfirmed) {
                const response = await fetch(`${API_BASE_URL}/ingredientes/${values.idIngrediente}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });
                if (!response.ok) {
                    throw new Error('Hubo un error al actualizar el insumo');
                }
                const data = await response.json();
                setData(prevData => prevData.map(item => item.idIngrediente === data.data.idIngrediente ? data.data : item));
                Swal.fire('¡Éxito!', 'El insumo se actualizó correctamente', 'success');
                actualizarClose();
                resetForm();
            }
        } catch (error) {
            Swal.fire('¡Error!', error.message, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    //funcion para eliminar un insumo
    const handleDeleteConfirmation = async (idIngrediente) => {
        const confirmResult = await Swal.fire({
            title: '¿Estás seguro de eliminar este insumo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
        if (confirmResult.isConfirmed) {
            try {
                const response = await fetch(`${API_BASE_URL}/ingredientes/${idIngrediente}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error('Hubo un error al eliminar el insumo');
                }
                setData(prevData => prevData.filter(item => item.idIngrediente !== idIngrediente));
                Swal.fire('¡Éxito!', 'El insumo se eliminó correctamente', 'success');
            } catch (error) {
                Swal.fire('¡Error!', error.message, 'error');
            }
        }
    };

    // Función para cargar los datos del insumo seleccionado y abrir el modal de actualización
    const handleUpdateInsumo = (ingredientes) => {
        setSelectedInsumo(ingredientes);
        setActualizarOpen(true);
    };

    return (
        <div className="h-screen ">
            <div className="container-table flex items-center justify-center flex-wrap">
                <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-2xl" style={{ width: "60%", border: 'solid 1px #ebebeb' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Lista de insumos</h1>
                        <Button onClick={() => setcrearOpen(true)} className="agregar">Agregar</Button>
                    </div>
                    <div className=' overflow-y-auto divScroll' style={{ maxHeight: '65vh' }}>
                        <Table>
                            <Table.Head style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                                <Table.HeadCell className="border-r border-b border-gray-300">Nombre</Table.HeadCell>
                                <Table.HeadCell className="border-r border-b border-gray-300">Cantidad</Table.HeadCell>
                                <Table.HeadCell className="border-r border-b border-gray-300">Tipo</Table.HeadCell>
                                <Table.HeadCell className="border-b border-gray-300">
                                    <span className="sr-only">Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {data && data.map((item, index) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {item.nombre}
                                        </Table.Cell>
                                        <Table.Cell className="border-r border-gray-300">{item.cantidad}</Table.Cell>
                                        <Table.Cell className="border-r border-gray-300">{item.tipo}</Table.Cell>
                                        <Table.Cell >
                                            <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                                <IconButton aria-label="delete" sx={{ color: '#000000' }} onClick={() => handleDeleteConfirmation(item.idIngrediente)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => handleUpdateInsumo(item)}>
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

            {/* MODAL CREAR INSUMO */}
            <Modal show={crearOpen} onClose={handleClose} size="xl">
                <Modal.Header>
                    <h5 className="text-2xl font-medium text-gray-900 dark:text-white text-center">
                        Crea tu insumo
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            nombre: '',
                            cantidad: '',
                            tipo: '',
                            estado: 'Existente'
                        }}
                        validationSchema={Yup.object({
                            nombre: Yup.string().required('El nombre es requerido').matches(/^[a-zA-Z\s]+$/, 'El nombre solo debe contener letras'),
                            cantidad: Yup.number().required('La cantidad es requerida').positive('La cantidad debe ser positiva'),
                            tipo: Yup.string().required('El tipo es requerido')
                        })}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            handleCreateSubmit(values, { setSubmitting, resetForm });
                        }}
                    >
                        <Form>
                            <div className="space-y-6">
                                <div>
                                    <Field name="nombre">
                                        {({ field }) => (
                                            <FloatingLabel variant="outlined" label="Nombre" className='text-base' {...field} />
                                        )}
                                    </Field>
                                    <ErrorMessage name="nombre" component="div" className="text-red-500" />
                                </div>
                                <div>
                                    <Field name="cantidad">
                                        {({ field }) => (
                                            <FloatingLabel variant="outlined" label="Cantidad" className='text-base' {...field} />
                                        )}
                                    </Field>
                                    <ErrorMessage name="cantidad" component="div" className="text-red-500" />
                                </div>
                                <div>
                                    <Field name="tipo">
                                        {({ field }) => (
                                            <Select id="role" style={{ fontSize: 16, height: 52 }} {...field}>
                                                <option value="">Selecciona el tipo de insumo</option>
                                                <option value="verduras">Verduras</option>
                                                <option value="postres">Postres</option>
                                                <option value="carnes">Carnes</option>
                                            </Select>
                                        )}
                                    </Field>
                                    <ErrorMessage name="tipo" component="div" className="text-red-500" />
                                </div>
                            </div>
                            <Modal.Footer>
                                <div className="flex justify-center w-full">
                                    <Button className='w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' outline size="md" type="submit">
                                        Crear
                                    </Button>
                                </div>
                            </Modal.Footer>
                        </Form>
                    </Formik>
                </Modal.Body>
            </Modal>

            {/* MODAL ACTUALIZAR INSUMO  */}
            <Modal show={actualizarOpen} onClose={actualizarClose} size="xl">
                <Modal.Header>
                    <h5 className="text-2xl font-medium text-gray-900 dark:text-white text-center">
                        Actualiza tu insumo
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            idIngrediente: selectedInsumo ? selectedInsumo.idIngrediente : '', // Asegúrate de incluir el campo idIngrediente aquí
                            nombre: selectedInsumo ? selectedInsumo.nombre : '',
                            cantidad: selectedInsumo ? selectedInsumo.cantidad : '',
                            tipo: selectedInsumo ? selectedInsumo.tipo : ''
                        }}
                        validationSchema={Yup.object({
                            nombre: Yup.string().required('El nombre es requerido').matches(/^[a-zA-Z\s]+$/, 'El nombre solo debe contener letras'),
                            cantidad: Yup.number().required('La cantidad es requerida').positive('La cantidad debe ser positiva'),
                            tipo: Yup.string().required('El tipo es requerido')
                        })}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            handleUpdateSubmit(values, { setSubmitting, resetForm });
                        }}
                    >
                        <Form>
                            <div className="space-y-6">
                                <div>
                                    <Field name="nombre">
                                        {({ field }) => (
                                            <FloatingLabel variant="outlined" label="Nombre" className='text-base' {...field} />
                                        )}
                                    </Field>
                                    <ErrorMessage name="nombre" component="div" className="text-red-500" />
                                </div>
                                <div>
                                    <Field name="cantidad">
                                        {({ field }) => (
                                            <FloatingLabel variant="outlined" label="Cantidad" className='text-base' {...field} />
                                        )}
                                    </Field>
                                    <ErrorMessage name="cantidad" component="div" className="text-red-500" />
                                </div>
                                <div>
                                    <Field name="tipo">
                                        {({ field }) => (
                                            <Select id="role" style={{ fontSize: 16, height: 52 }} {...field}>
                                                <option value="">Selecciona el tipo de insumo</option>
                                                <option value="verduras">Verduras</option>
                                                <option value="postres">Postres</option>
                                                <option value="carnes">Carnes</option>
                                            </Select>
                                        )}
                                    </Field>
                                    <ErrorMessage name="tipo" component="div" className="text-red-500" />
                                </div>
                            </div>
                            <Modal.Footer>
                                <div className="flex justify-center w-full">
                                    <Button className='w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' outline size="md" type="submit">
                                        Actualizar
                                    </Button>
                                </div>
                            </Modal.Footer>
                        </Form>
                    </Formik>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default VistaInsumos;
