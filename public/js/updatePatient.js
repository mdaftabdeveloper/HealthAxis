function enableField(id) {
    document.getElementById(id).disabled = false;
    document.getElementById(id).focus();
}

function startEmailVerification() {
    const emailField = document.getElementById("email");
    emailField.disabled = false;
    emailField.focus();

    alert("OTP verification will be required after entering a new email.");
    // In backend: send OTP -> verify before saving changes
}

document.getElementById("capturedPhoto").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById("photoPreview").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("editForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
        const res = await fetch(`/patients/update/<%= patient._id %>`, {
            method: "PUT",
            body: formData,
        });

        if (res.ok) {
            alert("Profile updated successfully!");
            window.location.href = `/patients/view/<%= patient._id %>`;
        } else {
            alert("Error updating profile.");
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong!");
    }
});
