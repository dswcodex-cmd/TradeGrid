const demoMatches = [
  {
    id: "demo-1",
    companyName: "Pacific Textiles International",
    country: "Vietnam",
    industry: "Textiles & Apparel",
    products: ["Organic Cotton", "Silk Fabrics", "Sustainable Denim"],
    type: "exporter"
  },
  {
    id: "demo-2",
    companyName: "Nordic Manufacturing AB",
    country: "Sweden",
    industry: "Industrial Equipment",
    products: ["Precision Tools", "Machinery Parts", "Automation Systems"],
    type: "importer"
  },
  {
    id: "demo-3",
    companyName: "Sahara Spice Traders",
    country: "Morocco",
    industry: "Food & Beverages",
    products: ["Saffron", "Argan Oil", "Dried Fruits"],
    type: "exporter"
  }
];

const state = {
  apiBase: "",
  token: "",
  eventId: "",
  socket: null,
  sessionLeft: 3600,
  matchLeft: 600,
  currentIdx: 0,
  muted: false,
  vidOff: false,
  saved: false,
  messages: [],
  matches: demoMatches,
  currentMatchId: null,
  currentRoomName: null,
  currentTwilioToken: null
};

function getStoredToken() {
  return (
    window.localStorage.getItem("token")
    || window.sessionStorage.getItem("token")
    || ""
  );
}

function getApiBase() {
  const url = new URL(window.location.href);
  const queryBase = url.searchParams.get("apiBase");

  if (queryBase) {
    return queryBase.replace(/\/$/, "");
  }

  if (window.location.protocol.startsWith("http")) {
    return window.location.origin.replace(/\/$/, "");
  }

  return "http://localhost:5000";
}

function getEventIdFromUrl() {
  return new URL(window.location.href).searchParams.get("eventId") || "";
}

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeMatch(match) {
  if (match.companyName) {
    return match;
  }

  const partner = match.partner || {};

  return {
    id: match.id || partner.company_id || `match-${Date.now()}`,
    companyName: partner.company_name || "Waiting for next match",
    country: partner.country || "N/A",
    industry: partner.industry || "N/A",
    products: Array.isArray(partner.products) ? partner.products : [],
    type: partner.business_type || "partner",
    roomName: match.twilio_room_name || null,
    twilioToken: match.twilioToken || null
  };
}

function showWaitingState(messageText = "Finding your next pulse connection...") {
  state.matches = [{
    id: "waiting-state",
    companyName: messageText,
    country: "TradeGrid Pulse",
    industry: "Random networking",
    products: [],
    type: "waiting"
  }];
  state.currentIdx = 0;
  state.currentMatchId = null;
  state.currentRoomName = null;
  state.currentTwilioToken = null;
  state.matchLeft = 600;
  renderMatch();
  updateMatchUI();
}

function renderMessages() {
  const list = document.getElementById("msgList");

  list.innerHTML = state.messages
    .map((message) => `
      <div class="msg-bubble-wrap ${message.from === "me" ? "me" : ""}">
        <div class="msg-bubble ${message.from === "me" ? "me" : "them"}">${escapeHtml(message.text)}</div>
      </div>
    `)
    .join("");

  list.scrollTop = list.scrollHeight;
}

function renderUpcoming() {
  const upcoming = state.matches.slice(state.currentIdx + 1);
  const section = document.getElementById("upcomingSection");
  const list = document.getElementById("upcomingList");

  if (!upcoming.length) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  list.innerHTML = upcoming
    .map((match) => `
      <div class="upcoming-card">
        <div class="upcoming-icon">B2B</div>
        <div>
          <div class="upcoming-name">${escapeHtml(match.companyName)}</div>
          <div class="upcoming-loc">${escapeHtml(match.country)}</div>
        </div>
      </div>
    `)
    .join("");
}

