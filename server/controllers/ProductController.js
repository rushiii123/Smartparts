// server/controllers/ProductController.js
import Product from '../models/Product.js';

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: 'Error adding product' });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving products' });
  }
};

// Get products with filters (e.g., by category)
export const getFilteredProducts = async (req, res) => {
  try {
    const { category, condition, minPrice, maxPrice } = req.query;
    let query = {};

    if (category && category !== "All") query.category = category;
    if (condition && condition !== "All") query.condition = condition;
    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving filtered products' });
  }
};
