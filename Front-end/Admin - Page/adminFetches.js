const BASE_URL = "/admin";


// TOKEN HELPER
function getToken() {
    return localStorage.getItem("adminToken");
}

// GENERIC API REQUEST
async function apiRequest(
    endpoint,
    method = "GET",
    bodyData = null,
    requiresAuth = true
) {

    const headers = {
        "Content-Type": "application/json"
    };

    // attach token if needed
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

    if (bodyData) {
        options.body = JSON.stringify(bodyData);
    }

    try {

        const response = await fetch(
            `${BASE_URL}${endpoint}`,
            options
        );

        const result = await response.json();

        return {
            ok: response.ok,
            status: response.status,
            data: result
        };

    } catch (error) {

        return {
            ok: false,
            error: error.message
        };

    }

}


/////////////////////////////////////////////////
// PUBLIC ROUTES
/////////////////////////////////////////////////

export async function bootstrapAdmin(adminData) {

    return await apiRequest(
        "/bootstrap",
        "POST",
        adminData,
        false
    );

}


export async function adminLogin(loginData) {

    return await apiRequest(
        "/login",
        "POST",
        loginData,
        false
    );

}

/////////////////////////////////////////////////
// PROFILE
/////////////////////////////////////////////////

export async function getMyProfile() {

    return await apiRequest("/me");

}

/////////////////////////////////////////////////
// STAFF MANAGEMENT
/////////////////////////////////////////////////

export async function getStaff() {

    return await apiRequest("/staff");

}

export async function createStaff(staffData) {

    return await apiRequest(
        "/staff",
        "POST",
        staffData
    );

}

export async function updateStaff(
    adminId,
    updatedData
) {

    return await apiRequest(
        `/staff/${adminId}`,
        "PATCH",
        updatedData
    );

}

/////////////////////////////////////////////////
// COMPANIES
/////////////////////////////////////////////////

export async function getCompanies() {

    return await apiRequest("/companies");

}

export async function getCompanyMatches() {

    return await apiRequest("/company-matches");

}

export async function getCompanyById(companyId) {

    return await apiRequest(
        `/companies/${companyId}`
    );

}

export async function updateCompany(
    companyId,
    updatedData
) {

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

// EVENTS
export async function getEvents() {

    return await apiRequest("/events");

}

export async function createEvent(eventData) {

    return await apiRequest(
        "/events",
        "POST",
        eventData
    );

}

// VERIFICATION
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

    return await apiRequest(
        "/support/tickets"
    );

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
