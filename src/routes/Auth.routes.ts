import { Router } from 'express';
import { customerLogin, userLogin } from '../controllers/Users/Auth.controller';

const router = Router();

router.post("/user-login", userLogin);
router.post("/customer-login", customerLogin);

export default router;
