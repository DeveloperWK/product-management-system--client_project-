import { Router } from 'express';
import { login } from '../controllers/Users/auth.controller';

const router = Router();

router.post('/login', login);

export default router;
