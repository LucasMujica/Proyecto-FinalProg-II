const DOLAR_API = "https://dolarapi.com/v1/dolares";

function obtenerDatos() {
    fetch("DOLAR_API")
        .then(response => response.json())  
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error("Error EN LA OBTENCÓN DE LOS DATOS:", error);  
        });
}

function procesarDatso() {
    obtenerDatos();
    .then(data => {
        const fechas = data.map(entry => entry.fechaActualizacion);  // Extrae fechas
        const valoresOficial = data.map(entry => entry.oficial);  // Dólar oficial
        const valoresBlue = data.map(entry => entry.blue);        // Dólar blue

    })
}