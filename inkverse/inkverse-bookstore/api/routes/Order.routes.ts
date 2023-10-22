import { Router } from "express";
import * as orderController from "../controllers/Order.controller";
import { extractUserId } from "../middlewares/auth.middleware";

const router = Router();

router.use(extractUserId);

router.post("/orders", orderController.createOrder);
router.get("/orders/:orderId", orderController.getOrderById);
router.put("/orders/:orderId", orderController.updateOrder);
router.delete("/orders/:orderId", orderController.deleteOrder);
router.get("/orders", orderController.getAllOrders);

export default router;
