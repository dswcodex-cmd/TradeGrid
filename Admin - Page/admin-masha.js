/* ============================================================
   TRADE GRID ADMIN — admin-masha.js
   Masha AI widget logic
   ============================================================ */

const mashaKB = [
  { patterns: ['approve','verification','verify','pending verif'], response: `To approve a verification:\n\n1. 📋 Go to **Pending Verifications** in the right panel\n2. Click on the business name to view documents\n3. Review all submitted files\n4. Click **Approve** to grant verified status\n\nApproval sends an automatic email to the business.` },
  { patterns: ['suspend','ban','deactivate','block user'], response: `To suspend a user account:\n\n1. Find the user in **User Management**\n2. Click the ⋮ actions menu on their row\n3. Select **Suspend Account**\n4. Add a reason (sent to the user)\n\n⚠️ Suspended users lose access immediately.` },
  { patterns: ['stat','analytics','numbers','growth','metric'], response: `Current platform stats:\n\n👥 **2,847** total users (+12.5%)\n🏢 **1,423** active businesses (+8.3%)\n🔗 **4,892** total matches (+15.7%)\n💬 **892** messages today (+23.1%)` },
  { patterns: ['reply','respond','employee request'], response: `To reply to an employee request:\n\n1. Switch to **Employee Requests** tab\n2. Click **Reply** on the relevant card\n3. Type your response\n4. Hit **Send** — the employee is notified` },
  { patterns: ['filter','priority','unread','read'], response: `To filter employee requests:\n\n1. Switch to the **Employee Requests** tab\n2. Click the **filter icon** next to the search bar\n3. Select Priority (High/Medium/Low) and/or Status (Read/Unread)\n4. Cards are filtered instantly` },
  { patterns: ['hello','hi','hey'], response: `Hello, Admin! 👋 I'm **Masha**, your Trade Grid AI assistant.\n\nI can help with verifications, user management, employee requests, filtering, and platform stats.\n\nWhat do you need?` },
  { patterns: ['delete','remove user'], response: `To permanently delete a user:\n\n⚠️ **This cannot be undone.**\n\n1. Open **User Management**\n2. Click ⋮ next to the user\n3. Select **Delete Account**\n4. Type DELETE to confirm` },
];

const fallback = `I'm not sure about that specific task. For platform issues, check Documentation or contact the dev team.\n\nAnything else I can help with?`;

function getResponse(input) {
  const lower = input.toLowerCase();
  for (const entry of mashaKB) {
    if (entry.patterns.some(p => lower.includes(p))) return entry.response;
  }
  return fallback;
}

const fab         = document.getElementById('mashaFab');
const win         = document.getElementById('mashaWindow');
const messagesEl  = document.getElementById('mashaMessages');
const inputEl     = document.getElementById('mashaInput');
const sendBtn     = document.getElementById('mashaSend');
const clearBtn    = document.getElementById('mashaClear');
const minimizeBtn = document.getElementById('mashaMinimize');
const chips       = document.querySelectorAll('.masha-chip');
const chipsBar    = document.getElementById('mashaChips');
let isOpen = false;

function toggleChat() {
  isOpen = !isOpen;
  win.classList.toggle('open', isOpen);
  fab.classList.toggle('open', isOpen);
  if (isOpen) {
    const d = fab.querySelector('.fab-dot');
    if (d) d.style.display = 'none';
    setTimeout(() => inputEl.focus(), 300);
  }
}

fab.addEventListener('click', toggleChat);
minimizeBtn.addEventListener('click', toggleChat);

function addMessage(text, sender) {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const row    = document.createElement('div'); row.className = `msg-row ${sender}`;
  const av     = document.createElement('div'); av.className = 'msg-bubble-avatar'; av.textContent = sender === 'bot' ? '🤖' : '🧑‍💼';
  const wrap   = document.createElement('div');
  const bub    = document.createElement('div'); bub.className = 'msg-bubble';
  bub.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  const t = document.createElement('div'); t.className = 'msg-time'; t.textContent = now;
  wrap.appendChild(bub); wrap.appendChild(t);
  if (sender === 'bot') { row.appendChild(av); row.appendChild(wrap); }
  else { row.appendChild(wrap); row.appendChild(av); }
  messagesEl.appendChild(row);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function showTyping() {
  const row = document.createElement('div'); row.className = 'msg-row bot'; row.id = 'typingRow';
  const av  = document.createElement('div'); av.className = 'msg-bubble-avatar'; av.textContent = '🤖';
  const ind = document.createElement('div'); ind.className = 'typing-indicator';
  ind.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  row.appendChild(av); row.appendChild(ind);
  messagesEl.appendChild(row); messagesEl.scrollTop = messagesEl.scrollHeight;
}

function hideTyping() {
  const r = document.getElementById('typingRow'); if (r) r.remove();
}

function sendMessage(text) {
  const msg = (text || inputEl.value).trim(); if (!msg) return;
  addMessage(msg, 'user'); inputEl.value = ''; inputEl.style.height = 'auto';
  sendBtn.disabled = true; chipsBar.style.display = 'none'; showTyping();
  setTimeout(() => { hideTyping(); addMessage(getResponse(msg), 'bot'); sendBtn.disabled = false; inputEl.focus(); }, 800 + Math.random() * 500);
}

sendBtn.addEventListener('click', () => sendMessage());
inputEl.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
inputEl.addEventListener('input', () => { inputEl.style.height = 'auto'; inputEl.style.height = Math.min(inputEl.scrollHeight, 90) + 'px'; sendBtn.disabled = inputEl.value.trim() === ''; });
chips.forEach(c => c.addEventListener('click', () => sendMessage(c.dataset.msg)));
clearBtn.addEventListener('click', () => { messagesEl.innerHTML = ''; chipsBar.style.display = 'flex'; addGreeting(); });

function addGreeting() {
  setTimeout(() => { addMessage(`Hi, Admin! 👋 I'm **Masha**, your Trade Grid AI assistant.\n\nI can help with verifications, user management, employee request filtering, and stats.\n\nWhat do you need?`, 'bot'); }, 400);
}

sendBtn.disabled = true;
addGreeting();
