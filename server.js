import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoute.js';  // Import auth routes

dotenv.config();  // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());  // Allow cross-origin requests
app.use(bodyParser.json());  // Parse incoming JSON requests

// Register routes
app.use('/auth', authRoutes);  // All auth routes will be prefixed with /auth

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
