// User authentication state
let isAuthenticated = false;

export function register() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
  // Check authentication status
    updateAuthUI();
}

export function login() {
    window.onload = initializeLogin;
}

function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    console.log(loginForm);  // Log to check if the form is found

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    } else {
        console.error('Login form not found!');
    }
}


// Handle the registration form submission
async function handleRegister(e) {
    e.preventDefault(); // Prevent the default form submission (GET request)
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const registerData = {
        username: username,
        password: password,
        email: email,
        roles: 'ROLE_USER'
    };

    try {
        // Send POST request to backend API
        const response = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData), // Send data in request body as JSON
        });

        if (response.ok) {
            alert('Registration successful! Please login.');
            window.location.href = 'signin.html';
        } else {
            const error = await response.json();
            alert(`Registration failed: ${error.message}`);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Handle the login form submission
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
            const data = await response.json();
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('authToken', data.token); // Assuming the backend returns a token
            window.location.href = '../index.html';
        } else {
            const error = await response.json();
            alert(`Login failed: ${error.message}`);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function updateAuthUI() {
    const userControls = document.querySelector('.user-controls');
    if (!userControls) return;

    if (localStorage.getItem('isAuthenticated') === 'true') {
        userControls.innerHTML = `
            <span>Welcome!</span>
            <a href="#" onclick="logout()">Logout</a>
        `;
    }
}

function logout() {
    isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken'); // Remove auth token
    window.location.href = '../index.html';
}

// Password matching validation before form submit
document.getElementById('registerForm').addEventListener('submit', function(event) {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        event.preventDefault(); // Prevent form submission
    }
});
