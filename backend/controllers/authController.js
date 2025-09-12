const User = require('../models/User');
const jwt = require('jsonwebtoken');

// helper: generate JWT
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

// Signup: first user can be created without auth; afterwards only admin can create new admins
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'name, email and password are required' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User with this email already exists' });

    const usersCount = await User.countDocuments();

    // if an admin already exists, require that the requestor is an admin (token)
    if (usersCount > 0) {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer '))
        // return res.status(401).json({ message: 'Only an existing admin can create new admin users' });
        return res.status(401).json({ message: 'Admin already registered' });

      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // if (decoded.role !== 'admin') return res.status(403).json({ message: 'Only admin can create new admins' });
        if (decoded.role !== 'admin') return res.status(403).json({ message: 'Admin already registered' });

      } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
    }

    const user = new User({ name, email, password, role: 'admin' });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Login: returns token
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // ensure it's an admin (we only allow admin login)
    if (user.role !== 'admin') return res.status(403).json({ message: 'Only admin users can login' });

    const token = generateToken(user);
    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signup, login };
