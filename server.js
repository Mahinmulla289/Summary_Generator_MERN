import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import SummaryModel from './models/ArticleSummary.js'; // Ensure you have this import

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Summize', {
  useNewUrlParser: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Use routes
app.use('/api', userRoutes);
app.use('/api', articleRoutes); 

// Summary route
app.post('/api/summary', async (req, res) => {
    console.log('Received request:', req.body); // Log the request body
    const { email, search, dateTime, summary } = req.body;

    // Validate input
    if (!email || !search) {
      console.error('Email or search URL is missing');
      return res.status(400).json({ error: 'Email and search URL are required' });
    }

    try {
      const summaryData = new SummaryModel({ email, search, dateTime, summary });
      await summaryData.save();
      res.status(201).json({ message: 'Summary saved successfully' });
    } catch (error) {
      console.error('Error saving summary:', error);
      res.status(500).json({ error: 'Failed to save summary' });
    }
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
