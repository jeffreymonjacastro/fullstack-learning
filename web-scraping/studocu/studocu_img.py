import requests
from bs4 import BeautifulSoup
import os
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.utils import ImageReader
import io

# --- CONFIGURACIÓN ---
# Nombre del archivo HTML que guardaste manualmente
NOMBRE_ARCHIVO_HTML = [
    "html/0.html",
    "html/1.html",
    "html/2.html",
] 
# Nombre del archivo PDF de salida
OUTPUT = [
	"PDN Ingles - LES SERVIRA",
    "PDN Marzo 2024",
	"PDN 2024 - Ejercicios y Respuestas para el Examen de Inglés",

]
# --- FIN DE LA CONFIGURACIÓN ---

def extraer_de_html_local_a_pdf(archivo_html, archivo_pdf_salida):
    """
    Lee un archivo HTML local, extrae las URLs de las imágenes y las combina en un PDF.
    """
    print(f"Leyendo el archivo local: {archivo_html}")

    # Lista para almacenar las imágenes en memoria
    imagenes = []

    try:
        # 2. Abrir y leer el contenido del archivo HTML local
        with open(archivo_html, 'r', encoding='utf-8') as f:
            contenido_html = f.read()

        # 3. Analizar (parsear) el HTML con BeautifulSoup
        soup = BeautifulSoup(contenido_html, 'html.parser')

        # 4. Encontrar el contenedor principal (la lógica de búsqueda no cambia)
        contenedor_padre = soup.find('div', id='page-container')
        
        if not contenedor_padre:
            print("Error: No se pudo encontrar el contenedor con id 'page-container' en el archivo HTML.")
            print("Asegúrate de haber copiado el 'outerHTML' correctamente.")
            return

        # 5. Encontrar todos los divs que contienen las páginas/imágenes
        paginas = contenedor_padre.find_all('div', attrs={'data-page-index': True})

        if not paginas:
            print("Error: No se encontraron divs con el atributo 'data-page-index' en el archivo.")
            return

        print(f"Se encontraron {len(paginas)} páginas/imágenes en el archivo.")

        # 6. Iterar sobre cada página para extraer la URL y descargar la imagen
        for i, pagina_div in enumerate(paginas):
            indice_pagina = pagina_div.get('data-page-index')
            
            # Buscar el div con clase "pc" dentro del div actual
            div_pc = pagina_div.find('div', class_='pc')
            
            if not div_pc:
                print(f"\n[Página {indice_pagina}] No se encontró un div con clase 'pc'.")
                continue
            
            # Buscar la etiqueta img dentro del div con clase "pc"
            img_tag = div_pc.find('img')

            if img_tag and img_tag.get('src'):
                url_imagen = img_tag['src']
                print(f"\n[Página {indice_pagina}] Encontrada URL, descargando imagen...")

                try:
                    headers = {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                    # Descargar la imagen en memoria
                    respuesta_imagen = requests.get(url_imagen, stream=True, headers=headers)
                    respuesta_imagen.raise_for_status()

                    # Convertir la respuesta a una imagen PIL
                    imagen_pil = Image.open(io.BytesIO(respuesta_imagen.content))
                    
                    # Agregar la imagen a la lista con su índice
                    imagenes.append({
                        'indice': indice_pagina,
                        'imagen': imagen_pil
                    })
                    
                    print(f"-> Imagen de página {indice_pagina} cargada en memoria")

                except requests.exceptions.RequestException as e:
                    print(f"!! Error al descargar la imagen de la página {indice_pagina}. El servidor respondió con: {e.response.status_code if e.response else 'N/A'}")
                except Exception as e:
                    print(f"!! Error al procesar la imagen de la página {indice_pagina}: {e}")
            else:
                print(f"\n[Página {indice_pagina}] No se encontró una etiqueta <img> con 'src' válida dentro del div con clase 'pc'.")

        if not imagenes:
            print("No se pudo descargar ninguna imagen. No se creará el PDF.")
            return

        # 7. Crear el PDF con todas las imágenes
        print(f"\nCreando PDF con {len(imagenes)} imágenes...")
        crear_pdf_con_imagenes(imagenes, archivo_pdf_salida)

        print("\n--- Proceso completado ---")

    except FileNotFoundError:
        print(f"!! Error: No se encontró el archivo '{archivo_html}'.")
        print("Asegúrate de que el archivo HTML esté guardado en la misma carpeta que el script.")
    except Exception as e:
        print(f"!! Ocurrió un error inesperado: {e}")

def crear_pdf_con_imagenes(imagenes, archivo_pdf_salida):
    """
    Crea un PDF con todas las imágenes proporcionadas.
    """
    try:
        # Ordenar las imágenes por índice de página
        imagenes_ordenadas = sorted(imagenes, key=lambda x: int(x['indice']))
        
        # Crear el PDF
        c = canvas.Canvas(archivo_pdf_salida, pagesize=A4)
        ancho_pagina, alto_pagina = A4
        
        for i, item in enumerate(imagenes_ordenadas):
            imagen = item['imagen']
            indice = item['indice']
            
            print(f"Agregando página {indice} al PDF...")
            
            # Convertir imagen PIL a formato que reportlab puede usar
            img_buffer = io.BytesIO()
            
            # Convertir a RGB si es necesario (para evitar problemas con RGBA)
            if imagen.mode in ('RGBA', 'LA', 'P'):
                imagen = imagen.convert('RGB')
            
            imagen.save(img_buffer, format='JPEG', quality=85)
            img_buffer.seek(0)
            
            # Calcular el tamaño para ajustar la imagen a la página manteniendo la proporción
            img_ancho, img_alto = imagen.size
            factor_escala = min(ancho_pagina / img_ancho, alto_pagina / img_alto)
            
            nuevo_ancho = img_ancho * factor_escala
            nuevo_alto = img_alto * factor_escala
            
            # Centrar la imagen en la página
            x = (ancho_pagina - nuevo_ancho) / 2
            y = (alto_pagina - nuevo_alto) / 2
            
            # Agregar la imagen al PDF
            c.drawImage(ImageReader(img_buffer), x, y, width=nuevo_ancho, height=nuevo_alto)
            
            # Agregar número de página
            c.drawString(ancho_pagina - 50, 20, f"Pág. {indice}")
            
            # Nueva página (excepto para la última imagen)
            if i < len(imagenes_ordenadas) - 1:
                c.showPage()
        
        # Guardar el PDF
        c.save()
        print(f"\n✓ PDF creado exitosamente: '{archivo_pdf_salida}'")
        print(f"  Total de páginas: {len(imagenes_ordenadas)}")
        
    except Exception as e:
        print(f"!! Error al crear el PDF: {e}")

# --- Ejecutar el script ---
if __name__ == "__main__":
	for i in range(len(NOMBRE_ARCHIVO_HTML)):
		ARCHIVO_PDF_SALIDA = f"pdfs/{OUTPUT[i]}.pdf"
		extraer_de_html_local_a_pdf(NOMBRE_ARCHIVO_HTML[i], ARCHIVO_PDF_SALIDA)