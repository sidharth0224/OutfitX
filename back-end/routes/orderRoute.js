import express from 'express';
import { allOrders, placeOrderCOD, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyStripe } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';
const orderRouter = express.Router();

//Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

//Payment features
orderRouter.post('/COD', authUser, placeOrderCOD)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

//User Features
orderRouter.post('/userorders', authUser, userOrders)

// Verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)


export default orderRouter;
