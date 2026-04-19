/* ============================================================
   TRADE GRID ADMIN — admin.js
   Tabs, filter, modals, user actions, logout
   ============================================================ */

// ── Tab switching ──
function switchTab(btn, tabId) {
  document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
  const el = document.getElementById(tabId);
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.gap = '16px';
}

document.addEventListener('DOMContentLoaded', () => {
  const um = document.getElementById('user-management');
  if (um) { um.style.display = 'flex'; um.style.flexDirection = 'column'; um.style.gap = '16px'; }
  initFilter();
  initUserActions();
  initRequestButtons();
  initSearch();
  initLogout();
  initToast();
});

// ── Toast ──
let toastTimer;
function initToast() {
  if (!document.getElementById('adminToast')) {
    const t = document.createElement('div');
    t.id = 'adminToast';
    t.style.cssText = `
      position:fixed; bottom:90px; left:50%; transform:translateX(-50%) translateY(20px);
      background:#0D3B3B; color:#fff; padding:12px 24px; border-radius:10px;
      font-size:13px; font-weight:500; font-family:'Inter',sans-serif;
      box-shadow:0 8px 24px rgba(13,59,59,0.3); opacity:0;
      transition:opacity 0.25s, transform 0.25s; z-index:9000; white-space:nowrap;
      display:flex; align-items:center; gap:8px;
    `;
    document.body.appendChild(t);
  }
}

function showToast(msg, icon = 'ri-checkbox-circle-line') {
  const t = document.getElementById('adminToast');
  if (!t) return;
  t.innerHTML = `<i class="${icon}" style="font-size:16px;color:#B5EAF0"></i> ${msg}`;
  t.style.opacity = '1';
  t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(20px)';
  }, 3000);
}

