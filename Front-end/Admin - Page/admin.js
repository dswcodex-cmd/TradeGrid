let adminApiPromise = null;
let currentAdminProfile = null;

function loadAdminApi() {
  if (!adminApiPromise) {
    adminApiPromise = import("./adminFetches.js");
  }

  return adminApiPromise;
}

/* 
TRADE GRID ADMIN — admin.js
All interactivity: tabs, filter, actions, modals, logout, Masha AI
*/

//Tab switching
function switchTab(btn, tabId) {
  document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
  const el = document.getElementById(tabId);
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.gap = '16px';
}

function prepareAdminLoadingState() {
  const statCards = document.querySelectorAll('.stats .card h1');
  statCards.forEach((card) => {
    card.textContent = '...';
  });

  const tbody = document.querySelector('#user-management tbody');
  if (tbody) {
    tbody.innerHTML = '<tr><td colspan="5" style="padding:16px;text-align:center;color:#7a9a9a;">Loading companies...</td></tr>';
  }

  const requestsTab = document.getElementById('employee-requests');
  if (requestsTab) {
    requestsTab.querySelectorAll('.request-card').forEach((card) => card.remove());
    const loadingCard = document.createElement('div');
    loadingCard.className = 'request-card';
    loadingCard.innerHTML = '<p class="request-body">Loading employee requests...</p>';
    requestsTab.appendChild(loadingCard);
  }

  const requestBadge = document.querySelector('.tabs .badge');
  if (requestBadge) {
    requestBadge.textContent = '...';
  }
}

//Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const um = document.getElementById('user-management');
  if (um) { um.style.display = 'flex'; um.style.flexDirection = 'column'; um.style.gap = '16px'; }
  prepareAdminLoadingState();
  initFilter();
  initUserActions();
  initRequestButtons();
  initSearch();
  initLogout();
  initToast();
  initMasha();
  initAdminSettings();
  injectLogoutIcon();
  loadAdminDashboardData();
});

async function loadAdminDashboardData() {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    console.warn('No admin token found. Admin dashboard data load skipped.');
    return;
  }

  try {
    const {
      getMyProfile,
      getCompanies,
      getCompanyMatches,
      getVerificationDocuments,
      getSupportTickets
    } = await loadAdminApi();

    const [profileResponse, companiesResponse, matchesResponse, verificationResponse, supportResponse] = await Promise.all([
      getMyProfile(),
      getCompanies(),
      getCompanyMatches(),
      getVerificationDocuments(),
      getSupportTickets()
    ]);

    if (profileResponse.ok && profileResponse.data?.admin?.full_name) {
      currentAdminProfile = profileResponse.data.admin;
      const title = document.querySelector('.logo h2');
      if (title) {
        title.textContent = `Trade Grid Admin - ${profileResponse.data.admin.full_name}`;
      }
    }

    const statCards = document.querySelectorAll('.stats .card h1');
    if (statCards.length >= 4) {
      const companies = companiesResponse.ok ? (companiesResponse.data?.companies || []) : [];
      const companyMatches = matchesResponse.ok ? (matchesResponse.data?.matches || []) : [];
      const verificationDocs = verificationResponse.ok ? (verificationResponse.data?.documents || verificationResponse.data?.verification_documents || []) : [];
      const supportTickets = supportResponse.ok ? (supportResponse.data?.tickets || supportResponse.data?.support_tickets || []) : [];
      const openSupportTickets = supportTickets.filter(ticket => ticket.status !== 'closed' && ticket.status !== 'resolved');

      statCards[0].textContent = companies.length;
      statCards[1].textContent = companies.filter(company => company.account_status === 'active').length;
      statCards[2].textContent = companyMatches.length;
      statCards[3].textContent = supportTickets.length;
      renderAdminCompanies(companies);
      renderAdminEmployeeRequests(supportTickets);
      initUserActions();
      initRequestButtons();

      const requestBadge = document.querySelector('.tabs .badge');
      if (requestBadge) {
        requestBadge.textContent = openSupportTickets.length;
      }
    }

    showToast('Admin data refreshed');
  } catch (error) {
    console.error('Failed to load admin dashboard data:', error);
    showToast('Could not refresh admin data. Please try again.', 'ri-error-warning-line');
  }
}

/*
INJECT LOGOUT ICON INTO BUTTON
The HTML has a standalone <i class="ri-logout-box-r-line"> and
a separate <button class="logout">Logout</button>.
We hide the icon via CSS and prepend it inside the button here.
*/
function injectLogoutIcon() {
  const btn = document.querySelector('.logout');
  if (!btn) return;
  // Only inject if icon isn't already inside
  if (!btn.querySelector('i')) {
    const icon = document.createElement('i');
    icon.className = 'ri-logout-box-r-line';
    btn.insertBefore(icon, btn.firstChild);
  }
}

function formatDate(value) {
  if (!value) return 'N/A';
  return new Date(value).toISOString().slice(0, 10);
}

function renderAdminCompanies(companies) {
  const tbody = document.querySelector('#user-management tbody');
  if (!tbody) return;

  if (!companies.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="padding:16px;text-align:center;color:#7a9a9a;">No companies found.</td></tr>';
    return;
  }

  tbody.innerHTML = companies.map((company) => `
    <tr data-company-id="${company.company_id}">
      <td>${company.company_name}<small>${company.email || 'No email'}</small></td>
      <td>${company.location?.country || 'N/A'}</td>
      <td><span class="status ${(company.account_status || 'active').toLowerCase()}">${company.account_status || 'active'}</span></td>
      <td>${formatDate(company.created_at)}</td>
      <td>⋮</td>
    </tr>
  `).join('');
}

