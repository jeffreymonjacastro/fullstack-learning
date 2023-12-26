## Tutorial Django

### Crear un entorno virtual de Py
  
```bash
# Descargar la librería
pip install virtualenv

# Crear el entorno virtual
virtualenv nombre_entorno

# Activar el entorno virtual (windows)
.\venv\Scripts\activate

# Activar el entorno virtual (linux)
source venv/bin/activate
```

### Comandos pip en venv

```bash
# Instalar una librería
python -m pip install "nombre_libreria"

# Actualizar los requerimientos
python -m pip freeze > requirements.txt

# Descargar todos los requerimientos
python -m pip install -r requirements.txt
```


### Correr servidor de Django

```bash
# Se ejecuta en el puerto 8000
python manage.py runserver

# Se ejecuta en el puerto 3000
python manage.py runserver 3000

# Se ejecuta en todos los hosts (importante, debemos añadir en ALLOWED_HOSTS = ['*'] en settings.py)
python manage.py runserver 0.0.0.0:8000
```

### Ingresar al servidor local

```bash
# Se ingresa a la ruta
http://localhost:3000/

```

### Comandos de Django

```bash
# Crear un proyecto
django-admin startproject nombre_proyecto

# Crear una aplicación
python manage.py startapp nombre_app

# Crear migraciones
python manage.py makemigrations

# Migrar
python manage.py migrate

# Crear super usuario
python manage.py createsuperuser

```

### Estructura de un proyecto Django

+ mini_todo : Proyecto Django (Código fuente de la aplicación)
  + __pycache__ : Config de Python (cache)
  + __init__.py : (Vacío) sirve para decirle a Django que esa carpeta es un módulo de Python
  + asgi.py     : Usado para Producción
  + settings.py : !important Configuración del proyecto
  + urls.py     : Urls que los usuarios podrán visitar
  + wsgi.py     : Usado para Producción

+ db.sqlite3    : Base de datos SQL de la aplicación
+ manage.py     : Ejecutar comandos administrativos 

### Crear Aplicaciones de Django

```bash
# Crear una aplicación
python manage.py startapp nombre_app

# Mientras no se conecten las apps se pueden eliminar
```

### Estructura de la aplicación Django

+ todoapp         : Aplicación Django
  + migrations    : Carpeta vacía que se irá llenando con la base de datos
    + __init__.py 
  + __init__.py   : Sea detectada un módulo de Python
  + admin.py      : (Panel de administrador) Configuración del panel de administrador
  + apps.py       : Configuración de la aplicación, como el settings.py
  + models.py     : Classes que se van a convertir en tablas de la base de datos
  + tests.py      : Pruebas de la aplicación
  + views.py      : (Principal) Qué se va a enviar al cliente para que lo pueda ver en pantalla 

### Hola Mundo en Django

Se crea una función en views.py

```python
from django.http import HttpResponse

def index(request):
  return HttpResponse("Hola Mundo")
```

Se crea una url en urls.py

```python
from todoapp import views

urlpatterns = [
  path('', views.hello)
]
```

### Bases de datos y migraciones

Migraciones : Son los cambios que se hacen en la base de datos

Para ejecutar las migraciones se usa el comando

```bash
# Crear migraciones
python manage.py migrate
```

Se debe crear un modelo en py que se transformará en una tabla en el archivo models.py

Luego, se debe agregar en settings.py en la lista de instaled apps el nombre de la aplicación

```python
INSTALLED_APPS = [
  'todoapp'
]
```

Después, ejecutar las migraciones. Se crea un archivo nuevo en la carpeta de migraciones.
Cada vez que se haga una modificación en los modelos se debe ejecutar el comando.

```bash
python manage.py makemigrations todoapp

python manage.py migrate todoapp
```

### Django Shell

```bash
# Ingresar al shell
python manage.py shell

```

Hacer un POST

```bash
# Importar los modelos
from todoapp.models import Project, Task

# Crear un proyecto
project = Project(name="Proyecto 1")
project.save()
```

Hacer un GET

```bash
# Obtener todos los proyectos
Project.objects.all()

# Obtener un proyecto
Project.objects.get(id=1)
```

Salir del shell

```bash
exit()
```

Conectar una tabla con llave foránea

```bash
## Crear una tarea POST
from todoapp.models import Project, Task

project = Project.objects.get(id=1)

proyect.task_set.create(title="descargar")

## Obtener las tareas GET
project.task_set.all()

```

Consultas con Django

```bash
Project.objects.filter(name__startswith="aplicacion")
```

### Params

Se pueden pasar parámetros en la url en la aplicación

```python
# En urls.py
urlpatterns = [
	path('hello/<str:username>', views.hello),
]

# En views.py
def hello(request, username):
	return HttpResponse(f"Hola {username}")
```

Se pueden utilizar esos parámetros para hacer consultas en la base de datos

```python
# En views.py
def hello(request, username):
	user = User.objects.get(username=username)
	return HttpResponse(f"Hola {user.first_name}")
```

### Admin Page

Se debe crear un super usuario

```bash
# Crear super usuario
python manage.py createsuperuser

## Ingresar un nuevo usuario, correo y contraseña

# Ingresar al admin
http://localhost:3000/admin

```

Para añadir determinados modelos al panel de administración, se debe entrar al archivo admin.py de la aplicación

```python
from .models import Project, Task

admin.site.register(Project)
admin.site.register(Task)
```

### Render

Se puede renderizar un archivo html en la aplicación. Para ello, se debe crear una carpeta templates dentro de la aplicación y dentro de ella un archivo html

+ todoapp
  + templates
	+ index.html
	


## Deploy de Django en AWS EC2

### Crear una instancia EC2 en AWS
1. Ir a la consola de AWS
2. Ir a la sección de EC2
3. Click en AMI
4. Buscar por la instancia t2.micro
5. Colocar de filtro la AMI Cloud9Ubuntu y seleccionar la AMI
6. Click en crear instancia
7. 
