/**
 * Speed Trading Session — JavaScript
 *
 * Manages: timers, match cycling, video controls,
 * messaging, and all DOM updates.
 */

/* =====================================================
   Data
   ===================================================== */

import { io } from 'socket.io-client';

const matches = [
  {
    id: 1,
    companyName: 'Pacific Textiles International',
    country: 'Vietnam',
    industry: 'Textiles & Apparel',
    products: ['Organic Cotton', 'Silk Fabrics', 'Sustainable Denim'],
    type: 'exporter',
  },
  {
    id: 2,
    companyName: 'Nordic Manufacturing AB',
    country: 'Sweden',
    industry: 'Industrial Equipment',
    products: ['Precision Tools', 'Machinery Parts', 'Automation Systems'],
    type: 'importer',
  },
  {
    id: 3,
    companyName: 'Sahara Spice Traders',
    country: 'Morocco',
    industry: 'Food & Beverages',
    products: ['Saffron', 'Argan Oil', 'Dried Fruits'],
    type: 'exporter',
  },
];

/* =====================================================
   State
   ===================================================== */

let sessionLeft   = 3600;   // total session: 60 minutes
let matchLeft     = 600;    // per-match: 10 minutes
let currentIdx    = 0;
let muted         = false;
let vidOff        = false;
let saved         = false;
let messages      = [];

/* =====================================================
   Helpers
   ===================================================== */

/**
 * Format seconds to MM:SS string.
 * @param {number} s
 * @returns {string}
 */
