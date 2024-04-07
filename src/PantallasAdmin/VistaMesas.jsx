import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Dropdown, FloatingLabel } from 'flowbite-react';
import imgMesa from '../assets/imgMesa.png';
import './mesas.css';
import { Select } from 'antd';
import { API_BASE_URL } from '../backend.js';
import Swal from 'sweetalert2';


// VALIDACIONES CON FORMIK Y YUP
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, } from 'formik';



const validationSchema = Yup.object({
  numeroSillas: Yup.number()
    .required('Requerido')
    .min(1, 'Número de sillas debe ser mayor a 0')
    .max(12, 'Número de sillas debe ser menor a 12'),
});




function VistaMesas() {
  // MOSTRAR MESAS
  const [allData, setAllData] = useState([]); // Todas las mesas
  const [data, setData] = useState([]);
  const [crearOpen, setcrearOpen] = useState(false);
  // FILTRO DE MESAS
  const [selectedOption, setSelectedOption] = useState('Todas');

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
  }, []); // Este useEffect se ejecuta solo una vez al montar el componente

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
  }, [selectedOption, allData]); // Este useEffect se ejecuta cada vez que selectedOption o allData cambian

  // ABRIR CREAR MESA
  const [isOpen, setIsOpen] = useState(false);



  // CREAR MESA
  const [numeroMesa, setNumeroMesa] = useState('');
  const [numeroSillas, setNumeroSillas] = useState('');
  const [estado, setEstado] = useState('Desocupada');


  const crearMesa = async (numeroSillas, resetForm) => {
    const mesa = {
      numeroMesa: parseInt(numeroMesa),
      estado: estado,
      numeroSillas: parseInt(numeroSillas)
    };
    
    // USO DE SWEETALERT
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-500 text-white px-4 py-2 mx-3 rounded",
        cancelButton: "bg-red-500 text-white px-4 py-2 mx-3 rounded"
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: "¿Quieres crear una nueva mesa?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "¡Sí, creala!",
      cancelButtonText: "¡No, cancela!",
      reverseButtons: true
    }).then(async (result) => {
      handleOpen();
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_BASE_URL}/mesas/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJ1Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IldBSVRFUl9ST0xFIn1dLCJpYXQiOjE3MTI0MTEyMTMsImV4cCI6MTcxMzAxNjAxM30.qlmTnuJ9ADga3lu_F_aEhhCnPznOMyfk4kvHewzAAI4'   
            },
            body: JSON.stringify(mesa)
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          setData(prevData => [...prevData, data.data]); // Añadir la nueva mesa al estado
          setAllData(prevAllData => [...prevAllData, data.data]); // Añadir la nueva mesa a allData
          resetForm();
          swalWithBootstrapButtons.fire(
            'Mesa creada!',
            'Tu mesa ha sido creada con éxito.',
            'success'
          );
  
        } catch (error) {
          console.error(error);
  
          swalWithBootstrapButtons.fire(
            'Acción cancelada',
            'La mesa no ha sido creada',
            'error'
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Acción cancelada',
            'La mesa no ha sido creada',
            'error'
        );
      }
    });
  };

  // Función para encontrar el número de mesa que falta
  const encontrarNumeroMesaFaltante = () => {
    const numerosMesa = allData.map(mesa => Number(mesa.numeroMesa));
    console.log(numerosMesa); // Ver los números de mesa antes de ordenar
    numerosMesa.sort((a, b) => a - b);
    console.log(numerosMesa); // Ver los números de mesa después de ordenar

    for (let i = 0; i < numerosMesa.length; i++) {
      if (numerosMesa[i] !== i + 1) {
        return i + 1;
      }
    }

    return numerosMesa.length + 1;
  };

  // Establecer el número de mesa que falta cuando se abre el formulario de creación de mesa
  const handleOpen = () => {
    const numeroMesaFaltante = encontrarNumeroMesaFaltante();
    setNumeroMesa(numeroMesaFaltante);
    setIsOpen(!isOpen);
  };



  return (

        <div className="h-screen ">
          <div className='flex justify-center mt-3 mb-5'>
            <div className='w-9/12 m-2 flex justify-between'>
            <Formik
      initialValues={{ numeroSillas: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setNumeroSillas(values.numeroSillas);
        crearMesa(values.numeroSillas, resetForm);
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, errors }) => (
              <div className="relative flex justify-center">
                <Button onClick={handleOpen} className='justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' size="xl" outline > Agregar  +  </Button>
                {isOpen && (
                  <div className="absolute rollIn top-full m-3 z-10">
                    <div className="space-y-6 rotating-border bg-white p-5 w-60 shadow-lg z-10">
                      <h5 className="text-2xl font-medium text-gray-900 dark:text-white text-center z-10">
                        Crea tu mesa
                      </h5>
                      <div>
                      <div className='flex justify-content gap-4 z-10 mb-0' >
                        <div >
                          <FloatingLabel variant="outlined" label="# Mesa" className='text-base z-10' disabled={true} value={numeroMesa} onChange={e => setNumeroMesa(e.target.value)} />
                        </div>
                        <div >
                          <Field name="numeroSillas" as={FloatingLabel} variant="outlined" label="# Sillas" className='text-base z-10 ' type='number' color={errors.numeroSillas ? 'error' : 'default'} />
                          
                        </div>
                        
                      </div>
                      <ErrorMessage name="numeroSillas">
                            {errorMessage => <div  className='errorM'>{errorMessage}</div>}
                      </ErrorMessage>
                      </div>
                      
                  
                      
                 
                      

                      <div className="flex justify-center w-full">
                        <Button className='w-40 z-10 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' outline size="md" onClick={handleSubmit}>
                          Crear
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
                   )}
                  </Formik>
          






            <Select
              size="large"
              status="warning"
              className='customSelect'
              defaultValue="Todas"
              style={{ width: 140 }}
              options={[
                { value: 'Todas', label: 'Todas' },
                { value: 'Ocupada', label: 'Ocupadas' },
                { value: 'Desocupada', label: 'Desocupadas' },
              ]}
              onChange={value => setSelectedOption(value)}
            />
          </div>
        </div>



        <div className="container-cards flex items-center justify-center flex-wrap overflow-y-auto divScroll mx-5 " style={{ maxHeight: '65vh' }}>
          {data && [...data].sort((a, b) => Number(a.numeroMesa) - Number(b.numeroMesa)).map((item, index) => (
            <Card  className="max-w-sm mx-5 my-5 ange" style={{ background: '#fff', border: '1px solid orange' }} key={index}>
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
                  <Button  className="mt-4 bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800" style={{ width: 50, cursor: 'default' }} >
  <span style={{visibility: 'hidden', height: 15}}>Texto invisible</span>
</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>


        <Modal show={crearOpen} onClose={() => setcrearOpen(false)} size="xl" position="center">
          <Modal.Header>
            <h5 className="text-2xl font-medium text-gray-900 dark:text-white text-center">
              Crea tu mesa
            </h5>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div>
                <FloatingLabel variant="outlined" label="Número de mesa" className='text-base' />
              </div>
              <div>
                <FloatingLabel variant="outlined" label="Número de sillas" className='text-base' />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex justify-center w-full">
              <Button className='w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' outline size="md" onClick={() => console.log('Crear usuario')}>
                Crear
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
        
      </div>
       
      );
      
}

      export default VistaMesas;
