import User from '../models/User.js';

export default async function vendorAuth(req, res, next) {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'vendor') {
      return res.status(403).json({ message: 'Access denied. Vendors only.' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}