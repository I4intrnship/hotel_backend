import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Create a pool of database connections
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,  // Password is empty if root has no password
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;  // Default export to use the db connection elsewhere