function renderAdminEmployeeRequests(tickets) {
  const requestsTab = document.getElementById('employee-requests');
  if (!requestsTab) return;

  requestsTab.querySelectorAll('.request-card').forEach((card) => card.remove());

  if (!tickets.length) {
    const empty = document.createElement('div');
    empty.className = 'request-card';
    empty.innerHTML = '<p class="request-body">No support tickets available right now.</p>';
    requestsTab.appendChild(empty);
    return;
  }

  tickets.forEach((ticket) => {
    const priority = String(ticket.priority || 'medium').toLowerCase();
    const status = ticket.status === 'open' ? 'Unread' : 'Read';
    const companyName = ticket.company?.company_name || 'Unknown Company';

    const card = document.createElement('div');
    card.className = 'request-card';
    card.dataset.ticketId = ticket.support_ticket_id;
    card.dataset.assignedRole = ticket.assigned_role || '';
    card.dataset.assignedAdminId = ticket.assigned_admin_id ?? '';
    card.dataset.priority = priority.charAt(0).toUpperCase() + priority.slice(1);
    card.dataset.status = status;
    card.innerHTML = `
      <div class="request-header">
        <div class="request-title-row">
          <h4>${ticket.title}${status === 'Unread' ? ' <span class="unread-dot"></span>' : ''}</h4>
          <span class="priority ${priority}">${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</span>
        </div>
        <p class="request-meta"><strong>${companyName}</strong> &bull; ${ticket.category} &bull; ${formatDate(ticket.created_at)}</p>
      </div>
      <p class="request-body">${ticket.description}</p>
      <div class="request-actions">
        <button class="btn-reply"><i class="ri-send-plane-line"></i> Reply</button>
        <button class="btn-secondary">Mark as Read</button>
        <button class="btn-secondary">View Details</button>
      </div>
    `;

    requestsTab.appendChild(card);
  });
}

/* ============================================================
   TOAST NOTIFICATION SYSTEM
   ============================================================ */
let toastTimer;
function initToast() {
  if (!document.getElementById('adminToast')) {
    const t = document.createElement('div');
    t.id = 'adminToast';
    t.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(20px);background:#0D3B3B;color:#fff;padding:12px 24px;border-radius:10px;font-size:13px;font-weight:500;font-family:'Inter',sans-serif;box-shadow:0 8px 24px rgba(13,59,59,0.3);opacity:0;transition:opacity 0.25s,transform 0.25s;z-index:9000;white-space:nowrap;display:flex;align-items:center;gap:8px;`;
    document.body.appendChild(t);
  }
}
function showToast(msg, icon = 'ri-checkbox-circle-line') {
  const t = document.getElementById('adminToast');
  if (!t) return;
  t.innerHTML = `<i class="${icon}" style="font-size:16px;color:#B5EAF0"></i> ${msg}`;
  t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(20px)'; }, 3000);
}

/* ============================================================
   MODAL SYSTEM
   ============================================================ */
function createModal(title, bodyHTML, actions = []) {
  const existing = document.getElementById('adminModal');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.id = 'adminModal';
  overlay.style.cssText = `position:fixed;inset:0;background:rgba(13,59,59,0.45);z-index:5000;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn 0.15s ease;`;
  const box = document.createElement('div');
  box.style.cssText = `background:#fff;border-radius:20px;padding:28px 32px;max-width:520px;width:100%;box-shadow:0 20px 60px rgba(13,59,59,0.2);font-family:'Inter',sans-serif;animation:slideUp 0.2s ease;`;
  let actionsHTML = actions.map(a =>
    `<button onclick="${a.fn}" style="padding:10px 20px;border-radius:10px;border:${a.primary?'none':'1px solid rgba(13,59,59,0.18)'};background:${a.primary?'#0D3B3B':'transparent'};color:${a.primary?'#fff':'#4a6464'};font-family:'Inter',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:background 0.2s;">${a.label}</button>`
  ).join('');
  box.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;"><h3 style="font-size:16px;font-weight:700;color:#0D3B3B;letter-spacing:-0.2px;">${title}</h3><button onclick="closeModal()" style="background:none;border:none;font-size:20px;color:#7a9a9a;cursor:pointer;padding:4px;border-radius:6px;"><i class="ri-close-line"></i></button></div><div style="margin-bottom:20px;">${bodyHTML}</div><div style="display:flex;gap:10px;justify-content:flex-end;">${actionsHTML}</div>`;
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
}
function closeModal() { const m = document.getElementById('adminModal'); if (m) m.remove(); }

/* ============================================================
   USER TABLE ACTION MENUS
   ============================================================ */
function initUserActions() {
  document.querySelectorAll('tbody td:last-child').forEach(cell => {
    if (cell.dataset.bound === 'true') return;
    cell.dataset.bound = 'true';
    cell.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllMenus();
      const row     = cell.closest('tr');
      const companyId = Number(row?.dataset.companyId);
      const company = row.querySelector('td:first-child').childNodes[0].textContent.trim();
      const email   = row.querySelector('td small')?.textContent || '';
      const status  = row.querySelector('.status')?.textContent.trim() || '';
      const country = row.querySelector('td:nth-child(2)')?.textContent.trim() || '';
      if (!companyId) {
        showToast('This company record is unavailable right now.', 'ri-error-warning-line');
        return;
      }
      const menu = document.createElement('div');
      menu.className = 'action-menu';
      menu.style.cssText = `position:absolute;right:8px;top:100%;margin-top:4px;background:#fff;border:1px solid rgba(13,59,59,0.12);border-radius:12px;box-shadow:0 8px 24px rgba(13,59,59,0.14);z-index:300;min-width:180px;padding:6px;font-family:'Inter',sans-serif;`;
      const isSuspended = status.toLowerCase() === 'suspended';
      const items = [
        { icon:'ri-eye-line',    label:'View Details',   fn: () => viewUserDetails(company, email, status, country) },
        { icon:'ri-edit-line',   label:'Edit Profile',   fn: () => editUser(company) },
        { icon: isSuspended?'ri-checkbox-circle-line':'ri-forbid-line', label: isSuspended?'Reinstate Account':'Suspend Account', fn: () => isSuspended?reinstateUser(companyId, company,row):suspendUser(companyId, company,row), danger: !isSuspended },
        { icon:'ri-delete-bin-line', label:'Delete Account', fn: () => deleteUser(companyId, company, row), danger: true },
      ];
      items.forEach(item => {
        const btn = document.createElement('button');
        btn.style.cssText = `display:flex;align-items:center;gap:9px;width:100%;padding:9px 12px;border:none;background:transparent;border-radius:8px;cursor:pointer;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;color:${item.danger?'#dc2626':'#4a6464'};text-align:left;transition:background 0.15s;`;
        btn.innerHTML = `<i class="${item.icon}" style="font-size:15px"></i>${item.label}`;
        btn.addEventListener('mouseenter', () => btn.style.background = item.danger?'rgba(220,38,38,0.07)':'rgba(15,163,177,0.07)');
        btn.addEventListener('mouseleave', () => btn.style.background = 'transparent');
        btn.addEventListener('click', (e) => { e.stopPropagation(); closeAllMenus(); item.fn(); });
        menu.appendChild(btn);
      });
      cell.style.position = 'relative';
      cell.appendChild(menu);
    });
  });
  document.addEventListener('click', closeAllMenus);
}
function closeAllMenus() { document.querySelectorAll('.action-menu').forEach(m => m.remove()); }

