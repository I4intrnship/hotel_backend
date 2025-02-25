import express from 'express';
import cors from 'cors'; // Import CORS
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { authenticateJWT, authorizeRoles } from './middleware/auth.js';

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/admin', authenticateJWT, authorizeRoles(['Admin']), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
