import { Router } from 'express';
import {
  createAttribute,
  createAttributeValue,
  deleteAttribute,
  deleteAttributeValue,
  getAllAttributes,
  getAllAttributeValues,
  getAttributeById,
  getAttributeByName,
  getAttributeValueById,
  updateAttribute,
  updateAttributeValue,
} from '../controllers/Products/Attribute.controller';

const router = Router();

// Attribute routes
router.get('/', getAllAttributes);
router.get('/values', getAllAttributeValues);
router.get('/:id', getAttributeById);
router.get('/name/:name', getAttributeByName);
router.post('/', createAttribute);
router.put('/:id', updateAttribute);
router.delete('/:id', deleteAttribute);

// AttributeValue routes
router.get('/values/:id', getAttributeValueById);
router.post('/values', createAttributeValue);
router.patch('/values/:id', updateAttributeValue);
router.delete('/values/:id', deleteAttributeValue);

export default router;
