document.addEventListener("DOMContentLoaded", function () {
    // SIGN UP FUNCTION
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("signup-name").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            // Get existing users from localStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if the email is already registered
            if (users.some(user => user.email === email)) {
                alert("Email is already registered. Please sign in.");
                return;
            }

            // Save the new user
            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Account created! You can now sign in.");
            window.location.href = "signin.html"; // Redirect to sign in page
        });
    }

    // SIGN IN FUNCTION
    const signinForm = document.getElementById("signin-form");
    if (signinForm) {
        signinForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("signin-email").value;
            const password = document.getElementById("signin-password").value;

            // Get users from localStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if user exists and password is correct
            const user = users.find(user => user.email === email && user.password === password);
            if (!user) {
                alert("Invalid email or password. Please try again.");
                return;
            }

            // Store the logged-in user
            localStorage.setItem("loggedInUser", JSON.stringify(user));

            alert("Sign in successful!");
            window.location.href = "payment.html"; // Redirect to payment page
        });
    }
});
