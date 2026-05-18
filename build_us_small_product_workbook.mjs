import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = new URL(".", import.meta.url).pathname;
const outputPath = `${outputDir}/us_small_product_demand_finder.xlsx`;

const candidates = [
  ["D001", "Minimalist WFH desk organization", "Home office / desk setup", "Modular magnetic desk organizer", 14.99, 3.2, 34.99, "", 29.99, "", "Desk setup / productivity videos; TikTok Top Products supports content-led shopping research.", "Manual check: desk organizer, home office setup", "Too small, plasticky, unstable, cheap-looking.", "Premium matte finish, modular tray sizes, cable slot, Notion/desk productivity positioning.", 5, 5, 5, 5, 5, 5, 5, 5],
  ["D002", "Laptop posture and compact workstation", "Home office / ergonomic desk", "Adjustable aluminum laptop stand", 18.99, 6.8, 39.99, "", 39.99, "", "Remote work desk setup content; Alibaba/AliExpress research cites ergonomic laptop stands.", "Manual check: laptop stand, remote work desk", "Wobbly hinges, scratches laptop, not portable.", "Heavier hinge, rubber pads, fold-flat pouch, premium WFH bundle.", 5, 4, 5, 4, 4, 5, 4, 4],
  ["D003", "Cable mess around creator desks", "Creator setup / cable management", "Under-desk cable management kit", 9.99, 2.4, 24.99, "", 24.99, "", "Desk setup videos make before/after easy; TikTok phone/accessory categories show high activity.", "Manual check: cable management desk", "Adhesive falls, not enough clips, hard instructions.", "All-in-one kit with tray, clips, labels, alcohol wipe, 5-minute guide.", 4, 5, 5, 5, 4, 5, 5, 5],
  ["D004", "Glare-free creator desk lighting", "Creator setup / desk setup", "Monitor light bar", 24.99, 9.8, 59.99, "", 49.99, "", "Desk setup and creator lighting content; AliExpress tech gadget lists include desk tech.", "Manual check: monitor light bar", "Glare, weak clamp, poor color temperature.", "No-glare clamp, warmer light, remote dial, minimalist packaging.", 4, 4, 4, 5, 4, 4, 4, 3],
  ["D005", "Underserved left-handed desk ergonomics", "Ergonomic desk gadgets", "Left-handed vertical mouse", 20.32, 11.5, 49.99, "", 49.99, "", "FindNiche listed left-hand ergonomic vertical mouse among high-order AliExpress products.", "Manual check: left handed vertical mouse", "Too small, cheap clicks, bad driver support.", "Lefty-specific positioning, better switches, quiet-click office version.", 4, 4, 3, 4, 5, 4, 4, 3],
  ["D006", "Pet hair on couch, clothes and car seats", "Pet cleaning / storage", "Reusable pet hair remover roller", 9.99, 2.2, 24.99, "", 24.99, "", "Pet products are a consistent AliExpress category; visual one-swipe demo is strong.", "Manual check: pet hair remover roller", "Handle breaks, does not work on all fabrics.", "Stronger handle, car/couch/fabric positioning, bundle with mini travel roller.", 5, 5, 5, 5, 4, 5, 5, 4],
  ["D007", "Dog car seat mess protection", "Pet cleaning / car interior", "Waterproof pet car hammock", 22.99, 8.5, 49.99, "", 49.99, "", "Crosses pet and car interior demand; strong muddy-paw demo.", "Manual check: dog car seat cover", "Does not fit, straps weak, hard to clean.", "SUV/sedan fit guide, stronger straps, washable premium fabric.", 4, 4, 4, 5, 4, 5, 3, 4],
  ["D008", "Pet entryway clutter", "Pet storage", "Leash, bag and toy wall organizer", 13.99, 4.8, 34.99, "", 29.99, "", "Fits pet storage direction; needs Amazon/TikTok validation.", "Manual check: pet leash organizer", "Too small, hooks weak, ugly design.", "Minimalist entryway design, stronger hooks, toy/bin combo.", 3, 4, 4, 4, 5, 5, 5, 5],
  ["D009", "Carry-on packing compression", "Travel organization", "Compression packing cubes", 19.99, 7.2, 39.99, "", 39.99, "", "Travel organization is a consistent AliExpress category; packing demos are highly visual.", "Manual check: compression packing cubes", "Zippers break, sizes not useful, fabric tears.", "Premium zippers, clearer size system, business-trip bundle.", 5, 4, 4, 5, 4, 5, 5, 4],
  ["D010", "Cable and charger chaos while traveling", "Travel organization / office", "Tech organizer pouch", 12.99, 3.8, 29.99, "", 24.99, "", "AliExpress user discussions cite cables/tech accessories; travel desk content supports demand.", "Manual check: tech organizer pouch", "Too bulky, pockets not useful, zipper poor.", "Slim charger-first layout, labeled compartments, premium fabric.", 4, 5, 5, 5, 4, 5, 5, 5],
  ["D011", "Hotel bathroom clutter", "Travel organization", "Hanging toiletry organizer", 14.99, 5.2, 29.99, "", 29.99, "", "Travel organization fit; sell organizer only, no liquids.", "Manual check: hanging toiletry bag", "Hook weak, pockets too small, leaks.", "Stronger hook, waterproof compartments, gym/travel dual use.", 4, 4, 4, 5, 4, 5, 5, 4],
  ["D012", "Desk-worker muscle tension without devices", "Small fitness recovery", "Massage ball / peanut ball set", 8.99, 2.4, 24.99, "", 24.99, "", "Small recovery tools match preferred direction and avoid electronics.", "Manual check: massage ball set", "Too hard, bad smell, unclear usage.", "Odor-free material, simple desk-break routine cards, no medical claims.", 4, 5, 5, 4, 4, 5, 5, 5],
  ["D013", "Compact movement kit for office breaks", "Small fitness recovery", "Stretching strap + resistance band set", 9.99, 2.8, 24.99, "", 24.99, "", "Sell The Trend cites resistance/posture support demand; demo-friendly.", "Manual check: stretching strap resistance band", "Bands snap, resistance unclear, no instructions.", "Color-coded resistance, office-break guide, travel pouch.", 4, 5, 5, 5, 4, 5, 5, 4],
  ["D014", "Phones falling into car seat gaps", "Car interior accessories", "Car seat gap filler organizer", 12.99, 4.2, 29.99, "", 29.99, "", "Car interior accessories are a 2026 dropshipping category; very clear problem demo.", "Manual check: car seat gap filler", "Bad fit, slides around, blocks seatbelt.", "Universal fit guide, grippy material, no-block seatbelt design.", 4, 5, 5, 5, 4, 5, 5, 4],
  ["D015", "Dusty car vents and screens", "Car interior accessories", "Interior detailing brush + microfiber kit", 9.99, 2.5, 24.99, "", 24.99, "", "ASTools notes microfiber sets and interior cleaning brushes sell steadily and video well.", "Manual check: car detailing brush kit", "Brush sheds, towels thin, cheap packaging.", "Premium brush fibers, screen-safe cloth, no-chemical kit.", 5, 5, 5, 5, 4, 5, 5, 5],
  ["D016", "Groceries sliding around car trunk", "Car interior storage", "Collapsible trunk organizer", 24.99, 8.8, 49.99, "", 39.99, "", "Car storage is clear US family/Costco use case; check shipping economics.", "Manual check: trunk organizer", "Flimsy sides, too bulky, hard to fold.", "Semi-rigid foldable design, grocery/outdoor bundle angle.", 4, 4, 3, 4, 4, 5, 3, 4],
  ["D017", "Dark cabinets and closets without wiring", "Premium home organization", "Motion sensor cabinet light", 7.99, 2.1, 24.99, "", 24.99, "", "FindNiche AliExpress top list includes LED motion sensor lights with high orders/wishlists.", "Manual check: motion sensor cabinet light", "Battery weak, adhesive fails, too dim.", "Better adhesive, warmer light, closet/kitchen bundle.", 5, 5, 5, 5, 4, 4, 4, 3],
  ["D018", "Messy drawers and closets", "Small home storage / minimalist living", "Adjustable drawer divider kit", 9.99, 2.8, 24.99, "", 24.99, "", "Home organization content is visual; manual Amazon/TikTok check required.", "Manual check: drawer dividers", "Does not stay in place, flimsy spring.", "Stronger spring, premium neutral colors, room-specific bundle.", 4, 5, 5, 5, 4, 5, 5, 5],
  ["D019", "Labeling storage bins and cables", "Home office / home organization", "Mini label maker", 18.99, 8.2, 39.99, "", 39.99, "", "AliExpress user discussions mention label makers as useful purchases; content fits organization.", "Manual check: mini label maker", "App bad, tape expensive, battery issues.", "No-app or simple-app positioning, starter tape bundle, home office labels.", 3, 4, 4, 5, 4, 4, 3, 3],
  ["D020", "Cables tangling in bags and desks", "Creator setup / travel organization", "Magnetic cable ties bundle", 6.99, 0.9, 19.99, "", 24.99, "", "Fits desk/travel accessory bundle; AOV needs bundling above $20.", "Manual check: magnetic cable ties", "Magnets weak, too short, easy to lose.", "Premium 12-pack, color-coded, bundled with tech pouch.", 4, 5, 5, 5, 4, 5, 5, 5],
  ["D021", "Keyboard crumbs and desk dust", "Creator setup / desk setup", "Mini desk vacuum / keyboard cleaner", 11.99, 4.5, 24.99, "", 24.99, "", "AliExpress tech gadget lists include small office gadgets; satisfying cleaning demo.", "Manual check: keyboard cleaner", "Weak suction, battery dies, hard to empty.", "Manual brush + vacuum combo, better bin, no high-power claims.", 3, 4, 4, 5, 4, 4, 4, 3],
  ["D022", "Small desk vertical storage", "Home office / desk setup", "Compact monitor shelf / riser", 19.99, 7.5, 39.99, "", 39.99, "", "Desk setup demand; shipping economics must be checked.", "Manual check: monitor shelf desk riser", "Too wide, unstable, cheap material.", "Compact apartment desk version, premium wood/metal look.", 4, 4, 4, 4, 4, 5, 3, 4],
  ["D023", "Laptop work in public spaces", "Travel organization / home office", "Laptop privacy side panel / screen shade", 16.99, 5.5, 34.99, "", 34.99, "", "Fits cafe/digital nomad audience; needs validation.", "Manual check: laptop screen shade privacy", "Compatibility issues, awkward setup.", "Universal sizing, fold-flat carry case, privacy/glare angle.", 3, 4, 4, 4, 5, 5, 4, 4],
  ["D024", "Car trash and small-item mess", "Car interior accessories", "Compact car trash bin / seat-back organizer", 14.99, 4.5, 29.99, "", 29.99, "", "Car interior organization has broad US commuter/family use.", "Manual check: car trash bin organizer", "Leaks, straps weak, looks cheap.", "Leakproof liner, neutral colors, family road-trip positioning.", 4, 5, 4, 5, 4, 5, 4, 4],
  ["D025", "Closet shelf space shortage", "Small home storage / minimalist living", "Manual compression storage bag set", 12.99, 3.2, 29.99, "", 29.99, "", "Home storage category; avoid powered vacuum devices.", "Manual check: compression storage bags", "Leaks air, zipper fails, plastic tears.", "Thicker material, travel + seasonal closet bundle.", 4, 5, 5, 5, 4, 5, 5, 4],
  ["D026", "Giftable everyday necklace", "Fashion accessories / female decoration", "Stainless steel pendant necklace", 8.99, 1.8, 20.00, "", 24.99, "", "User screenshot: Necklaces ranked high in TikTok Top Products, +8% momentum, 2.09% CTR and 5.67% CVR.", "Manual check: stainless steel pendant necklace", "Tarnish, green skin, allergy, chain breaks, looks cheaper than photos.", "Stainless/titanium steel positioning, gift-ready box, no-IP pendant, layered set that does not tangle.", 5, 5, 5, 5, 4, 3, 5, 4],
  ["D027", "Low-commitment outfit accent", "Fashion accessories / female decoration", "Hair clips, claw clips, phone charms, bag charms", 6.99, 0.9, 18.99, "", 21.99, "", "Adjacent TikTok fashion accessory behavior: small visual accessories are demo-friendly and easy to bundle.", "Manual check: hair clips phone charm bag charm", "Breaks easily, cheap finish, color mismatch, copied character designs.", "Neutral/premium color set, stronger hardware, seasonal outfit bundle, no branded/IP charms.", 4, 5, 5, 5, 5, 4, 5, 4]
];

