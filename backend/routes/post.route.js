import express from 'express';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';

const router = express.Router();

router.post('/post', async (req, res) => {
  const post = new Post(req.body);
  try {
    await post.save();
    res.status(201).json(post);
  }
  catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ message: 'Failed to save post' });
  }
});

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
});

router.get('/post/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({slug: req.params.slug});
    res.json(post);
  }
  catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: 'Failed to fetch post' });
  }
})

router.patch('/post/:slug', async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      {slug: req.params.slug}, 
      req.body,
      {new: true}
    );
    res.json(post);
  }
  catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: 'Failed to update post' });
  }
});

router.delete('/post/:slug', async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({slug: req.params.slug});
    if(!post)
      return res.status(404).json({ message: 'Post not found' });
    res.status(204).json("Post deleted successfully");
  }
  catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: 'Failed to delete post' });
  }
});



export default router;