// Registration logic
export function register() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    updateAuthUI(); // Update authentication UI status
}

// Handle the registration form submission
async function handleRegister(e) {
    e.preventDefault(); // Prevent the default form submission (GET request)
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Password matching validation
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

// Update UI to reflect the authentication status
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

// Password matching validation before form submit (only for registration form)
document.getElementById('registerForm').addEventListener('submit', function(event) {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        event.preventDefault(); // Prevent form submission
    }
});


window.onload = () => {
    register();  // This will execute the register function
};