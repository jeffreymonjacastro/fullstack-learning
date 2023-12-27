# Todo-app

Simple web todo app

Frontend: React + JS
Backend: Django
DataBase: SQLite3
Deploy: AWS

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


