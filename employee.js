// ─── Init Lucide Icons ───
lucide.createIcons();

// ─── State ───
let currentView = 'tasks';
let currentTab = 'assigned';
let pushedToAdmin = new Set();
let selectedPriorities = new Set();
let selectedStatuses = new Set();

// ─── DOM References ───
const viewBtns = document.querySelectorAll('.view-btn');
const tasksView = document.getElementById('tasksView');
const messagesView = document.getElementById('messagesView');
const taskTabs = document.getElementById('taskTabs');
const messagesHeader = document.getElementById('messagesHeader');
const tabs = document.querySelectorAll('.tab');
const searchInput = document.getElementById('searchInput');
const filterBtn = document.getElementById('filterBtn');
const filterDropdown = document.getElementById('filterDropdown');
const closeFilter = document.getElementById('closeFilter');
const clearFiltersBtn = document.getElementById('clearFilters');
const priorityCheckboxes = document.querySelectorAll('.priority-filter');
const statusCheckboxes = document.querySelectorAll('.status-filter');
const msgCards = document.querySelectorAll('.msg-card');
const logoutBtn = document.getElementById('logoutBtn');

// ─── View Toggle ───
viewBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    currentView = view;

    viewBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (view === 'tasks') {
      tasksView.classList.remove('hidden');
      messagesView.classList.add('hidden');
      taskTabs.classList.remove('hidden');
      messagesHeader.classList.add('hidden');
      searchInput.placeholder = 'Search tasks...';
      filterDropdown.classList.add('hidden');
    } else {
      tasksView.classList.add('hidden');
      messagesView.classList.remove('hidden');
      taskTabs.classList.add('hidden');
      messagesHeader.classList.remove('hidden');
      searchInput.placeholder = 'Search messages...';
    }
  });
});

// ─── Task Tabs ───
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    currentTab = tab.dataset.tab;

    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Show/hide task cards based on tab
    const allContent = tasksView.querySelectorAll('[data-tab-content]');
    allContent.forEach(el => {
      if (el.dataset.tabContent === currentTab) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  });
});

// ─── Search ───
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();

  if (currentView === 'messages') {
    filterMessages();
  } else {
    // Filter task cards
    const taskCards = tasksView.querySelectorAll('.task-card');
    taskCards.forEach(card => {
      const title = card.querySelector('.task-title').textContent.toLowerCase();
      const meta = card.querySelector('.task-meta').textContent.toLowerCase();
      const visible = !query || title.includes(query) || meta.includes(query);
      card.style.display = visible ? '' : 'none';
    });
  }
});

// ─── Filter Button ───
filterBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (currentView === 'messages') {
    filterDropdown.classList.toggle('hidden');
  }
});

closeFilter.addEventListener('click', () => {
  filterDropdown.classList.add('hidden');
});

// Close filter on outside click
document.addEventListener('click', (e) => {
  if (!filterDropdown.contains(e.target) && e.target !== filterBtn) {
    filterDropdown.classList.add('hidden');
  }
});

// ─── Filter Checkboxes ───
priorityCheckboxes.forEach(cb => {
  cb.addEventListener('change', () => {
    if (cb.checked) {
      selectedPriorities.add(cb.value);
    } else {
      selectedPriorities.delete(cb.value);
    }
    updateFilterBtnState();
    filterMessages();
  });
});

statusCheckboxes.forEach(cb => {
  cb.addEventListener('change', () => {
    if (cb.checked) {
      selectedStatuses.add(cb.value);
    } else {
      selectedStatuses.delete(cb.value);
    }
    updateFilterBtnState();
    filterMessages();
  });
});

// ─── Clear Filters ───
clearFiltersBtn.addEventListener('click', () => {
  selectedPriorities.clear();
  selectedStatuses.clear();
  priorityCheckboxes.forEach(cb => cb.checked = false);
  statusCheckboxes.forEach(cb => cb.checked = false);
  updateFilterBtnState();
  filterMessages();
});

function updateFilterBtnState() {
  const hasFilters = selectedPriorities.size > 0 || selectedStatuses.size > 0;
  const total = selectedPriorities.size + selectedStatuses.size;

  filterBtn.classList.toggle('active', hasFilters);
  clearFiltersBtn.classList.toggle('hidden', !hasFilters);

  // Remove old count badge
  const existingCount = filterBtn.querySelector('.filter-count');
  if (existingCount) existingCount.remove();

  if (hasFilters) {
    const countEl = document.createElement('span');
    countEl.className = 'filter-count';
    countEl.textContent = total;
    filterBtn.appendChild(countEl);
  }
}

// ─── Filter Messages ───
function filterMessages() {
  const query = searchInput.value.toLowerCase().trim();

  msgCards.forEach(card => {
    const priority = card.dataset.priority;
    const status = card.dataset.status;
    const user = card.dataset.user.toLowerCase();
    const subject = card.dataset.subject.toLowerCase();
    const text = card.dataset.text.toLowerCase();

    const matchesSearch = !query ||
      user.includes(query) ||
      subject.includes(query) ||
      text.includes(query);

    const matchesPriority = selectedPriorities.size === 0 ||
      selectedPriorities.has(priority);

    const matchesStatus = selectedStatuses.size === 0 ||
      selectedStatuses.has(status);

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
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="16 12 12 8 8 12"/><line x1="12" y1="16" x2="12" y2="8"/></svg> Pushed to Admin`;
      btn.disabled = true;
    }
  });
});

// ─── Mark as Read ───
document.querySelectorAll('.btn-mark-read').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.msg-card');
    card.classList.remove('unread');
    card.dataset.status = 'Read';

    // Remove unread dot
    const dot = card.querySelector('.unread-dot');
    if (dot) dot.remove();

    // Remove this button
    btn.remove();

    // Update unread count badge
    updateUnreadBadge();
  });
});

function updateUnreadBadge() {
  const unreadCount = document.querySelectorAll('.msg-card.unread').length;
  const badge = document.querySelector('.unread-badge');
  if (badge) {
    badge.textContent = unreadCount;
    badge.style.display = unreadCount === 0 ? 'none' : '';
  }
}

// ─── Logout ───
logoutBtn.addEventListener('click', () => {
  alert('Logging out...');
  // In a real app: window.location.href = '/login';
});

// ─── Re-init icons after dynamic DOM changes ───
// (Lucide icons are static here so just one init call above is enough)
