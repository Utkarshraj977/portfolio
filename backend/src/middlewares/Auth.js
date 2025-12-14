const jwt = require('jsonwebtoken');
const Utkarsh = require('../models/Utkarsh'); 


exports.protect = async (req, res, next) => {
    let token;
    console.log("COOKIES:", req.cookies.token);
    if (req.cookies.token) {
        token = req.cookies.token;
        
    }
    if (!token) {
        return res.status(401).json({ success: false, message: 'I think you are not utkarsh raj(Portfolio Admin).' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Utkarsh.findById(decoded.id).select('+password');
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Token is invalid or expired. Please re-enter password.' });
    }
};