const avoidRows = [
  ["Supplements", "FDA/FTC claims, platform restrictions, high substantiation burden."],
  ["Food", "FDA import/prior notice and spoilage/labeling risk."],
  ["Children's toys / baby products", "CPSC child safety, testing and liability risk."],
  ["Medical devices", "Certification, claims and product safety risk."],
  ["High-power electronics / high-risk batteries", "Shipping, fire, certification and returns risk."],
  ["Cosmetics", "Ingredient, labeling, import and claim risk; skip for first batch."],
  ["Children's jewelry", "Lead/cadmium testing and child-safety compliance burden."],
  ["Adult products", "Platform/ad restrictions and brand risk."],
  ["Infringing IP / lookalikes", "Listing takedowns, customs seizure and ad account risk."],
  ["Large furniture", "Freight, damage and return burden."],
  ["Complex certification products", "Slow launch and misleading validation data."]
];

const sources = [
  ["AliExpress", "High sales, high review count, price gaps", "Find what China supply can provide.", "https://findniche.com/aliexpress/aliexpress-trending-products"],
  ["1688", "Factory/source price, MOQ, variants", "Validate cost advantage and supply depth.", "https://www.1688.com/"],
  ["Amazon category-specific Movers & Shakers", "Fastest sales-rank gainers inside the matching category", "See short-term US demand changes without landing on personalized Books/series pages.", "https://www.amazon.com/gp/movers-and-shakers/home-garden/"],
  ["TikTok Creative Center Top Products", "Viral products, ad creatives, audience insights", "See content-driven demand.", "https://ads.tiktok.com/business/creativecenter/top-products/pc/en"],
  ["Google Trends", "2-3 broad consumer keywords, not long SKU phrases", "Check whether demand is rising or stable without getting no-data pages.", "https://trends.google.com/trends/explore?date=today%2012-m&geo=US&q=desk%20organizer,home%20office,desk%20setup"],
  ["TikTok Shop", "Live, shoppable video, Shop tab", "Observe discovery-commerce sales scenes.", "https://newsroom.tiktok.com/tiktok-shop-is-where-shoppers-come-to-discover"],
  ["CPSC", "Product safety guidance for online sellers", "Screen consumer-product safety and compliance risk.", "https://www.cpsc.gov/Business--Manufacturing/Online-Sellers-Safety-Guide"],
  ["CBP", "Importer responsibility and lawful/safe sourcing", "Screen import compliance, duties and restricted goods.", "https://www.cbp.gov/trade/basic-import-export"]
];

