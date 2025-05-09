import express from 'express';
import Customer from '../models/Customer.js';  // Import the Customer model
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Create a new customer
// @route   POST /api/customers
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Create a new customer
    const newCustomer = new Customer({
      name,
      email,
      phone,
      address,
    });

    await newCustomer.save();

    res.status(201).json({ customer: newCustomer });
  } catch (err) {
    console.error('Error creating customer:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get all customers
// @route   GET /api/customers
// @access  Public
router.get('/',protect('customer'), async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json({ customers });
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get a specific customer by ID
// @route   GET /api/customers/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ customer });
  } catch (err) {
    console.error('Error fetching customer:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
