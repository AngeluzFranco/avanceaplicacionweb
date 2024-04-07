import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate, useNavigate} from "react-router-dom";
import '../../index.css'
import { Button, Navbar, NavbarLink} from 'flowbite-react';
import imgLogo from '../../assets/imgGastromanager.png'
import './navegador.css'

import VisualizarMesas from '../VisualizarMesas.jsx'

import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

import Swal from 'sweetalert2';


function Navegador() {
  return (
  
      <Navigation />
  
  );
}


function Navigation() {
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    Swal.fire({
      title: 'Hasta luego',
      text: 'Cerrando sesión...',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
    
  };

  return (

    <div className="App">

      <Navbar className="h-40  items-center  transparent-navbar" style={{ paddingTop: 30 }} >

        <div className="flex justify-center " style={{ flex: '1', marginRight: 20, }}>
            <Link to="/visualizar-usuarios" style={{ textDecoration: 'none', color: 'inherit'}} className="gastro">
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                    <img src={imgLogo} className="mr-1 h-12 md:h-12 sm:h-12" alt="Gastro Manager" />
                    <div className="self-center text-base sm:text-base md:text-base font-semibold text-white" style={{ overflow: 'hidden', color: '#E25500' }}>Gastro Manager</div>
                </div>
            </Link>
        </div>

        <div className="flex md:order-2 justify-center" style={{ flex: '1' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
          <Button className="cerrar p-0 h-12" onClick={handleLogout}>
      <IconButton aria-label="delete" className="p-0" sx={{ color: '#FF8E4A' }} >
        <LogoutIcon />
      </IconButton> 
      <span className="text-sm">Cerrar sesión</span> 

    </Button>
            <Navbar.Toggle />
          </div>
        </div>


        <Navbar.Collapse className="fondo" >
          <NavbarLink href="/recepcion/visualizar-mesas" className={`Nav-link ${location.pathname === '/recepcion/visualizar-mesas' ? 'active' : ''}`}> MESAS</NavbarLink>
        </Navbar.Collapse>


      </Navbar>

      <hr style={{ marginBottom: 50, borderTop: "3px solid #FFDEB6" }} />

      <div className="auth-wrapper" style={{ height: '77.5vh', paddingBottom: 8 }}>
  <div className="auth-inner overflow-hidden items-center" style={{maxHeight: '100%'}} >
    <Routes>
      <Route path="/" element={<Navigate to="visualizar-mesas" />} />
      <Route path="visualizar-mesas" element={<VisualizarMesas />} />
    </Routes>
  </div>
</div>
    </div>

  );
}

export default Navegador;