const categories = [
  {
    id: "desk",
    title: "WFH desk setup",
    tag: "Start here",
    image: "./assets/desk-organizer.jpg",
    score: 40,
    query: "modular desk organizer home office",
    oneLiner: "Messy desk to premium productivity setup. Best angle: minimalist WFH upgrade.",
    demand: "desk setup videos",
    upgrade: "matte finish + modular tray",
    firstAction: "Check Amazon complaints",
    credit: "Wikimedia Commons: Gather, the minimal modular organizer",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Gather,_The_minimal,_modular_organizer._(Unsplash).jpg"
  },
  {
    id: "pet",
    title: "Pet cleaning",
    tag: "Visual demo",
    image: "./assets/pet-hair.jpg",
    score: 38,
    query: "pet hair remover roller couch car",
    oneLiner: "Obvious pain, obvious demo. Best angle: one-swipe couch and car-seat cleanup.",
    demand: "pet owner pain",
    upgrade: "stronger handle + travel mini",
    firstAction: "Mine 1-star reviews",
    credit: "Wikimedia Commons: Pet mitt 1",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Pet_mitt_1.jpeg"
  },
  {
    id: "fashion",
    title: "Fashion accessories",
    tag: "TikTok rank",
    image: "./assets/necklace.jpg",
    score: 36,
    query: "stainless steel pendant necklace women fashion accessories",
    oneLiner: "Necklaces and small adornments can be high-margin, giftable and very light. Win through taste, materials and packaging.",
    demand: "Necklaces high in your TikTok screenshot",
    upgrade: "steel + gift box + no-IP design",
    firstAction: "Check material claims",
    credit: "Wikimedia Commons: Necklace",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Necklace_(51368828006).jpg"
  },
  {
    id: "travel",
    title: "Travel organization",
    tag: "Low risk",
    image: "./assets/travel-packing.jpg",
    score: 37,
    query: "compression packing cubes travel organizer",
    oneLiner: "Carry-on chaos is easy to show. Best angle: business-trip packing system.",
    demand: "packing / onebag content",
    upgrade: "premium zipper + size system",
    firstAction: "Compare 1688 landed cost",
    credit: "Wikimedia Commons: Holiday Packing List",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Holiday_Packing_List_-_Packing_Luggage_for_Vacation.jpg"
  },
  {
    id: "car",
    title: "Car interior",
    tag: "Strong use case",
    image: "./assets/car-detailing.jpg",
    score: 39,
    query: "car interior detailing brush microfiber kit",
    oneLiner: "Dusty vents, screens and seat gaps make clean before/after content.",
    demand: "commuter + car care",
    upgrade: "no-chemical premium kit",
    firstAction: "Check TikTok demos",
    credit: "Wikimedia Commons: Cleaning interior",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Cleaning_interior.jpg"
  },
  {
    id: "storage",
    title: "Home storage",
    tag: "Bundleable",
    image: "./assets/home-storage.jpg",
    score: 38,
    query: "drawer divider closet organizer kit",
    oneLiner: "Small home mess sells when the reset is satisfying and the colors look premium.",
    demand: "home reset content",
    upgrade: "neutral colors + stronger material",
    firstAction: "Find exact complaint pattern",
    credit: "Wikimedia Commons: Picture of a full closet",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Picture_of_a_full_closet.jpg"
  },
  {
    id: "recovery",
    title: "Fitness recovery",
    tag: "No claims",
    image: "./assets/fitness-recovery.jpg",
    score: 37,
    query: "massage ball stretching strap resistance band set",
    oneLiner: "Compact recovery tools work if framed as comfort/routine, not medical treatment.",
    demand: "desk-break routines",
    upgrade: "routine cards + travel pouch",
    firstAction: "Rewrite claims safely",
    credit: "Wikimedia Commons: Resistance tube",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Resistance_tube.jpg"
  },
  {
    id: "cables",
    title: "Cable management",
    tag: "Creator setup",
    image: "./assets/desk-setup.jpg",
    score: 38,
    query: "under desk cable management kit cable clips",
    oneLiner: "Cable mess has instant before/after value and pairs well with creator desks.",
    demand: "desk cleanup content",
    upgrade: "tray + clips + labels kit",
    firstAction: "Build bundle BOM",
    credit: "Wikimedia Commons: Workspace Setup",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Workspace_Setup.jpg"
  },
  {
    id: "ergonomic",
    title: "Ergonomic desk gadgets",
    tag: "Niche wedge",
    image: "./assets/desk-setup.jpg",
    score: 35,
    query: "left handed vertical mouse ergonomic laptop stand",
    oneLiner: "Specific office pains beat generic gadgets. Best angle: underserved desk setups.",
    demand: "remote work audience",
    upgrade: "lefty-specific + quiet office",
    firstAction: "Validate niche size",
    credit: "Wikimedia Commons: Workspace Setup",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Workspace_Setup.jpg"
  }
];

