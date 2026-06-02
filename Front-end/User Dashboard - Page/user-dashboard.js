/* ============================================================
   TRADE GRID USER DASHBOARD — user-dashboard.js
   ============================================================ */

// ── Page Navigation ──
const navItems = document.querySelectorAll('.nav-item[data-page]');
const pages    = document.querySelectorAll('.page');
let previousPageBeforeAnalytics = 'overview';
let activeAnalyticsDays = 7;
let latestAnalyticsReportData = {
  profileViews: null,
  marketInsights: [],
  matchStats: null,
  partnerCountries: []
};

// ── Badge state ──
// Matches: 3 new unread matches
// Messages: 5 unread messages (tracked per-conversation)
// Verification: show "!" if has pending/missing docs AND page not yet visited

const badgeState = {
  matches: {
    count: 3,           // number of unseen new matches
    seen: false,
  },
  messages: {
    // Per-conversation unread counts — keys match conversation initials
    unread: { AT: 2, EI: 3, TG: 0, ME: 0 },
    seen: false,
  },
  verification: {
    hasIssue: false,    // false = all docs verified, no action needed
    seen: false,
  },
};

function getTotalUnreadMessages() {
  return Object.values(badgeState.messages.unread).reduce((a, b) => a + b, 0);
}

function updateNavBadge(pageId) {
  const navEl = document.querySelector('.nav-item[data-page="' + pageId + '"]');
  if (!navEl) return;
  // Remove any existing badge
  const existing = navEl.querySelector('.nav-badge');
  if (existing) existing.remove();

  if (pageId === 'matches') {
    const count = badgeState.matches.seen ? 0 : badgeState.matches.count;
    if (count > 0) {
      const badge = document.createElement('span');
      badge.className = 'nav-badge';
      badge.textContent = count;
      navEl.appendChild(badge);
    }
  } else if (pageId === 'messages') {
    const count = getTotalUnreadMessages();
    if (count > 0) {
      const badge = document.createElement('span');
      badge.className = 'nav-badge';
      badge.textContent = count;
      navEl.appendChild(badge);
    }
  } else if (pageId === 'verification') {
    if (badgeState.verification.hasIssue && !badgeState.verification.seen) {
      const badge = document.createElement('span');
      badge.className = 'nav-badge pending';
      badge.textContent = '!';
      navEl.appendChild(badge);
    }
  }
}

function refreshAllNavBadges() {
  updateNavBadge('matches');
  updateNavBadge('messages');
  updateNavBadge('verification');
}

// Also update the topbar notification bell count
function updateTopbarNotifCount() {
  const el = document.getElementById('notifCount');
  if (!el) return;
  const count = document.querySelectorAll('.notif-item.unread').length;
  el.textContent = count;
  el.style.display = count === 0 ? 'none' : 'flex';
}

function navigateTo(pageId) {


  if (pageId === 'speed-matches') {
    showUserToast('Launching Speed Matches...');
    setTimeout(() => {
      window.location.href = '../Speed-dating-page/speed-date.html';
    }, 900);
    return;
  }
  const activePageId = document.querySelector('.page.active')?.id?.replace('page-', '');
  if (pageId === 'analytics' && activePageId && activePageId !== 'analytics') {
    previousPageBeforeAnalytics = activePageId;
  }
  pages.forEach(p => p.classList.remove('active'));
  navItems.forEach(n => n.classList.remove('active'));
  const targetPage = document.getElementById('page-' + pageId);
  const targetNav  = document.querySelector('.nav-item[data-page="' + pageId + '"]');
  if (targetPage) targetPage.classList.add('active');
  if (targetNav)  targetNav.classList.add('active');

  if (pageId === 'discover' && !discoverHasActiveSearch) {
    loadAllDiscoverCompanies();
  } else if (pageId === 'profile') {
    loadBusinessProfile();
  }

  // ── Clear badge when entering the relevant page ──
  if (pageId === 'matches') {
    badgeState.matches.seen = true;
    updateNavBadge('matches');
  } else if (pageId === 'messages') {
    badgeState.messages.seen = true;
    // Clear ALL unread counts when messages page is opened
    Object.keys(badgeState.messages.unread).forEach(k => { badgeState.messages.unread[k] = 0; });
    updateNavBadge('messages');
    // Also clear unread badges in the message list sidebar
    document.querySelectorAll('.msg-list-item .ml-unread').forEach(b => b.remove());
  } else if (pageId === 'verification') {
    badgeState.verification.seen = true;
    updateNavBadge('verification');
  }

  closeSidebar();
}

navItems.forEach(item => {
  item.addEventListener('click', (e) => { e.preventDefault(); navigateTo(item.dataset.page); });
});
document.querySelectorAll('[data-page]').forEach(el => {
  if (el.classList.contains('nav-item')) return;
  el.addEventListener('click', (e) => { e.preventDefault(); navigateTo(el.dataset.page); });
});

// Initialise badges from state on load
document.addEventListener('DOMContentLoaded', () => { refreshAllNavBadges(); });

// ── Sidebar ──
const sidebar        = document.getElementById('sidebar');
const mainWrapper    = document.querySelector('.main-wrapper');
const sidebarToggle  = document.getElementById('sidebarToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar()  { sidebar.classList.add('open'); mainWrapper.classList.add('sidebar-pushed'); }
function closeSidebar() { sidebar.classList.remove('open'); mainWrapper.classList.remove('sidebar-pushed'); }
function toggleSidebar() { sidebar.classList.contains('open') ? closeSidebar() : openSidebar(); }

sidebarToggle.addEventListener('click', (e) => { e.stopPropagation(); toggleSidebar(); });
mainWrapper.addEventListener('click', () => { if (sidebar.classList.contains('open')) closeSidebar(); });

// ── Logout Modal ──
function createLogoutModal() {
  if (document.getElementById('logoutModal')) return;
  const backdrop = document.createElement('div');
  backdrop.className = 'logout-modal-backdrop';
  backdrop.id = 'logoutModalBackdrop';
  backdrop.innerHTML = `
    <div class="logout-modal" id="logoutModal">
      <button class="logout-modal-close" id="logoutModalClose"><i class="ri-close-line"></i></button>
      <h3>Log Out</h3>
      <p>Are you sure you want to log out of your Trade Grid account?</p>
      <div class="logout-modal-actions">
        <button class="btn-logout-cancel" id="btnLogoutCancel">Cancel</button>
        <button class="btn-logout-confirm" id="btnLogoutConfirm">Log Out</button>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);
  const closeModal = () => backdrop.classList.remove('open');
  document.getElementById('logoutModalClose').addEventListener('click', closeModal);
  document.getElementById('btnLogoutCancel').addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
  document.getElementById('btnLogoutConfirm').addEventListener('click', () => {
    window.location.href = '../Login - Page/login.html';
  });
}
createLogoutModal();
document.getElementById('logoutBtn').addEventListener('click', () => {
  document.getElementById('logoutModalBackdrop').classList.add('open');
  closeSidebar();
});

// ── Toast ──
function showUserToast(msg) {
  let t = document.getElementById('userToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'userToast';
    t.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(20px);background:#0D3B3B;color:#fff;padding:11px 24px;border-radius:10px;font-size:13px;font-weight:500;font-family:Inter,sans-serif;box-shadow:0 8px 24px rgba(13,59,59,0.25);opacity:0;transition:opacity 0.2s,transform 0.2s;z-index:9000;white-space:nowrap;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(20px)'; }, 2500);
}

function getDashboardToken() {
  try {
    return localStorage.getItem('token') ||
      localStorage.getItem('companyToken') ||
      localStorage.getItem('userToken');
  } catch (error) {
    return null;
  }
}

const DASHBOARD_API_BASE = 'http://localhost:5000';

function friendlyDashboardError(fallback = 'Something went wrong. Please try again in a moment.') {
  return fallback;
}

function escapeDashboardHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function dashboardJsonPost(path, body) {
  const token = getDashboardToken();
  const response = await fetch(DASHBOARD_API_BASE + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(body || {})
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Request failed');
  }

  return data;
}

// ============================================================
//   PAYMENT MODAL
// ============================================================
const paymentModalBackdrop = document.getElementById('paymentModalBackdrop');
const paymentModalClose    = document.getElementById('paymentModalClose');
const btnPaymentCancel     = document.getElementById('btnPaymentCancel');
const btnPaymentSend       = document.getElementById('btnPaymentSend');
const msgPayBtn            = document.getElementById('msgPayBtn');
const payCurrency          = document.getElementById('payCurrency');
const payAmount            = document.getElementById('payAmount');
const payReference         = document.getElementById('payReference');

const currencySymbols = {
  ZAR: 'R', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AED: 'د.إ'
};

function openPaymentModal() {
  if (!activeConversationId) {
    showUserToast('Select a conversation first.');
    return;
  }
  payAmount.value    = '';
  payReference.value = '';
  payCurrency.value  = 'ZAR';
  paymentModalBackdrop.classList.add('open');
}
function closePaymentModal() { paymentModalBackdrop.classList.remove('open'); }

msgPayBtn.addEventListener('click', (e) => { e.stopPropagation(); openPaymentModal(); });
paymentModalClose.addEventListener('click', closePaymentModal);
btnPaymentCancel.addEventListener('click', closePaymentModal);
paymentModalBackdrop.addEventListener('click', (e) => { if (e.target === paymentModalBackdrop) closePaymentModal(); });

btnPaymentSend.addEventListener('click', () => {
  const amount   = parseFloat(payAmount.value);
  const ref      = payReference.value.trim();
  const currency = payCurrency.value;
  const symbol   = currencySymbols[currency] || currency;
  if (!amount || amount <= 0) {
    payAmount.focus(); payAmount.style.borderColor = '#dc2626';
    setTimeout(() => { payAmount.style.borderColor = ''; }, 1500);
    return;
  }
  const amountDisplay = `${currency} ${symbol}${amount.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  const refDisplay    = ref ? ` · ${ref}` : '';
  const bubbleText    = `Payment of ${amountDisplay} sent${refDisplay}`;
  const chatBody = document.querySelector('.msg-chat-body');
  if (chatBody) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble payment-bubble';
    bubble.innerHTML = `<i class="ri-money-dollar-circle-line"></i>${bubbleText}`;
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  closePaymentModal();
  showUserToast('Payment sent successfully!');
});

// ============================================================
//   IMAGE SEARCH PANEL
// ============================================================
const imgSearchBtn     = document.getElementById('imgSearchBtn');
const imgSearchPanel   = document.getElementById('imgSearchPanel');
const imgSearchClose   = document.getElementById('imgSearchClose');
const imgFileInput     = document.getElementById('imgFileInput');
const imgUploadZone    = document.getElementById('imgUploadZone');
const imgPreviewWrap   = document.getElementById('imgPreviewWrap');
const imgPreview       = document.getElementById('imgPreview');
const btnRunImgSearch  = document.getElementById('btnRunImgSearch');
const btnClearImg      = document.getElementById('btnClearImg');
const imgSearchLoading = document.getElementById('imgSearchLoading');
const imgResultCard    = document.getElementById('imgResultCard');
const resultName       = document.getElementById('resultName');
const resultDesc       = document.getElementById('resultDesc');
const resultTags       = document.getElementById('resultTags');
const btnViewProduct   = document.getElementById('btnViewProduct');

const productDB = [];

let currentProduct = null;

function openImgPanel()  { imgSearchPanel.classList.add('open'); notifPanel.classList.add('hidden'); }
function closeImgPanel() { imgSearchPanel.classList.remove('open'); }

imgSearchBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  imgSearchPanel.classList.contains('open') ? closeImgPanel() : openImgPanel();
});
imgSearchClose.addEventListener('click', closeImgPanel);
document.addEventListener('click', (e) => {
  if (!imgSearchPanel.contains(e.target) && e.target !== imgSearchBtn) closeImgPanel();
});

imgFileInput.addEventListener('change', (e) => { if (e.target.files[0]) handleImageFile(e.target.files[0]); });
imgUploadZone.addEventListener('dragover', (e) => { e.preventDefault(); imgUploadZone.classList.add('drag-over'); });
imgUploadZone.addEventListener('dragleave', () => imgUploadZone.classList.remove('drag-over'));
imgUploadZone.addEventListener('drop', (e) => {
  e.preventDefault(); imgUploadZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) handleImageFile(file);
});

function handleImageFile(file) {
  const reader = new FileReader();
  reader.onload = (ev) => {
    imgPreview.src = ev.target.result;
    imgUploadZone.style.display = 'none';
    imgPreviewWrap.classList.add('has-image');
    imgResultCard.classList.remove('visible');
    imgSearchLoading.classList.remove('visible');
  };
  reader.readAsDataURL(file);
}

btnClearImg.addEventListener('click', () => {
  imgPreview.src = ''; imgFileInput.value = '';
  imgPreviewWrap.classList.remove('has-image');
  imgUploadZone.style.display = '';
  imgResultCard.classList.remove('visible');
  imgSearchLoading.classList.remove('visible');
  currentProduct = null;
});

btnRunImgSearch.addEventListener('click', async () => {
  if (!imgPreview.src) {
    showUserToast('Upload a product image first.');
    return;
  }

  imgSearchLoading.classList.add('visible');
  imgResultCard.classList.remove('visible');
  btnRunImgSearch.disabled = true;

  try {
    const [meta, base64] = imgPreview.src.split(',');
    const mimeType = meta.match(/data:(.*?);base64/)?.[1] || 'image/jpeg';
    const token = getDashboardToken();
    const response = await fetch('http://localhost:5000/discover/image-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ image_base64: base64, mime_type: mimeType })
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || 'Image search failed.');
    }

    currentProduct = {
      name: data.product_name || 'Identified product',
      desc: `${data.companies?.length || 0} supplier${data.companies?.length === 1 ? '' : 's'} found.`,
      tags: data.matched_products || [],
    };

    resultName.textContent = currentProduct.name;
    resultDesc.textContent = currentProduct.desc;
    resultTags.innerHTML = currentProduct.tags.map(t => '<span class="result-tag">' + t + '</span>').join('');
    imgResultCard.classList.add('visible');
    applyDiscoverResults(data.companies || [], data.product_name || 'image search');
    closeImgPanel();
    navigateTo('discover');
    showUserToast(`Found ${data.companies?.length || 0} matching companies`);
  } catch (error) {
    console.error(error);
    showUserToast(error.message || 'Image search failed');
  } finally {
    imgSearchLoading.classList.remove('visible');
    btnRunImgSearch.disabled = false;
  }
});

btnViewProduct.addEventListener('click', () => {
  if (!currentProduct) return;
  closeImgPanel();
  navigateTo('discover');
});

