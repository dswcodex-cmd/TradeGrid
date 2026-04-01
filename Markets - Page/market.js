const marketData = [
  {
    region: 'North America',
    growth: '+12.5%',
    topIndustries: ['Electronics', 'Automotive', 'Food & Beverages'],
    volume: '$850B',
  },
  {
    region: 'Europe',
    growth: '+8.3%',
    topIndustries: ['Manufacturing', 'Textiles', 'Renewable Energy'],
    volume: '$720B',
  },
  {
    region: 'Asia',
    growth: '+15.7%',
    topIndustries: ['Electronics', 'Textiles', 'Manufacturing'],
    volume: '$1.2T',
  },
  {
    region: 'Middle East',
    growth: '+6.2%',
    topIndustries: ['Mining & Resources', 'Food & Beverages', 'Healthcare'],
    volume: '$450B',
  },
  {
    region: 'Africa',
    growth: '+9.4%',
    topIndustries: ['Mining & Resources', 'Food & Beverages', 'Textiles'],
    volume: '$380B',
  },
  {
    region: 'South America',
    growth: '+7.1%',
    topIndustries: ['Food & Beverages', 'Mining & Resources', 'Forestry'],
    volume: '$520B',
  },
];

const trendingProducts = [
  {
    name: 'Renewable Energy Equipment',
    change: '+23%',
    category: 'Energy',
    details: ['Solar Panels', 'Wind Turbines', 'Hydropower']
  },
  {
    name: 'Medical Supplies',
    change: '+18%',
    category: 'Healthcare',
    details: ['Masks', 'Gloves', 'Ventilators']
  },
  {
    name: 'Electronic Components',
    change: '+15%',
    category: 'Electronics',
    details: ['Microchips', 'Sensors', 'Circuit Boards']
  },
  {
    name: 'Organic Foods',
    change: '+12%',
    category: 'Food & Beverages',
    details: ['Organic Veg', 'Plant-Based Products', 'Health Snacks']
  },
  {
    name: 'Smart Textiles',
    change: '+10%',
    category: 'Textiles',
    details: ['Wearables', 'Smart Fabrics']
  },
];

// MARKETS
const trendingContainer = document.getElementById("trending");

trendingProducts.forEach(product => {
  const item = document.createElement("div");
  item.className = "trend-item";

  // Main clickable area
  const main = document.createElement("div");
  main.className = "trend-main";
  main.innerHTML = `
      <div>
        <div class="trend-name">${product.name}</div>
        <div class="trend-category">${product.category}</div>
      </div>
      <div class="trend-growth">${product.change} <i data-lucide="trending-up"></i></div>
  `;

  // Dropdown
  // Dropdown
const dropdown = document.createElement("div");
dropdown.className = "trend-dropdown";
dropdown.style.display = "none";
dropdown.innerHTML = `<ul>${product.details.map(i => `<li>${i}</li>`).join('')}</ul>`;


  // Toggle dropdown on click
  main.addEventListener("click", () => {
  const isOpen = dropdown.style.display === "block";
  dropdown.style.display = isOpen ? "none" : "block";
  main.setAttribute("aria-expanded", !isOpen);
});


  item.appendChild(main);
  item.appendChild(dropdown);
  trendingContainer.appendChild(item);
});

// Activate icons
lucide.createIcons();