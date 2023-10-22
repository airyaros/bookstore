import { Request, Response } from 'express';
import * as retailerDAL from '../dals/Retailer.dal';
import { IRetailer } from '../models/Retailer';

// Create a new retailer
export const createRetailer = async (req: Request, res: Response): Promise<void> => {
  try {
    const retailerData: IRetailer = req.body;
    const createdRetailer = await retailerDAL.createRetailer(retailerData);
    res.status(201).json({
      data: createdRetailer,
      message: 'Retailer created successfully',
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Something went wrong',
    });
  }
};

// Get a retailer by its ID
export const getRetailerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { retailerId } = req.params;
    const retailer = await retailerDAL.findRetailerById(retailerId);

    if (!retailer) {
      res.status(404).json({ message: 'Retailer not found' });
    } else {
      res.status(200).json({ data: retailer });
    }
  } catch (error) {
    res.status(500).json({ error, message: 'Something went wrong' });
  }
};

// Update a retailer by its ID
export const updateRetailer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { retailerId } = req.params;
    const updatedRetailerData: Partial<IRetailer> = req.body;
    const updatedRetailer = await retailerDAL.updateRetailerById(retailerId, updatedRetailerData);

    if (!updatedRetailer) {
      res.status(404).json({ message: 'Retailer not found' });
    } else {
      res.status(200).json({ data: updatedRetailer, message: 'Retailer updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error, message: 'Something went wrong' });
  }
};

// Delete a retailer by its ID
export const deleteRetailer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { retailerId } = req.params;
    const deletedRetailer = await retailerDAL.deleteRetailerById(retailerId);

    if (!deletedRetailer) {
      res.status(404).json({ message: 'Retailer not found' });
    } else {
      res.status(200).json({ data: deletedRetailer, message: 'Retailer deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error, message: 'Something went wrong' });
  }
};

// Get a list of all retailers
export const getAllRetailers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const retailers = await retailerDAL.getAllRetailers();
    res.status(200).json({ data: retailers });
  } catch (error) {
    res.status(500).json({ error, message: 'Something went wrong' });
  }
};
