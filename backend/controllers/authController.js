const User = require('../models/User');
const jwt = require('jsonwebtoken');

// helper: generate JWT
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });


// Signup: allow maximum 2 admins in the system
// const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password)
//       return res.status(400).json({ message: 'name, email and password are required' });

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User with this email already exists' });

//     // count how many admins exist
//     const adminCount = await User.countDocuments({ role: 'admin' });

//     // if 2 admins already exist → block signup
//     if (adminCount >= 2) {
//       return res.status(403).json({ message: 'Maximum 2 admins are allowed' });
//     }

//     // if at least 1 admin already exists → require token and role check
//     if (adminCount >= 1) {
//       const authHeader = req.headers.authorization;
//       if (!authHeader || !authHeader.startsWith('Bearer '))
//         return res.status(401).json({ message: 'Only an existing admin can create another admin' });

//       const token = authHeader.split(' ')[1];
//       try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (decoded.role !== 'admin') {
//           return res.status(403).json({ message: 'Only an admin can create another admin' });
//         }
//       } catch (err) {
//         return res.status(401).json({ message: 'Invalid or expired token' });
//       }
//     }

//     // create admin (1st or 2nd)
//     const user = new User({ name, email, password, role: 'admin' });
//     await user.save();

//     const token = generateToken(user);
//     res.status(201).json({
//       user: { id: user._id, name: user.name, email: user.email, role: user.role },
//       token,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };


const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // Check if user with same email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Count existing admins
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount >= 2) {
      return res.status(403).json({ message: 'Maximum 2 admins are allowed' });
    }

    // Create new admin
    const user = new User({ name, email, password, role: 'admin' });
    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      message: 'Signup successful',
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