const wb = Workbook.create();
const dashboard = wb.worksheets.add("Dashboard");
const tracker = wb.worksheets.add("US Small Product Tracker");
const workflow = wb.worksheets.add("7-Day Workflow");
const supplier = wb.worksheets.add("Supplier Outreach");
const landing = wb.worksheets.add("Landing Test Brief");
const sourceSheet = wb.worksheets.add("Sources & Compliance");
const avoid = wb.worksheets.add("Avoid List");

const write = (s, r, v) => { s.getRange(r).values = v; };
const formula = (s, r, v) => { s.getRange(r).formulas = v; };
const title = (s, r) => { s.getRange(r).format = { fill: "#111827", font: { color: "#FFFFFF", bold: true, size: 16 }, wrapText: true, verticalAlignment: "center" }; };
const header = (s, r) => { s.getRange(r).format = { fill: "#1F4E79", font: { color: "#FFFFFF", bold: true }, wrapText: true, horizontalAlignment: "center", verticalAlignment: "center", borders: { preset: "outside", style: "thin", color: "#D1D5DB" } }; };
const body = (s, r) => { s.getRange(r).format = { font: { name: "Calibri", size: 10, color: "#111827" }, wrapText: true, verticalAlignment: "top", borders: { preset: "outside", style: "thin", color: "#E5E7EB" } }; };

