#!/usr/bin/env python3
"""
Script para extraer texto de archivos HTML de StudoCu y convertirlos a PDF.
Este script maneja la compleja estructura de spans que contiene el texto fragmentado.
"""

import os
import re
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY

# ==================== VARIABLES GLOBALES CONFIGURABLES ====================
# Modifica estas variables según tus necesidades

# Ruta al archivo HTML individual o directorio con archivos HTML
INPUT_PATH = "html/6.html"

# Directorio de salida para los PDFs (None para usar directorio por defecto)
OUTPUT_PATH = "pdfs/BASE DE Lecturas - PDN UPC.pdf"

# Título para el documento PDF
DOCUMENT_TITLE = "Documento"

# ============================================================================


def extract_text_from_element(element):
    """
    Extrae texto de un elemento HTML, combinando el contenido de múltiples spans.
    
    Args:
        element: Elemento BeautifulSoup
        
    Returns:
        str: Texto extraído y limpio
    """
    if not element:
        return ""
    
    text_parts = []
    
    def process_node(node):
        if isinstance(node, NavigableString):
            text = str(node)
            if text:
                text_parts.append(text)
        else:
            for child in node.children:
                process_node(child)
    
    process_node(element)
    
    # Unir las partes de texto y limpiar
    text = ''.join(text_parts)

    # Limpiar espacios múltiples y caracteres extraños
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    
    return text


