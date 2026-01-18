import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UtkarshSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, 
    role: { type: String, default: 'admin' },
}, { timestamps: true });

// Hash password before saving
UtkarshSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password method
// We only need 'enteredPassword'. 'this.password' is the hash from DB.
UtkarshSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('Utkarsh', UtkarshSchema);