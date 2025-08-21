import { Router } from 'express';
import {
  createCategory,
  createSubCategory,
  createSubSubCategory,
  deleteCategory,
  deleteSubCategory,
  deleteSubSubCategory,
  getAllCategories,
  getAllSubCategories,
  getAllSubSubCategories,
  getCategoryById,
  getCategoryByName,
  getSubCategoryById,
  getSubSubCategoryById,
  updateCategory,
  updateSubCategory,
  updateSubSubCategory,
} from '../controllers/Products/Category.controller';

const router = Router();

router.post('', createCategory);
router.post('/sub-categories', createSubCategory);
router.post('/sub-sub-categories', createSubSubCategory);

router.get('', getAllCategories);
router.get('/sub-categories', getAllSubCategories);
router.get('/sub-sub-categories', getAllSubSubCategories);
router.get('/:id', getCategoryById);
router.get('/name/:name', getCategoryByName);
router.get('/sub-categories/:id', getSubCategoryById);
router.get('/sub-sub-categories/:id', getSubSubCategoryById);

router.put('/:id', updateCategory);
router.patch('/sub-categories/:id', updateSubCategory);
router.patch('/sub-sub-categories/:id', updateSubSubCategory);

router.delete('/:id', deleteCategory);
router.delete('/sub-categories/:id', deleteSubCategory);
router.delete('/sub-sub-categories/:id', deleteSubSubCategory);

export default router;
