/* Trade Grid login page */
(function () {
  try {
    if (window.localStorage?.getItem('tradegrid-dark-mode') === '1') {
      document.body.classList.add('dark-mode');
    }
  } catch (error) {
    /* Ignore storage restrictions. */
  }
})();

function togglePassword() {
  const pw = document.getElementById('password');
  const icon = document.getElementById('eye-icon');

  if (!pw || !icon) return;

  if (pw.type === 'password') {
    pw.type = 'text';
    icon.className = 'ri-eye-off-line';
  } else {
    pw.type = 'password';
    icon.className = 'ri-eye-line';
  }
}

async function loginWithBackend(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value;
  const submitBtn = form.querySelector('button[type="submit"]');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';
  }

  try {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, Password: password })
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      alert(data.message || data.error || 'Login failed.');
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('companyToken', data.token);
    localStorage.setItem('userToken', data.token);

    if (data.user) {
      localStorage.setItem('tradegridUser', JSON.stringify(data.user));
    }

    window.location.href = '../User Dashboard - Page/user-dashboard.html';
  } catch (error) {
    console.error(error);
    alert('Could not connect to the backend. Make sure the server is running on port 5000.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign In';
    }
  }
}

document.getElementById('togglePwBtn')?.addEventListener('click', togglePassword);
document.getElementById('loginForm')?.addEventListener('submit', loginWithBackend);
