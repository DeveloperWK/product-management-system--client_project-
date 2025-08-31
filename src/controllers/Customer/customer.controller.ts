import { Request, Response } from "express";
import customer from "../../DB/Customer";
import { hashPassword } from "../../service/password.service";

const createCustomer = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      city,
      zip,
      country,
    } = req.body;

    if (!firstName || !email || !password || !address || !city || !zip) {
      return res.status(400).json({ message: "All field required" });
    }

    const hashedPassword = await hashPassword(password);
    const data = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      address,
      city,
      zip,
      country,
    };

    await customer.create({ data });
    res.status(201).json({ message: "Customer Created" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
const getAllCustomer = async (req: Request, res: Response) => {
  try {
    const customers = await customer.getAll();
    res.status(200).json({ customers });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const getCustomer = await customer.getById(id);
    res.status(200).json({ customer: getCustomer });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await customer.delete(id);
    res.status(200).json({ message: "Customer Deleted" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      password,
      phone,
      address,
      city,
      zip,
      country,
    } = req.body;
    const data = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(password && { password: await hashPassword(password) }),
      ...(phone && { phone }),
      ...(address && { address }),
      ...(city && { city }),
      ...(zip && { zip }),
      ...(country && { country }),
    };
    await customer.update(id, { data });
    res.status(200).json({ message: "Customer Updated" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
export {
  createCustomer,
  deleteCustomer,
  getAllCustomer,
  getCustomerById,
  updateCustomer,
};
