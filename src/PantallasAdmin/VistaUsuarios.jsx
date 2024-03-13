import React from 'react';
import { Button, Navbar, Card, Table } from 'flowbite-react';
import fondo from '../assets/fondo.png';


function VistaUsuarios() {
  return (
    <div className="h-screen bg-cover" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="container-table flex items-center justify-center flex-wrap">
        <div className="overflow-x-auto" style={{ width: "60%" }}>
          <Table>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Rol</Table.HeadCell>
              <Table.HeadCell>password</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Angeluz
                </Table.Cell>
                <Table.Cell>Admin</Table.Cell>
                <Table.Cell>1234</Table.Cell>
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