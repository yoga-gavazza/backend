import { Router } from 'express';
import { authController } from '../controllers';

const router = Router();

router.post('/auth/login', authController.login);

export default router;
