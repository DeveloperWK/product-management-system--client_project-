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

const getAllAttributes = async (req: Request, res: Response) => {
  try {
    const attributes = await attributeOperations.getAll();
    res.status(200).json({ attributes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attributes' });
  }
};

const getAttributeById = async (req: Request, res: Response) => {
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

const getAttributeByName = async (req: Request, res: Response) => {
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

const createAttribute = async (
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

const updateAttribute = async (
  req: Request<{ id: string }, {}, UpdateAttributeRequest>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const attribute = await attributeOperations.update(id, data);
    // res.status(200).json({ attribute });
    res.status(200).json({ msg: 'Update Successful' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Attribute not found' });
    }
    res.status(500).json({ error: 'Failed to update attribute' });
  }
};

const deleteAttribute = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await attributeOperations.delete(id);
    res.status(200).json({
      message: 'Delete successful',
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Attribute not found' });
    }
    res.status(500).json({ error: 'Failed to delete attribute' });
  }
};

const getAllAttributeValues = async (req: Request, res: Response) => {
  try {
    const attributeValues = await attributeValueOperations.getAll();
    res.status(200).json({ attributeValues });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attribute values' });
  }
};

const getAttributeValueById = async (req: Request, res: Response) => {
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

const createAttributeValue = async (
  req: Request<{}, {}, CreateAttributeValueRequest>,
  res: Response,
) => {
  try {
    const { values, attributeId } = req.body;
    console.log(values);
    if (!Array.isArray(values)) {
      return res.status(400).json({ error: 'Values must be an array' });
    }
    if (!values || !attributeId) {
      return res
        .status(400)
        .json({ error: 'Values and attributeId are required' });
    }
    const invalidValue = values.filter((value) => typeof value !== 'string');
    if (invalidValue.length > 0) {
      return res
        .status(400)
        .json({ error: 'All Value must be non-empty strings' });
    }

    const attributeValue = await Promise.all(
      values.map((value) =>
        attributeValueOperations.create(value, attributeId),
      ),
    );
    res.status(201).json({ attributeValue });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create attribute value' });
  }
};

const updateAttributeValue = async (
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

const deleteAttributeValue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await attributeValueOperations.delete(id);
    res.status(200).json({
      message: 'Delete successful',
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Attribute value not found' });
    }
    res.status(500).json({ error: 'Failed to delete attribute value' });
  }
};
export {
  createAttribute,
  createAttributeValue,
  deleteAttribute,
  deleteAttributeValue,
  getAllAttributes,
  getAllAttributeValues,
  getAttributeById,
  getAttributeByName,
  getAttributeValueById,
  updateAttribute,
  updateAttributeValue,
};
