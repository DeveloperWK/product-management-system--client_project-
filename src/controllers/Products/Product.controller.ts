import { Request, Response } from 'express';
import { productOperations } from '../../DB/ProductsOperation';
import { CreateProductRequest, UpdateProductRequest } from '../../type';

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const includeRelations = req.query.includeRelations !== 'false';
    const products = await productOperations.getAll(includeRelations);
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productOperations.getById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};
const getActiveProducts = async (req: Request, res: Response) => {
  try {

    const product = await productOperations.getAllActiveProducts();

    if (!product) {
      return res.status(404).json({ error: 'Active Products not found' });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};




const getProductBySku = async (req: Request, res: Response) => {
  try {
    const { sku } = req.params;
    const product = await productOperations.getBySku(sku);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

const searchProducts = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const products = await productOperations.searchByName(q);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to search products' });
  }
};

const createProduct = async (
  req: Request<{}, {}, CreateProductRequest>,
  res: Response,
) => {
  try {
    const data = req.body;

    if (!data.name || !data.storeId || !data.warehouseId) {
      return res.status(400).json({
        error: 'Name, storeId, and warehouseId are required',
      });
    }

    const product = await productOperations.create(data);
    res.status(201).json({ product });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res
        .status(409)
        .json({ error: 'Product with this SKU/Slug/ItemCode already exists' });
    }
    console.log(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

const updateProduct = async (
  req: Request<{ id: string }, {}, UpdateProductRequest>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const product = await productOperations.update(id, data);
    res.status(200).json({ msg: 'Update Successful' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (error.code === 'P2002') {
      return res
        .status(409)
        .json({ error: 'Product with this Slug/ItemCode already exists' });
    }
    res.status(500).json({ error: 'Failed to update product' });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await productOperations.delete(id);
    res.status(200).json({
      message: 'Delete Successful',
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
export {
  createProduct,
  deleteProduct,
  getAllProducts,
  getActiveProducts,
  getProductById,
  getProductBySku,
  updateProduct,

};
