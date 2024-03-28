import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Dropdown, FloatingLabel } from 'flowbite-react';
import imgMesa from '../assets/imgMesa.png';
import './mesas.css';
import { Select } from 'antd';
import {API_BASE_URL} from '../backend.js';

function VistaMesas() {
// MOSTRAR MESAS
const [data, setData] = useState([]);
const [crearOpen, setcrearOpen] = useState(false);

// MOSTRAR MESAS
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/mesas/`);
      if (!response.ok) {
        throw new Error('Hubo un error en la petición');
      }
      const jsonData = await response.json();
      setData(jsonData.data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, []);

// ABRIR CREAR MESA
const [isOpen, setIsOpen] = useState(false);

const handleOpen = () => setIsOpen(!isOpen);

// CREAR MESA
const [numeroMesa, setNumeroMesa] = useState('');
const [numeroSillas, setNumeroSillas] = useState('');
const [estado, setEstado] = useState('Disponible');

const crearMesa = async () => {
  const mesa = {
    numeroMesa: parseInt(numeroMesa),
    estado: estado,
    numeroSillas: parseInt(numeroSillas)
  };

  try {
    const response = await fetch(`${API_BASE_URL}/mesas/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mesa)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setData(prevData => [...prevData, data.data]);; // Añadir la nueva mesa al estado

  } catch (error) {
    console.error(error);
  }
};

return (
  <div className="h-screen ">
    <div className='flex justify-center mt-3 mb-5'>
      <div className='w-9/12 m-2 flex justify-between'>
        <div className="relative flex justify-center">
          <Button onClick={handleOpen} className='justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' size="xl" outline > Agregar  +  </Button>
          {isOpen && (
            <div className="absolute rollIn top-full m-3 z-10">
              <div className="space-y-6 rotating-border bg-white p-5 w-60 shadow-lg z-10">
                <h5 className="text-2xl font-medium text-gray-900 dark:text-white text-center z-10">
                  Crea tu mesa
                </h5>
                <div className='flex justify-content gap-4 z-10'>
                  <div>
                    <FloatingLabel variant="outlined" label="# Mesa" className='text-base z-10' onChange={e => setNumeroMesa(e.target.value)} />
                  </div>
                  <div>
                    <FloatingLabel variant="outlined" label="# Sillas" className='text-base z-10' onChange={e => setNumeroSillas(e.target.value)} />
                  </div>
                </div>

                <div className="flex justify-center w-full">
                  <Button className='w-40 z-10 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' outline size="md" onClick={crearMesa}>
                    Crear
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      
         
            
      

              <Select 
              size="large"
              status="warning"
              
              
              className='customSelect'
      defaultValue="Todas"
      style={{ width: 140}}
      options={[
        { value: 'Todas', label: 'Todas' },
        { value: 'Ocupadas', label: 'Ocupadas' },
        { value: 'Desocupadas', label: 'Desocupadas' },

      ]}
    />
        </div>
      </div>

     

      <div className="container-cards flex items-center justify-center flex-wrap overflow-y-auto divScroll mx-5 " style={{ maxHeight: '65vh' }}>
          {data && data.map((item, index) => (
            <Card href="#" className="max-w-sm mx-5 my-5" style={{ background: '#fff', border: '1px solid orange' }} key={index}>
              <div className="flex items-center gap-4">
                <div className='mx-2'>
                  <div className='flex flex-row'>
                    <h5 className="text-xl font-bold tracking-tight mr-1">Mesa:</h5>
                    <h5 className="text-xl font-bold tracking-tight">{item.numeroMesa}</h5>
                  </div>
                  <div className='flex flex-col'>
                    <p className="font-normal">Asientos:</p>
                    <h5 className="text-xl font-bold tracking-tight">X {item.numeroSillas}</h5>
                  </div>
                  <div className='flex flex-row z-0'>
                    <h5 className="text-s font-bold tracking-tight z-0 mr-1">Estado:</h5>
                    <h5 className="text-s font-bold tracking-tight z-0">{item.estado}</h5>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <img src={imgMesa} className="mb-2 h-20 md:h-20 sm:h-20" alt="imagen mesa" />
                  <Button className="mt-4 bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800" style={{ width: 50 }} onClick={() => handleAbrirModal(item)}>estado</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>


      <Modal show={crearOpen} onClose={() => setcrearOpen(false)} size="xl" position="center">
        <Modal.Header>
          <h5 className="text-2xl font-medium text-gray-900 dark:text-white text-center">
            Crea tu mesa
          </h5>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <FloatingLabel variant="outlined" label="Número de mesa" className='text-base'/>
            </div>
            <div>
              <FloatingLabel variant="outlined" label="Número de sillas" className='text-base'/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center w-full">
            <Button className='w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' outline size="md" onClick={() => console.log('Crear usuario')}>
              Crear
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VistaMesas;
