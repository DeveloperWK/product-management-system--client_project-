import { Router } from "express";

import {
  createWarranty,
  deleteWarranty,
  getAllWarranties,
  getWarrantyById,
  updateWarranty,
} from "../controllers/Purchase/Warranties.controller";

const router = Router();
router
  .post("", createWarranty)
  .get("", getAllWarranties)
  .get("/:id", getWarrantyById)
  .patch("/:id", updateWarranty)
  .delete("/:id", deleteWarranty);

export default router;
