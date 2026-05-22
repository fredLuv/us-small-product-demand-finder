import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = new URL(".", import.meta.url).pathname;
const outputPath = `${outputDir}/cross_border_ecommerce_payment_matrix.xlsx`;

const countryRows = [
  ["United States", "Tier 0 benchmark", 92, "English", "Current baseline market; mature ads, Shopify, wallets, and BNPL.", "Cards, Apple Pay, Google Pay, PayPal, Shop Pay, BNPL, ACH", "Shopify Payments; Stripe; PayPal/Braintree; Adyen; Affirm/Klarna", "Airwallex; Wise Business; Payoneer", "Shopify Payments + PayPal + Shop Pay/Apple Pay + BNPL", "Ad costs, returns, sales tax, import policy changes.", "Medium", "Keep as benchmark and compare CAC/CVR.", "S01; S02; S03; S04"],
  ["Mexico", "Tier 1 Spanish", 88, "Spanish", "Large Spanish-speaking test market close to the US; local rails matter.", "Cards/debit, OXXO, SPEI, Mercado Pago, BNPL", "dLocal; EBANX; Mercado Pago; Conekta; Stripe Mexico; PayPal", "Airwallex; Payoneer; WorldFirst; Wise Business", "Mercado Pago or dLocal/EBANX + cards + OXXO/SPEI", "Voucher delays, refunds, tax/import clarity, localized support.", "Medium", "Build Spanish landing page and test OXXO/SPEI availability.", "S05; S06; S07; S09; S18"],
  ["Brazil", "Tier 1 LatAm scale", 86, "Portuguese", "Not Spanish, but too large to ignore; Pix is a conversion requirement.", "Pix, cards/installments, Boleto, Mercado Pago", "EBANX; dLocal; Mercado Pago; Adyen; Stripe Brazil", "Airwallex; Payoneer; WorldFirst; Wise Business", "Pix + cards/installments + Boleto", "Portuguese localization, CPF, import tax, fraud, logistics.", "High", "Create separate Brazil model rather than folding into Spanish plan.", "S05; S06; S07; S22"],
  ["Chile", "Tier 1 Spanish", 84, "Spanish", "Higher purchasing power and clearer ecommerce behavior than many LatAm markets.", "Cards/debit, Webpay/Transbank, Mercado Pago, bank transfer", "Mercado Pago; dLocal; EBANX; PayPal; local PSPs", "Airwallex; Payoneer; Wise Business", "Cards/Webpay + Mercado Pago + local transfer", "Smaller market, cross-border taxes, local delivery expectations.", "Medium", "Use as low-complexity Spanish test after Mexico.", "S05; S06; S07; S19"],
  ["Canada", "Tier 1 English extension", 82, "English/French", "Natural US expansion with good AOV and familiar checkout behavior.", "Cards, PayPal, Interac, wallets, BNPL", "Shopify Payments; Stripe; PayPal; Adyen; Klarna/Affirm", "Airwallex; Wise Business; Payoneer", "Shopify Payments + PayPal + CAD pricing", "Quebec French, GST/HST/PST, logistics cost.", "Low-Medium", "Copy US winners into CAD offer pages.", "S01; S02; S03; S04"],
  ["United Kingdom", "Tier 1 English", 80, "English", "High ecommerce maturity and strong DTC habit.", "Cards, PayPal, Apple Pay, Google Pay, Revolut Pay, Klarna/Clearpay, Open Banking", "Stripe; Shopify Payments; PayPal; Adyen; Checkout.com; Klarna; Revolut Business", "Airwallex; Revolut Business; Wise Business; Payoneer", "Stripe/Shopify + PayPal + Klarna/Clearpay; Revolut as FX/merchant add-on", "VAT, product safety, return expectations.", "Medium", "Test after US; evaluate Revolut Business if UK entity/settlement matters.", "S01; S02; S03; S04; S31; S32; S33; S34"],
  ["Australia / New Zealand", "Tier 2 English", 78, "English", "Good purchasing power; lightweight goods can absorb distance better.", "Cards, PayPal, Apple Pay, Google Pay, Afterpay, PayTo/PayID", "Stripe; Shopify Payments; PayPal; Adyen; Afterpay; Revolut Business (AU)", "Airwallex; Revolut Business; Wise Business; Payoneer", "Shopify/Stripe + PayPal + Afterpay; evaluate Revolut for AU entity", "Freight distance, GST, returns.", "Medium", "Use only for light, high-margin products.", "S01; S02; S03; S21; S31; S32; S34"],
  ["Spain / EU", "Tier 1 Spanish + EU", 78, "Spanish", "Spanish-language market with EU purchasing power; compliance is heavier.", "Cards/debit, PayPal, Apple Pay, Google Pay, Revolut Pay, Bizum, SEPA, Klarna", "Stripe; Shopify Payments; PayPal; Adyen; Klarna; Revolut Business; local PSPs", "Airwallex; Revolut Business; Wise Business; Payoneer", "Stripe/Shopify + PayPal + Bizum/SEPA/Klarna; Revolut as EU FX/checkout add-on", "VAT/IOSS, GPSR, EU returns, Spanish customer support.", "Medium-High", "Prepare EU compliance checklist before paid ads.", "S01; S02; S03; S04; S26; S27; S31; S32; S33; S34"],
  ["Colombia", "Tier 2 Spanish", 76, "Spanish", "Strong local transfer/wallet behavior; useful LatAm expansion test.", "PSE, cards/debit, Nequi, Daviplata, Mercado Pago, cash vouchers", "dLocal; EBANX; PayU; Mercado Pago", "Airwallex; Payoneer; Wise Business", "PSE + cards + wallet/cash options", "Logistics, refunds, cash/COD risk, local trust.", "Medium-High", "Test after Mexico/Chile with PSE-enabled checkout.", "S05; S06; S07; S10; S20"],
  ["Germany / DACH", "Tier 2 EU", 74, "German", "Large EU ecommerce market with distinctive trust and payment preferences.", "PayPal, invoice/BNPL, SEPA, cards, Klarna, Revolut Pay", "Adyen; Stripe; PayPal; Klarna; Shopify Payments; Revolut Business", "Airwallex; Revolut Business; Wise Business; Payoneer", "PayPal + cards + SEPA/Klarna; Revolut for EU account/payment add-on", "German language, return expectations, EU compliance.", "Medium-High", "Enter after EU compliance and support are ready.", "S01; S02; S03; S04; S26; S27; S31; S32; S34"],
  ["Japan", "Tier 2 APAC", 70, "Japanese", "High quality expectations and useful AOV; localization is the barrier.", "Cards, Konbini, PayPay, bank transfer, carrier billing", "Stripe; Shopify Payments; KOMOJU; PayPal; Adyen", "Airwallex; Wise Business; Payoneer", "Cards + PayPay + Konbini", "Japanese support, SCTA display, returns, strict quality perception.", "High", "Only test if product has Japan-specific appeal.", "S01; S02; S03; S11"],
  ["Argentina", "Tier 3 Spanish", 62, "Spanish", "Real demand, but macro and FX make independent DTC hard.", "Mercado Pago, cards/cuotas, bank transfer, Rapipago/Pago Facil", "Mercado Pago; dLocal; EBANX; PayU", "Airwallex; Payoneer; Wise Business", "Mercado Pago first; preferably marketplace/local partner", "FX, inflation, import restrictions, frequent repricing.", "High", "Use Mercado Pago or marketplace before standalone DTC.", "S05; S06; S07; S10; S21"],
  ["India", "Tier 3 local-partner", 58, "English/Hindi/local", "Huge market, but not a simple imported small-goods DTC start.", "UPI, cards, netbanking, wallets, COD", "Razorpay; PayU India; Cashfree; PhonePe; Stripe India", "Wise Business; Airwallex; Payoneer", "Local PSP + UPI + cards", "Entity/regulatory requirements, COD, low AOV, logistics.", "High", "Do only with local partner or marketplace strategy.", "S12; S23"],
  ["China / Hong Kong seller ops", "Seller-side layer", 75, "Chinese/English", "Not a buyer target here; useful for collecting payouts, FX, and paying suppliers.", "Marketplace payouts, multi-currency account, supplier payments", "Airwallex; Payoneer; WorldFirst; PingPong; LianLian Global; Wise Business", "Same as checkout provider backup accounts", "One primary account + one backup + supplier-payment route", "KYC, account freezes, FX spread, platform documentation.", "Medium", "Set up redundant collection accounts before scaling.", "S13; S14; S15; S16; S17; S24; S25"]
];

