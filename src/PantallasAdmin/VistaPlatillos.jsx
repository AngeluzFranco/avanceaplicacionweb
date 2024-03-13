
import { Button, Navbar, Card, Table, Modal, Label, Select, TextInput } from 'flowbite-react';
import fondo from '../assets/fondo.png';
import imgMesa from '../assets/imgMesa.png';
import React, { useState } from 'react';



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

                                    <svg onClick={() => setmostrarOpen(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333333" className="w-6 h-6 cursor-pointer">
                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                    </svg>



                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333333" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                    </svg>

                                    <svg onClick={() => setactualizarOpen(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333333" className="w-6 h-6">
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>

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
                                    <Label htmlFor="ingredientes" className="mb-2 text-blue-500">Ingredientes</Label>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <span className="badge bg-primary text-blue-500">Cilantro</span>
                                        <span className="badge bg-primary text-blue-500">Tomate</span>
                                        <span className="badge bg-primary text-blue-500">Cebolla</span>
                                    </div>
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
