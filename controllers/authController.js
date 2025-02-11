import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../utils/db.js';

export const test = (req, res) => {
  console.log('Hello from test function');
  res.send('Hello from test function');  // Send response to the client
};


export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please enter both username and password.' });
  }

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const admin = rows[0];
    const passwordMatch = await bcrypt.compare(password, admin.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate input fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into the database
    await db.execute(
      'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role || 'user']
    );

    // Retrieve the newly created user
    const [newUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = newUser[0];

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || '1h' }
    );

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
    });

  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

