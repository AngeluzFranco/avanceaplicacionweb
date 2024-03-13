import React, { useState } from 'react';
import { Button, Navbar, Card, Table,Modal, TextInput, Label, Select } from 'flowbite-react';
import fondo from '../assets/fondo.png';
import imgMesa from '../assets/imgMesa.png';

function VistaInsumos() {
    const [actualizarModal, setactualizarModal] = useState(false);
    const [crearModal, setcrearModal] = useState(false);

    const handleClose = () => setactualizarModal(false);
    return (
        <div className="h-screen bg-cover" style={{ backgroundImage: `url(${fondo})` }}>
            <div className="container-table flex items-center justify-center flex-wrap">
                <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg" style={{ width: "60%" }}>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Lista de insumos</h1>
                        <Button onClick={() => setcrearModal(true)} className="btn btn-primary">Agregar</Button>
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

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333333" className="w-6 h-6">
                                  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                </svg>

                                <svg onClick={() => setactualizarModal(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333333" className="w-6 h-6">
                                   <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                                    
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
