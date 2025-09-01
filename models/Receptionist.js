const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamps');

const receptionistSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    address: { type: String, required: true, trim: true },
    isVerified: { type: Boolean, default: false },
    createdAt: Date,
    updateAt: Date
});

receptionistSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model("Receptionist", receptionistSchema);
