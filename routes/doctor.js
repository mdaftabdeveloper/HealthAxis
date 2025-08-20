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
router.post('/register/doctor', (req, res) => {
    DoctorController.registerDoctor(req, res);
});
module.exports = router;