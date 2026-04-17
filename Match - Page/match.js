const companies = [
  {
    name: "ABC Corp",
    type: "Exporter",
    description: "Exports high-quality tech and financial solutions globally.",
    industries: ["Tech", "Finance"],
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    founded: 2005,
    country: "Netherlands"
  },
  {
    name: "XYZ Ltd",
    type: "Importer",
    description: "Specializes in importing agricultural goods and logistics services.",
    industries: ["Agriculture", "Logistics"],
    img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80",
    founded: 1856,
    country: "India"
  },
  {
    name: "123 Traders",
    type: "Exporter",
    description: "Leading exporter in mining materials and transport logistics.",
    industries: ["Mining", "Logistics"],
    img: "https://images.unsplash.com/photo-1581090700227-52f23e3d18a6?auto=format&fit=crop&w=400&q=80",
    founded: 2010,
    country: "Germany"
  },
  {
    name: "Global Foods",
    type: "Importer",
    description: "Leading exporter in mining materials and transport logistics.",
    industries: ["Food & Beverages"],
    img: "https://images.unsplash.com/photo-1604908177522-43adba3dc8c1?auto=format&fit=crop&w=400&q=80",
    founded: 1990,
    country: "Australia"
  },
  {
    name: "Tech Solutions",
    type: "Exporter",
    description: "Provides cutting-edge software and AI solutions globally.",
    industries: ["Software", "AI"],
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    founded: 1880,
    country: "Denmark"
  },
  {
    name: "Oceanic Shipping",
    type: "Importer",
    description: "Provides cutting-edge software and AI solutions globally.",
    industries: ["Shipping", "Logistics"],
    img: "https://images.unsplash.com/photo-1555980886-499c6ee01a7f?auto=format&fit=crop&w=400&q=80",
    founded: 1990,
    country: "USA"
  },
  {
    name: "AgriGrowth",
    type: "Exporter",
    description: "Handles global shipping and import logistics operations.",
    industries: ["Farming", "Agri-Tech"],
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
    founded: 2005,
    country: "New Zealand"
  },
  {
    name: "FinEdge",
    type: "Importer",
    description: "Focuses on fintech solutions and financial imports.",
    industries: ["Finance", "Fintech"],
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80",
    founded: 1996,
    country: "USA"
  },
  {
    name: "Renew Energy Co",
    type: "Exporter",
    description: "Focuses on fintech solutions and financial imports.",
    industries: ["Renewable Energy"],
    img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80",
    founded: 1975,
    country: "Denmark"
  },
  {
    name: "Smart Textiles Ltd",
    type: "Importer",
    description: "Exports renewable energy solutions and technologies.",
    industries: ["Textiles", "Innovation"],
    img: "https://images.unsplash.com/photo-1593005512131-7ed0447b0a3a?auto=format&fit=crop&w=400&q=80",
    founded: 2000,
    country: "India"
  }
];

let currentIndex = 0;
const companyMeta = document.getElementById("companyMeta");
const companyDescription = document.getElementById("companyDescription");
const card = document.getElementById("currentCard");
const remaining = document.getElementById("remaining");
const companyImg = document.getElementById("companyImg");
const companyName = document.getElementById("companyName");
const companyType = document.getElementById("companyType");
const companyIndustries = document.getElementById("companyIndustries");

function updateCard() {

  
  const company = companies[currentIndex];
  if (!company) {
    card.innerHTML = "<p>No more companies</p>";
    remaining.innerText = "";
    return;
  }

  // Reset animation
  card.style.transform = "translateX(0) rotate(0deg)";
  card.style.opacity = "1";

  // Populate card
  companyDescription.innerText = company.description;
  companyImg.src = company.img;
  companyName.innerText = company.name;
  companyType.innerText = company.type;

  document.getElementById("companyMeta").innerHTML = `
  <span><i class="fa-solid fa-calendar"></i> Founded: ${company.founded}</span><br>
  <span><i class="fa-solid fa-globe"></i> Country: ${company.country}</span>
`;

  // Clear and add industry tags
  companyIndustries.innerHTML = "";
  company.industries.forEach(ind => {
    const span = document.createElement("span");
    span.innerText = ind;
    companyIndustries.appendChild(span);
  });

  remaining.innerText = `${companies.length - currentIndex} companies remaining`;
}
function showToast(message, color) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.background = color;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000); // disappears after 2s
}

// Animate swipe

function swipe(direction) {
  const angle = direction === 'left' ? -20 : 20;
  const xMove = direction === 'left' ? -400 : 400;

  card.style.transform = `translateX(${xMove}px) rotate(${angle}deg)`;
  card.style.opacity = "0";

  setTimeout(() => {
    if (direction === 'right') {
      showToast("Good match!", "#34d399"); 
    } else if (direction === 'left') {
      showToast("Not a match", "#f87171"); 
    }
    currentIndex++;
    updateCard();
  }, 300);
}


// Event listeners
document.getElementById("swipeLeft").addEventListener("click", () => swipe('left'));
document.getElementById("swipeRight").addEventListener("click", () => swipe('right'));

// Initialize first card
updateCard();