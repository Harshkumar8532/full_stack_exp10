const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    phone: { type: String },
    addresses: [{
        label: { type: String, enum: ['Home', 'Work', 'Other'], default: 'Other' },
        addressLine: { type: String, required: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
