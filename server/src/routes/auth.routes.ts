import { Router } from 'express';
import { login, register, getMe } from '../controllers/auth.controller.js';

const router = Router();

router.post('/auth/login', login);
router.post('/auth/register', register);
router.get('/auth/me', getMe);

export default router;
