import Retailer , { IRetailer } from '../models/Retailer';

// Create a new retailer
export const createRetailer = async (retailerData: IRetailer): Promise<IRetailer> => {
  return await Retailer.create(retailerData);
};

// Find a retailer by its ID
export const findRetailerById = async (retailerId: string): Promise<IRetailer | null> => {
  return await Retailer.findById(retailerId).exec();
};

// Update a retailer by its ID
export const updateRetailerById = async (
  retailerId: string,
  updatedData: Partial<IRetailer>
): Promise<IRetailer | null> => {
  return await Retailer.findByIdAndUpdate(retailerId, updatedData, { new: true }).exec();
};

// Delete a retailer by its ID
export const deleteRetailerById = async (retailerId: string): Promise<IRetailer | null> => {
  return await Retailer.findByIdAndDelete(retailerId).exec();
};

// Get a list of all retailers
export const getAllRetailers = async (): Promise<IRetailer[]> => {
  return await Retailer.find().exec();
};
