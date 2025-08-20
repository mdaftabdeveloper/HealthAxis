const Otp = require("../models/Otp");
const { sendMail } = require("./mailer");

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function createAndSendOtp(email, name) {
    const otpCode = generateOtp();

    await Otp.create({ email, otp: otpCode });

    const subject = "Health Axis - Email Verification OTP";
    const message = `
  Hello Dr. ${name},

  Your OTP for verifying your Health Axis account is: ${otpCode}

  This OTP will expire in 10 minutes.
  If you did not register, please ignore this email.

  Regards,
  Health Axis Team
  `;

    await sendMail(email, subject, message);

    return otpCode;
}

async function verifyOtp(email, otp) {
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) return false;

    // await Otp.deleteMany({ email });
    // return true;
}

module.exports = { createAndSendOtp, verifyOtp };
