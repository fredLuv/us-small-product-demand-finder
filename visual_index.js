const categories = [
  {
    id: "desk",
    title: "WFH desk setup",
    tag: "Start here",
    image: "./assets/desk-organizer.jpg",
    score: 40,
    query: "modular desk organizer home office",
    trendsQuery: "desk organizer,home office,desk setup",
    amazonRising: "https://www.amazon.com/gp/movers-and-shakers/home-garden/",
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
    trendsQuery: "pet hair remover,pet grooming,pet supplies",
    amazonRising: "https://www.amazon.com/gp/movers-and-shakers/pet-supplies/",
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
    trendsQuery: "necklace,women necklace,jewelry",
    amazonRising: "https://www.amazon.com/gp/movers-and-shakers/fashion/",
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
    trendsQuery: "packing cubes,travel organizer,carry on luggage",
    amazonRising: "https://www.amazon.com/gp/movers-and-shakers/fashion/",
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
    trendsQuery: "car detailing,car organizer,car accessories",
    amazonRising: "https://www.amazon.com/gp/movers-and-shakers/automotive/",
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
    trendsQuery: "drawer organizer,closet organizer,home organization",
    amazonRising: "https://www.amazon.com/gp/movers-and-shakers/home-garden/",
    oneLiner: "Small home mess sells when the reset is satisfying and the colors look premium.",
    demand: "home reset content",
    upgrade: "neutral colors + stronger material",
    firstAction: "Find exact complaint",
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
    trendsQuery: "massage ball,resistance bands,stretching strap",
    amazonRising: "https://www.amazon.com/gp/movers-and-shakers/sporting-goods/",
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
    trendsQuery: "cable management,desk setup,cord organizer",
    amazonRising: "https://www.amazon.com/gp/movers-and-shakers/office-products/",
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
    trendsQuery: "ergonomic mouse,laptop stand,desk ergonomics",
    amazonRising: "https://www.amazon.com/gp/movers-and-shakers/electronics/",
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

const paymentUrls = {
  stripe: "https://docs.stripe.com/payments/payment-methods/overview",
  shopify: "https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries",
  paypal: "https://www.paypal.com/us/business/accept-payments/checkout",
  adyen: "https://www.adyen.com/payment-methods",
  dlocal: "https://www.dlocal.com/payment-methods/",
  ebanx: "https://business.ebanx.com/en/payment-methods",
  mercado: "https://www.mercadopago.com/developers/en/docs",
  conekta: "https://developers.conekta.com/docs/payment-methods",
  payu: "https://docs.payulatam.com/docs/integration-overview",
  revolutPayments: "https://www.revolut.com/business/accept-payments/",
  revolutAccounts: "https://www.revolut.com/business/multi-currency-accounts/",
  revolutEligibility: "https://help.revolut.com/help/merchant-accounts/setting-up-a-merchant-account/who-can-apply-for-a-merchant-account/business/",
  airwallex: "https://www.airwallex.com/us/business-account/global-accounts",
  payoneer: "https://www.payoneer.com/solutions/marketplace-payments/",
  worldfirst: "https://www.worldfirst.com/global/solution/marketplaces/",
  pingpong: "https://www.international.pingpongx.com/solutions/marketplace-platforms",
  lianlian: "https://www.lianlianglobal.com/",
  wise: "https://wise.com/us/business/",
  euVat: "https://taxation-customs.ec.europa.eu/vat-e-commerce_en",
  euGpsr: "https://commission.europa.eu/business-economy-euro/product-safety-and-requirements/product-safety/general-product-safety-regulation_en",
  mexicoGuide: "https://www.trade.gov/country-commercial-guides/mexico-ecommerce",
  chileGuide: "https://www.trade.gov/country-commercial-guides/chile-ecommerce",
  brazilGuide: "https://www.trade.gov/country-commercial-guides/brazil-ecommerce",
  argentinaGuide: "https://www.trade.gov/country-commercial-guides/argentina-ecommerce"
};

const paymentDocs = [
  ["Markdown matrix", "./cross_border_ecommerce_payment_matrix.md", true],
  ["Excel workbook", "./cross_border_ecommerce_payment_matrix.xlsx", false]
];

const paymentMarkets = [
  {
    country: "Mexico",
    priority: 88,
    label: "Spanish first",
    methods: "Cards, OXXO, SPEI, Mercado Pago, BNPL",
    stack: "Mercado Pago or dLocal/EBANX + cards + OXXO/SPEI",
    risk: "Voucher delays, refunds, import/tax clarity.",
    action: "Build Spanish landing page and test OXXO/SPEI.",
    links: [["dLocal", paymentUrls.dlocal], ["EBANX", paymentUrls.ebanx], ["Mercado Pago", paymentUrls.mercado], ["Conekta", paymentUrls.conekta], ["Trade.gov", paymentUrls.mexicoGuide]]
  },
  {
    country: "Chile",
    priority: 84,
    label: "Low-complexity Spanish",
    methods: "Cards/debit, Webpay, Mercado Pago, bank transfer",
    stack: "Cards/Webpay + Mercado Pago + local transfer",
    risk: "Smaller market, cross-border tax expectations.",
    action: "Use as Spanish test after Mexico.",
    links: [["Mercado Pago", paymentUrls.mercado], ["dLocal", paymentUrls.dlocal], ["EBANX", paymentUrls.ebanx], ["Trade.gov", paymentUrls.chileGuide]]
  },
  {
    country: "Brazil",
    priority: 86,
    label: "LatAm scale",
    methods: "Pix, cards/installments, Boleto, Mercado Pago",
    stack: "Pix + cards/installments + Boleto",
    risk: "Portuguese, CPF, import tax, fraud, logistics.",
    action: "Do not fold into Spanish plan; model separately.",
    links: [["EBANX", paymentUrls.ebanx], ["dLocal", paymentUrls.dlocal], ["Mercado Pago", paymentUrls.mercado], ["Trade.gov", paymentUrls.brazilGuide]]
  },
  {
    country: "Spain / EU",
    priority: 78,
    label: "Spanish + compliance",
    methods: "Cards, PayPal, Apple/Google Pay, Revolut Pay, Bizum, SEPA, Klarna",
    stack: "Stripe/Shopify + PayPal + Bizum/SEPA/Klarna; Revolut as EU add-on",
    risk: "VAT/IOSS, GPSR, returns, Spanish support.",
    action: "Check EU compliance before paid ads.",
    links: [["Stripe", paymentUrls.stripe], ["Shopify", paymentUrls.shopify], ["Revolut", paymentUrls.revolutPayments], ["EU VAT", paymentUrls.euVat], ["EU GPSR", paymentUrls.euGpsr]]
  },
  {
    country: "United Kingdom",
    priority: 80,
    label: "English expansion",
    methods: "Cards, PayPal, Apple/Google Pay, Revolut Pay, Klarna/Clearpay",
    stack: "Stripe/Shopify + PayPal + BNPL; Revolut for FX/merchant add-on",
    risk: "VAT, product safety, returns.",
    action: "Evaluate Revolut Business if UK entity matters.",
    links: [["Stripe", paymentUrls.stripe], ["Shopify", paymentUrls.shopify], ["PayPal", paymentUrls.paypal], ["Revolut", paymentUrls.revolutPayments], ["Eligibility", paymentUrls.revolutEligibility]]
  },
  {
    country: "Argentina",
    priority: 62,
    label: "Do not hard-launch first",
    methods: "Mercado Pago, cards/cuotas, bank transfer, Rapipago, Pago Facil",
    stack: "Mercado Pago first; preferably marketplace/local partner",
    risk: "FX, inflation, import restrictions, frequent repricing.",
    action: "Use Mercado Pago or marketplace before standalone DTC.",
    links: [["Mercado Pago", paymentUrls.mercado], ["dLocal", paymentUrls.dlocal], ["EBANX", paymentUrls.ebanx], ["Trade.gov", paymentUrls.argentinaGuide]]
  },
  {
    country: "Seller accounts",
    priority: 75,
    label: "Cash-flow safety",
    methods: "Marketplace payouts, multi-currency accounts, FX, supplier payments",
    stack: "Airwallex/Revolut + Payoneer/WorldFirst/PingPong backup",
    risk: "KYC, account review, FX spread, platform document mismatch.",
    action: "Run at least one backup collection account before scaling.",
    links: [["Airwallex", paymentUrls.airwallex], ["Revolut", paymentUrls.revolutAccounts], ["Payoneer", paymentUrls.payoneer], ["WorldFirst", paymentUrls.worldfirst], ["PingPong", paymentUrls.pingpong], ["Wise", paymentUrls.wise]]
  }
];

const paymentProviders = [
  ["Stripe / Shopify", "Default DTC checkout for US, UK, EU, AU and supported countries.", paymentUrls.stripe],
  ["dLocal / EBANX", "LatAm local rails such as OXXO, SPEI, Pix, PSE, Boleto.", paymentUrls.dlocal],
  ["Mercado Pago", "Local trust, wallet, installments and Mercado Libre ecosystem.", paymentUrls.mercado],
  ["Revolut Business", "UK/EU/AU multi-currency account, merchant account, Revolut Pay add-on.", paymentUrls.revolutPayments],
  ["Airwallex / Payoneer / WorldFirst", "Seller-side collection, FX, marketplace payouts and supplier payments.", paymentUrls.airwallex]
];

const paymentMethods = [
  ["Mexico", "OXXO + SPEI"],
  ["Brazil", "Pix + Boleto"],
  ["Colombia", "PSE + Nequi"],
  ["Spain/EU", "SEPA + Bizum + Revolut Pay"],
  ["Japan", "Konbini + PayPay"],
  ["India", "UPI"],
  ["Seller ops", "Multi-currency account + FX"]
];

const paymentSources = [
  ["Stripe payment methods", paymentUrls.stripe],
  ["Shopify Payments supported countries", paymentUrls.shopify],
  ["PayPal Checkout", paymentUrls.paypal],
  ["dLocal payment methods", paymentUrls.dlocal],
  ["EBANX payment methods", paymentUrls.ebanx],
  ["Mercado Pago Developers", paymentUrls.mercado],
  ["Revolut accept payments", paymentUrls.revolutPayments],
  ["Revolut multi-currency accounts", paymentUrls.revolutAccounts],
  ["Airwallex global accounts", paymentUrls.airwallex],
  ["Payoneer marketplace payments", paymentUrls.payoneer],
  ["WorldFirst marketplace solutions", paymentUrls.worldfirst],
  ["PingPong marketplace solutions", paymentUrls.pingpong],
  ["EU VAT ecommerce", paymentUrls.euVat],
  ["EU General Product Safety Regulation", paymentUrls.euGpsr]
];

let activeFilter = "all";

const grid = document.querySelector("#categoryGrid");
const filtersEl = document.querySelector("#filters");
const searchInput = document.querySelector("#searchInput");
const creditList = document.querySelector("#creditList");
const panelButtons = document.querySelectorAll("[data-panel]");
const panelLinks = document.querySelectorAll("[data-panel-link]");
const panels = {
  products: document.querySelector("#productsPanel"),
  payments: document.querySelector("#paymentsPanel")
};
const paymentDocLinks = document.querySelector("#paymentDocLinks");
const paymentGrid = document.querySelector("#paymentGrid");
const providerGrid = document.querySelector("#providerGrid");
const methodGrid = document.querySelector("#methodGrid");
const paymentCreditList = document.querySelector("#paymentCreditList");

function sourceLinks(category) {
  const query = category.query;
  const encoded = encodeURIComponent(query);
  const aliPath = query.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return [
    ["AliExpress", `https://www.aliexpress.us/w/wholesale-${aliPath}.html`, true],
    ["1688", `https://s.1688.com/selloffer/offer_search.htm?keywords=${encoded}`, false],
    ["Amazon Search", `https://www.amazon.com/s?k=${encoded}`, false],
    ["Amazon Rising", category.amazonRising, false],
    ["TikTok", "https://ads.tiktok.com/business/creativecenter/top-products/pc/en", false],
    ["Google Trends", `https://trends.google.com/trends/explore?date=today%2012-m&geo=US&q=${encodeURIComponent(category.trendsQuery)}`, false]
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
      const links = sourceLinks(category)
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

function renderLinkButtons(links) {
  return links
    .map(([label, href, primary]) => `<a class="source-link${primary ? " primary" : ""}" href="${href}" target="_blank" rel="noreferrer">${label}</a>`)
    .join("");
}

function renderPaymentDocs() {
  paymentDocLinks.innerHTML = renderLinkButtons(paymentDocs);
}

function renderPaymentMarkets() {
  paymentGrid.innerHTML = paymentMarkets
    .map((market) => `
      <article class="payment-card">
        <div class="payment-card-head">
          <div>
            <h2>${market.country}</h2>
            <span>${market.label}</span>
          </div>
          <strong>${market.priority}</strong>
        </div>
        <div class="payment-lines">
          <p><small>Buyer pays with</small>${market.methods}</p>
          <p><small>First stack</small>${market.stack}</p>
          <p><small>Watch</small>${market.risk}</p>
          <p><small>Next move</small>${market.action}</p>
        </div>
        <div class="source-links">${renderLinkButtons(market.links)}</div>
      </article>
    `)
    .join("");
}

function renderPaymentReference() {
  providerGrid.innerHTML = paymentProviders
    .map(([name, description, href]) => `
      <a class="provider-row" href="${href}" target="_blank" rel="noreferrer">
        <strong>${name}</strong>
        <span>${description}</span>
      </a>
    `)
    .join("");

  methodGrid.innerHTML = paymentMethods
    .map(([market, method]) => `
      <div class="method-row">
        <strong>${market}</strong>
        <span>${method}</span>
      </div>
    `)
    .join("");

  paymentCreditList.innerHTML = paymentSources
    .map(([label, href]) => `<a href="${href}" target="_blank" rel="noreferrer">${label}</a>`)
    .join("");
}

function setActivePanel(panelName, updateHash = true) {
  const name = panels[panelName] ? panelName : "products";
  Object.entries(panels).forEach(([key, panel]) => {
    const isActive = key === name;
    panel.hidden = !isActive;
    panel.classList.toggle("active", isActive);
  });
  panelButtons.forEach((button) => {
    const isActive = button.dataset.panel === name;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  if (updateHash) {
    history.replaceState(null, "", `#${name}`);
  }
}

filtersEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  renderFilters();
  renderCards();
});

searchInput.addEventListener("input", renderCards);

panelButtons.forEach((button) => {
  button.addEventListener("click", () => setActivePanel(button.dataset.panel));
});

panelLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setActivePanel(link.dataset.panelLink);
  });
});

window.addEventListener("hashchange", () => {
  setActivePanel(location.hash === "#payments" ? "payments" : "products", false);
});

renderFilters();
renderCards();
renderCredits();
renderPaymentDocs();
renderPaymentMarkets();
renderPaymentReference();
setActivePanel(location.hash === "#payments" ? "payments" : "products", false);
