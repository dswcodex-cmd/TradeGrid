(function attachSpeedDateApi() {
  function getStoredToken() {
    return (
      window.localStorage.getItem("token")
      || window.sessionStorage.getItem("token")
      || ""
    );
  }

  function getApiBase() {
    // const url = new URL(window.location.href);
    // const queryBase = url.searchParams.get("apiBase");

    // if (queryBase) {
    //   return queryBase.replace(/\/$/, "");
    // }

    // if (window.location.protocol.startsWith("http")) {
    //   return window.location.origin.replace(/\/$/, "");
    // }

    return "http://localhost:5000";
  }

  async function request(path, options = {}) {
    const token = getStoredToken();
    const response = await fetch(`${getApiBase()}${path}`, {
      ...options,
      headers: {
         "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });

    let payload = {};
    try {
      payload = await response.json();
    } catch {
      payload = {};
    }

    if (!response.ok) {
      const error = new Error(payload.error || `Request failed: ${response.status}`);
      error.status = response.status;
      error.payload = payload;
      throw error;
    }
    console.log("API BASE:", getApiBase());
    console.log("PATH:", path);
    console.log("FULL URL:", `${getApiBase()}${path}`);

    return payload;
  }

  window.speedDateApi = {
    getStoredToken,
    getApiBase,
    request,
    getCurrentPulseSession() {
      return request("/events/pulse/current");
    },
    joinCurrentPulseSession(body = { target_markets: [] }) {
      return request("/events/pulse/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
    },
    getEvent(eventId) {
      return request(`/events/${eventId}`);
    },
    registerForEvent(eventId, body = { target_markets: [] }) {
      return request(`/events/${eventId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
    },
    submitMatchOutcome(matchId, decision) {
      return request(`/events/matches/${matchId}/outcome`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ decision })
      });
    }
  };
})();
