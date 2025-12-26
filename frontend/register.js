console.log("Register JS loaded");

const form = document.getElementById('registrationform');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Register form submitted");

    const formdata = new URLSearchParams(new FormData(form));

    const response = await fetch('http://localhost:3000/registeruser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formdata
    });

    console.log("Status:", response.status);

    if (response.status === 200) {
        window.location.href = "login.html";
    } else {
        alert("Registration failed");
    }
});
