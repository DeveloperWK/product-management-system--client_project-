import { Request, Response } from 'express';
import { categoryOperations, subCategoryOperations, subSubCategoryOperations } from '../../DB/Categories';
import {
  CreateCategoryRequest,
  CreateSubCategoryRequest,
  CreateSubSubCategoryRequest,
  UpdateCategoryRequest,
  UpdateSubCategoryRequest,
  UpdateSubSubCategoryRequest,
} from '../../type';

const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await categoryOperations.getAll();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await categoryOperations.getById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

const getCategoryByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const category = await categoryOperations.getByName(name);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

const createCategory = async (
  req: Request<{}, {}, CreateCategoryRequest>,
  res: Response
) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const category = await categoryOperations.create(name);
    res.status(201).json({ category });
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
};

const updateCategory = async (
  req: Request<{ id: string }, {}, UpdateCategoryRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await categoryOperations.update(id, data);
    res.status(200).json({ msg: "Update Successful" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(500).json({ error: "Failed to update category" });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await categoryOperations.delete(id);
    res.status(200).json({
      message: "Delete Successful",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(500).json({ error: "Failed to delete category" });
  }
};

const getAllSubCategories = async (_req: Request, res: Response) => {
  try {
    const subCategories = await subCategoryOperations.getAll();
    res.status(200).json({ subCategories });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
};

const getSubCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subCategory = await subCategoryOperations.getById(id);

    if (!subCategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    res.status(200).json({ subCategory });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategory" });
  }
};

const createSubCategory = async (
  req: Request<{}, {}, CreateSubCategoryRequest>,
  res: Response
) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res
        .status(400)
        .json({ error: "Name and categoryId are required" });
    }

    const subCategory = await subCategoryOperations.create(name, categoryId);
    res.status(201).json({ subCategory });
  } catch (error) {
    res.status(500).json({ error: "Failed to create subcategory" });
  }
};

const updateSubCategory = async (
  req: Request<{ id: string }, {}, UpdateSubCategoryRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await subCategoryOperations.update(id, data);
    res.status(200).json({ msg: "Update Successful" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Subcategory not found" });
    }
    res.status(500).json({ error: "Failed to update subcategory" });
  }
};

const deleteSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await subCategoryOperations.delete(id);
    res.status(200).json({
      message: "Delete Successful",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Subcategory not found" });
    }
    res.status(500).json({ error: "Failed to delete subcategory" });
  }
};

const getAllSubSubCategories = async (_req: Request, res: Response) => {
  try {
    const subSubCategories = await subSubCategoryOperations.getAll();
    res.status(200).json({ subSubCategories });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subSubcategories" });
  }
};

const getSubSubCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subSubCategory = await subSubCategoryOperations.getById(id);

    if (!subSubCategory) {
      return res.status(404).json({ error: "SubSubcategory not found" });
    }

    res.status(200).json({ subSubCategory });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch SubSubcategory" });
  }
};

const createSubSubCategory = async (
  req: Request<{}, {}, CreateSubSubCategoryRequest>,
  res: Response
) => {
  try {
    const { name, subCategoryId } = req.body;

    if (!name || !subCategoryId) {
      return res
        .status(400)
        .json({ error: "Name and subCategoryId are required" });
    }

    const subSubCategory = await subSubCategoryOperations.create(
      name,
      subCategoryId
    );
    res.status(201).json({ subSubCategory });
  } catch (error) {
    res.status(500).json({ error: "Failed to create SubSubcategory" });
  }
};

const updateSubSubCategory = async (
  req: Request<{ id: string }, {}, UpdateSubSubCategoryRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await subSubCategoryOperations.update(id, data);
    res.status(200).json({ msg: "Update Successful" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "SubSubcategory not found" });
    }
    res.status(500).json({ error: "Failed to update SubSubcategory" });
  }
};

const deleteSubSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await subSubCategoryOperations.delete(id);
    res.status(200).json({
      message: "Delete Successful",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "SubSubcategory not found" });
    }
    res.status(500).json({ error: "Failed to delete SubSubcategory" });
  }
};
export {
  createCategory,
  createSubCategory,
  createSubSubCategory,
  deleteCategory,
  deleteSubCategory,
  deleteSubSubCategory,
  getAllCategories,
  getAllSubCategories,
  getAllSubSubCategories,
  getCategoryById,
  getCategoryByName,
  getSubCategoryById,
  getSubSubCategoryById,
  updateCategory,
  updateSubCategory,
  updateSubSubCategory,
};