function viewUserDetails(company, email, status, country) {
  const statusColor = status==='Active'?'#16a34a':status==='Pending'?'#b45309':'#dc2626';
  createModal(`Company Details — ${company}`, `<div style="display:flex;flex-direction:column;gap:14px;"><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;"><div style="background:#F0FAFB;border-radius:10px;padding:14px;"><p style="font-size:11px;color:#7a9a9a;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.05em;">Company</p><p style="font-size:13px;font-weight:600;color:#0D3B3B;">${company}</p></div><div style="background:#F0FAFB;border-radius:10px;padding:14px;"><p style="font-size:11px;color:#7a9a9a;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.05em;">Country</p><p style="font-size:13px;font-weight:600;color:#0D3B3B;">${country}</p></div><div style="background:#F0FAFB;border-radius:10px;padding:14px;"><p style="font-size:11px;color:#7a9a9a;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.05em;">Email</p><p style="font-size:13px;font-weight:600;color:#0D3B3B;">${email}</p></div><div style="background:#F0FAFB;border-radius:10px;padding:14px;"><p style="font-size:11px;color:#7a9a9a;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.05em;">Status</p><span style="display:inline-flex;padding:4px 12px;border-radius:20px;background:${statusColor}18;color:${statusColor};font-size:12px;font-weight:600;">${status}</span></div></div><div style="background:#F0FAFB;border-radius:10px;padding:14px;"><p style="font-size:11px;color:#7a9a9a;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;">Verification Status</p><p style="font-size:13px;color:#4a6464;">Business registration verified · Identity verified · License pending</p></div></div>`,
    [{ label:'Close', fn:'closeModal()' }, { label:'Edit Profile', fn:`editUser('${company}')`, primary:true }]);
}
function editUser(company) {
  createModal(`Edit User — ${company}`, `<div style="display:flex;flex-direction:column;gap:14px;"><div><label style="display:block;font-size:12px;font-weight:600;color:#0D3B3B;margin-bottom:6px;">Company Name</label><input value="${company}" style="width:100%;padding:10px 14px;border:1px solid rgba(13,59,59,0.18);border-radius:10px;font-family:'Inter',sans-serif;font-size:13px;outline:none;color:#1A1A1A;background:#F0FAFB;"></div><div><label style="display:block;font-size:12px;font-weight:600;color:#0D3B3B;margin-bottom:6px;">Account Status</label><select style="width:100%;padding:10px 14px;border:1px solid rgba(13,59,59,0.18);border-radius:10px;font-family:'Inter',sans-serif;font-size:13px;outline:none;color:#1A1A1A;background:#F0FAFB;"><option>Active</option><option>Pending</option><option>Suspended</option></select></div><div><label style="display:block;font-size:12px;font-weight:600;color:#0D3B3B;margin-bottom:6px;">Admin Note</label><textarea rows="3" placeholder="Internal notes..." style="width:100%;padding:10px 14px;border:1px solid rgba(13,59,59,0.18);border-radius:10px;font-family:'Inter',sans-serif;font-size:13px;outline:none;color:#1A1A1A;background:#F0FAFB;resize:vertical;"></textarea></div></div>`,
    [{ label:'Cancel', fn:'closeModal()' }, { label:'Save Changes', fn:`saveUserEdit('${company}')`, primary:true }]);
}
function saveUserEdit(company) { closeModal(); showToast(`Changes saved for ${company}`); }