// ── Modal ──
function createModal(title, bodyHTML, actions = []) {
  const existing = document.getElementById('adminModal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'adminModal';
  overlay.style.cssText = `
    position:fixed; inset:0; background:rgba(13,59,59,0.45); z-index:5000;
    display:flex; align-items:center; justify-content:center; padding:20px;
    animation: fadeIn 0.15s ease;
  `;

  const box = document.createElement('div');
  box.style.cssText = `
    background:#fff; border-radius:20px; padding:28px 32px;
    max-width:520px; width:100%;
    box-shadow:0 20px 60px rgba(13,59,59,0.2);
    font-family:'Inter',sans-serif;
    animation: slideUp 0.2s ease;
  `;

  let actionsHTML = actions.map(a =>
    `<button onclick="${a.fn}" style="
      padding:10px 20px; border-radius:10px; border:${a.primary ? 'none' : '1px solid rgba(13,59,59,0.18)'};
      background:${a.primary ? '#0D3B3B' : 'transparent'};
      color:${a.primary ? '#fff' : '#4a6464'};
      font-family:'Inter',sans-serif; font-size:13px; font-weight:600; cursor:pointer;
      transition:background 0.2s;
    " onmouseover="this.style.background='${a.primary ? '#082828' : 'rgba(15,163,177,0.08)'}'"
       onmouseout="this.style.background='${a.primary ? '#0D3B3B' : 'transparent'}'"
    >${a.label}</button>`
  ).join('');

  box.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
      <h3 style="font-size:16px;font-weight:700;color:#0D3B3B;letter-spacing:-0.2px;">${title}</h3>
      <button onclick="closeModal()" style="background:none;border:none;font-size:20px;color:#7a9a9a;cursor:pointer;padding:4px;border-radius:6px;">
        <i class="ri-close-line"></i>
      </button>
    </div>
    <div style="margin-bottom:20px;">${bodyHTML}</div>
    <div style="display:flex;gap:10px;justify-content:flex-end;">${actionsHTML}</div>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

  if (!document.getElementById('modalStyles')) {
    const s = document.createElement('style');
    s.id = 'modalStyles';
    s.textContent = `
      @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      @keyframes slideUp { from{transform:translateY(16px);opacity:0} to{transform:translateY(0);opacity:1} }
    `;
    document.head.appendChild(s);
  }
}

function closeModal() {
  const m = document.getElementById('adminModal');
  if (m) m.remove();
}

// ── User table actions ──
function initUserActions() {
  document.querySelectorAll('tbody td:last-child').forEach(cell => {
    cell.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllMenus();
      const row     = cell.closest('tr');
      const company = row.querySelector('td:first-child').childNodes[0].textContent.trim();
      const email   = row.querySelector('td small')?.textContent || '';
      const status  = row.querySelector('.status')?.textContent.trim() || '';
      const country = row.querySelector('td:nth-child(2)')?.textContent.trim() || '';

      const menu = document.createElement('div');
      menu.className = 'action-menu';
      menu.style.cssText = `
        position:absolute; right:8px; top:100%; margin-top:4px;
        background:#fff; border:1px solid rgba(13,59,59,0.12); border-radius:12px;
        box-shadow:0 8px 24px rgba(13,59,59,0.14); z-index:300;
        min-width:180px; padding:6px; font-family:'Inter',sans-serif;
      `;

      const isSuspended = status.toLowerCase() === 'suspended';
      const items = [
        { icon: 'ri-eye-line',         label: 'View Details',   fn: () => viewUserDetails(company, email, status, country) },
        { icon: 'ri-edit-line',        label: 'Edit Profile',    fn: () => editUser(company) },
        { icon: isSuspended ? 'ri-checkbox-circle-line' : 'ri-forbid-line',
          label: isSuspended ? 'Reinstate Account' : 'Suspend Account',
          fn: () => isSuspended ? reinstateUser(company, row) : suspendUser(company, row),
          danger: !isSuspended },
        { icon: 'ri-delete-bin-line',  label: 'Delete Account', fn: () => deleteUser(company, row), danger: true },
      ];

      items.forEach(item => {
        const btn = document.createElement('button');
        btn.style.cssText = `
          display:flex; align-items:center; gap:9px; width:100%; padding:9px 12px;
          border:none; background:transparent; border-radius:8px; cursor:pointer;
          font-family:'Inter',sans-serif; font-size:13px; font-weight:500;
          color:${item.danger ? '#dc2626' : '#4a6464'}; text-align:left; transition:background 0.15s;
        `;
        btn.innerHTML = `<i class="${item.icon}" style="font-size:15px"></i>${item.label}`;
        btn.addEventListener('mouseenter', () => btn.style.background = item.danger ? 'rgba(220,38,38,0.07)' : 'rgba(15,163,177,0.07)');
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

function closeAllMenus() {
  document.querySelectorAll('.action-menu').forEach(m => m.remove());
}

function viewUserDetails(company, email, status, country) {
  const statusColor = status === 'Active' ? '#16a34a' : status === 'Pending' ? '#b45309' : '#dc2626';
  createModal(`Company Details — ${company}`, `
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div style="background:#F0FAFB;border-radius:10px;padding:14px;">
          <p style="font-size:11px;color:#7a9a9a;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.05em;">Company</p>
          <p style="font-size:13px;font-weight:600;color:#0D3B3B;">${company}</p>
        </div>
        <div style="background:#F0FAFB;border-radius:10px;padding:14px;">
          <p style="font-size:11px;color:#7a9a9a;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.05em;">Country</p>
          <p style="font-size:13px;font-weight:600;color:#0D3B3B;">${country}</p>
        </div>
        <div style="background:#F0FAFB;border-radius:10px;padding:14px;">
          <p style="font-size:11px;color:#7a9a9a;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.05em;">Email</p>
          <p style="font-size:13px;font-weight:600;color:#0D3B3B;">${email}</p>
        </div>
        <div style="background:#F0FAFB;border-radius:10px;padding:14px;">
          <p style="font-size:11px;color:#7a9a9a;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.05em;">Status</p>
          <span style="display:inline-flex;padding:4px 12px;border-radius:20px;background:${statusColor}18;color:${statusColor};font-size:12px;font-weight:600;">${status}</span>
        </div>
      </div>
      <div style="background:#F0FAFB;border-radius:10px;padding:14px;">
        <p style="font-size:11px;color:#7a9a9a;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;">Verification Status</p>
        <p style="font-size:13px;color:#4a6464;">Business registration verified · Identity verified · License pending</p>
      </div>
    </div>
  `, [
    { label: 'Close', fn: 'closeModal()' },
    { label: 'Edit Profile', fn: `editUser('${company}')`, primary: true }
  ]);
}

function editUser(company) {
  createModal(`Edit User — ${company}`, `
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div>
        <label style="display:block;font-size:12px;font-weight:600;color:#0D3B3B;margin-bottom:6px;">Company Name</label>
        <input value="${company}" style="width:100%;padding:10px 14px;border:1px solid rgba(13,59,59,0.18);border-radius:10px;font-family:'Inter',sans-serif;font-size:13px;outline:none;color:#1A1A1A;background:#F0FAFB;">
      </div>
      <div>
        <label style="display:block;font-size:12px;font-weight:600;color:#0D3B3B;margin-bottom:6px;">Account Status</label>
        <select style="width:100%;padding:10px 14px;border:1px solid rgba(13,59,59,0.18);border-radius:10px;font-family:'Inter',sans-serif;font-size:13px;outline:none;color:#1A1A1A;background:#F0FAFB;">
          <option>Active</option><option>Pending</option><option>Suspended</option>
        </select>
      </div>
      <div>
        <label style="display:block;font-size:12px;font-weight:600;color:#0D3B3B;margin-bottom:6px;">Admin Note</label>
        <textarea rows="3" placeholder="Internal notes..." style="width:100%;padding:10px 14px;border:1px solid rgba(13,59,59,0.18);border-radius:10px;font-family:'Inter',sans-serif;font-size:13px;outline:none;color:#1A1A1A;background:#F0FAFB;resize:vertical;"></textarea>
      </div>
    </div>
  `, [
    { label: 'Cancel', fn: 'closeModal()' },
    { label: 'Save Changes', fn: `saveUserEdit('${company}')`, primary: true }
  ]);
}

function saveUserEdit(company) { closeModal(); showToast(`Changes saved for ${company}`); }

function suspendUser(company, row) {
  createModal('Suspend Account', `
    <p style="font-size:13px;color:#4a6464;line-height:1.6;margin-bottom:16px;">
      You are about to suspend <strong style="color:#0D3B3B;">${company}</strong>. They will immediately lose access and be notified by email.
    </p>
    <div>
      <label style="display:block;font-size:12px;font-weight:600;color:#0D3B3B;margin-bottom:6px;">Reason for suspension *</label>
      <textarea id="suspendReason" rows="3" placeholder="Provide a reason (sent to the user)..." style="width:100%;padding:10px 14px;border:1px solid rgba(13,59,59,0.18);border-radius:10px;font-family:'Inter',sans-serif;font-size:13px;outline:none;color:#1A1A1A;background:#F0FAFB;resize:vertical;"></textarea>
    </div>
  `, [
    { label: 'Cancel', fn: 'closeModal()' },
    { label: 'Suspend Account', fn: `confirmSuspend('${company}')`, primary: true }
  ]);
  window._pendingRow = row;
}

function confirmSuspend(company) {
  const reason = document.getElementById('suspendReason')?.value;
  if (!reason?.trim()) { alert('Please provide a reason.'); return; }
  const row = window._pendingRow;
  if (row) { const badge = row.querySelector('.status'); if (badge) { badge.className = 'status suspended'; badge.textContent = 'Suspended'; } }
  closeModal();
  showToast(`${company} has been suspended`, 'ri-forbid-line');
}

function reinstateUser(company, row) {
  createModal('Reinstate Account', `
    <p style="font-size:13px;color:#4a6464;line-height:1.6;">Reinstate <strong style="color:#0D3B3B;">${company}</strong>? They will regain full access immediately.</p>
  `, [
    { label: 'Cancel', fn: 'closeModal()' },
    { label: 'Reinstate', fn: `confirmReinstate('${company}')`, primary: true }
  ]);
  window._pendingRow = row;
}

function confirmReinstate(company) {
  const row = window._pendingRow;
  if (row) { const badge = row.querySelector('.status'); if (badge) { badge.className = 'status active'; badge.textContent = 'Active'; } }
  closeModal();
  showToast(`${company} reinstated successfully`, 'ri-checkbox-circle-line');
}

function deleteUser(company, row) {
  createModal('Delete Account', `
    <div style="display:flex;gap:14px;align-items:flex-start;margin-bottom:16px;">
      <div style="width:40px;height:40px;background:rgba(220,38,38,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <i class="ri-error-warning-line" style="color:#dc2626;font-size:20px;"></i>
      </div>
      <div>
        <p style="font-size:14px;font-weight:700;color:#0D3B3B;margin-bottom:6px;">This action cannot be undone.</p>
        <p style="font-size:13px;color:#4a6464;line-height:1.6;">Permanently deleting <strong>${company}</strong> will remove all their data, matches, and messages within 24 hours.</p>
      </div>
    </div>
    <div style="background:rgba(220,38,38,0.06);border:1px solid rgba(220,38,38,0.15);border-radius:10px;padding:12px;">
      <p style="font-size:12px;color:#dc2626;font-weight:500;">Type DELETE to confirm:</p>
      <input id="deleteConfirm" type="text" placeholder="DELETE" style="margin-top:8px;width:100%;padding:8px 12px;border:1px solid rgba(220,38,38,0.3);border-radius:8px;font-family:'Inter',sans-serif;font-size:13px;outline:none;background:#fff;">
    </div>
  `, [
    { label: 'Cancel', fn: 'closeModal()' },
    { label: 'Delete Account', fn: `confirmDelete('${company}')`, primary: true }
  ]);
  window._pendingRow = row;
  setTimeout(() => { const btns = document.querySelectorAll('#adminModal button'); const del = btns[btns.length - 1]; if (del) del.style.background = '#dc2626'; }, 50);
}

function confirmDelete(company) {
  const val = document.getElementById('deleteConfirm')?.value;
  if (val !== 'DELETE') { showToast('Type DELETE to confirm', 'ri-error-warning-line'); return; }
  const row = window._pendingRow;
  if (row) row.remove();
  closeModal();
  showToast(`${company} has been permanently deleted`, 'ri-delete-bin-line');
}

// ── Employee request buttons ──
function initRequestButtons() {
  document.querySelectorAll('.btn-reply').forEach(btn => {
    btn.addEventListener('click', () => {
      const card  = btn.closest('.request-card');
      const title = card?.querySelector('h4')?.textContent?.replace(/●/, '').trim() || 'Request';
      const meta  = card?.querySelector('.request-meta')?.textContent?.trim() || '';
      createModal(`Reply to: ${title.substring(0, 50)}...`, `
        <p style="font-size:12px;color:#7a9a9a;margin-bottom:14px;">${meta}</p>
        <div style="margin-bottom:14px;">
          <label style="display:block;font-size:12px;font-weight:600;color:#0D3B3B;margin-bottom:6px;">Your Reply</label>
          <textarea id="replyText" rows="5" placeholder="Type your reply here..." style="width:100%;padding:12px 14px;border:1px solid rgba(13,59,59,0.18);border-radius:10px;font-family:'Inter',sans-serif;font-size:13px;outline:none;color:#1A1A1A;background:#F0FAFB;resize:vertical;line-height:1.6;"></textarea>
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:#0D3B3B;margin-bottom:6px;">Priority</label>
          <select style="padding:9px 14px;border:1px solid rgba(13,59,59,0.18);border-radius:10px;font-family:'Inter',sans-serif;font-size:13px;outline:none;background:#F0FAFB;color:#1A1A1A;">
            <option>Normal</option><option>Urgent</option>
          </select>
        </div>
      `, [
        { label: 'Cancel', fn: 'closeModal()' },
        { label: 'Send Reply', fn: 'sendReply()', primary: true }
      ]);
      window._pendingCard = card;
    });
  });

  document.querySelectorAll('.btn-secondary').forEach(btn => {
    if (btn.textContent.trim() === 'Mark as Read') {
      btn.addEventListener('click', () => {
        const card = btn.closest('.request-card');
        const dot  = card?.querySelector('.unread-dot');
        if (dot) dot.remove();
        card.style.opacity = '0.7';
        btn.textContent = 'Read';
        btn.disabled = true;
        showToast('Marked as read');
      });
    }
    if (btn.textContent.trim() === 'View Details') {
      btn.addEventListener('click', () => {
        const card     = btn.closest('.request-card');
        const title    = card?.querySelector('h4')?.childNodes[0]?.textContent?.trim() || 'Request';
        const meta     = card?.querySelector('.request-meta')?.textContent?.trim() || '';
        const body     = card?.querySelector('.request-body')?.textContent?.trim() || '';
        const priority = card?.querySelector('.priority')?.textContent?.trim() || '';
        const pColor   = priority.includes('High') ? '#dc2626' : '#b45309';
        createModal(`Request Details`, `
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="background:#F0FAFB;border-radius:10px;padding:16px;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                <p style="font-size:14px;font-weight:700;color:#0D3B3B;">${title}</p>
                <span style="padding:4px 12px;border-radius:20px;background:${pColor}18;color:${pColor};font-size:11px;font-weight:700;">${priority}</span>
              </div>
              <p style="font-size:12px;color:#7a9a9a;">${meta}</p>
            </div>
            <div style="background:#F0FAFB;border-radius:10px;padding:16px;">
              <p style="font-size:11px;color:#7a9a9a;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
              <p style="font-size:13px;color:#4a6464;line-height:1.65;">${body}</p>
            </div>
          </div>
        `, [
          { label: 'Close', fn: 'closeModal()' },
          { label: 'Reply', fn: 'closeModal(); document.querySelector(\'.btn-reply\').click()', primary: true }
        ]);
      });
    }
  });
}

function sendReply() {
  const text = document.getElementById('replyText')?.value?.trim();
  if (!text) { showToast('Please type a reply first', 'ri-error-warning-line'); return; }
  const card = window._pendingCard;
  if (card) { const dot = card?.querySelector('.unread-dot'); if (dot) dot.remove(); card.style.opacity = '0.7'; }
  closeModal();
  showToast('Reply sent successfully', 'ri-send-plane-line');
}

// ── Filter ──
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
    const existingCount = filterBtn.querySelector('.filter-count');
    if (existingCount) existingCount.remove();
    if (hasFilters) { const ct = document.createElement('span'); ct.className = 'filter-count'; ct.textContent = total; filterBtn.appendChild(ct); }
    document.querySelectorAll('#employee-requests .request-card').forEach(card => {
      const matchP = selectedPriorities.size === 0 || selectedPriorities.has(card.dataset.priority);
      const matchS = selectedStatuses.size   === 0 || selectedStatuses.has(card.dataset.status);
      card.style.display = (matchP && matchS) ? '' : 'none';
    });
  }

  prioBoxes.forEach(cb => cb.addEventListener('change', () => { cb.checked ? selectedPriorities.add(cb.value) : selectedPriorities.delete(cb.value); applyFilter(); }));
  statBoxes.forEach(cb => cb.addEventListener('change', () => { cb.checked ? selectedStatuses.add(cb.value) : selectedStatuses.delete(cb.value); applyFilter(); }));
  clearBtn?.addEventListener('click', () => { selectedPriorities.clear(); selectedStatuses.clear(); prioBoxes.forEach(cb => cb.checked = false); statBoxes.forEach(cb => cb.checked = false); applyFilter(); });
}

// ── Search ──
function initSearch() {
  const umSearch = document.querySelector('#user-management .search');
  if (umSearch) {
    umSearch.addEventListener('input', () => {
      const q = umSearch.value.toLowerCase().trim();
      document.querySelectorAll('#user-management tbody tr').forEach(row => {
        row.style.display = (!q || row.textContent.toLowerCase().includes(q)) ? '' : 'none';
      });
    });
  }
  const empSearch = document.querySelector('#employee-requests .search');
  if (empSearch) {
    empSearch.addEventListener('input', () => {
      const q = empSearch.value.toLowerCase().trim();
      document.querySelectorAll('#employee-requests .request-card').forEach(card => {
        card.style.display = (!q || card.textContent.toLowerCase().includes(q)) ? '' : 'none';
      });
    });
  }
}

// ── Logout ──
function initLogout() {
  const logoutBtn = document.querySelector('.logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      createModal('Log Out', `<p style="font-size:13px;color:#4a6464;line-height:1.6;">Are you sure you want to log out of the Admin Panel?</p>`, [
        { label: 'Cancel', fn: 'closeModal()' },
        { label: 'Log Out', fn: 'confirmLogout()', primary: true }
      ]);
    });
  }
}

function confirmLogout() {
  closeModal();
  showToast('Logging out...', 'ri-logout-box-r-line');
  setTimeout(() => { window.location.href = '../Login - Page/login.html'; }, 1000);
}
