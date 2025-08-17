import { Router } from 'express';
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
} from '../controllers/Products/Brand.controller';

const router = Router();

router.post('', createBrand);
router.get('', getAllBrands);
router.get('/:id', getBrandById);
router.patch('/:id', updateBrand);
router.delete('/:id', deleteBrand);

export default router;
