
import { Button, Navbar, Card, Table, Modal, Label, Select, TextInput } from 'flowbite-react';
import fondo from '../assets/fondo.png';
import imgMesa from '../assets/imgMesa.png';
import React, { useState } from 'react';


import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';



function VistaPlatillos() {
    const [mostrarOpen, setmostrarOpen] = useState(false);
    const closeModal = () => setmostrarOpen(false);

    const [actualizarOpen, setactualizarOpen] = useState(false);
    const handleClose = () => setactualizarOpen(false);

    const [crearOpen, setcrearOpen] = useState(false);

    return (
        <div className="h-screen bg-cover" style={{ backgroundImage: `url(${fondo})` }}>
            <div className="container-table flex items-center justify-center flex-wrap">
                <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg" style={{ width: "60%" }}>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Lista de platillos</h1>
                        <Button onClick={() => setcrearOpen(true)} className="btn btn-primary">Agregar</Button>
                    </div>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell className='border-r border-b border-gray-300'>Nombre</Table.HeadCell>
                            <Table.HeadCell className='border-r border-b border-gray-300'>Categoria</Table.HeadCell>
                            <Table.HeadCell className='border-r border-b border-gray-300'>Precio</Table.HeadCell>
                            <Table.HeadCell className='border-b border-gray-300'>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    Enchiladas
                                </Table.Cell>
                                <Table.Cell className='border-r border-gray-300'>Entradas</Table.Cell>
                                <Table.Cell className='border-r border-gray-300'>$60</Table.Cell>
                                <Table.Cell className='flex items-center justify-end'>

                                <Stack direction="row" spacing={0}>
                                        <IconButton aria-label="VisibilityIcon" sx={{color: '#000000'}} onClick={() => setmostrarOpen(true)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" sx={{color: '#000000'}}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton aria-label="EditIcon" sx={{color: '#000000'}} onClick={() => setactualizarOpen(true)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Stack>

                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>


            {/* MODAL MAS INFORMACION DEL PLATILLO */}
            <Modal show={mostrarOpen} onClose={closeModal}>
                <Modal.Header>
                    <h5 className="text-xl font-medium leading-normal text-gray-800 dark:text-white">
                        Información del platillo Enchiladas
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    {/* Utiliza div con flex y flex-wrap para un diseño responsivo */}
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                            <Label htmlFor="categoria">Categoría</Label>
                            <Select id="categoria" disabled>
                                <option>Entrada</option>
                                <option>Plato Fuerte</option>
                                <option>Postre</option>
                            </Select>
                        </div>
                        <div className="flex-1 min-w-0">
                            <Label htmlFor="precio">Precio</Label>
                            <TextInput id="precio" type="text" value={"$60"} readOnly />
                        </div>
                    </div>
                    <div className="border bg-gray-100 rounded p-2">
                        <Label>Ingredientes</Label>
                        <div className="flex gap-2 flex-wrap">
                            <span className="badge bg-blue-100 text-blue-800 p-2 rounded">Cilantro</span>
                            <span className="badge bg-blue-100 text-blue-800 p-2 rounded">Tomate</span>
                            <span className="badge bg-blue-100 text-blue-800 p-2 rounded">Cebolla</span>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* MODAL ACTUALIZAR PLATILLO */}
            <Modal show={actualizarOpen} onClose={handleClose} size="4xl">
                <Modal.Header>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">Actualiza tu platillo</h3>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <TextInput placeholder="Enchiladas" sizing="md" />
                            <Select id="categoria" sizing="md">
                                <option>Entrada</option>
                                <option>Plato Fuerte</option>
                                <option>Postre</option>
                            </Select>
                            <TextInput placeholder="$Precio" sizing="md" />
                        </div>
                        <div className="flex justify-between space-x-4">
                            <div className="w-96 p-2">
                                <div className="border bg-gray-100 rounded p-4">
                                    <Label htmlFor="ingredientes" className="mb-2">Ingredientes</Label>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <span className="badge bg-cyan-200 text-black p-2 rounded">Cilantro</span>
                                        <span className="badge bg-cyan-200 text-black p-2 rounded">Tomate</span>
                                        <span className="badge bg-cyan-200 text-black p-2 rounded">Cebolla</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-64 p-2 ">
                                <Label htmlFor="ingredientesNoDisponibles" className="mb-2 text-red-500 flex justify-center w-full">Ingredientes no disponibles</Label>
                                <div className="border bg-gray-100 rounded p-4 text-center">
                                    <div className="grid grid-cols-1 gap-2 mt-2">
                                        <span className="badge bg-red-400 text-black p-2 rounded">Rebanada</span>
                                        <span className="badge bg-red-400 text-black p-2 rounded">Chile verde</span>
                                        <span className="badge bg-red-400 text-black p-2 rounded">Salmón</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button color="success" onClick={() => console.log('Actualizar platillo')}>
                            Actualizar
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

            {/* MODAL CREAR PLATILLO */}
            <Modal show={crearOpen} onClose={() => setcrearOpen(false)} size="4xl">
                <Modal.Header>
                    <h3 className="text-xl font-semibold text-center">Crea tu platillo</h3>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <TextInput placeholder="Enchiladas" sizing="md" />
                            <Select id="categoria">
                                <option>Entrada</option>
                                <option>Plato Fuerte</option>
                                <option>Postre</option>
                            </Select>
                            <TextInput placeholder="Precio $" sizing="md" />
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-full lg:w-2/3">
                                <Label htmlFor="categoria">Categoría del platillo</Label>
                                <Select id="categoria">
                                    <option>Platillos</option>
                                    <option>Plato Fuerte</option>
                                    <option>Postre</option>
                                </Select>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <span className="badge bg-primary text-blue-500">Cilantro</span>
                                    <span className="badge bg-primary text-blue-500">Tomate</span>
                                    <span className="badge bg-primary text-blue-500">Cebolla</span>
                                </div>
                            </div>
                            <div className="w-64 p-2 ">
                                <Label htmlFor="ingredientesNoDisponibles" className="mb-2 text-red-500 flex justify-center w-full">Ingredientes no disponibles</Label>
                                <div className="border bg-gray-100 rounded p-4 text-center">
                                    <div className="grid grid-cols-1 gap-2 mt-2">
                                        <span className="badge bg-secondary text-blue-500">Rebanada</span>
                                        <span className="badge bg-secondary text-blue-500">Chile verde</span>
                                        <span className="badge bg-secondary text-blue-500">Salmón</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button
                            color="blue"
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
