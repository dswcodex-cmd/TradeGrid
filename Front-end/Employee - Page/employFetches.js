const BASE_URL = "http://localhost:5000/admin";


// reusable helper
function getToken() {
    return localStorage.getItem("adminToken");
}
async function apiRequest(endpoint, method = "GET", body = null, requiresAuth = true) {

    const headers = {
        "Content-Type": "application/json"
    };

    // ONLY attach JWT if required
    if (requiresAuth) {
        const token = getToken();

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    const options = {
        method,
        headers
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(
        `http://localhost:5000/admin${endpoint}`,
        options
    );

    const data = await response.json();

    return {
        ok: response.ok,
        status: response.status,
        data
    };
}

// COMPANY ROUTES
export async function getMyProfile() {
    return await apiRequest("/me");
}

export async function getCompanies() {
    return await apiRequest("/companies");
}

export async function getCompanyById(companyId) {
    return await apiRequest(`/companies/${companyId}`);
}

export async function updateCompany(companyId, updatedData) {

    return await apiRequest(
        `/companies/${companyId}`,
        "PATCH",
        updatedData
    );

}

export async function deleteCompany(companyId) {

    return await apiRequest(
        `/companies/${companyId}`,
        "DELETE"
    );

}

//VERIFICATION ROUTES                
export async function getVerificationDocuments() {

    return await apiRequest("/verification");

}

export async function reviewVerificationDocument(
    documentId,
    reviewData
) {

    return await apiRequest(
        `/verification/${documentId}/review`,
        "PATCH",
        reviewData
    );

}

// SUPPORT TICKETS
export async function getSupportTickets() {

    return await apiRequest("/support/tickets");

}

export async function getSupportTicketById(ticketId) {

    return await apiRequest(
        `/support/tickets/${ticketId}`
    );

}

export async function assignSupportTicket(
    ticketId,
    assignData
) {

    return await apiRequest(
        `/support/tickets/${ticketId}/assign`,
        "PATCH",
        assignData
    );

}

//admin change ticket status
export async function updateSupportTicketStatus(
    ticketId,
    statusData
) {

    return await apiRequest(
        `/support/tickets/${ticketId}/status`,
        "PATCH",
        statusData
    );

}

//
export async function replyToSupportTicket(
    ticketId,
    messageData
) {

    return await apiRequest(
        `/support/tickets/${ticketId}/messages`,
        "POST",
        messageData
    );

}
