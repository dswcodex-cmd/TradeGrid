/* ============================================================
   TRADE GRID USER DASHBOARD — user-dashboard.js
   ============================================================ */

// ── Page Navigation ──
const navItems = document.querySelectorAll('.nav-item[data-page]');
const pages    = document.querySelectorAll('.page');

function navigateTo(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  navItems.forEach(n => n.classList.remove('active'));
  const targetPage = document.getElementById('page-' + pageId);
  const targetNav  = document.querySelector('.nav-item[data-page="' + pageId + '"]');
  if (targetPage) targetPage.classList.add('active');
  if (targetNav)  targetNav.classList.add('active');
  closeSidebar();
}

navItems.forEach(item => {
  item.addEventListener('click', (e) => { e.preventDefault(); navigateTo(item.dataset.page); });
});
document.querySelectorAll('[data-page]').forEach(el => {
  if (el.classList.contains('nav-item')) return;
  el.addEventListener('click', (e) => { e.preventDefault(); navigateTo(el.dataset.page); });
});

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

// Currency symbol map
const currencySymbols = {
  ZAR: 'R',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AED: 'د.إ'
};

function openPaymentModal() {
  // Reset fields
  payAmount.value    = '';
  payReference.value = '';
  payCurrency.value  = 'ZAR';
  paymentModalBackdrop.classList.add('open');
}

function closePaymentModal() {
  paymentModalBackdrop.classList.remove('open');
}

// Open from payment button in chat input
msgPayBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  openPaymentModal();
});

// Close actions
paymentModalClose.addEventListener('click', closePaymentModal);
btnPaymentCancel.addEventListener('click', closePaymentModal);
paymentModalBackdrop.addEventListener('click', (e) => {
  if (e.target === paymentModalBackdrop) closePaymentModal();
});

