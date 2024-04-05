import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate} from "react-router-dom";
import './index.css'

import VisualizarMesas from './PantallasAdmin/VistaMesas.jsx'
import VisualizarUsuarios from './PantallasAdmin/VistaUsuarios.jsx'
import VisualizarMenu from './PantallasAdmin/VistaMenu.jsx'
import VisualizarPlatillos from './PantallasAdmin/VistaPlatillos.jsx'
import VisualizarInsumos from './PantallasAdmin/VistaInsumos.jsx'
import Layout from './Layout.jsx';

function Navegador() {
  return (
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="visualizar-mesas" element={<VisualizarMesas />} />
        <Route index path="visualizar-usuarios" element={<VisualizarUsuarios />} />
        <Route path="visualizar-menus" element={<VisualizarMenu />} />
        <Route path="visualizar-platillos" element={<VisualizarPlatillos />} />
        <Route path="visualizar-insumos" element={<VisualizarInsumos />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default Navegador;