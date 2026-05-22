# 跨境电商支付：重要国家 x 公司/产品矩阵

更新日期：2026-05-22  
用途：给小件消费品出海选市场时，快速判断“这个国家买家怎么付钱、我该接哪家支付、卖家怎么收款换汇”。

## 一句话结论

如果从美国之外找第二市场，我会优先看：**墨西哥、智利、巴西、西班牙/EU**。

- **墨西哥**：西语市场、离美国近，但不能只接信用卡；OXXO/SPEI/Mercado Pago 很关键。
- **智利**：拉美里相对清晰、购买力和卡支付更友好，适合作为西语小件商品的低复杂度测试场。
- **巴西**：不是西语，但电商体量和 Pix 太重要，不应忽略；需要本地支付和税务预期。
- **西班牙/EU**：购买力和西语优势好，但 VAT/IOSS/GPSR/退货合规明显更重。
- **阿根廷**：有消费需求，但 FX、通胀、进口和本地支付复杂，建议只用 Mercado Pago/本地伙伴/平台先探。

## 国家优先级矩阵

| 国家/地区 | 优先级 | 小件商品机会 | 买家必须支持的付款方式 | 公司/产品候选 | 推荐第一套组合 | 主要风险 | 下一步 |
|---|---:|---|---|---|---|---|---|
| 美国 | 92 | 当前基准市场，广告和 Shopify 生态成熟 | Cards, Apple Pay, Google Pay, PayPal, Shop Pay, BNPL | Shopify Payments, Stripe, PayPal/Braintree, Adyen, Affirm/Klarna | Shopify Payments + PayPal + Shop Pay/Apple Pay + BNPL | 广告贵、退货率、销售税、进口政策变化 | 继续做 benchmark |
| 墨西哥 | 88 | 西语、离美国近、轻小件适合测试 | Cards/debit, OXXO, SPEI, Mercado Pago, BNPL | dLocal, EBANX, Mercado Pago, Conekta, Stripe Mexico, PayPal | Mercado Pago 或 dLocal/EBANX + Cards + OXXO/SPEI | 现金券延迟、退款体验、进口税和本地税 | 西语第一优先 |
| 巴西 | 86 | 拉美最大级别机会，Pix 改变转化 | Pix, cards/installments, Boleto, Mercado Pago | EBANX, dLocal, Mercado Pago, Adyen, Stripe Brazil | Pix + cards/installments + Boleto | 葡语、本地税、CPF、进口税、物流 | 值得单独做葡语测试 |
| 智利 | 84 | 西语、购买力较好、市场更稳定 | Cards/debit, Webpay/Transbank, Mercado Pago, bank transfer | Mercado Pago, dLocal, EBANX, PayPal, local PSPs | Cards/Webpay + Mercado Pago + local transfer | 市场小于墨西哥/巴西、跨境税费 | 西语低复杂度测试 |
| 加拿大 | 82 | 英语市场延伸，信任和客单价好 | Cards, PayPal, Interac, wallets, BNPL | Shopify Payments, Stripe, PayPal, Adyen, Klarna/Affirm | Shopify Payments + PayPal + local currency CAD | Quebec 法语、本地税、物流成本 | 美国验证后复制 |
| 英国 | 80 | 英语高购买力，DTC 习惯成熟 | Cards, PayPal, Apple/Google Pay, Revolut Pay, Klarna/Clearpay, Open Banking | Stripe, Shopify Payments, PayPal, Adyen, Checkout.com, Revolut Business | Stripe/Shopify + PayPal + Klarna/Clearpay；Revolut 作 FX/merchant add-on | VAT、退货、UK product safety | 英语第二梯队 |
| 澳大利亚/新西兰 | 78 | 英语、高客单，但离中国物流远 | Cards, PayPal, Apple/Google Pay, Afterpay, PayTo/PayID | Stripe, Shopify Payments, PayPal, Adyen, Afterpay, Revolut Business (AU) | Shopify/Stripe + PayPal + Afterpay；AU 可评估 Revolut | 运费、GST、退货距离 | 适合轻小高毛利品 |
| 西班牙/EU | 78 | 西语 + EU 购买力，但合规重 | Cards/debit, PayPal, Apple/Google Pay, Revolut Pay, Bizum, SEPA, Klarna | Stripe, Shopify Payments, PayPal, Adyen, Klarna, Revolut Business, local PSPs | Stripe/Shopify + PayPal + Bizum/SEPA/Klarna；Revolut 作 EU 收款/换汇/checkout add-on | VAT/IOSS、GPSR、退货、语言客服 | 做之前先整理 EU 合规 |
| 哥伦比亚 | 76 | 西语、移动钱包和银行转账重要 | PSE, cards/debit, Nequi, Daviplata, Mercado Pago, cash vouchers | dLocal, EBANX, PayU, Mercado Pago | PSE + cards + wallet/cash options | 物流、COD/现金风险、退款信任 | 作为西语第二批 |
| 德国/DACH | 74 | EU 大市场，支付习惯和信任门槛独特 | PayPal, invoice/BNPL, SEPA, cards, Klarna, Revolut Pay | Adyen, Stripe, PayPal, Klarna, Shopify Payments, Revolut Business | PayPal + cards + SEPA/Klarna；Revolut 可作 EU 资金账户和支付补充 | 德语、本地退货预期、EU 合规 | EU 能力成熟后进入 |
| 日本 | 70 | 高客单、品质导向，但本地化要求高 | Cards, Konbini, PayPay, bank transfer, carrier billing | Stripe, Shopify Payments, KOMOJU, PayPal, Adyen | Cards + PayPay + Konbini | 日语客服、SCTA 展示、退货/品质 | 只有强品类 fit 再做 |
| 阿根廷 | 62 | 有消费需求和电商习惯，但宏观复杂 | Mercado Pago, cards/cuotas, bank transfer, Rapipago/Pago Facil | Mercado Pago, dLocal, EBANX, PayU | Mercado Pago first | 汇率、通胀、进口限制、价格更新频繁 | 不做独立第一站 |
| 印度 | 58 | 巨大市场，但不是轻松跨境 DTC 起点 | UPI, cards, netbanking, wallets, COD | Razorpay, PayU, Cashfree, PhonePe, Stripe India | Local PSP + UPI + cards | 本地实体/监管、COD、低 AOV、物流 | 需要本地伙伴 |
| 中国/香港卖家侧 | 75 | 不是目标买家市场，而是收款/换汇/付供应商层 | Marketplace payouts, multi-currency account, supplier payments | Airwallex, Payoneer, WorldFirst, PingPong, LianLian Global, Wise Business | 一个主收款账户 + 一个备用账户 + 供应商付款通道 | KYC、账户冻结、FX、平台文件 | 尽早搭双账户冗余 |

