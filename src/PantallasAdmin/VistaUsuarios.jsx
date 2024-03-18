import React from 'react';
import { Button, Navbar, Card, Table,Modal, TextInput, Label, Select, FloatingLabel } from 'flowbite-react';
import fondo from '../assets/fondo.png';
import imgMesa from '../assets/imgMesa.png';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';

function VistaUsuarios() {
    const [crearOpen, setcrearOpen] = React.useState(false);
    const [actualizarOpen, setactualizarOpen] = React.useState(false);

    const handleClose = () => setcrearOpen(false);
    return (
        <div className="h-screen bg-cover" style={{ backgroundImage: `url(${fondo})` }}>
            <div className="container-table flex items-center justify-center flex-wrap">
                <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg" style={{ width: "60%" }}>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Lista de usuarios</h1>
                        <Button onClick={() => setcrearOpen(true)} className="btn btn-primary">Agregar</Button>
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
                                <Table.Cell className='flex items-center justify-end'>
                                <Stack direction="row" spacing={0}>
                                        <IconButton aria-label="delete" sx={{color: '#000000'}} >
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

                {/* MODAL CREAR USUARIO */}
            <Modal show={crearOpen} onClose={handleClose} size="xl">
        <Modal.Header>
          <h5 className="text-2xl font-medium dark:text-white" style={{color: '#003169'}}>
            Crea tu usuario
          </h5>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
            <FloatingLabel variant="outlined" label="Usuario" />
            </div>
            <div>
              <FloatingLabel variant="outlined" label="Contraseña" type='password' required />
            </div>
            <div>
              <Select id="role">
                <option value="">Selecciona un rol</option>
                <option value="admin">Admin</option>
                <option value="user">Usuario</option>
                <option value="guest">Invitado</option>
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='justify-center'>
          <Button className='w-40' outline gradientDuoTone="greenToBlue" size="md" onClick={() => console.log('Crear usuario')}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>


      {/* MODAL ACTUALIZAR USUARIO */}
      <Modal show={actualizarOpen} onClose={() => setactualizarOpen(false)} size="xl">
        <Modal.Header>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Actualiza tu usuario
          </h5>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-4">
              <Label htmlFor="username-update">Nombre de Usuario Actual</Label>
              <TextInput id="username-update" type='text' placeholder="JaimePro" />
            </div>
            <div className="mb-4">
              <Label htmlFor="username-new">Nuevo Nombre de Usuario</Label>
              <TextInput id="username-new" placeholder="JaimeGOD" />
            </div>
            <div className="mb-4">
              <Label htmlFor="role-update">Rol del Usuario</Label>
              <Select id="role-update">
                <option value="admin">ADMIN</option>
                <option value="user">USER</option>
                <option value="guest">GUEST</option>
              </Select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className='justify-center'>
          <Button className='w-40' outline gradientDuoTone="greenToBlue" size="md" onClick={() => console.log('Actualizar usuario')}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
}

export default VistaUsuarios;
