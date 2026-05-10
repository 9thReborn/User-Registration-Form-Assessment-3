// ===========================
// USER REGISTRATION FORM — Validation Script
// Uses window.alert() for error messages
// ===========================

/**
 * Wait for the DOM to fully load before attaching event listeners.
 */
document.addEventListener("DOMContentLoaded", function () {
    // Grab the form element
    const form = document.getElementById("registrationForm");

    // Attach the submit event listener
    form.addEventListener("submit", function (event) {
        // Always prevent default so we can validate first
        event.preventDefault();

        // Run validation — if it passes, show success
        if (validateForm()) {
            alert("✅ Registration Successful!\n\nWelcome aboard! Your account has been created.");
            form.reset(); // Clear the form after successful registration
        }
    });
});

// ===========================
// MAIN VALIDATION FUNCTION
// Checks each field in order and alerts the FIRST error found.
// Returns true if ALL validations pass.
// ===========================
function validateForm() {
    // Retrieve input values and trim whitespace
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const age = document.getElementById("age").value.trim();

    // ---------- 1. FULL NAME VALIDATION ----------
    if (!validateFullName(fullName)) {
        return false;
    }

    // ---------- 2. EMAIL VALIDATION ----------
    if (!validateEmail(email)) {
        return false;
    }

    // ---------- 3. PASSWORD VALIDATION ----------
    if (!validatePassword(password)) {
        return false;
    }

    // ---------- 4. CONFIRM PASSWORD VALIDATION ----------
    if (!validateConfirmPassword(password, confirmPassword)) {
        return false;
    }

    // ---------- 5. AGE VALIDATION ----------
    if (!validateAge(age)) {
        return false;
    }

    // All validations passed
    return true;
}

// ===========================
// INDIVIDUAL VALIDATION FUNCTIONS
// Each function alerts a specific error message and returns false on failure.
// ===========================

/**
 * Validates the Full Name field.
 * - Must not be empty.
 * - Must contain at least 2 words.
 * @param {string} fullName - The trimmed full name value.
 * @returns {boolean} True if valid, false otherwise.
 */
function validateFullName(fullName) {
    if (fullName === "") {
        alert("❌ Full Name Error\n\nThe Full Name field cannot be empty.\nPlease enter your full name.");
        document.getElementById("fullName").focus();
        return false;
    }

    // Split the name by spaces and filter out empty strings
    const words = fullName.split(/\s+/).filter(function (word) {
        return word.length > 0;
    });

    if (words.length < 2) {
        alert("❌ Full Name Error\n\nYour full name must contain at least 2 words.\nExample: John Doe");
        document.getElementById("fullName").focus();
        return false;
    }

    return true;
}

/**
 * Validates the Email Address field.
 * - Must follow a valid email format (e.g. example@domain.com).
 * @param {string} email - The trimmed email value.
 * @returns {boolean} True if valid, false otherwise.
 */
function validateEmail(email) {
    if (email === "") {
        alert("❌ Email Error\n\nThe Email Address field cannot be empty.\nPlease enter your email address.");
        document.getElementById("email").focus();
        return false;
    }

    // Standard email regex pattern
    const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
        alert("❌ Email Error\n\nPlease enter a valid email address.\nExample: example@domain.com");
        document.getElementById("email").focus();
        return false;
    }

    return true;
}

/**
 * Validates the Password field.
 * - At least 8 characters long.
 * - Contains at least one uppercase letter.
 * - Contains at least one number.
 * - Contains at least one special character.
 * @param {string} password - The password value (not trimmed, spaces may be intentional).
 * @returns {boolean} True if valid, false otherwise.
 */
function validatePassword(password) {
    if (password === "") {
        alert("❌ Password Error\n\nThe Password field cannot be empty.\nPlease enter a password.");
        document.getElementById("password").focus();
        return false;
    }

    // Collect all the specific issues
    const errors = [];

    if (password.length < 8) {
        errors.push("• At least 8 characters long");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("• At least one uppercase letter (A–Z)");
    }

    if (!/[0-9]/.test(password)) {
        errors.push("• At least one number (0–9)");
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password)) {
        errors.push("• At least one special character (!@#$%^&* etc.)");
    }

    if (errors.length > 0) {
        alert("❌ Password Error\n\nYour password does not meet the following requirements:\n\n" + errors.join("\n"));
        document.getElementById("password").focus();
        return false;
    }

    return true;
}

/**
 * Validates the Confirm Password field.
 * - Must match the Password field exactly.
 * @param {string} password - The original password value.
 * @param {string} confirmPassword - The confirm password value.
 * @returns {boolean} True if valid, false otherwise.
 */
function validateConfirmPassword(password, confirmPassword) {
    if (confirmPassword === "") {
        alert("❌ Confirm Password Error\n\nPlease re-enter your password to confirm it.");
        document.getElementById("confirmPassword").focus();
        return false;
    }

    if (password !== confirmPassword) {
        alert("❌ Confirm Password Error\n\nThe passwords do not match.\nPlease make sure both password fields are identical.");
        document.getElementById("confirmPassword").focus();
        return false;
    }

    return true;
}

/**
 * Validates the Age field.
 * - Must not be empty.
 * - Must be a valid number.
 * - Must be 18 or older.
 * @param {string} age - The trimmed age value.
 * @returns {boolean} True if valid, false otherwise.
 */
function validateAge(age) {
    if (age === "") {
        alert("❌ Age Error\n\nThe Age field cannot be empty.\nPlease enter your age.");
        document.getElementById("age").focus();
        return false;
    }

    const ageNumber = Number(age);

    if (isNaN(ageNumber) || !Number.isInteger(ageNumber)) {
        alert("❌ Age Error\n\nPlease enter a valid whole number for your age.");
        document.getElementById("age").focus();
        return false;
    }

    if (ageNumber < 18) {
        alert("❌ Age Error\n\nYou must be 18 years or older to register.\nYour entered age: " + ageNumber);
        document.getElementById("age").focus();
        return false;
    }

    return true;
}
