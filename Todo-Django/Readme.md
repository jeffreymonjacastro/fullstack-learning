# Todo-app

Simple web todo app

+ Frontend: React + JS
+ Backend: Django
+ DataBase: PostgreSQL
+ Deploy: AWS S3 + EC2

## Pasos para hacer el Deploy de Django en AWS EC2

### Arquitectura de Solución para Todo_Django:
![Arquitectura de solución para Todo_Django](https://todo-django-jamcy.s3.amazonaws.com/Todo_django.png)


### Crear instancias EC2 en AWS
1. Ir a la consola de AWS
2. Ir a la sección de EC2
3. Click en AMI
4. Buscar por la instancia t2.micro
5. Colocar de filtro la AMI Cloud9Ubuntu y seleccionar la AMI
6. Asignarle un nombre a las instancias
7. Click en crear instancia
8. En el grupo de seguridad que se asocia a la instancia (generalmente launch-wizard), habilitar el puerto 8000 donde se ejecutará el servidor de Django y el puerto 5432 donde se ejecutará postgres

### Asociar Elastic IP a la instancia EC2
1. Ir a la consola de AWS
2. Ir a la sección de EC2
3. Click en Elastic IPs
4. Click en Allocate Elastic IP address
5. Click en Allocate
6. Click en Associate Elastic IP address
7. Seleccionar la instancia EC2 creada anteriormente
8. Click en Associate
9. Realizar el mismo proceso tanto para la instancia de Django como para la instancia de Postgres

### Ingresar a las instancias EC2
1. Ir a la consola de AWS
2. Ir a la sección de EC2
3. Click en Instances
4. Seleccionar la instancia EC2 creada anteriormente
5. Click en Connect
6. Copiar el comando de ejemplo para ingresar a la instancia EC2
7. Abrir la terminal de Cloud9
8. Pegar el comando copiado anteriormente
9. Ingresar a la instancia EC2

## Pasos para hacer el Deploy de postgres en EC2
1. Crea un volumen de Amazon EBS:

Accede a la consola de administración de AWS y navega hasta la sección de Amazon EC2. Luego, ve a la pestaña "Volúmenes" y haz clic en "Crear volumen". Ajusta los parámetros según tus necesidades, como el tamaño y el tipo de volumen. Asegúrate de seleccionar **la misma región y zona de disponibilidad** que tu instancia de EC2.

2. Adjunta el volumen a tu instancia de EC2: 

Una vez que el volumen de EBS esté creado, selecciona el volumen y haz clic en "Acciones" y luego en "Asociar volumen". Selecciona tu instancia de EC2 y especifica el dispositivo de bloque donde deseas adjuntar el volumen (por defecto, /dev/sdf o /dev/xvdf).

3. Formatea y monta el volumen en tu instancia de EC2:

Con el volumen adjunto, conectarse a la instancia de EC2 a través de SSH y utilizar comandos de línea de comandos para formatear y montar el volumen. Por ejemplo, puedes utilizar el comando:

```bash
sudo mkfs -t ext4 /dev/xvdf
``` 
para formatear el volumen y luego crear un directorio de montaje con:

```bash
sudo mkdir /mnt/postgresql
``` 

Finalmente, puedes montar el volumen con:

```bash
sudo mount /dev/xvdf /mnt/postgresql
```

4. Configura Docker para utilizar el volumen:

Si estás utilizando Docker para ejecutar tu contenedor de PostgreSQL, debes ajustar la configuración de Docker para que utilice el volumen montado. Esto implica utilizar la opción `-v o --volume` al ejecutar el contenedor de PostgreSQL para especificar la ruta del volumen. Por ejemplo:

```bash
docker run -d --name postgresql_c -e POSTGRES_PASSWORD=123 -p 5432:5432 -v /mnt/postgresql:/var/lib/postgresql postgres
```

En este ejemplo, el directorio `/mnt/postgresql` (que es el punto de montaje del volumen de EBS) se vincula al directorio `/var/lib/postgresql` dentro del contenedor de PostgreSQL.

Para verificar que el contenedor se esté ejecutando podemos ejecutar el comando:

```bash
docker ps
```

#### Importante
+ Si se detiene el contenedor se debe volver a ejecutar con `docker start <id_contenedor>`

5. Crear el usuario y la base de datos en postgres:

Se debe ingresar al contenedor de postgres con los siguientes pasos

```bash
# Ingresar al contenedor de postgres
docker exec -it <nombre_contenedor> bash

# Ingresar a postgres
psql -U postgres

# Crear la base de datos
CREATE DATABASE <nombre_base_de_datos>;

# Modificar el usuario
ALTER USER postgres WITH PASSWORD '123';

# Salir de postgres
\q
exit
```

6. Subir la imagen a dockerhub.

Primero, ingresar a la cuenta de dockerhub con el siguiente comando:

```bash
docker login -u <nombre_usuario>
```

Luego, preferiblemente se debería cambiar el nombre de la imagen con el siguiente comando:

```bash
docker tag <nombre_imagen> <nombre_usuario>/<nombre_imagen>
```

Después, subir la imagen a dockerhub con el siguiente comando:

```bash
docker push <nombre_imagen>
```

+ Se puede verificar que la imagen se subió correctamente ingresando a la cuenta de dockerhub.

Finalmente, desloguearse de dockerhub con el siguiente comando:

```bash
docker logout
```

Listo, ya está el servidor de postgres ejecutándose en una instancia EC2 de AWS.


### Ejecutar el backend (Django) con docker en EC2
1. Ingresar a la instancia EC2
2. Clonar el repositorio con el backend de Django:

```bash
git clone <url_del_repositorio>
```

Si se quiere acceder a una rama, se debe ejecutar el siguiente comando:

```bash
# Listar todas las ramas remotas
git branch -a

# Crea y Rastrea Todas las Ramas Remotas Locales
for branch in $(git branch -a | grep 'remotes/origin' | grep -v 'HEAD' | awk '{gsub(/remotes\/origin\//,"")} {print $1}'); do git branch --track $branch; done

# Verificar que se crearon las ramas locales
git branch

# Cambiar de rama
git checkout <nombre_rama>
```

Para actualizar la rama, se debe ejecutar el siguiente comando:

```bash
# Actualizar la rama
git pull origin <nombre_de_tu_rama>

# Verificar los cambios locales
git log
```

3. Ingresar a la carpeta del repositorio:

```bash
cd <nombre_del_repositorio>
```

4. Asegurarse que el Django esté configurado para ejecutarse en modo producción:

```bash
# Ingresar a la carpeta del proyecto
cd <nombre_del_proyecto>

# Ingresar al archivo settings.py
nano settings.py

# Buscar la variable DEBUG y cambiar su valor a False
DEBUG = False
```

5. Asegurarse que el Django está conectado con el postgres:

```bash
# Ingresar a la carpeta del proyecto
cd <nombre_del_proyecto>

# Ingresar al archivo settings.py
nano settings.py
```

```python
# Buscar la variable DATABASES y cambiar su valor a lo siguiente:
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'reganvi_data', # Nombre de la base
        'USER': 'postgres', # Default
        'PASSWORD': '123',
        'HOST': '44.208.246.187', # Instancia EC2 donde se ejecuta postgres
        'PORT': '5432', # Default
    }
}
```

6. Crear un archivo Dockerfile con el siguiente contenido:

```dockerfile
# Usa la imagen base de Python
FROM python:3-slim

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo requirements.txt al contenedor
COPY requirements.txt .

# Instala los paquetes del requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto de la aplicación al contenedor
COPY . .

# Ejecuta las migraciones
RUN python manage.py migrate

# Crea un superusuario (debe ser cambiado por el nombre de usuario, correo y contraseña que se desee)
RUN echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('jamcy', 'admin@example.com', '123')" | python manage.py shell

# Comando para ejecutar la aplicación
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

7. Crea una imagen de docker con el siguiente comando:

```bash
docker build -t <nombre_imagen> .
```

8. Ejecuta la imagen de docker

Primero, ejecutamos el contenedor con el siguiente comando:

```bash
docker run -d --name <nombre_contenedor> -p 8000:8000 <nombre_imagen:tag>
```

Verificar si el contenedor se está ejecutando con el siguiente comando:

```bash
docker ps
```

OJO: Si no se logra ejecutar algunos de los comandos, se puede ejecutar ingresando al contenedor con el siguiente comando:

```bash
# ingresar al contenedor
docker exec -it <nombre_contenedor> bash

# Ejecutar las migraciones
python manage.py migrate

# Crear un superusuario (debe ser cambiado por el nombre de usuario, correo y contraseña que se desee)
python manage.py createsuperuser

# Salir del contenedor
exit
```

#### Importante:

+ Cada vez que se realice un cambio en el código, se debe volver a ejecutar el comando 5 para crear una nueva imagen de docker y luego ejecutar el comando 6 para ejecutar la nueva imagen de docker.
+ Si se detiene la instancia EC2, se debe volver a ejecutar el comando 6 para ejecutar la imagen de docker.

9. Subir la imagen a dockerhub.

Primero, ingresar a la cuenta de dockerhub con el siguiente comando:

```bash
docker login -u <nombre_usuario>
```

Luego, preferiblemente se debería cambiar el nombre de la imagen con el siguiente comando:

```bash
docker tag <nombre_imagen> <nombre_usuario>/<nombre_imagen>
```

Después, subir la imagen a dockerhub con el siguiente comando:

```bash
docker push <nombre_imagen>
```

+ Se puede verificar que la imagen se subió correctamente ingresando a la cuenta de dockerhub.

Finalmente, desloguearse de dockerhub con el siguiente comando:

```bash
docker logout
```

### Automatizar el proceso de activación de base de datos y contenedores
1. Crear un directorio para almacenar los archivos de configuración:

```bash
mkdir /home/ubuntu/automatizar
```

2. Crear un archivo app-start.sh con el siguiente contenido:

```bash
echo "Iniciando contenedor de Postgres"
echo "--------------------------------"

docker start <id_contenedor>

echo "Iniciando contenedor de Django"
echo "-------------------------------"

docker start <id_contenedor>

echo "Contenedores en ejecución:"
echo "-------------------------------"

docker ps
```

3. Crear un archivo app-stop.sh con el siguiente contenido (opcional):

```bash
echo "Deteniendo contenedor de Postgres"
echo "--------------------------------"

docker stop <id_contenedor>

echo "Deteniendo contenedor de Django"

docker stop <id_contenedor>

echo "Contenedores detenidos:"

docker ps -a
```

4. Agregar el archivo app-start.sh al cron de la instancia EC2:

```bash
# Abrir el cron
sudo crontab -e

# Agregar la siguiente línea al final del cron
@reboot /home/ubuntu/automatizar/app-start.sh

# Ctrl + O + Enter para guardar
# Ctrl + X para salir
```

### Subir el frontend (React) a S3
1. Crear un bucket en S3
+ Ir a la sección de S3
+ Click en crear un bucket
+ Ponerle un nombre único
+ Activar la opción **ACL Habilitadas**
+ Desactivar la opción de **bloquear todo el acceso público**
+ Click en crear bucket

2. Habilitar el alojamiento de sitios web estáticos
+ Click en el bucket creado
+ Click en la pestaña de propiedades
+ Ir hasta el último apartado de **Alojamiento de sitios web estáticos** y click en editar
+ Activar la opción de **Usar este bucket para alojar un sitio web estático**
+ En el campo de **Index document** y **Error document**, colocar **index.html**
+ Click en guardar

3. Configurar el bucket para que sea público
+ Click en la pestaña de permisos
+ Ir al apartado de **Política de bucket** y clikc en editar
+ Agregar el siguiente json en el panel **Política**

```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "Statement1",
			"Effect": "Allow",
			"Principal": "*",
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::reganvi-web-app/*"
		}
	]
}
```

+ Click en guardar cambios

4. Subir los archivos del frontend al bucket
+ Ejecutar el comando en la terminal local para convertir el React en producción:

```bash
npm run build
```

+ Se creará una nueva carpeta **dist** con los documentos a subir
+ Arrastrar todos los archivos de la carpeta **dist** al bucket, de manera que index.html esté en la raíz del bucket
+ Seleccionar todos los archivos alojados
+ Click en **Acciones>Hacer público mediante ACL**

Listo :D

5. Opcional - Almacenar imágenes

S3 bucket también funciona como servicio de alojamiento de imágenes, por lo que cada imagen que se suba tendrá un link público asociado el cual podrá usarse en el frontend. Para ello, asegúrate de subir el paso 4 con cada archivo nuevo que se suba.





