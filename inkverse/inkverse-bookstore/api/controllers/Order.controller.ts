import { Request, Response } from "express";
import * as orderDAL from "../dals/Order.dal";
import { IOrder } from "../models/Order";
import { formatError, formatSuccess } from "../utils/responseFormatter";
import mongoose from "mongoose";

// Create a new order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract user ID from the token
        const userID = req.userId;
        const orderData: IOrder = req.body;
        
        orderData.userID = new mongoose.Types.ObjectId(userID);
        
        const createdOrder = await orderDAL.createOrder(orderData);
        formatSuccess(res,201,createdOrder);
        // res.status(201).json({
        //     data: createdOrder,
        //     message: "Order created successfully",
        // });
    } catch (error) {
        formatError(res,500,"Something went wrong")
        // res.status(500).json({
        //     error,
        //     message: "Something went wrong",
        // });
    }
};

// Get an order by its ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.params;
        const order = await orderDAL.findOrderById(orderId);

        if (!order) {
            formatError(res, 404, "Order not found");
            //res.status(404).json({ message: "Order not found" });
        } else {
            formatSuccess(res, 200, order);
            //res.status(200).json({ data: order });
        }
    } catch (error) {
        formatError(res, 500, "Something went wrong");
        //res.status(500).json({ error, message: "Something went wrong" });
    }
};

// Update an order by its ID
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.params;
        const updatedOrderData: Partial<IOrder> = req.body;
        const updatedOrder = await orderDAL.updateOrderById(orderId, updatedOrderData);

        if (!updatedOrder) {
            formatError(res, 404, "Order not found");
            //res.status(404).json({ message: "Order not found" });
        } else {
            formatSuccess(res, 200, updatedOrder);
            //res.status(200).json({ data: updatedOrder, message: "Order updated successfully" });
        }
    } catch (error) {
        formatError(res, 500, "Something went wrong");
        //res.status(500).json({ error, message: "Something went wrong" });
    }
};

// Delete an order by its ID
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.params;
        const deletedOrder = await orderDAL.deleteOrderById(orderId);

        if (!deletedOrder) {
            formatError(res, 404, "Order not found");
            //res.status(404).json({ message: "Order not found" });
        } else {
            formatSuccess(res,200, null);
            //res.status(200).json({ data: deletedOrder, message: "Order deleted successfully" });
        }
    } catch (error) {
        formatError(res, 500, "Something went wrong");
        //res.status(500).json({ error, message: "Something went wrong" });
    }
};

// Get a list of all orders
export const getAllOrders = async (_req: Request, res: Response): Promise<void> => {
    try {
        const orders = await orderDAL.getAllOrders();
        formatSuccess(res, 200, orders);
        //res.status(200).json({ data: orders });
    } catch (error) {
        formatError(res, 500, "Something went wrong");
        //res.status(500).json({ error, message: "Something went wrong" });
    }
};
