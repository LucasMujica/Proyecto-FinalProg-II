from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Página principal (mostrar formulario)
@app.route('/')
def home():
    return render_template('contacto.html')

# Ruta que maneja el formulario
@app.route('/contacto', methods=['POST'])
def contacto():
    if request.method == 'POST':
        nombre = request.form['user_name']
        email = request.form['user_mail']
        mensaje = request.form['user_message']
        
        # 
        print(f"Nombre: {nombre}, Email: {email}, Mensaje: {mensaje}")

        # Redirigir al usuario a una página de éxito
        return redirect(url_for('success'))

@app.route('/success')
def success():
    return "Gracias por tu mensaje. Nos contactaremos con vos más arde."

if __name__ == '__main__':
    app.run(debug=True)