def extract_content_from_html(file_path):
    """
    Extrae el contenido textual de un archivo HTML de StudoCu.
    
    Args:
        file_path (str): Ruta al archivo HTML
        
    Returns:
        list: Lista de strings con el contenido de cada página
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            html_content = file.read()
    except UnicodeDecodeError:
        # Intentar con otras codificaciones si UTF-8 falla
        try:
            with open(file_path, 'r', encoding='latin1') as file:
                html_content = file.read()
        except Exception as e:
            print(f"Error al leer el archivo {file_path}: {e}")
            return []
    
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Buscar el contenedor principal
    page_container = soup.find('div', {'id': 'page-container'})

    if not page_container:
        print(f"No se encontró el contenedor principal en {file_path}")
        return []
    
    pages_content = []
    
    # Buscar todos los divs con clase "page-content"
    page_contents = page_container.find_all('div', class_='page-content')
    
    for i, page_content in enumerate(page_contents):
        print(f"Procesando página {i}...")
        
        page_text = []
        
        # Buscar todos los divs con clase "t" que contienen texto
        text_divs = page_content.find_all('div', class_='t')
        
        for div in text_divs:
            text = extract_text_from_element(div)
            if text and text.strip():
                # Agregar salto de línea si no es solo espacios
                if text.strip() != '':
                    page_text.append(text)
        
        if page_text:
            pages_content.append('\n'.join(page_text))
    
    return pages_content


def create_pdf_from_text(text_content, output_path, title="Documento Extraído"):
    """
    Crea un archivo PDF a partir del contenido de texto extraído.
    
    Args:
        text_content (list): Lista de strings con el contenido de cada página
        output_path (str): Ruta donde guardar el PDF
        title (str): Título del documento
    """
    # Crear el documento PDF
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=72,
        leftMargin=72,
        topMargin=72,
        bottomMargin=18
    )
    
    # Obtener estilos
    styles = getSampleStyleSheet()
    
    # Crear estilos personalizados
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=16,
        spaceAfter=30,
        alignment=TA_CENTER
    )
    
    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=11,
        spaceAfter=12,
        alignment=TA_JUSTIFY
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=14,
        spaceAfter=20,
        spaceBefore=20
    )
    
    # Construir el contenido del PDF
    story = []
    
    # Agregar título
    story.append(Paragraph(title, title_style))
    story.append(Spacer(1, 20))
    
    # Procesar cada página
    for i, page_content in enumerate(text_content):
        if i > 0:
            story.append(Spacer(1, 20))
            story.append(Paragraph(f"--- Página {i + 1} ---", heading_style))
        
        # Dividir el contenido en párrafos
        paragraphs = page_content.split('\n')
        
        for paragraph in paragraphs:
            paragraph = paragraph.strip()
            if paragraph:
                # Detectar si es un título (texto en mayúsculas o que empiece con números/letras seguidas de :)
                if (paragraph.isupper() and len(paragraph) < 100) or \
                   re.match(r'^(SECTION|Situation|Instructions?|Question)', paragraph, re.IGNORECASE):
                    story.append(Paragraph(paragraph, heading_style))
                else:
                    story.append(Paragraph(paragraph, normal_style))
                
                story.append(Spacer(1, 6))
    
    # Generar el PDF
    try:
        doc.build(story)
        print(f"PDF creado exitosamente: {output_path}")
        return True
    except Exception as e:
        print(f"Error al crear el PDF: {e}")
        return False


def process_html_files(input_dir, output_dir=None):
    """
    Procesa todos los archivos HTML en un directorio y los convierte a PDF.
    
    Args:
        input_dir (str): Directorio que contiene los archivos HTML
        output_dir (str): Directorio donde guardar los PDFs (opcional)
    """
    input_path = Path(input_dir)
    
    if not input_path.exists():
        print(f"El directorio {input_dir} no existe.")
        return
    
    # Establecer directorio de salida
    if output_dir:
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
    else:
        output_path = input_path / 'pdfs'
        output_path.mkdir(exist_ok=True)
    
    # Buscar archivos HTML
    html_files = list(input_path.glob('*.html'))
    
    if not html_files:
        print(f"No se encontraron archivos HTML en {input_dir}")
        return
    
    print(f"Encontrados {len(html_files)} archivos HTML para procesar.")
    
    for html_file in html_files:
        print(f"\nProcesando: {html_file.name}")
        
        # Extraer contenido
        content = extract_content_from_html(str(html_file))
        
        if not content:
            print(f"No se pudo extraer contenido de {html_file.name}")
            continue
        
        # Crear nombre del archivo PDF
        pdf_name = html_file.stem + '.pdf'
        pdf_path = output_path / pdf_name
        
        # Crear título basado en el nombre del archivo
        title = f"Documento - {html_file.stem}"
        
        # Crear PDF
        success = create_pdf_from_text(content, str(pdf_path), title)
        
        if success:
            print(f"✓ Convertido exitosamente: {pdf_name}")
        else:
            print(f"✗ Error al convertir: {html_file.name}")


def main():
    """Función principal del script."""
    print("=== Extractor de HTML a PDF ===")
    print(f"Procesando: {INPUT_PATH}")
    
    input_path = Path(INPUT_PATH)
    
    if input_path.is_file() and input_path.suffix.lower() == '.html':
        # Procesar archivo individual
        print(f"Procesando archivo individual: {input_path.name}")
        
        content = extract_content_from_html(str(input_path))
        
        if not content:
            print("No se pudo extraer contenido del archivo.")
            return
        
        # Determinar ruta de salida
        if OUTPUT_PATH:
            output_path = Path(OUTPUT_PATH)
            if output_path.is_dir():
                pdf_path = output_path / (input_path.stem + '.pdf')
            else:
                pdf_path = output_path
        else:
            pdf_path = input_path.parent / (input_path.stem + '.pdf')
        
        # Crear PDF
        success = create_pdf_from_text(content, str(pdf_path), DOCUMENT_TITLE)
        
        if success:
            print(f"✓ PDF creado exitosamente: {pdf_path}")
        else:
            print("✗ Error al crear el PDF")
            
    elif input_path.is_dir():
        # Procesar directorio
        process_html_files(str(input_path), OUTPUT_PATH)
    else:
        print(f"Error: La ruta '{INPUT_PATH}' debe ser un archivo HTML válido o un directorio.")
        print("Modifica la variable INPUT_PATH en el código para especificar la ruta correcta.")


if __name__ == "__main__":
    main()
