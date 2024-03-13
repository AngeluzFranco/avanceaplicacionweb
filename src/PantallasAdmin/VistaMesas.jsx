import React from 'react';
import { Button, Navbar, Card } from 'flowbite-react';
import fondo from '../assets/fondo.png';
import imgMesa from '../assets/imgMesa.png';

function VistaMesas() {
  return (
    <div className="h-screen bg-cover" style={{ backgroundImage: `url(${fondo})` }}>
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
    </div>
  );
}

export default VistaMesas;
