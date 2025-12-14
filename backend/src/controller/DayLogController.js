const DayLog = require('../models/Daylog');
const asyncHandler = require('express-async-handler');

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDateString = () => {
    const now = new Date();
    return now.toISOString().slice(0, 10);
};

exports.getDailyLogs = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 6;
    const skip = parseInt(req.query.skip) || 0;

    const logs = await DayLog.find({})
        .sort({ dateString: -1 })
        .limit(limit)
        .skip(skip);

    const total = await DayLog.countDocuments();

    res.status(200).json({ 
        success: true, 
        count: logs.length, 
        totalLogs: total,
        data: logs 
    });
});

exports.createTask = asyncHandler(async (req, res) => {
    const { title } = req.body; 
    const todayDateString = getTodayDateString(); 

    if (!title) {
        res.status(400);
        throw new new Error('Task title is required.');
    }

    // 1. Attempt to find existing log for TODAY
    let dayLog = await DayLog.findOne({ dateString: todayDateString });

    if (dayLog) {
        // 2. Log exists, append the new task
        dayLog.tasks.push({ title, progress: 0 });
        await dayLog.save();
    } else {
        // 3. No log exists, create a new one for today
        dayLog = await DayLog.create({
            dateString: todayDateString,
            owner: req.user._id, 
            tasks: [{ title, progress: 0 }],
        });
    }

    res.status(201).json({ success: true, data: dayLog });
});

// @route   PATCH /api/v1/worklog/task/:dayId/:taskId
exports.updateTaskProgress = asyncHandler(async (req, res) => {
    const { progress } = req.body;
    const { dayId, taskId } = req.params;

    if (progress === undefined || progress < 0 || progress > 100) {
        res.status(400);
        throw new Error('Progress must be a number between 0 and 100.');
    }

    // 1. Find the log by ID and ensure it belongs to the admin user
    const dayLog = await DayLog.findOne({ _id: dayId, owner: req.user._id });

    if (!dayLog) {
         res.status(404);
         throw new Error('Day log not found or unauthorized.');
    }

    // 2. ENFORCE STRICT TODAY EDIT RESTRICTION
    const todayDateString = getTodayDateString();

    // Check if the log's dateString matches the server's todayDateString
    if (dayLog.dateString !== todayDateString) {
         res.status(403);
         throw new Error(`Cannot edit progress for date ${dayLog.dateString}. Edits are only allowed for today's tasks (${todayDateString}).`);
    }
    
    // 3. Find and update the specific task within the array
    const task = dayLog.tasks.id(taskId);
    if (!task) {
         res.status(404);
         throw new Error('Task not found.');
    }
    
    task.progress = parseInt(progress);
    
    // Update completedAt logic
    if (task.progress === 100 && !task.completedAt) {
        task.completedAt = new Date();
    } else if (task.progress < 100 && task.completedAt) {
        task.completedAt = null; 
    }

    await dayLog.save();

    res.status(200).json({ success: true, data: dayLog });
});