function openProductEnquiryModal(product) {
  let modal = document.getElementById('productEnquiryModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'productEnquiryModal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(13,59,59,.38);display:none;align-items:center;justify-content:center;z-index:9200;padding:20px;';
    modal.innerHTML = `
      <div style="width:min(520px,100%);background:#fff;border-radius:22px;box-shadow:0 24px 70px rgba(13,59,59,.22);padding:24px;">
        <div style="display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:14px;">
          <div>
            <h3 style="margin:0;color:#0D3B3B;font-size:20px;">Send enquiry</h3>
            <p id="enquiryProductLabel" style="margin:6px 0 0;color:#5f7373;font-size:13px;line-height:1.5;"></p>
          </div>
          <button id="closeProductEnquiry" style="border:0;background:#eef6f6;width:34px;height:34px;border-radius:50%;cursor:pointer;"><i class="ri-close-line"></i></button>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin:16px 0;">
          <label style="display:flex;gap:8px;align-items:center;padding:10px 12px;border:1px solid #d7e7e7;border-radius:12px;cursor:pointer;">
            <input type="radio" name="enquiryCategory" value="general" checked> General enquiry
          </label>
          <label style="display:flex;gap:8px;align-items:center;padding:10px 12px;border:1px solid #d7e7e7;border-radius:12px;cursor:pointer;">
            <input type="radio" name="enquiryCategory" value="technical"> Technical help
          </label>
        </div>
        <textarea id="productEnquiryMessage" rows="5" style="width:100%;box-sizing:border-box;border:1px solid #d7e7e7;border-radius:14px;padding:13px;font-family:inherit;resize:vertical;" placeholder="Tell the team what you need help sourcing or clarifying..."></textarea>
        <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:16px;">
          <button id="cancelProductEnquiry" style="border:1px solid #d7e7e7;background:#fff;border-radius:12px;padding:10px 16px;cursor:pointer;">Cancel</button>
          <button id="submitProductEnquiry" style="border:0;background:#0D3B3B;color:#fff;border-radius:12px;padding:10px 18px;cursor:pointer;font-weight:700;">Send enquiry</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    const close = () => { modal.style.display = 'none'; };
    modal.querySelector('#closeProductEnquiry').addEventListener('click', close);
    modal.querySelector('#cancelProductEnquiry').addEventListener('click', close);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) close();
    });
    modal.querySelector('#submitProductEnquiry').addEventListener('click', async () => {
      const category = modal.querySelector('input[name="enquiryCategory"]:checked')?.value || 'general';
      const messageInput = modal.querySelector('#productEnquiryMessage');
      const message = messageInput.value.trim();
      const productName = modal.dataset.productName || 'product';

      if (!message) {
        showUserToast('Please add a short enquiry message.');
        return;
      }

      try {
        const companyId = modal.dataset.companyId;
        const isCompanyEnquiry = Boolean(companyId);
        await dashboardJsonPost('/support/tickets', {
          title: `${isCompanyEnquiry ? 'Company' : 'Product'} enquiry: ${productName}`,
          description: isCompanyEnquiry
            ? `${message}\n\nRelated company ID: ${companyId}`
            : message,
          category,
          priority: category === 'technical' ? 'high' : 'medium'
        });
        close();
        showUserToast(category === 'technical'
          ? 'Your technical enquiry was sent to the admin team.'
          : 'Your enquiry was sent to the support team.');
      } catch (error) {
        showUserToast(friendlyDashboardError('Could not send the enquiry right now. Please try again.'));
      }
    });
  }

  modal.dataset.productName = product?.name || 'product';
  modal.dataset.companyId = '';
  modal.querySelector('#enquiryProductLabel').textContent = `About ${product?.name || 'this product'}. Choose where this should go and add a short note.`;
  modal.querySelector('#productEnquiryMessage').value = `I would like to enquire about ${product?.name || 'this product'}.`;
  modal.style.display = 'flex';
}

function openCompanyEnquiryModal(companyId, companyName = 'this company') {
  openProductEnquiryModal({
    name: companyName
  });
  const modal = document.getElementById('productEnquiryModal');
  if (!modal) return;

  modal.dataset.companyId = String(companyId || '');
  modal.dataset.productName = companyName;
  modal.querySelector('#enquiryProductLabel').textContent = `About ${companyName}. Choose where this should go and add a short note.`;
  modal.querySelector('#productEnquiryMessage').value = `I would like to enquire about trading with ${companyName}.`;
}

function openOverviewInquiryModal() {
  let modal = document.getElementById('overviewInquiryModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'overviewInquiryModal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(13,59,59,.38);display:none;align-items:center;justify-content:center;z-index:9200;padding:20px;';
    modal.innerHTML = `
      <div style="width:min(520px,100%);background:#fff;border-radius:22px;box-shadow:0 24px 70px rgba(13,59,59,.22);padding:24px;">
        <div style="display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:14px;">
          <div>
            <h3 style="margin:0;color:#0D3B3B;font-size:20px;">Send inquiry</h3>
            <p style="margin:6px 0 0;color:#5f7373;font-size:13px;line-height:1.5;">Ask the employee team about account status, verification, approvals, or platform support.</p>
          </div>
          <button id="closeOverviewInquiry" style="border:0;background:#eef6f6;width:34px;height:34px;border-radius:50%;cursor:pointer;"><i class="ri-close-line"></i></button>
        </div>
        <label style="display:block;margin:16px 0 7px;color:#0D3B3B;font-size:12px;font-weight:700;">Topic</label>
        <select id="overviewInquiryTopic" style="width:100%;box-sizing:border-box;border:1px solid #d7e7e7;border-radius:12px;padding:11px 12px;font-family:inherit;background:#fff;color:#0D3B3B;">
          <option value="account">Account status or approval</option>
          <option value="verification">Verification documents</option>
          <option value="general">General platform support</option>
        </select>
        <label style="display:block;margin:16px 0 7px;color:#0D3B3B;font-size:12px;font-weight:700;">Message</label>
        <textarea id="overviewInquiryMessage" rows="5" style="width:100%;box-sizing:border-box;border:1px solid #d7e7e7;border-radius:14px;padding:13px;font-family:inherit;resize:vertical;" placeholder="Tell the employee team what you need help with..."></textarea>
        <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:16px;">
          <button id="cancelOverviewInquiry" style="border:1px solid #d7e7e7;background:#fff;border-radius:12px;padding:10px 16px;cursor:pointer;">Cancel</button>
          <button id="submitOverviewInquiry" style="border:0;background:#0D3B3B;color:#fff;border-radius:12px;padding:10px 18px;cursor:pointer;font-weight:700;">Send inquiry</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    const close = () => { modal.style.display = 'none'; };
    modal.querySelector('#closeOverviewInquiry').addEventListener('click', close);
    modal.querySelector('#cancelOverviewInquiry').addEventListener('click', close);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) close();
    });
    modal.querySelector('#submitOverviewInquiry').addEventListener('click', async () => {
      const topic = modal.querySelector('#overviewInquiryTopic')?.value || 'account';
      const messageInput = modal.querySelector('#overviewInquiryMessage');
      const message = messageInput.value.trim();

      if (!message) {
        showUserToast('Please add a short inquiry message.');
        return;
      }

      const labels = {
        account: 'Account status or approval',
        verification: 'Verification documents',
        general: 'General platform support'
      };

      try {
        await dashboardJsonPost('/support/tickets', {
          title: `User inquiry: ${labels[topic] || 'Support request'}`,
          description: message,
          category: topic,
          priority: topic === 'verification' ? 'high' : 'medium'
        });
        close();
        showUserToast('Your inquiry was sent to the employee team.');
      } catch (error) {
        showUserToast(friendlyDashboardError('Could not send the inquiry right now. Please try again.'));
      }
    });
  }

  modal.querySelector('#overviewInquiryTopic').value = 'account';
  modal.querySelector('#overviewInquiryMessage').value = 'Hi, I would like help with my account status or pending approval.';
  modal.style.display = 'flex';
}

document.getElementById('overviewInquiryBtn')?.addEventListener('click', openOverviewInquiryModal);

function renderProductDetail(p) {
  const el = document.getElementById('productDetailContent');
  const specsHtml     = p.specs.map(s => '<div class="product-spec-item"><span class="spec-label">' + s.label + '</span><span class="spec-value">' + s.value + '</span></div>').join('');
  const suppliersHtml = p.suppliers.map(s => '<div class="supplier-row"><div class="supplier-avatar">' + s.init + '</div><div class="supplier-info"><div class="supplier-name">' + s.name + '</div><div class="supplier-meta">' + s.meta + '</div></div><span class="supplier-badge">' + s.score + ' match</span></div>').join('');
  const demandHtml    = p.demand.map(d => '<div class="market-demand-row"><span>' + d.market + '</span><div class="demand-bar-wrap"><div class="demand-bar" style="width:' + d.pct + '%"></div></div><span class="demand-pct">' + d.pct + '%</span></div>').join('');
  const badgesHtml    = p.tags.map(t => '<span class="product-hero-badge">' + t + '</span>').join('') + '<span class="product-hero-badge green"><i class="ri-shield-check-fill"></i> Trade Ready</span>';
  const tagsHtml      = p.tags.map(t => '<span class="product-tag-full">' + t + '</span>').join('');

  el.innerHTML =
    '<div class="product-detail-hero">' +
      '<div class="product-detail-left">' +
        '<div class="product-icon-lg">' + p.icon + '</div>' +
        '<div class="product-hero-info">' +
          '<h2>' + p.name + '</h2>' +
          '<p class="product-hero-meta">' + p.category + ' &bull; HS Code: ' + p.hsCode + ' &bull; Origin: ' + p.origin + '</p>' +
          '<div class="product-hero-badges">' + badgesHtml + '</div>' +
        '</div>' +
      '</div>' +
      '<button class="btn-back-product" id="btnBackProduct"><i class="ri-arrow-left-line"></i> Back</button>' +
    '</div>' +
    '<div class="product-detail-grid">' +
      '<div class="product-detail-card"><h3><i class="ri-file-text-line"></i> Product Description</h3><p class="product-desc-text">' + p.desc + '</p></div>' +
      '<div class="product-detail-card"><h3><i class="ri-list-check-2"></i> Technical Specifications</h3><div class="product-spec-grid">' + specsHtml + '</div></div>' +
      '<div class="product-detail-card"><h3><i class="ri-building-line"></i> Available Suppliers</h3><div class="product-suppliers">' + suppliersHtml + '</div></div>' +
      '<div class="product-detail-card"><h3><i class="ri-bar-chart-grouped-line"></i> Global Market Demand</h3><div class="product-market-list">' + demandHtml + '</div></div>' +
      '<div class="product-detail-card"><h3><i class="ri-price-tag-3-line"></i> Product Tags</h3><div class="product-tags-full">' + tagsHtml + '</div></div>' +
      '<div class="product-detail-card"><h3><i class="ri-send-plane-line"></i> Take Action</h3><p style="font-size:13px;color:#4a6464;line-height:1.6;margin-bottom:16px;">Interested in sourcing this product? Connect with verified suppliers or save it to your watchlist.</p><div class="product-cta-row"><button class="btn-enquire" id="btnEnquire"><i class="ri-message-3-line"></i> Enquire with Suppliers</button><button class="btn-save-product" id="btnSaveProduct"><i class="ri-bookmark-line"></i> Save to Watchlist</button></div></div>' +
    '</div>';

  document.getElementById('btnBackProduct').addEventListener('click', () => navigateTo('discover'));
  document.getElementById('btnEnquire').addEventListener('click', () => openProductEnquiryModal(p));
  document.getElementById('btnSaveProduct').addEventListener('click', () => showUserToast('Product saved to watchlist!'));
}

// ============================================================
//   MASHA AI
// ============================================================
const mashaFab      = document.getElementById('mashaFab');
const mashaWindow   = document.getElementById('mashaWindow');
const mashaClose    = document.getElementById('mashaClose');
const mashaInput    = document.getElementById('mashaWinInput');
const mashaSend     = document.getElementById('mashaWinSend');
const mashaMessages = document.getElementById('mashaWinMessages');
const openMasha     = document.getElementById('openMasha');
let mashaOpen = false;
const mashaHistory = [];

const mashaKB = [
  { patterns:['verify','document','license'], response:'To complete verification, go to Verification in the sidebar and upload your remaining documents. Our team reviews within 48 hours.' },
  { patterns:['match','partner','find','connect'], response:'Visit the Discover page to find new trading partners, or check Matches for your AI-curated suggestions!' },
  { patterns:['message','chat','contact'], response:'Head to the Messages section to chat with your trading partners directly.' },
  { patterns:['analytic','insight','stat'], response:'Your Analytics page shows profile views, connection rates, and trending market data.' },
  { patterns:['image','photo','picture','camera','product search'], response:'Use the camera button inside the search bar to search by product image! Upload a photo and I will identify the product and show trade details.' },
  { patterns:['payment','pay','send money','transfer'], response:'Use the green payment button in the Messages chat to send a secure business payment to your trading partner!' },
  { patterns:['hello','hi','hey','howzit'], response:"Hi there! I'm Masha. I can help you navigate Trade Grid — verification, matches, messages, image search, payments, anything!" },
  { patterns:['help','how'], response:'I can help with: finding trading partners, verification status, analytics, image product search, sending payments, or messaging. What do you need?' },
];

function mashaGetResponse(text) {
  const lower = text.toLowerCase();
  for (const entry of mashaKB) { if (entry.patterns.some(p => lower.includes(p))) return entry.response; }
  return "I'm not sure about that, but contact support at support@tradegrid.com. Is there anything else I can help with?";
}

function mashaAddMsg(text, sender) {
  const row = document.createElement('div');
  row.className = 'masha-msg-row ' + sender;
  const avatar = document.createElement('div');
  avatar.className = 'masha-msg-avatar';
  avatar.innerHTML = sender === 'bot' ? '<i class="ri-robot-2-line"></i>' : '<i class="ri-user-3-line"></i>';
  const bubble = document.createElement('div');
  bubble.className = 'masha-msg-bubble';
  bubble.innerHTML = DOMPurify.sanitize(marked.parse(text));
  if (sender === 'bot') { row.appendChild(avatar); row.appendChild(bubble); }
  else                  { row.appendChild(bubble); row.appendChild(avatar); }
  mashaMessages.appendChild(row);
  mashaMessages.scrollTop = mashaMessages.scrollHeight;
}

function toggleMasha() {
  mashaOpen = !mashaOpen;
  mashaWindow.classList.toggle('open', mashaOpen);
  const io = mashaFab.querySelector('.icon-open');
  const ic = mashaFab.querySelector('.icon-close');
  if (io) io.style.display = mashaOpen ? 'none' : 'flex';
  if (ic) ic.style.display = mashaOpen ? 'flex' : 'none';
  const pulse = mashaFab.querySelector('.fab-pulse');
  if (pulse) pulse.style.display = 'none';
  if (mashaOpen && mashaMessages.children.length === 0) {
    setTimeout(() => {
      const greeting = "Hi! I'm Masha. How can I help you today?";
      mashaAddMsg(greeting, 'bot');
      mashaHistory.push({ role: 'assistant', content: greeting });
    }, 300);
  }
}

async function mashaSendMsg() {
  const text = mashaInput.value.trim();
  if (!text) return;
  mashaAddMsg(text, 'user');
  const historyForRequest = mashaHistory.slice(-10);
  mashaHistory.push({ role: 'user', content: text });
  mashaInput.value = '';
  mashaSend.disabled = true;
  try {
    const response = await fetch('http://localhost:5000/chat/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage: text, history: historyForRequest })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || 'Masha AI is not available right now.');
    }
    const reply = data.reply || 'I could not generate a response right now.';
    mashaAddMsg(reply, 'bot');
    mashaHistory.push({ role: 'assistant', content: reply });
  } catch (error) {
    const fallback = error.message || 'Masha AI is not available right now.';
    mashaAddMsg(fallback, 'bot');
    mashaHistory.push({ role: 'assistant', content: fallback });
  } finally {
    mashaSend.disabled = false;
    mashaInput.focus();
  }
}

mashaFab.addEventListener('click', toggleMasha);
mashaClose.addEventListener('click', toggleMasha);
openMasha.addEventListener('click', toggleMasha);
mashaSend.addEventListener('click', mashaSendMsg);
mashaInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); mashaSendMsg(); } });

// ============================================================
//   NOTIFICATION PANEL — with page redirects
// ============================================================
const notifBtn     = document.getElementById('notifBtn');
const notifPanel   = document.getElementById('notifPanel');
const notifMarkAll = document.getElementById('notifMarkAll');
const notifCountEl = document.getElementById('notifCount');

// Map each notification to a target page and an optional conversation to load
const notifActions = [
  { page: 'matches',      conversation: null },   // New match — Asian Trade Co
  { page: 'messages',     conversation: 'EI'  },  // Euro Import Solutions message
  { page: 'verification', conversation: null },   // Business License under review
  { page: 'matches',      conversation: null },   // Middle East Trading accepted
  { page: 'verification', conversation: null },   // Identity verification approved
];

notifBtn.addEventListener('click', (e) => { e.stopPropagation(); notifPanel.classList.toggle('hidden'); closeImgPanel(); });

notifMarkAll.addEventListener('click', () => {
  document.querySelectorAll('.notif-item.unread').forEach(n => n.classList.remove('unread'));
  if (notifCountEl) { notifCountEl.textContent = '0'; notifCountEl.style.display = 'none'; }
  showUserToast('All notifications marked as read');
  updateTopbarNotifCount();
});

document.querySelectorAll('.notif-item').forEach((item, index) => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', () => {
    item.classList.remove('unread');
    updateTopbarNotifCount();

    const action = notifActions[index];
    if (action) {
      notifPanel.classList.add('hidden');
      if (action.conversation) {
        navigateTo(action.page);
        setTimeout(() => {
          loadConversation(action.conversation);
          document.querySelectorAll('.msg-list-item').forEach(li => {
            li.classList.remove('active');
            if (li.querySelector('.ml-avatar')?.textContent?.trim() === action.conversation) {
              li.classList.add('active');
            }
          });
        }, 50);
      } else {
        navigateTo(action.page);
      }
    }
  });
});

document.addEventListener('click', (e) => { if (!notifPanel.contains(e.target) && e.target !== notifBtn) notifPanel.classList.add('hidden'); });

// Replace the static notification demo data with live backend notifications.
const liveNotifBtn = notifBtn.cloneNode(true);
notifBtn.replaceWith(liveNotifBtn);
const liveNotifMarkAll = notifMarkAll.cloneNode(true);
notifMarkAll.replaceWith(liveNotifMarkAll);
const notifListEl = notifPanel?.querySelector('.notif-list');

