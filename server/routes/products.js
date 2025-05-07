import express from 'express';
const router = express.Router();
import Product from '../models/Product.js';

// @desc    Fetch all products with search capability
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { brand: { $regex: req.query.search, $options: 'i' } },
            { description: { $regex: req.query.search, $options: 'i' } },
          ],
        }
      : {};

    const products = await Product.find({ ...keyword });
    res.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (vendor only)
router.post('/', async (req, res) => {
  try {
    const {
      name,
      partNumber,
      price,
      category,
      condition,
      quantity,
      vendorId,
      image,
      images,
      tags
    } = req.body;

    if (!name || !price || !category || !condition || !vendorId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const product = new Product({
      name,
      partNumber: partNumber || '',
      price,
      category,
      condition,
      quantity: quantity || 0,
      vendorId,
      image: image || '',
      images: images || [],
      tags: tags || [],
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
