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

  /* Apply saved preference on load — default to light if nothing saved */
  applyTheme(localStorage.getItem(KEY) === '1');

  /* Wire up toggle buttons once DOM is ready */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.dark-mode-toggle').forEach(function (btn) {
      btn.addEventListener('click', toggleDarkMode);
    });
  });
})();

/* ============================================================
   TRADE GRID — discover.js
   Inherits dark mode set from the landing page (read-only).
   No toggle exposed here — theme is controlled from landing only.
   ============================================================ */
(function () {
  if (localStorage.getItem('tradegrid-dark-mode') === '1') {
    document.body.classList.add('dark-mode');
  }
})();