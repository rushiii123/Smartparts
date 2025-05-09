import jwt from 'jsonwebtoken';

export function protect(roles) {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach the user info to the request

      // If roles are specified, ensure the user has one of the allowed roles
      if (roles) {
        const allowedRoles = roles.split(','); // Split roles into an array
        if (!allowedRoles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Access denied' }); // Denied access if the role doesn't match
        }
      }

      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
}