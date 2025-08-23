import { Router } from "express";
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
} from "../controllers/Products/Category.controller";

const router = Router();

router
  .post("", createCategory)
  .post("/sub-categories", createSubCategory)
  .post("/sub-sub-categories", createSubSubCategory);

router
  .get("", getAllCategories)
  .get("/sub-categories", getAllSubCategories)
  .get("/sub-sub-categories", getAllSubSubCategories)
  .get("/:id", getCategoryById)
  .get("/name/:name", getCategoryByName)
  .get("/sub-categories/:id", getSubCategoryById)
  .get("/sub-sub-categories/:id", getSubSubCategoryById);

router
  .put("/:id", updateCategory)
  .patch("/sub-categories/:id", updateSubCategory)
  .patch("/sub-sub-categories/:id", updateSubSubCategory);

router
  .delete("/:id", deleteCategory)
  .delete("/sub-categories/:id", deleteSubCategory)
  .delete("/sub-sub-categories/:id", deleteSubSubCategory);

export default router;
