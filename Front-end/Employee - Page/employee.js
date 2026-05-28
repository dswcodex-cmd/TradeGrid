import {getMyProfile, getCompanies, getCompanyById, updateCompany,deleteCompany, getVerificationDocuments, reviewVerificationDocument, getSupportTickets, getSupportTicketById, assignSupportTicket, updateSupportTicketStatus, replyToSupportTicket} from "./employFetches.js"
// ─── State ───
let currentView = 'tasks';
let currentTab  = 'assigned';
let pushedToAdmin    = new Set();
let selectedPriorities = new Set();
let selectedStatuses   = new Set();
let currentStaffProfile = null;

// ─── DOM References ───
const viewBtns          = document.querySelectorAll('.view-btn');
const tasksView         = document.getElementById('tasksView');
const messagesView      = document.getElementById('messagesView');
const taskTabs          = document.getElementById('taskTabs');
const messagesHeader    = document.getElementById('messagesHeader');
const tabs              = document.querySelectorAll('.tab');
const searchInput       = document.getElementById('searchInput');
const msgSearchInput    = document.getElementById('msgSearchInput');
const filterBtn         = document.getElementById('filterBtn');
const filterDropdown    = document.getElementById('filterDropdown');
const closeFilter       = document.getElementById('closeFilter');
const clearFiltersBtn   = document.getElementById('clearFilters');
const priorityCheckboxes = document.querySelectorAll('.priority-filter');
const statusCheckboxes   = document.querySelectorAll('.status-filter');
const logoutBtn         = document.getElementById('logoutBtn');

function prepareEmployeeLoadingState() {
  const statCards = document.querySelectorAll('.stats .card h1');
  statCards.forEach((card) => {
    card.textContent = '...';
  });

  const unreadBadge = document.querySelector('.unread-badge');
  if (unreadBadge) {
    unreadBadge.textContent = '...';
    unreadBadge.style.display = '';
  }

  const tasksBody = document.getElementById('tasksBody');
  if (tasksBody) {
    tasksBody.innerHTML = '<div class="empty-tab" data-tab-content="assigned"><p class="empty-state">Loading tasks...</p></div>';
  }

  const messagesBody = document.getElementById('messagesBody');
  if (messagesBody) {
    messagesBody.innerHTML = '<p class="empty-state">Loading user messages...</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  prepareEmployeeLoadingState();
  loadEmployeeDashboardData();
});

async function loadEmployeeDashboardData() {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    console.warn('No employee/admin token found. Employee dashboard data load skipped.');
    return;
  }

  try {
    const [profileResponse, verificationResponse, supportResponse, companiesResponse] = await Promise.all([
      getMyProfile(),
      getVerificationDocuments(),
      getSupportTickets(),
      getCompanies()
    ]);

    currentStaffProfile = profileResponse.ok ? profileResponse.data?.admin || null : null;

    const verificationDocs = verificationResponse.ok ? (verificationResponse.data?.documents || verificationResponse.data?.verification_documents || []) : [];
    const supportTickets = supportResponse.ok ? (supportResponse.data?.tickets || supportResponse.data?.support_tickets || []) : [];
    const companies = companiesResponse.ok ? (companiesResponse.data?.companies || []) : [];

    const statCards = document.querySelectorAll('.stats .card h1');
    if (statCards.length >= 3) {
      statCards[0].textContent = supportTickets.length;
      statCards[1].textContent = verificationDocs.filter(doc => doc.status === 'approved').length;
      statCards[2].textContent = verificationDocs.filter(doc => doc.status === 'pending').length;
    }

    const unreadBadge = document.querySelector('.unread-badge');
    if (unreadBadge) {
      unreadBadge.textContent = supportTickets.filter(ticket => ticket.status === 'open').length;
    }

    renderEmployeeTasks(verificationDocs);
    renderEmployeeMessages(supportTickets);
    bindEmployeeMessageActions();

    console.log('Employee dashboard synced', {
      verificationDocs: verificationDocs.length,
      supportTickets: supportTickets.length,
      companies: companies.length
    });
  } catch (error) {
    console.error('Failed to load employee dashboard data:', error);
  }
}

function formatDate(value) {
  if (!value) return 'N/A';
  return new Date(value).toISOString().slice(0, 10);
}

