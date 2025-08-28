import { Request, Response } from "express";
import storeOperations from "../../DB/Store";
import { CreateStoreRequest, UpdateStoreRequest } from "../../type";

const getAllStores = async (req: Request, res: Response) => {
  try {
    const stores = await storeOperations.getAll();
    res.status(200).json({
      stores,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stores" });
  }
};

const getStoreById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const store = await storeOperations.getById(id);

    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }

    res.status(200).json({
      store,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch store" });
  }
};

const createStore = async (
  req: Request<{}, {}, CreateStoreRequest>,
  res: Response
) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const store = await storeOperations.create(name);
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ error: "Failed to create store" });
  }
};

const updateStore = async (
  req: Request<{ id: string }, {}, UpdateStoreRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const store = await storeOperations.update(id, data);
    res.status(200).json({ msg: "Update Successful" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Store not found" });
    }
    res.status(500).json({ error: "Failed to update store" });
  }
};

const deleteStore = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await storeOperations.delete(id);
    res.status(200).json({
      message: "Delete Successful",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Store not found" });
    }
    res.status(500).json({ error: "Failed to delete store" });
  }
};
export { createStore, deleteStore, getAllStores, getStoreById, updateStore };
