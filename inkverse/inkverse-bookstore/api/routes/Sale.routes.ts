import { Router } from "express";
import * as salesController from "../controllers/Sale.controller";
import * as authMiddleware from "../middlewares/auth.middleware";
import { extractUserId } from '../middlewares/auth.middleware';

const router = Router();

router.use(extractUserId);

router.get('/sales/retailer', authMiddleware.protect, salesController.getSalesByRetailerId);

router.post("/sales", authMiddleware.protect, salesController.createSale);
router.get("/sales/:saleId", authMiddleware.protect, salesController.getSaleById);
router.put("/sales/:saleId", authMiddleware.protect, salesController.updateSale);
router.delete("/sales/:saleId", authMiddleware.protect, salesController.deleteSale);
router.get("/sales", authMiddleware.protect, salesController.getAllSales);

export default router;