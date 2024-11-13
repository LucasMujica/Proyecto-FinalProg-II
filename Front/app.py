from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json    

app = Flask(__name__)
CORS(app)  

@app.route('/contacto', methods=['POST'])
def contacto():
    try:
        nombre = request.form.get('from_name')
        email = request.form.get('email_id')
        mensaje = request.form.get('message')
        
        print(f"Nombre: {nombre}, Correo: {email}, Mensaje: {mensaje}")

        data = {
            'service_id': 'service_62iulep',
            'template_id': 'template_ho28gyz',
            'user_id': 'XxW6YCMvJGkR4Ub6N',
            'accessToken': 'b8JFJInRloOPmMKszaGPy',
            'template_params': {
                'from_name': nombre,
                'email_id': email,
                'message': mensaje
            }
        }

        headers = {
            'Content-Type': 'application/json',
        }

        response = requests.post(
            'https://api.emailjs.com/api/v1.0/email/send',
            data=json.dumps(data),
            headers=headers
        )
        
        print("Estado de la respuesta de EmailJS:", response.status_code)
        print("Contenido de la respuesta de EmailJS:", response.text)
        
        response.raise_for_status()

        return jsonify({'message': 'Correo enviado correctamente'}), 200

    except requests.exceptions.RequestException as e:
        print(f"Error al enviar el correo: {e}")
        return jsonify({'error': f'Error al enviar el correo: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)