function renderMatch() {
  const match = normalizeMatch(state.matches[state.currentIdx] || demoMatches[0]);
  const tags = Array.isArray(match.products) ? match.products : [];

  document.getElementById("companyName").textContent = match.companyName;
  document.getElementById("companyType").textContent = String(match.type || "partner").toUpperCase();
  document.getElementById("companyCountry").textContent = match.country;
  document.getElementById("companyIndustry").textContent = match.industry;
  document.getElementById("videoMatchName").textContent = match.companyName;
  document.getElementById("productTags").innerHTML = tags
    .map((product) => `<span class="product-tag">${escapeHtml(product)}</span>`)
    .join("");

  state.currentMatchId = match.id || null;
  state.currentRoomName = match.roomName || null;
  state.currentTwilioToken = match.twilioToken || null;
  state.saved = false;

  const saveBtn = document.getElementById("saveBtn");
  saveBtn.className = "btn btn-primary";
  saveBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
    Save This Connection
  `;

  state.messages = [
    { id: "intro", from: "them", text: `Hello from ${match.companyName}.` }
  ];

  renderMessages();
  renderUpcoming();
}

function updateSessionUI() {
  const timerEl = document.getElementById("sessionTimer");
  timerEl.textContent = formatTime(state.sessionLeft);
  timerEl.className = `session-timer${state.sessionLeft <= 300 ? " urgent" : ""}`;

  const percentage = ((3600 - state.sessionLeft) / 3600) * 100;
  document.getElementById("sessionBar").style.width = `${percentage}%`;

  const offset = 157 - (157 * percentage / 100);
  document.getElementById("sessionArc").setAttribute("stroke-dashoffset", offset);
}

function updateMatchUI() {
  const urgent = state.matchLeft <= 60;
  document.getElementById("matchTimerBox").className = `match-timer-box${urgent ? " urgent" : ""}`;
  document.getElementById("matchTimer").textContent = formatTime(state.matchLeft);
  document.getElementById("matchTimer").className = `match-time${urgent ? " urgent" : ""}`;

  const percentage = ((600 - state.matchLeft) / 600) * 100;
  const progressBar = document.getElementById("matchBar");
  progressBar.style.width = `${percentage}%`;
  progressBar.className = `match-progress-fill${urgent ? " urgent" : ""}`;
}

function setMode(mode) {
  document.getElementById("videoView").style.display = mode === "video" ? "" : "none";
  document.getElementById("msgView").style.display = mode === "message" ? "flex" : "none";
  document.getElementById("videoBtnTab").className = `mode-btn${mode === "video" ? " active" : ""}`;
  document.getElementById("msgBtnTab").className = `mode-btn${mode === "message" ? " active" : ""}`;
}

async function submitOutcome(decision) {
  if (!state.token || !state.currentMatchId || state.currentMatchId.startsWith("demo-")) {
    return;
  }

  await fetch(`${state.apiBase}/events/matches/${state.currentMatchId}/outcome`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.token}`
    },
    body: JSON.stringify({ decision })
  });
}

async function toggleSave() {
  state.saved = !state.saved;

  const btn = document.getElementById("saveBtn");
  btn.className = `btn btn-primary${state.saved ? " saved" : ""}`;
  btn.innerHTML = state.saved
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M20 6L9 17l-5-5"/>
       </svg> Connection Saved`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M20 6L9 17l-5-5"/>
       </svg> Save This Connection`;

  if (state.saved) {
    await submitOutcome("YES");
  }
}

async function nextMatch() {
  if (state.socket && state.currentMatchId && !String(state.currentMatchId).startsWith("demo-")) {
    await submitOutcome("NO");
    state.socket.emit("skip_match", { matchId: state.currentMatchId });
    showWaitingState();
    return;
  }

  if (state.currentIdx < state.matches.length - 1) {
    state.currentIdx += 1;
    state.matchLeft = 600;
    renderMatch();
    updateMatchUI();
  }
}

function toggleMic() {
  state.muted = !state.muted;
  document.getElementById("micBtn").className = `ctrl-btn${state.muted ? " muted" : ""}`;
}

function toggleVid() {
  state.vidOff = !state.vidOff;
  document.getElementById("vidBtn").className = `ctrl-btn${state.vidOff ? " vid-off" : ""}`;
}

function sendMessage() {
  const input = document.getElementById("msgInput");
  const text = input.value.trim();

  if (!text) {
    return;
  }

  state.messages.push({
    id: `${Date.now()}`,
    from: "me",
    text
  });

  input.value = "";
  renderMessages();
}

