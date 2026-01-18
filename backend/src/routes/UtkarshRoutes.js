import express from 'express';
import { registerAdmin, adminLogin } from '../controller/UtkarshController.js'; // Remember .js

const router = express.Router();

// Route: /api/v1/auth/login
router.post('/login', adminLogin);

// Route: /api/v1/auth/register-admin
router.post('/register-admin', registerAdmin);

// EXPORT DEFAULT (ES6 Style)
export default router;