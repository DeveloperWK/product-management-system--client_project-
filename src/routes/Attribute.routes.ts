import { Router } from "express";
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
} from "../controllers/Products/Attribute.controller";

const router = Router();

// Attribute routes
router
  .get("/", getAllAttributes)
  .get("/values", getAllAttributeValues)
  .get("/:id", getAttributeById)
  .get("/name/:name", getAttributeByName)
  .post("/", createAttribute)
  .put("/:id", updateAttribute)
  .delete("/:id", deleteAttribute);

// AttributeValue routes
router
  .get("/values/:id", getAttributeValueById)
  .post("/values", createAttributeValue)
  .patch("/values/:id", updateAttributeValue)
  .delete("/values/:id", deleteAttributeValue);

export default router;
