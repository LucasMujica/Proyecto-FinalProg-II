//Importar la API
const DOLAR_API = "https://dolarapi.com/v1/dolares";

function obtenerCotizaciones() {
    fetch(DOLAR_API)
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        const tabla = document.getElementById('tabla-cotizaciones').getElementsByTagName('tbody')[0];

        data.forEach(monedaData => {
            const fila = tabla.insertRow();
            fila.classList.add('cotizaciones_filas');
            const celdaMoneda = fila.insertCell(0);
            celdaMoneda.textContent = monedaData.nombre;
            celdaMoneda.classList.add('cotizaciones_columnas'); 
            const celdaCompra = fila.insertCell(1);
            celdaCompra.textContent = monedaData.compra;
            celdaCompra.classList.add('cotizaciones_columnas'); 

            const celdaVenta = fila.insertCell(2);
            celdaVenta.textContent = monedaData.venta;
            celdaVenta.classList.add('cotizaciones_columnas'); 
        });
    })
    .catch(error => console.error('Error al obtener los datos:', error));
}


document.addEventListener('DOMContentLoaded', obtenerCotizaciones);

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

//Importar footer
document.addEventListener("DOMContentLoaded", function() {
    const footer = document.createElement('footer');
    footer.classList.add('pie_de_pagina');

    const infoUtn = document.createElement('div');
    infoUtn.classList.add('info_utn');

    const logoDiv = document.createElement('div');
    const logoLink = document.createElement('a');
    logoLink.href = 'https://www.frro.utn.edu.ar/';
    logoLink.target = '_blank';
    const logoImg = document.createElement('img');
    logoImg.src = 'images/logo_utn.png';
    logoImg.alt = 'Logo UTN';
    logoImg.classList.add('logo_utn');
    logoLink.appendChild(logoImg);
    logoDiv.appendChild(logoLink);
    infoUtn.appendChild(logoDiv);
    
    const linksMd = document.createElement('div');
    linksMd.classList.add('links_md');
    const mailLink = document.createElement('a');
    mailLink.href = 'mailto:tecnicaturas@frro.utn.edu.ar';
    mailLink.innerHTML = '<i class="fas fa-envelope"></i>';  // Icono del sobre
    const twitterLink = document.createElement('a');
    twitterLink.href = 'https://x.com/sauutnrosario';
    twitterLink.innerHTML = '<i class="fab fa-x-twitter"></i>';  // Icono de X/Twitter
    linksMd.appendChild(mailLink);
    linksMd.appendChild(twitterLink);
    infoUtn.appendChild(linksMd);

    const datosUtn = document.createElement('div');
    datosUtn.classList.add('datos_utn');
    datosUtn.innerHTML = `
        <p>Tecnicatura Universitaria en Programación</p>
        <p>E. Zeballos 1372 PB - ROSARIO, SANTA FE</p>
        <p>(0341) 448-1871/0102 - Int.: 106</p>
        <p>posgrado@frro.utn.edu.ar</p>`;
    infoUtn.appendChild(datosUtn);

    footer.appendChild(infoUtn);

    const grupoDiv = document.createElement('div');
    grupoDiv.classList.add('grupo');
    const grupoTitulo = document.createElement('h4');
    grupoTitulo.classList.add('grupo_titulo');
    grupoTitulo.textContent = 'Integrantes del grupo';
    const grupoIntegrantes = document.createElement('ul');
    grupoIntegrantes.classList.add('grupo_integrantes');
    const integrantes = ['Machuca Pablo', 'Mujica Lucas', 'Mello Federico', 'Tomaino Camila'];
    
    integrantes.forEach(integrante => {
        const li = document.createElement('li');
        li.textContent = integrante;
        grupoIntegrantes.appendChild(li);
    });

    grupoDiv.appendChild(grupoTitulo);
    grupoDiv.appendChild(grupoIntegrantes);
    footer.appendChild(grupoDiv);

    document.body.appendChild(footer);
});