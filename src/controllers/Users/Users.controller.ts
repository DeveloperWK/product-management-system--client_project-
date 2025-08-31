import { Request, Response } from "express";
import {
  createUser,
  deleteUserDb,
  getAllUsersDB,
  getUserByIdDB,
  updateUser,
} from "../../DB/Users";
import { hashPassword } from "../../service/password.service";

const createUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      res.status(400).json({
        message: "All Field Required",
      });
    }
    const hashedPass = await hashPassword(password);
    const user = await createUser({ name, email, phone, password: hashedPass });
    if (user) {
      res.status(201).json({
        message: "User Created",
      });
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: err.code,
    });
  }
};
const updateUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;

    const user = await updateUser(id, name, phone);
    if (user) {
      res.status(200).json({
        message: "User Updated",
      });
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: err.meta.cause,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteUserDb(id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({ error: err.meta.cause });
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersDB();
    res.status(200).json({
      success: true,
      count: users.length,
      users: users,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await getUserByIdDB({ id: id });
    const { password, ...userWithoutPassword } = user;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (err: any) {
    console.error(err);
    res.status(404).json({ error: err.message });
  }
};
export { createUsers, deleteUser, getAllUsers, getUserById, updateUsers };
