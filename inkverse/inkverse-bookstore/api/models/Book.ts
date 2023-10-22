import mongoose, { Schema, Document } from "mongoose";

// enum for availablity status
enum AvailabilityStatus {
  InStock = "In Stock",
  OutOfStock = "Out of Stock",
  PreOrder = "Pre Order",
  ComingSoon = "Coming Soon",
}

// rating
interface IRating {
  userId: string;
  rating: number;
  review: string;
}

// main book document schema
export interface IBook extends Document {
  imageUrl: {
    data: String;
    contentType: string;
  };
  title: string;
  author: string;
  description: string;
  genre: string;
  retailerId: mongoose.Types.ObjectId;
  price: number;
  availablityStatus: AvailabilityStatus;
  ratingReviews: IRating[];
}

const bookSchema = new Schema<IBook>(
  {
    imageUrl: {
      data: String,
      contentType: String,
    },
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    retailerId: { type: Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true },
    availablityStatus: {
      type: String,
      enum: Object.values(AvailabilityStatus),
      required: true,
    },
    ratingReviews: [
      {
        userId: { type: String, required: true },
        rating: { type: Number, required: true },
        review: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IBook>("Book", bookSchema);