function renderEmployeeTasks(verificationDocs) {
  const tasksBody = document.getElementById('tasksBody');
  if (!tasksBody) return;

  const assignedDocs = verificationDocs.filter((doc) => doc.status === 'pending');
  const completedDocs = verificationDocs.filter((doc) => doc.status === 'approved');

  const assignedMarkup = assignedDocs.map((doc) => `
    <div class="task-card" data-tab-content="assigned">
      <div class="task-header">
        <div class="task-info">
          <h4>${doc.document_type} - ${doc.company?.company_name || 'Unknown Company'}</h4>
          <p class="task-meta"><i class="ri-building-2-line"></i> ${doc.company?.company_name || 'Unknown Company'} &bull; <i class="ri-file-text-line"></i> Verification Review</p>
        </div>
        <i class="ri-arrow-right-s-line task-arrow"></i>
      </div>
      <div class="task-footer">
        <div class="task-badges">
          <span class="status high">High Priority</span>
          <span class="status inprogress">In Progress</span>
        </div>
        <span class="task-due"><i class="ri-time-line"></i> Submitted ${formatDate(doc.submitted_at)}</span>
      </div>
    </div>
  `).join('');

  const completedMarkup = completedDocs.length
    ? completedDocs.map((doc) => `
      <div class="task-card" data-tab-content="completed" style="display:none;">
        <div class="task-header">
          <div class="task-info">
            <h4>${doc.document_type} - ${doc.company?.company_name || 'Unknown Company'}</h4>
            <p class="task-meta"><i class="ri-building-2-line"></i> ${doc.company?.company_name || 'Unknown Company'} &bull; <i class="ri-checkbox-circle-line"></i> Approved</p>
          </div>
          <i class="ri-arrow-right-s-line task-arrow"></i>
        </div>
        <div class="task-footer">
          <div class="task-badges">
            <span class="status low">Completed</span>
          </div>
          <span class="task-due"><i class="ri-time-line"></i> Reviewed ${formatDate(doc.reviewed_at || doc.updated_at)}</span>
        </div>
      </div>
    `).join('')
    : '<div class="empty-tab" data-tab-content="completed" style="display:none;"><p class="empty-state">No completed tasks.</p></div>';

  const pendingMarkup = '<div class="empty-tab" data-tab-content="pending" style="display:none;"><p class="empty-state">No pending tasks.</p></div>';

  tasksBody.innerHTML = `${assignedMarkup || '<div class="empty-tab" data-tab-content="assigned"><p class="empty-state">No assigned tasks.</p></div>'}${pendingMarkup}${completedMarkup}`;
}

function renderEmployeeMessages(supportTickets) {
  const messagesBody = document.getElementById('messagesBody');
  if (!messagesBody) return;

  if (!supportTickets.length) {
    messagesBody.innerHTML = '<p class="empty-state">No user messages right now.</p>';
    return;
  }

  messagesBody.innerHTML = supportTickets.map((ticket, index) => {
    const priority = String(ticket.priority || 'medium');
    const status = ticket.status === 'open' ? 'Unread' : 'Read';
    const companyName = ticket.company?.company_name || 'Unknown Company';
    const companyEmail = ticket.company?.email || 'No email';

    return `
      <div class="msg-card ${status === 'Unread' ? 'unread' : ''}" data-ticket-id="${ticket.support_ticket_id}" data-assigned-role="${ticket.assigned_role || ''}" data-assigned-admin-id="${ticket.assigned_admin_id ?? ''}" data-priority="${priority.charAt(0).toUpperCase() + priority.slice(1)}" data-status="${status}" data-user="${companyName}" data-subject="${ticket.title}" data-text="${ticket.description}">
        <div class="request-header">
          <div class="request-title-row">
            <h4>${ticket.title}${status === 'Unread' ? ' <span class="unread-dot"></span>' : ''}</h4>
            <span class="priority ${priority}">${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</span>
          </div>
          <p class="request-meta"><i class="ri-mail-line"></i> <strong>${companyName}</strong> &bull; ${companyEmail} &bull; ${formatDate(ticket.created_at)}</p>
        </div>
        <p class="request-body">${ticket.description}</p>
        <div class="request-actions">
          <button class="btn-reply"><i class="ri-send-plane-line"></i> Reply to User</button>
          <button class="btn-secondary">Assign to Task</button>
          <button class="btn-push" data-id="${ticket.support_ticket_id || index}"><i class="ri-arrow-up-circle-line"></i> Push to Admin</button>
          ${status === 'Unread' ? '<button class="btn-secondary btn-mark-read">Mark as Read</button>' : ''}
        </div>
      </div>
    `;
  }).join('');
}

