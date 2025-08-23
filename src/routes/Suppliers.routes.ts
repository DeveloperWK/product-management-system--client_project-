import { Router } from "express";
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
} from "../controllers/Purchase/Supplier.controller";

const router = Router();

router
  .post("", createSupplier)
  .get("", getAllSuppliers)
  .get("/:id", getSupplierById)
  .patch("/:id", updateSupplier)
  .delete("/:id", deleteSupplier);

export default router;