async function notificationRequest(path, options = {}) {
  const token = getDashboardToken();
  if (!token) return { ok: false, status: 401, data: { error: 'Login required' } };

  try {
    const response = await fetch(`http://localhost:5000${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {})
      }
    });
    const data = await response.json().catch(() => ({}));
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    return { ok: false, status: 0, data: { error: error.message } };
  }
}

function notificationVisual(type) {
  const map = {
    connection_request: { cls: 'teal', icon: 'ri-user-add-line' },
    connection_request_sent: { cls: 'teal', icon: 'ri-send-plane-line' },
    connection_accepted: { cls: 'green', icon: 'ri-checkbox-circle-line' },
    new_message: { cls: 'green', icon: 'ri-message-3-line' },
    missing_document: { cls: 'yellow', icon: 'ri-error-warning-line' },
    verification_submitted: { cls: 'yellow', icon: 'ri-shield-check-line' },
    verification_replaced: { cls: 'yellow', icon: 'ri-refresh-line' }
  };
  return map[type] || { cls: 'teal', icon: 'ri-notification-3-line' };
}

function notificationTarget(type) {
  if (type === 'new_message') return 'messages';
  if (type === 'missing_document' || String(type || '').startsWith('verification_')) return 'verification';
  if (String(type || '').startsWith('connection_')) return 'matches';
  return 'overview';
}

function getRequiredVerificationDocuments() {
  return [
    { id:'brc', name:'Business Registration Certificate', sub:'CIPC registration document' },
    { id:'id',  name:'Identity Document (Director)', sub:'SA ID or Passport' },
    { id:'bl',  name:'Business License', sub:'Municipal or sector-specific license' },
    { id:'tc',  name:'Tax Clearance Certificate', sub:'SARS tax clearance' }
  ];
}

function getMissingDocumentNotifications(documents = []) {
  const uploaded = new Set(documents.map(doc => String(doc.document_type || doc.name || '').trim().toLowerCase()));
  const missingAlerts = getRequiredVerificationDocuments()
    .filter(doc => !uploaded.has(doc.name.toLowerCase()))
    .map(doc => ({
      notification_id: `missing-${doc.id}`,
      type: 'missing_document',
      message: `${doc.name} is missing from your verification documents`,
      created_at: new Date().toISOString(),
      is_read: false,
      derived: true
    }));
  const reuploadAlerts = documents
    .filter(doc => ['rejected', 'declined', 'recheck'].includes(String(doc.status || '').toLowerCase()))
    .map(doc => ({
      notification_id: `reupload-${doc.verification_document_id || doc.id || doc.document_type}`,
      type: 'missing_document',
      message: `${doc.document_type || doc.name || 'A verification document'} needs to be re-uploaded`,
      created_at: doc.updated_at || doc.reviewed_at || new Date().toISOString(),
      is_read: false,
      derived: true
    }));
  return [...reuploadAlerts, ...missingAlerts];
}

function escapeNotifHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatNotifTime(value) {
  if (!value) return 'Just now';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Just now';
  const diffMs = Date.now() - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diffMs < minute) return 'Just now';
  if (diffMs < hour) return `${Math.floor(diffMs / minute)} min ago`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)} hour${Math.floor(diffMs / hour) === 1 ? '' : 's'} ago`;
  return date.toLocaleDateString();
}

function renderNotificationPanel(notifications = [], documents = []) {
  if (!notifListEl) return;
  const allNotifications = [
    ...getMissingDocumentNotifications(documents),
    ...notifications
  ];

  if (!allNotifications.length) {
    notifListEl.innerHTML = '<div class="notif-empty">No notifications right now.</div>';
    updateTopbarNotifCount();
    return;
  }

  notifListEl.innerHTML = allNotifications.map(notification => {
    const visual = notificationVisual(notification.type);
    const unread = notification.is_read ? '' : ' unread';
    const id = String(notification.notification_id || '');
    return `
      <div class="notif-item${unread}" data-notification-id="${escapeNotifHtml(id)}" data-derived="${notification.derived ? 'true' : 'false'}" data-target="${notificationTarget(notification.type)}">
        <div class="notif-icon ${visual.cls}"><i class="${visual.icon}"></i></div>
        <div class="notif-body">
          <p>${escapeNotifHtml(notification.message || 'You have a new notification')}</p>
          <span>${escapeNotifHtml(formatNotifTime(notification.created_at))}</span>
        </div>
      </div>`;
  }).join('');

  notifListEl.querySelectorAll('.notif-item').forEach(item => {
    item.addEventListener('click', async () => {
      const notificationId = item.dataset.notificationId;
      const isDerived = item.dataset.derived === 'true';
      if (!isDerived && notificationId) {
        await notificationRequest(`/auth/notifications/${notificationId}/read`, { method: 'PATCH' });
      }
      item.classList.remove('unread');
      updateTopbarNotifCount();
      notifPanel.classList.add('hidden');
      navigateTo(item.dataset.target || 'overview');
    });
  });
  updateTopbarNotifCount();
}

async function loadNotifications(documents = verifDocs) {
  const response = await notificationRequest('/auth/notifications');
  const notifications = response.ok ? (response.data.notifications || []) : [];
  renderNotificationPanel(notifications, documents);
  if (!response.ok) console.warn('Notifications could not be loaded', response);
}

liveNotifBtn.addEventListener('click', async (e) => {
  e.stopPropagation();
  notifPanel.classList.toggle('hidden');
  closeImgPanel();
  if (!notifPanel.classList.contains('hidden')) await loadNotifications(verifDocs);
});

liveNotifMarkAll.addEventListener('click', async () => {
  await notificationRequest('/auth/notifications/read-all', { method: 'PATCH' });
  document.querySelectorAll('.notif-item.unread').forEach(n => {
    if (n.dataset.derived !== 'true') n.classList.remove('unread');
  });
  updateTopbarNotifCount();
  showUserToast('Notifications marked as read');
});

// ── Topbar search ──
const topbarSearchBtn   = document.getElementById('topbarSearchBtn');
const topbarSearchInput = document.getElementById('topbarSearchInput');
topbarSearchBtn.addEventListener('click', async () => {
  const q = topbarSearchInput.value.trim();
  if (!q) return;
  showUserToast('Searching for "' + q + '"...');

  try {
    const params = new URLSearchParams({ search: q });
    const token = getDashboardToken();
    const response = await fetch(`http://localhost:5000/discover?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || 'Search failed.');
    }

    applyDiscoverResults(data.companies || [], q);
    navigateTo('discover');
    showUserToast(`${data.companies?.length || 0} compan${data.companies?.length === 1 ? 'y' : 'ies'} found.`);
  } catch (error) {
    console.error(error);
    showUserToast(friendlyDashboardError('Search is unavailable right now. Please try again shortly.'));
  }
});
topbarSearchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') topbarSearchBtn.click(); });

document.getElementById('avatarBtn').addEventListener('click', () => navigateTo('profile'));

// ============================================================
//   BUSINESS PROFILE — Edit functionality
// ============================================================

// Profile data store (in-memory)
const profileData = {
  about: 'Global Exports Ltd specialises in agricultural commodities, manufactured goods, and logistics solutions across Sub-Saharan Africa and international markets.',
  contact: {
    email:   'contact@globalexports.com',
    phone:   '+27 11 234 5678',
    website: 'www.globalexports.com',
    address: '14 Commerce St, Johannesburg, 2001',
  },
  trade: {
    type:    'Exporter',
    volume:  'R50M – R100M',
    industries: 'Agriculture, Manufacturing, Logistics',
    markets: 'Europe, Asia, Middle East',
  },
  products: ['Maize', 'Wheat', 'Citrus Fruits', 'Processed Foods', 'Machinery Parts', 'Logistics Services'],
};

function profileFallback(value, fallback = 'Not provided') {
  return value === undefined || value === null || value === '' ? fallback : value;
}

function profileList(values, fallback = 'Not provided') {
  return Array.isArray(values) && values.length ? values.join(', ') : fallback;
}

function safeInitials(name) {
  return String(name || 'TG')
    .split(/\s+/)
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'TG';
}

function syncProfileData(profile) {
  if (!profile) return;
  profileData.about = profile.company_description || '';
  profileData.contact = {
    email: profile.email || '',
    phone: profile.phone || '',
    website: profile.website || '',
    address: profile.address || '',
  };
  profileData.trade = {
    type: profile.business_type || '',
    volume: profile.annual_trade_volume || '',
    industries: profile.industry?.industry_name || '',
    markets: profileList(profile.target_regions, ''),
  };
  profileData.products = Array.isArray(profile.supplied_products) ? profile.supplied_products : [];
}

function setProfileDetailValues(sectionIndex, values) {
  const detailEls = document.querySelectorAll(`#page-profile .profile-section-card:nth-child(${sectionIndex}) .pd-value`);
  values.forEach((value, index) => {
    if (detailEls[index]) detailEls[index].textContent = profileFallback(value);
  });
}

function renderBusinessProfile(profile) {
  if (!profile) return;
  syncProfileData(profile);

  const companyName = profile.company_name || 'Your company';
  const industry = profile.industry?.industry_name || 'Industry not provided';
  const country = profile.location?.country || 'Country not provided';
  const established = profile.year_established ? `Est. ${profile.year_established}` : 'Est. not provided';
  const tradeType = profile.business_type || profile.trade_type || 'Trade type not provided';

  const logo = document.querySelector('#page-profile .profile-logo');
  const name = document.querySelector('#page-profile .profile-company-name');
  const tagline = document.querySelector('#page-profile .profile-tagline');
  const typeBadge = document.querySelector('#page-profile .profile-badge.type');
  const industryBadge = document.querySelector('#page-profile .profile-badge.industry');
  const about = document.querySelector('#page-profile .profile-about-text');
  const tagContainer = document.querySelector('#page-profile .profile-tags-list');

  if (logo) logo.textContent = safeInitials(companyName);
  if (name) name.textContent = companyName;
  if (tagline) tagline.textContent = `${tradeType} • ${country} • ${established}`;
  if (typeBadge) typeBadge.textContent = tradeType;
  if (industryBadge) industryBadge.textContent = industry;
  if (about) about.textContent = profileFallback(profile.company_description, 'No business description has been added yet.');

  setProfileDetailValues(2, [profile.email, profile.phone, profile.website, profile.address]);
  setProfileDetailValues(3, [
    tradeType,
    profile.annual_trade_volume,
    industry,
    profileList(profile.target_regions)
  ]);

  if (tagContainer) {
    const products = Array.isArray(profile.supplied_products) ? profile.supplied_products : [];
    tagContainer.innerHTML = products.length
      ? products.map(product => `<span class="profile-tag">${escapeProfileHtml(product)}</span>`).join('')
      : '<span class="profile-tag">No products added yet</span>';
  }
}

function escapeProfileHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function profileApi(path, options = {}) {
  const token = getDashboardToken();
  const response = await fetch(`http://localhost:5000${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || data.message || 'Profile request failed');
  return data;
}

async function loadBusinessProfile() {
  try {
    const data = await profileApi('/profile/me');
    renderBusinessProfile(data.profile);
    return data.profile;
  } catch (error) {
    showUserToast(error.message || 'Could not load business profile');
    return null;
  }
}

async function saveProfileField(field) {
  if (field === 'about') {
    return profileApi('/profile/me', {
      method: 'PATCH',
      body: JSON.stringify({
        company_description: document.getElementById('editAbout').value.trim()
      })
    });
  }

  if (field === 'contact') {
    return profileApi('/profile/me', {
      method: 'PATCH',
      body: JSON.stringify({
        email: document.getElementById('editEmail').value.trim(),
        phone: document.getElementById('editPhone').value.trim(),
        website: document.getElementById('editWebsite').value.trim(),
        address: document.getElementById('editAddress').value.trim()
      })
    });
  }

  if (field === 'trade') {
    await profileApi('/profile/me', {
      method: 'PATCH',
      body: JSON.stringify({
        business_type: document.getElementById('editTradeType').value.trim(),
        annual_trade_volume: document.getElementById('editVolume').value.trim()
      })
    });
    return profileApi('/profile/complete', {
      method: 'POST',
      body: JSON.stringify({
        update_mode: 'replace',
        annual_trade_volume: document.getElementById('editVolume').value.trim(),
        industry_name: document.getElementById('editIndustries').value.trim(),
        regions: document.getElementById('editMarkets').value.trim(),
        products: profileData.products.join(', '),
        company_description: profileData.about,
        phone: profileData.contact.phone,
        website: profileData.contact.website,
        address: profileData.contact.address
      })
    });
  }

  if (field === 'products') {
    return profileApi('/profile/complete', {
      method: 'POST',
      body: JSON.stringify({
        update_mode: 'replace',
        products: document.getElementById('editProducts').value,
        regions: profileData.trade.markets,
        industry_name: profileData.trade.industries,
        annual_trade_volume: profileData.trade.volume,
        company_description: profileData.about,
        phone: profileData.contact.phone,
        website: profileData.contact.website,
        address: profileData.contact.address
      })
    });
  }

  return null;
}

// Generic inline edit modal
function openEditModal(field) {
  // Remove any existing modal
  const existing = document.getElementById('profileEditModal');
  if (existing) existing.remove();

  const backdrop = document.createElement('div');
  backdrop.id = 'profileEditModal';
  backdrop.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.45);backdrop-filter:blur(4px);
    z-index:1100;display:flex;align-items:center;justify-content:center;
    opacity:0;transition:opacity 0.2s;
  `;
  setTimeout(() => { backdrop.style.opacity = '1'; }, 10);

  let bodyHtml = '';
  let title = '';

  if (field === 'about') {
    title = 'Edit About';
    bodyHtml = `
      <div style="display:flex;flex-direction:column;gap:6px;">
        <label style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;">About the Business</label>
        <textarea id="editAbout" rows="5" style="padding:10px 14px;border:1px solid var(--border-strong);border-radius:var(--radius-md);font-family:Inter,sans-serif;font-size:13px;color:var(--text);background:var(--bg);outline:none;resize:vertical;line-height:1.6;">${profileData.about}</textarea>
      </div>`;
  } else if (field === 'contact') {
    title = 'Edit Contact Information';
    bodyHtml = `
      ${editFieldRow('Email', 'editEmail', profileData.contact.email)}
      ${editFieldRow('Phone', 'editPhone', profileData.contact.phone)}
      ${editFieldRow('Website', 'editWebsite', profileData.contact.website)}
      ${editFieldRow('Address', 'editAddress', profileData.contact.address)}`;
  } else if (field === 'trade') {
    title = 'Edit Trade Information';
    bodyHtml = `
      ${editFieldRow('Trade Type', 'editTradeType', profileData.trade.type)}
      ${editFieldRow('Annual Volume', 'editVolume', profileData.trade.volume)}
      ${editFieldRow('Industries', 'editIndustries', profileData.trade.industries)}
      ${editFieldRow('Target Markets', 'editMarkets', profileData.trade.markets)}`;
  } else if (field === 'products') {
    title = 'Edit Products & Services';
    bodyHtml = `
      <div style="display:flex;flex-direction:column;gap:6px;">
        <label style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;">Products (comma-separated)</label>
        <textarea id="editProducts" rows="4" style="padding:10px 14px;border:1px solid var(--border-strong);border-radius:var(--radius-md);font-family:Inter,sans-serif;font-size:13px;color:var(--text);background:var(--bg);outline:none;resize:vertical;line-height:1.6;">${profileData.products.join(', ')}</textarea>
      </div>`;
  }

  backdrop.innerHTML = `
    <div style="background:var(--white);border-radius:var(--radius-xl);width:100%;max-width:480px;box-shadow:0 24px 64px rgba(13,59,59,0.22);overflow:hidden;transform:translateY(16px);transition:transform 0.22s cubic-bezier(0.4,0,0.2,1);" id="profileEditModalInner">
      <div style="background:linear-gradient(135deg,#0D3B3B,#0f4848);padding:20px 22px;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:16px;font-weight:800;color:#fff;">${title}</span>
        <button id="editModalClose" style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.25);color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;"><i class="ri-close-line"></i></button>
      </div>
      <div style="padding:24px;display:flex;flex-direction:column;gap:16px;">
        ${bodyHtml}
        <div style="display:flex;gap:12px;margin-top:4px;">
          <button id="editModalCancel" style="flex:1;padding:12px;background:transparent;color:var(--text-secondary);border:1px solid var(--border-strong);border-radius:var(--radius-md);font-family:Inter,sans-serif;font-size:14px;font-weight:600;cursor:pointer;">Cancel</button>
          <button id="editModalSave" style="flex:2;padding:12px;background:var(--primary);color:#fff;border:none;border-radius:var(--radius-md);font-family:Inter,sans-serif;font-size:14px;font-weight:700;cursor:pointer;">Save Changes</button>
        </div>
      </div>
    </div>`;

  document.body.appendChild(backdrop);
  setTimeout(() => { backdrop.querySelector('#profileEditModalInner').style.transform = 'translateY(0)'; }, 20);

  const closeModal = () => {
    backdrop.style.opacity = '0';
    setTimeout(() => backdrop.remove(), 200);
  };

  backdrop.querySelector('#editModalClose').addEventListener('click', closeModal);
  backdrop.querySelector('#editModalCancel').addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });

  backdrop.querySelector('#editModalSave').addEventListener('click', async () => {
    const saveButton = backdrop.querySelector('#editModalSave');
    saveButton.disabled = true;
    try {
      const saved = await saveProfileField(field);
      if (saved?.profile) {
        renderBusinessProfile(saved.profile);
      } else {
        await loadBusinessProfile();
      }
      closeModal();
      showUserToast('Profile updated successfully!');
      window.hydrateOverviewFromBackend?.();
      return;
    } catch (error) {
      saveButton.disabled = false;
      showUserToast(error.message || 'Could not update profile');
      return;
    }

    if (field === 'about') {
      profileData.about = document.getElementById('editAbout').value.trim();
      document.querySelector('.profile-about-text').textContent = profileData.about;

    } else if (field === 'contact') {
      profileData.contact.email   = document.getElementById('editEmail').value.trim();
      profileData.contact.phone   = document.getElementById('editPhone').value.trim();
      profileData.contact.website = document.getElementById('editWebsite').value.trim();
      profileData.contact.address = document.getElementById('editAddress').value.trim();
      // Update DOM
      const vals = document.querySelectorAll('#page-profile .profile-detail-item .pd-value');
      if (vals[0]) vals[0].textContent = profileData.contact.email;
      if (vals[1]) vals[1].textContent = profileData.contact.phone;
      if (vals[2]) vals[2].textContent = profileData.contact.website;
      if (vals[3]) vals[3].textContent = profileData.contact.address;

    } else if (field === 'trade') {
      profileData.trade.type       = document.getElementById('editTradeType').value.trim();
      profileData.trade.volume     = document.getElementById('editVolume').value.trim();
      profileData.trade.industries = document.getElementById('editIndustries').value.trim();
      profileData.trade.markets    = document.getElementById('editMarkets').value.trim();
      // Update DOM — trade section is the 3rd profile-section-card
      const tradeVals = document.querySelectorAll('#page-profile .profile-section-card:nth-child(3) .pd-value');
      if (tradeVals[0]) tradeVals[0].textContent = profileData.trade.type;
      if (tradeVals[1]) tradeVals[1].textContent = profileData.trade.volume;
      if (tradeVals[2]) tradeVals[2].textContent = profileData.trade.industries;
      if (tradeVals[3]) tradeVals[3].textContent = profileData.trade.markets;

    } else if (field === 'products') {
      profileData.products = document.getElementById('editProducts').value.split(',').map(s => s.trim()).filter(Boolean);
      const tagContainer = document.querySelector('#page-profile .profile-tags-list');
      if (tagContainer) {
        tagContainer.innerHTML = profileData.products.map(p => `<span class="profile-tag">${p}</span>`).join('');
      }
    }

    closeModal();
    showUserToast('Profile updated successfully!');
  });
}

function editFieldRow(label, id, value) {
  return `
    <div style="display:flex;flex-direction:column;gap:6px;">
      <label for="${id}" style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;">${label}</label>
      <input id="${id}" type="text" value="${value}" style="padding:10px 14px;border:1px solid var(--border-strong);border-radius:var(--radius-md);font-family:Inter,sans-serif;font-size:13px;color:var(--text);background:var(--bg);outline:none;" />
    </div>`;
}

// Wire up all profile section edit buttons
document.querySelectorAll('.profile-sec-edit').forEach(btn => {
  btn.addEventListener('click', () => openEditModal(btn.dataset.field));
});

// "Edit Profile" hero button — opens the About section as a starting point
document.getElementById('editProfileBtn')?.addEventListener('click', () => openEditModal('about'));

// ── Verification ──
// All docs are verified on login. Admins can flag docs needing re-upload.
// 'recheck' = re-upload required, 'required' = new doc needed, 'verified' = all good
const verifDocs = getRequiredVerificationDocuments().map(doc => ({
  ...doc,
  submitted: 'Not submitted',
  status: 'required',
  file_name: null,
  file_url: null
}));

const verifStatusConfig = {
  verified: { label:'Verified',           cls:'verified', icon:'ri-checkbox-circle-fill' },
  recheck:  { label:'Re-upload Required', cls:'pending',  icon:'ri-refresh-line'         },
  required: { label:'Action Required',    cls:'missing',  icon:'ri-error-warning-line'   },
};

function normalizeVerificationStatus(status) {
  const normalized = String(status || '').toLowerCase();
  if (normalized === 'approved' || normalized === 'verified') return 'verified';
  if (normalized === 'rejected' || normalized === 'declined') return 'recheck';
  return 'required';
}

function renderVerifTable() {
  const tbody = document.querySelector('.verif-table tbody');
  if (!tbody) return;
  tbody.innerHTML = verifDocs.map(doc => {
    const cfg = verifStatusConfig[doc.status];
    const actions = doc.status === 'verified'
      ? `<button class="verif-action-btn" onclick="viewDocument('${doc.id}')"><i class="ri-eye-line"></i> View</button>`
      : doc.status === 'recheck'
      ? `<button class="verif-action-btn" onclick="viewDocument('${doc.id}')"><i class="ri-eye-line"></i> View</button>
         <button class="verif-action-btn replace" onclick="reuploadDocument('${doc.id}')"><i class="ri-upload-cloud-line"></i> Re-upload</button>`
      : `<button class="verif-action-btn primary" onclick="reuploadDocument('${doc.id}')"><i class="ri-upload-cloud-line"></i> Upload</button>`;
    return `<tr>
      <td><div class="verif-doc-name"><i class="ri-file-text-line"></i> ${doc.name}</div><small>${doc.sub}</small></td>
      <td>${doc.submitted}</td>
      <td><span class="verif-status ${cfg.cls}"><i class="${cfg.icon}"></i> ${cfg.label}</span></td>
      <td>${actions}</td>
    </tr>`;
  }).join('');
}

function renderVerifBanner() {
  const banner = document.querySelector('.verif-banner');
  if (!banner) return;
  const issues = verifDocs.filter(d => d.status !== 'verified');
  if (issues.length === 0) {
    banner.className = 'verif-banner';
    banner.style.cssText = 'background:var(--green-bg);border:1px solid rgba(22,163,74,.2);border-radius:var(--radius-xl);padding:22px 28px;display:flex;align-items:center;gap:16px;';
    banner.innerHTML = `
      <div class="verif-banner-icon" style="color:var(--green);font-size:28px;flex-shrink:0;"><i class="ri-shield-check-line"></i></div>
      <div><h3 style="color:var(--green)">Fully Verified</h3><p>All ${verifDocs.length} documents verified — your account is in good standing.</p></div>
      <span class="verif-banner-badge" style="background:var(--green-bg);color:var(--green);border:1px solid rgba(22,163,74,.2);margin-left:auto;padding:6px 16px;border-radius:20px;font-size:12px;font-weight:700;white-space:nowrap;flex-shrink:0;">Verified</span>`;
  } else {
    banner.className = 'verif-banner pending-banner';
    banner.style.cssText = '';
    banner.innerHTML = `
      <div class="verif-banner-icon"><i class="ri-shield-half-line"></i></div>
      <div><h3>Action Required</h3><p>${issues.length} document${issues.length > 1 ? 's' : ''} need${issues.length === 1 ? 's' : ''} your attention</p></div>
      <span class="verif-banner-badge">Needs Attention</span>`;
  }
}

function renderOverviewVerifCard() {
  const items = document.querySelectorAll('#page-overview .verif-item');
  const iconMap = {
    verified: { cls:'done',    icon:'ri-checkbox-circle-fill' },
    recheck:  { cls:'pending', icon:'ri-time-line'            },
    required: { cls:'missing', icon:'ri-error-warning-line'   },
  };
  verifDocs.forEach((doc, i) => {
    if (!items[i]) return;
    const cfg = iconMap[doc.status];
    items[i].className = 'verif-item ' + cfg.cls;
    const iconEl = items[i].querySelector('i');
    if (iconEl) iconEl.className = cfg.icon;
    const span = items[i].querySelector('span');
    if (span) span.textContent = doc.status === 'verified'
      ? 'Verified ' + doc.submitted
      : doc.status === 'recheck' ? 'Re-upload required'
      : 'Not submitted yet';
  });
}

async function viewDocument(docId) {
  const doc = verifDocs.find(d => String(d.id) === String(docId));
  if (!doc) return;

  if (doc.localUrl) {
    window.open(doc.localUrl, '_blank', 'noopener');
    return;
  }

  try {
    if (Number.isFinite(Number(docId))) {
      const response = await fetch(`http://localhost:5000/verification/${docId}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(getDashboardToken() ? { Authorization: `Bearer ${getDashboardToken()}` } : {})
        }
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Could not load document');
      const fileUrl = data.document?.file_url || doc.file_url;
      if (fileUrl) {
        window.open(fileUrl, '_blank', 'noopener');
        return;
      }
    }
    showUserToast('No PDF file is available to view for ' + doc.name + '.');
  } catch (error) {
    showUserToast(error.message || 'Could not open document');
  }
}

// Initial render
renderVerifTable();
renderVerifBanner();
renderOverviewVerifCard();

// ── Verification — file upload triggers ──
// Hidden file input reused for all upload actions
function createVerifFileInput() {
  let input = document.getElementById('verifFileInput');
  if (!input) {
    input = document.createElement('input');
    input.type = 'file';
    input.id = 'verifFileInput';
    input.accept = 'application/pdf,.pdf';
    input.style.cssText = 'position:absolute;width:0;height:0;opacity:0;pointer-events:none;';
    document.body.appendChild(input);
  }
  return input;
}

let pendingUploadDocId = null;

function reuploadDocument(docId) {
  const doc = verifDocs.find(d => d.id === docId);
  if (!doc) return;
  pendingUploadDocId = docId;
  const input = createVerifFileInput();
  // Reset so same file can be re-selected
  input.value = '';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleVerifUpload(pendingUploadDocId, file);
  };
  input.click();
}

async function handleVerifUpload(docId, file) {
  const doc = verifDocs.find(d => d.id === docId);
  if (!doc) return;

  const isPdf = file?.type === 'application/pdf' || /\.pdf$/i.test(file?.name || '');
  if (!isPdf) {
    showUserToast('Please upload a PDF file only.');
    return;
  }

  try {
    const token = getDashboardToken();
    const hasBackendId = Number.isFinite(Number(doc.id));
    const response = await fetch(`http://localhost:5000/verification${hasBackendId ? `/${doc.id}` : ''}`, {
      method: hasBackendId ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({
        document_type: doc.name,
        file_name: file.name
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Could not submit document');

    if (doc.localUrl) URL.revokeObjectURL(doc.localUrl);
    doc.id = data.document?.verification_document_id || doc.id;
    doc.file_name = data.document?.file_name || file.name;
    doc.file_url = data.document?.file_url || null;
    doc.localUrl = URL.createObjectURL(file);
    doc.status = normalizeVerificationStatus(data.document?.status || 'pending');
    doc.submitted = new Date(data.document?.submitted_at || Date.now()).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });

    renderVerifTable();
    renderVerifBanner();
    renderOverviewVerifCard();
    const stillHasIssue = verifDocs.some(d => d.status !== 'verified');
    badgeState.verification.hasIssue = stillHasIssue;
    if (!stillHasIssue) badgeState.verification.seen = true;
    updateNavBadge('verification');
    showUserToast(doc.name + ' submitted for verification.');
  } catch (error) {
    showUserToast(error.message || 'Could not submit document');
  }
}

// Overview — "Update Documents" button navigates to Verification
const btnVerif = document.querySelector('.btn-verif');
if (btnVerif) {
  btnVerif.innerHTML = '<i class="ri-upload-cloud-line"></i> Update Documents';
  btnVerif.addEventListener('click', () => navigateTo('verification'));
}

// ── Analytics ──
document.querySelectorAll('.period-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.period-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    showUserToast('Showing ' + tab.textContent + ' analytics');
  });
});
document.querySelector('.btn-export-report')?.addEventListener('click', () => showUserToast('Preparing report for download...'));

// ── Settings ──
document.querySelectorAll('.toggle input').forEach(toggle => {
  toggle.addEventListener('change', () => {
    const label = toggle.closest('.setting-row')?.querySelector('p')?.textContent || 'Setting';
    showUserToast(label + ' ' + (toggle.checked ? 'enabled' : 'disabled'));
  });
});

// ============================================================
//   MESSAGES — conversation data & switcher
// ============================================================
let activeConversationId = null;
let preferredConversationId = null;

async function messageApiRequest(path, options = {}) {
  const token = getDashboardToken();
  const response = await fetch('http://localhost:5000' + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Message request failed.');
  }

  return data;
}

function getStoredCompanyId() {
  try {
    return Number(JSON.parse(localStorage.getItem('tradegridUser') || '{}').company_id);
  } catch (error) {
    return 0;
  }
}

function getConversationPartner(conversation, currentCompanyId) {
  if (!conversation) return {};
  return Number(conversation.company1_id) === Number(currentCompanyId)
    ? (conversation.company2 || {})
    : (conversation.company1 || {});
}

function messageTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const conversationData = {};

function cacheConversation(conversation, currentCompanyId) {
  if (!conversation?.conversation_id) return null;
  const partner = getConversationPartner(conversation, currentCompanyId);
  const name = partner.company_name || 'Trade partner';
  const avatar = safeInitials(name);
  const lastMessage = conversation.messages?.[0];
  const conversationKey = String(conversation.conversation_id);

  conversationData[conversationKey] = {
    name,
    sub: 'Conversation',
    avatar,
    conversationId: conversation.conversation_id,
    messages: lastMessage ? [{
      type: Number(lastMessage.sender_company_id) === Number(currentCompanyId) ? 'me' : 'them',
      text: lastMessage.content
    }] : []
  };

  return {
    key: conversationKey,
    name,
    avatar,
    lastMessage,
    unread: Number(conversation.unread_count || 0)
  };
}

async function loadConversation(conversationKey) {
  const data = conversationData[String(conversationKey)];
  if (!data) return;

  // Clear this conversation's unread count and refresh nav badge
  if (badgeState.messages.unread[data.avatar] !== undefined) {
    badgeState.messages.unread[data.avatar] = 0;
  }
  updateNavBadge('messages');

  const chatHeader = document.querySelector('.msg-chat-header');
  if (chatHeader) {
    chatHeader.innerHTML = `
      <div class="ml-avatar">${data.avatar}</div>
      <div>
        <p class="chat-name">${data.name}</p>
        <p class="chat-sub">${data.sub}</p>
      </div>`;
  }
  const payRecipientAvatar = document.getElementById('payRecipientAvatar');
  const payRecipientName = document.getElementById('payRecipientName');
  if (payRecipientAvatar) payRecipientAvatar.textContent = data.avatar;
  if (payRecipientName) payRecipientName.textContent = data.name;

  activeConversationId = data.conversationId || activeConversationId;

  try {
    if (data.conversationId) {
      const response = await messageApiRequest(`/messages/conversations/${data.conversationId}`);
      const currentCompanyId = getStoredCompanyId();
      data.messages = (response.conversation?.messages || []).map(message => ({
        type: Number(message.sender_company_id) === currentCompanyId ? 'me' : 'them',
        text: message.content
      }));

      await messageApiRequest(`/messages/conversations/${data.conversationId}/read`, {
        method: 'PATCH'
      }).catch(() => {});
    }
  } catch (error) {
    showUserToast(error.message || 'Could not load conversation');
  } finally {
    const chatBody = document.querySelector('.msg-chat-body');
    if (chatBody) {
      chatBody.innerHTML = '';
      if (!data.messages.length) {
        chatBody.innerHTML = '<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:13px;">No messages yet. Start the conversation below.</div>';
      } else {
        data.messages.forEach(msg => {
          const bubble = document.createElement('div');
          bubble.className = 'chat-bubble ' + msg.type;
          bubble.textContent = msg.text;
          chatBody.appendChild(bubble);
        });
      }
      chatBody.scrollTop = chatBody.scrollHeight;
    }

  }
}

function renderMessagesList(conversations, currentCompanyId) {
  const panel = document.querySelector('.msg-list-panel');
  if (!panel) return;

  panel.querySelectorAll('.msg-list-item').forEach(item => item.remove());
  const search = panel.querySelector('.msg-list-search');

  if (!conversations.length) {
    if (preferredConversationId && conversationData[String(preferredConversationId)]) {
      const preferredKey = String(preferredConversationId);
      const preferred = conversationData[preferredKey];
      const item = document.createElement('div');
      item.className = 'msg-list-item active';
      item.dataset.conversationId = preferred.conversationId;
      item.dataset.conversationKey = preferredKey;
      item.innerHTML = `
        <div class="ml-avatar">${preferred.avatar}</div>
        <div class="ml-body">
          <div class="ml-top"><span>${preferred.name}</span><span class="ml-time"></span></div>
          <p class="ml-preview">No messages yet</p>
        </div>`;
      item.addEventListener('click', () => loadConversation(preferredKey));
      panel.appendChild(item);
      activeConversationId = Number(preferredConversationId);
      loadConversation(preferredKey);
      return;
    }
    activeConversationId = null;
    const empty = document.createElement('div');
    empty.className = 'msg-list-item';
    empty.innerHTML = '<div class="ml-body"><p class="ml-preview">No conversations yet.</p></div>';
    panel.appendChild(empty);
    const body = document.querySelector('.msg-chat-body');
    if (body) body.innerHTML = '<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:13px;">Select a conversation or start one from Matches.</div>';
    const chatHeader = document.querySelector('.msg-chat-header');
    if (chatHeader) {
      chatHeader.innerHTML = '<div class="ml-avatar">--</div><div><p class="chat-name">No conversation selected</p><p class="chat-sub">Start one from Matches</p></div>';
    }
    const payRecipientAvatar = document.getElementById('payRecipientAvatar');
    const payRecipientName = document.getElementById('payRecipientName');
    if (payRecipientAvatar) payRecipientAvatar.textContent = '--';
    if (payRecipientName) payRecipientName.textContent = 'Select a conversation';
    return;
  }

  conversations.forEach((conversation, index) => {
    const cached = cacheConversation(conversation, currentCompanyId);
    if (!cached) return;
    const { key: conversationKey, name, avatar, lastMessage, unread } = cached;

    const item = document.createElement('div');
    const isSelected = Number(conversation.conversation_id) === Number(preferredConversationId || activeConversationId);
    item.className = 'msg-list-item' + (isSelected || (index === 0 && !activeConversationId && !preferredConversationId) ? ' active' : '');
    item.dataset.conversationId = conversation.conversation_id;
    item.dataset.conversationKey = conversationKey;
    item.innerHTML = `
      <div class="ml-avatar">${avatar}</div>
      <div class="ml-body">
        <div class="ml-top"><span>${name}</span><span class="ml-time">${messageTime(lastMessage?.created_at || conversation.last_message_at)}</span></div>
        <p class="ml-preview">${lastMessage?.content || 'No messages yet'}</p>
      </div>
      ${unread > 0 ? `<span class="ml-unread">${unread}</span>` : ''}`;

    item.addEventListener('click', () => {
      document.querySelectorAll('.msg-list-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      item.querySelector('.ml-unread')?.remove();
      loadConversation(conversationKey);
    });

    panel.appendChild(item);
  });

  const preferredKey = preferredConversationId ? String(preferredConversationId) : null;
  if (preferredKey && conversationData[preferredKey]) {
    if (!panel.querySelector(`[data-conversation-key="${preferredKey}"]`)) {
      const preferred = conversationData[preferredKey];
      const item = document.createElement('div');
      item.className = 'msg-list-item active';
      item.dataset.conversationId = preferred.conversationId;
      item.dataset.conversationKey = preferredKey;
      item.innerHTML = `
        <div class="ml-avatar">${preferred.avatar}</div>
        <div class="ml-body">
          <div class="ml-top"><span>${preferred.name}</span><span class="ml-time"></span></div>
          <p class="ml-preview">No messages yet</p>
        </div>`;
      item.addEventListener('click', () => loadConversation(preferredKey));
      panel.appendChild(item);
    }
    document.querySelectorAll('.msg-list-item').forEach(item => {
      item.classList.toggle('active', item.dataset.conversationKey === preferredKey);
    });
    activeConversationId = Number(preferredConversationId);
    loadConversation(preferredKey);
    return;
  }

  const shouldSelectFirst = !activeConversationId || !conversations.some(c => Number(c.conversation_id) === Number(activeConversationId));
  if (shouldSelectFirst) {
    const firstConversationKey = panel.querySelector('.msg-list-item[data-conversation-key]')?.dataset.conversationKey;
    if (firstConversationKey) loadConversation(firstConversationKey);
  }
}

async function openConversationFromMatch(companyId) {
  const created = await messageApiRequest('/messages/conversations', {
    method: 'POST',
    body: JSON.stringify({ other_company_id: companyId })
  });
  const conversationId = created.conversation?.conversation_id;
  if (!conversationId) {
    throw new Error('Conversation could not be opened.');
  }

  const currentCompanyId = getStoredCompanyId();
  preferredConversationId = Number(conversationId);
  activeConversationId = Number(conversationId);
  cacheConversation(created.conversation, currentCompanyId);
  navigateTo('messages');

  let conversations = [created.conversation];
  try {
    const conversationsResponse = await messageApiRequest('/messages/conversations');
    conversations = conversationsResponse.conversations?.length
      ? conversationsResponse.conversations
      : [created.conversation];
  } catch (error) {
    conversations = [created.conversation];
  }
  renderMessagesList(conversations, currentCompanyId);

  const conversationKey = String(conversationId);
  document.querySelectorAll('.msg-list-item').forEach(item => {
    item.classList.toggle('active', item.dataset.conversationKey === conversationKey);
  });
  await loadConversation(conversationKey);
  return created.conversation;
}

// Message list switcher
document.querySelectorAll('.msg-list-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.msg-list-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const unread = item.querySelector('.ml-unread');
    if (unread) unread.remove();
    const initials = item.querySelector('.ml-avatar')?.textContent?.trim();
    if (initials) {
      // Clear that conversation's unread count
      if (badgeState.messages.unread[initials] !== undefined) {
        badgeState.messages.unread[initials] = 0;
      }
      updateNavBadge('messages');
      loadConversation(initials);
    }
  });
});

// ── Messages send ──
const chatInput = document.querySelector('.msg-chat-input input');
const chatSend  = document.getElementById('chatSendBtn');
chatSend?.addEventListener('click', async () => {
  const val = chatInput?.value.trim(); if (!val) return;
  if (!activeConversationId && preferredConversationId) {
    activeConversationId = Number(preferredConversationId);
  }
  if (!activeConversationId) {
    showUserToast('Select a conversation first.');
    return;
  }

  chatSend.disabled = true;
  try {
    const sent = await messageApiRequest(`/messages/conversations/${activeConversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content: val })
    });
    const sentMessage = sent.data;
    const conversationKey = String(activeConversationId);
    if (conversationData[conversationKey]) {
      conversationData[conversationKey].messages.push({ type: 'me', text: val });
    }

    const body = document.querySelector('.msg-chat-body');
    if (body) {
      if (body.textContent.includes('No messages yet')) body.innerHTML = '';
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble me';
      bubble.textContent = val;
      body.appendChild(bubble);
      body.scrollTop = body.scrollHeight;
    }
    const activeItem = document.querySelector(`.msg-list-item[data-conversation-key="${conversationKey}"]`);
    if (activeItem) {
      const preview = activeItem.querySelector('.ml-preview');
      const time = activeItem.querySelector('.ml-time');
      if (preview) preview.textContent = val;
      if (time) time.textContent = messageTime(sentMessage?.created_at || new Date().toISOString());
    }
    const unreadTotal = getTotalUnreadMessages();
    updateKpi('Unread Messages', unreadTotal, unreadTotal === 1 ? '1 unread message' : `${unreadTotal} unread messages`);
    if (chatInput) chatInput.value = '';
    showUserToast('Message sent');
  } catch (error) {
    showUserToast(error.message || 'Could not send message');
  } finally {
    chatSend.disabled = false;
  }
});
chatInput?.addEventListener('keydown', e => { if (e.key === 'Enter') chatSend?.click(); });

// ── Discover connect ──
document.querySelectorAll('.btn-ph-primary').forEach(btn => {
  btn.addEventListener('click', () => {
    const company = btn.closest('.placeholder-card')?.querySelector('h4')?.textContent || 'company';
    showUserToast('Connection request sent to ' + company);
    btn.innerHTML = '<i class="ri-check-line"></i> Requested';
    btn.disabled = true; btn.style.opacity = '0.7';
  });
});

// ============================================================
//   OVERVIEW — Recent Messages clickable
// ============================================================
document.querySelectorAll('#page-overview .msg-preview').forEach(preview => {
  preview.style.cursor = 'pointer';
  preview.addEventListener('click', () => {
    // Identify which contact this preview belongs to
    const avatarEl = preview.querySelector('.msg-preview-avatar');
    const initials  = avatarEl?.textContent?.trim();

    // Navigate to messages page
    navigateTo('messages');

    // After the page switch, set the active conversation
    setTimeout(() => {
      if (initials && conversationData[initials]) {
        // Mark the right list item as active
        document.querySelectorAll('.msg-list-item').forEach(li => {
          li.classList.remove('active');
          if (li.querySelector('.ml-avatar')?.textContent?.trim() === initials) {
            li.classList.add('active');
            // Remove unread badge on that list item too
            const badge = li.querySelector('.ml-unread');
            if (badge) badge.remove();
          }
        });
        loadConversation(initials);
      }

      // Also remove the unread styling from this overview preview
      preview.classList.remove('unread');
    }, 50);
  });
});

// ============================================================
//   DISCOVER PARTNERS — filter search
// ============================================================
let discoverPartners = [];

function renderDiscoverCards(partners) {
  const grid = document.querySelector('#page-discover .placeholder-grid');
  if (!grid) return;

  if (partners.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px 0;color:var(--text-muted);font-size:14px;">
      <i class="ri-search-eye-line" style="font-size:32px;display:block;margin-bottom:10px;opacity:.4;"></i>
      No partners found matching your filters. Try broadening your search.
    </div>`;
    return;
  }

  grid.innerHTML = partners.map(p => `
    <div class="placeholder-card">
      <div class="ph-avatar">${p.init}</div>
      <h4>${p.name}</h4>
      <p>${p.meta}</p>
      <div class="ph-score">${p.score}% match</div>
      <div class="ph-actions">
        <button class="btn-ph-primary disc-connect-btn"><i class="ri-add-line"></i> Connect</button>
        <button class="btn-ph-secondary"><i class="ri-user-line"></i> Profile</button>
      </div>
    </div>
  `).join('');

  // Re-attach connect button listeners
  grid.querySelectorAll('.disc-connect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const company = btn.closest('.placeholder-card')?.querySelector('h4')?.textContent || 'company';
      showUserToast('Connection request sent to ' + company);
      btn.innerHTML = '<i class="ri-check-line"></i> Requested';
      btn.disabled = true; btn.style.opacity = '0.7';
    });
  });
}

