import jwt from 'jsonwebtoken';
import Utkarsh from '../models/Utkarsh.js'; // Don't forget .js extension
import asyncHandler from 'express-async-handler';

// --- LOGIN ---
const adminLogin = asyncHandler(async (req, res) => {
    const { password } = req.body;

    if (!password) {
        res.status(400);
        throw new Error('Please enter a password.');
    }

    // We only need to check if an Admin exists (Since there is only one Utkarsh)
    // We don't really need a username check if this is a personal portfolio
    const utkarsh = await Utkarsh.findOne({ role: 'admin' }).select('+password');

    if (!utkarsh) {
        res.status(404);
        throw new Error('Admin user not found.');
    }

    // Updated logic: We only pass the plain password
    const isMatch = await utkarsh.comparePassword(password);

    if (!isMatch) {
        res.status(401);
        throw new Error('Incorrect password.');
    }

    const token = jwt.sign(
        { id: utkarsh._id },
        process.env.JWT_SECRET,
        { expiresIn: '10d' }
    );

    res.status(200)
        .cookie('token', token, {
            maxAge: 10 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // True only in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Fix for localhost
        })
        .json({ success: true, message: 'Welcome back, Utkarsh!' });
});

// --- REGISTER (Run once via Postman then disable/comment out) ---
const registerAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error('Username and password are required.');
    }

    const adminExists = await Utkarsh.findOne({ role: 'admin' });
    if (adminExists) {
        res.status(403);
        throw new Error('Admin already exists.');
    }

    const utkarsh = await Utkarsh.create({
        username,
        password,
        role: 'admin',
    });

    if (utkarsh) {
        res.status(201).json({
            success: true,
            message: 'Admin created successfully.',
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data.');
    }
});

export { registerAdmin, adminLogin };