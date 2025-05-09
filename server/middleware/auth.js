// middleware/auth.js
import jwt from 'jsonwebtoken';

export function protect(role) {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach the user info to the request

      // If a role is specified, ensure the user has the correct role
      if (role && req.user.role !== role) {
        return res.status(403).json({ message: 'Access denied' }); // Denied access if the roles don't match
      }

      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
}
