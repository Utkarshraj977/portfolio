const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UtkarshSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, 
    role: { type: String, default: 'admin' },
}, { timestamps: true });

UtkarshSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});



UtkarshSchema.methods.comparePassword = function(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
};

module.exports = mongoose.model('Utkarsh', UtkarshSchema);