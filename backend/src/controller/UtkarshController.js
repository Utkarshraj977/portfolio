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
        return res.status(404).json({ success: false, message: 'Admin user not found in DB.' });
    }

    // 3. Compare the entered password with the hashed one
    const isMatch = await utkarsh.comparePassword(password, utkarsh.password);

    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Incorrect password.' });
    }

    // 4. Success: Generate JWT Token (payload contains Utkarsh's ID)
    const token = jwt.sign({ id: utkarsh._id }, process.env.JWT_SECRET, {
        expiresIn: '10d', // 10 days, as requested
    });

    // 5. Set the HTTP-only cookie (This is the "remember me" functionality)
    // Example in your Login Controller (on the backend)

    // 1. Define base options
    const options = {
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
        httpOnly: true,
    };

    // 2. Adjust settings based on the environment
    if (process.env.NODE_ENV === 'production') {
        // These are required for cross-site communication (Netlify -> Render)
        options.secure = true;
        options.sameSite = 'none'; // Critical change for cross-site

        // OPTIONAL: May help explicitly define the domain, but usually not needed.
        // options.domain = '.onrender.com';
    } else {
        // Keep these for local development (http://localhost)
        options.secure = false;
        options.sameSite = 'lax'; // Best for security on same-site non-https local
    }

    res.status(200)
        .cookie('token', token, options)
        .json({ success: true, message: 'Authorization successful. Cookie set for 10 days.' });
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

