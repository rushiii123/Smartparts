// models/Product.js
import mongoose from 'mongoose';

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  partNumber: {
    type: String,
    default: '',
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  condition: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array of extra images
    default: [],
  },
  tags: {
    type: [String], // Array of tags
    default: [],
  },
});

// Export the Product model
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
