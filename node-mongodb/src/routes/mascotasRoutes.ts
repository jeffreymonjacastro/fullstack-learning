import express, { Router } from 'express';
import mascotasController from '@/controllers/mascotasController';
import { verificarToken } from '@/helpers/auth';

const router: Router = express.Router();

// Rutas para mascotas
router.get('/', mascotasController.getAll);
router.get('/:id', mascotasController.getOne);
router.post('/', mascotasController.create);
router.put('/:id', verificarToken, mascotasController.update);
router.delete('/:id', verificarToken, mascotasController.delete);

export default router;
