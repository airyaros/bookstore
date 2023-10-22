import mongoose, { Schema, Document } from "mongoose";

enum OrderStatus {
    Processing = "Processing",
    Shipped = "Shipped",
    Delivered = "Delivered",
    Cancelled = "Cancelled",
    // Add more status options as needed
}

export interface IOrder extends Document {
    userID: mongoose.Types.ObjectId;
    bookIDs: mongoose.Types.ObjectId[];
    orderDate: Date;
    shippingDetails: {
        address: string;
        postalCode: string;
        country: string;
    };
    orderStatus: OrderStatus;
    totalPrice: number;
}

const orderSchema = new Schema<IOrder>(
    {
        userID: { type: mongoose.Schema.Types.ObjectId, required: true },
        bookIDs: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
        orderDate: { type: Date, default: Date.now, required: true },
        shippingDetails: {
            address: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        orderStatus: {
            type: String,
            enum: Object.values(OrderStatus),
            required: true,
        },
        totalPrice: { type: Number, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
