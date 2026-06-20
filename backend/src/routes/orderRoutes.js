import express from 'express';
import { createOrder, getOrders, getOrderById } from '../controllers/orderController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validation.js';
import { createOrderSchema } from '../validators/schemas.js';

const router = express.Router();

router.get('/', verifyToken, getOrders);
router.get('/:orderId', verifyToken, getOrderById);
router.post('/', verifyToken, validateRequest(createOrderSchema), createOrder);

export default router;