## 公司/产品矩阵

| 公司/产品 | 属于哪一层 | 最适合国家/场景 | 解决什么问题 | 什么时候优先用 | 注意点 |
|---|---|---|---|---|---|
| Shopify Payments / Shop Pay | 买家结账 | US, CA, UK, EU, AU/NZ, JP 等支持国家 | 快速上线 DTC checkout、Shop Pay 钱包、卡支付 | Shopify 店第一选择 | 需要符合 Shopify Payments 支持国家和主体要求 |
| Stripe Checkout / Payment Element / Link | 买家结账 + 本地支付 | US, CA, UK, EU, AU/NZ, JP, MX, BR 等 | 一套 API 接 cards、wallets、部分本地支付 | 自建站、预售页、可控 checkout | 各国方法可用性取决于商户主体和 Stripe 覆盖 |
| PayPal Checkout / Braintree | 买家信任 | US, CA, UK, EU, AU/NZ, Japan, LatAm 部分场景 | 解决跨境陌生店信任问题 | 新品牌初期可作为必备备选 | 费率、争议、账户审查要预留 |
| Adyen | 企业级全球收单 | EU, UK, US, LatAm, APAC | 大规模多国家收单、本地方法、风控 | 交易量上来或多国复杂时 | 集成和商务门槛较高 |
| Checkout.com | 企业级全球支付 | UK/EU/US/中东/国际卡强场景 | 高通过率、卡收单、部分 APM | 体量较大、重视授权率时 | 不适合极早期小测试 |
| dLocal | 新兴市场本地支付 | Mexico, Brazil, Colombia, Argentina, Chile 等 | OXXO/SPEI/Pix/PSE/cash/wallet 等本地方式 | 拉美多国一次性接入 | 重点看具体国家、币种、退款和结算条款 |
| EBANX | 拉美本地支付 | Brazil, Mexico, Chile, Colombia, Argentina 等 | Pix, Boleto, OXXO, SPEI, PSE, local cards | 全球商户进入拉美 | 适合跨境商户，但各国功能要逐项确认 |
| Mercado Pago | 钱包 + 本地收单 + 市场信任 | Mexico, Brazil, Argentina, Chile, Colombia | 本地钱包、分期、卡、转账、Mercado Libre 生态 | 阿根廷/墨西哥/智利等西语测试 | 需要看当地账户、结算和平台规则 |
| PayU Latam | 本地支付 | Colombia, Mexico, Argentina 等 | PSE、卡、钱包、本地收单 | 哥伦比亚/PSE 很重要时 | 覆盖按国家不同 |
| Conekta | 墨西哥支付 | Mexico | OXXO、SPEI、cards | 专注墨西哥 DTC 时 | 墨西哥本地要求和结算规则要查清 |
| KOMOJU | 日本本地支付 | Japan | Konbini, PayPay, cards, bank transfer | 日本独立站认真做时 | 需要日语页面和售后配套 |
| Razorpay / Cashfree / PayU India | 印度本地支付 | India | UPI, cards, netbanking, wallets | 只有印度本地伙伴/主体时 | 监管和主体要求强 |
| Klarna / Affirm / Afterpay | BNPL | US, UK/EU, AU/NZ 等 | 提高中高客单价转化 | AOV > $50 且退货可控时 | 退货、坏账、费用、广告合规 |
| Revolut Business / Revolut Pay / Merchant Account | 卖家收款 + 买家结账补充 | UK/EU/Spain/Germany/Australia/Singapore；有受支持主体的卖家 | 多币种账户、FX、merchant account、Revolut Pay、gateway/plugins | UK/EU/AU 主体想把收款、换汇和部分 checkout 放在一个账户时 | Merchant account 支持国家有限；拉美本地支付不是它的强项；不要早期当唯一 PSP |
| Airwallex | 卖家收款/换汇/全球账户 | 跨境 DTC、平台收款、供应商付款 | 多币种账户、FX、卡、收付款 | 需要收 USD/EUR/GBP 并付供应链 | KYC 和合规资料要准备 |
| Payoneer | 平台卖家收款 | Amazon, Walmart, eBay, Mercado Libre 等平台卖家 | 平台收款、提款、供应商付款 | 先做 marketplace 或多平台 | 费用、冻结、平台绑定规则 |
| WorldFirst | 平台收款 + 供应链付款 | Amazon/eBay/Shopee/Lazada/1688 相关 | 多币种收款、付供应商 | 中国供应链和 marketplace 结合时 | 国家/平台覆盖要逐项核对 |
| PingPong | 跨境平台收款 | Amazon、平台卖家、多币种收款 | 收款、换汇、供应商付款 | 中国跨境卖家常用备选 | 作为备份账户也有价值 |
| LianLian Global | 跨境收款/付款 | 中国卖家、平台收款、本地收单部分场景 | 全球收款、付款、资金管理 | 中国主体卖家需要多通道时 | 具体国家和平台支持要核对 |
| Wise Business | 多币种账户/转账 | US/EU/UK/AU 等收付款 | 低成本换汇和国际转账 | 辅助账户、供应商付款 | 不是完整 checkout PSP |