// Wire up the Search button
const discSearchBtn = document.querySelector('#page-discover .disc-search-btn');
const discSelects   = document.querySelectorAll('#page-discover .disc-select');

if (discSearchBtn) {
  discSearchBtn.addEventListener('click', async () => {
    const [industryEl, countryEl, typeEl] = discSelects;
    const industry = industryEl?.value || 'All Industries';
    const country  = countryEl?.value  || 'All Countries';
    const type     = typeEl?.value     || 'All Types';

    try {
      const params = new URLSearchParams();
      if (industry !== 'All Industries') params.set('industry', industry);
      if (country !== 'All Countries') params.set('country', country);
      if (type !== 'All Types') params.set('business_type', type);
      const response = await fetch(`http://localhost:5000/discover?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(getDashboardToken() ? { Authorization: `Bearer ${getDashboardToken()}` } : {})
        }
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Could not filter discover companies');
      applyDiscoverResults(data.companies || [], 'Filtered companies', true);
      showUserToast((data.companies || []).length > 0
        ? `Found ${(data.companies || []).length} partner${(data.companies || []).length !== 1 ? 's' : ''}`
        : 'No partners found');
    } catch (error) {
      showUserToast(error.message || 'Could not filter partners');
    }
  });
}


/* ============================================================
   BADGE BOOTSTRAP — strip HTML-hardcoded badges, render from state
   ============================================================ */
(function () {
  // Strip all hardcoded nav-badge spans so we start clean
  document.querySelectorAll('.nav-item .nav-badge').forEach(b => b.remove());
  // Render from badgeState
  refreshAllNavBadges();
  // Set topbar notif count from actual unread notification items
  updateTopbarNotifCount();
})();

/* ============================================================
   DARK MODE PATCH (inline — mirrors user-dashboard-darkmode-patch.js)
   ============================================================ */
(function () {
  if (localStorage.getItem('tradegrid-dark-mode') === '1') {
    document.body.classList.add('dark-mode');
  }
})();

document.addEventListener('DOMContentLoaded', function () {
  var settingsGrid = document.querySelector('#page-settings .settings-grid');
  if (!settingsGrid) return;
  var card = document.createElement('div');
  card.className = 'settings-card';
  card.innerHTML =
    '<h3>Appearance</h3>' +
    '<div class="setting-row" id="dashDarkModeRow">' +
      '<div><p>Dark Mode</p><span>Applied across all Trade Grid pages</span></div>' +
      '<label class="toggle"><input type="checkbox" id="dashDarkModeToggle"><span class="toggle-slider"></span></label>' +
    '</div>';
  settingsGrid.insertBefore(card, settingsGrid.firstChild);
  var toggle = document.getElementById('dashDarkModeToggle');
  if (!toggle) return;
  toggle.checked = localStorage.getItem('tradegrid-dark-mode') === '1';
  toggle.addEventListener('change', function () {
    var isDark = toggle.checked;
    localStorage.setItem('tradegrid-dark-mode', isDark ? '1' : '0');
    document.body.classList.toggle('dark-mode', isDark);
  });
});

const speedConnectionsBtn = document.getElementById('speedConnectionsBtn') || document.getElementById('speedMatchesLaunchBtn');
const speedBtnIcon        = document.getElementById('speedBtnIcon') || speedConnectionsBtn?.querySelector('.speed-btn-icon');
const speedPulseRing      = document.getElementById('speedPulseRing') || speedConnectionsBtn?.querySelector('.speed-pulse-ring');
let speedBusy = false;

speedConnectionsBtn?.addEventListener('click', () => {
  if (speedBusy) return;
  speedBusy = true;
  speedBtnIcon?.classList.add('blurred');
  speedPulseRing?.classList.add('animate');
  setTimeout(() => speedBtnIcon?.classList.remove('blurred'), 600);
  setTimeout(() => { speedPulseRing?.classList.remove('animate'); speedBusy = false; }, 750);
  showUserToast('Finding your best connections...');
  setTimeout(() => { window.location.href = '../Speed-dating-page/speed-date.html'; }, 900);
});

// ============================================================
//   DISCOVER — Swipe card interface
// ============================================================
let discCompanies = [];

const discTips = [
  'Companies with a match score above 75% are 3× more likely to respond.',
  'Add more products to your profile to improve match accuracy.',
  'Verified businesses get 2× more connection responses.',
  'Connecting with partners in different regions reduces supply chain risk.',
  'Complete your trade information to unlock more precise AI matching.',
];

let discIndex = 0, discConnected = 0, discPassed = 0;
let discoverHasActiveSearch = false;

function normalizeDiscoverCompany(company) {
  const name = company.company_name || company.name || company.companyName || company.businessName || 'Trade Partner';
  const country = company.location?.country || company.country || company.region || 'Global';
  const industry = company.industry?.industry_name || company.industry || company.sector || (Array.isArray(company.industries) ? company.industries[0] : 'Trade');
  const type = company.business_type || company.type || company.tradeType || company.role || 'Both';
  const scoreValue = company.score || company.matchScore || company.match || null;
  const scoreText = scoreValue ? (String(scoreValue).includes('%') ? String(scoreValue) : `${scoreValue}%`) : 'N/A';
  const productList = company.supplied_products || company.products || company.matched_products || [];
  const marketList = company.target_regions || company.markets || [];
  const products = Array.isArray(productList) ? productList.join(', ') : (productList || company.company_description || company.description || 'General trade');
  const markets = Array.isArray(marketList) && marketList.length ? marketList.join(', ') : (marketList || country);
  const initials = company.init || company.avatar || name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase();

  return {
    company_id: company.company_id || company.id,
    relationship_status: company.relationship_status || company.connection_status || 'available',
    avatar: initials,
    name,
    sub: company.sub || `${country} · ${industry} · ${type}`,
    score: scoreText,
    tags: company.tags || [industry, type, country].filter(Boolean),
    volume: company.volume || company.annualVolume || 'Not specified',
    est: company.est || company.established || company.yearEstablished || 'N/A',
    markets,
    products,
  };
}

function escapeDiscoverHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderDiscoverInsights() {
  const cards = Array.from(document.querySelectorAll('#page-discover .dash-card'));
  const topMatchesCard = cards.find(card => card.querySelector('.dash-card-header h3')?.textContent?.trim() === 'Top Matches Today');
  const regionsCard = cards.find(card => card.querySelector('.dash-card-header h3')?.textContent?.trim() === 'Active Regions');

  if (topMatchesCard) {
    const topMatches = [...discCompanies]
      .sort((a, b) => (parseInt(b.score, 10) || 0) - (parseInt(a.score, 10) || 0))
      .slice(0, 3);

    topMatchesCard.innerHTML = `
      <div class="dash-card-header"><h3>Top Matches Today</h3></div>
      ${topMatches.length ? topMatches.map((company, index) => `
        <div style="display:flex;align-items:center;gap:10px;padding:8px 0;${index < topMatches.length - 1 ? 'border-bottom:1px solid var(--border);' : ''}">
          <div style="width:34px;height:34px;border-radius:50%;background:var(--primary);color:#B5EAF0;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;">${escapeDiscoverHtml(company.avatar)}</div>
          <div style="flex:1;">
            <p style="font-size:12px;font-weight:600;color:var(--primary);">${escapeDiscoverHtml(company.name)}</p>
            <span style="font-size:10px;color:var(--text-muted);">${escapeDiscoverHtml(company.sub.replace(/Â·/g, ' - '))}</span>
          </div>
          <span style="font-size:11px;font-weight:700;color:var(--accent);background:var(--accent-light);border:1px solid rgba(15,163,177,0.2);padding:2px 8px;border-radius:20px;">${escapeDiscoverHtml(company.score)}</span>
        </div>
      `).join('') : '<p style="font-size:12px;color:var(--text-muted);line-height:1.6;">No matches available yet.</p>'}`;
  }

  if (regionsCard) {
    const counts = new Map();
    discCompanies.forEach((company) => {
      String(company.markets || '')
        .split(',')
        .map(region => region.trim())
        .filter(Boolean)
        .forEach(region => counts.set(region, (counts.get(region) || 0) + 1));
    });
    const regions = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
    const colors = ['#0FA3B1', '#16a34a', '#b45309', '#7c3aed'];

    regionsCard.innerHTML = `
      <div class="dash-card-header"><h3>Active Regions</h3></div>
      ${regions.length ? regions.map(([region, count], index) => `
        <div style="display:flex;align-items:center;gap:8px;padding:7px 0;font-size:12px;color:var(--text-secondary);${index < regions.length - 1 ? 'border-bottom:1px solid var(--border);' : ''}">
          <span style="width:8px;height:8px;border-radius:50%;background:${colors[index]};flex-shrink:0;display:inline-block;"></span>
          <span>${escapeDiscoverHtml(region)}</span>
          <span style="margin-left:auto;font-weight:700;color:var(--primary);">${count}</span>
        </div>
      `).join('') : '<p style="font-size:12px;color:var(--text-muted);line-height:1.6;">Regions will appear when companies load.</p>'}`;
  }
}

function applyDiscoverResults(companies, label, isSearchResult = true) {
  discoverHasActiveSearch = isSearchResult;
  discCompanies = (companies || []).map(normalizeDiscoverCompany);
  discIndex = 0;
  discConnected = 0;
  discPassed = 0;

  const remaining = document.getElementById('remainingCount');
  if (remaining) {
    remaining.textContent = discCompanies.length
      ? `${discCompanies.length} companies for ${label}`
      : `No companies found for ${label}`;
  }

  const title = document.querySelector('#page-discover .page-title-row h2');
  if (title) title.textContent = label ? `Discover Partners: ${label}` : 'Discover Partners';

  renderDiscoverInsights();
  resetDiscoverCards();
}

async function loadAllDiscoverCompanies() {
  try {
    const response = await fetch('http://localhost:5000/discover', {
      headers: {
        'Content-Type': 'application/json',
        ...(getDashboardToken() ? { Authorization: `Bearer ${getDashboardToken()}` } : {})
      }
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || 'Could not load companies.');
    }

    applyDiscoverResults(data.companies || [], 'All companies', false);
  } catch (error) {
    console.error(error);
    if (!discCompanies.length) {
      discShowEmpty();
    }
    showUserToast(error.message || 'Could not load discover companies');
  }
}

function showCompanyProfileModal(company) {
  if (!company) return;

  let modal = document.getElementById('matchCompanyProfileModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'matchCompanyProfileModal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(13,59,59,.42);display:none;align-items:center;justify-content:center;z-index:9300;padding:20px;';
    modal.innerHTML = `
      <div style="width:min(760px,100%);max-height:86vh;overflow:auto;background:#fff;border-radius:24px;box-shadow:0 24px 80px rgba(13,59,59,.25);padding:26px;">
        <div style="display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:18px;">
          <div>
            <p style="margin:0 0 7px;color:#0FA3B1;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;">Company profile</p>
            <h3 id="profileModalName" style="margin:0;color:#0D3B3B;font-size:24px;"></h3>
            <p id="profileModalMeta" style="margin:7px 0 0;color:#5f7373;font-size:13px;"></p>
          </div>
          <button id="closeMatchCompanyProfile" style="border:0;background:#eef6f6;width:36px;height:36px;border-radius:50%;cursor:pointer;"><i class="ri-close-line"></i></button>
        </div>
        <p id="profileModalDesc" style="color:#345;line-height:1.65;font-size:14px;margin:0 0 18px;"></p>
        <div id="profileModalSections" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;"></div>
      </div>`;
    document.body.appendChild(modal);
    const close = () => { modal.style.display = 'none'; };
    modal.querySelector('#closeMatchCompanyProfile').addEventListener('click', close);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) close();
    });
  }

  const chips = (values) => (values?.length ? values : ['Not provided'])
    .map(value => `<span style="display:inline-flex;padding:6px 10px;border-radius:999px;background:#eef8f8;color:#0D3B3B;font-size:12px;font-weight:700;">${escapeDashboardHtml(value)}</span>`)
    .join('');
  const section = (title, values) => `
    <div style="border:1px solid #e2eeee;border-radius:18px;padding:15px;background:#fbfefe;">
      <h4 style="margin:0 0 10px;color:#0D3B3B;font-size:14px;">${escapeDashboardHtml(title)}</h4>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">${chips(values)}</div>
    </div>`;

  const name = company.company_name || 'Unnamed company';
  const country = company.location?.country || company.country || 'Unknown location';
  const industry = company.industry?.industry_name || company.industry || company.business_type || 'Trade';

  modal.querySelector('#profileModalName').textContent = name;
  modal.querySelector('#profileModalMeta').textContent = `${country} • ${industry}`;
  modal.querySelector('#profileModalDesc').textContent = company.company_description || 'This company has not added a detailed description yet.';
  modal.querySelector('#profileModalSections').innerHTML = [
    section('Supplies', company.supplied_products || []),
    section('Looking for', company.desired_products || []),
    section('Target regions', company.target_regions || []),
    section('Business details', [
      company.business_type,
      company.annual_trade_volume ? `Volume: ${company.annual_trade_volume}` : null,
      company.number_of_employees ? `${company.number_of_employees} employees` : null,
      company.website
    ].filter(Boolean))
  ].join('');
  modal.style.display = 'flex';
}

async function openDiscoverCompanyProfile(companyId, fallbackName = 'company') {
  if (!companyId) {
    showUserToast('This company profile is unavailable right now.');
    return null;
  }

  try {
    const response = await fetch(`http://localhost:5000/discover/${companyId}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(getDashboardToken() ? { Authorization: `Bearer ${getDashboardToken()}` } : {})
      }
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || 'Could not open company profile.');
    }

    showCompanyProfileModal(data.company);
    window.hydrateOverviewFromBackend?.();
    return data.company;
  } catch (error) {
    showUserToast(friendlyDashboardError(`Could not open ${fallbackName}'s profile right now.`));
    return null;
  }
}

