// login.js

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create the Basic Auth header
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(email + ':' + password));
    headers.append('Content-Type', 'application/json'); // Specify the content type

    // Create the login data object
    const loginData = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('http://localhost:8081/api/login', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(loginData) // Send email and password in the body
        });

        if (response.ok) {
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('password', password);
            alert('Login successful');
            window.location.href = 'index.html#quiz-packages'; // Redirect on successful login
        } else {
            const errorMessage = await response.text();
            alert(`Login failed: ${errorMessage}`); // Show error message
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please try again later.');
    }
});