write(dashboard, "A1:H1", [["US Small Product Demand Dashboard", "", "", "", "", "", "", ""]]);
dashboard.getRange("A1:H1").merge();
title(dashboard, "A1:H1");
write(dashboard, "A2:H2", [["Core principle", "Find small products Americans already want", "Market", "United States", "Sample threshold", "32+/40", "Date", "2026-05-17"]]);
write(dashboard, "A4:B10", [
  ["Metric", "Value"],
  ["Products captured", ""],
  ["Sample-stage candidates", ""],
  ["Average score", ""],
  ["Average gross margin", ""],
  ["Avoid categories", ""],
  ["Supplier questions", "9"]
]);
formula(dashboard, "B5:B10", [
  ['=COUNTA(\'US Small Product Tracker\'!B2:B51)'],
  ['=COUNTIF(\'US Small Product Tracker\'!Y2:Y51,"Sample stage")'],
  ['=AVERAGE(\'US Small Product Tracker\'!W2:W51)'],
  ['=AVERAGE(\'US Small Product Tracker\'!J2:J51)'],
  ['=COUNTA(\'Avoid List\'!A2:A20)'],
  ['=COUNTA(\'Supplier Outreach\'!A4:A12)']
]);
write(dashboard, "D4:H4", [["Top Small Product Ideas", "Score", "Gross Margin", "Decision", "Upgrade Angle"]]);
formula(dashboard, "D5:H14", Array.from({ length: 10 }, (_, i) => [
  `=IFERROR(INDEX('US Small Product Tracker'!$B$2:$B$51,MATCH(${i + 1},'US Small Product Tracker'!$Z$2:$Z$51,0)),"")`,
  `=IF(D${i + 5}="","",INDEX('US Small Product Tracker'!$W$2:$W$51,MATCH(D${i + 5},'US Small Product Tracker'!$B$2:$B$51,0)))`,
  `=IF(D${i + 5}="","",INDEX('US Small Product Tracker'!$J$2:$J$51,MATCH(D${i + 5},'US Small Product Tracker'!$B$2:$B$51,0)))`,
  `=IF(D${i + 5}="","",INDEX('US Small Product Tracker'!$Y$2:$Y$51,MATCH(D${i + 5},'US Small Product Tracker'!$B$2:$B$51,0)))`,
  `=IF(D${i + 5}="","",INDEX('US Small Product Tracker'!$N$2:$N$51,MATCH(D${i + 5},'US Small Product Tracker'!$B$2:$B$51,0)))`
]));
write(dashboard, "A13:B20", [
  ["Scoring", "Rule"],
  ["8 dimensions", "Each 1-5"],
  ["Total score", "32+ enters sample stage"],
  ["AOV", "$20-$100 preferred"],
  ["Gross margin", "40%+ after landed cost"],
  ["Validation logic", "AliExpress = supply clue, 1688 = cost, Amazon/TikTok/Google = US demand"],
  ["Strategy", "Do not copy SKU; improve product and localize packaging"],
  ["First output", "10-product shortlist, then 3-5 landing/content tests"]
]);
header(dashboard, "A4:B4");
header(dashboard, "D4:H4");
header(dashboard, "A13:B13");
body(dashboard, "A2:H20");
dashboard.getRange("B7").format.numberFormat = "0.0";
dashboard.getRange("B8").format.numberFormat = "0%";
dashboard.getRange("F5:F14").format.numberFormat = "0%";
dashboard.getRange("A:A").format.columnWidthPx = 180;
dashboard.getRange("B:B").format.columnWidthPx = 240;
dashboard.getRange("D:D").format.columnWidthPx = 300;
dashboard.getRange("E:H").format.columnWidthPx = 180;
dashboard.freezePanes.freezeRows(1);

