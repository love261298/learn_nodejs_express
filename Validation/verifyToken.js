import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/User.js';
dotenv.config();

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const secretKey = process.env.SECRET_CODE || 'your_secret_key';
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default verifyToken;
