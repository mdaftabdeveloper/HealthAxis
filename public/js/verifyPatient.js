/**
 * 
 */
const resendBtn = document.getElementById("resendBtn");
let timeLeft = 120;

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
}

function updateTimer() {
    if (timeLeft >= 0) {
        resendBtn.innerText = "Resend OTP (" + formatTime(timeLeft) + ")";
        timeLeft--;
    } else {
        clearInterval(timerInterval);
        resendBtn.disabled = false;
        resendBtn.innerText = "Resend OTP";
    }
}

resendBtn.innerText = "Resend OTP (" + formatTime(timeLeft) + ")";
resendBtn.disabled = true;
const timerInterval = setInterval(updateTimer, 1000);