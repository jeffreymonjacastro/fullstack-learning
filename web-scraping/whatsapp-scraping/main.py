import re
from collections import Counter
from nltk.corpus import stopwords

import nltk
import numpy as np
import pandas as pd

nltk.download('stopwords')

# Cargar y limpiar el archivo del chat
def load_chat(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        chat_text = f.read()
    return chat_text

# Limpiar el texto y contar las palabras
def word_count(chat_text):
    # Eliminar las líneas que contienen información de fecha, hora y nombre del remitente
    lines = re.sub(r'\d{1,2}/\d{1,2}/\d{2,4}, \d{1,2}:\d{2}\s?[ap]\.?\s?m\.? - ', '', chat_text, flags=re.IGNORECASE)

    # Tokenizar el texto en palabras, ignorando signos de puntuación
    words = re.findall(r'\b\w+\b', lines.lower())

    print(words)
    
    # Contar la frecuencia de cada palabra
    word_counts = Counter(words)
    
    return word_counts

# Función principal
def main():
    file_path = 'test.txt' 
    chat_text = load_chat(file_path)
    word_counts = word_count(chat_text)
    
    # Mostrar las 10 palabras más comunes
    print("Las palabras más comunes son:")
    for word, count in word_counts.most_common(10):
        print(f'{word}: {count}')

if __name__ == '__main__':
    main()
