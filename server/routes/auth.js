// routes/auth.js
import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';
import Vendor from '../models/Vendor.js';

const router = express.Router();

// Register Route for Customer and Vendor
router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('fullName').notEmpty(),
    body('role').isIn(['customer', 'vendor']),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, fullName, role, address, storeName, contact } = req.body;

      let user;
      if (role === 'customer') {
        user = await Customer.findOne({ email });
      } else if (role === 'vendor') {
        user = await Vendor.findOne({ email });
      }

      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      if (role === 'customer') {
        user = new Customer({
          email,
          password: hashedPassword,
          name: fullName,  // Using name as fullName for Customer
          address,
          role,      // Set the role here as vendor

        });
      } else if (role === 'vendor') {
        user = new Vendor({
          name: fullName,
          email,
          password: hashedPassword,
          storeName, // storeName for Vendor
          contact,   // contact for Vendor
          address,   // address for Vendor
          role,      // Set the role here as vendor

        });
      }

      await user.save();

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        token,
        user: {
          id: user._id,
          email,
          fullName: user.name,
          role,
          ...(role === 'vendor' && { storeName: user.storeName, contact: user.contact, address: user.address }),
          ...(role === 'customer' && { address: user.address }),
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Login Route for Customer and Vendor
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      let user;
      // Check for customer first
      user = await Customer.findOne({ email });
      if (!user) {
        // Then check for vendor
        user = await Vendor.findOne({ email });
      }

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          ...(user.role === 'vendor' && { storeName: user.storeName, contact: user.contact, address: user.address }),
          ...(user.role === 'customer' && { address: user.address }),
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);


export default router;
