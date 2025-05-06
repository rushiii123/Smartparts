// routes/matchRoutes.js
import express from 'express';
import { matchProduct } from '../controllers/MatchController.js'; // ES Modules import

const router = express.Router();

// Send { labels: ['label1', 'label2', ...]} in body
router.post('/', matchProduct);

export default router; // ES Modules export
