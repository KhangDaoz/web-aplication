import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const creds = {
    username: req.body.username,
    password: req.body.password
  };
  const user = User.findOne({username: creds.username, password: creds.password});
  if(user) {
    res.status(200).json({ message: 'Login successful' });
  }
  else {
    res.status(400).json({ message: 'Login failed' });
  }
})

export default router;