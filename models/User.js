import pool from '../config/db.js';

export const createUser = async (username, email, password_hash, role) => {
  if (!username || !email || !password_hash || !role) {
    throw new Error("Missing required user fields");
  }

  const [result] = await pool.execute(
    "INSERT INTO Users (username, email, password_hash, role) VALUES (?, ?, ?, ?)",
    [username, email, password_hash, role]
  );
  return result.insertId;
};

export const getUserByEmail = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  }
  
  const [rows] = await pool.execute("SELECT * FROM Users WHERE email = ?", [email]);
  return rows.length > 0 ? rows[0] : null;
};
