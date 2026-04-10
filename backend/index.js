const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const BlogPosts = [
  {
  slug: "first-blog-post",
  title: "First Blog Post",
  description: "Lorem ipsum dolor sit amet, consectetur adip.",

  },
  {
  slug: "second-blog-post",
  title: "Second Blog Post",
  description: "Hello React Router v6",
  }
];

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
})

app.post('/api/post', (req, res) => {
  const post = {
    slug: req.body.slug,
    title: req.body.title,
    description: req.body.description
  };
  BlogPosts.push(post);
  res.status(200).json({ message: 'Posted successful' });
  console.log(BlogPosts);
})

app.get('/api/posts', (req, res) => {
  // res.json(BlogPosts);
  res.json(BlogPosts);
})

app.get('/api/post/:slug', (req, res) => {
  const slug = req.params.slug;
  const post = BlogPosts.find(p => p.slug === slug);
  if(post)
    res.json(post);
  else
    res.status(404).json({ message: 'Post not found' });
})

app.post('/api/login', (req, res) => {
  const creds = {
    username: req.body.username,
    password: req.body.password
  };
  if(creds.username === 'admin' && creds.password === '123') {
    res.status(200).json({ message: 'Login successful' });
  }
  else {
    res.status(400).json({ message: 'Login failed' });
  }
})

app.listen(5001, () => {
  console.log('Backend server is running on http://localhost:5001');
})