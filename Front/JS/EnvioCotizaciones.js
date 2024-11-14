document.getElementById('formulario_envio').addEventListener('submit', (event) => {
    event.preventDefault(); 

    const emailInput = document.getElementById("mail");
    const email = emailInput.value; //almacena el valor del mail ingresado para luego borrarlo

    fetch("http://127.0.0.1:5000/envioDeCotizacion", { //solicitud realizada al servidor.....
        method: "POST",                                 //La solicitudo va a ser un POST
        headers: { "Content-Type": "application/json" },//Se va a enviar contenido en JSON
        body: JSON.stringify({ email }) //Convierte el mail a JSON
    })
    .then(response => response.json()) //Espera respuesta del servidor y convierte el json en un objeto javascript
    .then(data => {    //Procesa las respuesta que recibe del servidor
        if (data.message) { //Busca la propiedad Message y la muestra
            alert(data.message); 
            emailInput.value=''; 
        } else {
            alert('Hubo un error al enviar el mensaje.');//Mensaje si no encuentra la propiedad message
        }
    })
    .catch(error => {
        console.error('Error al intentar conectar con el servidor:', error);//Error al conectar con el servidor
        alert('Error en el servidor: ' + error.message);
    });
});