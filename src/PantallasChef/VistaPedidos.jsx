import React, { useState, useEffect } from 'react';
import { Button, Card, Modal } from 'flowbite-react';
import { Select } from 'antd';
import { API_BASE_URL } from '../backend.js';

function RecVisualizarP() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_BASE_URL}/pedidos/`;
        const response = await fetch(url,{
          headers: {
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJ1Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IldBSVRFUl9ST0xFIn1dLCJpYXQiOjE3MTI0MTEyMTMsImV4cCI6MTcxMzAxNjAxM30.qlmTnuJ9ADga3lu_F_aEhhCnPznOMyfk4kvHewzAAI4'   
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

  return (
    <div className="h-screen">
      <div className="container-cards flex items-start" style={{ height: 'auto', marginTop: '2%' }}>
        <div className="flex flex-col items-center" style={{ width: '100%' }}>
        {data && data.map((item, index) => (
            <Card
            key={index}
              className="max-w-screen-sm w-full mb-4"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.idPedido}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {item.estado}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecVisualizarP;
