const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    patientId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    mobile: { type: String, required: true },
    aadhar: { type: String, required: true },
    referredBy: { type: String, required: true },
    password: { type: String, required: true },
    capturedPhoto: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
    createdAt: Date,
    updatedAt: Date
});

patientSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('Patient', patientSchema);