const Patient = require('../models/Patient');
const uploadToCloudinary = require('../utils/upload');
const { hashPassword } = require('../utils/bcrypt');
const { createAndSendOtp, verifyOtp } = require('../utils/otpService');
const Otp = require('../models/Otp');

async function registerPatient(req, res) {
    try {
        let imageUrl;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }
        let newPatient = new Patient(req.body);
        newPatient.password = await hashPassword(req.body.password);
        // Save patient data to DB
        newPatient.capturedPhoto = imageUrl;
        await newPatient.save();

        req.session.patientEmail = newPatient.email;
        await createAndSendOtp(newPatient.email, newPatient.fullName);

        res.redirect('/verify/patient');
    } catch (err) {
        console.error("Error registering patient:", err);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

async function verifyPatientOtp(req, res) {
    try {
        const { email, otp } = req.body;

        const isValid = await verifyOtp(email, otp);
        if (!isValid) {
            return res.send("Invalid or expired OTP");
        }
        await Otp.updateOne({ email, otp }, { $set: { isUsed: true } });
        await Patient.updateOne({ email }, { isVerified: true });
        res.redirect("/patient/login");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

module.exports = { registerPatient, verifyPatientOtp };