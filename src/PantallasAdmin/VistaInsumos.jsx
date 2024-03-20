import React, { useState } from 'react';
import { Button, Navbar, Card, Table,Modal, TextInput, Label, Select } from 'flowbite-react';
import fondo from '../assets/fondo.png';
import imgMesa from '../assets/imgMesa.png';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function VistaInsumos() {
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
                    <Table>
                        <Table.Head>
                            <Table.HeadCell className="border-r border-b border-gray-300">Nombre</Table.HeadCell>
                            <Table.HeadCell className="border-r border-b border-gray-300">Cantidad</Table.HeadCell>
                            <Table.HeadCell className="border-r border-b border-gray-300">Tipo</Table.HeadCell>
                            <Table.HeadCell className="border-b border-gray-300">
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    Tomates
                                </Table.Cell>
                                <Table.Cell className="border-r border-gray-300">6</Table.Cell>
                                <Table.Cell className="border-r border-gray-300">Verduras</Table.Cell>
                                <Table.Cell className='flex items-center justify-end'>

                                <Stack direction="row" spacing={0}>
                                        <IconButton aria-label="delete" sx={{color: '#000000'}} >
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton aria-label="EditIcon" sx={{color: '#000000'}} onClick={() => setactualizarModal(true)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Stack>
                                    
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>

            </div>

            {/* MODAL ACTUALIZAR INSUMO  */}
            <Modal show={actualizarModal} onClose={handleClose} size="md">
                <Modal.Header>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                        Actualiza tu insumo
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <div className="w-full max-w-xs">
                                <Label htmlFor="productName">Nombre del producto</Label>
                                <TextInput id="productName" type="text" placeholder="Tomates" required />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="w-full max-w-xs">
                                <Label htmlFor="productQuantity">Cantidad</Label>
                                <TextInput id="productQuantity" type="number" placeholder="6" required />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="w-full max-w-xs">
                                <Label htmlFor="productCategory">Categoría</Label>
                                <Select id="productCategory" className="w-full max-w-xs form-select">
                                    <option selected>Selecciona un tipo</option>
                                    <option value="vegetables">Verduras</option>
                                    <option value="fruits">Frutas</option>
                                </Select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button color="success" onClick={() => console.log('Actualizar insumo')}>
                            Actualizar
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>


            {/* MODAL CREAR INSUMO */}
            <Modal show={crearModal} onClose={() => setcrearModal(false)} size="md">
                <Modal.Header>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                        Crea tu insumo
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div>
                            <div className="mb-2">
                                <Label htmlFor="productName">Nombre</Label>
                            </div>
                            <TextInput id="productName" type="text" placeholder="Nombre del producto" required />
                        </div>
                        <div>
                            <div className="mb-2">
                                <Label htmlFor="productQuantity">Cantidad</Label>
                            </div>
                            <TextInput id="productQuantity" type="number" placeholder="Cantidad" required />
                        </div>
                        <div>
                            <Label htmlFor="productCategory">Tipo</Label>
                            <Select id="productCategory">
                                <option selected>Selecciona un tipo</option>
                                <option value="vegetables">Verduras</option>
                                <option value="fruits">Frutas</option>
                            </Select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button color="success" onClick={() => console.log('Crear insumo')}>
                            Crear
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default VistaInsumos;
