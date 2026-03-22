// --- Step navigation ---
function nextStep(step) {
  const currentStep = document.querySelector('.form-step.active');
  const currentDot = document.querySelector('.dot.active');

  if (currentStep) currentStep.classList.remove('active');
  if (currentDot) currentDot.classList.remove('active');

  const nextStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
  const nextDot = document.querySelector(`.dot[data-step="${step}"]`);
  if (nextStepEl) nextStepEl.classList.add('active');
  if (nextDot) nextDot.classList.add('active');
}

function prevStep(step) {
  const currentStep = document.querySelector('.form-step.active');
  const currentDot = document.querySelector('.dot.active');

  if (currentStep) currentStep.classList.remove('active');
  if (currentDot) currentDot.classList.remove('active');

  const prevStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
  const prevDot = document.querySelector(`.dot[data-step="${step}"]`);
  if (prevStepEl) prevStepEl.classList.add('active');
  if (prevDot) prevDot.classList.add('active');
}

// --- Form submit handling ---
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('onboardingForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get selected regions
    const regions = Array.from(document.querySelectorAll('input[name="regions"]:checked'))
      .map(cb => cb.value);

    if (regions.length === 0) {
      alert('Please select at least one target region');
      return;
    }

    alert('Registration complete! Welcome to Trade Grid.');
    window.location.href = 'landing.html';
  });
});