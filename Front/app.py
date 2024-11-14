from flask import Flask, request, jsonify #Impota Flask y los mdulos que se van a utilizar
from flask_cors import CORS #Importa cors que sirve para reCibir soLicitudes de dominios externo
import requests #Importa request
import json  #Importa JSON qe permite convertur Pyhon a Json y viceversa  

#Crea una insancia de aplicacion de Flask
app = Flask(__name__)
CORS(app)  #Habilita CORS

#Define la ruta y el metodo
@app.route('/contacto', methods=['POST'])
def contacto(): #Declara la funcion que se va a usar cuando se le haga la solicitud a la ruta
    try: #Toma los datos del formulario HTML
        nombre = request.form.get('from_name')
        email = request.form.get('email_id')
        mensaje = request.form.get('message')
        
        print(f"Nombre: {nombre}, Correo: {email}, Mensaje: {mensaje}")

        #Configuracion de los datos de la API
        data = { #Diccionario que contiene los datos necesarios para enviar un correo con EmailJS
            'service_id': 'service_62iulep', #identificador del servicio
            'template_id': 'template_ho28gyz', #Identificador de la plantilla
            'user_id': 'XxW6YCMvJGkR4Ub6N', #identficador de usuario
            'accessToken': 'b8JFJInRloOPmMKszaGPy', #clva de acceso
            'template_params': { #paramtros especificos de la planttilla
                'from_name': nombre,
                'email_id': email,
                'message': mensaje
            }
        }

        #Definicion de los encabezados
        headers = {
            'Content-Type': 'application/json', #Define que el contenido de la solicitud va a ser en Json
        }

        #
        response = requests.post( #ealiza una solicitud POST a la urL de la API para enviar el correo.
            'https://api.emailjs.com/api/v1.0/email/send',
            data=json.dumps(data), #Convierte el diccionario data a JSON
            headers=headers #Incluye los encabezados que definimos antes
        )
        
        print("Estado de la respuesta de EmailJS:", response.status_code)
        print("Contenido de la respuesta de EmailJS:", response.text)
        
        response.raise_for_status() #Tira una excepcion si la solicitud falla (codio de estado)

        return jsonify({'message': 'Correo enviado correctamente'}), 200 #Responde al cliente con un objeto JSON diciendo que el correo se  envio correctamente, junto con un código de estado 200 (OK).

    except requests.exceptions.RequestException as e:
        print(f"Error al enviar el correo: {e}")
        return jsonify({'error': f'Error al enviar el correo: {str(e)}'}), 500 #Captura cualquier excepción lamzada al hacer la solicitud y responde con un error JSON y un código de estado 500(Error interno del servidor)..

if __name__ == '__main__': # Verifica que el script se está ejecutando directamente
    app.run(debug=True) #Aplicacion en modo debugger