function formatTime(s) {
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

/* =====================================================
   Render
   ===================================================== */

/** Populate all match-related DOM elements from matches[currentIdx]. */
function renderMatch() {
  const m = matches[currentIdx];

  document.getElementById('companyName').textContent    = m.companyName;
  document.getElementById('companyType').textContent    = m.type.toUpperCase();
  document.getElementById('companyCountry').textContent = m.country;
  document.getElementById('companyIndustry').textContent = m.industry;
  document.getElementById('videoMatchName').textContent = m.companyName;

  // Product tags
  const tagsEl = document.getElementById('productTags');
  tagsEl.innerHTML = m.products
    .map(p => `<span class="product-tag">${p}</span>`)
    .join('');

  // Reset save state
  saved = false;
  const saveBtn = document.getElementById('saveBtn');
  saveBtn.className = 'btn btn-primary';
  saveBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
    Save This Connection
  `;

  // Reset messages for new match
  messages = [
    { id: '1', from: 'them', text: 'Hello! Great to connect during this session.' },
  ];
  renderMessages();
  renderUpcoming();
}

/** Render the upcoming matches queue. */
function renderUpcoming() {
  const upcoming    = matches.slice(currentIdx + 1);
  const section     = document.getElementById('upcomingSection');
  const list        = document.getElementById('upcomingList');

  if (!upcoming.length) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';
  list.innerHTML = upcoming
    .map(m => `
      <div class="upcoming-card">
        <div class="upcoming-icon">🏢</div>
        <div>
          <div class="upcoming-name">${m.companyName}</div>
          <div class="upcoming-loc">📍 ${m.country}</div>
        </div>
      </div>
    `)
    .join('');
}

/** Render the messages list. */
function renderMessages() {
  const list = document.getElementById('msgList');
  list.innerHTML = messages
    .map(msg => `
      <div class="msg-bubble-wrap ${msg.from === 'me' ? 'me' : ''}">
        <div class="msg-bubble ${msg.from === 'me' ? 'me' : 'them'}">${escapeHtml(msg.text)}</div>
      </div>
    `)
    .join('');
  list.scrollTop = list.scrollHeight;
}

/**
 * Minimal HTML escape to prevent XSS in messages.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* =====================================================
   Actions
   ===================================================== */

/** Switch between 'video' and 'message' modes. */
function setMode(mode) {
  document.getElementById('videoView').style.display  = mode === 'video'   ? '' : 'none';
  document.getElementById('msgView').style.display    = mode === 'message' ? 'flex' : 'none';
  document.getElementById('videoBtnTab').className    = 'mode-btn' + (mode === 'video'   ? ' active' : '');
  document.getElementById('msgBtnTab').className      = 'mode-btn' + (mode === 'message' ? ' active' : '');
}

/** Toggle "Save This Connection" state. */
function toggleSave() {
  saved = !saved;
  const btn = document.getElementById('saveBtn');
  btn.className = 'btn btn-primary' + (saved ? ' saved' : '');
  btn.innerHTML = saved
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M20 6L9 17l-5-5"/>
       </svg> Connection Saved`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M20 6L9 17l-5-5"/>
       </svg> Save This Connection`;
}

/** Advance to the next match (or do nothing if at end). */
function nextMatch() {
  if (currentIdx < matches.length - 1) {
    currentIdx++;
    matchLeft = 600;
    renderMatch();
    updateMatchUI();
  }
}

/** Toggle microphone mute state. */
function toggleMic() {
  muted = !muted;
  document.getElementById('micBtn').className = 'ctrl-btn' + (muted ? ' muted' : '');
}

/** Toggle video on/off state. */
function toggleVid() {
  vidOff = !vidOff;
  document.getElementById('vidBtn').className = 'ctrl-btn' + (vidOff ? ' vid-off' : '');
}

/** Send a chat message from the input field. */
function sendMessage() {
  const input = document.getElementById('msgInput');
  const text  = input.value.trim();
  if (!text) return;

  messages.push({ id: Date.now().toString(), from: 'me', text });
  input.value = '';
  renderMessages();
}


function updateSessionUI() {
  const timerEl = document.getElementById('sessionTimer');
  timerEl.textContent = formatTime(sessionLeft);
  timerEl.className   = 'session-timer' + (sessionLeft <= 300 ? ' urgent' : '');

  const pct = ((3600 - sessionLeft) / 3600) * 100;
  document.getElementById('sessionBar').style.width = pct + '%';

  // SVG arc (r=25, circumference = 2π×25 ≈ 157)
  const offset = 157 - (157 * pct / 100);
  document.getElementById('sessionArc').setAttribute('stroke-dashoffset', offset);
}

/** Update all match-timer DOM elements. */
function updateMatchUI() {
  const urgent = matchLeft <= 60;

  const box = document.getElementById('matchTimerBox');
  box.className = 'match-timer-box' + (urgent ? ' urgent' : '');

  const timerEl = document.getElementById('matchTimer');
  timerEl.textContent = formatTime(matchLeft);
  timerEl.className   = 'match-time' + (urgent ? ' urgent' : '');

  const pct = ((600 - matchLeft) / 600) * 100;
  const bar = document.getElementById('matchBar');
  bar.style.width = pct + '%';
  bar.className   = 'match-progress-fill' + (urgent ? ' urgent' : '');
}



// Session countdown — ticks every second
setInterval(function () {
  if (sessionLeft > 0) {
    sessionLeft--;
    updateSessionUI();
  }
}, 1000);

// Match countdown — ticks every second
setInterval(function () {
  if (matchLeft > 0) {
    matchLeft--;
  } else {
    nextMatch();
    matchLeft = 600;
  }
  updateMatchUI();
}, 1000);


renderMatch();

// Sifiso - connecting the back-end of live trading

const socket = io('http://localhost:3000');

socket.on('lobby_update', ({ onlineCount, matchesMade }) => {
  document.getElementById('online-count').textContent = onlineCount;
  document.getElementById('matches-made').textContent = matchesMade;
});

socket.on('round_tick', ({ timeRemaining, currentRound }) => {
  document.getElementById('timer').textContent = formatTime(timeRemaining);
  document.getElementById('round-label').textContent = `Round ${currentRound}`;
});


socket.emit('register_user', { userId, eventId });


socket.on('status_update', ({ status }) => {
  updateStatusBadge(status); 
});


socket.on('match_found', ({ matchId, partnerId, twilioToken, roomName }) => {
  showMeetingScreen(matchId, partnerId, twilioToken, roomName);
});


socket.on('round_tick', ({ remaining }) => {
  document.getElementById('match-time').textContent = formatTime(remaining);
});


socket.on('round_over', ({ matchId }) => {
  showPostMatchCard(matchId);
});

