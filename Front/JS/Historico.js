function filtrarFecha(){
    const fechaInicial = document.getElementById('fechaInicial').value;
    const fechaFinal = document.getElementById('fechaFinal').value;
    
    if (fechaInicial && fechaFinal){

        const desde = new Date(fechaInicial);
        const hasta = new Date(fechaFinal);

            const datosFiltrados = datosCotizaciones.filter(monedaData => {
                const fechaData = new Date(monedaData.fechaActualizacion);
                return fechaData >= desde && fechaData <= hasta;
        });
        mostrarCotizaciones(datosFiltrados);
    } else {
        mostrarCotizaciones(datosCotizaciones);
    }
}

document.getElementById('boton-filtrar').addEventListener('click', filtrarFecha);
