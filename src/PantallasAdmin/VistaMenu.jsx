import React, {useState} from 'react';
import { Button, Navbar, Card, Table, Spinner, Modal, Label, Select, Textarea, TextInput } from 'flowbite-react';
import fondo from '../assets/fondo.png';
import imgMesa from '../assets/imgMesa.png';

function VistaMenu() {
    const [showSpinner, setShowSpinner] = useState(false);

    const [actualizarModal, setactualizarModal] = useState(false);
    const actualizarClose = () => setactualizarModal(false);

    const [crearModal, setcrearModal] = React.useState(false); 
    const crearClose = () => setcrearModal(false);

    const [mostrarOpen, setmostrarOpen] = useState(false);
    const mostrarClose = () => setmostrarOpen(false);

    return (
        <div className="h-screen bg-cover" style={{ backgroundImage: `url(${fondo})` }}>
            <div className="container-table flex items-center justify-center flex-wrap">
                <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg" style={{ width: "60%" }}>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Menus disponibles</h1>
                        <Button onClick={() => setcrearModal(true)} className="btn btn-primary">Agregar</Button>
                    </div>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell className="border-r border-b border-gray-300">#</Table.HeadCell>
                            <Table.HeadCell className="border-r border-b border-gray-300">Nombre</Table.HeadCell>
                            <Table.HeadCell className="border-r border-b border-gray-300">Descripcion</Table.HeadCell>
                            <Table.HeadCell className="border-b border-gray-300">
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    1
                                </Table.Cell>
                                <Table.Cell className='border-r border-gray-300'>Platillo pa llenarte</Table.Cell>
                                <Table.Cell className='border-r border-gray-300'>Sopita, Guizado con tortillas, Refresco o agua, postre del dia</Table.Cell>
                                <Table.Cell className='flex items-center justify-end'>
                                <svg onClick={() => setmostrarOpen(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333333" className="w-6 h-6 cursor-pointer">
                                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333333" className="w-6 h-6">
                                  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                </svg>

                                <svg onClick={() => setactualizarModal(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333333" className="w-6 h-6">
                                   <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>

                                <svg onClick={() => setShowSpinner(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333333" className="w-6 h-6">
                                 <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                </svg>
                                {showSpinner && <Spinner aria-label="Default status example" />}

                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>

            {/* MODAL ACTUALIZAR MENU  */}
            <Modal show={actualizarModal} onClose={actualizarClose} size="4xl">
                <Modal.Header>
                    <h2 className="text-2xl font-semibold text-center">Actualiza tu menú</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div className="flex justify-center gap-4">
                        <div className="w-full max-w-md">
                                <div className="border p-2 rounded">
                                    <Textarea
                                        id="description"
                                        placeholder="Mariscada"
                                    />
                                </div>
                            </div>
                            <div className="w-full max-w-md">
                                <div className="border p-2 rounded">
                                    <Textarea
                                        id="description"
                                        placeholder="Exquisitos y extravagantes mariscos para refrescar tu día"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-full lg:w-2/3">
                                <div className="border bg-gray-100 rounded p-2">
                                <Label htmlFor="categoria">Categoría del platillo</Label>
                                <Select id="categoria">
                                    <option>Platillos</option>
                                    <option>Plato Fuerte</option>
                                    <option>Postre</option>
                                </Select>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <span className="badge bg-blue-500 text-black p-2 rounded">Cilantro</span>
                                        <span className="badge bg-blue-500 text-black p-2 rounded">Tomate</span>
                                        <span className="badge bg-blue-500 text-black p-2 rounded">Cebolla</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-64 p-2">
                                <div className="text-center mb-2 text-red-600">Platillos no disponibles</div>
                                <div className="border bg-gray-100 rounded p-2">
                                    <div className="grid gap-2">
                                        <span className="badge bg-red-500 text-black p-2 rounded">Rebanada</span>
                                        <span className="badge bg-red-500 text-black p-2 rounded">Chile verde</span>
                                        <span className="badge bg-red-500 text-black p-2 rounded">Salmón</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button color="blue" onClick={actualizarClose}>
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
                        <div className="grid grid-cols-3 gap-4">
                            <TextInput 
                                id="menuName" 
                                placeholder="Nombre del menú" 
                                required
                            />
                            <TextInput 
                                id="menuDescription" 
                                placeholder="Descripción del menú" 
                                required
                            />
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
                            onClick={crearClose} 
                        >
                            Crear
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

            {/* MODAL MOSTRAR MENU */}
            <Modal show={mostrarOpen} onClose={mostrarClose} size="4xl">
                <Modal.Header>
                    <h2 className="text-2xl font-bold text-center">Información del menú “Mariscada”</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <div className="border p-4 rounded">
                            <h3 className="text-lg mb-2 text-blue-500">Descripción</h3>
                            <div className="p-4 bg-gray-500 rounded">
                                <p>Exquisitos y extravagantes mariscos para refrescar tu día</p>
                            </div>
                            <h3 className="text-lg font-bold mt-4">Platillos</h3>
                            <div className="grid grid-cols-3 gap-4 mt-2">
                                <div className="p-4 bg-green-500 rounded">
                                    <p className="font-bold">Nombre: Ceviche de camarón</p>
                                    <p>Precio: $200</p>
                                </div>
                                <div className="p-4 bg-green-500 rounded">
                                    <p className="font-bold">Nombre: Ceviche de camarón</p>
                                    <p>Precio: $200</p>
                                </div>
                                <div className="p-4 bg-green-500 rounded">
                                    <p className="font-bold">Nombre: Ceviche de camarón</p>
                                    <p>Precio: $200</p> 
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-2">
                                <div className="p-4 bg-green-500 rounded">
                                    <p className="font-bold">Nombre: Ceviche de camarón</p>
                                    <p>Precio: $200</p>
                                </div>
                                <div className="p-4 bg-green-500 rounded">
                                    <p className="font-bold">Nombre: Ceviche de camarón</p>
                                    <p>Precio: $200</p>
                                </div>
                                <div className="p-4 bg-green-500 rounded">
                                    <p className="font-bold">Nombre: Ceviche de camarón</p>
                                    <p>Precio: $200</p> 
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button onClick={mostrarClose}
                        color="blue">
                            
                            Descargar
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
        
    );
}

export default VistaMenu;
