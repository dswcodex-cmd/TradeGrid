// ─── Init Lucide Icons ───
lucide.createIcons();

// ─── Match Data ───
const matchData = {
  1: { companyName: 'Global Textiles Co.', country: 'India' },
  2: { companyName: 'TechElectronics Ltd', country: 'Germany' },
  3: { companyName: 'Pacific Foods Export', country: 'Vietnam' },
  4: { companyName: 'Nordic Manufacturing AB', country: 'Sweden' },
};

// ─── Messages State ───
const messages = {
  1: [
    { id: '1', senderId: '1', text: 'Hello! We are interested in your textile products.', timestamp: new Date('2026-04-15T10:30:00') },
    { id: '2', senderId: 'user-1', text: 'Thank you for reaching out! We would love to discuss potential collaboration.', timestamp: new Date('2026-04-15T11:15:00') },
  ],
  2: [
    { id: '1', senderId: '2', text: 'We are looking for suppliers in your industry. Can we schedule a call?', timestamp: new Date('2026-04-14T14:20:00') },
  ],
  3: [],
  4: [],
};

// ─── Current Open Match ───
let currentMatchId = null;

// ─── DOM References ───
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');
const modalCompanyName = document.getElementById('modalCompanyName');
const modalCountry = document.getElementById('modalCountry');
const messagesArea = document.getElementById('messagesArea');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');

// ─── Open Modal ───
function openModal(matchId) {
  currentMatchId = matchId;
  const match = matchData[matchId];

  modalCompanyName.textContent = match.companyName;
  modalCountry.textContent = match.country;

  renderMessages(matchId);

  modalOverlay.classList.remove('hidden');
  msgInput.focus();

  // Re-init icons inside modal
  lucide.createIcons();
}

// ─── Close Modal ───
function closeModalFn() {
  modalOverlay.classList.add('hidden');
  currentMatchId = null;
  msgInput.value = '';
  updateSendBtn();
}

// ─── Render Messages ───
function renderMessages(matchId) {
  const msgs = messages[matchId] || [];
  messagesArea.innerHTML = '';

  if (msgs.length === 0) {
    messagesArea.innerHTML = `
      <div style="text-align:center; color: rgba(15,23,42,0.4); font-size: 0.875rem; padding: 2rem 0;">
        No messages yet. Start the conversation!
      </div>
    `;
    return;
  }

  msgs.forEach(msg => {
    const isSent = msg.senderId === 'user-1';
    const time = msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const row = document.createElement('div');
    row.className = `msg-row ${isSent ? 'sent' : 'received'}`;

    if (!isSent) {
      row.innerHTML += `
        <div class="msg-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
      `;
    }

    row.innerHTML += `
      <div class="msg-bubble-wrap">
        <div class="msg-bubble">${escapeHtml(msg.text)}</div>
        <div class="msg-time">${time}</div>
      </div>
    `;

    if (isSent) {
      row.innerHTML += `
        <div class="msg-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
      `;
    }

    messagesArea.appendChild(row);
  });

  // Scroll to bottom
  messagesArea.scrollTop = messagesArea.scrollHeight;
}

// ─── Send Message ───
function sendMessage() {
  const text = msgInput.value.trim();
  if (!text || currentMatchId === null) return;

  const msg = {
    id: Date.now().toString(),
    senderId: 'user-1',
    text,
    timestamp: new Date(),
  };

  if (!messages[currentMatchId]) messages[currentMatchId] = [];
  messages[currentMatchId].push(msg);

  msgInput.value = '';
  updateSendBtn();
  renderMessages(currentMatchId);
}

// ─── Update Send Button State ───
function updateSendBtn() {
  sendBtn.disabled = !msgInput.value.trim();
}

// ─── Escape HTML ───
function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

// ─── Event Listeners ───

// Message buttons on match cards
document.querySelectorAll('.msg-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const matchId = parseInt(btn.dataset.matchId);
    openModal(matchId);
  });
});

// Close modal button
closeModal.addEventListener('click', closeModalFn);

// Close modal on overlay click
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModalFn();
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
    closeModalFn();
  }
});

// Send button click
sendBtn.addEventListener('click', sendMessage);

// Enter key to send
msgInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// Enable/disable send button based on input
msgInput.addEventListener('input', updateSendBtn);

// ─── Init ───
updateSendBtn();
