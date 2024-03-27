import React, { useState, useEffect } from 'react';
import { Button, Table, Spinner, Modal, Label, FloatingLabel } from 'flowbite-react';
import CloseIcon from '@mui/icons-material/Close';

import './menu.css';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';

// SELECT CREAR MENU 
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';




function VistaMenu() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.100.29:8080/api/gastromanager/menus/');
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
        'Enchiladas',
        'Sopita',
        'Camarones',
        'Filete de pescado',
        'Ceviche de camarón',
        'Ceviche de pescado',
        'Filete de pescado a la plancha',
        'Filete de pescado empanizado',
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


    const [showSpinner, setShowSpinner] = useState(false);

    const [actualizarModal, setactualizarModal] = useState(false);
    const actualizarClose = () => setactualizarModal(false);

    const [crearModal, setcrearModal] = React.useState(false);
    const crearClose = () => setcrearModal(false);

    const [mostrarOpen, setmostrarOpen] = useState(false);
    const mostrarClose = () => setmostrarOpen(false);

    return (
        <div className="h-screen " >
            <div className="container-table flex items-center justify-center flex-wrap">
                <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-2xl" style={{ width: "60%", border: 'solid 1px #ebebeb' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Menus disponibles</h1>
                        <Button onClick={() => setcrearModal(true)} className="agregar">Agregar</Button>
                    </div>

                    <div className=' overflow-y-auto divScroll' style={{ maxHeight: '65vh' }}>
                        <Table>
                            <Table.Head style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                                <Table.HeadCell className="border-r border-b border-gray-300">#</Table.HeadCell>
                                <Table.HeadCell className="border-r border-b border-gray-300">Nombre</Table.HeadCell>
                                <Table.HeadCell className="border-r border-b border-gray-300">Descripcion</Table.HeadCell>
                                <Table.HeadCell className="border-b border-gray-300">
                                    <span className="sr-only">Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {data && data.map((item, index) => (

                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {item.idMenu}
                                        </Table.Cell>
                                        <Table.Cell className='border-r border-gray-300'>{item.nombre}</Table.Cell>
                                        <Table.Cell className='border-r border-gray-300'>{item.descripcion}</Table.Cell>
                                        <Table.Cell >
                                            <Stack direction="row" spacing={0} className='flex items-center justify-end'>
                                                <IconButton aria-label="VisibilityIcon" sx={{ color: '#000000' }} onClick={() => setmostrarOpen(true)}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" sx={{ color: '#000000' }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton aria-label="EditIcon" sx={{ color: '#000000' }} onClick={() => setactualizarModal(true)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="DownloadIcon" sx={{ color: '#000000' }} onClick={() => setShowSpinner(true)}>
                                                    <DownloadIcon />
                                                </IconButton>
                                            </Stack>
                                            {showSpinner && <Spinner aria-label="Default status example" />}

                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>

                </div>
            </div>

            {/* MODAL ACTUALIZAR MENU  */}
            <Modal show={actualizarModal} onClose={actualizarClose} size="4xl">
                <Modal.Header>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">Actualiza tu menú</h2>
                </Modal.Header>
                <Modal.Body>
<<<<<<< Updated upstream
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <FloatingLabel variant="outlined" label="Nombre" />
=======
                <div className="space-y-4">
                        <div className="flex justify-between gap-4">
                            <div className='w-1/3'>
                                <FloatingLabel variant="outlined" label="Nombre" className='text-base' />
>>>>>>> Stashed changes
                            </div>
                            <div className='w-2/3'>
                                <FloatingLabel variant="outlined" label="Descripción" className='text-base'/>
                            </div>
                


                        </div>

                        <div className="flex justify-between gap-4">
                            <div className="w-full lg:w-2/3 p-4 h-64" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }} >
                                <FormControl className='w-full'>
                                    <InputLabel id="demo-multiple-checkbox-label">Platillos</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={personName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Platillos" />}
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
                                <div className="mt-2 flex flex-wrap gap-2 overflow-y-auto max-h-36 divScroll">
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Enchiladas</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Sopita</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Filete de pescado empanizado</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Enchiladas</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Sopita</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Filete de pescado empanizado</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Enchiladas</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Sopita</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Filete de pescado empanizado</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Enchiladas</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
<<<<<<< Updated upstream
=======
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Sopita</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Filete de pescado empanizado</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Enchiladas</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Sopita</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Filete de pescado empanizado</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Enchiladas</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Sopita</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Filete de pescado empanizado</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Enchiladas</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Sopita</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Filete de pescado empanizado</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
>>>>>>> Stashed changes






                                </div>

                            </div>
                            <div className="w-64">
                            <Label htmlFor="ingredientesNoDisponibles" className="mb-2 text-red-500 flex justify-center w-full">Ingredientes no disponibles</Label>
                            <div className='pb-4 px-2 pt-2' style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }}>
                            <div className=" rounded  text-center">
                                    <div className="grid grid-cols-1 gap-2 mt-0 overflow-y-auto divScroll" style={{ maxHeight: 200 }}>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Pescado empanizado</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chilaquiles</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Salmón a la plancha</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Pescado empanizado</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chilaquiles</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Salmón a la plancha</span>

                                    </div>
                                </div>
                            </div>
                               
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button outline className='w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' onClick={crearClose}>
                            Actualizar
                        </Button>

                    </div>
                </Modal.Footer>
            </Modal>

            {/* MODAL CREAR MENU */}
            <Modal show={crearModal} onClose={crearClose} size="4xl">
                <Modal.Header>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">Crea tu menú</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <div className="flex justify-between gap-4">
                            <div className='w-1/3'>
                                <FloatingLabel variant="outlined" label="Nombre" className='text-base'/>
                            </div>
                            <div className='w-2/3'>
                                <FloatingLabel variant="outlined" label="Descripción" className='text-base'/>
                            </div>
                


                        </div>

                        <div className="flex justify-between gap-4">
                            <div className="w-full lg:w-2/3 p-4 h-64" style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }} >
                                <FormControl className='w-full'>
                                    <InputLabel id="demo-multiple-checkbox-label">Platillos</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={personName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Platillos" />}
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
                                <div className="mt-2 flex flex-wrap gap-2 overflow-y-auto max-h-36 divScroll">
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Enchiladas</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Sopita</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Filete de pescado empanizado</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Enchiladas</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Sopita</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Filete de pescado empanizado</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Enchiladas</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Sopita</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Filete de pescado empanizado</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Enchiladas</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Sopita</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Filete de pescado empanizado</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Enchiladas</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Sopita</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Filete de pescado empanizado</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Enchiladas</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Sopita</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Filete de pescado empanizado</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Enchiladas</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Sopita</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2">
                                        <span className="text-sm font-medium text-gray-700">Filete de pescado empanizado</span>
                                        <button className="ml-3 rounded-full text-gray-400 hover:text-red-500 focus:outline-none">
                                            <CloseIcon />
                                        </button>
                                    </div>






                                </div>

                            </div>
                            <div className="w-64">
                            <Label htmlFor="ingredientesNoDisponibles" className="mb-2 text-red-500 flex justify-center w-full">Ingredientes no disponibles</Label>
                            <div className='pb-4 px-2 pt-2' style={{ border: 'solid 1px #d6d6d6', borderRadius: '5px' }}>
                            <div className=" rounded  text-center">
                                    <div className="grid grid-cols-1 gap-2 mt-0 overflow-y-auto divScroll" style={{ maxHeight: 200 }}>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Pescado empanizado</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chilaquiles</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Salmón a la plancha</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Pescado empanizado</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Chilaquiles</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{ backgroundColor: '#ffcfcf' }}>Salmón a la plancha</span>

                                    </div>
                                </div>
                            </div>
                               
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button outline className='w-40 justify-start text-white bg-gradient-to-br from-red-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800' onClick={crearClose}>
                            Crear
                        </Button>

                    </div>
                </Modal.Footer>
            </Modal>

            {/* MODAL MOSTRAR MENU */}
            <Modal show={mostrarOpen} onClose={mostrarClose} size="7xl">
                <Modal.Header>
                    <h2 className="text-2xl text-center">Información del menú “Mariscada”</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <div className="border p-4 rounded">
                            <h3 className="text-lg mb-0" style={{ color: '#005D48' }}>Descripción</h3>
                            <div className="p-4 border rounded">
                                <p >Exquisitos y extravagantes mariscos para refrescar tu día</p>
                            </div>
                            <h3 className="text-2xl mt-4 text-center p-5" style={{ color: '#005D48' }}>Platillos</h3>
                            <div className="grid grid-cols-3  gap-4 mt-2 overflow-y-auto max-h-72 min-h-72 divScroll">
                                <div className="p-6 m-3 h-28 rounded fondoVerde text-center divScroll overflow-y-auto" >
                                    <p className='p-1'>Nombre: Ceviche de camarón  </p>
                                    <p className='p-1'>Precio: $200</p>
                                </div>
                                <div className="p-6 m-3 h-28 rounded fondoVerde text-center divScroll overflow-y-auto" >
                                    <p className='p-1'>Nombre: Ceviche de camarón  </p>
                                    <p className='p-1'>Precio: $200</p>
                                </div>
                                <div className="p-6 m-3 h-28 rounded fondoVerde text-center divScroll overflow-y-auto" >
                                    <p className='p-1'>Nombre: Ceviche de camarón  </p>
                                    <p className='p-1'>Precio: $200</p>
                                </div>
                                <div className="p-6 m-3 h-28 rounded fondoVerde text-center divScroll overflow-y-auto" >
                                    <p className='p-1'>Nombre: Ceviche de camarón  </p>
                                    <p className='p-1'>Precio: $200</p>
                                </div>
                                <div className="p-6 m-3 h-28 rounded fondoVerde text-center divScroll overflow-y-auto" >
                                    <p className='p-1'>Nombre: Ceviche de camarón  </p>
                                    <p className='p-1'>Precio: $200</p>
                                </div>
                                <div className="p-6 m-3 h-28 rounded fondoVerde text-center divScroll overflow-y-auto" >
                                    <p className='p-1'>Nombre: Ceviche de camarón  </p>
                                    <p className='p-1'>Precio: $200</p>
                                </div>
                                <div className="p-6 m-3 h-28 rounded fondoVerde text-center divScroll overflow-y-auto" >
                                    <p className='p-1'>Nombre: Ceviche de camarón  </p>
                                    <p className='p-1'>Precio: $200</p>
                                </div>
                                <div className="p-6 m-3 h-28 rounded fondoVerde text-center divScroll overflow-y-auto" >
                                    <p className='p-1'>Nombre: Ceviche de camarón  </p>
                                    <p className='p-1'>Precio: $200</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <IconButton aria-label="DownloadIcon" sx={{ color: '#000000' }} onClick={mostrarClose}>
                            <DownloadIcon fontSize='large' />
                        </IconButton>

                    </div>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default VistaMenu;