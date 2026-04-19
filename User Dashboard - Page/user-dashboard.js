// ── Page Navigation ──
const navItems = document.querySelectorAll('.nav-item[data-page]');
const pages    = document.querySelectorAll('.page');

function navigateTo(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  navItems.forEach(n => n.classList.remove('active'));

  const targetPage = document.getElementById('page-' + pageId);
  const targetNav  = document.querySelector(`.nav-item[data-page="${pageId}"]`);

  if (targetPage) targetPage.classList.add('active');
  if (targetNav)  targetNav.classList.add('active');

  // Close sidebar on mobile after navigation
  sidebar.classList.remove('open');
}

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(item.dataset.page);
  });
});

// Inline "View all" / "discover" links
document.querySelectorAll('[data-page]').forEach(el => {
  if (el.classList.contains('nav-item')) return; // already handled
  el.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(el.dataset.page);
  });
});

// ── Sidebar Toggle (mobile) ──
const sidebar       = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && e.target !== sidebarToggle) {
    sidebar.classList.remove('open');
  }
});

// ── Logout ──
document.getElementById('logoutBtn').addEventListener('click', () => {
  if (confirm('Are you sure you want to log out?')) {
    window.location.href = '../Login - Page/login.html';
  }
});

// ── Masha AI mini widget ──
const mashaFab      = document.getElementById('mashaFab');
const mashaWindow   = document.getElementById('mashaWindow');
const mashaClose    = document.getElementById('mashaClose');
const mashaInput    = document.getElementById('mashaWinInput');
const mashaSend     = document.getElementById('mashaWinSend');
const mashaMessages = document.getElementById('mashaWinMessages');
const openMasha     = document.getElementById('openMasha');

let mashaOpen = false;

const mashaKB = [
  { patterns: ['verify','document','license'], response: 'To complete verification, go to the Verification section in the sidebar and upload your remaining documents. Our team reviews within 48 hours. ✅' },
  { patterns: ['match','partner','find','connect'], response: 'Visit the Discover page to find new trading partners, or check My Matches to see your AI-curated suggestions! 🤝' },
  { patterns: ['message','chat','contact'], response: 'Head to the Messages section to chat with your trading partners directly on Trade Grid. 💬' },
  { patterns: ['analytic','insight','stat'], response: 'Your Analytics page shows profile views, match rates, and trending market data. Check it out in the sidebar! 📊' },
  { patterns: ['hello','hi','hey'], response: 'Hi there! 👋 I\'m Masha. I can help you navigate Trade Grid — verification, matches, messages, anything!' },
  { patterns: ['help','how'], response: 'I can help with: finding trading partners, verification status, reading analytics, or messaging. What do you need? 🌐' },
];

function mashaGetResponse(text) {
  const lower = text.toLowerCase();
  for (const entry of mashaKB) {
    if (entry.patterns.some(p => lower.includes(p))) return entry.response;
  }
  return 'I\'m not sure about that, but you can contact our support team at support@tradegrid.com. Is there anything else I can help with? 😊';
}

function mashaAddMsg(text, sender) {
  const row = document.createElement('div');
  row.style.cssText = `display:flex; gap:8px; align-items:flex-end; flex-direction:${sender==='user'?'row-reverse':'row'};`;

  const avatar = document.createElement('div');
  avatar.style.cssText = `width:26px;height:26px;border-radius:50%;background:${sender==='bot'?'rgba(13,59,59,0.1)':'#0D3B3B'};display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;`;
  avatar.textContent = sender === 'bot' ? '🤖' : '👤';

  const bubble = document.createElement('div');
  bubble.style.cssText = `max-width:80%;padding:9px 13px;border-radius:14px;font-size:12px;line-height:1.55;${sender==='bot'?'background:#F0FAFB;border:1px solid rgba(13,59,59,0.1);color:#1A1A1A;border-bottom-left-radius:4px;':'background:#0D3B3B;color:#fff;border-bottom-right-radius:4px;'}`;
  bubble.textContent = text;

  if (sender === 'bot') { row.appendChild(avatar); row.appendChild(bubble); }
  else { row.appendChild(bubble); row.appendChild(avatar); }

  mashaMessages.appendChild(row);
  mashaMessages.scrollTop = mashaMessages.scrollHeight;
}

function mashaSendMsg() {
  const text = mashaInput.value.trim();
  if (!text) return;
  mashaAddMsg(text, 'user');
  mashaInput.value = '';
  setTimeout(() => mashaAddMsg(mashaGetResponse(text), 'bot'), 700);
}

function toggleMasha() {
  mashaOpen = !mashaOpen;
  mashaWindow.classList.toggle('open', mashaOpen);
  const iconOpen  = mashaFab.querySelector('.icon-open');
  const iconClose = mashaFab.querySelector('.icon-close');
  if (iconOpen)  iconOpen.style.display  = mashaOpen ? 'none' : 'flex';
  if (iconClose) iconClose.style.display = mashaOpen ? 'flex' : 'none';
  const pulse = mashaFab.querySelector('.fab-pulse');
  if (pulse) pulse.style.display = 'none';
  if (mashaOpen && mashaMessages.children.length === 0) {
    setTimeout(() => mashaAddMsg('Hi! 👋 I\'m Masha. How can I help you today?', 'bot'), 300);
  }
}

