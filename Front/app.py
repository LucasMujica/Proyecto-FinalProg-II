from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class EmailService:
    def __init__(self, smtp_server, smtp_port, sender_email, password):
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.sender_email = sender_email
        self.password = password

    def send_email(self, recipient, subject, html_content):
        print("Iniciando envío de correo...")
        msg = MIMEMultipart()
        msg['From'] = self.sender_email
        msg['To'] = recipient
        msg['Subject'] = subject
        msg.attach(MIMEText(html_content, 'html'))

        try:
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.password)
                server.sendmail(self.sender_email, recipient, msg.as_string())
            print("Correo enviado con éxito")
        except Exception as e:
            print(f"Error al enviar el correo: {e}")
            raise


class CotizacionService:
    def __init__(self, api_url, email_service):
        self.api_url = api_url
        self.email_service = email_service

    def obtener_cotizaciones(self):
        response = requests.get(self.api_url)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception("Error al obtener datos de la API")

    def enviar_cotizacion(self, email):
        cotizaciones = self.obtener_cotizaciones()
        cuerpo_html = "<h1>Valor del Dólar</h1><ul>"
        for item in cotizaciones:
            cuerpo_html += f"<li><strong>TIPO:</strong> {item['casa']}, <strong>COMPRA:</strong> {item['compra']}, <strong>VENTA:</strong> {item['venta']}</li>"
        cuerpo_html += "</ul>"
        self.email_service.send_email(email, "Cotización Actual del dólar", cuerpo_html)


class ContactoService:
    def __init__(self, email_service, emailjs_config):
        self.email_service = email_service
        self.emailjs_config = emailjs_config

    def enviar_contacto(self, nombre, email, mensaje):
        data = {
            'service_id': self.emailjs_config['service_id'],
            'template_id': self.emailjs_config['template_id'],
            'user_id': self.emailjs_config['user_id'],
            'accessToken': self.emailjs_config['accessToken'],
            'template_params': {
                'from_name': nombre,
                'email_id': email,
                'message': mensaje
            }
        }
        headers = {'Content-Type': 'application/json'}
        response = requests.post(
            'https://api.emailjs.com/api/v1.0/email/send',
            data=json.dumps(data),
            headers=headers
        )
        response.raise_for_status()


# Configuración de la aplicación Flask
class FlaskApp:
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)
        self.email_service = EmailService('smtp.gmail.com', 587, 'cafecotizaciones@gmail.com', 'makn muqw piaq ofjz')
        self.cotizacion_service = CotizacionService("https://dolarapi.com/v1/dolares", self.email_service)
        self.contacto_service = ContactoService(self.email_service, {
            'service_id': 'service_62iulep',
            'template_id': 'template_ho28gyz',
            'user_id': 'XxW6YCMvJGkR4Ub6N',
            'accessToken': 'b8JFJInRloOPmMKszaGPy'
        })
        self.setup_routes()

    def setup_routes(self):
        @self.app.route('/contacto', methods=['POST'])
        def contacto():
            try:
                nombre = request.form.get('from_name')
                email = request.form.get('email_id')
                mensaje = request.form.get('message')
                self.contacto_service.enviar_contacto(nombre, email, mensaje)
                return jsonify({'message': 'Correo enviado correctamente'}), 200
            except Exception as e:
                return jsonify({'error': str(e)}), 500

        @self.app.route('/envioDeCotizacion', methods=["POST"])
        def envio_de_cotizacion():
            try:
                data = request.get_json()
                email = data.get("email")
                if not email:
                    return jsonify({"error": "Email es requerido"}), 400
                self.cotizacion_service.enviar_cotizacion(email)
                return jsonify({"message": "Mail enviado con éxito"}), 200
            except Exception as e:
                return jsonify({'error': str(e)}), 500

    def run(self):
        self.app.run(debug=True)


if __name__ == '__main__':
    FlaskApp().run()
