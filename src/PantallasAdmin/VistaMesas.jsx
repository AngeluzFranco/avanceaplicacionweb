import React, {useState} from 'react';
import { Button, Navbar, Card, Modal, TextInput, Dropdown  } from 'flowbite-react';
import fondo from '../assets/fondo.png';
import imgMesa from '../assets/imgMesa.png';

function VistaMesas() {
  const [crearOpen, setcrearOpen] = useState(false);
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
      <Card href="#" className="max-w-sm mx-5 my-5" style={{ background: '#ea4242' }}>
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
              <Button className=" mt-4  text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800" style={{ width: 50 }}>estado</Button>
            </div>
          </div>
        </Card>
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
