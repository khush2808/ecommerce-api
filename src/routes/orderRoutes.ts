import express from 'express';
import Order, { IOrder } from '../models/Order';
import User from '../models/User';
import Product from '../models/Product';

const router = express.Router();

// Create/Update order
router.post('/', async (req, res) => {
  try {
    const { user, product, quantity } = req.body;
    const order = await Order.findOneAndUpdate(
      { user, product },
      { user, product, quantity },
      { upsert: true, new: true }
    );
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating/updating order', error });
  }
});

// Get order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
});

// Get orders placed in the last 7 days
router.get('/recent/week', async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const orders = await Order.find({ orderDate: { $gte: sevenDaysAgo } })
      .populate('user')
      .populate('product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent orders', error });
  }
});

// Get orders of a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate('product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user orders', error });
  }
});

// Get users who bought a specific product
router.get('/product/:productId/users', async (req, res) => {
  try {
    const orders = await Order.find({ product: req.params.productId })
      .populate('user');
    const users = orders.map(order => order.user);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users for product', error });
  }
});

export default router;

