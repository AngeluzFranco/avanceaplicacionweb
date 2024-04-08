import React, { useState, useEffect } from 'react';
import { Button, Card } from 'flowbite-react';
import { API_BASE_URL } from '../backend.js';
import Swal from 'sweetalert2';

function RecVisualizarP() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_BASE_URL}/pedidos/`;
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

  const handleTerminarPedido = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez Terminado el pedido, no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, terminar pedido'
    }).then((result) => {
      if (result.isConfirmed) {
        // la lógica para cambio de estado
        Swal.fire(
          '¡Pedido terminado!',
          'La confirmacion del pedido se ha realizado correctamente.',
          'success'
        );
        closeModal();
      }
      else {
        closeModal();
      }
    });
  };

  return (
    <div className="h-screen">
      <div className="container-cards flex items-start" style={{ height: 'auto', marginTop: '2%' }}>
        <div className="flex flex-col items-center" style={{ width: '100%' }} >
          {data && data.map((pedido, index) => (
            <Card
              key={index}
              className="max-w-screen-xl w-full mb-4"
            >
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ flexDirection: 'colum' }}>
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Pedido: {pedido.idPedido}
                  </h5>
                  <h4 className="text-xl font-bold tracking-tight text-gray-800 dark:text-white">
                    Para la mesa: {pedido.mesa.numeroMesa}
                  </h4>
                </div>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Platillos: {pedido.detallesPedidoBean.map(detalle => detalle.platillo.nombre).join(', ')}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Estado: {pedido.estado}
                </p>
                <Button onClick={handleTerminarPedido}>Terminado</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecVisualizarP;
