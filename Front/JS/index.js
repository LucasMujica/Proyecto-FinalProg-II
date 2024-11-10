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
logo.textContent = 'Cotizaciones Cafe';

const logoimg1 = document.createElement('img');
logoimg1.src='images/logo_header.png';
logoimg1.alt = 'Cotizaciones Cafe';
logoimg1.classList.add('imagen_encabezado');

logo.appendChild(logoimg1);

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

//Imsertar footer
//Se crea un eveno con la funcion DOMContentLoaded para que el codigo se ejecute una vez que el DOM este cargado.
document.addEventListener("DOMContentLoaded", function() {
    //Crea la estructura básica del footer
    const footer = document.createElement('footer');
    //Agrega el nombre de la clase para que después lo podamos editar en el documneto CSS
    footer.classList.add('pie_de_pagina');

    //Crea el contenedor donde van a estar ubicados los links y los datos de la facltad(UTN). También se le agrega su respeciva clase
    const infoUtn = document.createElement('div');
    infoUtn.classList.add('info_utn');

    //Acá se crea el contenedor donde esta el logo de la facultad que a su vez contiene el link de su página
    const logoDiv = document.createElement('div');
    logoDiv.classList.add('div_logo')
    //Crea el link
    const logoLink = document.createElement('a');
    //Se le agregan los atributos correspondientes.
    logoLink.href = 'https://www.frro.utn.edu.ar/';
    logoLink.target = '_blank'; //con este atributo y el valor '_blank', el link se abre en una ventana nueva.
    //Se crea la imagen y se le agregan sus respectivos atributos y su clase.
    const logoImg = document.createElement('img');
    logoImg.src = 'images/logo_utn.png';
    logoImg.alt = 'Logo UTN';
    logoImg.classList.add('logo_utn');
    logoLink.appendChild(logoImg); //Agrega la imagen al link
    logoDiv.appendChild(logoLink); //Agrega el link con la imagen dentro del contenedor del logo
    infoUtn.appendChild(logoDiv); //Agrega todo ese contenedor del logo dentro del contenedor principal con la información de la UTN

    //Se crea el contenedir donde están los datos de la UTN y su respectiva clase.
    const datosUtn = document.createElement('div');
    datosUtn.classList.add('datos_utn');
    //innerHTML para insertar directamente la estuctura de los parrafos con los aatos.
    datosUtn.innerHTML = `
        <p>Tecnicatura Universitaria en Programación</p>
        <p>E. Zeballos 1372 PB - ROSARIO, SANTA FE</p>
        <p>(0341) 448-1871/0102 - Int.: 106</p>
        <p>posgrado@frro.utn.edu.ar</p>`;
    infoUtn.appendChild(datosUtn); //Se agrega este contenedor con los datos al contendeor de la información
    footer.appendChild(infoUtn); //Se agrega todo este contenedor con la informción de la UTN al footer

    const linksMd = document.createElement('div');
    linksMd.classList.add('links_md');

    //Se crean los links con sus respectivos atributos y se les agrega un logo a cada uno.
    const mailLink = document.createElement('a');
    mailLink.href = 'mailto:tecnicaturas@frro.utn.edu.ar';
    mailLink.innerHTML = '<i class="fas fa-envelope"></i>';  // Icono del sobre. Usamos la función innerHTML para insertar directamente código HTML
    const twitterLink = document.createElement('a');
    twitterLink.href = 'https://x.com/sauutnrosario';
    twitterLink.innerHTML = '<i class="fab fa-x-twitter"></i>';  // Icono de X/Twitter

    //Se agregan ambos links a su contenedor
    linksMd.appendChild(mailLink);
    linksMd.appendChild(twitterLink);

    footer.appendChild(linksMd);

    //Se crea el contenedor donde estan los integrantes del grupo y se le agrega su clase
    const grupoDiv = document.createElement('div');
    grupoDiv.classList.add('grupo');
    //Se crea un titulo para la lista de integrantes y su clase.
    const grupoTitulo = document.createElement('h4');
    grupoTitulo.classList.add('grupo_titulo');
    grupoTitulo.textContent = 'Integrantes del grupo'; //agrega el contenido a la etiqueta del titulo.

    //Se crea la lista de integrantes, también se define su clase.
    const grupoIntegrantes = document.createElement('ul');
    grupoIntegrantes.classList.add('grupo_integrantes');
    //Se definen los integrantes por medio de un array de strings.
    const integrantes = ['Tomaino Camila','Mello Federico'];
    
    //Usamos la funciín foreach para recorrer el array y asignarle el nombre de cada integrante a los "li"
    integrantes.forEach(integrante => {
        //Se crean los li con su clase
        const li = document.createElement('li');
        li.textContent = integrante;
        grupoIntegrantes.appendChild(li); //se agregan los elementos a la lista
    });

    //Se agregan el titulo y la lista al contenedor de grupo
    grupoDiv.appendChild(grupoTitulo);
    grupoDiv.appendChild(grupoIntegrantes);

    footer.appendChild(grupoDiv); //se agrega el contenedor de grupo al footer

    document.body.appendChild(footer);// Y para terminar se agrega el footer al body
});