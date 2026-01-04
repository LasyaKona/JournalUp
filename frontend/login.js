const form = document.getElementById('loginform');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formdata = new URLSearchParams(new FormData(form));
    const response = await fetch('http://44.220.80.191:3000/loginuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formdata
    });

    if (response.status === 200) {
        const body = await response.json();
        localStorage.setItem('userid', body.userid);
        alert("Login Successful!");
        window.location.href = "feed.html";
    } else {
        alert("Invalid email or password");
    }
});
