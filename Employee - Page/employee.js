// ─── State ───
let currentView = 'tasks';
let currentTab  = 'assigned';
let pushedToAdmin    = new Set();
let selectedPriorities = new Set();
let selectedStatuses   = new Set();

// ─── DOM References ───
const viewBtns          = document.querySelectorAll('.view-btn');
const tasksView         = document.getElementById('tasksView');
const messagesView      = document.getElementById('messagesView');
const taskTabs          = document.getElementById('taskTabs');
const messagesHeader    = document.getElementById('messagesHeader');
const tabs              = document.querySelectorAll('.tab');
const searchInput       = document.getElementById('searchInput');      // task search
const msgSearchInput    = document.getElementById('msgSearchInput');   // message search
const filterBtn         = document.getElementById('filterBtn');
const filterDropdown    = document.getElementById('filterDropdown');
const closeFilter       = document.getElementById('closeFilter');
const clearFiltersBtn   = document.getElementById('clearFilters');
const priorityCheckboxes = document.querySelectorAll('.priority-filter');
const statusCheckboxes   = document.querySelectorAll('.status-filter');
const msgCards          = document.querySelectorAll('.msg-card');
const logoutBtn         = document.getElementById('logoutBtn');

// ─── View Toggle (My Tasks ↔ User Messages) ───
viewBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    currentView = view;

    viewBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (view === 'tasks') {
      tasksView.style.display    = 'flex';
      messagesView.style.display = 'none';
      taskTabs.style.display     = 'block';
      messagesHeader.style.display = 'none';
      filterDropdown.classList.add('hidden');
    } else {
      tasksView.style.display    = 'none';
      messagesView.style.display = 'flex';
      taskTabs.style.display     = 'none';
      messagesHeader.style.display = 'block';
    }
  });
});

// ─── Task Sub-Tabs (Assigned / Pending / Completed) ───
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    currentTab = tab.dataset.tab;

    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Show only cards whose data-tab-content matches the clicked tab
    const allContent = tasksView.querySelectorAll('[data-tab-content]');
    allContent.forEach(el => {
      el.style.display = el.dataset.tabContent === currentTab ? '' : 'none';
    });
  });
});

// ─── Task Search ───
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  const taskCards = tasksView.querySelectorAll('.task-card');
  taskCards.forEach(card => {
    const title = card.querySelector('h4').textContent.toLowerCase();
    const meta  = card.querySelector('.task-meta').textContent.toLowerCase();
    card.style.display = (!query || title.includes(query) || meta.includes(query)) ? '' : 'none';
  });
});

// ─── Message Search ───
msgSearchInput.addEventListener('input', () => {
  filterMessages();
});

// ─── Filter Button Toggle ───
filterBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  filterDropdown.classList.toggle('hidden');
});

closeFilter.addEventListener('click', () => {
  filterDropdown.classList.add('hidden');
});

// Close filter when clicking outside
document.addEventListener('click', (e) => {
  if (!filterDropdown.contains(e.target) && e.target !== filterBtn) {
    filterDropdown.classList.add('hidden');
  }
});

// ─── Priority Filter Checkboxes ───
priorityCheckboxes.forEach(cb => {
  cb.addEventListener('change', () => {
    cb.checked ? selectedPriorities.add(cb.value) : selectedPriorities.delete(cb.value);
    updateFilterBtnState();
    filterMessages();
  });
});

// ─── Status Filter Checkboxes ───
statusCheckboxes.forEach(cb => {
  cb.addEventListener('change', () => {
    cb.checked ? selectedStatuses.add(cb.value) : selectedStatuses.delete(cb.value);
    updateFilterBtnState();
    filterMessages();
  });
});

// ─── Clear All Filters ───
clearFiltersBtn.addEventListener('click', () => {
  selectedPriorities.clear();
  selectedStatuses.clear();
  priorityCheckboxes.forEach(cb => cb.checked = false);
  statusCheckboxes.forEach(cb   => cb.checked = false);
  updateFilterBtnState();
  filterMessages();
});

// ─── Update Filter Button State (badge count + active class) ───
function updateFilterBtnState() {
  const hasFilters = selectedPriorities.size > 0 || selectedStatuses.size > 0;
  const total = selectedPriorities.size + selectedStatuses.size;

  filterBtn.classList.toggle('active', hasFilters);
  clearFiltersBtn.classList.toggle('hidden', !hasFilters);

  // Remove any old count badge then re-add if needed
  const existing = filterBtn.querySelector('.filter-count');
  if (existing) existing.remove();

  if (hasFilters) {
    const countEl = document.createElement('span');
    countEl.className = 'filter-count';
    countEl.textContent = total;
    filterBtn.appendChild(countEl);
  }
}

