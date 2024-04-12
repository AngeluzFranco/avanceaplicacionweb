import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react';
import { API_BASE_URL } from '../backend.js';
import Swal from 'sweetalert2';

function Notificaciones() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_BASE_URL}/notificacion/`;
        const token = localStorage.getItem('token');
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Hubo un error en la petición');
        }
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error en la petición',
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen">
      <div className="container-cards flex items-start" style={{ height: 'auto',flexDirection: 'column',marginTop: '2%' }}>
        {data && data.map((notificacion, index) => (
          <div key={index}  className="flex flex-col items-center" style={{ width: '100%' }}>
             <Card className="max-w-screen-xl w-full mb-4">
              <div className="flex justify-between">
                <div>
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    # {notificacion.idNotificacion}
                  </h5>
                </div>
                <div>
                  <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                    Fecha: {notificacion.fecha}
                  </h5>
                </div>
                <div>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Descripción: {notificacion.descripcion}
                  </p>
                </div>
                <div>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Tipo: {notificacion.tipo}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notificaciones;
