import React from 'react';
import { Button, Navbar, Card, Table } from 'flowbite-react';
import fondo from '../assets/fondo.png';
import imgMesa from '../assets/imgMesa.png';

function VistaUsuarios() {
    return (
        <div className="h-screen bg-cover" style={{ backgroundImage: `url(${fondo})` }}>
            <div className="container-table flex items-center justify-center flex-wrap">
                <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg" style={{ width: "60%" }}>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Lista de usuarios</h1>
                        <Button className="btn btn-primary">Agregar</Button>
                    </div>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell className='border-r border-b border-gray-300'>Name</Table.HeadCell>
                            <Table.HeadCell className='border-r border-b border-gray-300'>Rol</Table.HeadCell>
                            <Table.HeadCell className='border-r border-b border-gray-300'>password</Table.HeadCell>
                            <Table.HeadCell className='border-b border-gray-300'>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="border-r border-gray-300whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    Angeluz
                                </Table.Cell>
                                <Table.Cell className='border-r border-gray-300'>Admin</Table.Cell>
                                <Table.Cell className='border-r border-gray-300'>1234</Table.Cell>
                                <Table.Cell>
                                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Delete
                                    </a><br />
                                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Edit
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default VistaUsuarios;
