import React from 'react'
import ReactDOM from 'react-dom'


// import Navegador from '../src/PantallasRecepcion/navegadorRecepcion/navegador.jsx'
//import Navegador from '../src/PantallasChef/navegadorChef/navegador.jsx'
import AppRouter from './appRouter.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
    <AppRouter />
  </React.StrictMode>,
)
