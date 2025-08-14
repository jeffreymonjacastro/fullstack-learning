"""
Script para crear un icono personalizado para la aplicación Pomodoro
"""
from PIL import Image, ImageDraw, ImageFont
import os

def create_pomodoro_icon():
    # Crear imagen de 256x256 (recomendado para iconos Windows)
    size = 256
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Colores del tema Pomodoro
    bg_color = '#2c3e50'  # Azul oscuro del tema
    tomato_color = '#e74c3c'  # Rojo tomate
    text_color = 'white'
    
    # Dibujar fondo circular
    margin = 20
    draw.ellipse([margin, margin, size-margin, size-margin], 
                fill=bg_color, outline=tomato_color, width=8)
    
    # Dibujar tomate estilizado (círculo rojo)
    tomato_margin = 60
    draw.ellipse([tomato_margin, tomato_margin, size-tomato_margin, size-tomato_margin], 
                fill=tomato_color)
    
    # Dibujar hoja del tomate (rectángulo verde pequeño)
    leaf_color = '#27ae60'  # Verde
    leaf_width = 30
    leaf_height = 20
    leaf_x = size//2 - leaf_width//2
    leaf_y = tomato_margin - 10
    draw.ellipse([leaf_x, leaf_y, leaf_x + leaf_width, leaf_y + leaf_height], 
                fill=leaf_color)
    
    # Agregar texto "P" en el centro
    try:
        # Intentar usar una fuente del sistema
        font_size = 80
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        # Fallback a fuente por defecto
        font = ImageFont.load_default()
    
    # Calcular posición centrada para el texto
    bbox = draw.textbbox((0, 0), "P", font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    text_x = (size - text_width) // 2
    text_y = (size - text_height) // 2 - 10  # Ajuste visual
    
    # Dibujar texto con sombra
    shadow_offset = 3
    draw.text((text_x + shadow_offset, text_y + shadow_offset), "P", 
              font=font, fill='black')
    draw.text((text_x, text_y), "P", font=font, fill=text_color)
    
    # Guardar como ICO (formato de icono de Windows)
    icon_path = 'pomodoro_icon.ico'
    
    # Crear múltiples tamaños para mejor compatibilidad
    sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    images = []
    
    for size_tuple in sizes:
        resized = img.resize(size_tuple, Image.Resampling.LANCZOS)
        images.append(resized)
    
    # Guardar como archivo ICO con múltiples resoluciones
    images[0].save(icon_path, format='ICO', sizes=[img.size for img in images])
    
    print(f"✅ Icono creado: {icon_path}")
    return icon_path

if __name__ == "__main__":
    try:
        create_pomodoro_icon()
        print("🍅 Icono del Pomodoro Timer creado exitosamente!")
    except Exception as e:
        print(f"❌ Error creando icono: {e}")
        print("💡 Instala Pillow: pip install Pillow")
