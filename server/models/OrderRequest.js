// models/OrderRequest.js
import mongoose from 'mongoose';

const orderRequestSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // assuming you have a Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending',
  },
}, { timestamps: true });

const OrderRequest =
  mongoose.models.OrderRequest || mongoose.model('OrderRequest', orderRequestSchema);

export default OrderRequest;