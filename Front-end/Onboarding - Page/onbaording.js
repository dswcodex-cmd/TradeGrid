import {
    signupUser,
    sendEmailVerification,
    verifyEmailCode
} from "./onBoardFetches.js";

  function nextStep(step) {
      document.querySelectorAll(".form-step").forEach(s => s.classList.remove("active"));
      document.querySelector(`.form-step[data-step="${step}"]`).classList.add("active");

      document.querySelectorAll(".dot").forEach(d => d.classList.remove("active"));
      document.querySelector(`.dot[data-step="${step}"]`).classList.add("active");
    }

  function prevStep(step) {
      nextStep(step);
    }

    document.getElementById("onboardingForm").addEventListener("submit", async function(e) {
      e.preventDefault();

      const submitButton = this.querySelector(".btn-submit");
      const companyName = document.getElementById("companyName").value.trim();
      const email = document.getElementById("email").value.trim();
      const registrationNumber = document.getElementById("cipc").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("password-confirm").value;
      const businessType = document.getElementById("type").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = "Creating account...";

      try {
        const signupResponse = await signupUser({
          company_name: companyName,
          registration_number: registrationNumber,
          email,
          Password: password,
          business_type: businessType
        });

        if (!signupResponse.ok) {
          alert(signupResponse.data?.message || signupResponse.data?.error || "Signup failed.");
          return;
        }

        const verificationResponse = await sendEmailVerification({ email });

        if (!verificationResponse.ok) {
          alert(verificationResponse.data?.message || verificationResponse.data?.error || "Account created, but email verification could not be sent.");
          return;
        }

        const code = window.prompt("Enter the verification code sent to your email:");

        if (!code) {
          alert("Account created. You still need to verify your email before login.");
          window.location.href = "../Login - Page/login.html";
          return;
        }

        const verifyResponse = await verifyEmailCode({
          email,
          code: code.trim()
        });

        if (!verifyResponse.ok) {
          alert(verifyResponse.data?.message || verifyResponse.data?.error || "Verification failed. Please try again from the login page.");
          return;
        }

        alert("Registration completed successfully. You can now log in.");
        window.location.href = "../Login - Page/login.html";
      } catch (error) {
        alert("Something went wrong while creating your account.");
        console.error(error);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Complete Registration";
      }
    });

    /**hide and show password */
  function togglePassword(fieldId, btn) {
    const input = document.getElementById(fieldId);
    if (input.type === "password") {
      input.type = "text";
      btn.textContent = "Hide";
    } else {
      input.type = "password";
      btn.textContent = "Show";
    }
  }

  /**hexagon backgeound  */
      (function () {
      const svg = document.getElementById('hex-canvas');
      function draw() {
        const W = window.innerWidth;
        const H = window.innerHeight;
        svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
 
        const size = 34;
        const colW = size * 1.5;
        const rowH = Math.sqrt(3) * size;
        const cols = Math.ceil(W / colW) + 2;
        const rows = Math.ceil(H / rowH) + 2;
 
        const strokes = [
          'rgba(15,163,177,0.22)',
          'rgba(181,234,240,0.16)',
          'rgba(15,163,177,0.32)',
          'rgba(181,234,240,0.10)',
          'rgba(15,163,177,0.14)',
        ];
        const fills = [
          'rgba(15,163,177,0.07)',
          'rgba(181,234,240,0.05)',
          'rgba(15,163,177,0.13)',
          'rgba(0,0,0,0)',
          'rgba(181,234,240,0.09)',
          'rgba(0,0,0,0)',
          'rgba(15,163,177,0.04)',
        ];
 
        let html = '';
        for (let r = -1; r < rows; r++) {
          for (let c = -1; c < cols; c++) {
            const cx = c * colW + size;
            const cy = r * rowH + (c % 2 === 0 ? 0 : rowH / 2) + rowH / 2;
            const pts = Array.from({ length: 6 }, (_, i) => {
              const a = (Math.PI / 3) * i - Math.PI / 6;
              return `${(cx + size * Math.cos(a)).toFixed(1)},${(cy + size * Math.sin(a)).toFixed(1)}`;
            }).join(' ');
            const si = ((r * 4 + c * 7) & 0xff) % strokes.length;
            const fi = ((r * 5 + c * 11 + 3) & 0xff) % fills.length;
            html += `<polygon points="${pts}" fill="${fills[fi]}" stroke="${strokes[si]}" stroke-width="0.7"/>`;
          }
        }
        svg.innerHTML = html;
      }
      draw();
      window.addEventListener('resize', draw);
    })();

  window.nextStep = nextStep;
  window.prevStep = prevStep;
  window.togglePassword = togglePassword;
 
  
