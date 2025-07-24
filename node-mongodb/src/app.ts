import 'dotenv/config';
import express from 'express';
import mascotasRoutes from './routes/mascotasRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import bodyParser from 'body-parser';
import dbClient from './config/dbClient';

// Inicialización de la aplicación Express
const app: express.Application = express();

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Usar las rutas de mascotas
app.use('/pets', mascotasRoutes);
app.use('/users', usuariosRoutes);

try {
  const PORT: string = process.env.PORT || '3000';
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
} catch(e: any) {
  console.error(`Error starting server: ${e.message}`);
}

process.on('SIGINT', async () => {
  await dbClient.closeDB();
  process.exit(0);
});
