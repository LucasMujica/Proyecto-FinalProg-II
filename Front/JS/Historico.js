const form = document.getElementById("formulario_historico"); //Selecciona formulario por ID
const result = document.querySelector('.resultado_form'); //Selecciona contenedor por clase

form.addEventListener('submit', function(event) { 
    event.preventDefault();

    const fecha = document.getElementById('fecha').value; //Almacena valores 
    const dolarTipo = document.getElementById('dolar').value;

    const fechaFormateada = fecha.replace(/-/g, "/"); //Remplaza los - por /
    const nombresNuevos = { 
        blue: "Blue",
        bolsa: "Bolsa",
        contadoconliqui: "Liquidación",
        oficial: "Oficial",
        cripto: "cripto",
        solidario: "Solidario",
        mayorista: "Mayorista"
    };// Objeto que cambia el valor de los nombres 

    const nombreNuevo = nombresNuevos[dolarTipo]; //Obtiene el nombre nuevo de acuerdo al tipo de dolar 

    console.log(fechaFormateada); 

    let url = `https://api.argentinadatos.com/v1/cotizaciones/dolares/${dolarTipo}/${fechaFormateada}`;

    console.log('URL:', url);

    fetch(url) //Solicitud a la api
        .then(response => { //Respuesta
            if (!response.ok) throw new Error('Error en la solicitud: ' + response.statusText); //Solicitud no exitosa
            return response.json(); //Solicitud exitosa convierte respuesta a json
        })
        .then(data => { //Conversion a Json exitosa usa el objeto data y actualiza contenido
            result.innerHTML = `
                <div class="resultado_historico">
                    <h2>Dolar ${nombreNuevo} - ${fechaFormateada}</h2>
                    <p>Precio Compra: ${data.compra ?? 'N/A'}</p>
                    <p>Precio Venta: ${data.venta ?? 'N/A'}</p>
                </div>
            `;//Inserta tod en el HTML
        })
        .catch(error => {
            console.error('Error:', error);
            result.innerHTML = `<p>Error: ${error.message}</p>`;
        });
});
