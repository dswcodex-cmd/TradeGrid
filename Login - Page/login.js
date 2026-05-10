/* ── Password toggle ── */
function togglePassword() {
  const pw   = document.getElementById('password');
  const icon = document.getElementById('eye-icon');
  if (pw.type === 'password') {
    pw.type = 'text';
    icon.className = 'ri-eye-off-line';
  } else {
    pw.type = 'password';
    icon.className = 'ri-eye-line';
  }
}

document.getElementById('togglePwBtn').addEventListener('click', togglePassword);

/* ── Form submit ── */
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  window.location.href = '../User Dashboard - Page/user-dashboard.html';
});

/* ============================================================
   TRADE GRID — login.js
   Inherits dark mode from landing page (read-only).
   ============================================================ */

/* Apply theme immediately before DOM loads (prevents flash) */
(function () {
  if (localStorage.getItem('tradegrid-dark-mode') === '1') {
    document.body.classList.add('dark-mode');
  }
})();

/* ── Password toggle ── */
function togglePassword() {
  const pw   = document.getElementById('password');
  const icon = document.getElementById('eye-icon');
  if (pw.type === 'password') {
    pw.type = 'text';
    icon.className = 'ri-eye-off-line';
  } else {
    pw.type = 'password';
    icon.className = 'ri-eye-line';
  }
}

document.getElementById('togglePwBtn').addEventListener('click', togglePassword);

/* ── Form submit ── */
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  window.location.href = '../User Dashboard - Page/user-dashboard.html';
});