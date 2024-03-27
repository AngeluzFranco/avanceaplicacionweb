import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, TextInput, Dropdown } from 'flowbite-react';
import imgMesa from '../assets/imgMesa.png';

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

  return (
    <div className="h-screen ">
      <div className='flex justify-center mt-3 mb-5'>
        <div className='w-9/12 m-2 flex justify-between'>
          <Button onClick={() => setcrearOpen(true)} className='justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' size="xl" outline > Agregar  +  </Button>
          <Dropdown label="TODAS">
            <Dropdown.Item>Ocupadas</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Desocupadas</Dropdown.Item>
          </Dropdown>
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


      <Modal show={crearOpen} onClose={() => setcrearOpen(false)} size="md" position="center">
        <Modal.Header style={{ padding: 0 }}>
          <div className="flex items-center justify-center w-full">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Crea tu mesa</h5>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <form>
              <div className="mb-4">
                <TextInput id="table-number" placeholder="Número de mesa:" />
              </div>
              <div className="mb-4">
                <TextInput id="chair-number" placeholder="Número de sillas:" />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" size="sm" onClick={() => console.log('Crear mesa')}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VistaMesas;
