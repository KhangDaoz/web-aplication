import express from 'express';
import News from '../models/news.model.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/news', verifyToken, async (req, res) => {
  const news = new News(req.body);
  try {
    await news.save();
    res.status(201).json(news);
  }
  catch (error) {
    console.error("Error saving news:", error);
    res.status(500).json({ message: 'Failed to save news' });
  }
});

router.get('/newses', verifyToken, async (req, res) => {
  try {
    const newses = await News.find({});
    res.json(newses);
  }
  catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: 'Failed to fetch news' });
  }
});

router.get('/news/:slug', verifyToken, async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug });
    res.json(news);
  }
  catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: 'Failed to fetch news' });
  }
});

router.patch('/news/:slug', verifyToken, async (req, res) => {
  try {
    const news = await News.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );
    res.json(news);
  }
  catch (error) {
    console.error("Error updating news:", error);
    res.status(500).json({ message: 'Failed to update news' });
  }
});

router.delete('/news/:slug', verifyToken, async (req, res) => {
  try {
    const news = await News.findOneAndDelete({ slug: req.params.slug });
    if (!news)
      return res.status(404).json({ message: 'News not found' });
    res.status(204).json("News deleted successfully");
  }
  catch (error) {
    console.error("Error deleting news:", error);
    res.status(500).json({ message: 'Failed to delete news' });
  }
});

export default router;