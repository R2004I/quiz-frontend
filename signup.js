// register.js

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value; // If you have a role selection

    // Create the user object
    const user = {
        fullName: fullName,
        email: email,
        password: password,
        role: role
    };

    try {
        const response = await fetch('http://localhost:8081/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('password', password);
            const message = await response.text();
            alert(message); // Show success message
            window.location.href = 'index.html#quiz-packages'
        } else {
            const errorMessage = await response.text();
            alert(`Registration failed: ${errorMessage}`); // Show error message
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again later.');
    }
});
