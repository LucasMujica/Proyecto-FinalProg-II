document.getElementById('formulario_contacto').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(this); 

    
    fetch('http://127.0.0.1:5000/contacto', { 
        method: 'POST',
        body: formData
    })
    .then(response => response.json())  
    .then(data => {
        if (data.message) {
            document.getElementById('responseMessage').innerText = data.message;
        } else {
            document.getElementById('responseMessage').innerText = 'Hubo un error al enviar el mensaje.';
        }
    })
    .catch(error => {
        console.error('Error al intentar conectar con el servidor:', error);
        document.getElementById('responseMessage').innerText = 'Error en el servidor: ' + error.message;
    });
});
