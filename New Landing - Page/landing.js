/* ============================================================
   TRADE GRID — landing.js
   Scroll-spy | Trending products | Masha AI widget | Hamburger menu
   ============================================================ */

/* ── Mobile hamburger menu ── */
(function () {
  const hamburger  = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
    }
  });

  document.querySelectorAll('[data-mobile-link]').forEach(link => {
    link.addEventListener('click', () => { closeMobileMenu(); });
  });

  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && e.target !== hamburger) {
      closeMobileMenu();
    }
  });
})();

/* ── Scroll-spy ── */
(function () {
  const sections    = document.querySelectorAll('#landing, #aboutus, #markets, #contact');
  const navLinks    = document.querySelectorAll('.nav-links a[data-section]');
  const mobileLinks = document.querySelectorAll('.mobile-menu a[data-section]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.dataset.section === id) link.classList.add('active');
        });
        mobileLinks.forEach(link => {
          link.classList.remove('active');
          if (link.dataset.section === id) link.classList.add('active');
        });
      }
    });
  }, { threshold: 0.2, rootMargin: '-60px 0px 0px 0px' });

  sections.forEach(section => observer.observe(section));
})();

/* ── Trending products ── */
const trendingProducts = [
  { name: 'Renewable Energy Equipment', change: '+23%', category: 'Energy',           details: ['Solar Panels', 'Wind Turbines', 'Hydropower'] },
  { name: 'Medical Supplies',           change: '+18%', category: 'Healthcare',        details: ['Masks', 'Gloves', 'Ventilators'] },
  { name: 'Electronic Components',      change: '+15%', category: 'Electronics',       details: ['Microchips', 'Sensors', 'Circuit Boards'] },
  { name: 'Organic Foods',              change: '+12%', category: 'Food & Beverages',  details: ['Organic Veg', 'Plant-Based Products', 'Health Snacks'] },
  { name: 'Smart Textiles',             change: '+10%', category: 'Textiles',          details: ['Wearables', 'Smart Fabrics'] },
];

const trendingContainer = document.getElementById('trending');

trendingProducts.forEach(product => {
  const item = document.createElement('div');
  item.className = 'trend-item';

  const main = document.createElement('div');
  main.className = 'trend-main';
  main.innerHTML = `
    <div>
      <div class="trend-name">${product.name}</div>
      <div class="trend-category">${product.category}</div>
    </div>
    <div class="trend-growth">${product.change} <i data-lucide="trending-up"></i></div>
  `;

  const dropdown = document.createElement('div');
  dropdown.className = 'trend-dropdown';
  dropdown.style.display = 'none';
  dropdown.innerHTML = `<ul>${product.details.map(i => `<li>${i}</li>`).join('')}</ul>`;

  main.addEventListener('click', () => {
    const isOpen = dropdown.style.display === 'block';
    dropdown.style.display = isOpen ? 'none' : 'block';
    main.setAttribute('aria-expanded', !isOpen);
  });

  item.appendChild(main);
  item.appendChild(dropdown);
  trendingContainer.appendChild(item);
});

lucide.createIcons();