// Send payment
btnPaymentSend.addEventListener('click', () => {
  const amount = parseFloat(payAmount.value);
  const ref    = payReference.value.trim();
  const currency = payCurrency.value;
  const symbol   = currencySymbols[currency] || currency;

  if (!amount || amount <= 0) {
    payAmount.focus();
    payAmount.style.borderColor = '#dc2626';
    setTimeout(() => { payAmount.style.borderColor = ''; }, 1500);
    return;
  }

  // Build confirmation bubble text
  const amountDisplay = `${currency} ${symbol}${amount.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  const refDisplay    = ref ? ` · ${ref}` : '';
  const bubbleText    = `Payment of ${amountDisplay} sent${refDisplay}`;

  // Inject payment bubble into chat
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

// ── IMAGE SEARCH PANEL ──
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

const productDB = [
  { icon:'☀️', name:'Solar PV Panel — Monocrystalline 400W', desc:'High-efficiency monocrystalline silicon photovoltaic panel with 21.4% conversion efficiency. Suitable for residential and commercial rooftop installations. IEC 61215 & IEC 61730 certified.', tags:['Renewable Energy','Solar','Electronics','Export Ready'], category:'Energy Equipment', hsCode:'8541.40', origin:'China / SA', demand:[{market:'Sub-Saharan Africa',pct:88},{market:'Europe',pct:74},{market:'Middle East',pct:61},{market:'Asia-Pacific',pct:55}], suppliers:[{init:'SL',name:'SunLight Systems',meta:'South Africa · 200+ exports',score:'97%'},{init:'GE',name:'GreenEnergy SA',meta:'South Africa · 120+ exports',score:'91%'},{init:'AP',name:'AsiaPower Exports',meta:'China · 500+ exports',score:'89%'}], specs:[{label:'HS Code',value:'8541.40'},{label:'Power Output',value:'400W'},{label:'Efficiency',value:'21.4%'},{label:'Warranty',value:'25 years'},{label:'Weight',value:'21.5 kg'},{label:'Certifications',value:'IEC 61215, CE'}] },
  { icon:'🌽', name:'Grade A Yellow Maize — Bulk Export', desc:'Premium quality yellow maize sourced from South African farms. Moisture content below 14%, suitable for animal feed and food processing. Available in 50kg bags or bulk shipping containers.', tags:['Agriculture','Grain','Food & Beverage','Bulk Available'], category:'Agricultural Commodities', hsCode:'1005.90', origin:'South Africa', demand:[{market:'East Africa',pct:92},{market:'Europe',pct:68},{market:'Middle East',pct:78},{market:'Asia',pct:45}], suppliers:[{init:'GE',name:'Global Exports Ltd',meta:'South Africa · Verified',score:'98%'},{init:'AF',name:'Agri-Foods SA',meta:'South Africa · 300+ exports',score:'94%'},{init:'HP',name:'Harvest Pro',meta:'South Africa · 180+ exports',score:'87%'}], specs:[{label:'HS Code',value:'1005.90'},{label:'Moisture',value:'< 14%'},{label:'Grade',value:'Grade A / No.1'},{label:'Min Order',value:'25 tonnes'},{label:'Packaging',value:'50kg bags / bulk'},{label:'Certifications',value:'PPECB, HACCP'}] },
  { icon:'💻', name:'Electronic Components — SMD Assembly Lot', desc:'Assorted surface-mount device components including resistors, capacitors, MOSFETs, and ICs from Tier-1 manufacturers. RoHS 3 compliant. Supplied with full traceability documentation.', tags:['Electronics','Manufacturing','Components','RoHS Compliant'], category:'Electronic Components', hsCode:'8541.10', origin:'China / Taiwan', demand:[{market:'South Africa',pct:72},{market:'Europe',pct:85},{market:'Americas',pct:79},{market:'Middle East',pct:58}], suppliers:[{init:'TC',name:'TechComps Asia',meta:'Taiwan · 1200+ exports',score:'96%'},{init:'EI',name:'Euro Import Solutions',meta:'Germany · 600+ exports',score:'92%'},{init:'MS',name:'Micro Supply Co',meta:'China · 900+ exports',score:'88%'}], specs:[{label:'HS Code',value:'8541.10'},{label:'Standard',value:'RoHS 3'},{label:'AQL',value:'0.65'},{label:'Lead Time',value:'14–21 days'},{label:'MOQ',value:'1,000 units'},{label:'Certifications',value:'CE, UL, REACH'}] },
  { icon:'🧴', name:'Medical Grade Nitrile Gloves — Powder Free', desc:'Disposable nitrile examination gloves, powder-free, AQL 1.5. Textured fingertips for superior grip. Suitable for clinical, laboratory, and food handling environments.', tags:['Healthcare','Medical Supplies','PPE','FDA Cleared'], category:'Medical Supplies', hsCode:'4015.12', origin:'Malaysia / Thailand', demand:[{market:'Sub-Saharan Africa',pct:95},{market:'Europe',pct:80},{market:'Americas',pct:88},{market:'Middle East',pct:82}], suppliers:[{init:'ME',name:'MedEquip Trading',meta:'UAE · 400+ exports',score:'95%'},{init:'HG',name:'HealthGuard SA',meta:'South Africa · 250+ exports',score:'91%'},{init:'PL',name:'ProLab Supplies',meta:'Malaysia · 700+ exports',score:'89%'}], specs:[{label:'HS Code',value:'4015.12'},{label:'AQL',value:'1.5'},{label:'Thickness',value:'4.5 mil'},{label:'Sizes',value:'XS–XL'},{label:'Per Box',value:'100 gloves'},{label:'Certifications',value:'FDA, CE, EN374'}] },
  { icon:'🧵', name:'Smart Performance Fabric — Moisture-Wicking Blend', desc:'Advanced moisture-wicking polyester-spandex blend with integrated conductive threads. Suitable for sportswear, medical compression garments, and wearable technology.', tags:['Textiles','Smart Materials','Sportswear','Technical Fabric'], category:'Technical Textiles', hsCode:'5407.61', origin:'South Africa / Portugal', demand:[{market:'Europe',pct:82},{market:'Americas',pct:74},{market:'Asia-Pacific',pct:65},{market:'Middle East',pct:51}], suppliers:[{init:'TI',name:'TextilInno SA',meta:'South Africa · 150+ exports',score:'93%'},{init:'FT',name:'FabricTech Europe',meta:'Portugal · 320+ exports',score:'90%'},{init:'SP',name:'SportPro Textiles',meta:'South Africa · 95+ exports',score:'85%'}], specs:[{label:'HS Code',value:'5407.61'},{label:'Composition',value:'82% PES / 18% EL'},{label:'Weight',value:'180 g/m²'},{label:'Width',value:'150 cm'},{label:'MOQ',value:'500 metres'},{label:'Certifications',value:'OEKO-TEX, SABS'}] }
];

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

btnRunImgSearch.addEventListener('click', () => {
  imgSearchLoading.classList.add('visible');
  imgResultCard.classList.remove('visible');
  btnRunImgSearch.disabled = true;
  setTimeout(() => {
    imgSearchLoading.classList.remove('visible');
    btnRunImgSearch.disabled = false;
    currentProduct = productDB[Math.floor(Math.random() * productDB.length)];
    resultName.textContent = currentProduct.name;
    resultDesc.textContent = currentProduct.desc;
    resultTags.innerHTML = currentProduct.tags.map(t => '<span class="result-tag">' + t + '</span>').join('');
    imgResultCard.classList.add('visible');
    showUserToast('Product identified successfully!');
  }, 1600 + Math.random() * 800);
});

btnViewProduct.addEventListener('click', () => {
  if (!currentProduct) return;
  closeImgPanel();
  renderProductDetail(currentProduct);
  navigateTo('product-detail');
});

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
  document.getElementById('btnEnquire').addEventListener('click', () => { showUserToast('Enquiry sent to matched suppliers!'); navigateTo('messages'); });
  document.getElementById('btnSaveProduct').addEventListener('click', () => showUserToast('Product saved to watchlist!'));
}

// ============================================================
//   MASHA AI — icon-based chat bubbles (no emojis in chat)
// ============================================================
const mashaFab      = document.getElementById('mashaFab');
const mashaWindow   = document.getElementById('mashaWindow');
const mashaClose    = document.getElementById('mashaClose');
const mashaInput    = document.getElementById('mashaWinInput');
const mashaSend     = document.getElementById('mashaWinSend');
const mashaMessages = document.getElementById('mashaWinMessages');
const openMasha     = document.getElementById('openMasha');
let mashaOpen = false;

const mashaKB = [
  { patterns:['verify','document','license'], response:'To complete verification, go to Verification in the sidebar and upload your remaining documents. Our team reviews within 48 hours.' },
  { patterns:['match','partner','find','connect'], response:'Visit the Discover page to find new trading partners, or check Matches for your AI-curated suggestions!' },
  { patterns:['message','chat','contact'], response:'Head to the Messages section to chat with your trading partners directly.' },
  { patterns:['analytic','insight','stat'], response:'Your Analytics page shows profile views, match rates, and trending market data.' },
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
  avatar.innerHTML = sender === 'bot'
    ? '<i class="ri-robot-2-line"></i>'
    : '<i class="ri-user-3-line"></i>';

  const bubble = document.createElement('div');
  bubble.className = 'masha-msg-bubble';
  bubble.textContent = text;

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
    setTimeout(() => mashaAddMsg("Hi! I'm Masha. How can I help you today?", 'bot'), 300);
  }
}

function mashaSendMsg() {
  const text = mashaInput.value.trim();
  if (!text) return;
  mashaAddMsg(text, 'user');
  mashaInput.value = '';
  setTimeout(() => mashaAddMsg(mashaGetResponse(text), 'bot'), 700);
}

mashaFab.addEventListener('click', toggleMasha);
mashaClose.addEventListener('click', toggleMasha);
openMasha.addEventListener('click', toggleMasha);
mashaSend.addEventListener('click', mashaSendMsg);
mashaInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); mashaSendMsg(); } });

// ── Notification panel ──
const notifBtn     = document.getElementById('notifBtn');
const notifPanel   = document.getElementById('notifPanel');
const notifMarkAll = document.getElementById('notifMarkAll');
const notifCountEl = document.getElementById('notifCount');

notifBtn.addEventListener('click', (e) => { e.stopPropagation(); notifPanel.classList.toggle('hidden'); closeImgPanel(); });
notifMarkAll.addEventListener('click', () => {
  document.querySelectorAll('.notif-item.unread').forEach(n => n.classList.remove('unread'));
  if (notifCountEl) { notifCountEl.textContent = '0'; notifCountEl.style.display = 'none'; }
  showUserToast('All notifications marked as read');
});
document.addEventListener('click', (e) => { if (!notifPanel.contains(e.target) && e.target !== notifBtn) notifPanel.classList.add('hidden'); });

// ── Topbar search ──
const topbarSearchBtn   = document.getElementById('topbarSearchBtn');
const topbarSearchInput = document.getElementById('topbarSearchInput');
topbarSearchBtn.addEventListener('click', () => {
  const q = topbarSearchInput.value.trim();
  if (q) { showUserToast('Searching for "' + q + '"...'); navigateTo('discover'); }
});
topbarSearchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') topbarSearchBtn.click(); });

document.getElementById('avatarBtn').addEventListener('click', () => navigateTo('profile'));

// ── Profile edit ──
document.querySelectorAll('.profile-sec-edit').forEach(btn => {
  btn.addEventListener('click', () => showUserToast('Editing ' + (btn.dataset.field || 'section') + '...'));
});
document.getElementById('editProfileBtn')?.addEventListener('click', () => showUserToast('Opening profile editor...'));

// ── Verification ──
function viewDocument(name)    { showUserToast('Opening ' + name + '...'); }
function replaceDocument(name) { showUserToast('Select a new file for: ' + name); }
function uploadSpecific(name)  { showUserToast('Upload dialog for: ' + name); }
document.getElementById('uploadDocBtn')?.addEventListener('click', () => showUserToast('Choose a document to upload...'));

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

// ── Messages send ──
const chatInput = document.querySelector('.msg-chat-input input');
const chatSend  = document.getElementById('chatSendBtn');
chatSend?.addEventListener('click', () => {
  const val = chatInput?.value.trim(); if (!val) return;
  const body = document.querySelector('.msg-chat-body');
  if (body) { const bubble = document.createElement('div'); bubble.className = 'chat-bubble me'; bubble.textContent = val; body.appendChild(bubble); body.scrollTop = body.scrollHeight; }
  if (chatInput) chatInput.value = '';
  showUserToast('Message sent');
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

// ── Message list switch ──
// Conversation data keyed by the avatar initials shown in each list item
const conversationData = {
  AT: {
    name:    'Asian Trade Co',
    sub:     'Japan · Electronics Importer',
    avatar:  'AT',
    messages: [
      { type: 'them', text: 'Hi, we came across your profile on Trade Grid. We\'re very interested in your export offerings. Could we schedule a call?' },
      { type: 'me',   text: 'Hello! Great to hear from you. Yes, we\'d love to connect. What time zone are you in and when works best?' },
      { type: 'them', text: 'We\'re in JST (UTC+9). Any weekday morning your time would work well for us.' },
    ]
  },
  EI: {
    name:    'Euro Import Solutions',
    sub:     'Germany · Manufacturing Importer',
    avatar:  'EI',
    messages: [
      { type: 'them', text: 'Good day! We reviewed your company profile and are impressed with your agricultural export range.' },
      { type: 'me',   text: 'Thank you! We\'d be happy to discuss further. What products are you most interested in?' },
      { type: 'them', text: 'Could you send us a product catalogue for the Q3 range? Particularly interested in maize and citrus.' },
      { type: 'me',   text: 'Absolutely, I\'ll put that together and send it over by end of day.' },
    ]
  },
  TG: {
    name:    'Trade Grid Support',
    sub:     'Platform Support',
    avatar:  'TG',
    messages: [
      { type: 'them', text: 'Hello! Welcome to Trade Grid. We\'re here to help you get the most out of the platform.' },
      { type: 'them', text: 'Your document verification has been received and is currently under review. Our team will process it within 24–48 hours.' },
      { type: 'me',   text: 'Thank you for the update. How will I be notified once it\'s approved?' },
      { type: 'them', text: 'You\'ll receive a notification in the platform and an email to the address on your account.' },
    ]
  }
};

function loadConversation(initials) {
  const data = conversationData[initials];
  if (!data) return;

  // Update chat header
  const chatHeader = document.querySelector('.msg-chat-header');
  if (chatHeader) {
    chatHeader.innerHTML = `
      <div class="ml-avatar">${data.avatar}</div>
      <div>
        <p class="chat-name">${data.name}</p>
        <p class="chat-sub">${data.sub}</p>
      </div>
    `;
  }

  // Rebuild chat body with this conversation's messages
  const chatBody = document.querySelector('.msg-chat-body');
  if (chatBody) {
    chatBody.innerHTML = '';
    data.messages.forEach(msg => {
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble ' + msg.type;
      bubble.textContent = msg.text;
      chatBody.appendChild(bubble);
    });
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}

document.querySelectorAll('.msg-list-item').forEach(item => {
  item.addEventListener('click', () => {
    // Update active state in list
    document.querySelectorAll('.msg-list-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // Remove unread badge
    const unread = item.querySelector('.ml-unread');
    if (unread) unread.remove();

    // Load the matching conversation
    const initials = item.querySelector('.ml-avatar')?.textContent?.trim();
    if (initials) loadConversation(initials);
  });
});

/* ============================================================
   TRADE GRID USER DASHBOARD — darkmode patch
   Add this BEFORE user-dashboard.js in the HTML:
     <script src="user-dashboard-darkmode-patch.js"></script>
     <script src="user-dashboard.js"></script>

   What it does:
   1. Reads localStorage on load and applies dark-mode class
   2. After DOM ready, injects a "Dark Mode" toggle row into
      the existing Settings page and keeps it in sync.
   ============================================================ */

/* 1 ── Apply theme immediately (before DOM) */
(function () {
  if (localStorage.getItem('tradegrid-dark-mode') === '1') {
    document.body.classList.add('dark-mode');
  }
})();

/* 2 ── Inject Dark Mode row into Settings page after DOM ready */
document.addEventListener('DOMContentLoaded', function () {
  var settingsGrid = document.querySelector('#page-settings .settings-grid');
  if (!settingsGrid) return;

  /* Build a new card for Appearance */
  var card = document.createElement('div');
  card.className = 'settings-card';
  card.innerHTML =
    '<h3>Appearance</h3>' +
    '<div class="setting-row" id="dashDarkModeRow">' +
      '<div>' +
        '<p>Dark Mode</p>' +
        '<span>Applied across all Trade Grid pages</span>' +
      '</div>' +
      '<label class="toggle">' +
        '<input type="checkbox" id="dashDarkModeToggle">' +
        '<span class="toggle-slider"></span>' +
      '</label>' +
    '</div>';

  /* Prepend before the existing Notifications card */
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