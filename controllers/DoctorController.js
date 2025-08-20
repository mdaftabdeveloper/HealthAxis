const Doctor = require('../models/Doctor');
const { hashPassword } = require('../utils/bcrypt');
const { createAndSendOtp, verifyOtp } = require('../utils/otpService');
async function registerDoctor(req, res) {
    try {
        console.log(req.body);

        let doctor = new Doctor(req.body);

        let existingDoctor = await Doctor.findOne({ email: doctor.email });
        if (existingDoctor) {
            return res.end("Doctor already exists");
        }

        doctor.password = await hashPassword(req.body.password);

        await doctor.save();

        req.session.doctorEmail = doctor.email;
        await createAndSendOtp(doctor.email, doctor.name);

        res.redirect('/verify/doctor');
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}
async function verifyDoctorOtp(req, res) {
    try {
        const { email, otp } = req.body;

        const isValid = await verifyOtp(email, otp);
        if (!isValid) {
            return res.send("Invalid or expired OTP");
        }

        await Doctor.updateOne({ email }, { isVerified: true });
        res.redirect("/doctor/login");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

module.exports = { registerDoctor, verifyDoctorOtp };