function suspendUser(companyId, company, row) {
  createModal('Suspend Account', `<p style="font-size:13px;color:#4a6464;line-height:1.6;margin-bottom:16px;">You are about to suspend <strong style="color:#0D3B3B;">${company}</strong>. They will immediately lose access to their account and be notified by email.</p><div><label style="display:block;font-size:12px;font-weight:600;color:#0D3B3B;margin-bottom:6px;">Reason for suspension *</label><textarea id="suspendReason" rows="3" placeholder="Provide a reason (sent to the user)..." style="width:100%;padding:10px 14px;border:1px solid rgba(13,59,59,0.18);border-radius:10px;font-family:'Inter',sans-serif;font-size:13px;outline:none;color:#1A1A1A;background:#F0FAFB;resize:vertical;"></textarea></div>`,
    [{ label:'Cancel', fn:'closeModal()' }, { label:'Suspend Account', fn:'confirmSuspend()', primary:true }]);
  window._pendingCompany = { id: companyId, name: company };
  window._pendingRow = row;
}
async function confirmSuspend() {
  const reason = document.getElementById('suspendReason')?.value;
  if (!reason?.trim()) { alert('Please provide a reason.'); return; }
  const company = window._pendingCompany;
  if (!company?.id) { showToast('No company selected', 'ri-error-warning-line'); return; }

  const { updateCompany } = await loadAdminApi();
  const response = await updateCompany(company.id, {
    account_status: 'suspended',
    suspension_reason: reason.trim()
  });

  if (!response.ok) {
    showToast(response.data?.error || response.data?.message || response.error || 'Could not suspend account', 'ri-error-warning-line');
    return;
  }

  const row = window._pendingRow;
  if (row) { const badge = row.querySelector('.status'); if (badge) { badge.className='status suspended'; badge.textContent='Suspended'; } }
  closeModal(); showToast(`${company.name} has been suspended`, 'ri-forbid-line');
  loadAdminDashboardData();
}
function reinstateUser(companyId, company, row) {
  createModal('Reinstate Account', `<p style="font-size:13px;color:#4a6464;line-height:1.6;">Reinstate <strong style="color:#0D3B3B;">${company}</strong>? They will regain full access immediately.</p>`,
    [{ label:'Cancel', fn:'closeModal()' }, { label:'Reinstate', fn:'confirmReinstate()', primary:true }]);
  window._pendingCompany = { id: companyId, name: company };
  window._pendingRow = row;
}
async function confirmReinstate() {
  const company = window._pendingCompany;
  if (!company?.id) { showToast('No company selected', 'ri-error-warning-line'); return; }

  const { updateCompany } = await loadAdminApi();
  const response = await updateCompany(company.id, {
    account_status: 'active',
    suspension_reason: null
  });

  if (!response.ok) {
    showToast(response.data?.error || response.data?.message || response.error || 'Could not reinstate account', 'ri-error-warning-line');
    return;
  }

  const row = window._pendingRow;
  if (row) { const badge = row.querySelector('.status'); if (badge) { badge.className='status active'; badge.textContent='Active'; } }
  closeModal(); showToast(`${company.name} reinstated successfully`, 'ri-checkbox-circle-line');
  loadAdminDashboardData();
}
function deleteUser(companyId, company, row) {
  createModal('Delete Account', `<div style="display:flex;gap:14px;align-items:flex-start;margin-bottom:16px;"><div style="width:40px;height:40px;background:rgba(220,38,38,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="ri-error-warning-line" style="color:#dc2626;font-size:20px;"></i></div><div><p style="font-size:14px;font-weight:700;color:#0D3B3B;margin-bottom:6px;">This action cannot be undone.</p><p style="font-size:13px;color:#4a6464;line-height:1.6;">Permanently deleting <strong>${company}</strong> will remove all their data, matches, and messages within 24 hours.</p></div></div><div style="background:rgba(220,38,38,0.06);border:1px solid rgba(220,38,38,0.15);border-radius:10px;padding:12px;"><p style="font-size:12px;color:#dc2626;font-weight:500;">Type DELETE to confirm:</p><input id="deleteConfirm" type="text" placeholder="DELETE" style="margin-top:8px;width:100%;padding:8px 12px;border:1px solid rgba(220,38,38,0.3);border-radius:8px;font-family:'Inter',sans-serif;font-size:13px;outline:none;background:#fff;"></div>`,
    [{ label:'Cancel', fn:'closeModal()' }, { label:'Delete Account', fn:'confirmDelete()', primary:true }]);
  window._pendingCompany = { id: companyId, name: company };
  window._pendingRow = row;
  setTimeout(() => { const btns = document.querySelectorAll('#adminModal button'); const del = btns[btns.length-1]; if (del) del.style.background='#dc2626'; }, 50);
}
async function confirmDelete() {
  const val = document.getElementById('deleteConfirm')?.value;
  if (val !== 'DELETE') { showToast('Type DELETE to confirm', 'ri-error-warning-line'); return; }
  const company = window._pendingCompany;
  if (!company?.id) { showToast('No company selected', 'ri-error-warning-line'); return; }

  const { deleteCompany } = await loadAdminApi();
  const response = await deleteCompany(company.id);

  if (!response.ok) {
    showToast(response.data?.error || response.data?.message || response.error || 'Could not delete account', 'ri-error-warning-line');
    return;
  }

  const row = window._pendingRow; if (row) row.remove();
  closeModal(); showToast(`${company.name} has been permanently deleted`, 'ri-delete-bin-line');
  loadAdminDashboardData();
}

async function ensureTicketClaimedForAdmin(card) {
  const ticketId = Number(card?.dataset.ticketId);
  const assignedAdminId = card?.dataset.assignedAdminId ? Number(card.dataset.assignedAdminId) : null;

  if (!ticketId || !currentAdminProfile?.admin_id || !currentAdminProfile?.role) {
    showToast('Missing ticket or admin profile', 'ri-error-warning-line');
    return false;
  }

  if (assignedAdminId === Number(currentAdminProfile.admin_id)) {
    return true;
  }

  const { assignSupportTicket } = await loadAdminApi();
  const claimResponse = await assignSupportTicket(ticketId, {
    assigned_role: currentAdminProfile.role,
    assigned_admin_id: currentAdminProfile.admin_id
  });

  if (!claimResponse.ok) {
    showToast(claimResponse.data?.error || claimResponse.error || 'Unable to claim this ticket', 'ri-error-warning-line');
    return false;
  }

  card.dataset.assignedAdminId = String(currentAdminProfile.admin_id);
  card.dataset.assignedRole = currentAdminProfile.role;
  return true;
}

