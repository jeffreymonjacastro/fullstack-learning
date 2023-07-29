from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dataclasses import dataclass
import os

# Global variables
UPLOAD_FOLDER = './static'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
  return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def convertToBinary(filename):
  with open(filename, 'rb') as file:
    binaryData = file.read()
  return binaryData


def convertToImage(binaryData, filename):
  with open(filename, 'wb') as file:
    file.write(binaryData)


# Flask app creation
app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost:5432/web_projects'
app.config['SQLALCHEMY<@_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_SCHEMA'] = 'mini_projects'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Database creation
db = SQLAlchemy(app)
CORS(app)

# Table creations (models)
@dataclass
class Person(db.Model):
  __tablename__ = 'person'
  __table_args__ = {'schema': 'mini_projects'}

  id: int
  name: str

  id = db.Column(
    db.Integer, 
    primary_key=True, 
    autoincrement=True
    )

  name = db.Column(
    db.String(100), 
    nullable=False
    )


@dataclass
class ImageUpload(db.Model):
  __tablename__ = 'image_upload'
  __table_args__ = {'schema': 'mini_projects'}

  id: int
  blob_image: bytes

  id = db.Column(
    db.Integer,
    primary_key=True,
    autoincrement=True
    )

  blob_image = db.Column(
    db.LargeBinary,
    nullable=False
    )


with app.app_context():
  db.create_all()


# Routes
@app.route('/person', methods=['GET', 'POST'])
def person():
  if request.method == 'GET':
    persons = Person.query.all()
    return jsonify(persons)

  if request.method == 'POST':
    data = request.get_json()
    new_person = Person(
      name = data['name']
    )
    db.session.add(new_person)
    db.session.commit()
    return jsonify({'message': 'New person created'})


@app.route('/image/upload', methods=['POST'])
def uploadImage():
  if 'file' not in request.files:
    return jsonify({'error': 'image not provided'}), 400

  file = request.files['file']

  if file.filename == '':
    return jsonify({'error': 'no image selected'}), 400

  if not allowed_file(file.filename):
    return jsonify({'error': 'invalid image format'}), 400

  file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))

  convertPic = convertToBinary(f'./static/{file.filename}')
  binary_image = ImageUpload( blob_image = convertPic )
  db.session.add(binary_image)
  db.session.commit()
  
  return binary_image.blob_image
  # return jsonify({'message': 'image uploaded successfully'}), 200


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)