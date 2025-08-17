import { Request, Response } from 'express';
import brandOperations from '../../DB/Brand';
import { CreateBrandRequest, UpdateBrandRequest } from '../../type';

const getAllBrands = async (req: Request, res: Response) => {
  try {
    const brands = await brandOperations.getAll();
    res.status(200).json({ brands });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
};

const getBrandById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const brand = await brandOperations.getById(id);

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    res.status(200).json({ brand });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch brand' });
  }
};

const createBrand = async (
  req: Request<{}, {}, CreateBrandRequest>,
  res: Response,
) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const brand = await brandOperations.create(name);
    res.status(201).json({ brand });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create brand' });
  }
};

const updateBrand = async (
  req: Request<{ id: string }, {}, UpdateBrandRequest>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const brand = await brandOperations.update(id, data);
    res.status(200).json({ brand });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Brand not found' });
    }
    res.status(500).json({ error: 'Failed to update brand' });
  }
};
const deleteBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await brandOperations.delete(id);
    res.status(200).json({
      message: 'Delete Successful',
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Store not found' });
    }
    res.status(500).json({ error: 'Failed to delete store' });
  }
};
export { createBrand, deleteBrand, getAllBrands, getBrandById, updateBrand };
