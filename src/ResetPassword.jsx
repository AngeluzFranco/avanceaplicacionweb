import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Password() {
    const { token } = useParams(); // Obtenemos el token de los parámetros de la URL.
    console.log("Token recibido:", token); // Muestra el token en la consola para depuración.
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showModal, setShowModal] = useState(true);

    const handleResetSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden',
                icon: 'error',
                confirmButtonColor: '#ff0000', // Color rojo
            });
            return;
        }

        // Validar longitud mínima de contraseña
        if (password.length < 8) {
            Swal.fire({
                title: 'Error',
                text: 'La contraseña debe tener al menos 8 caracteres',
                icon: 'error',
                confirmButtonColor: '#ff0000', // Color rojo
            });
            return;
        }

        // Log para verificar el estado del token y las contraseñas antes de enviar
        console.log("Enviando solicitud con token:", token);
        console.log("Contraseña:", password);
        console.log("Confirmar contraseña:", confirmPassword);

        try {
            const response = await fetch('http://GastroManagerzzz-env.eba-pe7hcsjz.us-east-1.elasticbeanstalk.com/email-password/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tokenPassword: token,
                    password: password,
                    confirmPassword: confirmPassword
                })
            });

            const data = await response.json(); // Leer la respuesta JSON del servidor
            if (response.ok) {
                setShowModal(false);
                Swal.fire({
                    title: 'Éxito',
                    text: data.message,
                    icon: 'success',
                    confirmButtonColor: '#0f80f2', // Color azul
                }).then(() => {
                    navigate('/login'); // Redirigir a la página de inicio de sesión
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: data.message,
                    icon: 'error',
                    confirmButtonColor: '#ff0000', // Color rojo
                });
            }
        } catch (error) {
            console.error('Error al cambiar contraseña:', error);
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al cambiar la contraseña. Por favor, intente nuevamente.',
                icon: 'error',
                confirmButtonColor: '#ff0000', // Color rojo
            });
        }
    };
    return (
        <>
            {showModal && (
                <div tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 w-full md:inset-0 h-modal md:h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-0 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => setShowModal(false)}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                            <div className="p-6 text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-500">Ingrese su nueva contraseña</h3>
                                <form onSubmit={handleResetSubmit}>
                                    <input
                                        type="password"
                                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Contraseña"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-4"
                                        placeholder="Confirmar contraseña"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button type="submit" className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Cambiar Contraseña</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Password;