const providerRows = [
  ["Shopify Payments / Shop Pay", "Buyer checkout", "US, CA, UK, EU, AU/NZ, JP and supported countries", "Fast DTC checkout, cards, wallets, Shop Pay", "First Shopify store stack", "Merchant/entity must be in a supported country.", "S02"],
  ["Stripe Checkout / Payment Element / Link", "Buyer checkout + local methods", "US, CA, UK, EU, AU/NZ, JP, MX, BR and more", "One API for cards, wallets, and selected local payment methods", "Custom landing/preorder or non-Shopify checkout", "Payment method availability depends on merchant country and currency.", "S01"],
  ["PayPal Checkout / Braintree", "Buyer trust", "US, CA, UK, EU, AU/NZ, Japan, selected LatAm", "Trust bridge for new cross-border brands", "Add beside card checkout in early tests", "Fees, disputes, and account review need cash buffer.", "S03"],
  ["Adyen", "Enterprise PSP/acquirer", "EU, UK, US, LatAm, APAC", "Global acquiring, local payment methods, risk tools", "Use when countries and volume become complex", "Commercial and integration overhead for early stage.", "S04"],
  ["Checkout.com", "Enterprise PSP/acquirer", "UK/EU/US/global card-heavy merchants", "Authorization optimization and cards/APMs", "Use after meaningful payment volume", "Usually not the first no-code test tool.", "S28"],
  ["dLocal", "Emerging-market local payments", "Mexico, Brazil, Colombia, Argentina, Chile", "Local cards, wallets, bank transfers, vouchers", "One integration for LatAm complexity", "Confirm refunds, settlement currency, and exact country coverage.", "S05"],
  ["EBANX", "LatAm local payments", "Brazil, Mexico, Chile, Colombia, Argentina", "Pix, Boleto, OXXO, SPEI, PSE, local cards", "Global merchant entering LatAm", "Country/payment-specific rules vary.", "S06"],
  ["Mercado Pago", "Wallet + local acquiring", "Mexico, Brazil, Argentina, Chile, Colombia", "Local trust, wallet, cards, installments, Mercado Libre ecosystem", "Best first option for Argentina and useful in Mexico/Chile", "Local account and settlement rules matter.", "S07"],
  ["PayU Latam", "Local PSP", "Colombia, Mexico, Argentina and LatAm", "PSE, cards, local methods", "Colombia/PSE-focused checkout", "Coverage and features vary by country.", "S10"],
  ["Conekta", "Mexico PSP", "Mexico", "OXXO, SPEI, cards", "Mexico-specific DTC checkout", "Check local entity/settlement requirements.", "S09"],
  ["KOMOJU", "Japan PSP", "Japan", "Konbini, PayPay, cards, bank transfer", "Serious Japan-localized store", "Needs Japanese checkout/support context.", "S11"],
  ["Razorpay / Cashfree / PayU India", "India PSP", "India", "UPI, cards, netbanking, wallets", "Only with India entity/partner", "Local regulation and onboarding requirements.", "S12; S23"],
  ["Klarna / Affirm / Afterpay", "BNPL", "US, UK/EU, AU/NZ", "Installments for mid/high AOV products", "Add after AOV and returns are understood", "Fees, refund handling, and ad/compliance claims.", "S29"],
  ["Revolut Business / Revolut Pay / Merchant Account", "Seller settlement + checkout add-on", "UK/EU/Spain/Germany/Australia/Singapore; sellers with supported entity", "Multi-currency accounts, FX, merchant account, Revolut Pay, payment gateway/plugins", "Use when a UK/EU/AU entity wants FX, settlement, and checkout add-on in one account", "Merchant account countries are limited; not a Mexico/Brazil/Argentina local-payment answer; avoid using as sole PSP before testing.", "S31; S32; S33; S34"],
  ["Airwallex", "Seller settlement / FX / global accounts", "Cross-border DTC and suppliers", "Multi-currency accounts, FX, cards, payouts", "Use early for USD/EUR/GBP receipts and supplier payments", "KYC and compliance documents needed.", "S13"],
  ["Payoneer", "Marketplace payout / seller account", "Amazon, Walmart, eBay, marketplace sellers", "Platform payouts, withdrawals, supplier payments", "When selling through marketplaces", "Account holds and platform binding rules.", "S14"],
  ["WorldFirst", "Marketplace payout + supplier payments", "Amazon/eBay/Shopee/Lazada/1688 related workflows", "Multi-currency collection and supplier payments", "When China sourcing and marketplace sales combine", "Coverage varies by country/platform.", "S15"],
  ["PingPong", "Marketplace/platform collection", "Cross-border sellers and platforms", "Collection, FX, supplier payments", "Use as primary or backup seller account", "Keep documentation and backup accounts.", "S16"],
  ["LianLian Global", "Cross-border collection/payment", "China-based sellers and global merchants", "Global collection, payout, merchant services", "Useful China-seller payment stack option", "Confirm country and platform support.", "S17"],
  ["Wise Business", "Multi-currency account / transfer", "US/EU/UK/AU and supplier payments", "Low-friction FX and international transfers", "Use as auxiliary FX/transfer account", "Not a full buyer checkout PSP.", "S24"]
];

