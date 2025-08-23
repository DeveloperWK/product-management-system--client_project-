import { Router } from "express";
import {
  createUsers,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUsers,
} from "../controllers/Users/Users.controller";

const router = Router();

router
  .post("/register", createUsers)
  .get("", getAllUsers)
  .get("/:id", getUserById)
  .patch("/:id", updateUsers)
  .delete("/:id", deleteUser);

export default router;
