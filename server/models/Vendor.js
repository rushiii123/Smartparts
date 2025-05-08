// models/Vendor.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const vendorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  storeName: {
    type: String,
    required: true, // storeName is required
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,  // Make 'name' optional
  },
  role: {
    type: String,
    default: 'customer', // Role defaults to 'customer'
    enum: ['customer', 'vendor'], // Can either be 'customer' or 'vendor'
  },
});

// Password comparison method
vendorSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Vendor = mongoose.models.Vendor || mongoose.model('Vendor', vendorSchema);
export default Vendor;
