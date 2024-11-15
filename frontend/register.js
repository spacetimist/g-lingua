async function handleRegist(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        alert("Password and confirmation does not match.");
        return; // Stop form submission
    }

    try {
        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            // Save the JWT token in local storage
            localStorage.setItem('token', data.token);

            // Redirect to a protected page or show registration success message
            window.location.href = 'login.html';
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error signing up:', error);
        alert('Register failed');
    }
}
