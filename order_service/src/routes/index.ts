import express from 'express';
import orderRouter from './order.routes'
import cartRouter from './cart.routes'
const router = express.Router();

router.use('/cart/',cartRouter);
router.use('/order/',orderRouter);
export default router