// ─── Filter Messages (search + priority + status) ───
function filterMessages() {
  const query = msgSearchInput.value.toLowerCase().trim();

  msgCards.forEach(card => {
    const priority = card.dataset.priority;
    const status   = card.dataset.status;
    const user     = card.dataset.user.toLowerCase();
    const subject  = card.dataset.subject.toLowerCase();
    const text     = card.dataset.text.toLowerCase();

    const matchesSearch   = !query || user.includes(query) || subject.includes(query) || text.includes(query);
    const matchesPriority = selectedPriorities.size === 0 || selectedPriorities.has(priority);
    const matchesStatus   = selectedStatuses.size   === 0 || selectedStatuses.has(status);

    card.style.display = (matchesSearch && matchesPriority && matchesStatus) ? '' : 'none';
  });
}

// ─── Push to Admin ───
document.querySelectorAll('.btn-push').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = btn.dataset.id;

    if (!pushedToAdmin.has(id)) {
      pushedToAdmin.add(id);
      btn.classList.add('pushed');
      btn.innerHTML = '<i class="ri-check-line"></i> Pushed to Admin';
      btn.disabled  = true;
    }
  });
});

// ─── Mark as Read ───
document.querySelectorAll('.btn-mark-read').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.msg-card');

    // Remove unread styling
    card.classList.remove('unread');
    card.dataset.status = 'Read';

    // Remove unread dot
    const dot = card.querySelector('.unread-dot');
    if (dot) dot.remove();

    // Remove this button
    btn.remove();

    updateUnreadBadge();
  });
});

// ─── Unread Badge Counter ───
function updateUnreadBadge() {
  const unreadCount = document.querySelectorAll('.msg-card.unread').length;
  const badge = document.querySelector('.unread-badge');
  if (badge) {
    badge.textContent    = unreadCount;
    badge.style.display  = unreadCount === 0 ? 'none' : '';
  }
}

// ─── Logout ───
logoutBtn.addEventListener('click', () => {
  alert('Logging out...');
  // In a real app: window.location.href = '/login';
});

// ─── Init: show tasks view, show assigned tab ───
tasksView.style.cssText    = 'display:flex; flex-direction:column; gap:16px;';
messagesView.style.cssText = 'display:none; flex-direction:column; gap:16px;';

// Show only assigned cards initially
const allTabContent = tasksView.querySelectorAll('[data-tab-content]');
allTabContent.forEach(el => {
  el.style.display = el.dataset.tabContent === 'assigned' ? '' : 'none';
});

/* ============================================================
   TRADE GRID EMPLOYEE — employee-masha.js
   Masha AI widget logic — icon-based chat avatars (no emojis)
   ============================================================ */

const mashaKB = [
  { patterns:['complete','finish','verification task','how do i verify','verify business'], response:`To complete a verification task:\n\n1. Open the task from My Tasks → Assigned tab\n2. Click the task card to view attached documents\n3. Review: business registration, license, and ID docs\n4. If all clear → mark as Approved\n5. If something is missing → click Request More Info\n\nCompleted tasks move automatically to the Completed tab.` },
  { patterns:['push','escalate','admin','push to admin'], response:`To push a message to admin:\n\n1. Go to User Messages using the top tabs\n2. Find the relevant message card\n3. Click Push to Admin (the button with the arrow)\n4. Add a note explaining why you're escalating\n5. The admin is notified immediately\n\nUse this for suspended account appeals, compliance flags, or anything that needs admin authority.` },
  { patterns:['reply','respond','reply to user','message user'], response:`To reply to a user message:\n\n1. Switch to User Messages tab\n2. Find the message card\n3. Click Reply to User\n4. Write your response in the reply panel\n5. Hit Send — the user gets an email notification\n\nKeep replies professional and reference the specific issue.` },
  { patterns:['assign','task','create task','assign to task'], response:`To assign a user message to a task:\n\n1. In User Messages, find the message\n2. Click Assign to Task\n3. Link to an existing task or create a new one\n4. The message is attached to the task for tracking\n\nThis keeps your task list and messages in sync.` },
  { patterns:['mark as read','read','unread'], response:`To mark a message as read:\n\n- Click Mark as Read on any unread message card\n- The blue unread dot disappears\n- You can filter by Read/Unread using the filter button\n\nUnread messages are shown with a blue dot next to the title.` },
  { patterns:['filter','search','find message','priority'], response:`To filter messages:\n\n- Use the search bar to find by company name or subject\n- Click the filter icon to filter by:\n  Priority: High / Medium / Low\n  Status: Read / Unread\n\nYou can combine multiple filters at once. Click Clear All Filters to reset.` },
  { patterns:['tab','switch','pending tab','completed tab','assigned tab'], response:`Task tabs explained:\n\nAssigned — tasks currently given to you\nPending — tasks waiting on more information\nCompleted — finished tasks\n\nSwitch between them using the sub-tabs above the task list.` },
  { patterns:['hello','hi','hey','howzit','good morning','good afternoon'], response:`Hi there! I'm Masha, your Trade Grid assistant.\n\nI can help you with:\n- Completing verification tasks\n- Replying to user messages\n- Escalating to admin\n- Filtering and managing your queue\n\nWhat do you need?` },
  { patterns:['help','what can you do','how do you work'], response:`Here's what I can help you with:\n\nVerifications — how to review and approve docs\nUser messages — replying, filtering, pushing to admin\nTasks — managing assigned, pending, completed tabs\nEscalation — when and how to push to admin\n\nJust ask me anything!` },
];
const mashaFallback = `I'm not sure about that one.\n\nFor platform issues, use Report Issue in Quick Links, or ask your team lead.\n\nIs there something else I can help you with?`;