const filters = [
  { id: "all", label: "All" },
  { id: "desk", label: "Desk" },
  { id: "fashion", label: "Fashion" },
  { id: "pet", label: "Pet" },
  { id: "travel", label: "Travel" },
  { id: "car", label: "Car" },
  { id: "storage", label: "Storage" },
  { id: "recovery", label: "Recovery" }
];

let activeFilter = "all";

const grid = document.querySelector("#categoryGrid");
const filtersEl = document.querySelector("#filters");
const searchInput = document.querySelector("#searchInput");
const creditList = document.querySelector("#creditList");

function sourceLinks(query) {
  const encoded = encodeURIComponent(query);
  const aliPath = query.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return [
    ["AliExpress", `https://www.aliexpress.us/w/wholesale-${aliPath}.html`, true],
    ["1688", `https://s.1688.com/selloffer/offer_search.htm?keywords=${encoded}`, false],
    ["Amazon", `https://www.amazon.com/s?k=${encoded}`, false],
    ["Movers", "https://www.amazon.com/gp/movers-and-shakers", false],
    ["TikTok", "https://ads.tiktok.com/business/creativecenter/top-products/pc/en", false],
    ["Trends", `https://trends.google.com/trends/explore?geo=US&q=${encoded}`, false]
  ];
}

function renderFilters() {
  filtersEl.innerHTML = filters
    .map((filter) => `<button class="filter-btn${filter.id === activeFilter ? " active" : ""}" data-filter="${filter.id}" type="button">${filter.label}</button>`)
    .join("");
}

function renderCards() {
  const term = searchInput.value.trim().toLowerCase();
  const visible = categories.filter((category) => {
    const matchesFilter = activeFilter === "all" || category.id === activeFilter || category.title.toLowerCase().includes(activeFilter);
    const searchable = `${category.title} ${category.query} ${category.oneLiner} ${category.upgrade}`.toLowerCase();
    return matchesFilter && (!term || searchable.includes(term));
  });

  if (!visible.length) {
    grid.innerHTML = `<div class="empty-state">No match. Try “desk”, “pet”, “travel”, “car”, “storage”, or “cable”.</div>`;
    return;
  }

  grid.innerHTML = visible
    .map((category) => {
      const links = sourceLinks(category.query)
        .map(([label, href, primary]) => `<a class="source-link${primary ? " primary" : ""}" href="${href}" target="_blank" rel="noreferrer">${label}</a>`)
        .join("");

      return `
        <article class="category-card">
          <div class="category-image">
            <img src="${category.image}" alt="${category.title}" loading="lazy" />
            <span class="score-pill">${category.score}/40</span>
          </div>
          <div class="category-body">
            <div class="category-topline">
              <h2>${category.title}</h2>
              <span class="category-tag">${category.tag}</span>
            </div>
            <p class="one-liner">${category.oneLiner}</p>
            <div class="mini-grid">
              <div class="mini"><small>Demand</small><strong>${category.demand}</strong></div>
              <div class="mini"><small>Upgrade</small><strong>${category.upgrade}</strong></div>
              <div class="mini"><small>Next</small><strong>${category.firstAction}</strong></div>
            </div>
            <div class="source-links">${links}</div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderCredits() {
  const seen = new Set();
  creditList.innerHTML = categories
    .filter((category) => {
      if (seen.has(category.creditUrl)) return false;
      seen.add(category.creditUrl);
      return true;
    })
    .map((category) => `<a href="${category.creditUrl}" target="_blank" rel="noreferrer">${category.credit}</a>`)
    .join("");
}

filtersEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  renderFilters();
  renderCards();
});

searchInput.addEventListener("input", renderCards);

renderFilters();
renderCards();
renderCredits();
