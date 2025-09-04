import { Request, Response } from 'express';
import { productImageOperations } from '../../DB/ProductsOperation';
import imageUploadService from '../../service/image-upload.service';
import { CreateProductImageRequest, UpdateProductImageRequest } from '../../type';

const getAllProductImages = async (_req: Request, res: Response) => {
  try {
    const images = await productImageOperations.getByProductId(0); // Simplified - get all
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product images" });
  }
};

const getProductImagesByProductId = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const images = await productImageOperations.getByProductId(productId);
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product images" });
  }
};

const getProductImageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const image = await productImageOperations.getById(id);

    if (!image) {
      return res.status(404).json({ error: "Product image not found" });
    }

    res.status(200).json({ image });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product image" });
  }
};

const createProductImage = async (
  req: Request<{}, {}, CreateProductImageRequest>,
  res: Response
) => {
  try {
    const { productId } = req.body;
    const file = req.file;
    if (file) {
      const fileUrl = await imageUploadService(file);
      if (!fileUrl) {
        return res.status(400).json({ error: "URL is required" });
      }
      const image = await productImageOperations.create(fileUrl, productId);
      res.status(201).json({ image });
    } else {
      res.status(500).json({
        message: "Something went wrong on image upload",
      });
    }
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(500).json({ error: "Failed to create product image" });
  }
};

const updateProductImage = async (
  req: Request<{ id: string }, {}, UpdateProductImageRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const file = req.file;
    if (file) {
      const fileUrl = await imageUploadService(file);
      if (!fileUrl) {
        return res.status(400).json({ error: "URL is required" });
      }

      await productImageOperations.update(id, fileUrl);
      res.status(200).json({ msg: "Update Successful" });
    } else {
      res.status(500).json({
        message: "Something went wrong on image upload",
      });
    }
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Product image not found" });
    }
    res.status(500).json({ error: "Failed to update product image" });
  }
};

const deleteProductImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await productImageOperations.delete(id);
    res.status(200).json({
      msg: "Delete Successful",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Product image not found" });
    }
    res.status(500).json({ error: "Failed to delete product image" });
  }
};

interface BulkUpdateImagesRequest {
  urls: string[];
}

const replaceProductImages = async (
  req: Request<{ productId: string }, {}, BulkUpdateImagesRequest>,
  res: Response
) => {
  try {
    const { productId } = req.params;
    const files = req.files;

    if (!Array.isArray(files)) {
      return res.status(400).json({ error: "URLs must be an array" });
    }

    if (files.length === 0) {
      // If empty array, delete all images
      await productImageOperations.deleteAllForProduct(productId);
      return res.status(200).json({
        message: "Delete Successful",
      });
    }
    const uploadResults = await Promise.all(
      files.map((file) => imageUploadService(file))
    );
    // Validate URLs
    const invalidUrls = uploadResults.filter((url) => typeof url !== "string");
    if (invalidUrls.length > 0) {
      return res
        .status(400)
        .json({ error: "All URLs must be non-empty strings" });
    }

    // Replace all images for this product
      await productImageOperations.replaceForProduct(
      productId,
      uploadResults
    );
    res.status(200).json({ msg: "Update Successful" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(500).json({ error: "Failed to replace product images" });
  }
};

const addProductImages = async (
  req: Request<{ productId: string }, {}, BulkUpdateImagesRequest>,
  res: Response
) => {
  try {
    const { productId } = req.params;
    const files = req.files;

    if (!Array.isArray(files) || files.length === 0) {
      return res
        .status(400)
        .json({ error: "URLs array is required and cannot be empty" });
    }
    const uploadResults = await Promise.all(
      files.map((file) => imageUploadService(file))
    );
    // Validate URLs
    const invalidUrls = uploadResults.filter((url) => typeof url !== "string");
    if (invalidUrls.length > 0) {
      return res
        .status(400)
        .json({ error: "All URLs must be non-empty strings" });
    }

    // Add new images to this product
    const newImages = await productImageOperations.addForProduct(
      productId,
      uploadResults
    );
    res.status(201).json({ newImages });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(500).json({ error: "Failed to add product images" });
  }
};

const upsertProductImages = async (
  req: Request<{ productId: string }, {}, BulkUpdateImagesRequest>,
  res: Response
) => {
  try {
    const { productId } = req.params;
    const files = req.files;

    if (!Array.isArray(files)) {
      return res.status(400).json({ error: "URLs must be an array" });
    }

    if (files.length === 0) {
      // If empty array, delete all images
      await productImageOperations.deleteAllForProduct(productId);
      return res.status(204).send();
    }
    const uploadResults = await Promise.all(
      files.map((file) => imageUploadService(file))
    );
    // Validate URLs
    const invalidUrls = uploadResults.filter((url) => typeof url !== "string");
    if (invalidUrls.length > 0) {
      return res
        .status(400)
        .json({ error: "All URLs must be non-empty strings" });
    }

    // Upsert images for this product
     await productImageOperations.upsertForProduct(
      productId,
      uploadResults
    );
    res.status(200).json({ msg: "Update Successful" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(500).json({ error: "Failed to upsert product images" });
  }
};

interface BatchDeleteRequest {
  ids: string[];
}

const deleteProductImagesBatch = async (
  req: Request<{}, {}, BatchDeleteRequest>,
  res: Response
) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ error: "IDs array is required and cannot be empty" });
    }

    // Delete multiple images
    await productImageOperations.deleteBatch(ids);
    res.status(200).json({
      msg: "Batch Delete Successful",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product images" });
  }
};

// ==================== UTILITY OPERATIONS ====================
const getProductImagesByProductIds = async (req: Request, res: Response) => {
  try {
    const { productIds } = req.body;

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ error: "Product IDs array is required" });
    }

    // Validate product IDs
    const invalidIds = productIds.filter((id) => typeof id !== "string");
    if (invalidIds.length > 0) {
      return res
        .status(400)
        .json({ error: "All product IDs must be positive integers" });
    }

    const images = await productImageOperations.getByProductIds(productIds);
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product images" });
  }
};
export {
  addProductImages,
  createProductImage,
  deleteProductImage,
  deleteProductImagesBatch,
  getAllProductImages,
  getProductImageById,
  getProductImagesByProductId,
  getProductImagesByProductIds,
  replaceProductImages,
  updateProductImage,
  upsertProductImages,
};
