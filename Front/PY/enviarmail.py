from flask import Flask, request, jsonify
import requests
import json    

app = Flask(__name__)

@app.route('/contacto', methods=['POST'])
def contacto():
    # Obención de los datos del formulario
    nombre = request.form['from_name']
    email = request.form['from_mail']
    mensaje = request.form['message']

#ConfiguraciÓn de la API
data = {
    'service_id': 'service_62iulep',
    'template_id': 'template_ho28gyz',
    'public_key': 'S86izrLtSu8K2JpDz',                                                                   
    'template_params': {
        'from_name': nombre,
        'from_email': email,
        'message': mnnsaje
    }
}

headers = {
    'Content-Type': 'application/json',
}

 try:
        response = requests.post(
            'https://api.emailjs.com/api/v1.0/email/send',
            data=json.dumps(data),
            headers=headers
        )
        response.raise_for_status()
        return jsonify({'message': 'Correo enviado correctamente'}), 200
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
