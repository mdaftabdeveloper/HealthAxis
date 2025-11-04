const Doctor = require('../models/Doctor');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { createAndSendOtp, verifyOtp } = require('../utils/otpService');
const Otp = require('../models/Otp');

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
        await Otp.updateOne({ email, otp }, { $set: { isUsed: true } });
        await Doctor.updateOne({ email }, { isVerified: true });
        res.redirect("/doctor/login");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}


async function doctorLogin(req, res) {
    try {
        const { email, password } = req.body;
        const doctor = await Doctor.findOne({ email });

        if (!doctor) {
            return res.render("doctorLogin", { error: "Invalid email or password" });
        }

        if (!doctor.isVerified) {
            await createAndSendOtp(doctor.email, doctor.name);

            return res.redirect('/verify/doctor');
        }

        const isMatch = await comparePassword(password, doctor.password);
        if (!isMatch) {
            return res.render("doctorLogin", { error: "Invalid email or password" });
        }

        res.render('doctorDashboard', { doctorName: doctor.name });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

module.exports = { registerDoctor, verifyDoctorOtp, doctorLogin };
