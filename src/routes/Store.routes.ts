import { Router } from "express";
import {
  createStore,
  deleteStore,
  getAllStores,
  getStoreById,
  updateStore,
} from "../controllers/Products/Store.controller";

const router = Router();

router
  .post("", createStore)
  .get("", getAllStores)
  .get("/:id", getStoreById)
  .put("/:id", updateStore)
  .delete("/:id", deleteStore);

export default router;
