const features = [
    {
        icon: "👥",
        title: "Verified Partners",
        description: "Trusted businesses only."
    },
    {
        icon: "🌍",
        title: "Global Reach",
        description: "150+ countries."
    },
    {
        icon: "🛡️",
        title: "Secure Platform",
        description: "Enterprise security."
    },
    {
        icon: "📈",
        title: "Market Insights",
        description: "Real-time data."
    }
];

const container = document.getElementById("features");

features.forEach(feature => {
    const div = document.createElement("div");
    div.className = "feature-card";

    div.innerHTML = `
        <div class="icon">${feature.icon}</div>
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
    `;

    container.appendChild(div);

});

// Animate feature cards when they scroll into view
gsap.registerPlugin(ScrollTrigger);

gsap.from(".feature-card", {
  opacity: 0,
  y: 50,
  stagger: 0.2,
  scrollTrigger: {
    trigger: "#features",
    start: "top 80%",   // when #features enters viewport
    toggleActions: "play none none reset"
  }
});

gsap.to(".banner", {
  opacity: 0,
  scrollTrigger: {
    trigger: "#features",
    start: "top center",
    scrub: true
  }
});
// Animate floating card
gsap.to(".floating-card", {
  y: -300, // 🔥 stronger movement
  ease: "none",
  scrollTrigger: {
    trigger: ".transition-section",
    start: "top top",   // when section enters screen
    end: "bottom top",     // when it leaves
    scrub: true
  }
});

// Animate hero text
gsap.from(".hero-text", {
  opacity: 0,
  y: 50,
  duration: 1,
  scrollTrigger: {
    trigger: ".hero-banner",
    start: "top 70%"
  }
});

