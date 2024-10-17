/* var dolarApi

fetch("https://dolarapi.com/v1/dolares")
    .then(response => response.json())
    .then(data => { dolarApi = data }); */

const DOLAR_API = "https://dolarapi.com/v1/dolares";

function obtenerCotizaciones(){
    fetch(DOLAR_API)
    .then(response => response.json())
    .then(data => {
        const TABLA = document.getElementById('tabla-cotizacionES').getElementsByTagName('tbody')[0];
        const MONEDAS = data.monedas; 

        MONEDAS.forEach(monedaData => {
            const FILA = TABLA.insertRow();
            const CELDA_MONEDA = FILA.insertCell(0);
            const CELDA_COMPRA = FILA.insertCell(1);
            const CELDA_VENTA = FILA.insertCell(2);

            // Asignar los datos de moneda, compra y venta
            CELDA_MONEDA.textContent = monedaData.moneda;
            CELDA_COMPRA.textContent = monedaData.compra;
            CELDA_VENTA.textContent = monedaData.venta;
        });
    })
    .catch(error => console.error('Error al obtener los datos:', error));

}

document.addEventListener('DOMContentLoaded', obtenerCotizacionES);

//INICIO Inyectar Header//
const header = document.createElement('header');
header.classList.add('encabezado');

const nav = document.createElement('nav');
nav.classList.add('menu_container');

const logoContainer = document.createElement('div');
logoContainer.classList.add('logo_container');

const logo = document.createElement('h1');
logo.classList.add('logo');
logo.textContent = 'Cotizaciones BAZINGA';
logoContainer.appendChild(logo);

const ulMenu = document.createElement('ul');
ulMenu.classList.add('menu');

const menuItems = [
    { text: 'Home', href: 'index.html' },
    { text: 'Historico', href: 'historico.html' },
    { text: 'Contacto', href: 'contacto.html' }
];

menuItems.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('menu_items');

    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.text;

    li.appendChild(link);
    ulMenu.appendChild(li);
});

nav.appendChild(logoContainer);
nav.appendChild(ulMenu);
header.appendChild(nav);

document.body.prepend(header);
//FIN Inyectar Header//