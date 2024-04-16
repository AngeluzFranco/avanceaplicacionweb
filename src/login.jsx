import React, { useState, useContext } from 'react';
import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import RestaurantLogin from './assets/RestaurantLogin.png';
import Gorro from './assets/gorro.png';
import './login.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from './authContext';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9]*$/, 'Solo se permiten números y letras')
    .required('El usuario es requerido'),
  password: Yup.string()
    .matches(/^[a-zA-Z0-9]*$/, 'Solo se permiten números y letras')
    .required('La contraseña es requerida')
});

export default function LoginComponent() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [passwordShown, setPasswordShown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [emailForReset, setEmailForReset] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);

  

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = {
      user: values.username,
      password: values.password
    };

    try {
      const response = await fetch('http://GastroManagerzzz-env.eba-pe7hcsjz.us-east-1.elasticbeanstalk.com/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const fullResponse = await response.json();
        const data = fullResponse.data;
        localStorage.setItem('token', data.token);
        console.log('Token almacenado:', data.token);
        Swal.fire({ title: 'Perfecto', text: `Inicio de sesión exitoso. Bienvenido ${data.user.user}` , icon: 'success', confirmButtonColor: '#0f80f2' });

        // Establecer la información del usuario en el contexto
        setUser({
          username: data.user.user,
          role: data.roles.role, // Acceder a role a través de roles
        });

        // Redirigir al usuario a la ruta correcta dependiendo de su rol
        switch (data.roles.role) { // Acceder a role a través de roles
          case 'ADMIN_ROLE':
            navigate('/admin');
            break;
          case 'CHEF_ROLE':
            navigate('/chef');
            break;
          case 'RECEPTIONIST_ROLE':
            navigate('/recepcion');
            break;
          default:
            // Redirigir a la página de inicio de sesión si el rol no es reconocido
            Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
          confirmButtonColor: '#ff0000', // Color rojo
        });
            navigate('/login');
            break;
        }
      } else {
        const fullResponse = await response.json();
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
          confirmButtonColor: '#ff0000', // Color rojo
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Usuario o contraseña incorrectos',
        icon: 'error',
        confirmButtonColor: '#ff0000', // Color rojo
      });
    }

    setSubmitting(false);
  };

  //envia el correo para recuperar la contraseña
  const handleResetSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      mailTo: emailForReset,
    };
  
    try {
      const response = await fetch('http://GastroManagerzzz-env.eba-pe7hcsjz.us-east-1.elasticbeanstalk.com/email-password/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
        setAlertVisible(true);
        setShowModal(false);
        setTimeout(() => setAlertVisible(false), 2000);
      } else {
        if (response.status === 404) {
          setError('No existe un usuario con ese correo.');
          setErrorAlertVisible(true); // Mostrar la alerta de error
          setTimeout(() => setErrorAlertVisible(false), 2000);
        } else {
          setError('Error en el servidor, intente más tarde.');
          setErrorAlertVisible(true); // Mostrar la alerta de error
          setTimeout(() => setErrorAlertVisible(false), 2000);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error de red o de conexión');
      setErrorAlertVisible(true); // Mostrar la alerta de error
      setTimeout(() => setErrorAlertVisible(false), 2000);
    }
  };
  

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
          <img src={Gorro} alt="Gorrito" className="absolute top-6 right-10 w-16 h-auto max-w-[90px] max-h-[90px]" />
          <div className="flex items-center justify-center flex-grow md:flex-grow-0 md:w-1/2">
            <div className="flex items-center justify-center h-full w-full">
              <img src={RestaurantLogin} alt="Restaurant" className="bg-cover bg-center w-full h-full object-fill" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center px-5 flex-grow md:w-1/2 bg-[#050214]">
            <div className="max-w-md">
              <h2 className="text-6xl mb-8 text-[#78A890] font-light font-semibold">Bienvenido</h2>
              <p className="mb-4 text-[#50846A]">Inicia sesión para poder acceder a las funciones del sistema</p>
              <Form className="flex flex-col mb-3">
                <div className="flex flex-col my-4">
                  <label className="text-sm text-white" htmlFor="username">
                    Usuario
                  </label>
                  <div className="flex items-center border-b border-secondary py-2">
                    <UserIcon className="text-white mr-2 h-8 w-8 opacity-80" />
                    <Field
                      className="bg-transparent text-white placeholder-secondary border-0 w-full"
                      id="username"
                      placeholder="Ingresa tu usuario"
                      type="text"
                      name="username"
                    />
                  </div>
                  <ErrorMessage name="username" component="div" className="text-red-500 pt-2" />
                </div>
                <div className="flex flex-col my-4">
                  <label className="text-sm text-white" htmlFor="password">
                    Contraseña
                  </label>
                  <div className="flex items-center border-b border-secondary py-2 mb-3">
                    <LockClosedIcon className="text-white mr-2 h-5 w-8 opacity-80" />
                    <Field
                      className="bg-transparent text-white placeholder-secondary border-0 w-full"
                      id="password"
                      placeholder="Ingresa tu contraseña"
                      type={passwordShown ? "text" : "password"}
                      name="password"
                    />
                    {passwordShown ? (
                      <EyeSlashIcon onClick={togglePasswordVisibility} className="text-white h-5 w-5 opacity-80 " />
                    ) : (
                      <EyeIcon onClick={togglePasswordVisibility} className="text-white h-5 w-5 opacity-80 " />
                    )}
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 " />
                </div>
                <button type="submit" className="py-3 rounded-full border-0 bg-[#092B5A] text-white">Iniciar sesión</button>
                <a href="#" onClick={() => setShowModal(true)} className="text-sm text-[#78A890] mt-4 hover:text-[#ffffff]">Olvidé mi contraseña</a>
              </Form>
            </div>
          </div>
          {showModal && (
            <div tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 w-full h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <div className="relative p-4 w-full max-w-md h-full md:h-auto z-50">
                <div className="relative bg-white rounded-lg shadow">
                  <button type="button" className="absolute top-0 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => setShowModal(false)}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </button>
                  <div className="p-6 text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500">Ingrese su correo electrónico para recuperar su contraseña</h3>
                    <form onSubmit={handleResetSubmit}>
                      <input
                        type="email"
                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Correo electrónico"
                        required
                        value={emailForReset}
                        onChange={(e) => setEmailForReset(e.target.value)}
                      />
                      <button type="submit" className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enviar correo</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {alertVisible && (
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">¡Éxito!</strong>
                <span className="block sm:inline">Tu solicitud de recuperación de contraseña ha sido enviada.</span>
              </div>
            </div>
          )}

          {errorAlertVisible && (
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline">{error}</span>
              </div>
            </div>
          )}

        </div>
      )}
    </Formik>
  );
}