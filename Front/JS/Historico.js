const form = document.getElementById("formulario_historico");
const result = document.querySelector('.resultado_form')

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const fecha = document.getElementById('fecha').value;
    const dolarTipo = document.getElementById('dolar').value;

    if(!fecha || !dolarTipo){
        result.innerHTML = '<p>Completar con todos los datos por favor</p>';
        return;
    }

    const fechaFormateada = fecha.replace(/-/g, "/");

    console.log("fecha seleccionada", fechaFormateada);

    let url =`https://api.argentinadatos.com/v1/cotizaciones/dolares/${dolarTipo}/${fechaFormateada}`;

    console.log('URL:', url);

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error en la solicitud: ' + response.statusText);

        const data = await response.json();
        result.innerHTML = `
            <div class="resultado_historico">
                <h2>Dolar ${dolarTipo.toUpperCase()} - ${fechaFormateada}</h2>
                <hr/>
                <p>Precio Compra: ${data.compra ?? 'N/A'}</p>
                <p>Precio Venta: ${data.venta ?? 'N/A'}</p>
            </div>
        `;
}   catch (error) {
        console.error('Error:', error);
        result.innerHTML = `<p>Error: ${error.message}</p>`;
}

});