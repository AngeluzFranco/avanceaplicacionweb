import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Select, FloatingLabel } from 'flowbite-react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './usuarios.css'
import { API_BASE_URL } from '../backend.js';
import Swal from 'sweetalert2';

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

  const [refreshData, setRefreshData] = useState(false);

  //funcion para mostrar todos los usuarios existentes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_BASE_URL}/usuario/`;
        const token = localStorage.getItem('token');
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
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
  }, [refreshData]);

  //funcion para mostrar la contraseña
  const handleClickShowPassword = () => {
    setShowPasswordC(!showPasswordC);
  };

  //funcion para crear un usuario
  const handleCreateSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const confirmResult = await Swal.fire({
        title: '¿Estás seguro de crear este usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, crear',
        cancelButtonText: 'Cancelar'
      });
      if (confirmResult.isConfirmed) {
        console.log(values);
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/usuario/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            ...values,
            roleBean: {
              id_role: values.rol
            }
          })
        });
        if (!response.ok) {
          if (response.status === 409) {
            throw new Error('El usuario ya existe');
          } else {
            throw new Error('Hubo un error al crear el usuario');
          }
        }
        const data = await response.json();
        setData(prevData => [...prevData, data.data]);
        setRefreshData(!refreshData); // Cambia el valor de refreshData
        Swal.fire('¡Éxito!', 'El usuario se creó correctamente', 'success');
        setcrearOpen(false);
        resetForm();
      }
    } catch (error) {
      Swal.fire('¡Error!', error.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  //funcion para eliminar un usuario
  const deleteUser = async (idUsuario) => {
    try {
      const confirmDelete = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará permanentemente al usuario.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
      });

      if (confirmDelete.isConfirmed) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/usuario/${idUsuario}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error('Hubo un error al eliminar el usuario');
        }
        setData(prevData => prevData.filter(user => user.idUsuario !== idUsuario));
        Swal.fire("¡Éxito!", "El usuario se eliminó correctamente", "success");
      }
    } catch (error) {
      console.error('Hubo un error al eliminar el usuario:', error.message);
      Swal.fire("¡Error!", error.message, "error");
    }
  };

  // Función para cargar los datos del usuario seleccionado y abrir el modal de actualización
  const handleUpdateUser = (user) => {
    setSelectedUser(user);
    setActualizarOpen(true);
  };

  //funcion para actualizar un usuario
  const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const confirmResult = await Swal.fire({
        title: '¿Estás seguro de actualizar este usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar'
      });
      if (confirmResult.isConfirmed) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/usuario/${selectedUser.idUsuario}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            ...values,
            roleBean: {
              id_role: values.rol
            }
          })
        });
        if (!response.ok) {
          if (response.status === 409) {
            throw new Error('El usuario ya existe');
          } else {
            throw new Error('Hubo un error al actualizar el usuario');
          }
        }
        const data = await response.json();
        setData(prevData => prevData.map(user => user.idUsuario === selectedUser.idUsuario ? data.data : user));
        Swal.fire('¡Éxito!', 'El usuario se actualizó correctamente', 'success');
        actualizarClose();
        resetForm();
      }
    } catch (error) {
      Swal.fire('¡Error!', error.message, 'error');
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
            <Table>
              <Table.Head style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                <Table.HeadCell className='text-center border-r border-b border-gray-300'>#</Table.HeadCell>
                <Table.HeadCell className='text-center border-r border-b border-gray-300'>Usuario</Table.HeadCell>
                <Table.HeadCell className='text-center border-r border-b border-gray-300'>Rol</Table.HeadCell>
                <Table.HeadCell className='text-center border-r border-b border-gray-300'>Correo</Table.HeadCell>
                <Table.HeadCell className='text-center border-b border-gray-300'>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {data && data.map((item, index) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                    <Table.Cell className="text-center border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </Table.Cell>

                    <Table.Cell className="text-center border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.user}
                    </Table.Cell>
                    <Table.Cell className='text-center border-r border-gray-300'>
                      {item.roleBean ? (() => {
                        switch (item.roleBean.role) {
                          case 'ADMIN_ROLE':
                            return 'ADMINISTRADOR';
                          case 'WAITER_ROLE':
                            return 'MESERO';
                          case 'CHEF_ROLE':
                            return 'CHEF';
                          case 'RECEPTIONIST_ROLE':
                            return 'RECEPCIONISTA';
                          // Agrega más casos según sea necesario
                          default:
                            return 'No role';
                        }
                      })() : 'No role'}
                    </Table.Cell>
                    <Table.Cell className='text-center border-r border-gray-300'>{item.email}</Table.Cell>
                    <Table.Cell className='text-center'>
                      <Stack direction="row" spacing={0} className='flex items-center justify-center'>
                        {/* Verifica si el usuario es un administrador */}
                        {item.roleBean && item.roleBean.role !== 'ADMIN_ROLE' && (
                          <>
                            <IconButton aria-label="delete" sx={{ color: '#000000' }} onClick={() => deleteUser(item.idUsuario)}>
                              <DeleteIcon />
                            </IconButton>
                            <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => handleUpdateUser(item)}>
                              <EditIcon />
                            </IconButton>
                          </>
                        )}
                        {/* Si es un administrador, muestra un indicador visual */}
                        {item.roleBean && item.roleBean.role === 'ADMIN_ROLE' && (
                          <>
                            <div className="text-gray-500 dark:text-gray-400">Super Admin</div>
                          </>
                        )}
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
              rol: '',
              email: '' // Add this line
            }}
            validationSchema={Yup.object({
              user: Yup.string()
                .required('El nombre de usuario es requerido'),
              password: Yup.string()
                .required('La contraseña es requerida')
                .min(5, 'La contraseña debe tener al menos 5 caracteres')
                .max(14, 'La contraseña debe tener máximo 15 caracteres'),
              rol: Yup.string()
                .required('El rol es requerido'),
              email: Yup.string() // Add this block
                .required('El correo es requerido')
                .email('Debe ser un correo válido')
            })}
            onSubmit={handleCreateSubmit}
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
                  <Field name="email">
                    {({ field, form }) => (
                      <FloatingLabel
                        variant="outlined"
                        label="Correo"
                        required
                        className='text-base'
                        {...field}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="email" component="div" className="text-red-500" />
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
                        <option value="1">Administrador</option>
                        <option value="2">Mesero</option>
                        <option value="3">Chef</option>
                        <option value="4">Recepción</option>
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
              rol: selectedUser ? selectedUser.roleBean.id_role : '',
              email: selectedUser ? selectedUser.email : ''
            }}
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
                  <Field name="email">
                    {({ field, form }) => (
                      <FloatingLabel
                        variant="outlined"
                        label="Correo"
                        className='text-base'
                        {...field}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="email" component="div" className="text-red-500" />
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
                        <option value="1">Administrador</option>
                        <option value="2">Mesero</option>
                        <option value="3">Chef</option>
                        <option value="4">Recepción</option>
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
