
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
  
