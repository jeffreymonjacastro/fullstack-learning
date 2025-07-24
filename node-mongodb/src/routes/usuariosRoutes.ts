import express, { Router } from 'express';
import usuariosController from '@/controllers/usuariosController';
import { verificarToken } from '@/helpers/auth';

const router: Router = express.Router();

router.post('/register', usuariosController.register);
router.post('/login', usuariosController.login);
router.get('/profile', verificarToken, usuariosController.profile);

export default router;
