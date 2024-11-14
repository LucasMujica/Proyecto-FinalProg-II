document.getElementById('formulario_envio').addEventListener('submit', (event) => {
    event.preventDefault(); 

    const emailInput = document.getElementById("mail");
    const email = emailInput.value;

    fetch("http://127.0.0.1:5000/envioDeCotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            emailInput.value='';
        } else {
            alert('Hubo un error al enviar el mensaje.');
        }
    })
    .catch(error => {
        console.error('Error al intentar conectar con el servidor:', error);
        alert('Error en el servidor: ' + error.message);
    });
});