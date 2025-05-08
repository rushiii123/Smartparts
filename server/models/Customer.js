// models/Customer.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
   phone: {
    type: String,
    required: false,  // Ensure phone is optional
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'customer', // Role defaults to 'customer'
    enum: ['customer', 'vendor'], // Can either be 'customer' or 'vendor'
  },
});

// Password comparison method
customerSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);
export default Customer;
