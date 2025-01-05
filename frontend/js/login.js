
function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    console.log(loginForm);  // Log to check if the form is found

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    } else {
        console.error('Login form not found!');
    }
}

async function handleLogin(e) {
    e.preventDefault(); // Prevent form from submitting with a GET request

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = {
        username: username,
        password: password
    };

    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',  // Ensure this is a POST request
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const contentType = response.headers.get('Content-Type');

            // If the response is JSON
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('authToken', data.token); // Assuming the backend returns a token
                window.location.href = '../index.html';
            } else {
                // If the response is not JSON (likely a token)
                const token = await response.text(); // Get response as plain text (JWT token)
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('authToken', token); // Save the token
                window.location.href = '../index.html';
            }
        } else {
            const error = await response.json();
            alert(`Login failed: ${error.message}`);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}


window.onload = () => {
    initializeLogin()  // This will execute the register function
};