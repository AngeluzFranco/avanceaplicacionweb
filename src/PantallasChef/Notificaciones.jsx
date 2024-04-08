import React, { useState, useEffect } from 'react';
import { Button, Card } from 'flowbite-react';
import { API_BASE_URL } from '../backend.js';
import Swal from 'sweetalert2';

function Notificaciones() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_BASE_URL}/notificacion/`;
        const response = await fetch(url);
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
      <div className="container-cards flex items-start" style={{ height: 'auto', marginTop: '2%' }}>
        <div className="flex flex-col items-center" style={{ width: '100%' }}>
          {data && data.map((notificacion, index) => (
            <Card
              key={index}
              className="max-w-screen-xl w-full mb-4"
            >
              <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                {notificacion.fecha}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {notificacion.descripcion}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {notificacion.tipo}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notificaciones
