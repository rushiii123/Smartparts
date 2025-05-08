import express from 'express';
const router = express.Router();
import Product from '../models/Product.js';
import upload from '../middleware/uploadMiddleware.js'; 
import { analyzeImageAndExtractKeywords } from '../config/vision.js';


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

// @desc    Add new product with vision + cloudinary
// @route   POST /api/products
// @access  Private (vendor only)
router.post('/vendor', upload.array('images', 4), async (req, res) => {
  try {
    const {
      name,
      partNumber,
      price,
      category,
      condition,
      quantity,
      vendorId,
      description,
      specifications,
      compatibility,
    } = req.body;

    // Basic validation
    if (!name || !price || !category || !condition || !vendorId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // ⬆️ 1. Upload images already done via Multer + Cloudinary middleware
    const uploadedImages = req.files.map((file) => file.path);
    const mainImage = uploadedImages[0];

    // 🔍 2. Analyze image with Vision API to extract keywords
    const { keywords } = await analyzeImageAndExtractKeywords(mainImage);

    // 🧱 3. Construct the product object
    const product = new Product({
      name,
      partNumber,
      price,
      category,
      condition,
      quantity,
      vendorId,
      description,
      specifications,
      compatibility,
      image: mainImage,
      images: uploadedImages,
      tags: keywords || [],
    });

    // 💾 4. Save to DB
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);

  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @desc    Get all products for a specific vendor
// @route   GET /api/products/vendor/:vendorId
// @access  Private (vendor only)
router.get('/vendor/:vendorId', async (req, res) => {
  try {
    const vendorId = req.params.vendorId;

    if (!vendorId) {
      return res.status(400).json({ message: 'Vendor ID is required' });
    }

    const products = await Product.find({ vendorId });
    res.json({ products });
  } catch (error) {
    console.error('Error fetching vendor products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
