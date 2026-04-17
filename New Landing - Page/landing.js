/*
* SCROLL-SPY: Watches which section is in view and highlights
* the correct nav link automatically.
*
* How it works:
* - IntersectionObserver fires whenever a section enters/leaves
*   the viewport (at the 20% threshold).
* - We track all observed sections; when one becomes visible we
*   remove .active from all nav links and add it only to the one
*   whose data-section matches the visible section's id.
*/

(function () {
    const sections = document.querySelectorAll('#landing, #aboutus, #markets, #contact');
    const navLinks = document.querySelectorAll('.nav-links a[data-section]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.section === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.2,       // section must be 20% visible to trigger
        rootMargin: '-60px 0px 0px 0px'  // offset for the fixed nav height
    });

    sections.forEach(section => observer.observe(section));
});

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