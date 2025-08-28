import { Request, Response } from "express";
import warehouseOperations from "../../DB/Warehouse";
import { CreateWarehouseRequest, UpdateWarehouseRequest } from "../../type";

const getAllWarehouses = async (req: Request, res: Response) => {
  try {
    const warehouses = await warehouseOperations.getAll();
    res.status(200).json({ warehouses });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch warehouses" });
  }
};

const getWarehouseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const warehouse = await warehouseOperations.getById(id);

    if (!warehouse) {
      return res.status(404).json({ error: "Warehouse not found" });
    }

    res.status(200).json({ warehouse });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch warehouse" });
  }
};

const createWarehouse = async (
  req: Request<{}, {}, CreateWarehouseRequest>,
  res: Response
) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const warehouse = await warehouseOperations.create(name);
    res.status(201).json({ warehouse });
  } catch (error) {
    res.status(500).json({ error: "Failed to create warehouse" });
  }
};

const updateWarehouse = async (
  req: Request<{ id: string }, {}, UpdateWarehouseRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const warehouse = await warehouseOperations.update(id, data);
    res.status(200).json({ msg: "Update Successful" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Warehouse not found" });
    }
    res.status(500).json({ error: "Failed to update warehouse" });
  }
};

const deleteWarehouse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await warehouseOperations.delete(id);
    res.status(200).json({
      message: "Delete Successful",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Warehouse not found" });
    }
    res.status(500).json({ error: "Failed to delete warehouse" });
  }
};
export {
  createWarehouse,
  deleteWarehouse,
  getAllWarehouses,
  getWarehouseById,
  updateWarehouse,
};
