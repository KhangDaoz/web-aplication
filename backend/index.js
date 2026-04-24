import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import postRoutes from './routes/post.route.js';
import userRoutes from './routes/user.route.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', postRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
})

app.listen(process.env.PORT, () => {
  console.log(`Backend server is running on http://localhost:${process.env.PORT}`);
})