write(tracker, "A1:Z1", [["ID", "Small Product Demand", "Category", "Product/SKU Example", "AliExpress Price", "1688 Source Price", "Amazon Price", "Estimated Landed Cost", "Target Price", "Gross Margin", "TikTok Signal", "Google Trends", "Main Complaint", "Possible Upgrade", "US Demand /5", "China Supply Advantage /5", "Margin /5", "10s Video Demo /5", "Differentiation /5", "Compliance Risk /5", "Logistics /5", "After-sale Risk /5", "Total /40", "Gate Notes", "Decision", "Priority Rank"]]);
write(tracker, `A2:V${candidates.length + 1}`, candidates);
const maxRows = 50;
formula(tracker, `H2:H${maxRows + 1}`, Array.from({ length: maxRows }, (_, i) => [`=IF(F${i + 2}="","",F${i + 2}*1.25+3)`]));
formula(tracker, `J2:J${maxRows + 1}`, Array.from({ length: maxRows }, (_, i) => [`=IF(OR(I${i + 2}="",H${i + 2}="",I${i + 2}=0),"",(I${i + 2}-H${i + 2})/I${i + 2})`]));
formula(tracker, `W2:W${maxRows + 1}`, Array.from({ length: maxRows }, (_, i) => [`=IF(COUNTA(O${i + 2}:V${i + 2})=0,"",SUM(O${i + 2}:V${i + 2}))`]));
formula(tracker, `X2:X${maxRows + 1}`, Array.from({ length: maxRows }, (_, i) => [`=IF(B${i + 2}="","",IF(AND(I${i + 2}>=20,I${i + 2}<=100,J${i + 2}>=0.4,W${i + 2}>=32),"Pass core gates","Fix price/margin/score"))`]));
formula(tracker, `Y2:Y${maxRows + 1}`, Array.from({ length: maxRows }, (_, i) => [`=IF(B${i + 2}="","",IF(X${i + 2}="Pass core gates","Sample stage","Research / reject"))`]));
formula(tracker, `Z2:Z${maxRows + 1}`, Array.from({ length: maxRows }, (_, i) => [`=IF(W${i + 2}="","",COUNTIF($W$2:$W$51,">"&W${i + 2})+COUNTIF($W$2:W${i + 2},W${i + 2}))`]));
header(tracker, "A1:Z1");
body(tracker, "A2:Z51");
tracker.getRange("E2:J51").format.numberFormat = [["$0.00", "$0.00", "$0.00", "$0.00", "$0.00", "0%"]];
tracker.getRange("O2:W51").format.horizontalAlignment = "center";
tracker.getRange("W2:W51").conditionalFormats.add("colorScale", { criteria: [{ type: "lowestValue", color: "#FCA5A5" }, { type: "percentile", value: 50, color: "#FDE68A" }, { type: "highestValue", color: "#86EFAC" }] });
tracker.getRange("Y2:Y51").conditionalFormats.add("containsText", { text: "Sample", format: { fill: "#DCFCE7", font: { color: "#166534", bold: true } } });
tracker.getRange("A:A").format.columnWidthPx = 58;
tracker.getRange("B:D").format.columnWidthPx = 220;
tracker.getRange("E:J").format.columnWidthPx = 105;
tracker.getRange("K:N").format.columnWidthPx = 280;
tracker.getRange("O:W").format.columnWidthPx = 95;
tracker.getRange("X:Z").format.columnWidthPx = 150;
tracker.freezePanes.freezeRows(1);
tracker.freezePanes.freezeColumns(2);

