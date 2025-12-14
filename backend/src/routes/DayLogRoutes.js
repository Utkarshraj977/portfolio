const express = require('express');
const router = express.Router();
const { getDailyLogs, createTask, updateTaskProgress } = require('../controller/DayLogController');
const { protect } = require('../middlewares/Auth'); // Your authorization middleware

// Public Read Access (for visitors)
router.route('/alltask').get(getDailyLogs);

// Protected Write Access (for Utkarsh only)
router.route('/createtask').post(protect, createTask);
router.route('/task/:dayId/:taskId').patch(protect, updateTaskProgress);

module.exports = router;