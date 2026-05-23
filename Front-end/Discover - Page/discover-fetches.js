const API_BASE_URL = "http://localhost:5000/discover";

const companiesGrid = document.querySelector(".companies-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

const FILTER_MAP = {
  "All Markets": {},
  Exporters: {
    business_type: "EXPORTER"
  },
  Importers: {
    business_type: "IMPORTER"
  },
  Agriculture: {
    industry: "Agriculture"
  },
  Tech: {
    industry: "Tech"
  },
  Healthcare: {
    industry: "Healthcare"
  }
};

async function fetchCompanies(filters = {}) {
  try {
    const params = new URLSearchParams(filters);

    const response = await fetch(
      `${API_BASE_URL}?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch companies");
    }

    renderCompanies(data.companies || []);
  } catch (error) {
    console.error("Fetch error:", error);

    companiesGrid.innerHTML = `
      <div class="no-results">
        Failed to load companies
      </div>
    `;
  }
}

function renderCompanies(companies) {
  if (!companies.length) {
    companiesGrid.innerHTML = `
      <div class="no-results">
        No companies found
      </div>
    `;
    return;
  }

  companiesGrid.innerHTML = companies
    .map((company) => {
      const tags = [
        ...(company.supplied_products || []).slice(0, 2),
        ...(company.target_regions || []).slice(0, 2)
      ];

      return `
        <div class="company-card">

          <div class="card-banner card-banner-1">
            <div class="verified-badge">
              <i class="ri-shield-check-fill"></i>
              VERIFIED
            </div>
          </div>

          <div class="card-avatar">
            ${getInitials(company.company_name)}
          </div>

          <div class="card-body">

            <div class="card-header-row">
              <div>
                <div class="card-company-name">
                  ${company.company_name}
                </div>

                <div class="card-location">
                  <i class="ri-map-pin-2-line"></i>
                  ${company.location?.country || "Unknown"}
                </div>
              </div>

              <div class="card-type-badge">
                ${company.business_type}
              </div>
            </div>

            <p class="card-description">
              ${
                company.company_description ||
                "No company description available."
              }
            </p>

            <div class="card-tags">
              ${tags
                .map(
                  (tag) => `
                    <span class="card-tag">${tag}</span>
                  `
                )
                .join("")}
            </div>

            <div class="card-stats">

              <div class="card-stat">
                <span class="stat-num">
                  ${company.year_established || "-"}
                </span>

                <span class="stat-lbl">
                  Established
                </span>
              </div>

              <div class="card-stat">
                <span class="stat-num">
                  ${company.number_of_employees || "-"}
                </span>

                <span class="stat-lbl">
                  Employees
                </span>
              </div>

            </div>

            <div class="card-actions">
              <button class="btn-connect-locked">
                <i class="ri-user-add-line"></i>
                View Company
              </button>
            </div>

          </div>

        </div>
      `;
    })
    .join("");
}

function getInitials(name) {
  return String(name)
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    const buttonText = button.textContent.trim();

    const filters = FILTER_MAP[buttonText] || {};

    fetchCompanies(filters);
  });
});

fetchCompanies();