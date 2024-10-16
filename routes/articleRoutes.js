// routes/articleRoutes.js
import express from 'express';
import ArticleSummary from '../models/ArticleSummary.js';

const router = express.Router();

// Route to save article summary
router.post('/summary', async (req, res) => {
  const { email, search } = req.body;

  try {
    const newSummary = new ArticleSummary({ email, search });
    await newSummary.save();
    res.status(201).json({ message: 'Summary saved successfully', summary: newSummary });
  } catch (error) {
    console.error('Error saving summary:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
