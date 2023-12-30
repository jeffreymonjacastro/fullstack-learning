# Usa la imagen base de Python
FROM python:3-slim

# Establece el directorio de trabajo en /app
WORKDIR /Web_mini_projects/Todo_Django/Django

# Copia el archivo requirements.txt al contenedor
COPY requirements.txt .

# Instala los paquetes del requirements.txt
RUN python -m venv venv
RUN . venv/bin/activate && pip install --no-cache-dir -r requirements.txt

# Copia el resto de la aplicación al contenedor
COPY . .

# Comando para ejecutar la aplicación
CMD ["/bin/bash", "-c", "source venv/bin/activate && python manage.py runserver 0.0.0.0:8000"]