async function replyToTicketCard(card, message) {
  const ticketId = Number(card?.dataset.ticketId);
  if (!ticketId) {
    showToast('This request is missing its ticket id', 'ri-error-warning-line');
    return false;
  }

  const claimed = await ensureTicketClaimedForAdmin(card);
  if (!claimed) {
    return false;
  }

  const { replyToSupportTicket } = await loadAdminApi();
  const replyResponse = await replyToSupportTicket(ticketId, { message });

  if (!replyResponse.ok) {
    showToast(replyResponse.data?.error || replyResponse.error || 'Reply failed to send', 'ri-error-warning-line');
    return false;
  }

  return true;
}

async function routePendingTicketToEmployee() {
  const card = window._pendingCard;
  const ticketId = Number(card?.dataset.ticketId);
  if (!ticketId) {
    showToast('No ticket selected', 'ri-error-warning-line');
    return;
  }

  const { assignSupportTicket } = await loadAdminApi();
  const routeResponse = await assignSupportTicket(ticketId, {
    assigned_role: 'employee',
    assigned_admin_id: null
  });

  if (!routeResponse.ok) {
    showToast(routeResponse.data?.error || routeResponse.error || 'Unable to route ticket to employee queue', 'ri-error-warning-line');
    return;
  }

  card.dataset.assignedRole = 'employee';
  card.dataset.assignedAdminId = '';
  closeModal();
  showToast('Ticket routed to employee queue', 'ri-route-line');
}

/* ============================================================
   EMPLOYEE REQUESTS: REPLY / MARK AS READ / VIEW DETAILS
   ============================================================ */
function initRequestButtons() {
  document.querySelectorAll('.btn-reply').forEach(btn => {
    if (btn.dataset.bound === 'true') return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', () => {
      const card  = btn.closest('.request-card');
      const title = card?.querySelector('h4')?.textContent?.replace(/●/,'').trim() || 'Request';
      const meta  = card?.querySelector('.request-meta')?.textContent?.trim() || '';
      createModal(`Reply to: ${title.substring(0,50)}...`, `<p style="font-size:12px;color:#7a9a9a;margin-bottom:14px;">${meta}</p><div style="margin-bottom:14px;"><label style="display:block;font-size:12px;font-weight:600;color:#0D3B3B;margin-bottom:6px;">Your Reply</label><textarea id="replyText" rows="5" placeholder="Type your reply here..." style="width:100%;padding:12px 14px;border:1px solid rgba(13,59,59,0.18);border-radius:10px;font-family:'Inter',sans-serif;font-size:13px;outline:none;color:#1A1A1A;background:#F0FAFB;resize:vertical;line-height:1.6;"></textarea></div><div><label style="display:block;font-size:12px;font-weight:600;color:#0D3B3B;margin-bottom:6px;">Priority</label><select style="padding:9px 14px;border:1px solid rgba(13,59,59,0.18);border-radius:10px;font-family:'Inter',sans-serif;font-size:13px;outline:none;background:#F0FAFB;color:#1A1A1A;"><option>Normal</option><option>Urgent</option></select></div>`,
        [{ label:'Cancel', fn:'closeModal()' }, { label:'Send Reply', fn:'sendReply()', primary:true }]);
      window._pendingCard = card;
    });
  });
  document.querySelectorAll('.btn-secondary').forEach(btn => {
    if (btn.textContent.trim() === 'Mark as Read') {
      if (btn.dataset.bound === 'true') return;
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => {
        const card = btn.closest('.request-card');
        const dot  = card?.querySelector('.unread-dot'); if (dot) dot.remove();
        card.style.opacity = '0.7'; btn.textContent = 'Read'; btn.disabled = true;
        showToast('Marked as read');
      });
    }
    if (btn.textContent.trim() === 'View Details') {
      if (btn.dataset.bound === 'true') return;
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => {
        const card     = btn.closest('.request-card');
        const title    = card?.querySelector('h4')?.childNodes[0]?.textContent?.trim() || 'Request';
        const meta     = card?.querySelector('.request-meta')?.textContent?.trim() || '';
        const body     = card?.querySelector('.request-body')?.textContent?.trim() || '';
        const priority = card?.querySelector('.priority')?.textContent?.trim() || '';
        const pColor   = priority.includes('High')?'#dc2626':'#b45309';
        createModal('Request Details', `<div style="display:flex;flex-direction:column;gap:12px;"><div style="background:#F0FAFB;border-radius:10px;padding:16px;"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;"><p style="font-size:14px;font-weight:700;color:#0D3B3B;">${title}</p><span style="padding:4px 12px;border-radius:20px;background:${pColor}18;color:${pColor};font-size:11px;font-weight:700;">${priority}</span></div><p style="font-size:12px;color:#7a9a9a;">${meta}</p></div><div style="background:#F0FAFB;border-radius:10px;padding:16px;"><p style="font-size:11px;color:#7a9a9a;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">Message</p><p style="font-size:13px;color:#4a6464;line-height:1.65;">${body}</p></div></div>`,
          [{ label:'Close', fn:'closeModal()' }, { label:'Route to Employee Queue', fn:'routePendingTicketToEmployee()' }, { label:'Reply', fn:"closeModal();document.querySelector('.btn-reply').click()", primary:true }]);
        window._pendingCard = card;
      });
    }
  });
}
async function sendReply() {
  const text = document.getElementById('replyText')?.value?.trim();
  if (!text) { showToast('Please type a reply first', 'ri-error-warning-line'); return; }
  const card = window._pendingCard;
  if (!card) { showToast('No ticket selected', 'ri-error-warning-line'); return; }
  const success = await replyToTicketCard(card, text);
  if (!success) return;
  const dot = card?.querySelector('.unread-dot'); if (dot) dot.remove();
  card.style.opacity='0.7';
  card.dataset.status = 'Read';
  const markBtn = Array.from(card.querySelectorAll('.btn-secondary')).find((button) => button.textContent.trim() === 'Mark as Read');
  if (markBtn) { markBtn.textContent = 'Read'; markBtn.disabled = true; }
  closeModal(); showToast('Reply sent successfully', 'ri-send-plane-line');
}

