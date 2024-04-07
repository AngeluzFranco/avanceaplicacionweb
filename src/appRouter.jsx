import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginComponent from './login';
import AdminComponent from './PantallasAdmin/navegadorAdmin/navegador'; 
import ChefComponent from './PantallasChef/navegadorChef/navegador';
import RecepcionComponent from './PantallasRecepcion/navegadorRecepcion/navegador'; 
import { AuthProvider } from './authContext';
import { Card } from 'flowbite-react';

import Gorro from './assets/imgGastromanager.png';

const AccessDenied = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-black to bg-slate-950" >
     <img src={Gorro} alt="Gorrito" className='w-3/12 h-3/12 mb-4'  />
     <Card className="max-w-md mx-auto text-center p-6 bg-gray-950">
       <h1 className="text-xl font-bold text-white">Acceso denegado</h1>
       <p className="mt-4 text-orange-400">No tienes permiso para acceder a esta página.</p>
     </Card>
   </div>
      );
  };
  

const WithAuth = (WrappedComponent) => {
    return (props) => {
      const token = localStorage.getItem('token');
      const navigate = useNavigate();
  
      React.useEffect(() => {
        if (!token) {
          navigate('/access-denied'); // Redirige a la página de acceso denegado
        }
      }, [token, navigate]);
  
      if (!token) {
        return null;
      }
  
      return <WrappedComponent {...props} />;
    };
  };

// Envuelve tus componentes con WithAuth
const AdminComponentWithAuth = WithAuth(AdminComponent);
const ChefComponentWithAuth = WithAuth(ChefComponent);
const RecepcionComponentWithAuth = WithAuth(RecepcionComponent);

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" index/>} />
          <Route path="/admin/*" element={<AdminComponentWithAuth />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/chef/*" element={<ChefComponentWithAuth />} />
          <Route path="/recepcion/*" element={<RecepcionComponentWithAuth />} />
          <Route path="/access-denied" element={<AccessDenied />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;