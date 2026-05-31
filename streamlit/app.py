import streamlit as st
import pandas as pd

# Título de la app
st.title("Mi primera app con Streamlit")

# Widget interactivo
nombre = st.text_input("¿Cómo te llamas?")
if nombre:
    st.write(f"¡Hola {nombre}!")


# Gráfico simple
data = pd.DataFrame({
    'x': [1, 2, 3, 4],
    'y': [1, 4, 2, 3]
})
st.line_chart(data)