/* ── Masha AI knowledge base ── */
const mashaKB = [
  {
    patterns: ['how does', 'what is trade grid', 'tell me about', 'what do you do', 'work'],
    response: `Trade Grid is a smart B2B trade matching platform. 🌐\n\nWe help importers and exporters worldwide find verified trading partners using AI-powered matching. Just create a profile, set your trade preferences, and start discovering matches!`
  },
  {
    patterns: ['verify', 'verification', 'document', 'license', 'certificate'],
    response: `Business verification on Trade Grid involves three steps:\n\n1. 📄 Upload your business registration documents\n2. 🔐 Submit identity verification\n3. ✅ Our team reviews within 48 hours\n\nOnce verified, you'll get a verified badge that builds trust with trading partners.`
  },
  {
    patterns: ['market', 'region', 'country', 'south africa', 'johannesburg'],
    response: `We currently cover markets including:\n\n📍 South Africa — Finance, Mining, Tech\n📍 Netherlands — Tourism, Fintech\n📍 India — Trade & Logistics\n📍 Germany — Automotive, Exports\n\nWith 150+ countries in our global network!`
  },
  {
    patterns: ['partner', 'find', 'match', 'connect', 'trading'],
    response: `Finding trading partners is easy on Trade Grid! 🤝\n\n• Use our **Discover** page to browse matches\n• Our AI suggests partners based on your industry and region\n• Swipe, match, and start trading conversations\n\nWant to get started? Click "Get Started" in the top menu.`
  },
  {
    patterns: ['price', 'cost', 'fee', 'subscription', 'plan', 'free'],
    response: `Trade Grid offers flexible plans:\n\n🆓 **Starter** — Free, basic matching\n⭐ **Professional** — R499/mo, unlimited matches + analytics\n🏢 **Enterprise** — Custom pricing for large businesses\n\nContact our sales team at sales@tradegrid.com for more details.`
  },
  {
    patterns: ['contact', 'support', 'help', 'email', 'phone', 'reach'],
    response: `You can reach our support team at:\n\n📧 support@tradegrid.com\n📞 +27 (83) 720-4520\n🕐 Mon-Fri 9am–6pm SAST\n\nOr scroll down to our **Contact Us** section!`
  },
  {
    patterns: ['sign up', 'register', 'account', 'create', 'join', 'get started'],
    response: `Getting started is simple! 🚀\n\n1. Click **"Get Started"** in the navigation\n2. Complete your business profile\n3. Upload verification documents\n4. Start discovering trading partners!\n\nThe whole process takes less than 10 minutes.`
  },
  {
    patterns: ['import', 'export', 'trade', 'goods', 'products'],
    response: `Trade Grid supports both importers and exporters across all major product categories:\n\n📦 Agricultural products\n⚡ Energy & renewables\n🏭 Manufacturing goods\n💊 Healthcare & medical\n📱 Electronics & tech\n\nWhat industry are you in? I can give more specific info!`
  },
  {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'howzit'],
    response: `Hello! 👋 I'm Masha, your Trade Grid AI assistant.\n\nI can help you with:\n• Understanding how Trade Grid works\n• Business verification process\n• Finding trading partners\n• Market information\n\nWhat would you like to know?`
  },
  {
    patterns: ['about', 'founders', 'team', 'who made', 'who built'],
    response: `Trade Grid was founded by a passionate team of six:\n\n👩‍💼 Tashlyn Mitchell — Project Leader\n💻 TJP Mabotja — Back-end Developer\n🎨 Valery Mutetwa — Front-end Developer\n🗄️ Siyanda Xaba — Database Manager\n🎨 Khethukhanyo Mbekeni — Front-end Developer\n💻 Sifiso Sibanyoni — Back-end Developer\n\nScroll to the About Us section to meet the team!`
  },
];

const mashaFallback = `I'm not sure about that yet, but I'm learning! 🤖\n\nFor specific queries, please contact our support team at support@tradegrid.com or call +27 (83) 720-4520.\n\nIs there anything else I can help you with?`;

function mashaGetResponse(input) {
  const lower = input.toLowerCase();
  for (const entry of mashaKB) {
    if (entry.patterns.some(p => lower.includes(p))) return entry.response;
  }
  return mashaFallback;
}

/* ── Masha DOM refs ── */
const mashaFab        = document.getElementById('mashaFab');
const mashaWin        = document.getElementById('mashaWindow');
const mashaMessages   = document.getElementById('mashaMessages');
const mashaInput      = document.getElementById('mashaInput');
const mashaSend       = document.getElementById('mashaSend');
const mashaClear      = document.getElementById('mashaClear');
const mashaMinimize   = document.getElementById('mashaMinimize');
const mashaChipBtns   = document.querySelectorAll('.masha-chip');
const mashaChipsBar   = document.getElementById('mashaChips');
const mashaFooterLink = document.getElementById('mashaFooterLink');
let mashaOpen = false;

