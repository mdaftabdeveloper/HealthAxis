const Receptionist = require('../models/Receptionist');

async function registerReceptionst(req, res) {
    let email = await Receptionist.findOne({ email: req.body.email });
    if (email) {
        res.status(500).send("Receptionist already exists.");
    }

}

module.exports = { registerReceptionst }