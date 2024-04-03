import React, { useState, useEffect } from 'react';
import { Card, Select } from 'antd';
import imgMesa from '../assets/imgMesa.png';
import { API_BASE_URL } from '../backend.js';

const { Option } = Select;

function ChefVisualizarM() {
  const [allData, setAllData] = useState([]); // Todas las mesas
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Todas');

  // MOSTRAR TODAS LAS MESAS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_BASE_URL}/mesas/`;
        const response = await fetch(url);
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
          <Card className="max-w-sm mx-5 my-5 ange" style={{ background: '#fff', border: '1px solid orange' }} key={index}>
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
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ChefVisualizarM;
