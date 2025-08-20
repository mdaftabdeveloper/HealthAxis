const Doctor = require('../models/Doctor');
const { hashPassword } = require('../utils/bcrypt');
async function registerDoctor(req, res) {
    try {
        console.log(req.body);
        let doctor = new Doctor(req.body);
        doctor.password = await hashPassword(req.body.password);
        await doctor.save();
        res.redirect('/doctor/login');
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    registerDoctor
}