function bindEmployeeMessageActions() {
  const messagesBody = document.getElementById('messagesBody');
  if (!messagesBody || messagesBody.dataset.bound === 'true') {
    return;
  }

  messagesBody.dataset.bound = 'true';

  messagesBody.addEventListener('click', (e) => {
    const pushBtn = e.target.closest('.btn-push');
    if (pushBtn) {
      e.stopPropagation();
      const id = pushBtn.dataset.id;
      routeTicketToAdmin(id, pushBtn);
      return;
    }

    const markReadBtn = e.target.closest('.btn-mark-read');
    if (markReadBtn) {
      e.stopPropagation();
      const card = markReadBtn.closest('.msg-card');
      card.classList.remove('unread');
      card.dataset.status = 'Read';
      const dot = card.querySelector('.unread-dot');
      if (dot) dot.remove();
      markReadBtn.remove();
      updateUnreadBadge();
      return;
    }

    const replyBtn = e.target.closest('.btn-reply');
    if (replyBtn) {
      e.stopPropagation();
      const card = replyBtn.closest('.msg-card');
      const user = card.dataset.user || 'User';
      const reply = window.prompt(`Reply to ${user}:`);

      if (reply && reply.trim()) {
        submitEmployeeReply(card, reply.trim(), user);
      }
    }
  });
}

async function ensureTicketClaimed(card) {
  const ticketId = Number(card.dataset.ticketId);
  const assignedAdminId = card.dataset.assignedAdminId ? Number(card.dataset.assignedAdminId) : null;

  if (!ticketId || !currentStaffProfile?.admin_id || !currentStaffProfile?.role) {
    return { ok: false, error: 'Missing ticket or staff profile' };
  }

  if (assignedAdminId === Number(currentStaffProfile.admin_id)) {
    return { ok: true };
  }

  const claimResponse = await assignSupportTicket(ticketId, {
    assigned_role: currentStaffProfile.role,
    assigned_admin_id: currentStaffProfile.admin_id
  });

  if (claimResponse.ok) {
    card.dataset.assignedAdminId = String(currentStaffProfile.admin_id);
    card.dataset.assignedRole = currentStaffProfile.role;
  }

  return claimResponse;
}

async function submitEmployeeReply(card, message, user) {
  const ticketId = Number(card.dataset.ticketId);
  if (!ticketId) {
    window.alert('This ticket is missing its database id.');
    return;
  }

  const claimResponse = await ensureTicketClaimed(card);
  if (!claimResponse.ok) {
    window.alert(claimResponse.data?.error || claimResponse.error || 'Unable to claim this ticket before replying.');
    return;
  }

  const replyResponse = await replyToSupportTicket(ticketId, { message });
  if (!replyResponse.ok) {
    window.alert(replyResponse.data?.error || replyResponse.error || 'Reply failed to send.');
    return;
  }

  const existingPanel = card.querySelector('.reply-panel');
  if (existingPanel) existingPanel.remove();
  const confirmation = document.createElement('div');
  confirmation.className = 'reply-panel';
  confirmation.innerHTML = `
    <div class="reply-sent-confirm">
      <i class="ri-checkbox-circle-fill"></i>
      <div>
        <p>Reply sent to <strong>${user}</strong></p>
        <span>Your response was saved to the support ticket thread.</span>
      </div>
    </div>
  `;
  card.appendChild(confirmation);
  if (card.classList.contains('unread')) {
    card.classList.remove('unread');
    card.dataset.status = 'Read';
    const dot = card.querySelector('.unread-dot');
    if (dot) dot.remove();
    const btn = card.querySelector('.btn-mark-read');
    if (btn) btn.remove();
    updateUnreadBadge();
  }
  setTimeout(() => {
    if (confirmation.parentNode) confirmation.remove();
  }, 3000);
}

async function routeTicketToAdmin(ticketId, pushBtn) {
  if (pushedToAdmin.has(ticketId)) {
    return;
  }

  const response = await assignSupportTicket(Number(ticketId), {
    assigned_role: 'admin',
    assigned_admin_id: null
  });

  if (!response.ok) {
    window.alert(response.data?.error || response.error || 'Unable to push this ticket to admin.');
    return;
  }

  pushedToAdmin.add(ticketId);
  const card = pushBtn.closest('.msg-card');
  if (card) {
    card.dataset.assignedRole = 'admin';
    card.dataset.assignedAdminId = '';
  }
  pushBtn.classList.add('pushed');
  pushBtn.innerHTML = '<i class="ri-check-line"></i> Pushed to Admin';
  pushBtn.disabled = true;
}

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

// ─── Task Sub-Tabs ───
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    currentTab = tab.dataset.tab;
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
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
msgSearchInput.addEventListener('input', () => { filterMessages(); });

// ─── Filter Button Toggle ───
filterBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  filterDropdown.classList.toggle('hidden');
});
closeFilter.addEventListener('click', () => { filterDropdown.classList.add('hidden'); });
document.addEventListener('click', (e) => {
  if (!filterDropdown.contains(e.target) && e.target !== filterBtn) {
    filterDropdown.classList.add('hidden');
  }
});

