
   
   
   function nextStep(step) {
      document.querySelectorAll(".form-step").forEach(s => s.classList.remove("active"));
      document.querySelector(`.form-step[data-step="${step}"]`).classList.add("active");

      document.querySelectorAll(".dot").forEach(d => d.classList.remove("active"));
      document.querySelector(`.dot[data-step="${step}"]`).classList.add("active");
    }

    function prevStep(step) {
      nextStep(step);
    }

    document.getElementById("onboardingForm").addEventListener("submit", function(e) {
      e.preventDefault();
      // Handle form submission here
      alert("Registration complete!");
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
 
  
