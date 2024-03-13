import React, {useState} from 'react';
import { Button, Navbar, Card, Modal, TextInput, Dropdown  } from 'flowbite-react';
import fondo from '../assets/fondo.png';
import imgMesa from '../assets/imgMesa.png';

function VistaMesas() {
  const [crearOpen, setcrearOpen] = useState(false);
  return (
    <div className="h-screen bg-cover" style={{ backgroundImage: `url(${fondo})` }}>
<div className='flex justify-center mt-3 mb-5'>
    <div className='w-9/12 m-2 flex justify-between'>
        <Button onClick={() => setcrearOpen(true)} className='justify-start' size="xl" outline gradientDuoTone="greenToBlue"> Agregar  +  </Button>
        <Dropdown label="TODAS">
            <Dropdown.Item>Ocupadas</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Desocupadas</Dropdown.Item>
        </Dropdown>
    </div>
</div>

      <div className="container-cards flex items-center justify-center flex-wrap">
      <Card href="#" className="max-w-sm mx-5 my-5" style={{ background: 'rgba(9, 43, 90, 1)' }}>
          <div class="flex items-center gap-4">
            <div className='mx-2'>
              <div className='flex flex-row'>
                <h5 class="text-xl font-bold tracking-tight text-white">
                  Mesa:
                </h5>
                <h5 class="text-xl font-bold tracking-tight text-white">
                  1
                </h5>
              </div>
              <div className='flex flex-col'>
              <p class="font-normal text-white">
                Asientos:
              </p>
              <h5 class="text-xl font-bold tracking-tight text-white">
                X 5
              </h5>
              </div>
              <div className='flex flex-row'>
              <h5 class="text-s font-bold tracking-tight text-white">
                Estado:
              </h5>
              <h5 class="text-s font-bold tracking-tight text-white">
                Desocupada
              </h5>
              </div>
            </div>
            <div class="flex flex-col items-center">
              <img src={imgMesa} class="mb-2 h-20 md:h-20 sm:h-20" alt="imagen mesa" />
              <Button className="btn btn-primary mt-4" style={{ width: 30 }}></Button>
            </div>
          </div>
        </Card>
      </div>


      <Modal show={crearOpen} onClose={() => setcrearOpen(false)} size="md" position="center">
        <Modal.Header>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center w-full">Crea tu mesa</h5>
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
