// Example: Assuming you have a login function that sends credentials to /auth/login
async function loginUser(email, password) {
    try {
        const response = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // FastAPI's OAuth2PasswordRequestForm expects this
            },
            body: new URLSearchParams({
                username: email, // FastAPI expects 'username' here
                password: password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Login failed');
        }

        const data = await response.json();
        const accessToken = data.access_token;
        const userRole = data.role; // You might want to save the role too
        const userId = data.user_id;
        const clinicId = data.clinic_id;


        // --- IMPORTANT: Save the access token ---
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userRole', userRole); // Save role if needed
        localStorage.setItem('userId', userId); // Save user ID
        localStorage.setItem('clinicId', clinicId); // Save clinic ID

        console.log('Login successful! Token saved.');
        return data; // Return user data/token for further use
    } catch (error) {
        console.error('Error during login:', error);
        throw error; // Re-throw to handle in UI
    }
}

// Example usage somewhere in your UI:
// loginButton.addEventListener('click', async () => {
//     const email = emailInput.value;
//     const password = passwordInput.value;
//     try {
//         const userData = await loginUser(email, password);
//         // Redirect or update UI
//         console.log("Logged in user:", userData);
//     } catch (e) {
//         alert(e.message);
//     }
// });