const methodRows = [
  ["Cards / debit cards", "Global baseline", "Every market", "The default online payment rail.", "Stripe; Shopify Payments; PayPal/Braintree; Adyen; Checkout.com", "Manage fraud, 3DS, and chargebacks."],
  ["Apple Pay / Google Pay / Shop Pay / Link", "Wallets", "US, CA, UK, EU, AU/NZ", "Reduces mobile checkout friction.", "Shopify; Stripe; Adyen; PayPal", "Usually sits on top of card rails."],
  ["PayPal", "Wallet/trust", "US, CA, UK, EU, AU/NZ, JP", "Improves trust for unknown cross-border brands.", "PayPal Checkout; Braintree; Shopify", "Dispute and reserve risk."],
  ["Revolut Pay", "Wallet / account checkout", "UK/EU and Revolut-heavy markets", "Low-friction checkout for Revolut users and direct settlement into Revolut Merchant account.", "Revolut Business Merchant Account; Revolut Gateway", "Useful UK/EU add-on, not a replacement for LatAm local rails."],
  ["OXXO / Paynet cash voucher", "Cash voucher", "Mexico", "Reaches cash-preferring buyers.", "dLocal; EBANX; Conekta; Stripe Mexico", "Delayed payment; do not reserve inventory too long."],
  ["SPEI", "Bank transfer", "Mexico", "Important Mexican bank-transfer rail.", "dLocal; EBANX; Conekta; Stripe Mexico", "Refund and reconciliation flow matters."],
  ["Pix", "Real-time bank payment", "Brazil", "Brazil conversion must-have.", "EBANX; dLocal; Mercado Pago; Stripe; Adyen", "QR expiry and refund flow need clarity."],
  ["Boleto", "Voucher", "Brazil", "Still useful for cash/bank voucher behavior.", "EBANX; dLocal; Stripe Brazil", "Delayed confirmation and inventory lock risk."],
  ["Mercado Pago wallet/account money", "Wallet/local trust", "Mexico, Brazil, Argentina, Chile, Colombia", "Local wallet trust and installments.", "Mercado Pago", "Especially relevant in Argentina and Mexico."],
  ["PSE", "Bank transfer", "Colombia", "Core Colombia bank-transfer method.", "PayU; dLocal; EBANX; Mercado Pago", "Status sync and refunds should be tested."],
  ["Nequi / Daviplata", "Mobile wallet", "Colombia", "Popular mobile wallet behavior.", "PayU; dLocal; EBANX; Mercado Pago", "Requires local checkout support."],
  ["Rapipago / Pago Facil", "Cash voucher", "Argentina", "Cash/local voucher coverage.", "Mercado Pago; dLocal; EBANX; PayU", "Macro/FX risk dominates."],
  ["Bizum", "Bank wallet", "Spain", "Spanish local bank-wallet habit.", "Local PSPs; Adyen/Stripe routes where available", "Add after Spain is a serious target."],
  ["SEPA", "Bank transfer/direct debit", "EU", "EU bank payment infrastructure.", "Stripe; Adyen; PayPal/Braintree", "Different authorization/refund timing."],
  ["Klarna / Affirm / Afterpay", "BNPL", "US, UK/EU, AU/NZ", "Can improve AOV conversion.", "Klarna; Affirm; Afterpay; Shopify; Stripe", "Only after margin and returns are known."],
  ["Konbini", "Convenience-store payment", "Japan", "Japan localized checkout expectation.", "KOMOJU; Stripe Japan; Adyen", "Delayed payment and Japanese instructions."],
  ["PayPay", "Mobile wallet", "Japan", "Important Japan wallet option.", "KOMOJU; Adyen/local PSPs", "Needs localized product and checkout copy."],
  ["UPI", "Real-time bank payment", "India", "India online payment core.", "Razorpay; PayU India; Cashfree; PhonePe", "Often requires local entity/partner."],
  ["Interac", "Debit/transfer", "Canada", "Local Canadian payment behavior.", "Stripe/Adyen/local processors depending setup", "Useful for CAD-localized checkout."],
  ["COD", "Cash on delivery", "India, Colombia, Japan in some contexts", "Trust booster in lower-card-trust markets.", "Local logistics/marketplace", "High refusal and return risk; avoid for first DTC tests."]
];

