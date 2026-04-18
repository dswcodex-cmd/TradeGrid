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