function getResponse(input) {
  const lower = input.toLowerCase();
  for (const entry of mashaKB) { if (entry.patterns.some(p => lower.includes(p))) return entry.response; }
  return mashaFallback;
}

(function initMasha() {
  const fab         = document.getElementById('mashaFab');
  const win         = document.getElementById('mashaWindow');
  const messagesEl  = document.getElementById('mashaMessages');
  const inputEl     = document.getElementById('mashaInput');
  const sendBtn     = document.getElementById('mashaSend');
  const clearBtn    = document.getElementById('mashaClear');
  const minimizeBtn = document.getElementById('mashaMinimize');
  const chips       = document.querySelectorAll('.masha-chip');
  const chipsBar    = document.getElementById('mashaChips');
  if (!fab) return;

  let isOpen = false;
  function toggleChat() {
    isOpen = !isOpen; win.classList.toggle('open', isOpen); fab.classList.toggle('open', isOpen);
    if (isOpen) { const dot=fab.querySelector('.fab-dot'); if(dot) dot.style.display='none'; setTimeout(()=>inputEl.focus(),300); }
  }
  fab.addEventListener('click', toggleChat);
  minimizeBtn.addEventListener('click', toggleChat);

  function addMessage(text, sender) {
    const now = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
    const row  = document.createElement('div');
    row.className = `msg-row ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'msg-bubble-avatar';
    // Remix icon — no emoji
    avatar.innerHTML = sender === 'bot'
      ? '<i class="ri-robot-2-line"></i>'
      : '<i class="ri-user-3-line"></i>';

    const wrap   = document.createElement('div');
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
    const time = document.createElement('div'); time.className='msg-time'; time.textContent=now;
    wrap.appendChild(bubble); wrap.appendChild(time);
    if (sender==='bot') { row.appendChild(avatar); row.appendChild(wrap); }
    else                { row.appendChild(wrap);   row.appendChild(avatar); }
    messagesEl.appendChild(row); messagesEl.scrollTop=messagesEl.scrollHeight;
  }

  function showTyping() {
    const row=document.createElement('div'); row.className='msg-row bot'; row.id='typingRow';
    const avatar=document.createElement('div'); avatar.className='msg-bubble-avatar';
    // Remix icon for typing indicator — no emoji
    avatar.innerHTML = '<i class="ri-robot-2-line"></i>';
    const indicator=document.createElement('div'); indicator.className='typing-indicator';
    indicator.innerHTML='<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    row.appendChild(avatar); row.appendChild(indicator);
    messagesEl.appendChild(row); messagesEl.scrollTop=messagesEl.scrollHeight;
  }
  function hideTyping() { const r=document.getElementById('typingRow'); if(r) r.remove(); }

  function sendMessage(text) {
    const msg=(text||inputEl.value).trim(); if(!msg) return;
    addMessage(msg,'user'); inputEl.value=''; inputEl.style.height='auto'; sendBtn.disabled=true;
    chipsBar.style.display='none'; showTyping();
    setTimeout(()=>{ hideTyping(); addMessage(getResponse(msg),'bot'); sendBtn.disabled=false; inputEl.focus(); }, 800+Math.random()*500);
  }

  sendBtn.addEventListener('click', ()=>sendMessage());
  inputEl.addEventListener('keydown', (e)=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage();} });
  inputEl.addEventListener('input', ()=>{ inputEl.style.height='auto'; inputEl.style.height=Math.min(inputEl.scrollHeight,90)+'px'; sendBtn.disabled=inputEl.value.trim()===''; });
  chips.forEach(chip=>chip.addEventListener('click',()=>sendMessage(chip.dataset.msg)));
  clearBtn.addEventListener('click',()=>{ messagesEl.innerHTML=''; chipsBar.style.display='flex'; addGreeting(); });

  function addGreeting() {
    setTimeout(()=>{ addMessage(`Hi! I'm **Masha**, your Trade Grid assistant.\n\nI can help with verifications, user messages, escalating to admin, and managing your task queue.\n\nWhat do you need?`,'bot'); },400);
  }
  sendBtn.disabled=true;
  addGreeting();
})();