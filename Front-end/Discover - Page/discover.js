/* ============================================================
   TRADE GRID — discover.js
   Dark Mode Toggle
   ============================================================ */

(function () {
  var KEY = 'tradegrid-dark-mode';

  function applyTheme(dark) {
    document.body.classList.toggle('dark-mode', dark);
    document.querySelectorAll('.dark-mode-toggle').forEach(function (btn) {
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title',      dark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function toggleDarkMode() {
    var isDark = !document.body.classList.contains('dark-mode');
    localStorage.setItem(KEY, isDark ? '1' : '0');
    applyTheme(isDark);
  }

  applyTheme(localStorage.getItem(KEY) === '1');

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.dark-mode-toggle').forEach(function (btn) {
      btn.addEventListener('click', toggleDarkMode);
    });
  });
})();

/* Inherit dark mode from landing page */
(function () {
  if (localStorage.getItem('tradegrid-dark-mode') === '1') {
    document.body.classList.add('dark-mode');
  }
})();


/* ============================================================
   FILTER LOGIC
   Strategy: fade ALL cards out first, update visibility,
   then fade the matching cards back in with a stagger.
   The grid layout never shifts mid-animation.
   ============================================================ */

const FILTER_MAP = {
  'all markets':  { type: null,       industry: null },
  'exporters':    { type: 'exporter', industry: null },
  'importers':    { type: 'importer', industry: null },
  'agriculture':  { type: null,       industry: 'agriculture' },
  'tech':         { type: null,       industry: 'tech' },
  'healthcare':   { type: null,       industry: 'healthcare' },
};

const FADE_OUT_MS = 180;  // how long the fade-out takes
const STAGGER_MS  = 60;   // delay between each card fading in

let filterBusy = false;

function getStaticCompanies() {
  return Array.from(document.querySelectorAll('.company-card')).map(card => ({
    name: card.querySelector('.card-company-name')?.textContent?.trim(),
    location: card.querySelector('.card-location')?.textContent?.trim(),
    description: card.querySelector('.card-description')?.textContent?.trim(),
    type: card.dataset.type || 'both',
    industries: card.dataset.industries || '',
    tags: Array.from(card.querySelectorAll('.card-tag')).map(tag => tag.textContent.trim()),
    stats: Array.from(card.querySelectorAll('.card-stat')).map(stat => ({
      value: stat.querySelector('.stat-num')?.textContent?.trim(),
      label: stat.querySelector('.stat-lbl')?.textContent?.trim(),
    })),
  }));
}

function normalizeCompany(company, index) {
  const name = company.company_name || company.name || company.companyName || company.businessName || 'Verified Trade Partner';
  const type = (company.business_type || company.type || company.tradeType || company.role || 'both').toLowerCase();
  const industries = Array.isArray(company.industries)
    ? company.industries.join(',')
    : (company.industries || company.industry?.industry_name || company.industry || company.sector || 'trade');
  const location = company.location?.country || company.location || [company.city, company.country].filter(Boolean).join(', ') || company.country || 'Global';
  const productTags = company.supplied_products || company.matched_products || [];
  const tags = company.tags || (productTags.length ? productTags : String(industries).split(',').map(tag => tag.trim()).filter(Boolean));
  const stats = company.stats || [
    { value: company.year_established || company.yearsActive || company.established || 'New', label: 'Established' },
    { value: company.number_of_employees || '-', label: 'Employees' },
    { value: company.target_regions?.length || 'Global', label: 'Markets' },
  ];

  return {
    name,
    location,
    description: company.company_description || company.description || company.about || 'Verified importer and exporter available through Trade Grid.',
    type,
    industries,
    tags,
    stats,
    avatar: company.avatar || company.init || name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase(),
    bannerClass: `card-banner-${(index % 3) + 1}`,
  };
}

