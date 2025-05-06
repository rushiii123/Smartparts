// routes/imageSearch.js
import express from 'express';
import { recognizeImage } from '../controllers/RecognizeController.js';
import { protect } from '../middleware/auth.js';  // Named import for 'protect'
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Route for image search via URL
router.post('/by-image-url', protect, recognizeImage);

// Route for image search via file upload
router.post('/by-image-upload', protect, upload.single('image'), recognizeImage);

export default router;