const sellerRows = [
  ["US-first DTC", "Shopify Payments + PayPal + Shop Pay/Apple Pay", "When testing product demand with ads", "Keep checkout boring and trustworthy; optimize landing offer first."],
  ["Spanish LatAm test", "Mercado Pago or dLocal/EBANX + cards + OXXO/SPEI/PSE by country", "Mexico/Chile/Colombia tests", "Do not rely only on international cards."],
  ["Brazil test", "EBANX or dLocal + Pix + cards/installments + Boleto", "Brazil-specific launch", "Treat Brazil as its own market, not a Spanish-market add-on."],
  ["Marketplace-first LatAm", "Mercado Libre + Mercado Pago", "Argentina or low-trust LatAm tests", "Use platform trust before building standalone DTC."],
  ["Seller payout stack", "Airwallex/Revolut + Payoneer/WorldFirst/PingPong backup", "Multiple platforms and currencies", "Redundancy prevents one account review from stopping cash flow."],
  ["UK/EU business account + checkout backup", "Revolut Business + Stripe/Shopify + PayPal", "UK/EU/AU entity wants FX plus payment acceptance in one account", "Treat Revolut as add-on/secondary PSP until payment volume and risk controls are proven."],
  ["Supplier payments", "WorldFirst / Airwallex / Wise / LianLian / PingPong", "Paying Chinese suppliers from overseas sales", "Compare FX spread, transfer limits, and supplier acceptance."],
  ["EU launch", "Stripe/Shopify + PayPal + Klarna/SEPA + IOSS/VAT process", "Spain/Germany/EU expansion", "Compliance and returns matter more than adding every payment method."],
  ["Japan launch", "KOMOJU or Stripe Japan + cards + Konbini + PayPay", "Japan-specific product-market fit", "No Japan payment stack can rescue poor localization."],
  ["India launch", "Local PSP such as Razorpay/PayU/Cashfree + UPI", "Only with local partner/entity", "COD and logistics must be operationally modeled first."]
];

