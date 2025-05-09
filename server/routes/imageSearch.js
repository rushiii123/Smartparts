import express from 'express';
import { recognizeImage } from '../controllers/RecognizeController.js';
import { protect } from '../middleware/auth.js'; // Named import for 'protect'
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/analyze-url', protect('customer,vendor'), recognizeImage);
router.post('/analyze-upload',protect('customer,vendor'), upload.single('image'), recognizeImage);


export default router;