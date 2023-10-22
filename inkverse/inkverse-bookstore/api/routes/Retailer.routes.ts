import { Router } from 'express';
import * as retailerController from '../controllers/Retailer.controller';

const router = Router();

router.post('/retailers', retailerController.createRetailer);
router.get('/retailers/:retailerId', retailerController.getRetailerById);
router.put('/retailers/:retailerId', retailerController.updateRetailer);
router.delete('/retailers/:retailerId', retailerController.deleteRetailer);
router.get('/retailers', retailerController.getAllRetailers);

export default router; 