const sourceRows = [
  ["S01", "Stripe payment methods overview", "Payment methods and availability concepts.", "https://docs.stripe.com/payments/payment-methods/overview"],
  ["S02", "Shopify Payments supported countries", "Where Shopify Payments is available.", "https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries"],
  ["S03", "PayPal Checkout", "Merchant checkout product.", "https://www.paypal.com/us/business/accept-payments/checkout"],
  ["S04", "Adyen payment methods", "Global/local payment method catalog.", "https://www.adyen.com/payment-methods"],
  ["S05", "dLocal payment methods", "Emerging-market local payment method coverage.", "https://www.dlocal.com/payment-methods/"],
  ["S06", "EBANX payment methods", "LatAm payment methods including Pix/OXXO/SPEI/PSE categories.", "https://business.ebanx.com/en/payment-methods"],
  ["S07", "Mercado Pago Developers", "Mercado Pago online payments documentation.", "https://www.mercadopago.com/developers/en/docs"],
  ["S09", "Conekta payment methods", "Mexico payment method documentation.", "https://developers.conekta.com/docs/payment-methods"],
  ["S10", "PayU Latam docs", "LatAm payment integration docs.", "https://docs.payulatam.com/docs/integration-overview"],
  ["S11", "KOMOJU payment methods", "Japan local payment methods.", "https://komoju.com/payment-methods/"],
  ["S12", "Razorpay payment methods", "India payment method documentation.", "https://razorpay.com/docs/payments/payment-methods/"],
  ["S13", "Airwallex global accounts", "Multi-currency business account product.", "https://www.airwallex.com/us/business-account/global-accounts"],
  ["S14", "Payoneer marketplace payments", "Marketplace payout and seller payment product.", "https://www.payoneer.com/solutions/marketplace-payments/"],
  ["S15", "WorldFirst marketplace solutions", "Marketplace collection and global account product.", "https://www.worldfirst.com/global/solution/marketplaces/"],
  ["S16", "PingPong marketplace/platform solutions", "Cross-border platform and marketplace payment services.", "https://www.international.pingpongx.com/solutions/marketplace-platforms"],
  ["S17", "LianLian Global", "Global payment and merchant services.", "https://www.lianlianglobal.com/"],
  ["S18", "Trade.gov Mexico ecommerce", "Mexico ecommerce and payment context.", "https://www.trade.gov/country-commercial-guides/mexico-ecommerce"],
  ["S19", "Trade.gov Chile ecommerce", "Chile ecommerce and payment context.", "https://www.trade.gov/country-commercial-guides/chile-ecommerce"],
  ["S20", "Trade.gov Colombia ecommerce", "Colombia ecommerce and payment context.", "https://www.trade.gov/country-commercial-guides/colombia-ecommerce"],
  ["S21", "Trade.gov Argentina ecommerce", "Argentina ecommerce and payment context.", "https://www.trade.gov/country-commercial-guides/argentina-ecommerce"],
  ["S22", "Trade.gov Brazil ecommerce", "Brazil ecommerce and payment context.", "https://www.trade.gov/country-commercial-guides/brazil-ecommerce"],
  ["S23", "Trade.gov India ecommerce", "India ecommerce and payment context.", "https://www.trade.gov/country-commercial-guides/india-ecommerce"],
  ["S24", "Wise Business", "Multi-currency business account and transfer product.", "https://wise.com/us/business/"],
  ["S25", "WorldFirst 1688/source workflows", "Supplier payment context for China sourcing.", "https://www.worldfirst.com/global/"],
  ["S26", "European Commission VAT ecommerce/IOSS", "EU ecommerce VAT/import scheme context.", "https://taxation-customs.ec.europa.eu/vat-e-commerce_en"],
  ["S27", "European Commission GPSR", "EU product safety obligations.", "https://commission.europa.eu/business-economy-euro/product-safety-and-requirements/product-safety/general-product-safety-regulation_en"],
  ["S28", "Checkout.com", "Enterprise online payment platform.", "https://www.checkout.com/"],
  ["S29", "Klarna business", "BNPL/payment product context.", "https://www.klarna.com/us/business/"],
  ["S30", "Trade.gov Australia ecommerce", "Australia ecommerce context.", "https://www.trade.gov/country-commercial-guides/australia-ecommerce"],
  ["S31", "Revolut Business multi-currency accounts", "Multi-currency business account, FX, supplier/customer payment context.", "https://www.revolut.com/business/multi-currency-accounts/"],
  ["S32", "Revolut Business accept payments", "Merchant account, payment gateway, settlement, and Revolut Pay context.", "https://www.revolut.com/business/accept-payments/"],
  ["S33", "Revolut Merchant API", "Online payment methods, widgets, hosted checkout, and plugins.", "https://developer.revolut.com/docs/accept-payments/"],
  ["S34", "Revolut merchant eligibility", "Supported merchant account countries and eligibility constraints.", "https://help.revolut.com/help/merchant-accounts/setting-up-a-merchant-account/who-can-apply-for-a-merchant-account/business/"]
];

