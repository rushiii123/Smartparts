import express from 'express';
import { uploadImage } from '../controllers/UploadController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Route for just uploading an image
router.post('/', protect, upload.single('image'), uploadImage);

export default router;