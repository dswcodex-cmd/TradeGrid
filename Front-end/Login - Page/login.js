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

function clearStoredAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('companyToken');
  localStorage.removeItem('userToken');
  localStorage.removeItem('adminToken');
  localStorage.removeItem('tradegridUser');
  localStorage.removeItem('tradegridAdmin');
}

function storeLoginSession(data) {
  clearStoredAuth();

  localStorage.setItem('token', data.token);

  if (data.account_type === 'company') {
    localStorage.setItem('companyToken', data.token);
    localStorage.setItem('userToken', data.token);

    if (data.user) {
      localStorage.setItem('tradegridUser', JSON.stringify(data.user));
    }
  }

  if (data.account_type === 'admin') {
    localStorage.setItem('adminToken', data.token);

    if (data.admin) {
      localStorage.setItem('tradegridAdmin', JSON.stringify(data.admin));
    }
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
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, Password: password })
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      clearStoredAuth();
      alert(data.message || data.error || 'Login failed.');
      return;
    }

    if (!data.token || !data.account_type) {
      clearStoredAuth();
      alert('Login response is missing required session data.');
      return;
    }

    storeLoginSession(data);

    window.location.href = data.redirect_to || '../User Dashboard - Page/user-dashboard.html';
  } catch (error) {
    console.error(error);
    alert('We could not sign you in right now. Please try again shortly.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign In';
    }
  }
}

function getForgotModal() {
  let modal = document.getElementById('forgotPasswordModal');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.id = 'forgotPasswordModal';
  modal.className = 'forgot-modal-backdrop';
  modal.innerHTML = `
    <div class="forgot-modal" role="dialog" aria-modal="true" aria-labelledby="forgotTitle">
      <button type="button" class="forgot-close" id="forgotCloseBtn" aria-label="Close">
        <i class="ri-close-line"></i>
      </button>
      <div class="forgot-heading">
        <h2 id="forgotTitle">Reset Password</h2>
        <p id="forgotHelpText">Enter your account email and we will send a verification code.</p>
      </div>

      <form id="forgotEmailForm" class="forgot-form">
        <label for="forgotEmail">Email</label>
        <input id="forgotEmail" type="email" placeholder="Enter your email" required>
        <button type="submit" class="btn-submit">Send Code</button>
      </form>

      <form id="forgotResetForm" class="forgot-form hidden">
        <label for="forgotCode">Verification Code</label>
        <input id="forgotCode" type="text" inputmode="numeric" placeholder="Enter OTP code" required>
        <label for="forgotNewPassword">New Password</label>
        <input id="forgotNewPassword" type="password" placeholder="New password" required>
        <label for="forgotConfirmPassword">Confirm Password</label>
        <input id="forgotConfirmPassword" type="password" placeholder="Confirm password" required>
        <button type="submit" class="btn-submit">Reset Password</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  const closeModal = () => modal.classList.remove('open');
  modal.querySelector('#forgotCloseBtn')?.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  modal.querySelector('#forgotEmailForm')?.addEventListener('submit', sendForgotCode);
  modal.querySelector('#forgotResetForm')?.addEventListener('submit', resetForgotPassword);

  return modal;
}

function openForgotPassword() {
  const modal = getForgotModal();
  modal.querySelector('#forgotHelpText').textContent = 'Enter your account email and we will send a verification code.';
  modal.querySelector('#forgotEmailForm').classList.remove('hidden');
  modal.querySelector('#forgotResetForm').classList.add('hidden');
  modal.querySelector('#forgotCode').value = '';
  modal.querySelector('#forgotNewPassword').value = '';
  modal.querySelector('#forgotConfirmPassword').value = '';
  modal.classList.add('open');
  modal.querySelector('#forgotEmail')?.focus();
}

async function sendForgotCode(event) {
  event.preventDefault();

  const modal = getForgotModal();
  const emailInput = modal.querySelector('#forgotEmail');
  const submitBtn = event.currentTarget.querySelector('button[type="submit"]');
  const email = emailInput?.value.trim();

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  }

  try {
    const response = await fetch('/auth/forgot-password/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      alert(data.error || data.message || 'Could not send reset code.');
      return;
    }

    modal.querySelector('#forgotHelpText').textContent = data.dev_code
      ? `Development OTP: ${data.dev_code}. Enter this code, then choose a new password.`
      : 'Enter the OTP code sent to your email, then choose a new password.';
    modal.querySelector('#forgotEmailForm').classList.add('hidden');
    modal.querySelector('#forgotResetForm').classList.remove('hidden');
    if (data.dev_code) {
      modal.querySelector('#forgotCode').value = data.dev_code;
    }
    modal.querySelector('#forgotCode')?.focus();
  } catch (error) {
    console.error(error);
    alert('We could not complete this request right now. Please try again shortly.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Code';
    }
  }
}

async function resetForgotPassword(event) {
  event.preventDefault();

  const modal = getForgotModal();
  const email = modal.querySelector('#forgotEmail')?.value.trim();
  const code = modal.querySelector('#forgotCode')?.value.trim();
  const newPassword = modal.querySelector('#forgotNewPassword')?.value;
  const confirmPassword = modal.querySelector('#forgotConfirmPassword')?.value;
  const submitBtn = event.currentTarget.querySelector('button[type="submit"]');

  if (newPassword !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Resetting...';
  }

  try {
    const response = await fetch('/auth/forgot-password/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, newPassword })
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      alert(data.error || data.message || 'Could not reset password.');
      return;
    }

    modal.classList.remove('open');
    alert('Password reset successfully. You can now sign in.');
  } catch (error) {
    console.error(error);
    alert('We could not complete this request right now. Please try again shortly.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Reset Password';
    }
  }
}

document.getElementById('togglePwBtn')?.addEventListener('click', togglePassword);
document.getElementById('loginForm')?.addEventListener('submit', loginWithBackend);
document.querySelector('.forgot-link')?.addEventListener('click', (event) => {
  event.preventDefault();
  openForgotPassword();
});
