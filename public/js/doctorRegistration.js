// Auto-calculate age
document.getElementById('dob').addEventListener('change', function () {
    const dob = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    document.getElementById('age').value = age;
});

// Live password match check
const pwd = document.getElementById('password');
const confirmPwd = document.getElementById('confirmPassword');
const msg = document.getElementById('passwordMatchMsg');

function checkPasswordMatch() {
    if (confirmPwd.value === "") {
        msg.textContent = "";
        return;
    }
    if (pwd.value === confirmPwd.value) {
        msg.textContent = "Passwords match";
        msg.style.color = "green";
    } else {
        msg.textContent = "Passwords do not match";
        msg.style.color = "red";
    }
}

pwd.addEventListener('input', checkPasswordMatch);
confirmPwd.addEventListener('input', checkPasswordMatch);

// Prevent submit if mismatch
document.querySelector('form').addEventListener('submit', function (e) {
    if (pwd.value !== confirmPwd.value) {
        alert("Passwords don't match!");
        e.preventDefault();
    }
});