/* ============================================================
   FILTER — EMPLOYEE REQUESTS
   ============================================================ */
function initFilter() {
  const filterBtn = document.getElementById('empFilterBtn');
  const dropdown  = document.getElementById('empFilterDropdown');
  const closeBtn  = document.getElementById('empCloseFilter');
  const clearBtn  = document.getElementById('empClearFilters');
  const prioBoxes = document.querySelectorAll('.emp-priority-filter');
  const statBoxes = document.querySelectorAll('.emp-status-filter');
  if (!filterBtn) return;
  let selectedPriorities = new Set();
  let selectedStatuses   = new Set();
  filterBtn.addEventListener('click', (e) => { e.stopPropagation(); dropdown.classList.toggle('hidden'); });
  closeBtn?.addEventListener('click', () => dropdown.classList.add('hidden'));
  document.addEventListener('click', (e) => { if (!dropdown?.contains(e.target) && e.target !== filterBtn) dropdown?.classList.add('hidden'); });
  function applyFilter() {
    const hasFilters = selectedPriorities.size > 0 || selectedStatuses.size > 0;
    const total = selectedPriorities.size + selectedStatuses.size;
    filterBtn.classList.toggle('active', hasFilters);
    clearBtn?.classList.toggle('hidden', !hasFilters);
    const existingCount = filterBtn.querySelector('.filter-count'); if (existingCount) existingCount.remove();
    if (hasFilters) { const ct = document.createElement('span'); ct.className='filter-count'; ct.textContent=total; filterBtn.appendChild(ct); }
    document.querySelectorAll('#employee-requests .request-card').forEach(card => {
      const priority = card.dataset.priority || ''; const status = card.dataset.status || '';
      const matchP = selectedPriorities.size===0 || selectedPriorities.has(priority);
      const matchS = selectedStatuses.size===0   || selectedStatuses.has(status);
      card.style.display = (matchP && matchS) ? '' : 'none';
    });
  }
  prioBoxes.forEach(cb => { cb.addEventListener('change', () => { cb.checked?selectedPriorities.add(cb.value):selectedPriorities.delete(cb.value); applyFilter(); }); });
  statBoxes.forEach(cb => { cb.addEventListener('change', () => { cb.checked?selectedStatuses.add(cb.value):selectedStatuses.delete(cb.value); applyFilter(); }); });
  clearBtn?.addEventListener('click', () => { selectedPriorities.clear(); selectedStatuses.clear(); prioBoxes.forEach(cb=>cb.checked=false); statBoxes.forEach(cb=>cb.checked=false); applyFilter(); });
}

/* ============================================================
   USER MANAGEMENT SEARCH
   ============================================================ */
function initSearch() {
  const umSearch = document.querySelector('#user-management .search');
  if (umSearch) { umSearch.addEventListener('input', () => { const q=umSearch.value.toLowerCase().trim(); document.querySelectorAll('#user-management tbody tr').forEach(row=>{row.style.display=(!q||row.textContent.toLowerCase().includes(q))?'':'none';}); }); }
  const empSearch = document.querySelector('#employee-requests .search');
  if (empSearch) { empSearch.addEventListener('input', () => { const q=empSearch.value.toLowerCase().trim(); document.querySelectorAll('#employee-requests .request-card').forEach(card=>{card.style.display=(!q||card.textContent.toLowerCase().includes(q))?'':'none';}); }); }
}

/* ============================================================
   LOGOUT
   ============================================================ */
function initLogout() {
  const logoutBtn = document.querySelector('.logout');
  if (logoutBtn) { logoutBtn.addEventListener('click', () => { createModal('Log Out', `<p style="font-size:13px;color:#4a6464;line-height:1.6;">Are you sure you want to log out of the Admin Panel?</p>`, [{ label:'Cancel', fn:'closeModal()' }, { label:'Log Out', fn:'confirmLogout()', primary:true }]); }); }
}
function confirmLogout() { closeModal(); showToast('Logging out...','ri-logout-box-r-line'); setTimeout(()=>{window.location.href='../Login - Page/login.html';},1000); }

window.switchTab = switchTab;
window.closeModal = closeModal;
window.editUser = editUser;
window.saveUserEdit = saveUserEdit;
window.suspendUser = suspendUser;
window.confirmSuspend = confirmSuspend;
window.reinstateUser = reinstateUser;
window.confirmReinstate = confirmReinstate;
window.deleteUser = deleteUser;
window.confirmDelete = confirmDelete;
window.sendReply = sendReply;
window.routePendingTicketToEmployee = routePendingTicketToEmployee;
window.confirmLogout = confirmLogout;

/* ============================================================
   ADMIN SETTINGS MODAL
   ============================================================ */
