const video = document.getElementById("video");
const captureBtn = document.getElementById("captureBtn");
const capturedImage = document.getElementById("capturedImage");
let capturedPhotoBlob = null;

// Start webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing camera:", err);
    });

// Capture photo
captureBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");
    capturedImage.src = imageData;
    capturedPhotoBlob = await (await fetch(imageData)).blob();
});

// Handle form submit
document.getElementById("patientForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate
    if (!capturedPhotoBlob) {
        alert("Please capture a photo before submitting.");
        return;
    }

    const form = e.target;
    const formData = new FormData(form);

    // Append captured photo
    formData.append("photo", capturedPhotoBlob, "captured.png");

    try {
        const res = await fetch("/register/patient", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            window.location.href = "/verify/patient";
        } else {
            alert("Something went wrong. Please try again.");
        }
    } catch (err) {
        console.error("Upload failed:", err);
        alert("Something went wrong. Please try again.");
    }
});

// Age calculation
function calculateAge() {
    const dob = document.getElementById('dob').value;
    if (dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        document.getElementById('age').value = age;
        generatePatientId();
    }
}

// Patient ID generation
function generatePatientId() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    const id = `${yyyy}${mm}${dd}HA${random}`;
    document.getElementById('patientId').value = id;
}

// Password match live check
const pwdInput = document.getElementById('password');
const cpwdInput = document.getElementById('confirmPassword');
const passwordError = document.getElementById('passwordError');

cpwdInput.addEventListener('input', () => {
    if (cpwdInput.value === "") {
        passwordError.textContent = "";
        passwordError.className = "";
        return;
    }
    if (pwdInput.value === cpwdInput.value) {
        passwordError.textContent = "Passwords match!";
        passwordError.className = "success";
    } else {
        passwordError.textContent = "Passwords do not match!";
        passwordError.className = "error";
    }
});

// Form validation helper
function validateForm() {
    if (pwdInput.value !== cpwdInput.value) {
        passwordError.textContent = "Passwords do not match!";
        passwordError.className = "error";
        return false;
    }
    return true;
}
