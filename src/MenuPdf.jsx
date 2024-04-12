import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import img from './assets/img.avif';
import './menu-pdf.css';

function MenuPDF() {
    const { id } = useParams();
    const [menuData, setMenuData] = useState(null);

    const printPDF = () => {
        html2canvas(document.querySelector("#content"), { scale: window.devicePixelRatio }).then(canvas => {
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const printWidth = canvasWidth / canvasHeight > pdfWidth / pdfHeight ? pdfWidth : (canvasWidth * pdfHeight) / canvasHeight;
            const printHeight = canvasWidth / canvasHeight > pdfWidth / pdfHeight ? (canvasHeight * pdfWidth) / canvasWidth : pdfHeight;
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', (pdfWidth - printWidth) / 2, 0, printWidth, printHeight);
            pdf.save('gastromanager-menu.pdf');
        }).catch(error => {
            console.error('Ocurrió un error al imprimir en PDF:', error);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://GastroManagerzzz-env.eba-pe7hcsjz.us-east-1.elasticbeanstalk.com/api/gastromanager/menus/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Hubo un error en la petición');
                }
                const jsonData = await response.json();
                console.log('Datos del menú obtenidos:', jsonData);
                setMenuData(jsonData);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
        };
        console.log('Solicitando datos del menú...');
        fetchData();
    }, [id]);

    useEffect(() => {
        if (menuData && menuData.data && menuData.data.platillosBean) {
            const container = document.getElementById('menu-container-pdf');
            container.innerHTML = '';
    
            // Objeto para almacenar contenedores de categorías
            const categoryContainers = {};
    
            menuData.data.platillosBean.forEach(platillo => {
                if (!categoryContainers[platillo.categoria]) {
                    // Crear un nuevo contenedor si es una nueva categoría
                    const categoryDiv = document.createElement('div');
                    categoryDiv.className = 'category-container'; // Asignar la clase CSS
                    const header = document.createElement('h3');
                    header.textContent = platillo.categoria;
                    header.className = 'section-header';
                    categoryDiv.appendChild(header);
                    container.appendChild(categoryDiv);
                    categoryContainers[platillo.categoria] = categoryDiv;
                    categoryDiv.style.minHeight = '100px'; // Tamaño mínimo base
                }
                // Crear un elemento de lista para cada platillo dentro del contenedor de categoría correspondiente
                const ul = document.createElement('ul');
                ul.className = 'lista-pizzas';
                const li = document.createElement('li');
                li.innerHTML = `<span>${platillo.nombre}</span><span> $${platillo.precio.toFixed(2)}</span>`;
                ul.appendChild(li);
                categoryContainers[platillo.categoria].appendChild(ul);
    
                // Ajustar el tamaño del contenedor según el número de platillos
                const itemCount = categoryContainers[platillo.categoria].getElementsByTagName('li').length;
                const minHeight = 100 + itemCount * 10; // Aumenta 20px por item
                categoryContainers[platillo.categoria].style.minHeight = `${minHeight}px`;
            });
        }
    }, [menuData]);
    


    return (
        <>
            <div className="container-pdf" id="content">
                <h1 className="titulo-pdf text-center">GastroManager</h1>
                <div className="row">
                    <img src={img} style={{ height: "350px", width: "100%", marginBottom:"15px" }} alt="Menu Cover" />
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom:"15px"}}>
                    <div style={{ margin: "0 60px" }}>
                        <h1 className="text-left" style={{fontSize:"20px", color:"#2C3E50", fontWeight:700, fontFamily:"Playfair Display', serif"}}>Nombre: {menuData && menuData.data ? menuData.data.nombre : ''}</h1>
                    </div>
                    <div style={{ margin: "0 130px" }}>
                        <h1 className="text-left" style={{fontSize:"20px", color:"#2C3E50", fontWeight:700, fontFamily:"Playfair Display', serif"}}>Descripcion: {menuData && menuData.data ? menuData.data.descripcion : ''}</h1>
                    </div>
                </div>
                <div id="menu-container-pdf"></div>
            </div>
            <div className="text-center">
                <button className="btn-custom" onClick={printPDF}>Imprimir PDF</button>
            </div>
        </>
    );
    
}

export default MenuPDF;
