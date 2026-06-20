import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  res.json({ success: true, data: { user: req.user } });
});

export default router;
