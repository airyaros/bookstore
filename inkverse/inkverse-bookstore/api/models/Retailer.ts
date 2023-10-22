import mongoose, { Schema, Document } from 'mongoose';

interface ListedBook {
  bookID: mongoose.Types.ObjectId;
  listingDate: Date;
  price: number;
  stockQuantity: number;
}

interface SalesHistory {
  saleID: mongoose.Types.ObjectId;
  bookID: mongoose.Types.ObjectId;
  saleDate: Date;
  amount: number;
}

export interface IRetailer extends Document {
  userID: mongoose.Types.ObjectId;
  listedBooks: ListedBook[];
  salesHistory: SalesHistory[];
}

const retailerSchema = new Schema<IRetailer>(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    listedBooks: [
      {
        bookID: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
        listingDate: { type: Date, default: Date.now },
        price: { type: Number, required: true },
        stockQuantity: { type: Number, required: true },
      },
    ],
    salesHistory: [
      {
        saleID: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale', required: true },
        bookID: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
        saleDate: { type: Date, required: true },
        amount: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IRetailer>('Retailer', retailerSchema);