write(workflow, "A1:D1", [["7-Day Execution Plan", "", "", ""]]);
workflow.getRange("A1:D1").merge();
title(workflow, "A1:D1");
write(workflow, "A3:D3", [["Day", "Goal", "Actions", "Output"]]);
write(workflow, "A4:D10", [
  ["Day 1-2", "Capture 50 small product ideas", "AliExpress top selling/Choice, 1688 source, Amazon Search plus category-specific Amazon Rising lists, TikTok Creative Center, Google Trends US.", "50 candidate rows with price, signals, complaint and upgrade angle."],
  ["Day 3", "Screen to 10", "Remove complex compliance, heavy/fragile, low margin, saturated, low demo value products.", "10 high-score product ideas."],
  ["Day 4-5", "Contact suppliers", "Ask MOQ, sample price, custom packaging, US/EU customers, certificates, lead time, 30-100 unit test, no-logo, color/material/bundle changes.", "Supplier responses and sample feasibility."],
  ["Day 6", "Landing/content test", "Create one Shopify/Notion landing page, 3 TikTok/Reels demo scripts, 3 scene images, English value prop, waitlist/preorder form.", "Test-ready page and content packet."],
  ["Day 7", "Sample decision", "Require 2+ platform heat, 24h supplier response, sample available, 40%+ margin, differentiation, low compliance risk.", "Order sample / iterate / reject decision."],
  ["Ongoing", "Do variant upgrade", "Translate SKU signal into demand, complaint, better version, US localized packaging.", "Product strategy, not SKU copying."],
  ["Principle", "Demand-first sourcing", "AliExpress = clues, 1688 = cost advantage, Amazon/TikTok/Google = US demand validation.", "US consumer need + China supply advantage."]
]);
header(workflow, "A3:D3");
body(workflow, "A4:D10");
workflow.getRange("A:A").format.columnWidthPx = 100;
workflow.getRange("B:D").format.columnWidthPx = 310;

