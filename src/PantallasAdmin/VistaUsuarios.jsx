import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Select, FloatingLabel } from 'flowbite-react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './usuarios.css'
import { API_BASE_URL } from '../backend.js';
import swal from 'sweetalert2';

// VALIDACIONES CON FORMIK Y YUP
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function VistaUsuarios() {
  //estado para mostrar los usuarios en la tabla
  const [data, setData] = useState(null);
  //estado para abrir el modal de crear usuario
  const [crearOpen, setcrearOpen] = React.useState(false);
  //estado para mostrar la contraseña
  const [showPasswordC, setShowPasswordC] = useState(false);
  //estado para cerrar el modal de crear usuario
  const handleClose = () => setcrearOpen(false);
  //estado para abrir el modal de actualizar usuario
  const [actualizarOpen, setActualizarOpen] = React.useState(false);
  //estado para cerrar el modal de actualizar usuario
  const actualizarClose = () => setActualizarOpen(false);
  // Estado para almacenar la información del usuario seleccionado para actualizar
  const [selectedUser, setSelectedUser] = useState(null);

  //funcion para mostrar todos los usuarios existentes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_BASE_URL}/usuario/`;
        const response = await fetch(url);
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

  //funcion para mostrar la contraseña
  const handleClickShowPassword = () => {
    setShowPasswordC(!showPasswordC);
  };

  //funcion para crear un usuario
  const createUser = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('El usuario ya existe');
        } else {
          throw new Error('El usuario ya existe');
        }
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Hubo un error al crear usuario:', error.message);
      throw error;
    }
  };

  //funcion para eliminar un usuario
  const deleteUser = async (idUsuario) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario/${idUsuario}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Hubo un error al eliminar el usuario');
      }
      setData(prevData => prevData.filter(user => user.idUsuario !== idUsuario));
      swal("¡Éxito!", "El usuario se eliminó correctamente", "success");
    } catch (error) {
      swal("¡Error!", error.message, "error");
    }
  };

  //funcion para manejar el envio del formulario
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
        const newUser = await createUser(values);
        setData(prevData => [...prevData, newUser]);
        setcrearOpen(false);
        swal("¡Éxito!", "El usuario se creó correctamente", "success");
      resetForm();
    } catch (error) {
      swal("¡Error!", error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Función para cargar los datos del usuario seleccionado y abrir el modal de actualización
  const handleUpdateUser = (user) => {
    setSelectedUser(user);
    setActualizarOpen(true);
  };

  //funcion para actualizar un usuario
  const updateUser = async (idUsuario, userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario/${idUsuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error('Hubo un error al actualizar el usuario');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Hubo un error al actualizar usuario:', error.message);
      throw error;
    }
  };

  //funcion para manejar el envio del formulario de actualización
  const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const updatedUser = await updateUser(selectedUser.idUsuario, values);
      setData(prevData => prevData.map(user => user.idUsuario === selectedUser.idUsuario ? updatedUser : user));
      actualizarClose();
      swal("¡Éxito!", "El usuario se actualizó correctamente", "success");
    } catch (error) {
      swal("¡Error!", error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

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
              <Table.Head style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                <Table.HeadCell className='border-r border-b border-gray-300'>Usuario</Table.HeadCell>
                <Table.HeadCell className='border-r border-b border-gray-300'>Rol</Table.HeadCell>
                <Table.HeadCell className='border-r border-b border-gray-300'>Contraseña</Table.HeadCell>
                <Table.HeadCell className='border-b border-gray-300'>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {data && data.map((item, index) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                    <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.user}
                    </Table.Cell>
                    <Table.Cell className='border-r border-gray-300'>{item.rol}</Table.Cell>
                    <Table.Cell className='border-r border-gray-300'>{item.password}</Table.Cell>
                    <Table.Cell >
                      <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                        <IconButton aria-label="delete" sx={{ color: '#000000' }} onClick={() => deleteUser(item.idUsuario)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => handleUpdateUser(item)}>
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

      <Modal show={crearOpen} onClose={handleClose} size="xl">
        <Modal.Header>
          <h5 className="text-2xl font-medium text-gray-900 dark:text-white text-center">
            Crear usuario
          </h5>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              user: '',
              password: '',
              rol: ''
            }}
            validationSchema={Yup.object({
              user: Yup.string()
                .required('El nombre de usuario es requerido'),
              password: Yup.string()
                .required('La contraseña es requerida')
                .min(5, 'La contraseña debe tener al menos 5 caracteres')
                .max(14, 'La contraseña debe tener máximo 15 caracteres'),
              rol: Yup.string()
                .required('El rol es requerido')
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="space-y-6">
                <div>
                  <Field name="user">
                    {({ field, form }) => (
                      <FloatingLabel
                        variant="outlined"
                        label="Usuario"
                        required
                        className='text-base'
                        {...field}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="user" component="div" className="text-red-500" />
                </div>
                <div>
                  <div style={{ position: 'relative' }}>
                    <Field name="password">
                      {({ field, form }) => (
                        <FloatingLabel
                          variant="outlined"
                          label="Contraseña"
                          required
                          id="outlined-adornment-password"
                          type={showPasswordC ? 'text' : 'password'}
                          className='text-base'
                          {...field}
                        />
                      )}
                    </Field>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      required
                      style={{ position: 'absolute', top: '10%', right: '3%' }}
                    >
                      {showPasswordC ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                </div>
                <div>
                  <Field name="rol" as="select">
                    {({ field, form }) => (
                      <Select
                        id="role"
                        style={{ fontSize: 16, height: 52 }}
                        {...field}
                      >
                        <option value="">Selecciona un rol</option>
                        <option value="Admin">Admin</option>
                        <option value="Chef">Chef</option>
                        <option value="Recepcion">Recepcion</option>
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage name="rol" component="div" className="text-red-500" />
                </div>
              </div>
              <Modal.Footer className='justify-center'>
                <Button
                  className='w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800'
                  outline
                  size="md"
                  type="submit"
                >
                  Crear
                </Button>
              </Modal.Footer>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>

      {/* modal actualizar usuario */}
      <Modal show={actualizarOpen} onClose={actualizarClose} size="xl">
        <Modal.Header>
          <h5 className="text-2xl font-medium text-gray-900 dark:text-white text-center">
            Actualizar Usuario
          </h5>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              user: selectedUser ? selectedUser.user : '',
              password: selectedUser ? selectedUser.password : '',
              rol: selectedUser ? selectedUser.rol : ''
            }}
            validationSchema={Yup.object({
              password: Yup.string()
                .min(5, 'La contraseña debe tener al menos 5 caracteres')
                .max(14, 'La contraseña debe tener máximo 15 caracteres'),
            })}
            onSubmit={handleUpdateSubmit}
          >
            <Form>
              <div className="space-y-6">
                <div>
                  <Field name="user">
                    {({ field, form }) => (
                      <FloatingLabel
                        variant="outlined"
                        label="Usuario"
                        className='text-base'
                        {...field}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="user" component="div" className="text-red-500" />
                </div>
                <div>
                  <div style={{ position: 'relative' }}>
                    <Field name="password">
                      {({ field, form }) => (
                        <FloatingLabel
                          variant="outlined"
                          label="Contraseña"
                          id="outlined-adornment-password"
                          type={showPasswordC ? 'text' : 'password'}
                          className='text-base'
                          {...field}
                        />
                      )}
                    </Field>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      style={{ position: 'absolute', top: '10%', right: '3%' }}
                    >
                      {showPasswordC ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                </div>
                <div>
                  <Field name="rol" as="select">
                    {({ field, form }) => (
                      <Select
                        id="role"
                        style={{ fontSize: 16, height: 52 }}
                        {...field}
                      >
                        <option value="">Selecciona un rol</option>
                        <option value="Admin">Admin</option>
                        <option value="Chef">Chef</option>
                        <option value="Recepcion">Recepcion</option>
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage name="rol" component="div" className="text-red-500" />
                </div>
              </div>
              <Modal.Footer className='justify-center'>
                <Button
                  className='w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800'
                  outline
                  size="md"
                  type="submit"
                >
                  Actualizar
                </Button>
              </Modal.Footer>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VistaUsuarios;
