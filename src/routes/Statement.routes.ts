import { Router } from 'express';
import getStatement from '../controllers/Statement/statement.controller';

const router = Router();

router.get("", getStatement);

export default router;
