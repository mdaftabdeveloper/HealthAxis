const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: String,
    otp: String,
    createdAt: { type: Date, default: Date.now, expires: 600 }
});

module.exports = mongoose.model('Otp', otpSchema);
