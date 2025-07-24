# API REST con Node.js, Express, MongoDB y TypeScript

Una API REST completa desarrollada con TypeScript, Express.js y MongoDB para la gestión de mascotas.

## 🚀 Características

- ✅ **TypeScript** - Tipado estático para mejor desarrollo
- ✅ **Express.js** - Framework web rápido y minimalista
- ✅ **MongoDB** - Base de datos NoSQL
- ✅ **Arquitectura MVC** - Separación clara de responsabilidades
- ✅ **Validación de datos** - Validación robusta de entrada
- ✅ **Manejo de errores** - Gestión centralizada de errores
- ✅ **Variables de entorno** - Configuración flexible

## 📁 Estructura del proyecto

```
src/
├── controllers/     # Controladores de la aplicación
├── models/         # Modelos de datos y operaciones CRUD
├── routes/         # Definición de rutas
├── helpers/        # Utilidades y helpers
├── types/          # Definiciones de tipos TypeScript
└── app.ts          # Punto de entrada de la aplicación
```

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd node-mongodb
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` con tus configuraciones:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017
   DB_NAME=mascotas_db
   NODE_ENV=development
   ```

4. **Asegurar que MongoDB esté ejecutándose**
   - Instala MongoDB localmente o usa MongoDB Atlas
   - Asegúrate de que el servicio esté activo

## 🚦 Scripts disponibles

```bash
# Desarrollo con hot reload
npm run dev

# Desarrollo con watch en archivos
npm run dev:watch

# Compilar TypeScript
npm run build

# Ejecutar en producción
npm start

# Limpiar archivos compilados
npm run clean
```

## 📚 API Endpoints

### Mascotas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/mascotas` | Obtener todas las mascotas |
| POST | `/api/mascotas` | Crear una nueva mascota |
| GET | `/api/mascotas/:id` | Obtener mascota por ID |
| PUT | `/api/mascotas/:id` | Actualizar mascota |
| DELETE | `/api/mascotas/:id` | Eliminar mascota |

### Ejemplos de uso

**Crear una mascota:**
```bash
curl -X POST http://localhost:3000/api/mascotas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Firulais",
    "especie": "Perro",
    "raza": "Golden Retriever",
    "edad": 3,
    "peso": 25.5,
    "propietario": "Juan Pérez"
  }'
```

**Obtener todas las mascotas:**
```bash
curl http://localhost:3000/api/mascotas
```

## 🏗️ Modelo de datos

### Mascota
```typescript
interface Mascota {
  _id?: ObjectId;
  nombre: string;
  especie: string;
  raza?: string;
  edad?: number;
  peso?: number;
  propietario?: string;
  descripcion?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

## 🔧 Tecnologías utilizadas

- **Node.js** - Runtime de JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **ts-node** - Ejecutor de TypeScript para desarrollo
- **nodemon** - Monitor de archivos para desarrollo

## 📝 Próximas mejoras

- [ ] Autenticación JWT
- [ ] Validación con Joi o Zod
- [ ] Tests unitarios y de integración
- [ ] Documentación con Swagger
- [ ] Middleware de logging
- [ ] Rate limiting
- [ ] Paginación de resultados

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.