function discRenderCard() {
  if (discIndex >= discCompanies.length) { discShowEmpty(); return; }
  const c = discCompanies[discIndex];
  document.getElementById('discCardAvatar').textContent   = c.avatar;
  document.getElementById('discCardName').textContent     = c.name;
  document.getElementById('discCardSub').innerHTML        = c.sub.replace(/·/g, '&bull;');
  document.getElementById('discCardScore').textContent    = c.score === 'N/A' ? 'Match pending' : c.score + ' match';
  document.getElementById('discCardVolume').textContent   = c.volume;
  document.getElementById('discCardEst').textContent      = c.est;
  document.getElementById('discCardMarkets').textContent  = c.markets;
  document.getElementById('discCardProducts').textContent = c.products;
  document.getElementById('discCardTags').innerHTML       = c.tags.map(t => `<span style="padding:4px 12px;border-radius:20px;background:var(--accent-light);border:1px solid rgba(15,163,177,0.2);font-size:11px;font-weight:600;color:var(--accent);">${t}</span>`).join('');
  const passBtn = document.getElementById('discBtnPass');
  const connectBtn = document.getElementById('discBtnConnect');
  const actionHint = document.getElementById('discActionHint');
  const isConnected = c.relationship_status === 'connected';
  const isPending = c.relationship_status === 'pending';
  setDiscoverActionsDisabled(false);
  if (passBtn) {
    passBtn.disabled = isConnected;
    passBtn.style.opacity = isConnected ? '.45' : '1';
    passBtn.style.cursor = isConnected ? 'not-allowed' : 'pointer';
    passBtn.title = isConnected ? 'Already connected - pass is unavailable' : 'Pass';
  }
  if (connectBtn) {
    connectBtn.disabled = false;
    connectBtn.style.opacity = '1';
    connectBtn.style.cursor = 'pointer';
    if (isConnected) {
      connectBtn.innerHTML = '<i class="ri-message-3-line"></i> Message';
      connectBtn.title = 'Open conversation';
    } else if (isPending) {
      connectBtn.innerHTML = '<i class="ri-time-line"></i> Pending';
      connectBtn.title = 'Request pending';
    } else {
      connectBtn.innerHTML = '<i class="ri-check-line"></i> Connect';
      connectBtn.title = 'Send connection request';
    }
  }
  if (actionHint) {
    const hintText = isConnected
      ? 'You are already connected with this business. Pass is disabled; use Message to continue the conversation.'
      : isPending
        ? 'A connection request is already pending. You can review the profile or wait for the business to respond.'
        : 'Pass skips this company. Connect sends a request. Use profile or enquiry if you need more context first.';
    actionHint.querySelector('span').textContent = hintText;
  }
  document.getElementById('remainingCount').textContent   = (discCompanies.length - discIndex) + ' companies remaining';
  document.getElementById('statViewed').textContent       = discIndex;
  document.getElementById('statConnected').textContent    = discConnected;
  document.getElementById('statPassed').textContent       = discPassed;
  const pct = Math.round((discIndex / discCompanies.length) * 100);
  document.getElementById('sessionProgress').style.width  = pct + '%';
  document.getElementById('progressLabel').textContent    = pct + '% complete';
  const tipEl = document.getElementById('tipText');
  if (tipEl) tipEl.textContent = discTips[discIndex % discTips.length];
}

