//Importar la API
const DOLAR_API = "https://dolarapi.com/v1/dolares";

let datosCotizaciones = [];

function obtenerCotizaciones() {
    fetch(DOLAR_API)
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        datosCotizaciones = data;
        mostrarCotizaciones(datosCotizaciones);
    }) 
    .catch(error => console.error('Error al obtener los datos:', error));
} 
function mostrarCotizaciones(data){
    const tabla = document.getElementById('tabla-cotizaciones')
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML='';


    const mostrarFecha = tabla.getAttribute('data-mostrar-fecha') === 'true';

    data.forEach(monedaData => {
        const fila = tbody.insertRow();
        fila.classList.add('cotizaciones_filas');

        const celdaMoneda = fila.insertCell(0);
        celdaMoneda.textContent = monedaData.nombre ;
        celdaMoneda.classList.add('cotizaciones_columnas'); 

        const celdaCompra = fila.insertCell(1);
        celdaCompra.textContent = monedaData.compra;
        celdaCompra.classList.add('cotizaciones_columnas'); 

        const celdaVenta = fila.insertCell(2);
        celdaVenta.textContent = monedaData.venta;
        celdaVenta.classList.add('cotizaciones_columnas'); 

        if (mostrarFecha){
            const celdaFecha = fila.insertCell(3);
            const fecha = new Date(monedaData.fechaActualizacion);
            celdaFecha.textContent = fecha.toLocaleDateString();
            celdaFecha.classList.add('cotizaciones_columnas');
        }
     });
}
document.addEventListener("DOMContentLoaded", function () {
    obtenerCotizaciones();
});
