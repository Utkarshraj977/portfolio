const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    progress: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 0,
    },
    completedAt: {
        type: Date,
        default: null,
    },
}, { 
    timestamps: false // No top-level timestamps for nested schema
});

// Export the schema (not the model)
module.exports = TaskSchema;
