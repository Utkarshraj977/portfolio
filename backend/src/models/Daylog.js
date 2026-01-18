import mongoose from 'mongoose'
import Task from './Task.js';
import Utkarsh from './Utkarsh.js';

const DayLogSchema = new mongoose.Schema({
    dateString: {
        type: String,
        required: true,
        unique: true,
        match: /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
    },
    tasks: [Task], // nested array of Task subdocuments
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utkarsh', // reference to user model
        required: true,
    },
}, { 
    timestamps: true // createdAt, updatedAt
});

// Compound unique index (owner + dateString)
DayLogSchema.index({ dateString: 1, owner: 1 }, { unique: true });

export default mongoose.model('DayLog', DayLogSchema);
