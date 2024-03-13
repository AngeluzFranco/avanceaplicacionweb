import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import './index.css'
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
//import Login from './login.jsx';
import imgLogo from './assets/imgGastromanager.png'
import './navegador.css'
import fondo from './assets/fondo.png'
import VisualizarMesas from './PantallasAdmin/VistaMesas.jsx'
import VisualizarUsuarios from './PantallasAdmin/VistaUsuarios.jsx'
import VisualizarMenu from './PantallasAdmin/VistaMenu.jsx'
import VisualizarPlatillos from './PantallasAdmin/VistaPlatillos.jsx'
import VisualizarInsumos from './PantallasAdmin/VistaInsumos.jsx'

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
          <NavbarLink href="/visualizar-menus" className={`Nav-link ${location.pathname === '/visualizar-menus' ? 'active' : ''}`}>MENU</NavbarLink>
          <NavbarLink href="/visualizar-platillos" className={`Nav-link ${location.pathname === '/visualizar-platillos' ? 'active' : ''}`}>PLATILLOS</NavbarLink>
          <NavbarLink href="/visualizar-insumos" className={`Nav-link ${location.pathname === '/visualizar-insumos' ? 'active' : ''}`}>INSUMOS</NavbarLink>
        </Navbar.Collapse>


      </Navbar>


      <div className="auth-wrapper">
        <div className="auth-inner h-screen overflow-hidden items-center">
          <Routes>
            <Route path="/visualizar-mesas" element={<VisualizarMesas />} />
            <Route path="/visualizar-usuarios" element={<VisualizarUsuarios />} />
            <Route path="/visualizar-menus" element={<VisualizarMenu />} />
            <Route path="/visualizar-platillos" element={<VisualizarPlatillos />} />
            <Route path="/visualizar-insumos" element={<VisualizarInsumos />} />
          </Routes>
        </div>
      </div>
    </div>

  );
}

export default Navegador;