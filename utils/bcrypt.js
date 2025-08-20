const bcrypt = require("bcrypt");

const saltRounds = 10; // you can adjust

// Hash password
async function hashPassword(password) {
    try {
        const hashed = await bcrypt.hash(password, saltRounds);
        return hashed;
    } catch (err) {
        throw new Error("Error hashing password: " + err.message);
    }
}

// Compare password with hash
async function comparePassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match; // true or false
    } catch (err) {
        throw new Error("Error comparing passwords: " + err.message);
    }
}

module.exports = { hashPassword, comparePassword };
