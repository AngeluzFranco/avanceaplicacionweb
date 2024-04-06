import React, { useState } from 'react';
import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import RestaurantLogin from './assets/RestaurantLogin.png';
import Gorro from './assets/gorro.png';
import './login.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const validationSchema = Yup.object().shape({
  username: Yup.string()
  .matches(/^[a-zA-Z0-9]*$/, 'Solo se permiten números y letras')
  .required('El usuario es requerido'),
password: Yup.string()
  .matches(/^[a-zA-Z0-9]*$/, 'Solo se permiten números y letras')
  .required('La contraseña es requerida')
});

export default function LoginComponent() {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = {
      user: values.username,
      password: values.password
    };

    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
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
        Swal.fire({title: 'Perfecto',text: 'Inicio de sesión exitoso',icon: 'success',confirmButtonColor: '#0f80f2'});
      } else {
        const fullResponse = await response.json();
        const data = fullResponse.data;
        Swal.fire('Error', data.message, 'error');
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
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}