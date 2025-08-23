import { Router } from "express";
import {
  createWarehouse,
  deleteWarehouse,
  getAllWarehouses,
  getWarehouseById,
  updateWarehouse,
} from "../controllers/Products/Warehouse.controller";

const router = Router();

router
  .post("", createWarehouse)
  .get("", getAllWarehouses)
  .get("/:id", getWarehouseById)
  .put("/:id", updateWarehouse)
  .delete("/:id", deleteWarehouse);

export default router;
