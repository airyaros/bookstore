import mongoose, { Schema } from "mongoose";
import { IUser } from "./User";
import { IOrder } from "./Order";

export interface IClient extends IUser {
    orderHistory: IOrder[];
    wishList: mongoose.Types.ObjectId[];
    cart: {
        bookIDs: mongoose.Types.ObjectId[];
        totalPrice: number;
    };
}

const clientSchema = new Schema<IClient>({
    orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    wishList: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    cart: {
        bookIDs: [{ type: Schema.Types.ObjectId, ref: "Book" }],
        totalPrice: { type: Number },
    },
});

export default mongoose.model<IClient>("Client", clientSchema);
