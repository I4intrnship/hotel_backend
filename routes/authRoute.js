import express from 'express';
import { register, login, test } from '../controllers/authController.js';  // Import your controller functions
import adminMiddleware from '../middlewares/adminMiddleware.js';  // Import your authentication middleware

const router = express.Router();

// POST route for registration
router.post('/register', register);

// POST route for login
router.post('/login', login);

// POST route for test - restricted to Admin role
router.post('/test', adminMiddleware, test);

export default router;
