const express = require('express');
const PatientController = require('../controllers/PatientController');
const router = express.Router();
const upload = require('../middlewares/multer');

router.get('/patient/login', (req, res) => {
    res.render('patientLogin');
});

router.post('/patient/login', (req, res) => {
    PatientController.patientLogin(req, res);
});
router.get('/patient/registration', (req, res) => {
    res.render('patientRegistration');
});

// Patient registration route
router.post("/register/patient", upload.single("photo"), (req, res) => {
    PatientController.registerPatient(req, res);
});

router.get("/verify/patient", (req, res) => {
    if (!req.session.patientEmail) {
        return res.redirect("/patient/login");
    }
    res.render("verifyPatient", { patientEmail: req.session.patientEmail });
});

router.post("/verify/patient", PatientController.verifyPatientOtp);

router.get("/patient/details/:_id", (req, res) => {
    PatientController.patientDetails(req, res);
});

router.get("/update/patient/:_id", (req, res) => {
    PatientController.updatePatient(req, res);
});

router.post("/update/patient/:_id", (req, res) => {
    console.log("Route hitted");
    PatientController.savePatient(req, res);
});
module.exports = router;