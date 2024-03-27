import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Dropdown, FloatingLabel } from 'flowbite-react';
import imgMesa from '../assets/imgMesa.png';
import './mesas.css';
import { Select } from 'antd';

function VistaMesas() {
  const [data, setData] = useState(null);
  const [crearOpen, setcrearOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.100.29:8080/api/gastromanager/mesas/');
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

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="h-screen ">
      <div className='flex justify-center mt-3 mb-5'>
        <div className='w-9/12 m-2 flex justify-between'>
        <div className="relative flex justify-center">
    <Button onClick={handleOpen} className='justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' size="xl" outline > Agregar  +  </Button>
    {isOpen && (
        <div className="absolute rollIn top-full m-3">
            <div className="space-y-6 snake-border rotating-border bg-white p-5 w-60 shadow-lg">
                <h5 className="text-2xl font-medium text-gray-900 dark:text-white text-center">
                    Crea tu mesa
                </h5>
                <div className='flex justify-content gap-4'>
                <div>
                    <FloatingLabel variant="outlined" label="# Mesa" className='text-base' />
                </div>
                <div>
                    <FloatingLabel variant="outlined" label="# Sillas" className='text-base' />
                </div>
                </div>
                
                <div className="flex justify-center w-full">
                    <Button className='w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' outline size="md" onClick={() => console.log('Crear usuario')}>
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

     

      <div className="container-cards flex items-center justify-center flex-wrap">
        {data && data.map((item, index) => (
          <Card href="#" className="max-w-sm mx-5 my-5" style={{ background: '#fff', border: '1px solid orange' }} key={index}>
            <div className="flex items-center gap-4">
              <div className='mx-2'>
                <div className='flex flex-row'>
                  <h5 className="text-xl font-bold tracking-tight">Mesa:</h5>
                  <h5 className="text-xl font-bold tracking-tight">{item.numeroMesa}</h5>
                </div>
                <div className='flex flex-col'>
                  <p className="font-normal">Asientos:</p>
                  <h5 className="text-xl font-bold tracking-tight">X {item.numeroSillas}</h5>
                </div>
                <div className='flex flex-row'>
                  <h5 className="text-s font-bold tracking-tight">Estado:</h5>
                  <h5 className="text-s font-bold tracking-tight">{item.estado}</h5>
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
