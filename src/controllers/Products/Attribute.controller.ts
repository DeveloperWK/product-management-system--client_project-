import { Request, Response } from 'express';
import {
  attributeOperations,
  attributeValueOperations,
} from '../../DB/Attribute';
import {
  CreateAttributeRequest,
  CreateAttributeValueRequest,
  UpdateAttributeRequest,
  UpdateAttributeValueRequest,
} from '../../type';

export const getAllAttributes = async (req: Request, res: Response) => {
  try {
    const attributes = await attributeOperations.getAll();
    res.status(200).json({ attributes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attributes' });
  }
};

export const getAttributeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const attribute = await attributeOperations.getById(id);

    if (!attribute) {
      return res.status(404).json({ error: 'Attribute not found' });
    }

    res.status(200).json({ attribute });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attribute' });
  }
};

export const getAttributeByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const attribute = await attributeOperations.getByName(name);

    if (!attribute) {
      return res.status(404).json({ error: 'Attribute not found' });
    }

    res.status(200).json({ attribute });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attribute' });
  }
};

export const createAttribute = async (
  req: Request<{}, {}, CreateAttributeRequest>,
  res: Response,
) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const attribute = await attributeOperations.create(name);
    res.status(201).json(attribute);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create attribute' });
  }
};

export const updateAttribute = async (
  req: Request<{ id: string }, {}, UpdateAttributeRequest>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const attribute = await attributeOperations.update(id, data);
    res.status(200).json({ attribute });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Attribute not found' });
    }
    res.status(500).json({ error: 'Failed to update attribute' });
  }
};

export const deleteAttribute = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await attributeOperations.delete(id);
    res.status(204).json({
      message: 'Delete successful',
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Attribute not found' });
    }
    res.status(500).json({ error: 'Failed to delete attribute' });
  }
};

export const getAllAttributeValues = async (req: Request, res: Response) => {
  try {
    const attributeValues = await attributeValueOperations.getAll();
    res.status(200).json({ attributeValues });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attribute values' });
  }
};

export const getAttributeValueById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const attributeValue = await attributeValueOperations.getById(id);

    if (!attributeValue) {
      return res.status(404).json({ error: 'Attribute value not found' });
    }

    res.status(200).json({ attributeValue });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attribute value' });
  }
};

export const createAttributeValue = async (
  req: Request<{}, {}, CreateAttributeValueRequest>,
  res: Response,
) => {
  try {
    const { value, attributeId } = req.body;

    if (!value || !attributeId) {
      return res
        .status(400)
        .json({ error: 'Value and attributeId are required' });
    }

    const attributeValue = await attributeValueOperations.create(
      value,
      attributeId,
    );
    res.status(201).json({ attributeValue });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create attribute value' });
  }
};

export const updateAttributeValue = async (
  req: Request<{ id: string }, {}, UpdateAttributeValueRequest>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const attributeValue = await attributeValueOperations.update(id, data);
    res.status(200).json({ attributeValue });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Attribute value not found' });
    }
    res.status(500).json({ error: 'Failed to update attribute value' });
  }
};

export const deleteAttributeValue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await attributeValueOperations.delete(id);
    res.status(204).json({
      message: 'Delete successful',
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Attribute value not found' });
    }
    res.status(500).json({ error: 'Failed to delete attribute value' });
  }
};
