// --- 2. The Login/Password Check Controller ---
const jwt = require('jsonwebtoken');
const Utkarsh = require('../models/Utkarsh');
const asyncHandler = require('express-async-handler');

exports.adminLogin = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, message: 'Please enter a password.' });
  }

  const utkarsh = await Utkarsh.findOne({ role: 'admin' }).select('+password');
  if (!utkarsh) {
    return res.status(404).json({ success: false, message: 'Admin user not found.' });
  }

  const isMatch = await utkarsh.comparePassword(password, utkarsh.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Incorrect password.' });
  }

  const token = jwt.sign(
    { id: utkarsh._id },
    process.env.JWT_SECRET,
    { expiresIn: '10d' }
  );

  res
    .status(200)
    .cookie('token', token, {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .json({ success: true, message: 'Login successful.' });
};


exports.registerAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error('Username and password are required for setup.');
    }

    // Check if an admin already exists (we only want one)
    const adminExists = await Utkarsh.findOne({ role: 'admin' });
    if (adminExists) {
        res.status(403);
        throw new Error('Admin user already exists. Cannot create another.');
    }

    // The password hashing logic is handled automatically by the pre-save hook in the Utkarsh model!
    const utkarsh = await Utkarsh.create({
        username,
        password, // Password is automatically hashed and salted by Mongoose middleware
        role: 'admin',
    });

    if (utkarsh) {
        res.status(201).json({
            success: true,
            message: 'Admin user created successfully.',
            user: {
                id: utkarsh._id,
                username: utkarsh.username,
            },
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data provided.');
    }
});