write(supplier, "A1:D1", [["Supplier Outreach Checklist", "", "", ""]]);
supplier.getRange("A1:D1").merge();
title(supplier, "A1:D1");
write(supplier, "A3:D3", [["Question", "Why It Matters", "Pass Signal", "Supplier Answer"]]);
write(supplier, "A4:D12", [
  ["MOQ?", "Tests should not require overbuying.", "30-100 units possible.", ""],
  ["Sample price?", "Confirms sample-stage cost.", "Sample available with reasonable shipping.", ""],
  ["Custom packaging?", "Needed for US-localized premium version.", "Low MOQ packaging or sticker/insert option.", ""],
  ["US/EU customers?", "Proxy for export readiness.", "Has shipped to US/EU sellers before.", ""],
  ["Relevant certifications?", "Filters compliance blockers.", "Can provide docs when category requires.", ""],
  ["Lead time?", "Avoid slow first batch.", "Sample <= 7 days, small batch <= 2-3 weeks.", ""],
  ["30-100 unit test?", "Lets you validate without inventory risk.", "Supports small pilot order.", ""],
  ["No-logo version?", "Avoids brand/IP issues.", "Blank/private-label version available.", ""],
  ["Can change color/material/bundle?", "Enables variant upgrade.", "Supports small customization or bundle changes.", ""]
]);
header(supplier, "A3:D3");
body(supplier, "A4:D12");
supplier.getRange("A:D").format.columnWidthPx = 250;

