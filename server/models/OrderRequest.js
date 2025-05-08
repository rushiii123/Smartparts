import mongoose from 'mongoose';

const orderRequestSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Assuming you have a Product model
    required: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor', // Assuming you have a Vendor model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // Assuming you have a User model
    required: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  pickupTime: {
    type: String, // or Date if you want to store time in a more structured way
    required: true,
  },
  notes: {
    type: String,
    default: '', // Optional field
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending',
  },
}, { timestamps: true });

const OrderRequest = mongoose.models.OrderRequest || mongoose.model('OrderRequest', orderRequestSchema);

export default OrderRequest;
