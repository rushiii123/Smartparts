import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Import Routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import imageSearchRoutes from './routes/imageSearch.js';
import uploadRoutes from './routes/uploadRoutes.js';
import recognizeRoutes from './routes/recognizeRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import vendorRoutes from './routes/vendors.js'; 
import customerRoutes from './routes/customers.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Serve static files (uploads folder for images)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✅ Database Name: ${conn.connection.name}`);
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);
  }
};

connectDB();

// Basic route
app.get('/', (req, res) => {
  res.send('✨ SmartParts backend is running 🚀');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/vendor', vendorRoutes); 
app.use('/api/orders', orderRoutes);
app.use('/api/search', imageSearchRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/recognize', recognizeRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/customer', customerRoutes); 

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at: http://localhost:${PORT}`));
