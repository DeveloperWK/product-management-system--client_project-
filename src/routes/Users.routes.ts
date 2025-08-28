import { Router } from "express";
import {
  createUsers,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUsers,
} from "../controllers/Users/Users.controller";
import checkUserAuthToken from "../middleware/checkUserAuthToken";
import verifyUserAccessToken from "../middleware/verifyUserAccessToken";

const router = Router();

router
  .post("/register", createUsers)
  .get("", checkUserAuthToken, verifyUserAccessToken, getAllUsers)
  .get("/:id", getUserById)
  .patch("/:id", checkUserAuthToken, verifyUserAccessToken, updateUsers)
  .delete("/:id", checkUserAuthToken, verifyUserAccessToken, deleteUser);

export default router;