function initAdminSettings() {
  // Build the modal once and append to body
  if (document.getElementById('adminSettingsBackdrop')) return;

  const backdrop = document.createElement('div');
  backdrop.id = 'adminSettingsBackdrop';
  backdrop.className = 'admin-settings-backdrop';
  backdrop.innerHTML = `
    <div class="admin-settings-modal">

      <div class="admin-settings-header">
        <h3><i class="ri-settings-3-line"></i> Settings</h3>
        <button class="admin-settings-x" id="adminSettingsX"><i class="ri-close-line"></i></button>
      </div>

      <div class="admin-settings-body">

        <!-- Notifications -->
        <div class="admin-settings-section">
          <div class="admin-settings-section-title">Notifications</div>

          <div class="admin-settings-row">
            <div class="admin-settings-row-info">
              <p>Employee request alerts</p>
              <span>Notify when an employee pushes a request to admin</span>
            </div>
            <label class="admin-toggle"><input type="checkbox" checked id="notifEmpRequests"><span class="admin-toggle-slider"></span></label>
          </div>
          <div class="admin-settings-row">
            <div class="admin-settings-row-info">
              <p>New user registrations</p>
              <span>Get alerted when a new business registers</span>
            </div>
            <label class="admin-toggle"><input type="checkbox" checked id="notifNewUsers"><span class="admin-toggle-slider"></span></label>
          </div>
          <div class="admin-settings-row">
            <div class="admin-settings-row-info">
              <p>Pending verification reminders</p>
              <span>Daily digest of verifications awaiting review</span>
            </div>
            <label class="admin-toggle"><input type="checkbox" checked id="notifVerif"><span class="admin-toggle-slider"></span></label>
          </div>
          <div class="admin-settings-row">
            <div class="admin-settings-row-info">
              <p>Compliance flags</p>
              <span>Immediate alert when a profile is flagged</span>
            </div>
            <label class="admin-toggle"><input type="checkbox" checked id="notifCompliance"><span class="admin-toggle-slider"></span></label>
          </div>
          <div class="admin-settings-row">
            <div class="admin-settings-row-info">
              <p>Suspension & reinstatement actions</p>
              <span>Confirm email when an account is suspended or reinstated</span>
            </div>
            <label class="admin-toggle"><input type="checkbox" id="notifSuspend"><span class="admin-toggle-slider"></span></label>
          </div>
        </div>

        <!-- Platform -->
        <div class="admin-settings-section">
          <div class="admin-settings-section-title">Platform</div>

          <div class="admin-settings-row">
            <div class="admin-settings-row-info">
              <p>Require reason for suspensions</p>
              <span>Enforce that a reason is typed before suspending</span>
            </div>
            <label class="admin-toggle"><input type="checkbox" checked id="requireReason"><span class="admin-toggle-slider"></span></label>
          </div>
          <div class="admin-settings-row">
            <div class="admin-settings-row-info">
              <p>Auto-mark requests as read on reply</p>
              <span>Mark an employee request read when you reply</span>
            </div>
            <label class="admin-toggle"><input type="checkbox" checked id="autoMarkRead"><span class="admin-toggle-slider"></span></label>
          </div>
          <div class="admin-settings-row">
            <div class="admin-settings-row-info">
              <p>Show growth percentages on stats</p>
              <span>Display +% labels on dashboard stat cards</span>
            </div>
            <label class="admin-toggle"><input type="checkbox" checked id="showGrowth"><span class="admin-toggle-slider"></span></label>
          </div>
        </div>

        <!-- Account -->
        <div class="admin-settings-section">
          <div class="admin-settings-section-title">Account</div>

          <div class="admin-info-row">
            <span class="admin-info-label">Name</span>
            <span class="admin-info-value">Platform Administrator</span>
          </div>
          <div class="admin-info-row">
            <span class="admin-info-label">Role</span>
            <span class="admin-info-value">Super Admin</span>
          </div>
          <div class="admin-info-row">
            <span class="admin-info-label">Panel</span>
            <span class="admin-info-value">Trade Grid Admin</span>
          </div>

          <button class="admin-settings-change-password" id="adminChangePassword">
            <i class="ri-lock-password-line"></i> Change Password
          </button>
        </div>

      </div>

      <div class="admin-settings-footer">
        <button class="admin-settings-cancel" id="adminSettingsCancel">Close</button>
        <button class="admin-settings-save" id="adminSettingsSave">Save Changes</button>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const close = () => backdrop.classList.remove('open');
  document.getElementById('adminSettingsX').addEventListener('click', close);
  document.getElementById('adminSettingsCancel').addEventListener('click', close);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });

  // Show/hide growth labels toggle
  document.getElementById('showGrowth').addEventListener('change', function () {
    document.querySelectorAll('.stats .card .growth').forEach(el => {
      el.style.display = this.checked ? '' : 'none';
    });
  });

  // Change password placeholder
  document.getElementById('adminChangePassword').addEventListener('click', function () {
    this.textContent = 'Password reset link sent to your email';
    this.disabled = true;
  });

  // Save
  document.getElementById('adminSettingsSave').addEventListener('click', () => {
    close();
    showToast('Settings saved', 'ri-checkbox-circle-line');
  });

  // Wire the settings gear icon in the header
  const settingsIcon = document.querySelector('.header-actions .ri-settings-3-line');
  if (settingsIcon) {
    settingsIcon.addEventListener('click', () => {
      backdrop.classList.add('open');
    });
  }
}

/* ============================================================
   MASHA AI — icon-based chat (no emoji avatars)
   ============================================================ */
const mashaKB = [
  { patterns:['approve','verification','verify','pending verif'], response:`To approve a verification:\n\n1. Go to Pending Verifications in the right panel\n2. Click on the business name to view documents\n3. Review all submitted files\n4. Click Approve to grant verified status\n\nApproval sends an automatic email to the business.` },
  { patterns:['suspend','ban','deactivate','block user'], response:`To suspend a user account:\n\n1. Find the user in User Management\n2. Click the actions menu on their row\n3. Select Suspend Account\n4. Add a reason (sent to the user)\n\nSuspended users lose access immediately.` },
  { patterns:['stat','analytics','numbers','growth','metric'], response:`Current platform stats:\n\n2,847 total users (+12.5%)\n1,423 active businesses (+8.3%)\n4,892 total matches (+15.7%)\n892 messages today (+23.1%)` },
  { patterns:['reply','respond','employee request'], response:`To reply to an employee request:\n\n1. Switch to Employee Requests tab\n2. Click Reply on the relevant card\n3. Type your response\n4. Hit Send — the employee is notified` },
  { patterns:['filter','priority','unread','read'], response:`To filter employee requests:\n\n1. Switch to the Employee Requests tab\n2. Click the filter icon next to the search bar\n3. Select Priority (High/Medium/Low) and/or Status (Read/Unread)\n4. Cards are filtered instantly` },
  { patterns:['settings','notification','password'], response:`Open Settings using the gear icon in the top header.\n\nAdmin settings include:\n- Notification preferences (requests, registrations, flags)\n- Platform behaviour (require reasons, auto-mark read)\n- Account info and password change` },
  { patterns:['hello','hi','hey'], response:`Hello, Admin! I'm Masha, your Trade Grid AI assistant.\n\nI can help with verifications, user management, employee requests, filtering, and platform stats.\n\nWhat do you need?` },
  { patterns:['delete','remove user'], response:`To permanently delete a user:\n\nThis cannot be undone.\n\n1. Open User Management\n2. Click the actions menu next to the user\n3. Select Delete Account\n4. Type DELETE to confirm` },
];
const mashaFallback = `I'm not sure about that specific task. For platform issues, check Documentation or contact the dev team.\n\nAnything else I can help with?`;
function getMashaResponse(input) {
  const lower = input.toLowerCase();
  for (const entry of mashaKB) { if (entry.patterns.some(p => lower.includes(p))) return entry.response; }
  return mashaFallback;
}

