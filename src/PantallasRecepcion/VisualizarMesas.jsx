import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Table } from 'flowbite-react';
import { Select } from 'antd';
import imgMesa from '../assets/imgMesa.png';
import { API_BASE_URL } from '../backend.js';
import Swal from 'sweetalert2';

// VALIDACIONES CON FORMIK Y YUP
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const { Option } = Select;

function ChefVisualizarM() {
  const [allData, setAllData] = useState([]); // Todas las mesas
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Todas');
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [subtotales, setSubtotales] = useState([]);
  const [pedidoData, setPedidoData] = useState([]); // Estado para almacenar los detalles del pedido

  //funcion para abrir y cerrar el modal
  const [mostrarOpen, setMostrarOpen] = useState(false);
  const closeModal = () => setMostrarOpen(false);

  // MOSTRAR TODAS LAS MESAS

  const fetchData = async () => {
    try {
      const url = `${API_BASE_URL}/mesas/`;
      const token = localStorage.getItem('token');
      const response = await fetch(url,{
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Hubo un error en la petición');
      }
      const jsonData = await response.json();
      setAllData(jsonData.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
 
    fetchData();
  }, []);

  // FILTRAR MESAS
  useEffect(() => {
    let filteredData;
    if (selectedOption === 'Ocupada') {
      filteredData = allData.filter(mesa => mesa.estado === 'Ocupada');
    } else if (selectedOption === 'Desocupada') {
      filteredData = allData.filter(mesa => mesa.estado === 'Desocupada');
    } else {
      filteredData = allData;
    }
    setData(filteredData);
  }, [selectedOption, allData]);

// Función para abrir el modal al hacer clic en el botón de una mesa ocupada
const openModal = async (mesa) => {
  setSelectedMesa(mesa);
  setMostrarOpen(true);

  try {
    const token = localStorage.getItem('token');
    const pedidoId = mesa.pedidosBean[0].idPedido;
    const response = await fetch(`${API_BASE_URL}/detallepedido/pedido/${pedidoId}`,{
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Hubo un error en la petición');
    }
    const jsonData = await response.json();
    const detallePedidos = jsonData.data;

    // Filtrar los detalles de pedidos en estado "Pagar"
    const pedidosData = detallePedidos
      .filter(detalle => detalle.pedido.estado === 'Pagar')
      .map(detalle => ({
        nombre: detalle.platillo.nombre,
        cantidad: detalle.cantidad,
        precio: detalle.precio_total / detalle.cantidad
      }));

    // Calcular subtotales
    const subtotalesArray = detallePedidos
      .filter(detalle => detalle.pedido.estado === 'Pagar')
      .map(detalle => detalle.precio_total);
    setSubtotales(subtotalesArray);

    setPedidoData(pedidosData); // Almacenar los detalles del pedido
  } catch (error) {
    console.error(error);
  }
};

// Función para calcular el total de la cuenta
const calcularTotal = () => {
  let total = subtotales.reduce((acc, subtotal) => acc + subtotal, 0);
  return total.toFixed(2);
};

const confirmRealizarPago = () => {
  Swal.fire({
    title: '¿Estás seguro que deseas realizar el pago?',
    text: 'Una vez realizado, no podrá deshacerse.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      handleRealizarPago(); // Si el usuario confirma, llamamos a la función para realizar el pago
    }
  });
};

const eliminarDetallesPedido = async (idPedido) => {
  try {
    const token = localStorage.getItem('token');
    // Consultar los detalles de pedido con el mismo ID de pedido
    const response = await fetch(`${API_BASE_URL}/detallepedido/pedido/${idPedido}`, {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Hubo un error en la petición');
    }
    const jsonData = await response.json();
    const detallePedidos = jsonData.data;

    // Eliminar cada detalle de pedido
    for (const detalle of detallePedidos) {
      await fetch(`${API_BASE_URL}/detallepedido/${detalle.idDetallePedido}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    // Una vez eliminados los detalles de pedido, eliminar el pedido
    await fetch(`${API_BASE_URL}/pedidos/${idPedido}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const handleRealizarPago = async () => {
  if (pedidoData.length === 0) {
    // Si no hay ningún pedido, mostrar alerta de que no se puede realizar el pago
    Swal.fire(
      'Error',
      'La mesa no tiene ningún pedido. No se puede realizar el pago.',
      'error'
    );
    closeModal();
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const pedidoId = selectedMesa.pedidosBean[0].idPedido;

    // Eliminar los detalles de pedido con el mismo ID de pedido
    await eliminarDetallesPedido(pedidoId);

    // Cambiar el estado de la mesa a "Desocupada"
    await fetch(`${API_BASE_URL}/mesas/${selectedMesa.idMesa}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ estado: 'Desocupada' })
      
    });

    

    // Mostrar mensaje de pago realizado
    Swal.fire(
      '¡Pago realizado!',
      'El pago se ha realizado correctamente.',
      'success'
    );
    
    await fetchData();
    closeModal();
  } catch (error) {
    console.error(error);
    Swal.fire(
      'Error',
      'Hubo un error al realizar el pago. Por favor, inténtalo de nuevo más tarde.',
      'error'
    );
    closeModal();
  }
};

  return (
    <div className="h-screen ">
      <div className='flex justify-center mt-3 mb-5'>
        <div className='w-9/12 m-2 flex justify-between'>
          <Select
            size="large"
            defaultValue="Todas"
            style={{ width: 140 }}
            onChange={value => setSelectedOption(value)}
          >
            <Option value="Todas">Todas</Option>
            <Option value="Ocupada">Ocupadas</Option>
            <Option value="Desocupada">Desocupadas</Option>
          </Select>
        </div>
      </div>
      <div className="container-cards flex items-center justify-center flex-wrap overflow-y-auto divScroll mx-5 " style={{ maxHeight: '65vh' }}>
        {data && [...data].sort((a, b) => Number(a.numeroMesa) - Number(b.numeroMesa)).map((item, index) => (
          <Card className="max-w-sm mx-5 my-5 ange" style={{ background: item.estado === 'Desocupada' ? '#F0F0F0' : '#fff', border: '1px solid orange' }} key={index}>
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
                <Button
                  disabled={item.estado === 'Desocupada'}
                  className={`mt-4 ${item.estado === 'Desocupada' ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800'}`}
                  onClick={() => openModal(item)}
                  style={{ width: 50 }}
                >
                  Pagar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal show={mostrarOpen} onClose={closeModal} size="6xl">
        <Modal.Header>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
            Mesa {selectedMesa ? selectedMesa.numeroMesa : ''}
          </h2>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div className="flex justify-between gap-4">
              <div className="w-full lg:w-4/5 p-4 h-100" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }} >
                <div className="mt-2 flex flex-wrap gap-2 overflow-y-auto max-h-100 min-h-64 divScroll">
                  <div className="overflow-x-auto w-full">
                    <Table className="w-full">
                      <Table.Head>
                        <Table.HeadCell>Nombre</Table.HeadCell>
                        <Table.HeadCell>Cantidad</Table.HeadCell>
                        <Table.HeadCell>Precio</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        {pedidoData.map((item, index) => (
                          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                              {item.nombre}
                            </Table.Cell>
                            <Table.Cell>{item.cantidad}</Table.Cell>
                            <Table.Cell>${item.precio}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </div>
                </div>
              </div>
              <div className="w-64 p-2" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }}>
                <div className="rounded text-center" style={{ borderBottom: 'solid 1px #d6d6d6' }}>
                  <div className="grid grid-cols-1 gap-2 mt-0 overflow-y-auto divScroll" style={{ maxHeight: '50%' }}>
                    <div>SubTotal</div>
                    {subtotales.map((subtotal, index) => (
                      <div key={index}>${subtotal}</div>
                    ))}
                  </div>
                </div>
                <div className="rounded text-center" style={{ borderTop: 'solid 1px #d6d6d6' }}>
                  <div className="grid grid-cols-1 gap-2 mt-0 overflow-y-auto divScroll" style={{ maxHeight: '50%' }}>
                    <div>Total:</div>
                    <div>${calcularTotal()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center w-full">
            <Button onClick={confirmRealizarPago}>
              Realizar pago
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ChefVisualizarM;
