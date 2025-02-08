import db from '../utils/db.js';

export const findUserByUsername = async (username) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
};

export const createUser = async (username, passwordHash, email, role) => {
    const [result] = await db.query(
        'INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)',
        [username, passwordHash, email, role]
    );
    return result.insertId;
};
