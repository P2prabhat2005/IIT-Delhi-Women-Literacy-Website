/**
 * Project Bharti practical resource library.
 * Original explainers are educational summaries for SHGs and micro enterprises.
 * Scheme pages cite only official Government of India / RBI / NPCI sources.
 */

export const practicalGuides = [
  {
    slug: 'financial-basics',
    categoryLabel: 'Financial Literacy',
    typeLabel: 'Guide',
    kind: 'guide',
    title: 'Women Entrepreneurs: Financial Basics',
    description:
      'A plain-language guide to income, expenses, profit, saving, and simple money records for a small enterprise or SHG activity.',
    meta: 'Project Bharti Guide',
    tags: ['financial literacy', 'budgeting', 'SHG', 'women entrepreneurs'],
    source: null,
    officialLinks: [],
    sections: [
      {
        heading: 'Why these basics matter',
        paragraphs: [
          'A small business can feel busy every day and still leave you unsure whether you made money. Clear money habits help you see what came in, what went out, and what you can safely save or reinvest.',
        ],
      },
      {
        heading: 'Five words to keep separate',
        bullets: [
          'Income: money your enterprise earns from sales or services.',
          'Expense: money spent to run the work (materials, travel, packaging, rent, fees).',
          'Profit: income minus expenses over a period (day, week, or month).',
          'Saving: money set aside from profit for emergencies, family needs, or future business use.',
          'Record: a written note of what happened with money, even if it is only a notebook page.',
        ],
      },
      {
        heading: 'A simple weekly budget',
        paragraphs: [
          'At the start of the week, write three lists: expected sales, planned expenses, and a savings target. At the end of the week, compare the plan with what actually happened.',
        ],
        bullets: [
          'Expected sales: what you hope to sell.',
          'Must-pay expenses: materials, travel, packaging, phone recharge used for business.',
          'Optional expenses: items that can wait if sales are low.',
          'Savings target: even a small fixed amount (for example ₹50–₹200) builds the habit.',
        ],
      },
      {
        heading: 'Daily money questions (2 minutes)',
        bullets: [
          'How much did I sell today?',
          'How much did I spend today, and on what?',
          'Did any customer still owe me money?',
          'Do I still owe anyone for materials?',
          'How much cash or UPI balance do I have for tomorrow’s work?',
        ],
      },
      {
        heading: 'Family money and business money',
        paragraphs: [
          'Wherever possible, keep business cash separate from household cash—even if that means two envelopes, two pouches, or two notes in the same notebook. Mixing them makes profit hard to see and savings easy to lose.',
        ],
      },
      {
        heading: 'What “good records” look like for a micro enterprise',
        bullets: [
          'Date of sale or expense.',
          'What was sold or bought.',
          'Amount in ₹.',
          'Cash or UPI.',
          'Name of customer or supplier, if useful later.',
        ],
      },
    ],
    takeaways: [
      'Profit is not the same as cash in hand.',
      'A short daily record is more useful than a perfect system you cannot maintain.',
      'Small, regular saving is part of enterprise strength, not only a personal habit.',
    ],
  },
  {
    slug: 'product-costing',
    categoryLabel: 'Enterprise Skills',
    typeLabel: 'Worksheet',
    kind: 'worksheet',
    title: 'Product Costing & Pricing: From Cost to Selling Price',
    description:
      'A step-by-step worksheet to move from material, labour, packaging, and overheads to a selling price with margin.',
    meta: 'Project Bharti Worksheet',
    tags: ['costing', 'pricing', 'margin', 'SHG'],
    source: null,
    officialLinks: [],
    sections: [
      {
        heading: 'The pricing path',
        paragraphs: [
          'Selling price should cover your full cost and leave a margin. If price only covers materials, the enterprise can look busy but still lose money.',
        ],
        bullets: [
          'Material cost + labour + packaging + overheads = Total cost',
          'Total cost + margin = Selling price',
        ],
      },
      {
        heading: 'What to include in cost',
        bullets: [
          'Materials: raw materials used for one unit (or one batch, then divided).',
          'Labour: your time and helpers’ time valued in ₹ (even if unpaid today).',
          'Packaging: bags, boxes, labels, bottles.',
          'Overheads: shared costs such as fuel/travel for market days, electricity for machines, stall fee, phone data used for orders. Divide these across units sold in the period.',
        ],
      },
      {
        heading: 'Worked example (pickle jar)',
        paragraphs: [
          'This example uses simple round figures for learning. Replace them with your real costs.',
        ],
        example: {
          title: 'Cost for 1 jar',
          rows: [
            { label: 'Materials (vegetables, oil, spices)', amount: '₹40' },
            { label: 'Labour (your time for this jar)', amount: '₹15' },
            { label: 'Packaging (jar + label)', amount: '₹10' },
            { label: 'Overheads (share of travel/fuel/data)', amount: '₹5' },
            { label: 'Total cost', amount: '₹70', emphasize: true },
            { label: 'Margin (about 20% of cost)', amount: '₹14' },
            { label: 'Selling price', amount: '₹84', emphasize: true },
          ],
        },
      },
      {
        heading: 'How to choose margin',
        paragraphs: [
          'Margin is the cushion above cost. A common learning method is to start with 15–30% of total cost, then check whether buyers in your market will pay that price. If the market price is lower, first reduce waste or cost before cutting margin to zero.',
        ],
      },
      {
        heading: 'Quick checklist before you fix a price',
        bullets: [
          'Did I count my own labour?',
          'Did I include packaging and travel/stall costs?',
          'If I sell 10 units, does the total margin cover a bad-sales day?',
          'Is the price written clearly for customers?',
        ],
      },
    ],
    takeaways: [
      'Price below full cost quietly drains the enterprise.',
      'Labour and overheads are real costs, even when they are not paid as cash bills every day.',
      'Re-check costs when material prices change.',
    ],
  },
  {
    slug: 'cash-flow',
    categoryLabel: 'Financial Literacy',
    typeLabel: 'Guide',
    kind: 'guide',
    title: 'Cash Flow vs Profit',
    description:
      'A simple explanation of why a business can show profit on paper and still run short of cash for materials or repayment.',
    meta: 'Project Bharti Guide',
    tags: ['cash flow', 'profit', 'working capital'],
    source: null,
    officialLinks: [],
    sections: [
      {
        heading: 'Two different questions',
        bullets: [
          'Profit asks: Over this period, did income exceed expenses?',
          'Cash flow asks: Do I have enough money available today to pay what must be paid?',
        ],
      },
      {
        heading: 'Small-business example',
        paragraphs: [
          'Meena makes cloth bags. In one month she sells bags worth ₹10,000. Her costs for materials and other expenses are ₹7,000. On paper, profit is ₹3,000.',
          'But ₹4,000 of sales were on credit to a shopkeeper who will pay next month. She already paid ₹7,000 in cash for materials. So this month her cash went out faster than cash came in.',
        ],
        example: {
          title: 'Same month, two views',
          rows: [
            { label: 'Sales (including credit sales)', amount: '₹10,000' },
            { label: 'Expenses', amount: '₹7,000' },
            { label: 'Profit on paper', amount: '₹3,000', emphasize: true },
            { label: 'Cash received this month', amount: '₹6,000' },
            { label: 'Cash paid this month', amount: '₹7,000' },
            { label: 'Cash shortage this month', amount: '₹1,000', emphasize: true },
          ],
        },
      },
      {
        heading: 'Common reasons cash runs short',
        bullets: [
          'Customers pay late while suppliers want cash now.',
          'You buy stock in bulk before festival sales.',
          'Loan EMI or group savings contribution falls due before money comes in.',
          'Household needs temporarily use business cash.',
        ],
      },
      {
        heading: 'Practical habits that protect cash',
        bullets: [
          'Track money owed to you and money you owe separately.',
          'Before a large purchase, ask: When will cash return?',
          'Keep a small cash buffer for materials and unexpected costs.',
          'Do not treat unpaid customer dues as money you can spend today.',
        ],
      },
    ],
    takeaways: [
      'Profit is a result over time; cash is what you can use today.',
      'Credit sales can create profit and cash pressure at the same time.',
      'Plan purchases around when money actually arrives.',
    ],
  },
  {
    slug: 'record-keeping',
    categoryLabel: 'Enterprise Skills',
    typeLabel: 'Checklist',
    kind: 'checklist',
    title: 'Business Record-Keeping: The 5-Minute Daily System',
    description:
      'A short daily structure for sales, expenses, money received, money owed, and stock/purchases—usable by a home enterprise or SHG unit.',
    meta: 'Project Bharti Checklist',
    tags: ['record keeping', 'SHG', 'checklist'],
    source: null,
    officialLinks: [],
    sections: [
      {
        heading: 'What you need',
        bullets: [
          'One notebook (or one phone notes page) used only for business.',
          'A fixed time each day (for example after evening sales).',
          'Honest entries—even small amounts.',
        ],
      },
      {
        heading: 'Five lines to write every day',
        bullets: [
          'Sales today: what was sold and total ₹.',
          'Expenses today: what was bought/spent and total ₹.',
          'Money received: cash/UPI that actually came in today.',
          'Money owed: customers who still need to pay; suppliers you still need to pay.',
          'Stock/purchases: key materials finished, remaining, or newly bought.',
        ],
      },
      {
        heading: 'Sample notebook page',
        example: {
          title: 'Date: 14 Aug',
          rows: [
            { label: 'Sales', amount: '12 soaps × ₹30 = ₹360' },
            { label: 'Expenses', amount: 'Oil ₹80 + travel ₹20 = ₹100' },
            { label: 'Money received', amount: 'Cash ₹260 + UPI ₹100' },
            { label: 'Money owed to me', amount: 'Rina (shop) ₹100' },
            { label: 'I owe', amount: 'Packaging supplier ₹50' },
            { label: 'Stock note', amount: 'Oil left for ~3 days' },
          ],
        },
      },
      {
        heading: 'Weekly 10-minute review',
        bullets: [
          'Add seven days of sales and expenses.',
          'List unpaid customer dues and follow up politely.',
          'Check whether stock will last for next week’s orders.',
          'Move a planned savings amount, if any, out of daily operating cash.',
        ],
      },
      {
        heading: 'SHG tip',
        paragraphs: [
          'If production is shared, one member can keep the daily book and another can check totals once a week. Shared visibility reduces confusion about who spent what and what remains.',
        ],
      },
    ],
    takeaways: [
      'Consistency matters more than neat handwriting.',
      'Separate “sales” from “money received”.',
      'A weekly review turns daily notes into decisions.',
    ],
  },
  {
    slug: 'responsible-borrowing',
    categoryLabel: 'Financial Literacy',
    typeLabel: 'Guide',
    kind: 'guide',
    title: 'Responsible Borrowing & Loan Readiness',
    description:
      'A practical orientation to when borrowing may help an enterprise, how to think about repayment capacity, interest, EMI, and basic loan records—without personalized advice.',
    meta: 'Project Bharti Guide',
    tags: ['credit', 'loans', 'EMI', 'financial literacy'],
    source: null,
    officialLinks: [],
    disclaimer:
      'This guide is general financial literacy content for learning. It is not personalized financial, legal, or credit advice. Loan products, interest, and eligibility differ by lender and scheme. Verify details with your bank, SHG federation, or official scheme documents before borrowing.',
    sections: [
      {
        heading: 'When borrowing may make sense',
        paragraphs: [
          'Borrowing is more useful when the money helps the enterprise earn or protect income—for example buying materials for confirmed orders, a tool that increases output, or stock for a known market season.',
        ],
        bullets: [
          'Productive borrowing: money used to support earning activity.',
          'Consumption borrowing: money used mainly for non-business spending. This can still be necessary in life, but it does not automatically increase business income.',
        ],
      },
      {
        heading: 'Repayment capacity (plain check)',
        paragraphs: [
          'Before taking a loan, estimate a normal month of enterprise cash after essential expenses. Ask whether the EMI (or instalment) can be paid from that surplus without depending on a perfect sales month.',
        ],
        bullets: [
          'Average monthly money left after business and essential family needs.',
          'Proposed instalment amount and due date.',
          'What happens if sales fall for two weeks?',
        ],
      },
      {
        heading: 'Interest and EMI in simple terms',
        bullets: [
          'Principal: the amount you borrow.',
          'Interest: the cost of using that money over time.',
          'EMI / instalment: the regular payment that covers principal and interest as per the loan terms.',
          'Always ask for the repayment schedule in writing and keep it with your records.',
        ],
      },
      {
        heading: 'Loan readiness checklist',
        bullets: [
          'Clear purpose for the loan linked to the enterprise.',
          'Basic records of sales and expenses (even a notebook).',
          'Know your existing dues (SHG, supplier credit, other loans).',
          'Identity and bank account details ready as required by the lender.',
          'Understand who is responsible for repayment (individual or group).',
        ],
      },
      {
        heading: 'Basic loan records to keep',
        bullets: [
          'Loan amount, lender name, and date received.',
          'Interest rate / charges as stated in documents.',
          'Instalment amount and due dates.',
          'Receipt or SMS/UPI confirmation for every repayment.',
          'Outstanding balance after each payment, if provided.',
        ],
      },
    ],
    takeaways: [
      'A loan is a tool, not income.',
      'If repayment depends on best-case sales every month, risk is high.',
      'Written records protect both the borrower and the group.',
    ],
  },
  {
    slug: 'digital-payments-safety',
    categoryLabel: 'Digital Literacy',
    typeLabel: 'Guide',
    kind: 'guide',
    title: 'Digital Payments: Safe UPI & QR Practices',
    description:
      'Practical safety habits for UPI PIN, OTP, payment requests, QR codes, and fraud reporting, based on official RBI consumer guidance.',
    meta: 'Guide • RBI-informed',
    tags: ['UPI', 'QR', 'digital safety', 'payments'],
    source: {
      label: 'Reserve Bank of India',
      url: 'https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=53185',
    },
    officialLinks: [
      {
        label: 'RBI: Consumer awareness on cyber threats and frauds',
        url: 'https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=53185',
      },
      {
        label: 'Report cyber fraud (National Cybercrime Reporting Portal)',
        url: 'https://www.cybercrime.gov.in/',
      },
    ],
    sections: [
      {
        heading: 'Core rule',
        paragraphs: [
          'According to RBI consumer awareness guidance, never share confidential details such as account number, login ID, password, PIN, UPI PIN, OTP, or card details with anyone—not even with people who claim to be bank officials.',
        ],
      },
      {
        heading: 'UPI PIN and OTP',
        bullets: [
          'UPI PIN is for authorizing payments you choose to send.',
          'Do not share UPI PIN or OTP on calls, SMS replies, WhatsApp, or with “support” persons.',
          'If you receive an OTP for a debit you did not start, inform your bank or payment provider immediately.',
        ],
      },
      {
        heading: 'QR codes and receiving money',
        paragraphs: [
          'RBI cautions that transactions involving receipt of money do not require scanning barcodes/QR codes or entering MPIN. Be careful if anyone asks you to scan a QR code or enter a PIN to “receive” money, a refund, or a prize.',
        ],
        bullets: [
          'To receive money, share your UPI ID or show your own QR for others to pay you.',
          'To pay, check the payee name shown in the app before entering UPI PIN.',
          'Be alert to unauthorized or sticker-covered QR codes at shops.',
        ],
      },
      {
        heading: 'Suspicious calls, links, and apps',
        bullets: [
          'Do not click unknown links that claim to update KYC, unblock an account, or reverse a payment.',
          'Do not download unknown apps that can take remote control of your phone.',
          'Use official bank/UPI apps from trusted app stores and check that website addresses start with https.',
          'Prefer official bank contact channels; numbers shown in random internet searches may be fake.',
        ],
      },
      {
        heading: 'After every payment',
        bullets: [
          'Confirm the success message in your UPI app.',
          'Check the debit SMS/notification amount and payee.',
          'If a debit looks wrong, contact your bank quickly and block debit modes if advised.',
        ],
      },
      {
        heading: 'If you suspect fraud',
        bullets: [
          'Contact your bank or UPI app support through official channels immediately.',
          'RBI advises notifying local police / cybercrime authorities when suspicion arises.',
          'You can also use the National Cybercrime Reporting Portal and the cybercrime helpline 1930.',
        ],
      },
    ],
    takeaways: [
      'No genuine bank process needs your UPI PIN or OTP over a call.',
      'Receiving money should not require you to scan a QR code or enter a PIN.',
      'Speed matters: report suspicious debits at once.',
    ],
  },
  {
    slug: 'udyam-registration',
    categoryLabel: 'Government Scheme',
    typeLabel: 'Government Scheme',
    kind: 'scheme',
    title: 'Udyam Registration: A Simple Guide for Micro Enterprises',
    description:
      'What Udyam is, who it is for, the basic official online process, and how to avoid fake registration websites.',
    meta: 'Government Scheme Guide',
    tags: ['Udyam', 'MSME', 'registration'],
    source: {
      label: 'Ministry of MSME / Government of India',
      url: 'https://udyamregistration.gov.in/',
    },
    officialLinks: [
      {
        label: 'Official Udyam Registration portal',
        url: 'https://udyamregistration.gov.in/',
      },
    ],
    sections: [
      {
        heading: 'What Udyam is',
        paragraphs: [
          'Udyam Registration is the official Government of India process for registering Micro, Small and Medium Enterprises (MSMEs) under the Ministry of MSME. After registration, the enterprise receives a permanent Udyam Registration Number and an online certificate.',
        ],
      },
      {
        heading: 'Who it is for',
        paragraphs: [
          'It is for enterprises that want official MSME recognition through the government portal. The official portal states that registration is free, paperless, and based on self-declaration.',
        ],
      },
      {
        heading: 'Basic official process (high level)',
        bullets: [
          'Use only the official portal: udyamregistration.gov.in.',
          'Begin new registration for entrepreneurs not yet registered as MSME.',
          'Aadhaar of the entrepreneur / authorised signatory is used for the process.',
          'PAN and GSTIN details are used as applicable under current government rules; the portal is integrated with Income Tax and GST systems.',
          'On completion, a registration number and certificate are issued online. The official portal states there is no need for renewal of registration.',
        ],
      },
      {
        heading: 'Safety warning: fake websites',
        paragraphs: [
          'The official Udyam portal clearly warns that except the Government of India portal and government single-window systems, no other private online or offline system, service, agency, or person is authorised to do MSME registration.',
          'Registration on the official portal is free. Be cautious of websites or agents that demand fees for “registration”, ask for unnecessary uploads, or use lookalike web addresses.',
        ],
        bullets: [
          'Check that the address is udyamregistration.gov.in.',
          'Do not pay private parties for the government registration itself.',
          'If unsure, use government facilitation points mentioned on the official portal (such as Champions Control Rooms / DICs).',
        ],
      },
    ],
    takeaways: [
      'Udyam is official MSME registration—not a private paid service.',
      'Use only the .gov.in portal.',
      'Keep your certificate and registration number with business records.',
    ],
  },
  {
    slug: 'pm-vishwakarma',
    categoryLabel: 'Government Scheme',
    typeLabel: 'Government Scheme',
    kind: 'scheme',
    title: 'PM Vishwakarma: What Artisans Should Know',
    description:
      'A plain-language overview of recognition, training, toolkit support, credit support, digital transaction incentives, and marketing support for traditional artisans and craftspeople.',
    meta: 'Government Scheme Guide',
    tags: ['PM Vishwakarma', 'artisans', 'MSME'],
    source: {
      label: 'Ministry of MSME / Government of India',
      url: 'https://pmvishwakarma.gov.in/',
    },
    officialLinks: [
      {
        label: 'Official PM Vishwakarma portal',
        url: 'https://pmvishwakarma.gov.in/',
      },
      {
        label: 'PIB note on scheme features',
        url: 'https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1959098',
      },
    ],
    disclaimer:
      'Scheme benefits, trade coverage, and eligibility are defined by the Government of India and may be updated. Always confirm current details on the official PM Vishwakarma portal before applying.',
    sections: [
      {
        heading: 'What the scheme is',
        paragraphs: [
          'PM Vishwakarma is a Government of India scheme, with the Ministry of MSME as the nodal ministry, to provide end-to-end support to traditional artisans and craftspeople so they can improve skills, tools, credit access, and market-linked practices.',
        ],
      },
      {
        heading: 'Support areas (official scheme design)',
        bullets: [
          'Recognition: certificate and ID card as Vishwakarma.',
          'Skill upgradation: basic training and optional advanced training, with a training stipend as per official guidelines (PIB notes ₹500 per day).',
          'Toolkit support: toolkit incentive through e-vouchers as per official guidelines (PIB notes up to ₹15,000).',
          'Credit support: collateral-free enterprise development loans in tranches at a concessional interest rate, with interest subvention as notified by the government.',
          'Digital transaction incentives: support to encourage digital payments in the artisan’s business.',
          'Marketing support: support linked to helping artisans reach markets, as provided under the scheme.',
        ],
      },
      {
        heading: 'Credit support in plain terms',
        paragraphs: [
          'Official communications describe collateral-free loans of up to ₹3 lakh in two tranches (₹1 lakh and ₹2 lakh) with concessional interest. Exact eligibility for each tranche depends on completing required training/steps and maintaining required loan and digital-transaction conditions. Check the official portal for the current process.',
        ],
      },
      {
        heading: 'What artisans should do next',
        bullets: [
          'Read the current information on pmvishwakarma.gov.in.',
          'Confirm whether your trade is covered under the scheme’s notified list.',
          'Use only official helplines/emails published by the government for queries.',
          'Do not share Aadhaar OTP or pay unofficial “agents” for guaranteed selection.',
        ],
      },
    ],
    takeaways: [
      'PM Vishwakarma combines recognition, skills, tools, credit, and market/digital support.',
      'Amounts and steps should be verified on the official portal.',
      'Official channels matter more than informal promises.',
    ],
  },
  {
    slug: 'pmjdy',
    categoryLabel: 'Government Scheme',
    typeLabel: 'Government Scheme',
    kind: 'scheme',
    title: 'PM Jan-Dhan Yojana: Banking & Financial Inclusion',
    description:
      'A simple guide to basic savings accounts, banking access, DBT readiness, RuPay, and insurance/pension linkages under PMJDY.',
    meta: 'Government Scheme Guide',
    tags: ['PMJDY', 'banking', 'financial inclusion', 'DBT'],
    source: {
      label: 'Department of Financial Services / Government of India',
      url: 'https://pmjdy.gov.in/scheme',
    },
    officialLinks: [
      {
        label: 'Official PMJDY scheme page',
        url: 'https://pmjdy.gov.in/scheme',
      },
      {
        label: 'PMJDY home',
        url: 'https://www.pmjdy.gov.in/',
      },
    ],
    disclaimer:
      'Account features, insurance cover, and linked scheme eligibility follow official PMJDY and bank rules. Confirm current benefits with your bank and pmjdy.gov.in.',
    sections: [
      {
        heading: 'What PMJDY is',
        paragraphs: [
          'Pradhan Mantri Jan-Dhan Yojana (PMJDY) is India’s national mission for financial inclusion. Its aim is affordable access to basic financial services such as a basic savings account, remittance, credit, insurance, and pension.',
        ],
      },
      {
        heading: 'Basic account and banking access',
        bullets: [
          'A basic savings bank deposit account can be opened by a person who does not have another bank account.',
          'Accounts can be opened at a bank branch or through a Business Correspondent (Bank Mitra) outlet.',
          'Official scheme details state there is no requirement to maintain any minimum balance in PMJDY accounts.',
          'Interest is earned on deposits as applicable.',
          'A RuPay debit card is provided to the account holder.',
        ],
      },
      {
        heading: 'DBT and linked services',
        paragraphs: [
          'PMJDY accounts are designed to support Direct Benefit Transfer (DBT) and can be a pathway to linked insurance and pension products offered under government schemes, subject to eligibility.',
        ],
        bullets: [
          'DBT: government benefits credited directly to the bank account.',
          'Linked scheme examples listed on the official PMJDY page include PMJJBY, PMSBY, APY, and MUDRA (each with its own rules).',
          'An overdraft facility of up to ₹10,000 is described for eligible account holders on the official scheme page.',
        ],
      },
      {
        heading: 'RuPay and insurance (as officially stated)',
        paragraphs: [
          'The official PMJDY scheme page states that accident insurance cover of ₹1 lakh is available with the RuPay card, enhanced to ₹2 lakh for new PMJDY accounts opened after 28 August 2018. Banks and NPCI may specify usage conditions for claims—confirm with your bank.',
        ],
      },
      {
        heading: 'Responsible account usage',
        bullets: [
          'Keep your passbook/app alerts updated and check credits/debits.',
          'Do not share OTP, PIN, or card details.',
          'Use the account for genuine savings and benefit credits; avoid giving account control to unknown persons.',
          'If you receive unexpected OTPs or unknown debits, contact the bank immediately.',
        ],
      },
    ],
    takeaways: [
      'PMJDY is an entry point to formal banking, not only an account opening drive.',
      'DBT and linked products depend on eligibility and correct account details.',
      'Card and PIN safety remain the account holder’s daily responsibility.',
    ],
  },
  {
    slug: 'micro-enterprise-support',
    categoryLabel: 'Government Scheme',
    typeLabel: 'Government Scheme',
    kind: 'scheme',
    title: 'Government Support for New Micro Enterprises',
    description:
      'A concise map of distinct official pathways—especially PMEGP and MSME registration—so new micro enterprises do not confuse separate schemes as one benefit.',
    meta: 'Government Scheme Guide',
    tags: ['PMEGP', 'MSME', 'entrepreneurship', 'micro enterprise'],
    source: {
      label: 'Ministry of MSME / Government of India',
      url: 'https://pmegp.msme.gov.in/',
    },
    officialLinks: [
      {
        label: 'Official PMEGP portal',
        url: 'https://pmegp.msme.gov.in/',
      },
      {
        label: 'Official Udyam Registration portal',
        url: 'https://udyamregistration.gov.in/',
      },
    ],
    disclaimer:
      'This page distinguishes official pathways at a high level. Subsidy rates, project ceilings, and eligibility change by notification. Verify every requirement on the official portals and with the local implementing agency (for example KVIC / KVIB / DIC).',
    sections: [
      {
        heading: 'Do not treat “government support” as one scheme',
        paragraphs: [
          'Different programmes do different jobs. One may help you register as an MSME. Another may support financing for a new micro enterprise. Mixing them leads to wrong expectations and wrong applications.',
        ],
      },
      {
        heading: 'Pathway 1: Udyam Registration (MSME recognition)',
        bullets: [
          'Purpose: official registration/recognition of micro, small, and medium enterprises.',
          'Where: udyamregistration.gov.in only.',
          'What it is not: it is not by itself a loan sanction or subsidy disbursement.',
        ],
      },
      {
        heading: 'Pathway 2: PMEGP (new micro enterprise support)',
        paragraphs: [
          'Prime Minister’s Employment Generation Programme (PMEGP) is a Ministry of MSME programme that supports aspiring entrepreneurs to establish micro enterprises in the non-farm sector. The official portal describes it as a route to build livelihoods and employment through new micro units.',
          'Implementation involves official agencies such as KVIC (national nodal agency) and state/district implementing bodies. Applications are handled through the official PMEGP portal.',
        ],
        bullets: [
          'Purpose: support for setting up new micro enterprises (non-farm).',
          'Where to begin: pmegp.msme.gov.in.',
          'Typical flow (high level): online application → agency/bank process → training requirements as applicable → bank finance linked to scheme support.',
          'Official communications also point beneficiaries to prescribed Entrepreneurship Development Programme (EDP) training channels after sanction steps—confirm current instructions on the official portal.',
        ],
      },
      {
        heading: 'How to choose your next step',
        bullets: [
          'If you need MSME recognition documents: start with Udyam.',
          'If you are planning a new non-farm micro enterprise and want to explore PMEGP support: use the PMEGP portal and local DIC/KVIC guidance.',
          'If you are a traditional artisan under notified trades: also review PM Vishwakarma separately—it is not the same as PMEGP.',
          'Keep copies of all applications, acknowledgements, and bank communication.',
        ],
      },
      {
        heading: 'Safety note',
        paragraphs: [
          'Official PMEGP information warns against private middlemen claiming they can guarantee sanction. Use government portals and notified offices only.',
        ],
      },
    ],
    takeaways: [
      'Udyam = registration/recognition; PMEGP = enterprise support pathway for new micro units.',
      'Read each scheme on its own official page.',
      'Local implementing agencies help verify current forms and steps.',
    ],
  },
];

export function getPracticalGuideBySlug(slug) {
  return practicalGuides.find((guide) => guide.slug === slug) || null;
}

export function getPracticalGuideLibraryItems() {
  return practicalGuides.map((guide) => ({
    id: `guide-${guide.slug}`,
    title: guide.title,
    description: guide.description,
    href: `/resources/${guide.slug}`,
    meta: guide.meta,
    category: 'other-documents',
    categoryLabel: guide.categoryLabel,
    kind: guide.kind,
    typeLabel: guide.typeLabel,
    tags: guide.tags,
    sourceLabel: guide.source?.label || null,
    sourceUrl: guide.source?.url || null,
    officialUrl: guide.officialLinks?.[0]?.url || null,
    thumbnail: null,
    document: null,
    video: null,
  }));
}
