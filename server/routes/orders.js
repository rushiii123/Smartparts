import express from 'express';
import { body, validationResult } from 'express-validator';
import OrderRequest from '../models/OrderRequest.js';
import { protect as auth } from '../middleware/auth.js';
import vendorAuth from '../middleware/vendorAuth.js';

const router = express.Router();

// Get user's orders
router.get('/user', auth, async (req, res) => {
  try {
    const orders = await OrderRequest.find({ userId: req.user.userId })
      .populate('productId')
      .populate('vendorId', 'fullName');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get vendor's orders
router.get('/vendor', [auth, vendorAuth], async (req, res) => {
  try {
    const orders = await OrderRequest.find({ vendorId: req.user.userId })
      .populate('productId')
      .populate('userId', 'fullName email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create order request
router.post(
  '/',
  [
    auth,
    body('productId').notEmpty(),
    body('vendorId').notEmpty(),
    body('pickupDate').optional().isDate(),
    body('pickupTime').optional(),
    body('notes').optional(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const order = new OrderRequest({
        ...req.body,
        userId: req.user.userId,
        status: 'pending',
      });

      await order.save();
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update order status (vendor only)
router.put(
  '/:id/status',
  [auth, vendorAuth],
  async (req, res) => {
    try {
      const { status } = req.body;
      if (!['pending', 'accepted', 'rejected', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const order = await OrderRequest.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      if (order.vendorId.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      order.status = status;
      await order.save();

      res.json(order);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;