const wb = Workbook.create();
const dashboard = wb.worksheets.add("Dashboard");
const countries = wb.worksheets.add("Country Matrix");
const providers = wb.worksheets.add("Provider Matrix");
const methods = wb.worksheets.add("Payment Methods");
const sellerStack = wb.worksheets.add("Seller Stack");
const sources = wb.worksheets.add("Sources");

const write = (sheet, range, values) => { sheet.getRange(range).values = values; };
const formula = (sheet, range, values) => { sheet.getRange(range).formulas = values; };
const title = (sheet, range) => {
  sheet.getRange(range).format = {
    fill: "#111827",
    font: { color: "#FFFFFF", bold: true, size: 16 },
    wrapText: true,
    verticalAlignment: "center"
  };
};
const section = (sheet, range) => {
  sheet.getRange(range).format = {
    fill: "#E0F2FE",
    font: { color: "#075985", bold: true },
    wrapText: true,
    verticalAlignment: "center"
  };
};
const header = (sheet, range) => {
  sheet.getRange(range).format = {
    fill: "#1F4E79",
    font: { color: "#FFFFFF", bold: true },
    wrapText: true,
    horizontalAlignment: "center",
    verticalAlignment: "center",
    borders: { preset: "outside", style: "thin", color: "#D1D5DB" }
  };
};
const body = (sheet, range) => {
  sheet.getRange(range).format = {
    font: { name: "Calibri", size: 10, color: "#111827" },
    wrapText: true,
    verticalAlignment: "top",
    borders: { preset: "outside", style: "thin", color: "#E5E7EB" }
  };
};

