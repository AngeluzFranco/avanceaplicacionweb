import React, { useState, useEffect } from 'react';
import { Button, Card } from 'flowbite-react';
import { API_BASE_URL } from '../backend.js';
import Swal from 'sweetalert2';

function RecVisualizarP() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_BASE_URL}/detallepedido/`;
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
      }
    };
    fetchData();
  }, []);

  const handleTerminarPedido = async (pedidoId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez Terminado el pedido, no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, terminar pedido'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const url = `${API_BASE_URL}/pedidos/${pedidoId}`; // Ajusta la URL según la estructura de tu API
          const token = localStorage.getItem('token');
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              estado: 'Terminado'
            })
          });
  
          if (!response.ok) {
            throw new Error('Hubo un error al intentar cambiar el estado del pedido');
          }
  
          // Actualizar los datos manteniendo los detalles del pedido
          const updatedPedido = await response.json();
          setData(data.map(pedido => pedido.idPedido === pedidoId ? updatedPedido : pedido));
  
          Swal.fire(
            '¡Pedido terminado!',
            'La confirmación del pedido se ha realizado correctamente.',
            'success'
          );
        } catch (error) {
          console.error(error);
          Swal.fire(
            'Error',
            'Hubo un error al intentar cambiar el estado del pedido.',
            'error'
          );
        }
      }
    });
  };
  

  // Función para agrupar los detalles del pedido por ID de pedido
  const groupByPedidoId = () => {
    if (!data) return [];

    const groupedData = {};
    data.forEach(detallePedido => {
      const pedidoId = detallePedido.pedido.idPedido;
      if (!groupedData[pedidoId]) {
        groupedData[pedidoId] = {
          platillos: [],
          estado: detallePedido.pedido.estado
        };
      }
      groupedData[pedidoId].platillos.push(detallePedido.platillo.nombre);
    });
    return groupedData;
  };

  return (
    <div className="h-screen">
      <div className="container-cards flex items-start" style={{ height: 'auto', marginTop: '2%' }}>
        <div className="flex flex-col items-center" style={{ width: '100%' }}>
        {Object.keys(groupByPedidoId())
  .filter(pedidoId => groupByPedidoId()[pedidoId].estado === 'En proceso')
  .map(pedidoId => (
    <Card key={pedidoId} className="max-w-screen-xl w-full mb-4">
      <div className="flex justify-between">
        <div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Pedido: {pedidoId}
          </h5>
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Platillos: {groupByPedidoId()[pedidoId].platillos.join(', ')}
        </p>
        <div><p className="font-normal text-gray-700 dark:text-gray-400">
          Estado: {groupByPedidoId()[pedidoId].estado}
        </p></div>
        <div>
          <Button onClick={() => handleTerminarPedido(pedidoId)}>Terminado</Button>
        </div>
      </div>
    </Card>
))}
        </div>
      </div>
    </div>
  );
}

export default RecVisualizarP;