// ─── Priority Filter ───
priorityCheckboxes.forEach(cb => {
  cb.addEventListener('change', () => {
    cb.checked ? selectedPriorities.add(cb.value) : selectedPriorities.delete(cb.value);
    updateFilterBtnState();
    filterMessages();
  });
});

// ─── Status Filter ───
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

function updateFilterBtnState() {
  const hasFilters = selectedPriorities.size > 0 || selectedStatuses.size > 0;
  const total = selectedPriorities.size + selectedStatuses.size;
  filterBtn.classList.toggle('active', hasFilters);
  clearFiltersBtn.classList.toggle('hidden', !hasFilters);
  const existing = filterBtn.querySelector('.filter-count');
  if (existing) existing.remove();
  if (hasFilters) {
    const countEl = document.createElement('span');
    countEl.className = 'filter-count';
    countEl.textContent = total;
    filterBtn.appendChild(countEl);
  }
}

function filterMessages() {
  const query = msgSearchInput.value.toLowerCase().trim();
  document.querySelectorAll('.msg-card').forEach(card => {
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
    card.classList.remove('unread');
    card.dataset.status = 'Read';
    const dot = card.querySelector('.unread-dot');
    if (dot) dot.remove();
    btn.remove();
    updateUnreadBadge();
  });
});

function updateUnreadBadge() {
  const unreadCount = document.querySelectorAll('.msg-card.unread').length;
  const badge = document.querySelector('.unread-badge');
  if (badge) {
    badge.textContent   = unreadCount;
    badge.style.display = unreadCount === 0 ? 'none' : '';
  }
}

// ============================================================
//  REPLY TO USER — inline reply panel per card
// ============================================================
document.querySelectorAll('.btn-reply').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.msg-card');

    // If a reply panel is already open on this card, toggle it closed
    const existing = card.querySelector('.reply-panel');
    if (existing) {
      existing.remove();
      btn.innerHTML = '<i class="ri-send-plane-line"></i> Reply to User';
      return;
    }

    // Close any other open reply panels across all cards
    document.querySelectorAll('.reply-panel').forEach(p => {
      const otherCard = p.closest('.msg-card');
      const otherBtn  = otherCard ? otherCard.querySelector('.btn-reply') : null;
      if (otherBtn) otherBtn.innerHTML = '<i class="ri-send-plane-line"></i> Reply to User';
      p.remove();
    });

    // Read user and subject from card data attributes
    const user    = card.dataset.user    || 'User';
    const subject = card.dataset.subject || '';

    // Build the reply panel
    const panel = document.createElement('div');
    panel.className = 'reply-panel';
    panel.innerHTML = `
      <div class="reply-panel-header">
        <div class="reply-panel-to">
          <span class="reply-label">To:</span>
          <span class="reply-recipient">${user}</span>
          <span class="reply-subject">Re: ${subject}</span>
        </div>
        <button class="reply-panel-close" title="Close"><i class="ri-close-line"></i></button>
      </div>
      <textarea class="reply-textarea" placeholder="Write your reply to ${user}..."></textarea>
      <div class="reply-panel-actions">
        <div class="reply-templates">
          <span class="reply-template-label">Quick templates:</span>
          <button class="reply-template-btn" data-msg="Thank you for reaching out. We have received your message and will review it shortly. You can expect a response within 24–48 business hours.">Acknowledgement</button>
          <button class="reply-template-btn" data-msg="We have reviewed your documents. Unfortunately, we require additional information before we can proceed. Please upload the missing documents to your verification page.">Request Info</button>
          <button class="reply-template-btn" data-msg="Good news! Your verification has been completed successfully. You can now access all platform features. Thank you for your patience.">Verified</button>
        </div>
        <div class="reply-send-row">
          <button class="reply-cancel-btn">Cancel</button>
          <button class="reply-send-btn"><i class="ri-send-plane-fill"></i> Send Reply</button>
        </div>
      </div>
    `;

    card.appendChild(panel);
    btn.innerHTML = '<i class="ri-arrow-up-s-line"></i> Hide Reply';

    // Focus textarea
    setTimeout(() => panel.querySelector('.reply-textarea').focus(), 50);

    // Close button
    panel.querySelector('.reply-panel-close').addEventListener('click', () => {
      panel.remove();
      btn.innerHTML = '<i class="ri-send-plane-line"></i> Reply to User';
    });

    // Cancel button
    panel.querySelector('.reply-cancel-btn').addEventListener('click', () => {
      panel.remove();
      btn.innerHTML = '<i class="ri-send-plane-line"></i> Reply to User';
    });

    // Quick template buttons
    panel.querySelectorAll('.reply-template-btn').forEach(tb => {
      tb.addEventListener('click', () => {
        panel.querySelector('.reply-textarea').value = tb.dataset.msg;
        panel.querySelector('.reply-textarea').focus();
      });
    });

    // Send button
    panel.querySelector('.reply-send-btn').addEventListener('click', () => {
      const text = panel.querySelector('.reply-textarea').value.trim();
      if (!text) {
        panel.querySelector('.reply-textarea').style.borderColor = '#dc2626';
        setTimeout(() => { panel.querySelector('.reply-textarea').style.borderColor = ''; }, 1500);
        return;
      }
      // Show sent confirmation inline
      panel.innerHTML = `
        <div class="reply-sent-confirm">
          <i class="ri-checkbox-circle-fill"></i>
          <div>
            <p>Reply sent to <strong>${user}</strong></p>
            <span>The user will receive an email notification.</span>
          </div>
        </div>
      `;
      // Mark card as read if unread
      if (card.classList.contains('unread')) {
        card.classList.remove('unread');
        card.dataset.status = 'Read';
        const dot = card.querySelector('.unread-dot');
        if (dot) dot.remove();
        const markBtn = card.querySelector('.btn-mark-read');
        if (markBtn) markBtn.remove();
        updateUnreadBadge();
      }
      btn.innerHTML = '<i class="ri-send-plane-line"></i> Reply to User';
      setTimeout(() => { if (panel.parentNode) panel.remove(); }, 3000);
    });
  });
});

