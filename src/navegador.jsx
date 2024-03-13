import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import './index.css'
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
//import Login from './login.jsx';
import imgLogo from './assets/imgGastromanager.png'
import './navegador.css'
import fondo from './assets/fondo.png'
import VisualizarMesas from './PantallasAdmin/VistaMesas.jsx'
import VisualizarUsuarios from './PantallasAdmin/VistaUsuarios.jsx'

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

    <div className="App bg-cover" style={{ backgroundImage: `url(${fondo})` }}>

      <Navbar className="h-40  items-center  transparent-navbar" style={{ paddingTop: 30 }} >

        <div className="flex justify-center " style={{ flex: '1', marginRight: 20, }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
            <img src={imgLogo} className="mr-1 h-12 md:h-12 sm:h-12" alt="Gastro Manager" />
            <div className="self-center text-base sm:text-base md:text-base font-semibold text-white" style={{ overflow: 'hidden' }}>Gastro Manager</div>
          </div>
        </div>

        <div className="flex md:order-2 justify-center" style={{ flex: '1' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
            <Button>Cerrar sesión</Button>
            <Navbar.Toggle />
          </div>
        </div>


        <Navbar.Collapse className="fondo" >
          <NavbarLink href="/visualizar-mesas" className={`Nav-link ${location.pathname === '/visualizar-mesas' ? 'active' : ''}`}> MESAS</NavbarLink>
          <NavbarLink href="/visualizar-usuarios" className={`Nav-link ${location.pathname === '/visualizar-usuarios' ? 'active' : ''}`}>USUARIOS</NavbarLink>
          <NavbarLink href="#" className="Nav-link" >MENU</NavbarLink>
          <NavbarLink href="#" className="Nav-link">PLATILLOS</NavbarLink>
          <NavbarLink href="#" className="Nav-link">INSUMOS</NavbarLink>
        </Navbar.Collapse>


      </Navbar>


      <div className="auth-wrapper">
        <div className="auth-inner h-screen overflow-hidden items-center">
          <Routes>
            <Route path="/visualizar-mesas" element={<VisualizarMesas />} />
            <Route path="/visualizar-usuarios" element={<VisualizarUsuarios />} />
          </Routes>
        </div>
      </div>
    </div>

  );
}

export default Navegador;