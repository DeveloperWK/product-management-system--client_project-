import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
} from "../controllers/Products/Brand.controller";

const router = Router();

router
  .post("", createBrand)
  .get("", getAllBrands)
  .get("/:id", getBrandById)
  .put("/:id", updateBrand)
  .delete("/:id", deleteBrand);

export default router;