write(dashboard, "A1:H1", [["Cross-Border Ecommerce Payment Matrix", "", "", "", "", "", "", ""]]);
dashboard.getRange("A1:H1").merge();
title(dashboard, "A1:H1");
write(dashboard, "A2:H2", [["Use case", "Pick next market and payment stack", "Product type", "Small consumer goods", "Updated", "2026-05-22", "Owner", "Fred"]]);
write(dashboard, "A4:B9", [
  ["KPI", "Value"],
  ["Countries/regions", ""],
  ["Providers/products", ""],
  ["Payment methods", ""],
  ["Tier 1 countries", ""],
  ["High-risk countries", ""]
]);
formula(dashboard, "B5:B9", [
  ["=COUNTA('Country Matrix'!A2:A50)"],
  ["=COUNTA('Provider Matrix'!A2:A80)"],
  ["=COUNTA('Payment Methods'!A2:A80)"],
  ["=COUNTIF('Country Matrix'!B2:B50,\"Tier 1 Spanish\")+COUNTIF('Country Matrix'!B2:B50,\"Tier 1 LatAm scale\")+COUNTIF('Country Matrix'!B2:B50,\"Tier 1 English\")+COUNTIF('Country Matrix'!B2:B50,\"Tier 1 English extension\")+COUNTIF('Country Matrix'!B2:B50,\"Tier 1 Spanish + EU\")"],
  ["=COUNTIF('Country Matrix'!K2:K50,\"High\")+COUNTIF('Country Matrix'!K2:K50,\"Medium-High\")"]
]);
write(dashboard, "D4:H4", [["Top Country/Region", "Priority", "Score", "Recommended First Stack", "Next Action"]]);
formula(dashboard, "D5:H12", Array.from({ length: 8 }, (_, i) => [
  `=IFERROR(INDEX('Country Matrix'!$A$2:$A$50,MATCH(${i + 1},'Country Matrix'!$N$2:$N$50,0)),"")`,
  `=IF(D${i + 5}="","",INDEX('Country Matrix'!$B$2:$B$50,MATCH(D${i + 5},'Country Matrix'!$A$2:$A$50,0)))`,
  `=IF(D${i + 5}="","",INDEX('Country Matrix'!$C$2:$C$50,MATCH(D${i + 5},'Country Matrix'!$A$2:$A$50,0)))`,
  `=IF(D${i + 5}="","",INDEX('Country Matrix'!$I$2:$I$50,MATCH(D${i + 5},'Country Matrix'!$A$2:$A$50,0)))`,
  `=IF(D${i + 5}="","",INDEX('Country Matrix'!$L$2:$L$50,MATCH(D${i + 5},'Country Matrix'!$A$2:$A$50,0)))`
]));
write(dashboard, "A14:H14", [["Working Rule", "", "", "", "", "", "", ""]]);
dashboard.getRange("A14:H14").merge();
section(dashboard, "A14:H14");
write(dashboard, "A15:H18", [
  ["1", "Buyer checkout", "Cards/wallets/local methods at purchase time.", "Example", "Stripe, Shopify Payments, Mercado Pago, dLocal, EBANX", "", "", ""],
  ["2", "Local rails", "OXXO, SPEI, Pix, PSE, Konbini, UPI, SEPA, Bizum.", "Rule", "A country is not ready until its must-have local rail is covered.", "", "", ""],
  ["3", "Seller settlement", "Marketplace payouts, multi-currency accounts, FX, supplier payments.", "Example", "Airwallex, Revolut, Payoneer, WorldFirst, PingPong, LianLian, Wise", "", "", ""],
  ["4", "Fred default", "US benchmark, then Mexico/Chile; Brazil as its own model; Spain/EU only after compliance.", "", "", "", "", ""]
]);
header(dashboard, "A4:B4");
header(dashboard, "D4:H4");
body(dashboard, "A2:H18");
dashboard.getRange("A:A").format.columnWidthPx = 150;
dashboard.getRange("B:B").format.columnWidthPx = 240;
dashboard.getRange("D:D").format.columnWidthPx = 180;
dashboard.getRange("E:E").format.columnWidthPx = 150;
dashboard.getRange("F:F").format.columnWidthPx = 90;
dashboard.getRange("G:G").format.columnWidthPx = 330;
dashboard.getRange("H:H").format.columnWidthPx = 260;
dashboard.freezePanes.freezeRows(1);

write(countries, "A1:N1", [[
  "Country / Region", "Priority", "Score", "Language", "Small-Goods Opportunity", "Buyer Must-Have Payment Methods", "Checkout Companies / Products", "Seller Settlement / FX", "Recommended First Stack", "Key Risks", "Risk Level", "Next Validation Action", "Source IDs", "Rank"
]]);
write(countries, `A2:M${countryRows.length + 1}`, countryRows);
formula(countries, `N2:N${countryRows.length + 1}`, countryRows.map((_, i) => [`=COUNTIF($C$2:$C$${countryRows.length + 1},">"&C${i + 2})+COUNTIF($C$2:C${i + 2},C${i + 2})`]));
header(countries, "A1:N1");
body(countries, `A2:N${countryRows.length + 1}`);
countries.getRange(`C2:C${countryRows.length + 1}`).format.numberFormat = "0";
countries.getRange(`C2:C${countryRows.length + 1}`).conditionalFormats.add("colorScale", {
  criteria: [
    { type: "lowestValue", color: "#FCA5A5" },
    { type: "percentile", value: 50, color: "#FDE68A" },
    { type: "highestValue", color: "#86EFAC" }
  ]
});
countries.getRange(`K2:K${countryRows.length + 1}`).conditionalFormats.add("containsText", { text: "High", format: { fill: "#FEE2E2", font: { color: "#991B1B", bold: true } } });
countries.getRange(`K2:K${countryRows.length + 1}`).conditionalFormats.add("containsText", { text: "Low", format: { fill: "#DCFCE7", font: { color: "#166534", bold: true } } });
countries.getRange("A:A").format.columnWidthPx = 180;
countries.getRange("B:B").format.columnWidthPx = 150;
countries.getRange("C:D").format.columnWidthPx = 90;
countries.getRange("E:J").format.columnWidthPx = 290;
countries.getRange("K:K").format.columnWidthPx = 120;
countries.getRange("L:L").format.columnWidthPx = 280;
countries.getRange("M:M").format.columnWidthPx = 130;
countries.getRange("N:N").format.columnWidthPx = 70;
countries.freezePanes.freezeRows(1);
countries.freezePanes.freezeColumns(2);

