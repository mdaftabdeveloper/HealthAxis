// routes/doctorRoute.js
const express = require('express');
const path = require('path');
const router = express.Router();
const DoctorController = require('../controllers/DoctorController');

router.get('/doctor/login', (req, res) => {
    res.render('doctorLogin');
});

router.get('/doctor/registration', (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "doctorRegistration.html"));
});

router.post('/register/doctor', DoctorController.registerDoctor);

router.get("/verify/doctor", (req, res) => {
    if (!req.session.doctorEmail) {
        return res.redirect("/doctor/login");
    }
    res.render("verifyDoctor", { doctorEmail: req.session.doctorEmail });
});

router.post("/verify/doctor", DoctorController.verifyDoctorOtp);

module.exports = router;
