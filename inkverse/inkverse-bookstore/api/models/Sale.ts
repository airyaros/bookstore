import mongoose, { Schema, Document } from "mongoose";

// Define sub-document schema for client details
interface IClientDetails {
    clientID: mongoose.Types.ObjectId;
    name: string;
    email: string;
    shippingDetails: {
        address: string;
        postalCode: string;
        country: string;
    };
}

export interface ISales extends Document {
    retailerID: mongoose.Types.ObjectId;
    bookID: mongoose.Types.ObjectId;
    saleDate: Date;
    bookCoverImage: {
        data: String;
        contentType: string;
      };
    quantitySold: number;
    totalAmount: number;
    paymentReceived: boolean;
    clientDetails: IClientDetails;
    orderID?: mongoose.Types.ObjectId;
}

const salesSchema = new Schema<ISales>(
    {
        retailerID: { type: mongoose.Schema.Types.ObjectId },
        bookID: { type: mongoose.Schema.Types.ObjectId, required: true },
        saleDate: { type: Date, required: true },
        bookCoverImage: { data: String,
            contentType: String,},
        quantitySold: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
        paymentReceived: { type: Boolean, required: true },
        clientDetails: {
            clientID: { type: mongoose.Schema.Types.ObjectId, required: true },
            name: { type: String, required: true },
            email: { type: String, required: true },
            shippingDetails: {
                address: { type: String, required: true },
                postalCode: { type: String, required: true },
                country: { type: String, required: true },
            },
        },
        orderID: { type: mongoose.Schema.Types.ObjectId },
    },
    { timestamps: true }
);

export default mongoose.model<ISales>("Sales", salesSchema);