function setDiscoverActionsDisabled(disabled) {
  ['discBtnPass', 'discBtnProfile', 'discBtnEnquire', 'discBtnConnect'].forEach((id) => {
    const button = document.getElementById(id);
    if (!button) return;
    button.disabled = disabled;
    button.style.opacity = disabled ? '.45' : '1';
    button.style.cursor = disabled ? 'not-allowed' : 'pointer';
  });
}

function discSwipe(dir) {
  const card = document.getElementById('discMatchCard');
  card.style.transform = dir === 'left' ? 'translateX(-150%) rotate(-20deg)' : 'translateX(150%) rotate(20deg)';
  card.style.opacity = '0';
  setTimeout(() => {
    card.style.transition = 'none';
    card.style.transform = ''; card.style.opacity = '1';
    setTimeout(() => { card.style.transition = ''; discIndex++; discRenderCard(); }, 20);
  }, 360);
}

function discShowEmpty() {
  document.getElementById('discMatchCard').style.display  = 'none';
  document.getElementById('discCardGhost').style.display  = 'none';
  document.getElementById('discActionRow').style.display  = 'flex';
  const passBtn = document.getElementById('discBtnPass');
  const connectBtn = document.getElementById('discBtnConnect');
  if (passBtn) {
    passBtn.innerHTML = '<i class="ri-close-line"></i><span>Pass</span>';
    passBtn.title = 'No company card available';
  }
  if (connectBtn) {
    connectBtn.innerHTML = '<i class="ri-team-line"></i><span>Connect</span>';
    connectBtn.title = 'No company card available';
  }
  setDiscoverActionsDisabled(true);
  const actionHint = document.getElementById('discActionHint');
  if (actionHint) {
    actionHint.style.display = 'flex';
    actionHint.querySelector('span').textContent = 'No company card is available right now. Use Start Over to review any other available and unconnected companies again.';
  }
  document.getElementById('discEmptyState').style.display = 'flex';
  document.getElementById('remainingCount').textContent   = '0 companies remaining';
}

function resetDiscoverCards() {
  discIndex = 0; discConnected = 0; discPassed = 0;
  document.getElementById('discMatchCard').style.display  = '';
  document.getElementById('discCardGhost').style.display  = '';
  document.getElementById('discActionRow').style.display  = 'flex';
  setDiscoverActionsDisabled(false);
  const actionHint = document.getElementById('discActionHint');
  if (actionHint) actionHint.style.display = 'flex';
  document.getElementById('discEmptyState').style.display = 'none';
  discRenderCard();
}

