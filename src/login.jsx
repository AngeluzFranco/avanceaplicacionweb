import React, { useState } from 'react';
import { UserIcon, LockClosedIcon, EyeIcon } from '@heroicons/react/20/solid';
import RestaurantLogin from './assets/RestaurantLogin.png';
import Gorro from './assets/gorro.png';
import './login.css';

export default function Component() {
    const [passwordShown, setPasswordShown] = useState(false);
  
    const togglePasswordVisiblity = () => {
      setPasswordShown(!passwordShown);
    };
  
    return (
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        {/* imagen de gorrito */}
        <img src={Gorro} alt="Gorrito" className="absolute top-6 right-10 w-16 h-auto max-w-[90px] max-h-[90px]" />
        {/* Contenedor de la imagen izquierda del restaurante */}
        <div className="flex items-center justify-center flex-grow md:flex-grow-0 md:w-1/2">
          <div className="flex items-center justify-center h-full w-full">
            <img src={RestaurantLogin} alt="Restaurant" className="bg-cover bg-center w-full h-full object-fill" />
          </div>
        </div>
        {/* Contenedor del formulario de login */}
        <div className="flex flex-col items-center justify-center px-5 flex-grow md:w-1/2 bg-[#050214]">
          <div className="max-w-md">
            {/* textoxd */}
            <h2 className="text-6xl mb-8 text-[#78A890] font-light font-semibold">Bienvenido</h2>
            <p className="mb-4 text-[#50846A]">Inicia sesión para poder acceder a las funciones del sistema</p>
            <div className="flex flex-col mb-3">
              {/* input de usuario */}
              <div className="flex flex-col my-4">
                <label className="text-sm text-white" htmlFor="username">
                  Usuario
                </label>
                <div className="flex items-center border-b border-secondary py-2">
                  <UserIcon className="text-white mr-2 h-8 w-8 opacity-80" />
                  <input
                    className="bg-transparent text-white placeholder-secondary border-0 w-full"
                    id="username"
                    placeholder="Ingresa tu usuario"
                    type="text"
                  />
                </div>
              </div>
              {/* input de contraseña */}
              <div className="flex flex-col my-4">
                <label className="text-sm text-white" htmlFor="password">
                  Contraseña
                </label>
                <div className="flex items-center border-b border-secondary py-2 mb-4">
                  <LockClosedIcon className="text-white mr-2 h-5 w-8 opacity-80" />
                  <input
                    className="bg-transparent text-white placeholder-secondary border-0 w-full"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    type={passwordShown ? "text" : "password"}
                  />
                  <EyeIcon onClick={togglePasswordVisiblity} className="text-white h-5 w-5 opacity-80 " />
                </div>
              </div>
              
              {/* pus un boton xd */}
              <button className="py-3 rounded-full border-0 bg-[#092B5A] text-white">Iniciar sesión</button>
            </div>
          </div>
        </div>

      </div>
    );
  }