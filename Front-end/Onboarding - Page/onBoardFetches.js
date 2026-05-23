const BASE_URL = "http://localhost:5000/auth";

// reusable helper
async function apiRequest(endpoint, method = "GET", body = null) {

    const headers = {
        "Content-Type": "application/json"
    };

    const options = {
        method,
        headers
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(
        `${BASE_URL}${endpoint}`,
        options
    );

    const data = await response.json();

    return {
        ok: response.ok,
        status: response.status,
        data
    };
}

// SIGNUP
export async function signupUser(userData) {
    return await apiRequest("/signup", "POST", userData);
}

// SEND EMAIL CODE
export async function sendEmailVerification(emailData) {
    return await apiRequest(
        "/send-email-verification",
        "POST",
        emailData
    );
}

// VERIFY EMAIL CODE
export async function verifyEmailCode(codeData) {
    return await apiRequest(
        "/verify-email-code",
        "POST",
        codeData
    );
}