// ============================================================
//  ASSIGN TO TASK — dropdown picker per card
// ============================================================
const availableTasks = [
  { id: 't1', title: 'Verify Business License — Global Exports Ltd',      priority: 'High' },
  { id: 't2', title: 'Review Trade Compliance — Asian Trade Co',           priority: 'Medium' },
  { id: 't3', title: 'Identity Verification — Euro Import Solutions',      priority: 'High' },
  { id: 't4', title: 'Market Analysis Report — Middle East Trading',       priority: 'Low' },
];

document.querySelectorAll('.btn-secondary:not(.btn-mark-read)').forEach(btn => {
  if (btn.textContent.trim() !== 'Assign to Task') return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.msg-card');

    // Toggle close if already open
    const existing = card.querySelector('.assign-panel');
    if (existing) {
      existing.remove();
      return;
    }

    // Close any other assign panels
    document.querySelectorAll('.assign-panel').forEach(p => p.remove());

    const user    = card.dataset.user    || 'User';
    const subject = card.dataset.subject || '';

    const panel = document.createElement('div');
    panel.className = 'assign-panel';

    const taskOptions = availableTasks.map(t => `
      <div class="assign-task-option" data-task-id="${t.id}">
        <div class="assign-task-info">
          <span class="assign-task-title">${t.title}</span>
          <span class="assign-task-priority priority-dot-${t.priority.toLowerCase()}">${t.priority}</span>
        </div>
        <button class="assign-select-btn" data-task-id="${t.id}" data-task-title="${t.title}">
          Link
        </button>
      </div>
    `).join('');

    panel.innerHTML = `
      <div class="assign-panel-header">
        <div>
          <p class="assign-panel-title">Assign to Task</p>
          <span class="assign-panel-sub">Link this message from <strong>${user}</strong> to an existing task</span>
        </div>
        <button class="assign-panel-close" title="Close"><i class="ri-close-line"></i></button>
      </div>
      <div class="assign-or-new">
        <span class="assign-section-label">Existing Tasks</span>
      </div>
      <div class="assign-task-list">${taskOptions}</div>
      <div class="assign-divider"><span>or</span></div>
      <button class="assign-new-btn"><i class="ri-add-line"></i> Create New Task for This Message</button>
    `;

    card.appendChild(panel);

    // Close
    panel.querySelector('.assign-panel-close').addEventListener('click', () => panel.remove());

    // Link to existing task
    panel.querySelectorAll('.assign-select-btn').forEach(linkBtn => {
      linkBtn.addEventListener('click', () => {
        const taskTitle = linkBtn.dataset.taskTitle;
        panel.innerHTML = `
          <div class="reply-sent-confirm">
            <i class="ri-links-line"></i>
            <div>
              <p>Message linked to <strong>${taskTitle}</strong></p>
              <span>You can view it under My Tasks.</span>
            </div>
          </div>
        `;
        setTimeout(() => { if (panel.parentNode) panel.remove(); }, 3000);
      });
    });

    // Create new task
    panel.querySelector('.assign-new-btn').addEventListener('click', () => {
      panel.innerHTML = `
        <div class="assign-new-form">
          <p class="assign-panel-title">Create New Task</p>
          <input class="assign-new-input" type="text" placeholder="Task title..." value="Handle: ${subject}" />
          <div class="assign-new-priority-row">
            <span class="assign-section-label">Priority</span>
            <div class="assign-priority-btns">
              <button class="assign-prio-btn" data-prio="High">High</button>
              <button class="assign-prio-btn active" data-prio="Medium">Medium</button>
              <button class="assign-prio-btn" data-prio="Low">Low</button>
            </div>
          </div>
          <div class="assign-new-footer">
            <button class="reply-cancel-btn assign-back-btn">Cancel</button>
            <button class="assign-create-btn"><i class="ri-add-line"></i> Create Task</button>
          </div>
        </div>
      `;

      // Priority toggle
      panel.querySelectorAll('.assign-prio-btn').forEach(pb => {
        pb.addEventListener('click', () => {
          panel.querySelectorAll('.assign-prio-btn').forEach(x => x.classList.remove('active'));
          pb.classList.add('active');
        });
      });

      panel.querySelector('.assign-back-btn').addEventListener('click', () => panel.remove());

      panel.querySelector('.assign-create-btn').addEventListener('click', () => {
        const title    = panel.querySelector('.assign-new-input').value.trim();
        const priority = panel.querySelector('.assign-prio-btn.active')?.dataset.prio || 'Medium';
        if (!title) {
          panel.querySelector('.assign-new-input').style.borderColor = '#dc2626';
          setTimeout(() => { panel.querySelector('.assign-new-input').style.borderColor = ''; }, 1500);
          return;
        }
        panel.innerHTML = `
          <div class="reply-sent-confirm">
            <i class="ri-checkbox-circle-fill"></i>
            <div>
              <p>Task <strong>${title}</strong> created</p>
              <span>${priority} priority · Added to your Assigned tab.</span>
            </div>
          </div>
        `;
        setTimeout(() => { if (panel.parentNode) panel.remove(); }, 3000);
      });
    });
  });
});

