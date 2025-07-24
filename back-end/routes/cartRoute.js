import express from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouer = express.Router();

cartRouer.post('/get', authUser, getUserCart)
cartRouer.post('/add', authUser, addToCart)
cartRouer.post('/update', authUser, updateCart)


export default cartRouer;
