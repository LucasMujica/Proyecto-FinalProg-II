const form = document.getElementById("formulario_historico");
const result = document.querySelector('.resultado_form');

form.addEventListener('submit', function(event) { 
    event.preventDefault();

    const fecha = document.getElementById('fecha').value;
    const dolarTipo = document.getElementById('dolar').value;

    const fechaFormateada = fecha.replace(/-/g, "/");
    const nombresNuevos = {
        blue: "Blue",
        bolsa: "Bolsa",
        contadoconliqui: "Liquidación",
        oficial: "Oficial",
        cripto: "cripto",
        solidario: "Solidario",
        mayorista: "Mayorista"
    };

    const nombreNuevo = nombresNuevos[dolarTipo] || dolarTipo;

    console.log(fechaFormateada);

    let url = `https://api.argentinadatos.com/v1/cotizaciones/dolares/${dolarTipo}/${fechaFormateada}`;

    console.log('URL:', url);

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Error en la solicitud: ' + response.statusText);
            return response.json();
        })
        .then(data => {
            result.innerHTML = `
                <div class="resultado_historico">
                    <h2>Dolar ${nombreNuevo} - ${fechaFormateada}</h2>
                    <p>Precio Compra: ${data.compra ?? 'N/A'}</p>
                    <p>Precio Venta: ${data.venta ?? 'N/A'}</p>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error:', error);
            result.innerHTML = `<p>Error: ${error.message}</p>`;
        });
});
