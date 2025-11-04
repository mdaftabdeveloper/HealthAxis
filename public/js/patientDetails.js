const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

let isEditing = false;

// Editable fields
const fields = ["fullName", "email", "dob", "age", "gender", "mobile", "aadhar", "referredBy"];

editBtn.addEventListener("click", () => {
    fields.forEach(id => {
        const span = document.getElementById(id);
        const value = span.textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.value = value;
        input.id = id;
        span.replaceWith(input);
    });

    editBtn.classList.add("hidden");
    saveBtn.classList.remove("hidden");
    cancelBtn.classList.remove("hidden");
    isEditing = true;
});

cancelBtn.addEventListener("click", () => {
    location.reload(); // refresh page to reset data
});

saveBtn.addEventListener("click", async () => {
    const updatedData = {};
    fields.forEach(id => {
        updatedData[id] = document.getElementById(id).value;
    });

    try {
        const res = await fetch(`/patients/update/${patientData._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });
        if (res.ok) {
            alert("Patient details updated successfully!");
            location.reload();
        } else {
            alert("Failed to update details.");
        }
    } catch (err) {
        console.error(err);
        alert("Error updating details.");
    }
});