// ============================================================
//   LIVE OVERVIEW DATA — backend-connected dashboard sections
// ============================================================
(function () {
  const API_BASE = 'http://localhost:5000';

  function getDashboardToken() {
    try {
      return localStorage.getItem('token') ||
        localStorage.getItem('companyToken') ||
        localStorage.getItem('userToken');
    } catch (error) {
      return null;
    }
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function initials(name) {
    return String(name || 'TG')
      .split(/\s+/)
      .filter(Boolean)
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'TG';
  }

  function formatDate(value) {
    if (!value) return 'Not submitted yet';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  }

  function formatTime(value) {
    if (!value) return 'No messages yet';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  async function dashboardRequest(path) {
    const token = getDashboardToken();
    if (!token) {
      return { ok: false, status: 401, data: { error: 'Login required' } };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(API_BASE + path, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json().catch(() => ({}));
      return { ok: response.ok, status: response.status, data };
    } catch (error) {
      return { ok: false, status: 0, data: { error: error.message } };
    } finally {
      clearTimeout(timeout);
    }
  }

  async function dashboardPost(path, body) {
    const token = getDashboardToken();
    const response = await fetch(API_BASE + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(body || {})
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Request failed.');
    }

    return data;
  }

  function setCardEmpty(card, message) {
    if (!card) return;
    card.querySelectorAll('.match-item,.match-placeholder,.msg-preview,.msg-preview-placeholder,.verif-item,.insight-item,.dash-empty').forEach(el => el.remove());
    const empty = document.createElement('div');
    empty.className = 'dash-empty';
    empty.style.cssText = 'padding:18px 0;color:var(--text-muted);font-size:13px;line-height:1.5;';
    empty.textContent = message;
    card.appendChild(empty);
  }

  function getOverviewCard(title) {
    return Array.from(document.querySelectorAll('#page-overview .dash-card'))
      .find(card => card.querySelector('.dash-card-header h3')?.textContent.trim() === title);
  }

  const DEFAULT_MATCH_WEIGHTS = {
    product_compatibility: 50,
    trade_region_compatibility: 25,
    volume_range_compatibility: 10,
    random_compatibility: 15
  };

  function getCompatibilityBreakdown(match) {
    return match?.match_reasons?.compatibility_breakdown || match?.compatibility_breakdown || null;
  }

  function getWeightedMatchScore(match) {
    const breakdown = getCompatibilityBreakdown(match);
    if (!breakdown) {
      return Math.max(0, Math.min(100, Math.round(Number(match?.match_score || match?.score || 0))));
    }

    const weights = { ...DEFAULT_MATCH_WEIGHTS, ...(breakdown.weights || {}) };
    const contribution = (key) =>
      (Number(breakdown[key] || 0) * Number(weights[key] || 0)) / 100;

    return Math.max(0, Math.min(100, Math.round(
      contribution('product_compatibility') +
      contribution('trade_region_compatibility') +
      contribution('volume_range_compatibility') +
      contribution('random_compatibility')
    )));
  }

  function getWeightedCompatibilityRows(breakdown) {
    if (!breakdown) return '';
    const weights = { ...DEFAULT_MATCH_WEIGHTS, ...(breakdown.weights || {}) };
    const weighted = (key) => Math.round((Number(breakdown[key] || 0) * Number(weights[key] || 0)) / 100);
    return `
      <span>Products: <strong>${weighted('product_compatibility')}/${Number(weights.product_compatibility || 0)}</strong></span>
      <span>Regions: <strong>${weighted('trade_region_compatibility')}/${Number(weights.trade_region_compatibility || 0)}</strong></span>
      <span>Volume: <strong>${weighted('volume_range_compatibility')}/${Number(weights.volume_range_compatibility || 0)}</strong></span>
      <span>Market fit: <strong>${weighted('random_compatibility')}/${Number(weights.random_compatibility || 0)}</strong></span>`;
  }

  function renderLiveMatches(matches) {
    const card = getOverviewCard('Recent Matches');
    if (!card) return;
    card.querySelectorAll('.match-item,.match-placeholder,.dash-empty').forEach(el => el.remove());

    if (!matches.length) {
      setCardEmpty(card, 'No live matches yet. Complete your profile details to improve matching.');
      return;
    }

    const header = card.querySelector('.dash-card-header');
    matches.slice(0, 4).forEach(match => {
      const company = match.company || match;
      const name = company.company_name || company.name || 'Unnamed company';
      const country = company.location?.country || company.country || 'Unknown location';
      const industry = company.industry?.industry_name || company.industry || company.business_type || 'Trade';
      const score = getWeightedMatchScore(match);
      const breakdown = getCompatibilityBreakdown(match);
      const item = document.createElement('div');
      item.className = 'match-item';
      item.innerHTML = `
        <div class="match-avatar">${escapeHtml(initials(name))}</div>
        <div class="match-info">
          <p class="match-name">${escapeHtml(name)}</p>
          <p class="match-meta"><i class="ri-map-pin-line"></i> ${escapeHtml(country)} &bull; ${escapeHtml(industry)}</p>
          ${breakdown ? `<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px 10px;margin-top:6px;font-size:10.5px;color:var(--text-muted);">${getWeightedCompatibilityRows(breakdown)}</div>` : ''}
        </div>
        <div class="match-right"><span class="match-score">${score}%</span><span class="match-label">match</span></div>`;
      card.insertBefore(item, header.nextSibling);
    });

  }

  function getConnectionCompany(connection, currentCompanyId) {
    if (!connection) return null;
    if (Number(connection.company1_id) === Number(currentCompanyId)) return connection.company2;
    return connection.company1;
  }

  function getPendingIds(sentPending, receivedPending) {
    return {
      sent: new Set(sentPending.map(request => Number(request.target_company_id))),
      received: new Set(receivedPending.map(request => Number(request.source_company_id)))
    };
  }

  function sortNewestFirst(items) {
    return [...(items || [])].sort((left, right) =>
      new Date(right.created_at || right.updated_at || 0) - new Date(left.created_at || left.updated_at || 0)
    );
  }

  function matchCardHtml({ company, score, status, sourceCompanyId, breakdown }) {
    const name = company.company_name || company.name || 'Unnamed company';
    const companyId = Number(company.company_id);
    const country = company.location?.country || company.country || 'Unknown location';
    const industry = company.industry?.industry_name || company.industry || company.business_type || 'Trade';
    const products = company.supplied_products?.length
      ? company.supplied_products.join(', ')
      : (company.company_description || 'No product details yet');
    const action = status === 'connected'
      ? `<button class="btn-ph-primary match-message-btn" data-company-id="${companyId}"><i class="ri-message-3-line"></i> Message</button>`
      : status === 'pending-sent'
        ? `<button class="btn-ph-primary" disabled style="opacity:.65;"><i class="ri-time-line"></i> Pending</button>`
        : status === 'pending-received'
          ? `<button class="btn-ph-primary match-accept-btn" data-source-company-id="${sourceCompanyId || companyId}" data-company-id="${companyId}"><i class="ri-checkbox-circle-line"></i> Accept Request</button><button class="btn-ph-secondary match-reject-btn" data-source-company-id="${sourceCompanyId || companyId}" data-company-id="${companyId}"><i class="ri-close-circle-line"></i> Reject</button>`
          : `<button class="btn-ph-primary match-connect-btn" data-company-id="${companyId}"><i class="ri-add-line"></i> Connect</button>`;
    const stats = breakdown
      ? `<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin:12px 0 2px;font-size:11px;color:var(--text-muted);">
          ${getWeightedCompatibilityRows(breakdown)}
        </div>`
      : '';

    return `
      <div class="placeholder-card" data-company-id="${companyId}">
        <div class="ph-avatar">${escapeHtml(initials(name))}</div>
        <h4>${escapeHtml(name)}</h4>
        <p>${escapeHtml(country)} &bull; ${escapeHtml(industry)} &bull; ${escapeHtml(products)}</p>
        <div class="ph-score">${escapeHtml(score)}</div>
        ${stats}
        <div class="ph-actions">
          ${action}
          <button class="btn-ph-secondary match-enquiry-btn" data-company-id="${companyId}"><i class="ri-question-answer-line"></i> Enquire</button>
          <button class="btn-ph-secondary match-profile-btn" data-company-id="${companyId}"><i class="ri-user-line"></i> View Profile</button>
        </div>
      </div>`;
  }

  function renderMatchesPage(aiMatches, acceptedConnections, sentPending, receivedPending, profile) {
    const grid = document.querySelector('#page-matches .placeholder-grid');
    const subtitle = document.querySelector('#page-matches .page-title-row p');
    if (!grid) return;

    const currentCompanyId = Number(profile?.company_id);
    const pendingIds = getPendingIds(sentPending, receivedPending);
    const acceptedCompanies = acceptedConnections
      .map(connection => getConnectionCompany(connection, currentCompanyId))
      .filter(Boolean);
    const renderedIds = new Set();

    const cards = [];
    sortNewestFirst(receivedPending).forEach(request => {
      const company = request.source;
      const companyId = Number(company?.company_id);
      if (!companyId || renderedIds.has(companyId)) return;
      renderedIds.add(companyId);
      cards.push(matchCardHtml({
        company,
        score: 'Pending request',
        status: 'pending-received',
        sourceCompanyId: request.source_company_id
      }));
    });

    sortNewestFirst(sentPending).forEach(request => {
      const company = request.target;
      const companyId = Number(company?.company_id);
      if (!companyId || renderedIds.has(companyId)) return;
      renderedIds.add(companyId);
      cards.push(matchCardHtml({
        company,
        score: 'Request sent',
        status: 'pending-sent'
      }));
    });

    acceptedCompanies.forEach(company => {
      const companyId = Number(company?.company_id);
      if (!companyId || renderedIds.has(companyId)) return;
      renderedIds.add(companyId);
      cards.push(matchCardHtml({
        company,
        score: 'Connected',
        status: 'connected'
      }));
    });

    aiMatches.forEach(match => {
      const company = match.company || match;
      const companyId = Number(company.company_id);
      if (!companyId || renderedIds.has(companyId)) return;
      renderedIds.add(companyId);

      const status = pendingIds.sent.has(companyId)
        ? 'pending-sent'
        : pendingIds.received.has(companyId)
          ? 'pending-received'
          : 'suggested';

      cards.push(matchCardHtml({
        company,
        score: `${getWeightedMatchScore(match)}% match`,
        status,
        breakdown: getCompatibilityBreakdown(match)
      }));
    });

    grid.innerHTML = cards.length
      ? cards.join('')
      : `<div style="grid-column:1/-1;padding:34px;text-align:center;color:var(--text-muted);font-size:14px;">No matches yet. Add products, desired products, and target regions to improve your recommendations.</div>`;

    if (subtitle) {
      subtitle.textContent = `${receivedPending.length} new request${receivedPending.length === 1 ? '' : 's'} • ${acceptedCompanies.length} connected partner${acceptedCompanies.length === 1 ? '' : 's'} • ${aiMatches.length} suggested match${aiMatches.length === 1 ? '' : 'es'}`;
    }

    grid.querySelectorAll('.match-connect-btn').forEach(button => {
      button.addEventListener('click', async () => {
        const companyId = Number(button.dataset.companyId);
        const card = button.closest('.placeholder-card');
        const companyName = card?.querySelector('h4')?.textContent || 'company';

        try {
          await dashboardPost('/auth/request', {
            target_company_id: companyId,
            notes: 'Connection request sent from Matches page'
          });
          button.innerHTML = '<i class="ri-time-line"></i> Pending';
          button.disabled = true;
          button.style.opacity = '.65';
          showUserToast(`Connection request sent to ${companyName}.`);
          window.hydrateOverviewFromBackend?.();
        } catch (error) {
          showUserToast(error.message || 'Could not send request');
        }
      });
    });

    grid.querySelectorAll('.match-accept-btn').forEach(button => {
      button.addEventListener('click', async () => {
        const sourceCompanyId = Number(button.dataset.sourceCompanyId);
        const card = button.closest('.placeholder-card');
        const companyName = card?.querySelector('h4')?.textContent || 'company';

        button.disabled = true;
        try {
          await dashboardPost('/auth/accept', {
            source_company_id: sourceCompanyId
          });
          showUserToast(`Match request accepted from ${companyName}. Messaging is now available.`);
          window.hydrateOverviewFromBackend?.();
        } catch (error) {
          button.disabled = false;
          showUserToast(error.message || 'Could not accept request');
        }
      });
    });

    grid.querySelectorAll('.match-reject-btn').forEach(button => {
      button.addEventListener('click', async () => {
        const sourceCompanyId = Number(button.dataset.sourceCompanyId);
        const card = button.closest('.placeholder-card');
        const companyName = card?.querySelector('h4')?.textContent || 'company';

        button.disabled = true;
        try {
          await dashboardPost('/auth/reject', {
            source_company_id: sourceCompanyId
          });
          card?.remove();
          showUserToast(`Request from ${companyName} rejected.`);
          window.hydrateOverviewFromBackend?.();
        } catch (error) {
          button.disabled = false;
          showUserToast(friendlyDashboardError('Could not reject the request right now.'));
        }
      });
    });

    grid.querySelectorAll('.match-message-btn').forEach(button => {
      button.addEventListener('click', async () => {
        const companyId = Number(button.dataset.companyId);
        button.disabled = true;
        try {
          await openConversationFromMatch(companyId);
          showUserToast('Conversation ready.');
          window.hydrateOverviewFromBackend?.();
        } catch (error) {
          showUserToast(error.message || 'Could not open conversation');
        } finally {
          button.disabled = false;
        }
      });
    });

    grid.querySelectorAll('.match-profile-btn').forEach(button => {
      button.addEventListener('click', async () => {
        const companyId = Number(button.dataset.companyId);
        const card = button.closest('.placeholder-card');
        const companyName = card?.querySelector('h4')?.textContent || 'company';
        await openDiscoverCompanyProfile(companyId, companyName);
      });
    });

    grid.querySelectorAll('.match-enquiry-btn').forEach(button => {
      button.addEventListener('click', () => {
        const companyId = Number(button.dataset.companyId);
        const card = button.closest('.placeholder-card');
        const companyName = card?.querySelector('h4')?.textContent || 'company';
        openCompanyEnquiryModal(companyId, companyName);
      });
    });
  }

  function getOtherCompany(conversation, currentCompanyId) {
    if (!conversation) return null;
    if (conversation.company1_id === currentCompanyId) return conversation.company2;
    return conversation.company1;
  }

  function renderLiveMessages(conversations) {
    const card = getOverviewCard('Recent Messages');
    if (!card) return;
    card.querySelectorAll('.msg-preview,.msg-preview-placeholder,.dash-empty').forEach(el => el.remove());
    const user = JSON.parse(localStorage.getItem('tradegridUser') || '{}');
    const currentCompanyId = Number(user.company_id);

    if (!conversations.length) {
      setCardEmpty(card, 'No conversations yet. Messages will appear here when partners contact you.');
      renderMessagesList([], currentCompanyId);
      updateKpi('Unread Messages', 0, 'No unread messages');
      return;
    }

    let unreadCount = 0;
    const header = card.querySelector('.dash-card-header');

    renderMessagesList(conversations, currentCompanyId);

    conversations.slice(0, 4).forEach(conversation => {
      const otherCompany = getOtherCompany(conversation, currentCompanyId) || {};
      const name = otherCompany.company_name || 'Trade partner';
      const avatar = initials(name);
      const lastMessage = conversation.messages?.[0];
      const conversationUnread = Number(conversation.unread_count || 0);
      const isUnread = conversationUnread > 0;
      unreadCount += conversationUnread;

      const conversationKey = String(conversation.conversation_id);
      conversationData[conversationKey] = {
        name,
        sub: 'Conversation',
        avatar,
        conversationId: conversation.conversation_id,
        messages: lastMessage ? [{
          type: Number(lastMessage.sender_company_id) === currentCompanyId ? 'me' : 'them',
          text: lastMessage.content
        }] : []
      };

      const item = document.createElement('div');
      item.className = 'msg-preview' + (isUnread ? ' unread' : '');
      item.dataset.conversationId = conversation.conversation_id;
      item.innerHTML = `
        <div class="msg-preview-avatar">${escapeHtml(avatar)}</div>
        <div class="msg-preview-body">
          <div class="msg-preview-top">
            <p class="msg-preview-name">${escapeHtml(name)}</p>
            <span class="msg-preview-time">${escapeHtml(formatTime(lastMessage?.created_at || conversation.last_message_at))}</span>
          </div>
          <p class="msg-preview-text">${escapeHtml(lastMessage?.content || 'No messages yet')}</p>
        </div>`;
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        navigateTo('messages');
        setTimeout(() => loadConversation(conversationKey), 50);
      });
      card.insertBefore(item, header.nextSibling);
    });

    badgeState.messages.unread = {};
    conversations.forEach(conversation => {
      const otherCompany = getOtherCompany(conversation, currentCompanyId) || {};
      const avatar = initials(otherCompany.company_name);
      const lastMessage = conversation.messages?.[0];
      badgeState.messages.unread[avatar] = Number(conversation.unread_count || 0);
    });
    updateNavBadge('messages');
    updateKpi('Unread Messages', unreadCount, unreadCount === 1 ? '1 unread conversation' : `${unreadCount} unread conversations`);
  }

  function normalizeDocStatus(status) {
    const normalized = String(status || '').toLowerCase();
    if (normalized === 'approved' || normalized === 'verified') return 'verified';
    if (normalized === 'rejected' || normalized === 'declined') return 'recheck';
    return 'required';
  }

  function renderLiveVerification(documents) {
    const card = getOverviewCard('Verification Status');
    if (!card) return;
    card.querySelectorAll('.verif-item').forEach(el => el.remove());

    if (!documents.length) {
      setCardEmpty(card, 'No verification documents submitted yet.');
      verifDocs.length = 0;
      getRequiredVerificationDocuments().forEach(doc => {
        verifDocs.push({
          ...doc,
          submitted: 'Not submitted',
          status: 'required',
          file_name: null,
          file_url: null
        });
      });
      renderVerifTable();
      renderVerifBanner();
      badgeState.verification.hasIssue = true;
      updateNavBadge('verification');
      return;
    }

    verifDocs.length = 0;
    documents.forEach(doc => {
      verifDocs.push({
        id: doc.verification_document_id,
        name: doc.document_type || doc.file_name || 'Verification document',
        sub: doc.file_name || doc.notes || 'Submitted document',
        submitted: formatDate(doc.submitted_at || doc.created_at),
        status: normalizeDocStatus(doc.status),
        file_name: doc.file_name || null,
        file_url: doc.file_url || null
      });
    });
    const submittedDocNames = new Set(verifDocs.map(doc => doc.name.trim().toLowerCase()));
    getRequiredVerificationDocuments().forEach(doc => {
      if (!submittedDocNames.has(doc.name.toLowerCase())) {
        verifDocs.push({
          ...doc,
          submitted: 'Not submitted',
          status: 'required',
          file_name: null,
          file_url: null
        });
      }
    });

    const iconMap = {
      verified: { cls: 'done', icon: 'ri-checkbox-circle-fill', text: doc => `Verified ${doc.submitted}` },
      recheck: { cls: 'pending', icon: 'ri-refresh-line', text: () => 'Re-upload required' },
      required: { cls: 'missing', icon: 'ri-time-line', text: doc => `Under review · submitted ${doc.submitted}` }
    };
    const header = card.querySelector('.dash-card-header');
    verifDocs.slice(0, 4).forEach(doc => {
      const cfg = iconMap[doc.status] || iconMap.required;
      const item = document.createElement('div');
      item.className = 'verif-item ' + cfg.cls;
      item.innerHTML = `<i class="${cfg.icon}"></i><div><p>${escapeHtml(doc.name)}</p><span>${escapeHtml(cfg.text(doc))}</span></div>`;
      card.insertBefore(item, header.nextSibling);
    });

    renderVerifTable();
    renderVerifBanner();
    badgeState.verification.hasIssue = verifDocs.some(doc => doc.status !== 'verified');
    updateNavBadge('verification');
  }

  function renderLiveMarketInsights(profile, matches) {
    const card = getOverviewCard('Market Insights');
    if (!card) return;
    card.querySelectorAll('.insight-item').forEach(el => el.remove());

    const counts = new Map();
    const add = (label, amount = 1) => {
      if (!label) return;
      counts.set(label, (counts.get(label) || 0) + amount);
    };

    add(profile?.industry?.industry_name || profile?.industry, 3);
    (profile?.supplied_products || []).forEach(product => add(product, 2));
    (profile?.desired_products || []).forEach(product => add(product, 2));
    (profile?.target_regions || []).forEach(region => add(region, 1));
    matches.forEach(match => {
      const company = match.company || {};
      add(company.industry?.industry_name || company.industry, 1);
      (company.supplied_products || []).forEach(product => add(product, 1));
    });

    const insights = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    latestAnalyticsReportData.marketInsights = insights.map(([label, count]) => ({ label, count }));

    if (!insights.length) {
      setCardEmpty(card, 'No market insight data yet. Add products, regions, and industry details to your profile.');
      const analyticsBreakdown = document.querySelector('#analyticsIndustryBreakdown') ||
        document.querySelector('#page-analytics .industry-breakdown');
      if (analyticsBreakdown) {
        analyticsBreakdown.innerHTML = '<p style="font-size:12px;color:var(--text-muted);line-height:1.6;">No industry signals yet.</p>';
      }
      return;
    }

    const max = Math.max(...insights.map(([, count]) => count), 1);
    const header = card.querySelector('.dash-card-header');
    insights.forEach(([label, count]) => {
      const pct = Math.max(15, Math.round((count / max) * 100));
      const item = document.createElement('div');
      item.className = 'insight-item';
      item.innerHTML = `
        <div class="insight-label"><span>${escapeHtml(label)}</span><span class="insight-growth">${count} signal${count === 1 ? '' : 's'}</span></div>
        <div class="insight-bar-track"><div class="insight-bar" style="width:${pct}%"></div></div>`;
      card.insertBefore(item, header.nextSibling);
    });

    const analyticsBreakdown = document.querySelector('#analyticsIndustryBreakdown') ||
      document.querySelector('#page-analytics .industry-breakdown');
    if (analyticsBreakdown) {
      analyticsBreakdown.innerHTML = insights.map(([label, count]) => {
        const pct = Math.round((count / max) * 100);
        return `<div class="ind-row"><span>${escapeHtml(label)}</span><div class="ind-bar-wrap"><div class="ind-bar" style="width:${pct}%"></div></div><span class="ind-pct">${count}</span></div>`;
      }).join('');
    }
  }

  function updateKpi(label, value, note) {
    const card = Array.from(document.querySelectorAll('#page-overview .kpi-card'))
      .find(item => item.querySelector('.kpi-label')?.textContent.trim() === label);
    if (!card) return;
    const valueEl = card.querySelector('.kpi-value');
    const noteEl = card.querySelector('.kpi-change');
    if (valueEl) valueEl.textContent = value;
    if (noteEl) {
      noteEl.className = 'kpi-change neutral';
      noteEl.innerHTML = `<i class="ri-database-2-line"></i> ${escapeHtml(note)}`;
    }
  }

  function renderLoggedInProfile(profile) {
    if (!profile) return;
    const companyName = profile.company_name || 'your company';
    const welcome = document.querySelector('#page-overview .welcome-text h1');
    if (welcome) welcome.textContent = `Welcome back, ${companyName}`;

    document.querySelectorAll('.sidebar-user-name').forEach(el => { el.textContent = companyName; });
    document.querySelectorAll('.sidebar-avatar,.topbar-avatar').forEach(el => {
      el.textContent = initials(companyName);
    });
    renderBusinessProfile(profile);
  }

  function updateDealsInProgress(receivedPending, sentPending) {
    const received = receivedPending.length;
    const sent = sentPending.length;
    const total = received + sent;
    const detail = total === 0
      ? 'No pending requests'
      : `${sent} sent, ${received} received pending`;
    updateKpi('Deals in Progress', total, detail);
  }

  function renderProfileViewsChart(statsData = {}, days = activeAnalyticsDays) {
    const chart = document.querySelector('#analyticsProfileViewsChart') ||
      document.querySelector('#page-analytics .bar-chart');
    const title = document.getElementById('profileViewsChartTitle');
    if (title) title.textContent = `Profile Views - Last ${days} Days`;
    if (!chart) return;

    const dailyCounts = new Map();
    (statsData.recent_views || []).forEach((view) => {
      const date = new Date(view.viewed_at);
      if (Number.isNaN(date.getTime())) return;
      const key = date.toLocaleDateString('en-CA');
      dailyCounts.set(key, (dailyCounts.get(key) || 0) + 1);
    });

    const bucketCount = days <= 7 ? 7 : days <= 30 ? 10 : 12;
    const bucketSize = Math.ceil(days / bucketCount);
    const buckets = Array.from({ length: bucketCount }, (_, index) => {
      const startOffset = days - (bucketSize * (index + 1));
      const endOffset = days - (bucketSize * index) - 1;
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - Math.max(0, endOffset));
      const end = new Date();
      end.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() - Math.max(0, startOffset));
      return { start, end, count: 0 };
    });

    dailyCounts.forEach((count, key) => {
      const date = new Date(`${key}T00:00:00`);
      const bucket = buckets.find(item => date >= item.start && date <= item.end);
      if (bucket) bucket.count += count;
    });

    const max = Math.max(1, ...buckets.map(bucket => bucket.count));
    chart.innerHTML = buckets.map((bucket) => {
      const height = bucket.count ? Math.max(12, Math.round((bucket.count / max) * 100)) : 3;
      const label = days <= 7
        ? bucket.end.toLocaleDateString([], { weekday: 'short' }).slice(0, 3)
        : bucket.end.toLocaleDateString([], { month: 'short', day: 'numeric' });
      return `<div class="bar-col" title="${bucket.count} view${bucket.count === 1 ? '' : 's'}"><small>${bucket.count}</small><div class="bar" style="height:${height}%"></div><span>${label}</span></div>`;
    }).join('');
  }

  function updateProfileViewsKpi(statsResponse, days = activeAnalyticsDays) {
    if (!statsResponse.ok) {
      updateKpi('Profile Views', 0, 'No profile views yet');
      const analyticsViews = document.getElementById('analyticsProfileViews');
      const analyticsChange = document.getElementById('analyticsProfileViewsChange');
      if (analyticsViews) analyticsViews.textContent = '0';
      if (analyticsChange) analyticsChange.innerHTML = '<i class="ri-subtract-line"></i> No profile views yet';
      latestAnalyticsReportData.profileViews = null;
      renderProfileViewsChart({}, days);
      return;
    }

    const total = Number(statsResponse.data.total || 0);
    const change = Number(statsResponse.data.change_this_week || 0);
    const detail = change > 0
      ? `+${change} this week`
      : change < 0
        ? `${change} this week`
        : 'No change this week';
    updateKpi('Profile Views', total, detail);

    const analyticsViews = document.getElementById('analyticsProfileViews');
    const analyticsChange = document.getElementById('analyticsProfileViewsChange');
    if (analyticsViews) analyticsViews.textContent = total;
    if (analyticsChange) {
      analyticsChange.className = `akpi-change ${change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'}`;
      analyticsChange.innerHTML = `<i class="${change > 0 ? 'ri-arrow-up-line' : change < 0 ? 'ri-arrow-down-line' : 'ri-subtract-line'}"></i> ${detail}`;
    }

    latestAnalyticsReportData.profileViews = { ...statsResponse.data, days };
    renderProfileViewsChart(statsResponse.data, days);
  }

  async function loadProfileViewsForPeriod(days) {
    activeAnalyticsDays = Number(days) || 7;
    document.querySelectorAll('#page-analytics .period-tab').forEach(button => {
      button.classList.toggle('active', Number(button.dataset.days) === activeAnalyticsDays);
    });
    const response = await dashboardRequest(`/profile/views/stats?days=${activeAnalyticsDays}`);
    updateProfileViewsKpi(response, activeAnalyticsDays);
  }

  function exportAnalyticsReport() {
    const companyName = document.querySelector('.sidebar-user-name')?.textContent?.trim() || 'Trade Grid User';
    const generatedAt = new Date().toLocaleString();
    const profileViews = latestAnalyticsReportData.profileViews;
    const matchStats = latestAnalyticsReportData.matchStats || {};
    const marketInsights = latestAnalyticsReportData.marketInsights || [];
    const countries = latestAnalyticsReportData.partnerCountries || [];

    const value = (id) => document.getElementById(id)?.textContent?.trim() || '0';
    const reportHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Trade Analytics Report</title>
  <style>
    body { font-family: Inter, Arial, sans-serif; color:#0D3B3B; margin:32px; line-height:1.5; }
    h1 { margin:0 0 4px; font-size:26px; }
    h2 { margin-top:28px; font-size:18px; }
    .meta { color:#5f7373; font-size:13px; margin-bottom:24px; }
    table { width:100%; border-collapse:collapse; margin-top:10px; }
    th, td { border:1px solid #d7e7e7; padding:10px; text-align:left; font-size:13px; }
    th { background:#eef6f6; }
    .grid { display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; }
    .card { border:1px solid #d7e7e7; border-radius:10px; padding:14px; }
    .label { color:#5f7373; font-size:12px; }
    .big { font-size:22px; font-weight:800; margin-top:4px; }
  </style>
</head>
<body>
  <h1>Trade Analytics Report</h1>
  <div class="meta">${escapeHtml(companyName)} - Generated ${escapeHtml(generatedAt)}</div>
  <div class="grid">
    <div class="card"><div class="label">Profile Views</div><div class="big">${escapeHtml(value('analyticsProfileViews'))}</div></div>
    <div class="card"><div class="label">Connection Rate</div><div class="big">${escapeHtml(value('analyticsConnectionRate'))}</div></div>
    <div class="card"><div class="label">Response Rate</div><div class="big">${escapeHtml(value('analyticsResponseRate'))}</div></div>
    <div class="card"><div class="label">Active Deals</div><div class="big">${escapeHtml(value('analyticsActiveDeals'))}</div></div>
  </div>
  <h2>Profile Views - Last ${escapeHtml(profileViews?.days || activeAnalyticsDays)} Days</h2>
  <p>Total profile views: ${escapeHtml(profileViews?.total || 0)}. Views this week: ${escapeHtml(profileViews?.this_week || 0)}. Change this week: ${escapeHtml(profileViews?.change_this_week || 0)}.</p>
  <h2>Match Activity</h2>
  <table><tbody>
    <tr><th>Total Active Matches</th><td>${escapeHtml(matchStats.total_active_matches || value('analyticsTotalMatches'))}</td></tr>
    <tr><th>Matches This Week</th><td>${escapeHtml(matchStats.matches_this_week || value('analyticsWeeklyMatches'))}</td></tr>
    <tr><th>Deals In Progress</th><td>${escapeHtml(matchStats.deals_in_progress || value('analyticsDealsProgress'))}</td></tr>
    <tr><th>Deals Completed</th><td>${escapeHtml(matchStats.completed_deals || value('analyticsCompletedDeals'))}</td></tr>
  </tbody></table>
  <h2>Market Insights</h2>
  <table><thead><tr><th>Signal</th><th>Weight</th></tr></thead><tbody>
    ${marketInsights.length ? marketInsights.map(item => `<tr><td>${escapeHtml(item.label)}</td><td>${escapeHtml(item.count)}</td></tr>`).join('') : '<tr><td colspan="2">No market insights available yet.</td></tr>'}
  </tbody></table>
  <h2>Top Partner Countries</h2>
  <table><thead><tr><th>Country</th><th>Partners</th></tr></thead><tbody>
    ${countries.length ? countries.map(item => `<tr><td>${escapeHtml(item.country)}</td><td>${escapeHtml(item.matches)}</td></tr>`).join('') : '<tr><td colspan="2">No partner countries available yet.</td></tr>'}
  </tbody></table>
</body>
</html>`;

    const blob = new Blob([reportHtml], { type: 'application/msword' });
    try {
      localStorage.setItem('tradegridLastAnalyticsReport', reportHtml);
    } catch (error) {
      /* Browser storage can be unavailable or full; the download still works. */
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `trade-analytics-report-${new Date().toISOString().slice(0, 10)}.doc`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showUserToast('Trade analytics report downloaded.');
  }

  document.querySelectorAll('#page-analytics .period-tab').forEach(button => {
    button.addEventListener('click', () => loadProfileViewsForPeriod(button.dataset.days));
  });
  document.getElementById('analyticsBackBtn')?.addEventListener('click', () => {
    navigateTo(previousPageBeforeAnalytics || 'overview');
  });
  document.getElementById('exportAnalyticsReport')?.addEventListener('click', exportAnalyticsReport);

  async function hydrateOverviewFromBackend() {
    try {
      const token = getDashboardToken();
      if (!token) {
        ['Recent Matches', 'Recent Messages', 'Verification Status', 'Market Insights'].forEach(title => {
          setCardEmpty(getOverviewCard(title), 'Log in to load this section.');
        });
        renderMatchesPage([], [], [], [], null);
        renderMessagesList([], getStoredCompanyId());
        return;
      }

      let latestProfile = null;
      let latestAiMatches = [];
      let latestAcceptedConnections = [];
      let latestReceivedPending = [];
      let latestSentPending = [];
      let latestDocuments = [];
      const storedProfile = (() => {
        try { return JSON.parse(localStorage.getItem('tradegridUser') || '{}'); } catch { return {}; }
      })();

      const profilePromise = dashboardRequest('/profile/me').then(response => {
        latestProfile = response.ok ? response.data.profile : null;
        renderLoggedInProfile(latestProfile);
        if (latestProfile?.company_id) {
          try {
            localStorage.setItem('tradegridUser', JSON.stringify({ ...storedProfile, company_id: latestProfile.company_id, company_name: latestProfile.company_name }));
          } catch (error) {
            /* Ignore storage restrictions. */
          }
        }
        return response;
      });

      const matchesCorePromise = Promise.all([
        dashboardRequest('/auth'),
        dashboardRequest('/auth/pending'),
        dashboardRequest('/auth/pending-sent')
      ]).then(([connectionsResponse, pendingReceivedResponse, pendingSentResponse]) => {
        latestAcceptedConnections = connectionsResponse.ok ? (connectionsResponse.data.matches || []) : [];
        latestReceivedPending = pendingReceivedResponse.ok ? (pendingReceivedResponse.data.requests || []) : [];
        latestSentPending = pendingSentResponse.ok ? (pendingSentResponse.data.requests || []) : [];
        const currentCompanyId = Number(latestProfile?.company_id || storedProfile.company_id || getStoredCompanyId());
        const fastProfile = latestProfile || { company_id: currentCompanyId };
        const acceptedOverviewMatches = latestAcceptedConnections
          .map(connection => ({ company: getConnectionCompany(connection, currentCompanyId), match_score: 100 }))
          .filter(match => match.company);

        if (acceptedOverviewMatches.length) {
          renderLiveMatches(acceptedOverviewMatches);
        }
        renderMatchesPage([], latestAcceptedConnections, latestSentPending, latestReceivedPending, fastProfile);

        if (connectionsResponse.ok) {
          updateKpi('Active Matches', latestAcceptedConnections.length, `${latestAcceptedConnections.length} accepted connection${latestAcceptedConnections.length === 1 ? '' : 's'}`);
        } else {
          updateKpi('Active Matches', 0, 'No accepted connections yet');
        }

        if (pendingReceivedResponse.ok && pendingSentResponse.ok) {
          updateDealsInProgress(latestReceivedPending, latestSentPending);
        } else {
          updateKpi('Deals in Progress', 0, 'No pending requests');
        }

        return { connectionsResponse, pendingReceivedResponse, pendingSentResponse, acceptedOverviewMatches, fastProfile };
      });

      const messagesPromise = dashboardRequest('/messages/conversations').then(messagesResponse => {
        const conversations = messagesResponse.ok ? (messagesResponse.data.conversations || []) : [];
        renderLiveMessages(conversations);
        if (messagesResponse.ok) {
          const unreadTotal = conversations.reduce((sum, conversation) => sum + Number(conversation.unread_count || 0), 0);
          updateKpi('Unread Messages', unreadTotal, unreadTotal === 1 ? '1 unread message' : `${unreadTotal} unread messages`);
        } else {
          renderLiveMessages([]);
          updateKpi('Unread Messages', 0, 'No unread messages');
        }
        return messagesResponse;
      });

      const verificationPromise = dashboardRequest('/verification').then(verificationResponse => {
        latestDocuments = verificationResponse.ok ? (verificationResponse.data.documents || []) : [];
        renderLiveVerification(latestDocuments);
        return verificationResponse;
      });

      const notificationsPromise = Promise.all([
        dashboardRequest('/auth/notifications'),
        verificationPromise
      ]).then(([notificationsResponse]) => {
        const notifications = notificationsResponse.ok ? (notificationsResponse.data.notifications || []) : [];
        renderNotificationPanel(notifications, latestDocuments);
        return notificationsResponse;
      });

      const profileViewsPromise = dashboardRequest(`/profile/views/stats?days=${activeAnalyticsDays}`).then(profileViewsResponse => {
        updateProfileViewsKpi(profileViewsResponse, activeAnalyticsDays);
        return profileViewsResponse;
      });

      const matchesPromise = Promise.all([
        dashboardRequest('/matches'),
        matchesCorePromise
      ]).then(([matchesResponse, core]) => {
        latestAiMatches = matchesResponse.ok ? (matchesResponse.data.matches || []) : [];
        if (!core.acceptedOverviewMatches.length || latestAiMatches.length) {
          renderLiveMatches(latestAiMatches);
        }
        renderMatchesPage(latestAiMatches, latestAcceptedConnections, latestSentPending, latestReceivedPending, latestProfile || core.fastProfile);
        renderLiveMarketInsights(latestProfile, latestAiMatches);
        return matchesResponse;
      });

      const results = await Promise.all([
        profilePromise,
        matchesCorePromise,
        messagesPromise,
        verificationPromise,
        notificationsPromise,
        profileViewsPromise,
        matchesPromise
      ]);

      const failed = results.filter(result => result && result.ok === false);
      if (failed.length) {
        console.warn('Some dashboard backend sections could not be loaded', failed);
      }
    } catch (error) {
      console.error('Dashboard hydration failed', error);
      setCardEmpty(getOverviewCard('Recent Matches'), 'No matches yet.');
      setCardEmpty(getOverviewCard('Recent Messages'), 'No conversations yet.');
      renderMatchesPage([], [], [], [], null);
      renderMessagesList([], getStoredCompanyId());
    }
  }

  window.hydrateOverviewFromBackend = hydrateOverviewFromBackend;
  document.addEventListener('DOMContentLoaded', hydrateOverviewFromBackend);
  if (document.readyState !== 'loading') {
    hydrateOverviewFromBackend();
  }
})();

document.getElementById('discBtnPass')?.addEventListener('click', () => {
  if (discIndex >= discCompanies.length) return;
  const company = discCompanies[discIndex];
  if (company.relationship_status === 'connected') {
    showUserToast('You are already connected with this business.');
    return;
  }
  discPassed++; discSwipe('left'); showUserToast('Passed');
});
document.getElementById('discBtnConnect')?.addEventListener('click', () => {
  if (discIndex >= discCompanies.length) return;
  const company = discCompanies[discIndex];
  const name = company.name;

  if (!company.company_id) {
    showUserToast('This company cannot be connected right now.');
    return;
  }

  if (company.relationship_status === 'connected') {
    openConversationFromMatch(company.company_id)
      .then(() => showUserToast(`Conversation opened with ${name}.`))
      .catch(error => showUserToast(error.message || 'Could not open conversation'));
    return;
  }

  if (company.relationship_status === 'pending') {
    showUserToast(`A request with ${name} is already pending.`);
    return;
  }

  window.TradeGridAPI?.connect({
    company_id: company.company_id,
    notes: 'Connection request sent from Discover'
  }).then(() => {
    discConnected++;
    discSwipe('right');
    showUserToast('Connection request sent to ' + name + '. Pending acceptance.');
    window.hydrateOverviewFromBackend?.();
  }).catch(error => {
    console.error(error);
    showUserToast(error.message || 'Could not send connection request');
  });
});
document.getElementById('discBtnProfile')?.addEventListener('click', () => {
  if (discIndex >= discCompanies.length) return;
  const company = discCompanies[discIndex];
  openDiscoverCompanyProfile(company.company_id, company.name);
});
document.getElementById('discBtnEnquire')?.addEventListener('click', () => {
  if (discIndex >= discCompanies.length) return;
  const company = discCompanies[discIndex];
  openCompanyEnquiryModal(company.company_id, company.name);
});

// Keyboard support for discover page
document.addEventListener('keydown', (e) => {
  const discPage = document.getElementById('page-discover');
  if (!discPage?.classList.contains('active')) return;
  if (e.key === 'ArrowLeft')  document.getElementById('discBtnPass')?.click();
  if (e.key === 'ArrowRight') document.getElementById('discBtnConnect')?.click();
  if (e.key === 'ArrowUp')    document.getElementById('discBtnProfile')?.click();
});

async function loadMatchStats() {
  try {
    const response = await fetch(
      "http://localhost:5000/profile/matches/stats",
      {
        headers: {
          "Content-Type": "application/json",
          ...(getDashboardToken()
            ? { Authorization: `Bearer ${getDashboardToken()}` }
            : {})
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not load match stats");
    }

    const totalActive = Number(data.total_active_matches || 0);
    const weekly = Number(data.matches_this_week || 0);
    const inProgress = Number(data.deals_in_progress || 0);
    const completed = Number(data.completed_deals || 0);
    latestAnalyticsReportData.matchStats = {
      total_active_matches: totalActive,
      matches_this_week: weekly,
      deals_in_progress: inProgress,
      completed_deals: completed
    };
    const totalKnown = totalActive + completed;
    const connectionRate = totalKnown ? Math.round((totalActive / totalKnown) * 100) : 0;

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    setText("totalMatches", totalActive);
    setText("weeklyMatches", weekly);
    setText("dealsProgress", inProgress);
    setText("completedDeals", completed);
    setText("analyticsTotalMatches", totalActive);
    setText("analyticsWeeklyMatches", weekly);
    setText("analyticsDealsProgress", inProgress);
    setText("analyticsCompletedDeals", completed);
    setText("analyticsConnectionRate", `${connectionRate}%`);
    setText("analyticsActiveDeals", inProgress);

    const connectionChange = document.getElementById("analyticsConnectionRateChange");
    if (connectionChange) {
      connectionChange.className = "akpi-change neutral";
      connectionChange.innerHTML = `<i class="ri-link"></i> ${totalActive} active connection${totalActive === 1 ? "" : "s"}`;
    }

    const responseRate = document.getElementById("analyticsResponseRate");
    const responseRateChange = document.getElementById("analyticsResponseRateChange");
    if (responseRate) responseRate.textContent = totalActive ? "100%" : "0%";
    if (responseRateChange) {
      responseRateChange.className = "akpi-change neutral";
      responseRateChange.innerHTML = `<i class="ri-message-3-line"></i> Based on connected partners`;
    }

    const activeDealsChange = document.getElementById("analyticsActiveDealsChange");
    if (activeDealsChange) {
      activeDealsChange.className = "akpi-change neutral";
      activeDealsChange.innerHTML = `<i class="ri-briefcase-line"></i> ${completed} completed`;
    }

  } catch (error) {
    console.error(error);
  }
}

async function loadTopPartnerCountries() {
  const container = document.getElementById("topPartnerCountries");
  if (!container) return;

  try {
    const rawToken = getDashboardToken();

    if (!rawToken) {
      throw new Error("No login token found. Please sign in again.");
    }

    const token = rawToken.replace(/^Bearer\s+/i, "");

    const response = await fetch(
      "http://localhost:5000/profile/matches/top-countries",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "Could not load countries");
    }

    const countries = data.countries || [];
    latestAnalyticsReportData.partnerCountries = countries;

    if (!countries.length) {
      container.innerHTML = `
        <div class="country-empty">
          No international partners yet
        </div>
      `;
      return;
    }

    container.innerHTML = countries.map((country) => `
      <div class="country-row">
        <span class="c-name">${country.country}</span>
        <span class="c-count">
          ${country.matches} ${country.matches === 1 ? "partner" : "partners"}
        </span>
      </div>
    `).join("");

  } catch (error) {
    console.error("TOP COUNTRIES ERROR:", error);

    container.innerHTML = `
      <div class="country-empty">
        ${error.message === "Invalid token"
          ? "Your login session expired. Please sign in again."
          : "Failed to load partner countries"}
      </div>
    `;
  }
};
// Init on page load with every backend-visible company. Search/image search
// will replace this deck with filtered results.
renderDiscoverInsights();
loadAllDiscoverCompanies();
loadMatchStats();
loadTopPartnerCountries();
