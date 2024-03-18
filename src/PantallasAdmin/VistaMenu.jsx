import React, {useState} from 'react';
import { Button, Navbar, Card, Table, Spinner, Modal, Label, Textarea, TextInput, FloatingLabel } from 'flowbite-react';
import fondo from '../assets/fondo.png';
import imgMesa from '../assets/imgMesa.png';
import CloseIcon from '@mui/icons-material/Close';


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
        <div className="h-screen bg-cover" style={{ backgroundImage: `url(${fondo})` }}>
            <div className="container-table flex items-center justify-center flex-wrap">
                <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg" style={{ width: "60%" }}>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Menus disponibles</h1>
                        <Button onClick={() => setcrearModal(true)} className="btn btn-primary">Agregar</Button>
                    </div>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell className="border-r border-b border-gray-300">#</Table.HeadCell>
                            <Table.HeadCell className="border-r border-b border-gray-300">Nombre</Table.HeadCell>
                            <Table.HeadCell className="border-r border-b border-gray-300">Descripcion</Table.HeadCell>
                            <Table.HeadCell className="border-b border-gray-300">
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="border-r border-gray-300 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    1
                                </Table.Cell>
                                <Table.Cell className='border-r border-gray-300'>Platillo pa llenarte</Table.Cell>
                                <Table.Cell className='border-r border-gray-300'>Sopita, Guizado con tortillas, Refresco o agua, postre del dia</Table.Cell>
                                <Table.Cell className='flex items-center justify-end'>
                                    <Stack direction="row" spacing={0}>
                                        <IconButton aria-label="VisibilityIcon" sx={{color: '#000000'}} onClick={() => setmostrarOpen(true)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" sx={{color: '#000000'}}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton aria-label="EditIcon" sx={{color: '#000000'}} onClick={() => setactualizarModal(true)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="DownloadIcon" sx={{color: '#000000'}} onClick={() => setShowSpinner(true)}>
                                            <DownloadIcon />
                                        </IconButton>
                                    </Stack>
                                {showSpinner && <Spinner aria-label="Default status example" />}

                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>

            {/* MODAL ACTUALIZAR MENU  */}
            <Modal show={actualizarModal} onClose={actualizarClose} size="4xl">
                <Modal.Header>
                    <h2 className="text-2xl font-semibold text-center">Actualiza tu menú</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div className="flex justify-center gap-4">
                        <div className="w-full max-w-md">
                                <div className="border p-2 rounded">
                                    <Textarea
                                        id="description"
                                        placeholder="Mariscada"
                                    />
                                </div>
                            </div>
                            <div className="w-full max-w-md">
                                <div className="border p-2 rounded">
                                    <Textarea
                                        id="description"
                                        placeholder="Exquisitos y extravagantes mariscos para refrescar tu día"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-full lg:w-2/3">
                                <div className="border bg-gray-100 rounded p-2">
                                <Label htmlFor="categoria">Categoría del platillo</Label>
                                <Select id="categoria">
                                    <option>Platillos</option>
                                    <option>Plato Fuerte</option>
                                    <option>Postre</option>
                                </Select>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <span className="badge bg-cyan-200 text-black p-2 rounded">Cilantro</span>
                                        <span className="badge bg-cyan-200 text-black p-2 rounded">Tomate</span>
                                        <span className="badge bg-cyan-200 text-black p-2 rounded">Cebolla</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-64 p-2">
                                <div className="text-center mb-2 text-red-600">Platillos no disponibles</div>
                                <div className="border bg-gray-100 rounded p-2">
                                    <div className="grid gap-2">
                                        <span className="badge bg-red-400 text-black p-2 rounded">Rebanada</span>
                                        <span className="badge bg-red-400 text-black p-2 rounded">Chile verde</span>
                                        <span className="badge bg-red-400 text-black p-2 rounded">Salmón</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button color="blue" onClick={actualizarClose}>
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
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                 <FloatingLabel variant="outlined" label="Nombre" />
                            </div>
                            <div>
                                 <FloatingLabel variant="outlined" label="Descripción" />
                            </div>
                            <div className='flex items-end ' style={{marginBottom: -20}} > 
                            <Label htmlFor="ingredientesNoDisponibles" className="mb-2 text-red-500 flex justify-center w-full">Platillos no disponibles</Label>
                            </div>
                            
                        
                        </div>
                        
                        <div className="flex justify-between gap-4">
                            <div className="w-full lg:w-2/3 p-4" style={{border: 'solid 1px #d6d6d6',borderRadius: '5px'}}>
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
                                    >
                                    {names.map((name) => (
                                        <MenuItem key={name} value={name}>
                                        <Checkbox checked={personName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                                <div className="mt-2 flex flex-wrap gap-2">
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
                            <div className="w-64 p-2" style={{border: 'solid 1px #d6d6d6',borderRadius: '5px'}}>
                                
                                <div className=" rounded  text-center">
                                    <div className="grid grid-cols-1 gap-2 mt-0">
                                        <span className="badge text-black p-2 rounded line-through" style={{backgroundColor: '#ffcfcf'}}>Pescado empanizado</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{backgroundColor: '#ffcfcf'}}>Chilaquiles</span>
                                        <span className="badge text-black p-2 rounded line-through" style={{backgroundColor: '#ffcfcf'}}>Salmón a la plancha</span>
                                        

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button outline gradientDuoTone="cyanToBlue" onClick={crearClose}>
                            Crear
                        </Button>
                        
                    </div>
                </Modal.Footer>
            </Modal>

            {/* MODAL MOSTRAR MENU */}
            <Modal show={mostrarOpen} onClose={mostrarClose} size="4xl">
                <Modal.Header>
                    <h2 className="text-2xl font-bold text-center">Información del menú “Mariscada”</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <div className="border p-4 rounded">
                            <h3 className="text-lg mb-2 text-blue-500">Descripción</h3>
                            <div className="p-4 border rounded">
                                <p>Exquisitos y extravagantes mariscos para refrescar tu día</p>
                            </div>
                            <h3 className="text-lg font-bold mt-4">Platillos</h3>
                            <div className="grid grid-cols-3 gap-4 mt-2">
                                <div className="p-4 border rounded">
                                    <p className="font-bold">Nombre: Ceviche de camarón</p>
                                    <p>Precio: $200</p>
                                </div>
                                <div className="p-4 border rounded">
                                    <p className="font-bold">Nombre: Ceviche de camarón</p>
                                    <p>Precio: $200</p>
                                </div>
                                <div className="p-4 border rounded">
                                    <p className="font-bold">Nombre: Ceviche de camarón</p>
                                    <p>Precio: $200</p> 
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-2">
                                <div className="p-4 border rounded">
                                    <p className="font-bold">Nombre: Ceviche de camarón</p>
                                    <p>Precio: $200</p>
                                </div>
                                <div className="p-4 border rounded">
                                    <p className="font-bold">Nombre: Ceviche de camarón</p>
                                    <p>Precio: $200</p>
                                </div>
                                <div className="p-4 border rounded">
                                    <p className="font-bold">Nombre: Ceviche de camarón</p>
                                    <p>Precio: $200</p> 
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center w-full">
                        <Button onClick={mostrarClose}
                        color="blue">
                            
                            Descargar
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
        
    );
}

export default VistaMenu;