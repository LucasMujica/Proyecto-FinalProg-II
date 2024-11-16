from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class ServicioCorreo:
    def __init__(self, servidor_smtp, puerto_smtp, correo_remitente, contraseña):
        self.servidor_smtp = servidor_smtp
        self.puerto_smtp = puerto_smtp
        self.correo_remitente = correo_remitente
        self.contraseña = contraseña

    def send_email(self, destinatario, asunto, cuerpo_html):
        print("Iniciando envío de correo...")
        msg = MIMEMultipart()
        msg['From'] = self.correo_remitente
        msg['To'] = destinatario
        msg['asunto'] = asunto
        msg.attach(MIMEText(cuerpo_html, 'html'))

        try:
            with smtplib.SMTP(self.servidor_smtp, self.puerto_smtp) as servidor:
                servidor.starttls()
                servidor.login(self.correo_remitente, self.contraseña)
                servidor.sendmail(self.correo_remitente, destinatario, msg.as_string())
            print("Correo enviado con éxito")
        except Exception as e:
            print(f"Error al enviar el correo: {e}")
            raise


class ServicioCotizaciones:
    def __init__(self, api_url, servicio_correo):
        self.api_url = api_url
        self.servicio_correo = servicio_correo

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
        self.servicio_correo.send_email(email, "Cotización Actual del dólar", cuerpo_html)


class ServicioContacto:
    def __init__(self, servicio_correo, configuracion_emailjs):
        self.servicio_correo = servicio_correo
        self.configuracion_emailjs = configuracion_emailjs

    def enviar_contacto(self, nombre, email, mensaje):
        data = {
            'service_id': self.configuracion_emailjs['service_id'],
            'template_id': self.configuracion_emailjs['template_id'],
            'user_id': self.configuracion_emailjs['user_id'],
            'accessToken': self.configuracion_emailjs['accessToken'],
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
        self.servicio_correo = ServicioCorreo('smtp.gmail.com', 587, 'cafecotizaciones@gmail.com', 'makn muqw piaq ofjz')
        self.servicio_cotizacion = ServicioCotizaciones("https://dolarapi.com/v1/dolares", self.servicio_correo)
        self.servicio_contacto = ServicioContacto(self.servicio_correo, {
            'service_id': 'service_62iulep',
            'template_id': 'template_ho28gyz',
            'user_id': 'XxW6YCMvJGkR4Ub6N',
            'accessToken': 'b8JFJInRloOPmMKszaGPy'
        })
        self.configurar_rutas()

    def configurar_rutas(self):
        @self.app.route('/contacto', methods=['POST'])
        def contacto():
            try:
                nombre = request.form.get('from_name')
                email = request.form.get('email_id')
                mensaje = request.form.get('message')
                self.servicio_contacto.enviar_contacto(nombre, email, mensaje)
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
                self.servicio_cotizacion.enviar_cotizacion(email)
                return jsonify({"message": "Mail enviado con éxito"}), 200
            except Exception as e:
                return jsonify({'error': str(e)}), 500

    def run(self):
        self.app.run(debug=True)


if __name__ == '__main__':
    FlaskApp().run()
