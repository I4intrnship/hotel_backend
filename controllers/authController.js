import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, getUserByEmail } from '../models/User.js';

dotenv.config();

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(username, email, hashedPassword, role);
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    if (!token) {
      return res.status(500).json({ message: 'Error generating token' });
    }

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login Error:', error); // Debugging logs
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};


export const logout = (req, res) => {
  res.json({ message: 'Logout successful' });
};
