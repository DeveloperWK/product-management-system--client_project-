import { Request, Response } from 'express';
import {
  createSupplier as createSupplierDb,
  deleteSupplierDb,
  getAllSuppliersDB,
  getSupplierByIdDB,
  updateSupplier as updateSupplierDb,
} from '../../DB/Supplier';

const createSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !phone) {
      res.status(400).json({
        message: "All Field Required",
      });
    }

    const supplier = await createSupplierDb({ name, email, phone });
    if (supplier) {
      res.status(201).json({
        message: "supplier Created",
      });
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: err.code,
    });
  }
};
const updateSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, phone, email } = req.body;
    const supplier = await updateSupplierDb(id, name, phone, email);
    if (supplier) {
      res.status(200).json({
        message: "supplier Updated",
      });
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: err.meta.cause,
    });
  }
};

const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteSupplierDb(id);

    res.status(200).json({
      message: "supplier deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({ error: err.meta.cause });
  }
};
const getAllSuppliers = async (_req: Request, res: Response) => {
  try {
    const suppliers = await getAllSuppliersDB();
    res.status(200).json({
      success: true,
      count: suppliers.length,
      suppliers: suppliers,
    });
  } catch (err) {
    console.error("Error fetching suppliers:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getSupplierById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const supplier = await getSupplierByIdDB({ id: id });
    if (!supplier) {
      return res.status(404).json({ error: "supplier not found" });
    }

    res.status(200).json({
      success: true,
      supplier,
    });
  } catch (err: any) {
    console.error(err);
    res.status(404).json({ error: err.message });
  }
};
export {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
};
