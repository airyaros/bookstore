import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.DB_URL;

const connectToDatabase = async (): Promise<void> => {
    if (!url) {
        console.error("DB_URL is not defined in your environment variables.");
        return;
    }

    await mongoose
        .connect(url)
        .then(() => {
            console.log("MongoDB successfully connected");
        })
        .catch((err) => {
            console.error(err);
        });
};

export default connectToDatabase;
