import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { connectDB } from './mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function loginUser(email, password) {
  await connectDB();
  
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isValid = await user.comparePassword(password);
  if (!isValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
    token,
  };
}

export async function registerUser(userData) {
  await connectDB();

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const user = new User(userData);
  await user.save();

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
    token,
  };
}
