import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const creds = {
    username: req.body.username,
    password: req.body.password
  };
  const user = await User.findOne({username: creds.username});
  if(user) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  else {
    const newUser = new User({
      username: creds.username,
      password: creds.password
    });
    try {
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: 'Failed to register user' });
    }
  }
});

router.post('/login', (req, res) => {
  const creds = {
    username: req.body.username,
    password: req.body.password
  };
  const user = User.findOne({username: creds.username, password: creds.password});
  if(user) {
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  }
  else {
    res.status(400).json({ message: 'Login failed' });
  }
})

export default router;