write(providers, "A1:G1", [["Company / Product", "Layer", "Best-Fit Markets", "What It Solves", "When To Use First", "Watch-Outs", "Source IDs"]]);
write(providers, `A2:G${providerRows.length + 1}`, providerRows);
header(providers, "A1:G1");
body(providers, `A2:G${providerRows.length + 1}`);
providers.getRange("A:A").format.columnWidthPx = 230;
providers.getRange("B:B").format.columnWidthPx = 160;
providers.getRange("C:F").format.columnWidthPx = 280;
providers.getRange("G:G").format.columnWidthPx = 110;
providers.freezePanes.freezeRows(1);
providers.freezePanes.freezeColumns(1);

write(methods, "A1:F1", [["Payment Method", "Layer", "Important Countries", "Why It Matters", "Providers", "Operational Note"]]);
write(methods, `A2:F${methodRows.length + 1}`, methodRows);
header(methods, "A1:F1");
body(methods, `A2:F${methodRows.length + 1}`);
methods.getRange("A:A").format.columnWidthPx = 220;
methods.getRange("B:B").format.columnWidthPx = 140;
methods.getRange("C:F").format.columnWidthPx = 280;
methods.freezePanes.freezeRows(1);
methods.freezePanes.freezeColumns(1);

write(sellerStack, "A1:D1", [["Use Case", "Recommended Company / Product Stack", "Best When", "Notes"]]);
write(sellerStack, `A2:D${sellerRows.length + 1}`, sellerRows);
header(sellerStack, "A1:D1");
body(sellerStack, `A2:D${sellerRows.length + 1}`);
sellerStack.getRange("A:A").format.columnWidthPx = 190;
sellerStack.getRange("B:D").format.columnWidthPx = 330;
sellerStack.freezePanes.freezeRows(1);

write(sources, "A1:D1", [["Source ID", "Source", "Use", "URL"]]);
write(sources, `A2:D${sourceRows.length + 1}`, sourceRows);
header(sources, "A1:D1");
body(sources, `A2:D${sourceRows.length + 1}`);
sources.getRange("A:A").format.columnWidthPx = 90;
sources.getRange("B:B").format.columnWidthPx = 280;
sources.getRange("C:C").format.columnWidthPx = 340;
sources.getRange("D:D").format.columnWidthPx = 520;
sources.freezePanes.freezeRows(1);

for (const sheet of [dashboard, countries, providers, methods, sellerStack, sources]) {
  sheet.getRange("A1:Z1").format.rowHeightPx = 38;
}

try {
  const chart = dashboard.charts.add("ColumnClustered", {
    title: "Top Market Priority Scores",
    categories: Array.from({ length: 8 }, (_, i) => `=Dashboard!D${i + 5}`),
    series: [{ name: "Score", values: Array.from({ length: 8 }, (_, i) => `=Dashboard!F${i + 5}`) }],
    hasLegend: false,
    dataLabels: { showValue: true, position: "outEnd" },
    from: { row: 20, col: 0 },
    extent: { widthPx: 760, heightPx: 300 }
  });
  chart.titleTextStyle.fontSize = 14;
} catch {}

await fs.mkdir(outputDir, { recursive: true });
console.log((await wb.inspect({ kind: "table", range: "Dashboard!A1:H18", include: "values,formulas", tableMaxRows: 18, tableMaxCols: 8 })).ndjson);
console.log((await wb.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 300 }, summary: "formula error scan" })).ndjson);
for (const sheetName of ["Dashboard", "Country Matrix", "Provider Matrix", "Payment Methods", "Seller Stack", "Sources"]) {
  await wb.render({ sheetName, range: "A1:H20", scale: 1 });
}
const output = await SpreadsheetFile.exportXlsx(wb);
await output.save(outputPath);
console.log(outputPath);
