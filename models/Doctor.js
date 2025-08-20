const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: { type: String, required: true },
    dob: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    specialization: { type: String },
    password: { type: String, required: true },
    address: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    createdAt: Date,
    updatedAt: Date
});

doctorSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('Doctor', doctorSchema);