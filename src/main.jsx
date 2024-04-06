import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
//import Navegador from '../src/PantallasAdmin/navegadorAdmin/navegador.jsx'
import Navegador from '../src/PantallasRecepcion/navegadorRecepcion/navegador.jsx'
//import Navegador from '../src/PantallasChef/navegadorChef/navegador.jsx'

import login from './login.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
    <Navegador />
  </React.StrictMode>,
)