## 支付方式矩阵

| 支付方式 | 重点国家 | 为什么重要 | 可接入公司/产品 | 操作注意 |
|---|---|---|---|---|
| Cards / Debit cards | 全球基线 | 最基础的线上支付方式 | Stripe, Shopify Payments, PayPal/Braintree, Adyen, Checkout.com | 注意 3DS、欺诈、拒付 |
| Apple Pay / Google Pay / Shop Pay / Link | US, CA, UK, EU, AU/NZ | 减少表单输入，提高移动端转化 | Shopify, Stripe, Adyen, PayPal | 通常作为 cards 上层钱包 |
| PayPal | US, CA, UK, EU, AU/NZ, JP | 跨境陌生品牌信任工具 | PayPal Checkout, Braintree, Shopify | 要管理争议和账户审查 |
| Revolut Pay | UK/EU、部分 Revolut 用户密集市场 | 对 Revolut 用户是低摩擦 checkout，也可配合 Revolut Business 结算 | Revolut Business Merchant Account / Revolut Gateway | 适合作为 UK/EU add-on，不是 Mexico/Brazil 等本地支付替代品 |
| OXXO / Paynet cash voucher | Mexico | 覆盖现金偏好和未充分银行化用户 | dLocal, EBANX, Conekta, Stripe Mexico | 付款有延迟，库存预留要谨慎 |
| SPEI | Mexico | 即时/银行转账场景 | dLocal, EBANX, Conekta, Stripe Mexico | 对账和退款体验要设计好 |
| Pix | Brazil | 巴西实时支付主流，转化很关键 | EBANX, dLocal, Mercado Pago, Stripe, Adyen | 需要清晰 QR/过期时间/退款流程 |
| Boleto | Brazil | 现金/银行券支付习惯仍有覆盖价值 | EBANX, dLocal, Stripe Brazil | 付款延迟，不适合强库存锁定 |
| Mercado Pago wallet/account money | LatAm | 本地信任、钱包余额、分期生态 | Mercado Pago | 尤其阿根廷/墨西哥/智利值得看 |
| PSE | Colombia | 哥伦比亚银行转账核心方式 | PayU, dLocal, EBANX, Mercado Pago | 退款和状态同步要核对 |
| Nequi / Daviplata | Colombia | 移动钱包用户触达 | PayU, dLocal, EBANX, Mercado Pago | 适合本地化 checkout |
| Rapipago / Pago Facil | Argentina | 现金券/本地支付覆盖 | Mercado Pago, dLocal, EBANX, PayU | 宏观和汇率风险比支付本身更大 |
| Bizum | Spain | 西班牙本地银行钱包 | Local PSPs, Adyen/Stripe routes where available | 适合西班牙本地化后再加 |
| SEPA | EU | 银行转账/扣款基础设施 | Stripe, Adyen, PayPal/Braintree | 退款、授权和到账时效不同 |
| Klarna / Affirm / Afterpay | US, UK/EU, AU/NZ | 中高客单价分期提升转化 | Klarna, Affirm, Afterpay, Shopify, Stripe | 先确认退货率和毛利 |
| Konbini | Japan | 便利店支付习惯 | KOMOJU, Stripe Japan, Adyen | 付款延迟和日语指引很重要 |
| PayPay | Japan | 日本移动钱包 | KOMOJU, Adyen/local PSPs | 需要本地化页面 |
| UPI | India | 印度线上支付核心 | Razorpay, PayU India, Cashfree, PhonePe | 通常需要本地实体/合规配套 |
| Interac | Canada | 加拿大本地借记/转账习惯 | Stripe/Adyen/local processors depending setup | 适合 CAD 本地化 |
| COD | India, Colombia, Japan 部分场景 | 提升信任，但运营成本高 | Local logistics/marketplace | 高拒收、高退货，不建议早期跨境 DTC |

