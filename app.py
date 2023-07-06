from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

app = Flask(__name__)
CORS(app)

# Function to read the contents of the HTML file
def read_html_file():
    html_path = os.path.join(app.static_folder, 'carta.html')
    with open(html_path, 'r') as file:
        return file.read()

# Configuration for the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://DevBurgerCaC:CodoACodoDev@DevBurgerCaC.mysql.pythonanywhere-services.com/DevBurgerCaC$CodoACodoProject'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

# Define the table model
class Productos(db.Model):
    ProdID = db.Column(db.Integer, primary_key=True)
    ProdNombre = db.Column(db.String(100))
    ProdDescrp = db.Column(db.String(500))
    ProdPrecio = db.Column(db.Integer)
    ProdImg = db.Column(db.String(400))
    ProdCarta = db.Column(db.Text)  # New field to store the HTML content

    def __init__(self, Nombre, Descripcion, Precio, Imagen, Carta):
        self.ProdNombre = Nombre
        self.ProdDescrp = Descripcion
        self.ProdPrecio = Precio
        self.ProdImg = Imagen
        self.ProdCarta = Carta

# Schema for serialization
class ProductoSchema(ma.Schema):
    class Meta:
        fields = ('ProdID', 'ProdNombre', 'ProdDescrp', 'ProdPrecio', 'ProdImg', 'ProdCarta')

producto_schema = ProductoSchema()
productos_schema = ProductoSchema(many=True)

# Create the database tables
with app.app_context():
    db.create_all()

# Route to get all products
@app.route('/productos', methods=['GET'])
def get_productos():
    all_productos = Productos.query.all()
    result = productos_schema.dump(all_productos)
    return jsonify(result)

# Route to get a specific product by ID
@app.route('/productos/<int:id>', methods=['GET'])
def get_producto(id):
    producto = Productos.query.get(id)
    return producto_schema.jsonify(producto)

# Route to create a new product
@app.route('/productos', methods=['POST'])
def create_producto():
    Nombre = request.json['Nombre']
    Descripcion = request.json['Descripcion']
    Precio = request.json['Precio']
    Imagen = request.json['Imagen']
    Carta = read_html_file()  # Read the HTML file contents

    new_producto = Productos(Nombre, Descripcion, Precio, Imagen, Carta)
    db.session.add(new_producto)
    db.session.commit()
    return producto_schema.jsonify(new_producto)

# Route to update a product
@app.route('/productos/<int:id>', methods=['PUT'])
def update_producto(id):
    producto = Productos.query.get(id)
    producto.ProdNombre = request.json['Nombre']
    producto.ProdDescrp = request.json['Descripcion']
    producto.ProdPrecio = request.json['Precio']
    producto.ProdImg = request.json['Imagen']
    db.session.commit()
    return producto_schema.jsonify(producto)

# Route to delete a product
@app.route('/productos/<int:id>', methods=['DELETE'])
def delete_producto(id):
    producto = Productos.query.get(id)
    db.session.delete(producto)
    db.session.commit()
    return producto_schema.jsonify(producto)

# Default route
@app.route('/')
def hello_world():
    return 'Hello from Flask!'

if __name__ == '__main__':
    app.run(debug=True, port=5000)
