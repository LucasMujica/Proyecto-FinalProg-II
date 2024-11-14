
from flask import Flask, jsonify, request  #Modulo flask importa Flask (Creacion de api) Jsonify(Convierte diccionario de Python a Json) Request (Permite accer a datos de las solicitudes HTTP)
from flask_cors import CORS #Modulo flask_cors CORS (Permite recibir solicitudes de otros dominios APIS EN ESTE CASO)
import requests #Envia solicitudes http y recibe respuestas de servidores web (Se usa para la API)
import smtplib #Conecta con un servidor y envia correos
from email.mime.multipart import MIMEMultipart #Permite crear correos electronicos que tienen varias partes
from email.mime.text import MIMEText #Se utiliza para crear el cuerpo de un correo

app = Flask(__name__)
CORS(app)


@app.route('/envioDeCotizacion', methods=["POST"]) #Establece ruta con metodo post (Recibe solicitudes post)
def enviar_cotizacion(): 
    data = request.get_json() #convierte el json a diccionario 
    email = data.get("email") #Accede al valor almacenado en la clave email
    if not email:
        return jsonify({"error": "Email es requerido"}), 400 #no cumple con los requisistos del server

    
    api_url = "https://dolarapi.com/v1/dolares"
    response = requests.get(api_url) #solicitud de datos a la API

    if response.status_code == 200: #codigo de estado OK
        cotizaciones = response.json() #Convierte a Python
        cuerpo_html = "<h1>Valor del Dólar</h1><ul>" #Cuerpo del mensaje
        for item in cotizaciones: #Recorre el diccionario y le va agregando contenido a la lista basado en su clave
            cuerpo_html += f"<li><strong>TIPO:</strong> {item['casa']}, <strong>COMPRA:</strong> {item['compra']}, <strong>VENTA:</strong> {item['venta']}</li>"
        cuerpo_html += "</ul>"

        enviar_correo(email, "Cotización Actual del dolar", cuerpo_html)
        return jsonify({"message": "MAIL ENVIADO CON EXTIO"}), 200
    else:
        return jsonify({"error": "Error al obtener datos de la API"}), 500


def enviar_correo(destinatario, asunto, cuerpo_html):
    print("Iniciando envio de correo....")
    remitente = "cafecotizaciones@gmail.com" 
    contraseña = "makn muqw piaq ofjz" 

    msg = MIMEMultipart() #Crea el objeto de la clas MIME
    msg['From'] = remitente #Asigna campos
    msg['To'] = destinatario
    msg['Subject'] = asunto
    msg.attach(MIMEText(cuerpo_html, 'html')) #adjunta el cuerpo del mensaje y le dice que el contenido es html con MIMEText

    print(msg.as_string())

    try:
        servidor = smtplib.SMTP('smtp.gmail.com', 587) #Crea una conexion con el servidor puerto 587 puerto recomendado 
        servidor.starttls() #Inicia conexion segura con el servidor usando tls cifrando contenido 
        servidor.login(remitente, contraseña) #proporciona las credenciales para autenticarse en el server
        servidor.sendmail(remitente, destinatario, msg.as_string()) #Envia el mail con remitente, destinatario y convierte el MIMEMultipart en texto
        servidor.quit() #Corta la conexion con el servidor
        print("Correo enviado con éxito")
    except Exception as e:
        print(f"Error al enviar el correo: {e}")

if __name__ == '__main__':  
    app.run(debug=True)     #el debugg muestra errores mas detallados
