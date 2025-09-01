const express = require('express');
const router = express.Router();
const ReceptionistController = require('../controllers/ReceptionistController');

router.get('/receptionist/login', (req, res) => {
    res.render('receptionistLogin');
});

router.get('/receptionist/registration', (req, res) => {
    res.render('receptionistRegistration');
});

router.post('register/receptionist', (req, res) => {
    ReceptionistController.registerReceptionist(req, res);
});

module.exports = router;