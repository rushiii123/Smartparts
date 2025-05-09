// routes/vendors.js
import express from 'express';
import Vendor from '../models/Vendor.js'; // Ensure this is the path to your Vendor model
import { protect } from '../middleware/auth.js';
const router = express.Router();



// Create a new vendor
router.post('/', async (req, res) => {
  try {
    const { storeName, address, contact, email } = req.body;

    const newVendor = new Vendor({
      storeName,
      address,
      contact,
      email,
    });

    await newVendor.save();
    res.status(201).json(newVendor);  // Send the created vendor as response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all vendors
router.get('/',protect('endor'), async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);  // Send all vendors as response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Fetch vendor details by vendorId
// @route   GET /api/vendors/:vendorId
// @access  Public
router.get('/:vendorId', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.json({ vendor });
  } catch (error) {
    console.error('Error fetching vendor:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;

