import express from 'express';
import Product, { IProduct } from '../models/Product';

const router = express.Router();

// Create/Update product
router.post('/', async (req, res) => {
  try {
    const { name, category, price, stockQuantity } = req.body;
    const product = await Product.findOneAndUpdate(
      { name },
      { name, category, price, stockQuantity },
      { upsert: true, new: true }
    );
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating/updating product', error });
  }
});

// Get product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

// Get total stock quantity for all products
router.get('/stock/total', async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: '$stockQuantity' }
        }
      }
    ]);
    const totalStock = result[0]?.totalStock || 0;
    res.json({ totalStock });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total stock', error });
  }
});
router.get('/', async (req, res) => {
  try {
    
    res.end("Hello World");
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});


export default router;

