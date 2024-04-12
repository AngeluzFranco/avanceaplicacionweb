import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import '../../index.css'
import { Button, Navbar, NavbarLink } from 'flowbite-react';
import imgLogo from '../../assets/imgGastromanager.png'
import './navegador.css'

import VisualizarPedidos from '../VistaPedidos.jsx'
import VisualizarNotificaciones from '../Notificaciones.jsx'


import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

function Navegador() {
  return (
    <Router >
      <Navigation />
    </Router>
  );
}


function Navigation() {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar className="h-40  items-center  transparent-navbar" style={{ paddingTop: 30 }} >
        <div className="flex justify-center " style={{ flex: '1', marginRight: 20, }}>
          <Link to="/visualizar-usuarios" style={{ textDecoration: 'none', color: 'inherit' }} className="gastro">
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
              <img src={imgLogo} className="mr-1 h-12 md:h-12 sm:h-12" alt="Gastro Manager" />
              <div className="self-center text-base sm:text-base md:text-base font-semibold text-white" style={{ overflow: 'hidden', color: '#E25500' }}>Gastro Manager</div>
            </div>
          </Link>
        </div>

        <div className="flex md:order-2 justify-center" style={{ flex: '1' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
            <Button className="cerrar p-0 h-12">
              <IconButton aria-label="delete" className="p-0" sx={{ color: '#FF8E4A' }} >
                <LogoutIcon />
              </IconButton> <span className="text-sm">Cerrar sesión</span>
            </Button>
            <Navbar.Toggle />
          </div>
        </div>


        <Navbar.Collapse className="fondo" >
          <NavbarLink href="/visualizar-pedidos" className={`Nav-link ${location.pathname === '/visualizar-pedidos' ? 'active' : ''}`}> PEDIDOS</NavbarLink>
          <NavbarLink href="/visualizar-notificaciones" className={`Nav-link ${location.pathname === '/visualizar-notificaciones' ? 'active' : ''}`}>NOTIFICACIONES</NavbarLink>
        </Navbar.Collapse>
      </Navbar>

      <hr style={{ marginBottom: 50, borderTop: "3px solid #FFDEB6" }} />
      <div className="auth-wrapper" style={{ height: '77.5vh', paddingBottom: 8 }}>
        <div className="auth-inner overflow-hidden items-center" style={{ maxHeight: '100%' }} >
          <Routes>
            <Route path="/" element={<Navigate to="/visualizar-pedidos" />} />
            <Route path="/visualizar-pedidos" element={<VisualizarPedidos />} />
            <Route path="/*" element={<VisualizarPedidos />} />
            <Route path="/visualizar-notificaciones" element={<VisualizarNotificaciones />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Navegador;