function mashaToggle(forceOpen) {
  mashaOpen = forceOpen !== undefined ? forceOpen : !mashaOpen;
  mashaWin.classList.toggle('open', mashaOpen);
  mashaFab.classList.toggle('open', mashaOpen);
  if (mashaOpen) {
    const dot = mashaFab.querySelector('.fab-dot');
    if (dot) dot.style.display = 'none';
    setTimeout(() => mashaInput.focus(), 300);
  }
}

mashaFab.addEventListener('click', () => mashaToggle());
mashaMinimize.addEventListener('click', () => mashaToggle(false));

if (mashaFooterLink) {
  mashaFooterLink.addEventListener('click', (e) => {
    e.preventDefault();
    mashaToggle(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });
}

function mashaAddMessage(text, sender) {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const row = document.createElement('div');
  row.className = `msg-row ${sender}`;

  const avatar = document.createElement('div');
  avatar.className = 'msg-bubble-avatar';
  avatar.innerHTML = sender === 'bot'
    ? '<i class="ri-robot-2-line"></i>'
    : '<i class="ri-user-3-line"></i>';

  const wrap = document.createElement('div');
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
  const time = document.createElement('div');
  time.className = 'msg-time';
  time.textContent = now;
  wrap.appendChild(bubble);
  wrap.appendChild(time);
  if (sender === 'bot') { row.appendChild(avatar); row.appendChild(wrap); }
  else { row.appendChild(wrap); row.appendChild(avatar); }
  mashaMessages.appendChild(row);
  mashaMessages.scrollTop = mashaMessages.scrollHeight;
}

function mashaShowTyping() {
  const row = document.createElement('div');
  row.className = 'msg-row bot';
  row.id = 'mashaTypingRow';

  const avatar = document.createElement('div');
  avatar.className = 'msg-bubble-avatar';
  avatar.innerHTML = '<i class="ri-robot-2-line"></i>';

  const indicator = document.createElement('div');
  indicator.className = 'masha-typing';
  indicator.innerHTML = '<div class="masha-typing-dot"></div><div class="masha-typing-dot"></div><div class="masha-typing-dot"></div>';
  row.appendChild(avatar);
  row.appendChild(indicator);
  mashaMessages.appendChild(row);
  mashaMessages.scrollTop = mashaMessages.scrollHeight;
}

function mashaHideTyping() {
  const row = document.getElementById('mashaTypingRow');
  if (row) row.remove();
}

function mashaSendMessage(text) {
  const msg = (text || mashaInput.value).trim();
  if (!msg) return;
  mashaAddMessage(msg, 'user');
  mashaInput.value = '';
  mashaInput.style.height = 'auto';
  mashaSend.disabled = true;
  mashaChipsBar.style.display = 'none';
  mashaShowTyping();
  setTimeout(() => {
    mashaHideTyping();
    mashaAddMessage(mashaGetResponse(msg), 'bot');
    mashaSend.disabled = false;
    mashaInput.focus();
  }, 900 + Math.random() * 600);
}

mashaSend.addEventListener('click', () => mashaSendMessage());
mashaInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); mashaSendMessage(); }
});
mashaInput.addEventListener('input', () => {
  mashaInput.style.height = 'auto';
  mashaInput.style.height = Math.min(mashaInput.scrollHeight, 100) + 'px';
  mashaSend.disabled = mashaInput.value.trim() === '';
});

mashaChipBtns.forEach(chip => {
  chip.addEventListener('click', () => mashaSendMessage(chip.dataset.msg));
});

mashaClear.addEventListener('click', () => {
  mashaMessages.innerHTML = '';
  mashaChipsBar.style.display = 'flex';
  mashaGreeting();
});

function mashaGreeting() {
  setTimeout(() => {
    mashaAddMessage(`Hi there! 👋 I'm **Masha**, your Trade Grid AI assistant.\n\nI can help you with verification, finding trading partners, markets, and more. What would you like to know?`, 'bot');
  }, 400);
}

mashaSend.disabled = true;
mashaGreeting();