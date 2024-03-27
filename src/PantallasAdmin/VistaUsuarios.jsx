import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Select, FloatingLabel } from 'flowbite-react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './usuarios.css'

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';

function VistaUsuarios() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.100.29:8080/api/gastromanager/usuario/');
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

  const [crearOpen, setcrearOpen] = React.useState(false);
  const [actualizarOpen, setactualizarOpen] = React.useState(false);

  const [showPasswordC, setShowPasswordC] = useState(false);
  const [showPasswordU, setShowPasswordU] = useState(false);

  const handleClickShowPassword = () => {
    setShowPasswordC(!showPasswordC);
  };
  const handleClickShowPasswordU = () => {
    setShowPasswordU(!showPasswordU);
  };

  const handleClose = () => setcrearOpen(false);
  return (
    <div className="h-full" >
      <div className="container-table flex items-center justify-center flex-wrap">
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-2xl" style={{ width: "60%", border: 'solid 1px #ebebeb' }}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Lista de usuarios</h1>
            <Button onClick={() => setcrearOpen(true)} className="agregar">Agregar</Button>
          </div>
          
          <div className=' overflow-y-auto divScroll' style={{ maxHeight: '65vh' }} >
          <Table >
            <Table.Head style={{ position: 'sticky', top: 0, zIndex:1 }}>
              <Table.HeadCell className='border-r border-b border-gray-300'>Usuario</Table.HeadCell>
              <Table.HeadCell className='border-r border-b border-gray-300'>Rol</Table.HeadCell>
              <Table.HeadCell className='border-r border-b border-gray-300'>Contraseña</Table.HeadCell>
              <Table.HeadCell className='border-b border-gray-300'>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
            {data && data.map((item, index) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="border-r border-gray-300whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.user}
                </Table.Cell>
                <Table.Cell className='border-r border-gray-300'>{item.rol}</Table.Cell>
                <Table.Cell className='border-r border-gray-300'>{item.password}</Table.Cell>
                <Table.Cell >
                  <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                    <IconButton aria-label="delete" sx={{ color: '#000000' }} >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarOpen(true)}>
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

      {/* MODAL CREAR USUARIO */}
      <Modal show={crearOpen} onClose={handleClose} size="xl">
        <Modal.Header>
          <h5 className="text-2xl font-medium text-gray-900 dark:text-white text-center" >
            Crea tu usuario
          </h5>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <FloatingLabel variant="outlined" label="Usuario" />
            </div>
            <div>
            <div style={{ position: 'relative' }}>
                <FloatingLabel
                  variant="outlined"
                  label="Contraseña"
                  required
                  id="outlined-adornment-password"
                  type={showPasswordC ? 'text' : 'password'}
                />
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  style={{ position: 'absolute', top: '10%', right: '3%' }}
                >
                  {showPasswordC ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </div>
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
          <Button className='w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' outline size="md" onClick={() => console.log('Crear usuario')}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>


      {/* MODAL ACTUALIZAR USUARIO */}
      <Modal show={actualizarOpen} onClose={() => setactualizarOpen(false)} size="xl">
        <Modal.Header>
          <h5 className="text-2xl font-medium text-gray-900 dark:text-white text-center" >
            Actualiza tu usuario
          </h5>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <FloatingLabel variant="outlined" label="Usuario" value={"Jaime"} />
            </div>
            <div>
              <div style={{ position: 'relative' }}>
                <FloatingLabel
                  variant="outlined"
                  label="Contraseña"
                  required
                  id="outlined-adornment-password"
                  type={showPasswordU ? 'text' : 'password'}
                  value={"JaimeRoot"}
                />
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordU}
                  edge="end"
                  style={{ position: 'absolute', top: '10%', right: '3%' }}
                >
                  {showPasswordU ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </div>

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
          <Button className='w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' outline size="md" onClick={() => console.log('Crear usuario')}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VistaUsuarios;
