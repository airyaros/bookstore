import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectToDatabase from "./config/db";
import userRoutes from "./routes/User.routes";
import bookRoutes from "./routes/Book.routes";
import orderRoutes from "./routes/Order.routes";
import saleRoutes from "./routes/Sale.routes";
import retailerRoutes from "./routes/Retailer.routes";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(cookieParser());


connectToDatabase();

app.use("/api", [
  userRoutes,
  bookRoutes,
  orderRoutes,
  saleRoutes,
  retailerRoutes,
]);

app.listen(port, () => {
  console.log(`API started at port ${port}`);
});
