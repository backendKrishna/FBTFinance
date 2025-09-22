// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const protect = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
//       if (!req.user) return res.status(401).json({ message: 'User no longer exists' });
//       return next();
//     } catch (err) {
//       console.error(err);
//       return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }
//   return res.status(401).json({ message: 'Not authorized, no token' });
// };

// const adminOnly = (req, res, next) => {
//   if (req.user && req.user.role === 'admin') return next();
//   return res.status(403).json({ message: 'Admin access only' });
// };

// module.exports = { protect, adminOnly };


//==============
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    console.error('❌ Error in auth middleware:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};

module.exports = { protect, adminOnly };