import jwt from 'jsonwebtoken';

const adminMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to the request

    // Check if the user role is "Admin"
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access Forbidden: You are not an Admin' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default adminMiddleware;
