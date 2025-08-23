import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomer,
  getCustomerById,
  updateCustomer,
} from "../controllers/Customer/customer.controller";

const router = Router();

router
  .post("", createCustomer)
  .get("", getAllCustomer)
  .get("/:id", getCustomerById)
  .patch("/:id", updateCustomer)
  .delete("/:id", deleteCustomer);

export default router;
