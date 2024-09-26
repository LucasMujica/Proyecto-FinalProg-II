var dolarApi

fetch("https://dolarapi.com/v1/dolares")
    .then(response => response.json())
    .then(data => { dolarApi = data });