mashaFab.addEventListener('click', toggleMasha);
mashaClose.addEventListener('click', toggleMasha);
openMasha.addEventListener('click', toggleMasha);

mashaSend.addEventListener('click', mashaSendMsg);
mashaInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); mashaSendMsg(); }
});

// ── Notification panel ──
const notifBtn   = document.getElementById('notifBtn');
const notifPanel = document.getElementById('notifPanel');
const notifMarkAll = document.getElementById('notifMarkAll');
const notifCountEl = document.getElementById('notifCount');

notifBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  notifPanel?.classList.toggle('hidden');
  // close avatar menu if open
  avatarMenu?.classList.add('hidden');
});

notifMarkAll?.addEventListener('click', () => {
  document.querySelectorAll('.notif-item.unread').forEach(n => n.classList.remove('unread'));
  if (notifCountEl) { notifCountEl.textContent = '0'; notifCountEl.style.display = 'none'; }
  showUserToast('All notifications marked as read');
});

document.addEventListener('click', (e) => {
  if (!notifPanel?.contains(e.target) && e.target !== notifBtn) {
    notifPanel?.classList.add('hidden');
  }
});

// ── Topbar search ──
const topbarSearchBtn   = document.getElementById('topbarSearchBtn');
const topbarSearchInput = document.getElementById('topbarSearchInput');

topbarSearchBtn?.addEventListener('click', () => {
  const q = topbarSearchInput?.value.trim();
  if (q) {
    showUserToast(`Searching for "${q}"...`);
    navigateTo('discover');
  }
});

topbarSearchInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') topbarSearchBtn?.click();
});

// ── Avatar click → navigate to profile ──
const avatarBtn = document.getElementById('avatarBtn');
avatarBtn?.addEventListener('click', () => navigateTo('profile'));

// ── Toast for user dashboard ──
function showUserToast(msg) {
  let t = document.getElementById('userToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'userToast';
    t.style.cssText = `position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(20px);background:#0D3B3B;color:#fff;padding:11px 22px;border-radius:10px;font-size:13px;font-weight:500;font-family:'Inter',sans-serif;box-shadow:0 8px 24px rgba(13,59,59,0.25);opacity:0;transition:opacity 0.2s,transform 0.2s;z-index:9000;`;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(20px)'; }, 2500);
}

// ── Profile page: edit buttons ──
document.querySelectorAll('.profile-sec-edit').forEach(btn => {
  btn.addEventListener('click', () => {
    showUserToast(`Editing ${btn.dataset.field || 'section'}...`);
  });
});

document.getElementById('editProfileBtn')?.addEventListener('click', () => {
  showUserToast('Opening profile editor...');
});

// ── Verification page functions ──
function viewDocument(name) {
  showUserToast(`Opening ${name}...`);
}

function replaceDocument(name) {
  showUserToast(`Select a new file for: ${name}`);
}

function uploadSpecific(name) {
  showUserToast(`Upload dialog for: ${name}`);
}

document.getElementById('uploadDocBtn')?.addEventListener('click', () => {
  showUserToast('Choose a document to upload...');
});

// ── Analytics: period tabs ──
document.querySelectorAll('.period-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.period-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    showUserToast(`Showing ${tab.textContent} analytics`);
  });
});

// ── Analytics: export ──
document.querySelector('.btn-export-report')?.addEventListener('click', () => {
  showUserToast('Preparing report for download...');
});

// ── Settings toggles ──
document.querySelectorAll('.toggle input').forEach(toggle => {
  toggle.addEventListener('change', () => {
    const label = toggle.closest('.setting-row')?.querySelector('p')?.textContent || 'Setting';
    showUserToast(`${label} ${toggle.checked ? 'enabled' : 'disabled'}`);
  });
});

// ── Messages page: send chat ──
const chatInput = document.querySelector('.msg-chat-input input');
const chatSend  = document.querySelector('.msg-chat-input button');
chatSend?.addEventListener('click', () => {
  const val = chatInput?.value.trim();
  if (!val) return;
  const body = document.querySelector('.msg-chat-body');
  if (body) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble me';
    bubble.textContent = val;
    body.appendChild(bubble);
    body.scrollTop = body.scrollHeight;
  }
  if (chatInput) chatInput.value = '';
  showUserToast('Message sent');
});

chatInput?.addEventListener('keydown', e => { if (e.key === 'Enter') chatSend?.click(); });

// ── Discover: connect buttons ──
document.querySelectorAll('.btn-ph-primary').forEach(btn => {
  btn.addEventListener('click', () => {
    const company = btn.closest('.placeholder-card')?.querySelector('h4')?.textContent || 'company';
    showUserToast(`Connection request sent to ${company}`);
    btn.innerHTML = '<i class="ri-check-line"></i> Requested';
    btn.disabled = true;
    btn.style.opacity = '0.7';
  });
});

// ── Message list: conversation switch ──
document.querySelectorAll('.msg-list-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.msg-list-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const unread = item.querySelector('.ml-unread');
    if (unread) unread.remove();
  });
});
