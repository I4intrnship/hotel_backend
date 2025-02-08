import express from 'express';
import { register, login } from '../controllers/authController.js';  // Import your controller functions

const router = express.Router();

// POST route for registration
router.post('/register', register);

// POST route for login
router.post('/login', login);

export default router;
