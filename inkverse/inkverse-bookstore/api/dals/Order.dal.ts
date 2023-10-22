import Order, { IOrder } from "../models/Order";

// Create a new order
export const createOrder = async (orderData: IOrder): Promise<IOrder> => {
    return await Order.create(orderData);
};

// Find an order by its ID
export const findOrderById = async (orderId: string): Promise<IOrder | null> => {
    return await Order.findById(orderId).exec();
};

// Update an order by its ID
export const updateOrderById = async (orderId: string, updatedData: Partial<IOrder>): Promise<IOrder | null> => {
    return await Order.findByIdAndUpdate(orderId, updatedData, { new: true }).exec();
};

// Delete an order by its ID
export const deleteOrderById = async (orderId: string): Promise<IOrder | null> => {
    return await Order.findByIdAndDelete(orderId).exec();
};

// Get a list of all orders
export const getAllOrders = async (): Promise<IOrder[]> => {
    return await Order.find().exec();
};
