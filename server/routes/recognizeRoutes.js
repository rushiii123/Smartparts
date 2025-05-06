import express from 'express';
import { recognizeImage } from '../controllers/RecognizeController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Route for image recognition from URL
router.post('/analyze-url', protect, recognizeImage);

// Route for uploading an image and then analyzing it
router.post('/analyze-upload', protect, upload.single('image'), recognizeImage);

export default router;