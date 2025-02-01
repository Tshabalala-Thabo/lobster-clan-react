import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import reservationRoutes from './routes/reservationRoutes.js';

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Welcome Route
app.get('/', (req, res) => {
  res.send('Hello, welcome to the backend ;)');
});

// Routes
app.use('/api', reservationRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});