// ============================================================
//  LOGOUT MODAL
// ============================================================
function createLogoutModal() {
  if (document.getElementById('empLogoutBackdrop')) return;
  const backdrop = document.createElement('div');
  backdrop.id = 'empLogoutBackdrop';
  backdrop.className = 'emp-modal-backdrop';
  backdrop.innerHTML = `
    <div class="emp-modal">
      <div class="emp-modal-header">
        <h3>Log Out</h3>
        <button class="emp-modal-x" id="empLogoutX"><i class="ri-close-line"></i></button>
      </div>
      <p class="emp-modal-body">Are you sure you want to log out of the Employee Panel?</p>
      <div class="emp-modal-footer">
        <button class="emp-modal-cancel" id="empLogoutCancel">Cancel</button>
        <button class="emp-modal-confirm" id="empLogoutConfirm">Log Out</button>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const close = () => backdrop.classList.remove('open');
  document.getElementById('empLogoutX').addEventListener('click', close);
  document.getElementById('empLogoutCancel').addEventListener('click', close);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });
  document.getElementById('empLogoutConfirm').addEventListener('click', () => {
    window.location.href = '../Login - Page/login.html';
  });
}
createLogoutModal();

logoutBtn.addEventListener('click', () => {
  document.getElementById('empLogoutBackdrop').classList.add('open');
});

// ============================================================
//  SETTINGS PANEL
// ============================================================
function createSettingsPanel() {
  if (document.getElementById('empSettingsBackdrop')) return;
  const backdrop = document.createElement('div');
  backdrop.id = 'empSettingsBackdrop';
  backdrop.className = 'emp-modal-backdrop';
  backdrop.innerHTML = `
    <div class="emp-modal emp-settings-modal">
      <div class="emp-modal-header">
        <h3><i class="ri-settings-3-line"></i> Settings</h3>
        <button class="emp-modal-x" id="empSettingsX"><i class="ri-close-line"></i></button>
      </div>

      <div class="settings-sections">

        <div class="settings-section">
          <div class="settings-section-title">Notifications</div>
          <div class="settings-row">
            <div class="settings-row-info">
              <p>New user messages</p>
              <span>Get alerted when a new user message arrives</span>
            </div>
            <label class="emp-toggle"><input type="checkbox" checked id="notifMessages"><span class="emp-toggle-slider"></span></label>
          </div>
          <div class="settings-row">
            <div class="settings-row-info">
              <p>Task assignments</p>
              <span>Notify when a new task is assigned to you</span>
            </div>
            <label class="emp-toggle"><input type="checkbox" checked id="notifTasks"><span class="emp-toggle-slider"></span></label>
          </div>
          <div class="settings-row">
            <div class="settings-row-info">
              <p>Admin responses</p>
              <span>Notify when admin responds to a pushed message</span>
            </div>
            <label class="emp-toggle"><input type="checkbox" checked id="notifAdmin"><span class="emp-toggle-slider"></span></label>
          </div>
          <div class="settings-row">
            <div class="settings-row-info">
              <p>High priority alerts</p>
              <span>Play a sound for High Priority messages</span>
            </div>
            <label class="emp-toggle"><input type="checkbox" id="notifSound"><span class="emp-toggle-slider"></span></label>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-section-title">Display</div>
          <div class="settings-row">
            <div class="settings-row-info">
              <p>Show unread count on tab</p>
              <span>Display badge count on User Messages tab</span>
            </div>
            <label class="emp-toggle"><input type="checkbox" checked id="displayUnread"><span class="emp-toggle-slider"></span></label>
          </div>
          <div class="settings-row">
            <div class="settings-row-info">
              <p>Compact message cards</p>
              <span>Reduce padding on message cards for more density</span>
            </div>
            <label class="emp-toggle"><input type="checkbox" id="displayCompact"><span class="emp-toggle-slider"></span></label>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-section-title">Account</div>
          <div class="settings-info-row">
            <span class="settings-info-label">Name</span>
            <span class="settings-info-value">Support Agent</span>
          </div>
          <div class="settings-info-row">
            <span class="settings-info-label">Role</span>
            <span class="settings-info-value">Verification &amp; Support Team</span>
          </div>
          <div class="settings-info-row">
            <span class="settings-info-label">Team</span>
            <span class="settings-info-value">Trade Grid Employee</span>
          </div>
          <button class="settings-change-password-btn" id="settingsChangePassword">
            <i class="ri-lock-password-line"></i> Change Password
          </button>
        </div>

      </div>

      <div class="emp-modal-footer">
        <button class="emp-modal-cancel" id="empSettingsCancel">Close</button>
        <button class="emp-modal-confirm" id="empSettingsSave">Save Changes</button>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const close = () => backdrop.classList.remove('open');
  document.getElementById('empSettingsX').addEventListener('click', close);
  document.getElementById('empSettingsCancel').addEventListener('click', close);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });

  // Compact mode toggle
  document.getElementById('displayCompact').addEventListener('change', function () {
    document.querySelectorAll('.msg-card, .task-card').forEach(c => {
      c.classList.toggle('compact-card', this.checked);
    });
  });

  // Change password placeholder
  document.getElementById('settingsChangePassword').addEventListener('click', () => {
    document.getElementById('settingsChangePassword').textContent = 'Link sent to your email';
    document.getElementById('settingsChangePassword').disabled = true;
  });

  // Save
  document.getElementById('empSettingsSave').addEventListener('click', () => {
    close();
    showEmpToast('Settings saved');
  });
}
createSettingsPanel();

