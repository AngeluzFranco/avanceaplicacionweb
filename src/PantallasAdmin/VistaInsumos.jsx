<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';

import { Button, Table, Modal, Select, FloatingLabel } from 'flowbite-react';

=======
import React, { useState } from 'react';
import { Button, Navbar, Card, Table, Modal, TextInput, Label, Select, FloatingLabel } from 'flowbite-react';
import fondo from '../assets/fondo.png';
import imgMesa from '../assets/imgMesa.png';
>>>>>>> Stashed changes

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function VistaInsumos() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.100.29:8080/api/gastromanager/ingredientes/');
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

    const [actualizarModal, setactualizarModal] = useState(false);
    const [crearModal, setcrearModal] = useState(false);

    const handleClose = () => setactualizarModal(false);
    return (
        <div className="h-screen ">
            <div className="container-table flex items-center justify-center flex-wrap">
                <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-2xl" style={{ width: "60%", border: 'solid 1px #ebebeb' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Lista de insumos</h1>
                        <Button onClick={() => setcrearModal(true)} className="agregar">Agregar</Button>
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
<<<<<<< Updated upstream
                                {data && data.map((item, index) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {item.nombre}
                                        </Table.Cell>
                                        <Table.Cell className="border-r border-gray-300">{item.cantidad}</Table.Cell>
                                        <Table.Cell className="border-r border-gray-300">{item.tipo}</Table.Cell>
                                        <Table.Cell >

                                            <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                                <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Stack>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}
=======
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Tomates
                                    </Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                    <Table.Cell >

                                        <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                            <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Tomates
                                    </Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                    <Table.Cell >

                                        <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                            <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Tomates
                                    </Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                    <Table.Cell >

                                        <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                            <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Tomates
                                    </Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                    <Table.Cell >

                                        <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                            <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Tomates
                                    </Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                    <Table.Cell >

                                        <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                            <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Tomates
                                    </Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                    <Table.Cell >

                                        <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                            <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Tomates
                                    </Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                    <Table.Cell >

                                        <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                            <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Tomates
                                    </Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                    <Table.Cell >

                                        <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                            <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Tomates
                                    </Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                    <Table.Cell >

                                        <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                            <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Tomates
                                    </Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                    <Table.Cell >

                                        <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                            <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Tomates
                                    </Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                    <Table.Cell >

                                        <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                            <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Tomates
                                    </Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                    <Table.Cell >

                                        <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                            <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Tomates
                                    </Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                    <Table.Cell >

                                        <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                            <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Tomates
                                    </Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                    <Table.Cell >

                                        <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                            <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Tomates
                                    </Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                    <Table.Cell >

                                        <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                            <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Tomates
                                    </Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                    <Table.Cell >

                                        <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                            <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>

                                    </Table.Cell>
                                </Table.Row>


>>>>>>> Stashed changes
                            </Table.Body>
                        </Table>
                    </div>

                </div>

            </div>

            {/* MODAL ACTUALIZAR INSUMO  */}
            <Modal show={actualizarModal} onClose={handleClose} size="xl">
                <Modal.Header>
                    <h5 className="text-2xl font-medium text-gray-900 dark:text-white text-center">
                        Actualiza tu insumo
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div>
<<<<<<< Updated upstream
                            <FloatingLabel variant="outlined" label="Nombre" />
                        </div>
                        <div>
                            <FloatingLabel variant="outlined" label="Cantidad" />
                        </div>
                        <div>
                            <Select id="role">
=======
                            <FloatingLabel variant="outlined" label="Nombre" className='text-base' />
                        </div>
                        <div>
                            <FloatingLabel variant="outlined" label="Cantidad" className='text-base' />
                        </div>
                        <div>
                            <Select id="role" style={{ fontSize: 16, height: 52 }}>
>>>>>>> Stashed changes
                                <option value="">Selecciona el tipo de insumo</option>
                                <option value="verduras">Verduras</option>
                                <option value="postres">Postres</option>
                                <option value="carnes">Carnes</option>
                            </Select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button className='w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' outline size="md" onClick={() => console.log('Crear usuario')}>
                            Actualizar
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>


            {/* MODAL CREAR INSUMO */}
            <Modal show={crearModal} onClose={() => setcrearModal(false)} size="xl">
                <Modal.Header>
                    <h5 className="text-2xl font-medium text-gray-900 dark:text-white text-center">
                        Crea tu insumo
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div>
<<<<<<< Updated upstream
                            <FloatingLabel variant="outlined" label="Nombre" />
                        </div>
                        <div>
                            <FloatingLabel variant="outlined" label="Cantidad" />
                        </div>
                        <div>
                            <Select id="role">
=======
                            <FloatingLabel variant="outlined" label="Nombre" className='text-base' />
                        </div>
                        <div className='flex justify-content gap-4'>
                            <div className='w-1/4'>
                            <FloatingLabel variant="outlined" label="Cantidad" className='text-base' />
                            </div>
                            <div className='w-3/4'>
                            <Select id="role" style={{ fontSize: 16, height: 52 }}>
>>>>>>> Stashed changes
                                <option value="">Selecciona el tipo de insumo</option>
                                <option value="verduras">Verduras</option>
                                <option value="postres">Postres</option>
                                <option value="carnes">Carnes</option>
                            </Select>
<<<<<<< Updated upstream
                        </div>
=======
                            </div>
                            
                            
                        </div>
                    
>>>>>>> Stashed changes
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button className='w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' outline size="md" onClick={() => console.log('Crear usuario')}>
                            Crear
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default VistaInsumos;
