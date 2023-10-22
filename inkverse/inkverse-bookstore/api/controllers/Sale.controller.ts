import { Request, Response } from "express";
import * as salesDAL from "../dals/Sale.dal";
import { ISales } from "../models/Sale";
import * as bookDAL from "../dals/Book.dal";
import mongoose, { Types } from "mongoose";
import { formatError, formatSuccess } from "../utils/responseFormatter";

// Create a new sale
export const createSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const saleData: ISales = req.body;

        const book = await bookDAL.findBookByID(saleData.bookID);

        if (!book || !book.retailerId) {
            formatError(res, 404, "Book or retailer not found");
            //res.status(404).json({ message: "Book or retailer not found" });
            return;
        }
        saleData.retailerID = new mongoose.Types.ObjectId(book.retailerId);
        saleData.bookCoverImage = book.imageUrl;

        
        const createdSale = await salesDAL.createSale(saleData);
        formatSuccess(res, 201, createdSale);
        // res.status(201).json({
        //     data: createdSale,
        //     message: "Sale created successfully",
        // });
    } catch (error) {
        formatError(res, 500, "Something went wrong");
        // res.status(500).json({
        //     error,
        //     message: "Something went wrong",
        // });
    }
};

// Get a sale by its ID
export const getSaleById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { saleId } = req.params;
        const sale = await salesDAL.findSaleById(saleId);

        if (!sale) {
            formatError(res, 404, "Sale not found");
            //res.status(404).json({ message: "Sale not found" });
        } else {
            formatSuccess(res, 200, sale);
            //res.status(200).json({ data: sale });
        }
    } catch (error) {
        formatError(res, 500, "Something went wrong");
        //res.status(500).json({ error, message: "Something went wrong" });
    }
};

// Update a sale by its ID
export const updateSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const { saleId } = req.params;
        const updatedSaleData: Partial<ISales> = req.body;
        const updatedSale = await salesDAL.updateSaleById(saleId, updatedSaleData);

        if (!updatedSale) {
            formatError(res, 404, "Sale not found");
            //res.status(404).json({ message: "Sale not found" });
        } else {
            formatSuccess(res, 200, updatedSale);
            //res.status(200).json({ data: updatedSale, message: "Sale updated successfully" });
        }
    } catch (error) {
        formatError(res, 500, "Something went wrong");
        //res.status(500).json({ error, message: "Something went wrong" });
    }
};

// Delete a sale by its ID
export const deleteSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const { saleId } = req.params;
        const deletedSale = await salesDAL.deleteSaleById(saleId);

        if (!deletedSale) {
            formatError(res, 404, "Sale not found");
            //res.status(404).json({ message: "Sale not found" });
        } else {
            formatSuccess(res, 200, null);
            //res.status(200).json({ data: deletedSale, message: "Sale deleted successfully" });
        }
    } catch (error) {
        formatError(res, 500, "Something went wrong");
        res.status(500).json({ error, message: "Something went wrong" });
    }
};

// Get a list of all sales
export const getAllSales = async (_req: Request, res: Response): Promise<void> => {
    try {
        const sales = await salesDAL.getAllSales();
        formatSuccess(res, 200, sales);
        //res.status(200).json({ data: sales });
    } catch (error) {
        formatError(res, 500, "Something went wrong");
        //res.status(500).json({ error, message: "Something went wrong" });
    }
};

export const getSalesByRetailerId = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const retailerId = req.userId;  // Assuming req.userId holds the retailer ID
       if (!retailerId) {
        formatError(res,400, "RetailerId missing");
        //res.status(400).json({ message: "Retailer ID is missing" });
        return;
    }

    if (!mongoose.Types.ObjectId.isValid(retailerId)) {
        formatError(res, 400, "Invalid retailer ID");
        //res.status(400).json({ message: "Invalid retailer ID" });
        return;
    }
       if(retailerId){
      const sales = await salesDAL.getSalesByRetailerId(retailerId);
      formatSuccess(res, 200, sales);
      //res.status(200).json({ sales });
       }
       else{
        formatError(res, 404, "No retailer found");
        //res.status(500).json({ message: "No retailer found" });
       }
    } catch (error) {
        formatError(res, 500, "Something went wrong");
      //res.status(500).json({ error, message: "Something went wrong" });
    }
  };
