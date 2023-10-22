import Sales, { ISales } from "../models/Sale";

// Create a new sale
export const createSale = async (saleData: ISales): Promise<ISales> => {
    return await Sales.create(saleData);
};

// Find a sale by its ID
export const findSaleById = async (saleId: string): Promise<ISales | null> => {
    return await Sales.findById(saleId).exec();
};

// Update a sale by its ID
export const updateSaleById = async (saleId: string, updatedData: Partial<ISales>): Promise<ISales | null> => {
    return await Sales.findByIdAndUpdate(saleId, updatedData, { new: true }).exec();
};

// Delete a sale by its ID
export const deleteSaleById = async (saleId: string): Promise<ISales | null> => {
    return await Sales.findByIdAndDelete(saleId).exec();
};

// Get a list of all sales
export const getAllSales = async (): Promise<ISales[]> => {
    return await Sales.find().exec();
};

export const getSalesByRetailerId = async  (retailerID: string | null) => {
    return await Sales.find({ retailerID });
  };