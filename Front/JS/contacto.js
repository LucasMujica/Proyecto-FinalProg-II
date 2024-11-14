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
            alert(data.message);
        } else {
            alert('Hubo un error al enviar el mensaje.');
        }
    })
    .catch(error => {
        console.error('Error al intentar conectar con el servidor:', error);
        alert('Error en el servidor: ' + error.message);
    });
});
