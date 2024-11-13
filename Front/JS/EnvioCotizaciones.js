document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario_envio");

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const emailInput= document.getElementById("mail");
        const email = emailInput.value;

        console.log(email);
        
        if (!email) {
            alert("Por favor ingrese un correo electrónico válido.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/enviar-cotizacion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message); 
                emailInput.value ="";
            } else {
                alert(result.error || "Error al enviar el correo.");
            }
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
            alert("Hubo un problema al enviar la solicitud. Intente nuevamente.");
        }
    });
});