## 推荐打法

1. **美国继续做基准**：Shopify Payments + PayPal，测广告/加购/预售。
2. **西语第一步看墨西哥 + 智利**：先用 Mercado Pago 或 dLocal/EBANX 类聚合方案，不要只开国际信用卡。
3. **巴西单独建模**：Pix 是关键；葡语页面、税费、物流、CPF/地址体验要独立考虑。
4. **阿根廷不要独立硬打**：先用 Mercado Pago/平台/本地伙伴观察真实付款意愿。
5. **EU/西班牙先查合规再投放**：支付不是最大问题，VAT/IOSS/GPSR/退货/消费者权益才是复杂度。
6. **Revolut 要放进 UK/EU/AU 工具箱**：更适合作为多币种账户、Revolut Pay 和 merchant add-on；不要把它误判成拉美本地支付方案。
7. **收款账户要冗余**：Airwallex/Revolut/Payoneer/WorldFirst/PingPong/LianLian/Wise 至少主备两套，避免单账户 KYC 或风控卡死现金流。

## Sources

- Stripe payment methods: <https://docs.stripe.com/payments/payment-methods/overview>
- Shopify Payments supported countries: <https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries>
- PayPal merchant checkout: <https://www.paypal.com/us/business/accept-payments/checkout>
- Adyen payment methods: <https://www.adyen.com/payment-methods>
- dLocal payment methods: <https://www.dlocal.com/payment-methods/>
- EBANX payment methods: <https://business.ebanx.com/en/payment-methods>
- Mercado Pago Developers: <https://www.mercadopago.com/developers/en/docs>
- PayU Colombia / LatAm docs: <https://docs.payulatam.com/docs/integration-overview>
- Conekta payment methods: <https://developers.conekta.com/docs/payment-methods>
- KOMOJU payment methods: <https://komoju.com/payment-methods/>
- Razorpay payment methods: <https://razorpay.com/docs/payments/payment-methods/>
- Revolut Business multi-currency accounts: <https://www.revolut.com/business/multi-currency-accounts/>
- Revolut Business accept payments: <https://www.revolut.com/business/accept-payments/>
- Revolut Merchant API: <https://developer.revolut.com/docs/accept-payments/>
- Revolut merchant eligibility: <https://help.revolut.com/help/merchant-accounts/setting-up-a-merchant-account/who-can-apply-for-a-merchant-account/business/>
- Airwallex global accounts: <https://www.airwallex.com/us/business-account/global-accounts>
- Payoneer marketplace payments: <https://www.payoneer.com/solutions/marketplace-payments/>
- WorldFirst marketplace solutions: <https://www.worldfirst.com/global/solution/marketplaces/>
- PingPong marketplace/platform solutions: <https://www.international.pingpongx.com/solutions/marketplace-platforms>
- LianLian Global: <https://www.lianlianglobal.com/>
- Wise Business: <https://wise.com/us/business/>
- Trade.gov Mexico ecommerce guide: <https://www.trade.gov/country-commercial-guides/mexico-ecommerce>
- Trade.gov Chile ecommerce guide: <https://www.trade.gov/country-commercial-guides/chile-ecommerce>
- Trade.gov Colombia ecommerce guide: <https://www.trade.gov/country-commercial-guides/colombia-ecommerce>
- Trade.gov Argentina ecommerce guide: <https://www.trade.gov/country-commercial-guides/argentina-ecommerce>
- Trade.gov Brazil ecommerce guide: <https://www.trade.gov/country-commercial-guides/brazil-ecommerce>
- Trade.gov Australia ecommerce guide: <https://www.trade.gov/country-commercial-guides/australia-ecommerce>
- Trade.gov India ecommerce guide: <https://www.trade.gov/country-commercial-guides/india-ecommerce>
- European Commission VAT ecommerce/IOSS: <https://taxation-customs.ec.europa.eu/vat-e-commerce_en>
- European Commission General Product Safety Regulation: <https://commission.europa.eu/business-economy-euro/product-safety-and-requirements/product-safety/general-product-safety-regulation_en>