// Wire settings icon in header
document.querySelector('.header-actions .ri-settings-3-line').addEventListener('click', () => {
  document.getElementById('empSettingsBackdrop').classList.add('open');
});

// ============================================================
//  TOAST
// ============================================================
function showEmpToast(msg) {
  let t = document.getElementById('empToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'empToast';
    t.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(20px);background:#0D3B3B;color:#fff;padding:11px 24px;border-radius:10px;font-size:13px;font-weight:500;font-family:Inter,sans-serif;box-shadow:0 8px 24px rgba(13,59,59,0.25);opacity:0;transition:opacity 0.2s,transform 0.2s;z-index:9000;white-space:nowrap;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(20px)'; }, 2500);
}

// ─── Init ───
tasksView.style.cssText    = 'display:flex; flex-direction:column; gap:16px;';
messagesView.style.cssText = 'display:none; flex-direction:column; gap:16px;';

const allTabContent = tasksView.querySelectorAll('[data-tab-content]');
allTabContent.forEach(el => {
  el.style.display = el.dataset.tabContent === 'assigned' ? '' : 'none';
});

/* ============================================================
   TRADE GRID EMPLOYEE — employee-masha.js
   ============================================================ */

const mashaKB = [
  { patterns:['complete','finish','verification task','how do i verify','verify business'], response:`To complete a verification task:\n\n1. Open the task from My Tasks → Assigned tab\n2. Click the task card to view attached documents\n3. Review: business registration, license, and ID docs\n4. If all clear → mark as Approved\n5. If something is missing → click Request More Info\n\nCompleted tasks move automatically to the Completed tab.` },
  { patterns:['push','escalate','admin','push to admin'], response:`To push a message to admin:\n\n1. Go to User Messages using the top tabs\n2. Find the relevant message card\n3. Click Push to Admin (the button with the arrow)\n4. Add a note explaining why you're escalating\n5. The admin is notified immediately\n\nUse this for suspended account appeals, compliance flags, or anything that needs admin authority.` },
  { patterns:['reply','respond','reply to user','message user'], response:`To reply to a user message:\n\n1. Switch to User Messages tab\n2. Find the message card\n3. Click Reply to User\n4. Write your response in the reply panel\n5. Hit Send — the user gets an email notification\n\nKeep replies professional and reference the specific issue.` },
  { patterns:['assign','task','create task','assign to task'], response:`To assign a user message to a task:\n\n1. In User Messages, find the message\n2. Click Assign to Task\n3. Link to an existing task or create a new one\n4. The message is attached to the task for tracking\n\nThis keeps your task list and messages in sync.` },
  { patterns:['mark as read','read','unread'], response:`To mark a message as read:\n\n- Click Mark as Read on any unread message card\n- The blue unread dot disappears\n- You can filter by Read/Unread using the filter button\n\nUnread messages are shown with a blue dot next to the title.` },
  { patterns:['filter','search','find message','priority'], response:`To filter messages:\n\n- Use the search bar to find by company name or subject\n- Click the filter icon to filter by:\n  Priority: High / Medium / Low\n  Status: Read / Unread\n\nYou can combine multiple filters at once. Click Clear All Filters to reset.` },
  { patterns:['tab','switch','pending tab','completed tab','assigned tab'], response:`Task tabs explained:\n\nAssigned — tasks currently given to you\nPending — tasks waiting on more information\nCompleted — finished tasks\n\nSwitch between them using the sub-tabs above the task list.` },
  { patterns:['settings','notification','password','account'], response:`You can access Settings using the gear icon in the top header.\n\nSettings include:\n- Notification preferences (messages, tasks, admin replies)\n- Display options (compact cards, unread badges)\n- Account info and password change` },
  { patterns:['hello','hi','hey','howzit','good morning','good afternoon'], response:`Hi there! I'm Masha, your Trade Grid assistant.\n\nI can help you with:\n- Completing verification tasks\n- Replying to user messages\n- Escalating to admin\n- Filtering and managing your queue\n\nWhat do you need?` },
  { patterns:['help','what can you do','how do you work'], response:`Here's what I can help you with:\n\nVerifications — how to review and approve docs\nUser messages — replying, filtering, pushing to admin\nTasks — managing assigned, pending, completed tabs\nEscalation — when and how to push to admin\n\nJust ask me anything!` },
];
const mashaFallback = `I'm not sure about that one.\n\nFor platform issues, use Report Issue in Quick Links, or ask your team lead.\n\nIs there something else I can help with?`;

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
    avatar.innerHTML = sender === 'bot' ? '<i class="ri-robot-2-line"></i>' : '<i class="ri-user-3-line"></i>';
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

/* ============================================================
   TRADE GRID EMPLOYEE — darkmode patch
   Add this BEFORE employee.js in the HTML:
     <script src="employee-darkmode-patch.js"></script>
     <script src="employee.js"></script>
     <script src="employee-masha.js"></script>

   What it does:
   1. Reads localStorage on load and applies dark-mode class
   2. After employee.js builds the Settings modal, injects a
      "Dark Mode" toggle row into it and keeps it in sync.
   ============================================================ */

/* 1 ── Apply theme immediately (before DOM) */
(function () {
  if (localStorage.getItem('tradegrid-dark-mode') === '1') {
    document.body.classList.add('dark-mode');
  }
})();

/* 2 ── After DOM ready, inject Dark Mode row into Settings modal */
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    var body = document.querySelector('.settings-sections');
    if (!body) return;

    var section = document.createElement('div');
    section.className = 'settings-section';
    section.innerHTML =
      '<div class="settings-section-title">Appearance</div>' +
      '<div class="settings-row" id="empDarkModeRow">' +
        '<div class="settings-row-info">' +
          '<p>Dark Mode</p>' +
          '<span>Applied across all Trade Grid pages</span>' +
        '</div>' +
        '<label class="emp-toggle">' +
          '<input type="checkbox" id="empDarkModeToggle">' +
          '<span class="emp-toggle-slider"></span>' +
        '</label>' +
      '</div>';

    body.insertBefore(section, body.firstChild);

    var toggle = document.getElementById('empDarkModeToggle');
    if (!toggle) return;
    toggle.checked = localStorage.getItem('tradegrid-dark-mode') === '1';

    toggle.addEventListener('change', function () {
      var isDark = toggle.checked;
      localStorage.setItem('tradegrid-dark-mode', isDark ? '1' : '0');
      document.body.classList.toggle('dark-mode', isDark);
    });
  }, 0);
});