function renderCompanies(companies) {
  const grid = document.querySelector('.companies-grid');
  if (!grid) return;

  grid.innerHTML = companies.map((raw, index) => {
    const company = normalizeCompany(raw, index);
    const typeLabel = company.type === 'exporter' ? 'EXPORTER' : company.type === 'importer' ? 'IMPORTER' : 'IMPORTER / EXPORTER';
    const typeClass = company.type === 'exporter' ? 'badge-exporter' : company.type === 'importer' ? 'badge-importer' : 'badge-both';
    const tags = company.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('');
    const stats = company.stats.slice(0, 3).map(stat => `
      <div class="card-stat">
        <span class="stat-num">${stat.value}</span>
        <span class="stat-lbl">${stat.label}</span>
      </div>
    `).join('');

    return `
      <div class="company-card" data-type="${company.type}" data-industries="${company.industries}">
        <div class="card-banner ${company.bannerClass}">
          <div class="verified-badge"><i class="ri-shield-check-fill"></i> VERIFIED</div>
        </div>
        <div class="card-avatar avatar-${(index % 3) + 1}">${company.avatar}</div>
        <div class="card-body">
          <div class="card-header-row">
            <div>
              <div class="card-company-name">${company.name}</div>
              <div class="card-location"><i class="ri-map-pin-2-line"></i>${company.location}</div>
            </div>
            <div class="card-type-badge ${typeClass}">${typeLabel}</div>
          </div>
          <p class="card-description">${company.description}</p>
          <div class="card-tags">${tags}</div>
          <div class="card-stats">${stats}</div>
          <div class="card-actions">
            <div class="btn-connect-locked"><i class="ri-lock-2-line"></i>Sign in to Connect</div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const countEl = document.querySelector('.preview-label-left span');
  if (countEl) countEl.textContent = companies.length;
}

function filterCards(activeBtn) {
  if (filterBusy) return;
  filterBusy = true;

  const label = activeBtn.textContent.trim().toLowerCase();
  const rule  = FILTER_MAP[label] || { type: null, industry: null };
  const cards = Array.from(document.querySelectorAll('.company-card'));

  /* ── 1. Fade everything out instantly ── */
  cards.forEach(card => {
    card.style.transition = `opacity ${FADE_OUT_MS}ms ease, transform ${FADE_OUT_MS}ms ease`;
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(6px)';
  });

  /* ── 2. After fade-out, show/hide and fade matching ones back in ── */
  setTimeout(() => {
    const toShow = [];

    cards.forEach(card => {
      const cardType       = (card.dataset.type       || '').toLowerCase();
      const cardIndustries = (card.dataset.industries || '').toLowerCase().split(',').map(s => s.trim());

      let show = true;

      if (rule.type) {
        show = rule.type === 'exporter'
          ? (cardType === 'exporter' || cardType === 'both')
          : (cardType === 'importer' || cardType === 'both');
      }
      if (show && rule.industry) {
        show = cardIndustries.includes(rule.industry);
      }

      if (show) {
        card.style.display = '';
        toShow.push(card);
      } else {
        /* Keep space collapsed cleanly — visibility:hidden preserves grid space */
        card.style.display = 'none';
      }
    });

    /* Update counter */
    const countEl = document.querySelector('.preview-label-left span');
    if (countEl) countEl.textContent = toShow.length;

    /* Force a reflow so display:'' is painted before we start the fade-in */
    void document.querySelector('.companies-grid').offsetHeight;

    /* ── 3. Stagger fade-in for visible cards ── */
    toShow.forEach((card, i) => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(10px)';

      setTimeout(() => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity    = '1';
        card.style.transform  = 'translateY(0)';
      }, i * STAGGER_MS);
    });

    /* Unlock after all animations finish */
    const totalDelay = (toShow.length - 1) * STAGGER_MS + 320;
    setTimeout(() => { filterBusy = false; }, totalDelay);

  }, FADE_OUT_MS + 10);
}

document.addEventListener('DOMContentLoaded', function () {
  const fallbackCompanies = getStaticCompanies();

  window.TradeGridAPI?.getDiscoverCompanies(fallbackCompanies).then(companies => {
    renderCompanies(companies);
    document.querySelectorAll('.company-card').forEach(card => {
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
  });

  /* Set initial transition on cards */
  document.querySelectorAll('.company-card').forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCards(btn);
    });
  });
});
