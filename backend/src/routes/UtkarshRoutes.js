const express = require('express');
const router = express.Router();
const { adminLogin,registerAdmin } = require('../controller/UtkarshController');

// The login route for your password popup
router.route('/login').post(adminLogin);
router.route('/register-admin').post(registerAdmin);

module.exports = router;