write(landing, "A1:D1", [["Landing + Content Test Brief", "", "", ""]]);
landing.getRange("A1:D1").merge();
title(landing, "A1:D1");
write(landing, "A3:D3", [["Asset", "Requirement", "Template", "Notes"]]);
write(landing, "A4:D11", [
  ["Landing page", "Shopify or Notion page", "Hero, problem, demo, upgrade, FAQ, CTA.", ""],
  ["Demo script 1", "Pain-led", "Still dealing with [annoying situation] every day?", ""],
  ["Demo script 2", "Before/after", "I changed one thing in my [desk/car/bag/home] setup.", ""],
  ["Demo script 3", "Comparison", "Cheap version vs upgraded version.", ""],
  ["Scene images", "3 product-use scenes", "Desk, travel bag, car interior, pet couch, closet.", ""],
  ["English value prop", "One sentence", "A cleaner way to [job] without [pain].", ""],
  ["Form", "Waitlist/preorder", "Email + product variant preference + price reaction.", ""],
  ["Decision", "Sample or reject", "Use 2+ heat sources, supplier response, margin, differentiation and compliance.", ""]
]);
header(landing, "A3:D3");
body(landing, "A4:D11");
landing.getRange("A:D").format.columnWidthPx = 250;

write(sourceSheet, "A1:D1", [["Signal Sources & Compliance", "", "", ""]]);
sourceSheet.getRange("A1:D1").merge();
title(sourceSheet, "A1:D1");
write(sourceSheet, "A3:D3", [["Source", "Look For", "Purpose", "URL"]]);
write(sourceSheet, `A4:D${sources.length + 3}`, sources);
header(sourceSheet, "A3:D3");
body(sourceSheet, `A4:D${sources.length + 3}`);
sourceSheet.getRange("A:A").format.columnWidthPx = 230;
sourceSheet.getRange("B:C").format.columnWidthPx = 300;
sourceSheet.getRange("D:D").format.columnWidthPx = 430;

write(avoid, "A1:B1", [["Avoid First", "Reason"]]);
header(avoid, "A1:B1");
write(avoid, `A2:B${avoidRows.length + 1}`, avoidRows);
body(avoid, `A2:B${avoidRows.length + 1}`);
avoid.getRange("A:A").format.columnWidthPx = 260;
avoid.getRange("B:B").format.columnWidthPx = 560;

try {
  const chart = dashboard.charts.add("ColumnClustered", {
    title: "Top 10 Small Product Scores",
    categories: Array.from({ length: 10 }, (_, i) => `=Dashboard!D${i + 5}`),
    series: [{ name: "Score", values: Array.from({ length: 10 }, (_, i) => `=Dashboard!E${i + 5}`) }],
    hasLegend: false,
    dataLabels: { showValue: true, position: "outEnd" },
    from: { row: 19, col: 3 },
    extent: { widthPx: 650, heightPx: 300 }
  });
  chart.titleTextStyle.fontSize = 14;
} catch {}

for (const sheet of [dashboard, tracker, workflow, supplier, landing, sourceSheet, avoid]) {
  sheet.getRange("A1:Z1").format.rowHeightPx = 34;
}

await fs.mkdir(outputDir, { recursive: true });
console.log((await wb.inspect({ kind: "table", range: "Dashboard!A1:H20", include: "values,formulas", tableMaxRows: 20, tableMaxCols: 8 })).ndjson);
console.log((await wb.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 300 }, summary: "final formula error scan" })).ndjson);
for (const sheetName of ["Dashboard", "US Small Product Tracker", "7-Day Workflow", "Supplier Outreach", "Landing Test Brief", "Sources & Compliance", "Avoid List"]) {
  await wb.render({ sheetName, range: "A1:H20", scale: 1 });
}
const output = await SpreadsheetFile.exportXlsx(wb);
await output.save(outputPath);
console.log(outputPath);
