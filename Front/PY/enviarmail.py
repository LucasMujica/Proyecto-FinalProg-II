from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import requests
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)

# Endpoint para enviar la cotización por correo
@app.route('/enviar-cotizacion', methods=["POST"])
def enviar_cotizacion():
    data = request.get_json()
    email = data.get("email")
    if not email:
        return jsonify({"error": "Email es requerido"}), 400

    # API de cotizaciones del dólar
    api_url = "https://dolarapi.com/v1/dolares"
    response = requests.get(api_url)

    if response.status_code == 200:
        cotizaciones = response.json()
        cuerpo_html = "<h1>Valor del Dólar Hoy</h1><ul>"
        for item in cotizaciones:
            cuerpo_html += f"<li><strong>Casa:</strong> {item['casa']}, <strong>Compra:</strong> {item['compra']}, <strong>Venta:</strong> {item['venta']}</li>"
        cuerpo_html += "</ul>"

        enviar_correo(email, "Cotización del Dólar Hoy", cuerpo_html)
        return jsonify({"message": "MAIL ENVIADO CON EXTIO"}), 200
    else:
        return jsonify({"error": "Error al obtener datos de la API"}), 500

def enviar_correo(destinatario, asunto, cuerpo_html):
    remitente = "cafecotizaciones@gmail.com"
    contraseña = "makn muqw piaq ofjz "  # Ponla en una variable de entorno para mayor seguridad

    msg = MIMEMultipart()
    msg['From'] = remitente
    msg['To'] = destinatario
    msg['Subject'] = asunto
    msg.attach(MIMEText(cuerpo_html, 'html'))

    try:
        servidor = smtplib.SMTP('smtp.gmail.com', 587)
        servidor.starttls()
        servidor.login(remitente, contraseña)
        servidor.sendmail(remitente, destinatario, msg.as_string())
        servidor.quit()
        print("Correo enviado con éxito")
    except Exception as e:
        print(f"Error al enviar el correo: {e}")