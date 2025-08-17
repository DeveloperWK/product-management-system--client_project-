import { Router } from 'express';
import {
  createUsers,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUsers,
} from '../controllers/Users/Users.controller';

const router = Router();

router.post('/register', createUsers);
router.get('', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id', updateUsers);
router.delete('/:id', deleteUser);

export default router;
