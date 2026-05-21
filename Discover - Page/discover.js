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