async function apiFetch(path, options = {}) {
  const response = await fetch(`${state.apiBase}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(state.token ? { Authorization: `Bearer ${state.token}` } : {})
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

async function loadSocketClient() {
  if (window.io) {
    return window.io;
  }

  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${state.apiBase}/socket.io/socket.io.js`;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return window.io;
}

function bindSocketHandlers(socket) {
  socket.on("status_update", ({ status }) => {
    console.log("Event status:", status);
  });

  socket.on("match_found", ({ matchId, partner, roomName, twilioToken, roundDurationSeconds }) => {
    const liveMatch = normalizeMatch({
      id: matchId,
      partner,
      twilio_room_name: roomName,
      twilioToken
    });

    state.matches = [liveMatch, ...state.matches.filter((item) => !String(item.id).startsWith("demo-"))];
    state.currentIdx = 0;
    state.matchLeft = Number(roundDurationSeconds || 600);

    renderMatch();
    updateMatchUI();

    if (socket && matchId) {
      socket.emit("meeting_started", { matchId });
    }
  });

  socket.on("round_tick", ({ remaining }) => {
    state.matchLeft = Number(remaining || 0);
    updateMatchUI();
  });

  socket.on("round_over", ({ matchId }) => {
    if (String(matchId) === String(state.currentMatchId)) {
      state.messages.push({
        id: `system-${Date.now()}`,
        from: "them",
        text: "This round has ended. Please record your outcome."
      });
      renderMessages();
    }
  });

  socket.on("match_skipped", ({ matchId }) => {
    if (String(matchId) !== String(state.currentMatchId)) {
      return;
    }

    state.messages.push({
      id: `skip-${Date.now()}`,
      from: "them",
      text: "This match was skipped. Searching for the next company..."
    });
    renderMessages();
    showWaitingState();
  });
}

async function initialiseBackendSession() {
  try {
    let selectedEventId = state.eventId;

    if (!selectedEventId) {
      const pulseResponse = await apiFetch("/events/pulse/current");

      if (!pulseResponse.open_now) {
        throw new Error("Pulse networking is not open right now");
      }

      selectedEventId = pulseResponse.pulse_session?.id || "";
    }

    if (!selectedEventId) {
      return false;
    }

    state.eventId = selectedEventId;

    let eventPayload;

    if (getEventIdFromUrl()) {
      eventPayload = await apiFetch(`/events/${selectedEventId}`);
    } else {
      await apiFetch("/events/pulse/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          target_markets: []
        })
      });

      eventPayload = await apiFetch(`/events/${selectedEventId}`);
    }

    if (!eventPayload.registration && getEventIdFromUrl()) {
      await apiFetch(`/events/${selectedEventId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          target_markets: []
        })
      });

      eventPayload = await apiFetch(`/events/${selectedEventId}`);
    }

    if (Array.isArray(eventPayload.scheduled_matches) && eventPayload.scheduled_matches.length > 0) {
      state.matches = eventPayload.scheduled_matches.map(normalizeMatch);
      state.currentIdx = 0;
      renderMatch();
    }

    if (eventPayload.event?.round_duration_secs) {
      state.matchLeft = Number(eventPayload.event.round_duration_secs);
      updateMatchUI();
    }

    if (eventPayload.event?.title) {
      const titleEl = document.querySelector(".header-title");
      if (titleEl) {
        titleEl.textContent = eventPayload.event.title;
      }
    }

    const socketFactory = await loadSocketClient();
    state.socket = socketFactory(state.apiBase, {
      transports: ["websocket", "polling"]
    });

    bindSocketHandlers(state.socket);

    state.socket.emit("register_user", {
      token: state.token,
      eventId: state.eventId
    });

    state.socket.emit("enter_queue");
    return true;
  } catch (error) {
    console.warn("Falling back to demo speed-dating mode:", error.message);
    return false;
  }
}

function startTimers() {
  setInterval(() => {
    if (state.sessionLeft > 0) {
      state.sessionLeft -= 1;
      updateSessionUI();
    }
  }, 1000);

  setInterval(() => {
    if (state.matchLeft > 0) {
      state.matchLeft -= 1;
    } else if (state.matches.length > 1) {
      nextMatch();
      state.matchLeft = 600;
    }

    updateMatchUI();
  }, 1000);
}

window.setMode = setMode;
window.toggleSave = toggleSave;
window.nextMatch = nextMatch;
window.toggleMic = toggleMic;
window.toggleVid = toggleVid;
window.sendMessage = sendMessage;

async function initialisePage() {
  state.apiBase = getApiBase();
  state.token = getStoredToken();
  state.eventId = getEventIdFromUrl();

  renderMatch();
  updateSessionUI();
  updateMatchUI();
  startTimers();

  if (state.token) {
    await initialiseBackendSession();
  }

  window.addEventListener("beforeunload", () => {
    if (state.socket) {
      state.socket.emit("leave_queue");
      state.socket.disconnect();
    }
  });
}

initialisePage();
