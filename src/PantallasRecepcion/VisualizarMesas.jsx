import React, { useState, useEffect } from 'react';
import { Button, Card, Modal } from 'flowbite-react';
import { Select } from 'antd';
import imgMesa from '../assets/imgMesa.png';
import { API_BASE_URL } from '../backend.js';

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_BASE_URL}/mesas/`;
        const response = await fetch(url,{
          headers: {
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJ1Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IldBSVRFUl9ST0xFIn1dLCJpYXQiOjE3MTI0MTEyMTMsImV4cCI6MTcxMzAxNjAxM30.qlmTnuJ9ADga3lu_F_aEhhCnPznOMyfk4kvHewzAAI4'   
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
      const mesaId = mesa.idMesa;
      const response = await fetch(`${API_BASE_URL}/pedidos/mesa/${mesaId}`);
      if (!response.ok) {
        throw new Error('Hubo un error en la petición');
      }
      const jsonData = await response.json();
      const pedidos = jsonData;

      const subtotalesArray = [];

      const mesaData = pedidos.map(pedido => {
        pedido.detallesPedidoBean.forEach(detalle => {
          subtotalesArray.push(detalle.precio_total);
        });
        return pedido.detallesPedidoBean.map(detalle => ({
          nombre: detalle.platillo.nombre,
          cantidad: detalle.cantidad,
          precio: detalle.precio_total / detalle.cantidad
        }));
      }).flat();

      setSubtotales(subtotalesArray);
      setPedidoData(mesaData); // Almacenar los detalles del pedido

    } catch (error) {
      console.error(error);
    }
  };

  // Función para calcular el total de la cuenta
  const calcularTotal = () => {
    let total = subtotales.reduce((acc, subtotal) => acc + subtotal, 0);
    return total.toFixed(2); // Redondeamos el total a dos decimales
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
                <div className="mt-2 flex flex-wrap gap-2 overflow-y-auto max-h-64 min-h-64 divScroll">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedidoData.map((item, index) => ( // Utilizamos pedidoData en lugar de data
                        <tr key={index}>
                          <td>{item.nombre}</td>
                          <td>{item.cantidad}</td>
                          <td>{item.precio}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-64 p-2" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }}>
                <div className="rounded text-center" style={{ borderBottom: 'solid 1px #d6d6d6' }}>
                  <div className="grid grid-cols-1 gap-2 mt-0 overflow-y-auto divScroll" style={{ maxHeight: '50%' }}>
                    <div>SubTotal</div>
                    {subtotales.map((subtotal, index) => (
                      <div key={index}>{subtotal}</div>
                    ))}
                  </div>
                </div>
                <div className="rounded text-center" style={{ borderTop: 'solid 1px #d6d6d6' }}>
                  <div className="grid grid-cols-1 gap-2 mt-0 overflow-y-auto divScroll" style={{ maxHeight: '50%' }}>
                    <div>Total:</div>
                    <div>{calcularTotal()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center w-full">
            <Button onClick={closeModal}>
              Realizar pago
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ChefVisualizarM;
