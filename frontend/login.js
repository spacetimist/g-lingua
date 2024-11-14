async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/auth/login', {
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

            // Redirect to a protected page or show login success message
            window.location.href = 'frontend/dashboard.html';
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Login failed');
    }
}