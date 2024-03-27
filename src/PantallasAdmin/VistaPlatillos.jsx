import React, { useState, useEffect } from 'react';

import { Button, Table, Modal, Label, Select as SelectFlow, FloatingLabel } from 'flowbite-react';
import CloseIcon from '@mui/icons-material/Close';
import './platillos.css'


import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

// SELECT CREAR PLATILLO
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import {API_BASE_URL} from '../backend.js';



function VistaPlatillos() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/platillo/`);
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

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = [
        'Cilantro',
        'Ajo',
        'Cebolla',
        'Tomate',
        'Chile',
        'Pescado',
        'Salmón',
        'Zanahoria',
    ];

    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [age, setAge] = React.useState('');

    const handleChangeAge = (event) => {
        setAge(event.target.value);
    };


    const [mostrarOpen, setmostrarOpen] = useState(false);
    const closeModal = () => setmostrarOpen(false);

    const [actualizarOpen, setactualizarOpen] = useState(false);
    const handleClose = () => setactualizarOpen(false);

    const [crearOpen, setcrearOpen] = useState(false);

    return (
        <div className="h-screen">
            <div className="container-table flex items-center justify-center flex-wrap">
                <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-2xl" style={{ width: "60%", border: 'solid 1px #ebebeb' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Lista de platillos</h1>
                        <Button onClick={() => setcrearOpen(true)} className="agregar">Agregar</Button>
                    </div>

                    <div className=' overflow-y-auto divScroll' style={{ maxHeight: '65vh' }}>
                        <Table>
                            <Table.Head style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                                <Table.HeadCell className='border-r border-b border-gray-300'>Nombre</Table.HeadCell>
                                <Table.HeadCell className='border-r border-b border-gray-300'>Categoria</Table.HeadCell>
                                <Table.HeadCell className='border-r border-b border-gray-300'>Precio</Table.HeadCell>
                                <Table.HeadCell className='border-b border-gray-300'>
                                    <span className="sr-only">Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {data && data.map((item, index) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {item.nombre}
                                        </Table.Cell>
                                        <Table.Cell className='border-r border-gray-300'>{item.categoria}</Table.Cell>
                                        <Table.Cell className='border-r border-gray-300'>${item.precio}</Table.Cell>
                                        <Table.Cell >

                                            <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                                <IconButton aria-label="VisibilityIcon" sx={{ color: '#000000' }} onClick={() => setmostrarOpen(true)}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" sx={{ color: '#000000' }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarOpen(true)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Stack>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>

                </div>
            </div>


            {/* MODAL MAS INFORMACION DEL PLATILLO */}
            <Modal show={mostrarOpen} onClose={closeModal} size="6xl">
                <Modal.Header>
                    <h5 className="text-xl font-medium leading-normal text-gray-800 dark:text-white">
                        Información del platillo
                    </h5>
                </Modal.Header>
                <Modal.Body>

                <div className="space-y-4">
                <div className="flex justify-content gap-4 ">
                            <div className='w-6/12'>
                                <FloatingLabel variant="outlined" label="Nombre" sizing='sm' className='text-base' />
                            </div>
                            <div className='w-6/12 text-base'>
                                <SelectFlow id="countries" style={{fontSize: 16, height:52}} required>
                                    <option selected disabled >Categoria</option>
                                    <option>Entrada</option>
                                    <option>Fuerte</option>
                                    <option>Postre</option>
                                </SelectFlow>
                            </div >
                            <div className='w-1/12'>
                                <FloatingLabel variant="outlined" label="Precio $" sizing='sm' className='text-base'/>
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-full  p-4 h-100" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }} >
                                <h3 className="text-3xl mb-3  text-center p-2" style={{ color: '#005D48' }}>Ingredientes</h3>
                                <div className="mt-2 flex flex-wrap gap-2 overflow-y-auto max-h-72 min-h-72 divScroll justify-center">


                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>







                                </div>

                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* MODAL ACTUALIZAR PLATILLO */}
            <Modal show={actualizarOpen} onClose={handleClose} size="7xl">
                <Modal.Header>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">Actualiza tu platillo</h3>
                </Modal.Header>
                <Modal.Body>

                <div className="space-y-4">
                        <div className="flex justify-content gap-4">
                            <div className='w-6/12'>
                                <FloatingLabel variant="outlined" label="Nombre" sizing='sm' className='text-base' />
                            </div>
                            <div className='w-6/12 text-base'>
                                <SelectFlow id="countries" style={{fontSize: 16, height:52}} required>
                                    <option selected disabled >Categoria</option>
                                    <option>Entrada</option>
                                    <option>Fuerte</option>
                                    <option>Postre</option>
                                </SelectFlow>
                            </div >
                            <div className='w-1/12'>
                                <FloatingLabel variant="outlined" label="Precio $" sizing='sm' className='text-base'/>
                            </div>



                        </div>


                        <div className="flex justify-between gap-4">
                            <div className="w-full lg:w-4/5 p-4 h-100" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }} >
                                <FormControl className='w-full'>
                                    <InputLabel id="demo-multiple-checkbox-label">Ingredientes</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={personName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Ingredientes" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                        className='mb-3'
                                    >
                                        {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={personName.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className="mt-2 flex flex-wrap gap-2 overflow-y-auto max-h-64 min-h-64 divScroll">


                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>







                                </div>

                            </div>
                            <div className="w-64 p-2" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }}>

                                <Label htmlFor="ingredientesNoDisponibles" className="mb-2 text-red-500 flex justify-center w-full">Ingredientes no disponibles</Label>

                                <div className=" rounded  text-center">
                                    <div className="grid grid-cols-1 gap-2 mt-0 overflow-y-auto divScroll" style={{ maxHeight: 320 }}>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Cilantro</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Rabano</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Ajo</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chile</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Ajo</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chile</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Ajo</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chile</span>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button outline className='w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800'>
                            Actualizar
                        </Button>

                    </div>
                </Modal.Footer>
            </Modal>

            {/* MODAL CREAR PLATILLO */}
            <Modal show={crearOpen} onClose={() => setcrearOpen(false)} size="7xl">
                <Modal.Header>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">Crea tu platillo</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <div className="flex justify-content gap-4">
                            <div className='w-6/12'>
                                <FloatingLabel variant="outlined" label="Nombre" sizing='sm' className='text-base' />
                            </div>
                            <div className='w-6/12 text-base'>
                                <SelectFlow id="countries" style={{fontSize: 16, height:52}} required>
                                    <option selected disabled >Categoria</option>
                                    <option>Entrada</option>
                                    <option>Fuerte</option>
                                    <option>Postre</option>
                                </SelectFlow>
                            </div >
                            <div className='w-1/12'>
                                <FloatingLabel variant="outlined" label="Precio $" sizing='sm' className='text-base'/>
                            </div>



                        </div>


                        <div className="flex justify-between gap-4">
                            <div className="w-full lg:w-4/5 p-4 h-100" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }} >
                                <FormControl className='w-full'>
                                    <InputLabel id="demo-multiple-checkbox-label">Ingredientes</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={personName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Ingredientes" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                        className='mb-3'
                                    >
                                        {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={personName.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className="mt-2 flex flex-wrap gap-2 overflow-y-auto max-h-64 min-h-64 divScroll">


                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Pescado</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative m-3">
                                        <input type="number" className="absolute top-[-10px] left-[-10px] w-10 h-10 p-0 text-lg rounded" style={{ backgroundColor: '#16eab9', border: 'none', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '10px', appearance: 'none', MozAppearance: 'textfield' }} />
                                        <div className="inline-flex items-center rounded-md bg-gray-100 pl-16 pr-6 py-3">
                                            <span className="text-lg font-medium text-gray-600">Camaron</span>
                                            <button className="ml-6 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>







                                </div>

                            </div>
                            <div className="w-64 p-2" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }}>

                                <Label htmlFor="ingredientesNoDisponibles" className="mb-2 text-red-500 flex justify-center w-full">Ingredientes no disponibles</Label>

                                <div className=" rounded  text-center">
                                    <div className="grid grid-cols-1 gap-2 mt-0 overflow-y-auto divScroll" style={{ maxHeight: 320 }}>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Cilantro</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Rabano</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Ajo</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chile</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Ajo</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chile</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Ajo</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chile</span>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button outline className=' w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800'>
                            Crear
                        </Button>

                    </div>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default VistaPlatillos;