function initMasha() {
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
    const av = document.createElement('div');
    av.className = 'msg-bubble-avatar';
    av.innerHTML = sender === 'bot'
      ? '<i class="ri-robot-2-line"></i>'
      : '<i class="ri-user-3-line"></i>';
    const wrap = document.createElement('div');
    const bub  = document.createElement('div');
    bub.className = 'msg-bubble';
    bub.innerHTML = text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
    const t = document.createElement('div'); t.className='msg-time'; t.textContent=now;
    wrap.appendChild(bub); wrap.appendChild(t);
    if (sender==='bot') { row.appendChild(av); row.appendChild(wrap); }
    else                { row.appendChild(wrap); row.appendChild(av); }
    messagesEl.appendChild(row); messagesEl.scrollTop=messagesEl.scrollHeight;
  }

  function showTyping() {
    const row=document.createElement('div'); row.className='msg-row bot'; row.id='typingRow';
    const av=document.createElement('div'); av.className='msg-bubble-avatar';
    av.innerHTML = '<i class="ri-robot-2-line"></i>';
    const ind=document.createElement('div'); ind.className='typing-indicator';
    ind.innerHTML='<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    row.appendChild(av); row.appendChild(ind);
    messagesEl.appendChild(row); messagesEl.scrollTop=messagesEl.scrollHeight;
  }
  function hideTyping() { const r=document.getElementById('typingRow'); if(r) r.remove(); }

  function sendMessage(text) {
    const msg=(text||inputEl.value).trim(); if(!msg) return;
    addMessage(msg,'user'); inputEl.value=''; inputEl.style.height='auto'; sendBtn.disabled=true;
    chipsBar.style.display='none'; showTyping();
    setTimeout(()=>{ hideTyping(); addMessage(getMashaResponse(msg),'bot'); sendBtn.disabled=false; inputEl.focus(); }, 800+Math.random()*500);
  }

  sendBtn.addEventListener('click', ()=>sendMessage());
  inputEl.addEventListener('keydown', e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage();} });
  inputEl.addEventListener('input', ()=>{ inputEl.style.height='auto'; inputEl.style.height=Math.min(inputEl.scrollHeight,90)+'px'; sendBtn.disabled=inputEl.value.trim()===''; });
  chips.forEach(c=>c.addEventListener('click',()=>sendMessage(c.dataset.msg)));
  clearBtn.addEventListener('click',()=>{ messagesEl.innerHTML=''; chipsBar.style.display='flex'; addGreeting(); });

  function addGreeting() {
    setTimeout(()=>{ addMessage(`Hi, Admin! I'm **Masha**, your Trade Grid AI assistant.\n\nI can help with verifications, user management, employee request filtering, and stats.\n\nWhat do you need?`,'bot'); },400);
  }
  sendBtn.disabled=true;
  addGreeting();
}

/* ============================================================
   TRADE GRID ADMIN — darkmode patch
   Add this BEFORE admin.js in the HTML:
     <script src="admin-darkmode-patch.js"></script>
     <script src="admin.js"></script>

   What it does:
   1. Reads localStorage on load and applies dark-mode class
   2. After admin.js builds the Settings modal, injects a
      "Dark Mode" toggle row into it and keeps it in sync.
   ============================================================ */

/* 1 ── Apply theme immediately (before DOM) */
(function () {
  if (localStorage.getItem('tradegrid-dark-mode') === '1') {
    document.body.classList.add('dark-mode');
  }
})();

/* 2 ── After DOM is ready, inject the Dark Mode row into the Settings modal */
document.addEventListener('DOMContentLoaded', function () {
  /* Wait a tick so admin.js has had time to build the modal */
  setTimeout(function () {
    var body = document.querySelector('.admin-settings-body');
    if (!body) return;

    /* Build a new Appearance section and prepend it */
    var section = document.createElement('div');
    section.className = 'admin-settings-section';
    section.innerHTML =
      '<div class="admin-settings-section-title">Appearance</div>' +
      '<div class="admin-settings-row" id="adminDarkModeRow">' +
        '<div class="admin-settings-row-info">' +
          '<p>Dark Mode</p>' +
          '<span>Applied across all Trade Grid pages</span>' +
        '</div>' +
        '<label class="admin-toggle">' +
          '<input type="checkbox" id="adminDarkModeToggle">' +
          '<span class="admin-toggle-slider"></span>' +
        '</label>' +
      '</div>';

    body.insertBefore(section, body.firstChild);

    /* Sync checkbox with current state */
    var toggle = document.getElementById('adminDarkModeToggle');
    if (!toggle) return;
    toggle.checked = localStorage.getItem('tradegrid-dark-mode') === '1';

    toggle.addEventListener('change', function () {
      var isDark = toggle.checked;
      localStorage.setItem('tradegrid-dark-mode', isDark ? '1' : '0');
      document.body.classList.toggle('dark-mode', isDark);
    });
  }, 0);
});
