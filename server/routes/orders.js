import express from 'express';
import { body, validationResult } from 'express-validator';
import OrderRequest from '../models/OrderRequest.js';
import { protect } from '../middleware/auth.js';  // Import the protect middleware
import mongoose from 'mongoose'; // Ensure mongoose is imported

const router = express.Router();

// Get user's orders
router.post(
  '/',protect('customer','vendor'),
  [
    // You can keep authentication here if needed
    // auth, // Uncomment this if you still want to keep authentication

    body('productId').notEmpty().isMongoId().withMessage('Product ID must be a valid MongoDB ObjectId'),
    body('vendorId').notEmpty().isMongoId().withMessage('Vendor ID must be a valid MongoDB ObjectId'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive number'),
    body('pickupDate').optional().isDate().withMessage('Pickup date must be a valid date'),
    body('pickupTime').optional().notEmpty().withMessage('Pickup time cannot be empty'),
    body('notes').optional().isString().withMessage('Notes must be a string'),
    body('customerId').notEmpty().isMongoId().withMessage('Customer ID must be a valid MongoDB ObjectId') // Manually set customerId
  ],
  async (req, res) => {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract data from the request body
      const { productId, vendorId, quantity, pickupDate, pickupTime, notes, customerId } = req.body;

      // Ensure customerId is provided
      if (!customerId) {
        return res.status(400).json({ message: 'Customer ID is required.' });
      }

      // Create the new order
      const order = new OrderRequest({
        productId: new mongoose.Types.ObjectId(productId), // Create a new ObjectId instance
        vendorId: new mongoose.Types.ObjectId(vendorId), // Create a new ObjectId instance
        quantity,
        pickupDate,
        pickupTime,
        notes,
        customerId: new mongoose.Types.ObjectId(customerId), // Manually set the customerId as ObjectId
        status: 'Pending', // Default status
      });

      // Save the order to the database
      await order.save();

      // Return the created order as response
      res.status(201).json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update order status (vendor only)
router.put('/:id/status', protect('vendor'), async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    if (status && ['Pending', 'Accepted', 'Completed'].includes(status)) {
      // Continue with the code when the status is valid
    } else {
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

    res.json(order); // Respond with the updated order

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});




// Get customer's order history
router.get(
  '/history/customer/:customerId', protect('customer'),
  // [auth],
  async (req, res) => {
    try {
      const customerId = req.params.customerId;

      // Fetch the orders for the given customer
      const orders = await OrderRequest.find({ customerId }).populate('productId vendorId');
      if (!orders) {
        return res.status(404).json({ message: 'No orders found for this customer' });
      }

      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get vendor's orders
router.get(
  '/history/vendor/:vendorId',protect('vendor'),
  // [auth, vendorAuth],
  async (req, res) => {
    try {
      const vendorId = req.params.vendorId;

      // Fetch orders for a given vendor, where vendorId matches
      const orders = await OrderRequest.find({ vendorId }).populate('productId customerId');
      if (!orders) {
        return res.status(404).json({ message: 'No orders found for this vendor' });
      }

      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);
export default router;