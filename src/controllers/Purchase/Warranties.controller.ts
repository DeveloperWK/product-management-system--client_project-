import { Request, Response } from "express";
import warrantiesOperations from "../../DB/Warranties";

const getAllWarranties = async (req: Request, res: Response) => {
  try {
    const warranty = await warrantiesOperations.getAll();
    res.status(200).json({ warranty });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch warranty" });
  }
};

const getWarrantyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const warranty = await warrantiesOperations.getById(id);

    if (!warranty) {
      return res.status(404).json({ error: "warranty not found" });
    }

    res.status(200).json({ warranty });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch warranty" });
  }
};

const createWarranty = async (req: Request, res: Response) => {
  try {
    const { name, days } = req.body;

    if (!name || !days) {
      return res.status(400).json({ error: "All field is required" });
    }

    const warranty = await warrantiesOperations.create({ name, days });
    res.status(201).json({ warranty });
  } catch (error) {
    res.status(500).json({ error: "Failed to create warranty" });
  }
};

const updateWarranty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const warranty = await warrantiesOperations.update(id, data);
    // res.status(200).json({ warranty });
    res.status(200).json({ msg: "Update Successful" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "warranty not found" });
    }
    res.status(500).json({ error: "Failed to update warranty" });
  }
};
const deleteWarranty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await warrantiesOperations.delete(id);
    res.status(200).json({
      message: "Delete Successful",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "warranty not found" });
    }
    res.status(500).json({ error: "Failed to delete warranty" });
  }
};
export {
  createWarranty,
  deleteWarranty,
  getAllWarranties,
  getWarrantyById,
  updateWarranty,
};
