/* ============================================================
   FAQ Hub Data — Top 20 Questions American Expats Ask
   ============================================================ */

const FAQ_TOP20_CATEGORIES = [
  {
    id: 'money',
    label: 'A · Money & US Taxes',
    shortLabel: 'A · 金钱与税务',
    count: 6,
    subtitle: '— 侨民最焦虑的领域',
    color: 'blue',
  },
  {
    id: 'visa',
    label: 'B · Visa & Legal Status',
    shortLabel: 'B · 签证与身份',
    count: 4,
    subtitle: '— 门槛与路径',
    color: 'purple',
  },
  {
    id: 'healthcare',
    label: 'C · Healthcare',
    shortLabel: 'C · 医疗健康',
    count: 3,
    subtitle: '— 与美式医疗的对比焦虑',
    color: 'green',
  },
  {
    id: 'social',
    label: 'D · Social & Emotional',
    shortLabel: 'D · 社交与情绪',
    count: 3,
    subtitle: '— 最"出圈"的话题',
    color: 'pink',
  },
  {
    id: 'logistics',
    label: 'E · Everyday Logistics',
    shortLabel: 'E · 日常落地',
    count: 4,
    subtitle: '— 搬家的细节地狱',
    color: 'orange',
  },
];

const FAQ_TOP20 = [
  // A · Money & US Taxes
  {
    id: 1,
    category: 'money',
    q: 'Do I still have to file US taxes while living abroad?',
    shortA: 'FEIE 免税额、外国税收抵免，每年都要报',
    source: 'r/expatfinance',
    answer: `Yes — the US taxes its citizens on worldwide income, no matter where you live. Most expats qualify for the Foreign Earned Income Exclusion (FEIE, $126,500+ for 2024) which lets you exclude salary and self-employment income earned abroad, plus the Foreign Housing Exclusion for rent/utilities. If you pay taxes in your host country, the Foreign Tax Credit (FTC) often covers the rest.

Even if you owe nothing, you must still file a Form 1040 every year by June 15 (automatic 2-month extension for expats). Failure to file can lead to steep penalties, passport revocation, or problems with Social Security credits.

Self-employed expats still pay self-employment tax (SECA) on income above the FEIE unless a totalization agreement between the US and your host country applies.`,
  },
  {
    id: 2,
    category: 'money',
    q: 'What is FBAR — do I need to report foreign accounts?',
    shortA: '境外账户合计超 $10,000 触发申报 FinCEN 114',
    source: 'r/USExpatTaxes',
    answer: `FBAR (FinCEN Form 114, Report of Foreign Bank and Financial Accounts) is required if the total balance of all your foreign financial accounts exceeds $10,000 at any point during the calendar year. That includes bank accounts, brokerage accounts, mutual funds, and even some pension or insurance products.

The threshold is per person and it's an aggregate test — if you have five accounts with $2,001 each, you must file. FBAR is filed electronically with FinCEN (not the IRS), and the deadline is April 15 with an automatic extension to October 15.

Civil penalties for non-willful failure to file can be up to $10,000 per account per year; willful violations can be up to $100,000 or 50% of the account balance per violation. If you're behind, the IRS Streamlined Filing Compliance Procedures offer a way to catch up with reduced penalties.

Also watch for Form 8938 (FATCA Statement of Specified Foreign Financial Assets), which has higher thresholds and is filed with your tax return.`,
  },
  {
    id: 3,
    category: 'money',
    q: 'Can I keep my US bank account, credit cards and brokerage abroad?',
    shortA: '银行关户、券商限制海外居民、地址更新风险',
    source: 'r/expats',
    answer: `It depends heavily on the institution and your state of residency.

Banks & credit cards: Many US banks will let you keep accounts if you maintain a US mailing address, but some — especially after FATCA — actively close accounts belonging to customers with foreign addresses. Credit cards are easier to keep if you keep a US billing address and continue using the card. Wells Fargo, Chase, and Schwab are generally more expat-friendly; smaller banks and credit unions are the most likely to close accounts.

Brokerages: Schwab International is the gold standard for expats — you can open a Schwab One International account with no US address requirement. Fidelity and Vanguard generally require a US address and may restrict trading if you move abroad. Interactive Brokers also works well for non-US residents.

Key tips:
- Never tell your bank you're moving abroad before arranging alternatives
- Keep a US address (friend/family or mail forwarding service) for tax and banking purposes
- Apply for the Schwab Debit Card before leaving — it reimburses all ATM fees worldwide
- Your 401(k) and IRA can stay where they are; you just can't contribute new money if you have no US earned income`,
  },
  {
    id: 4,
    category: 'money',
    q: 'How do I open a local bank account?',
    shortA: '证明地址、税号、FATCA 表格是常见卡点',
    source: 'Facebook 群',
    answer: `Opening a local bank account varies dramatically by country, but the common pain points are the same:

What you'll usually need:
- Passport and valid visa / residency card
- Proof of local address (utility bill, rental contract, or residency certificate)
- Local tax ID / tax number (ITIN-equivalent in your new country)
- W-9 or W-8BEN form for FATCA compliance (banks are required to report US persons' accounts to the IRS)
- Initial deposit, sometimes substantial

Common hurdles:
- "No address, no account" Catch-22 — you need a bank to rent, but you need a rental for the bank. Some banks accept a letter from your embassy or a temporary address.
- FATCA paperwork — expect extra forms and delays as a US citizen
- Credit history doesn't transfer — you start from zero, so credit cards and loans will be hard to get at first
- Monthly fees, minimum balances, and limited English support

Tips:
- Arrive with enough cash/Traveler's Cheques for the first 1-2 months
- Charles Schwab Debit Card + TransferWise (Wise) are lifesavers while you set up local banking
- Some countries allow opening accounts 100% online before arrival (e.g. N26 in EU, Wise multi-currency)
- Start with the easiest bank first, then upgrade once you have history`,
  },
  {
    id: 5,
    category: 'money',
    q: 'Can I collect Social Security / US pension while overseas?',
    shortA: '多数国家可收，Medicare 基本不带出国',
    source: 'r/expats',
    answer: `Yes — US Social Security retirement, survivor, and disability benefits are generally payable to US citizens living abroad. The SSA can deposit directly into most foreign bank accounts, or to a US account that you access internationally.

However, there are important caveats:
- A handful of countries (North Korea, Cuba, and in some cases Azerbaijan, Belarus, Kazakhstan, Kyrgyzstan, Moldova, Tajikistan, Turkmenistan, Uzbekistan) restrict or block direct deposit; you may need a third-party payment arrangement
- You may be subject to a Windfall Elimination Provision (WEP) if you also receive a foreign pension
- Medicare does NOT follow you overseas — you cannot use Medicare benefits abroad. If you return to the US, you can enroll, but you may face late enrollment penalties if you didn't sign up during your Initial Enrollment Period while abroad. You can keep Part A (hospital insurance) at no cost, but Part B requires premiums and is only useful in the US.
- US federal pensions (FERS, CSRS, military retirement) can usually be received abroad, but rules vary
- Totalization agreements between the US and ~30 countries can help you qualify for benefits from both systems and avoid double Social Security taxation`,
  },
  {
    id: 6,
    category: 'money',
    q: 'Should I renounce my US citizenship? What is the exit tax?',
    shortA: '弃籍税、Form 8854、5 年合规证明',
    source: 'r/AmericanExpat',
    answer: `Renouncing US citizenship is a serious, often irreversible decision that triggers the "exit tax" (Expatriation Tax) under Section 877A of the IRS code.

Who gets hit with exit tax:
- Net worth of $2 million or more (on the date of expatriation)
- Average annual net US income tax liability of over $190,000 (2024 threshold, indexed for inflation) over the past 5 years
- Failure to certify compliance with US tax obligations for the 5 years preceding expatriation

If you're a "covered expatriate," the IRS treats you as if you sold all your worldwide assets on the day before you expatriate. The gain on that deemed sale is taxable — with a $767,000 exclusion (2024).

Other major consequences:
- You must file Form 8854 with your final tax return
- Certain gifts and bequests from you to US persons are taxable to the recipient at the highest estate tax rate
- You lose consular protection abroad, US passport, and the right to vote in US elections
- You may be barred from re-entering the US (the "Reed Amendment" — though rarely enforced)
- You lose the right to live and work in the US without a visa

Before even considering it: make sure you have another citizenship/passport (you can't renounce without one), get proper legal and tax advice, and consider whether the savings are worth the loss of rights and flexibility. Many expats find that careful tax planning (FEIE, FTC, foreign housing exclusion) makes US citizenship far less burdensome than they think.`,
  },

  // B · Visa & Legal Status
  {
    id: 7,
    category: 'visa',
    q: 'Which visa / residency fits me — digital nomad, retirement or work?',
    shortA: '各国收入门槛、可续期年限差异巨大',
    source: 'r/digitalnomad',
    answer: `The right visa depends on your income source, age, savings, and how long you want to stay. Here's the landscape:

Digital Nomad / Remote Work Visas (40+ countries):
- Best if you earn income remotely from a foreign employer or your own business
- Income requirements: $1,000/month (Georgia) to $5,000+/month (Portugal, UAE)
- Typical stay: 1-2 years, some renewable
- Common options: Portugal D8, Spain Digital Nomad Visa, Costa Rica Rentista, Mexico Temporary Resident, UAE Dubai Remote Work, Greece Digital Nomad
- Pro: designed for your lifestyle, no local employer needed
- Con: you generally can't take local jobs, and paths to permanent residency vary

Retirement / Pension Visas:
- Best if you're 50+ with a stable pension or investment income
- Income requirements: $800/month (Panama Pensionado) to $2,500+/month
- Often include discounts on utilities, transport, and entertainment
- Paths to permanent residency are usually well-defined
- Popular: Panama Pensionado, Costa Rica Pensionado, Philippines SRRV, Thailand Elite/Retirement, Malaysia MM2H

Work Visas:
- Sponsored by a local employer
- Usually the most reliable path to permanent residency and citizenship
- Often tied to your employer — lose the job, lose the visa
- Highly skilled workers and STEM roles have the easiest time

Key questions to ask yourself:
1. Do I want a temporary (1-3 year) or permanent path?
2. Does my income qualify (employment, self-employment, pension, investments)?
3. How long can I stay away from the US without affecting my own tax/residency?
4. Do I want citizenship/passport eventually?`,
  },
  {
    id: 8,
    category: 'visa',
    q: 'Is it legal to work remotely for a US employer while abroad?',
    shortA: '签证允许的工作权限、雇主税务属地',
    source: 'r/expats',
    answer: `This is one of the most common — and most complicated — questions among expats. The short answer: it depends on your visa status, your employer's policies, and tax rules in both countries.

Visa side:
- Tourist visas generally do NOT permit any form of work, including remote work for a foreign employer. Doing remote work on a tourist visa is technically illegal in most countries.
- Digital nomad visas are explicitly designed for this — they authorize you to work remotely for foreign clients/employers while residing in the country
- Work permits authorize you to work for a local employer; they may or may not cover remote work for a foreign employer

Tax side (this is the bigger issue):
- Working from a foreign country can create "permanent establishment" (PE) for your employer in that country, meaning your employer becomes liable for corporate taxes, social insurance, and has to set up a local entity
- You may become a tax resident of your host country and owe income tax there
- You may need to pay into the local social security system (though totalization agreements can sometimes exempt you)
- Your employer may not allow it for compliance, HR, or tax reasons

What most people actually do:
- Many remote workers quietly work from abroad on tourist or digital nomad visas, especially for shorter stays
- For longer stays, digital nomad visas are the cleanest legal path
- Some set up their own foreign company and invoice their US employer (more complex but cleaner)
- The longer you stay, the higher the risk of tax residency triggering

Bottom line: talk to an immigration lawyer in your destination country AND a cross-border tax advisor. The rules are nuanced and vary wildly.`,
  },
  {
    id: 9,
    category: 'visa',
    q: 'How do I get permanent residency or a second passport?',
    shortA: '多数国家居住 5-10 年路径、双国籍规则',
    source: 'Quora',
    answer: `Permanent residency (PR) and citizenship are two different things — PR gives you the right to live there indefinitely, while citizenship gets you a passport and full rights.

Typical path to permanent residency:
1. Start on a temporary visa (work, student, retirement, digital nomad, family reunification)
2. Renew as needed for the required period (usually 2-5 years)
3. Apply for permanent residency once you meet the requirements
4. PR is often 5-10 years of legal residency, with language and integration requirements in many countries

Path to citizenship / second passport:
- Most countries require 5-10 years of legal residency before you can naturalize
- Some have faster tracks:
  - Marriage to a citizen: often 2-3 years
  - Investment (Citizenship by Investment): Caribbean countries (St. Lucia, Dominica, Grenada — ~$100K+), Malta (~$1M+), Vanuatu
  - Ancestry / jus sanguinis: many European countries grant citizenship if you can prove an ancestor was born there (Ireland, Italy, Poland, etc.)
  - Exceptional contribution: artists, athletes, scientists

Dual citizenship considerations:
- The US allows dual citizenship — you don't lose US citizenship by naturalizing elsewhere (unless you explicitly renounce)
- Some countries don't allow it and require you to renounce your original citizenship: Japan, India, Saudi Arabia, Singapore
- Some allow it in practice: most of Europe, Canada, Australia, Mexico, the Philippines
- With a second passport, you still have all US tax obligations as a citizen

Important: This is a multi-year (often decade+) process for most people. Start with understanding your host country's naturalization rules and timeline before counting on it.`,
  },
  {
    id: 10,
    category: 'visa',
    q: 'How do I vote from abroad?',
    shortA: '缺席选票、各州规则不同、联邦与州选举差异',
    source: 'r/expats',
    answer: `US citizens living abroad have the right to vote in federal elections, and in most states, state and local elections too. Here's how:

Registering:
- Use the Federal Post Card Application (FPCA) — this is a single form that both registers you to vote and requests an absentee ballot for the year
- You can submit FPCA online at FVAP.gov, or download, print, and mail/email/fax it to your Local Election Official
- You need to do this every year (some states let it carry over, but FVAP recommends submitting annually)
- Your "voting residence" is your last US address — even if you no longer own property there or have family there

Receiving and returning your ballot:
- Most states send ballots by email, online download, fax, or mail — you choose your preferred method
- You must return it by the deadline, which varies by state (some allow postmarked by Election Day, others require receipt by Election Day)
- Federal Write-In Absentee Ballot (FWAB) is a backup if your regular ballot doesn't arrive in time

What you can vote for:
- Federal offices: President, Senate, House of Representatives — always
- State and local offices: depends on your state. Some states allow expats to vote in state races; some don't if you've been gone too long
- Presidential primaries and special elections: varies

Key tips:
- FVAP.gov is the official source — it has a state-by-state guide
- Request your ballot early (January of an election year is ideal)
- If you didn't get your ballot, use the FWAB — it counts for federal races in every state
- Your vote matters — overseas ballots have been decisive in close elections`,
  },

  // C · Healthcare
  {
    id: 11,
    category: 'healthcare',
    q: 'How does health insurance & healthcare actually work there?',
    shortA: '公立/私立体系、强制参保、等待期',
    source: 'r/expats',
    answer: `Healthcare systems vary dramatically by country, but here are the major models and how they affect you as an expat:

Universal / National Health Systems (Europe, Canada, Australia, etc.):
- Funded by taxes or mandatory social insurance contributions
- Usually available to legal residents (not typically to tourists or visa-free visitors)
- Quality is often very high, but wait times for non-urgent care can be long
- You may need to register with the national system and get a national ID / health card
- Some countries have long waiting periods before you're eligible (e.g., 12 months in Australia)

Two-Tier Systems (most of Latin America, Asia, Middle East):
- Public system exists but may be underfunded, crowded, or of variable quality
- Robust private system with English-speaking doctors, modern facilities, and shorter waits
- Expats overwhelmingly use private care
- Private insurance costs $100-$300/month for a healthy person, $400-$800+ for older adults or families

International Health Insurance:
- Covers you across multiple countries (good for travelers and digital nomads)
- More expensive than local private insurance
- Options: Cigna Global, Bupa Global, Allianz Care, GeoBlue (for US citizens)
- Plans often exclude pre-existing conditions or charge more for them
- Many require you to pay upfront and submit claims

Key questions to research for your destination:
1. Is there mandatory national health insurance for residents? How much does it cost?
2. How long is the waiting period before you're covered?
3. What's the quality of public vs. private care?
4. Do doctors speak English?
5. Can you keep your US doctor/telehealth for consultations?
6. How are prescriptions handled — can you get your meds locally?`,
  },
  {
    id: 12,
    category: 'healthcare',
    q: 'Does Medicare cover me overseas? What happens to my US coverage?',
    shortA: 'Medicare 海外基本不覆盖、保留 Part A 的策略',
    source: 'Facebook 群',
    answer: `Medicare generally does NOT cover healthcare services outside the United States (with very narrow exceptions for emergency care near the US border and on US-flagged ships). If you're moving abroad permanently or long-term, here's what you need to know:

Part A (Hospital Insurance):
- You generally don't pay a premium for Part A if you (or your spouse) paid Medicare taxes for 10+ years
- Most expats keep Part A — it's free and it protects you if/when you return to the US
- You CANNOT use Part A benefits abroad, but having it doesn't cost you anything

Part B (Medical Insurance / Doctor Visits):
- Requires a monthly premium ($174.70/month in 2024, higher for higher incomes)
- Does NOT cover you abroad
- If you drop Part B and want to re-enroll later when you return to the US, you may face a late enrollment penalty (10% for each 12-month period you could have enrolled but didn't)
- There's a Special Enrollment Period for people who were working abroad and covered by a group health plan — this waives the penalty

Medicare Advantage (Part C) and Part D (Drug Coverage):
- Both also don't work abroad
- You'll want to disenroll or avoid enrolling if you're not in the US

Strategy for expats approaching 65:
- Sign up for Part A during your Initial Enrollment Period (it's free)
- Decline Part B if you're not going to be in the US — but carefully consider the penalty risk if you might return
- Get comprehensive international or local private health insurance instead
- If you return to the US for an extended stay, you can enroll in Part B during a Special Enrollment Period
- TRICARE for Life and VA benefits have their own rules for overseas coverage — check separately`,
  },
  {
    id: 13,
    category: 'healthcare',
    q: 'What about prescriptions, emergencies and mental health abroad?',
    shortA: '慢性病药可及性、国际保险、语言障碍下就诊',
    source: 'r/expats',
    answer: `These three areas are where expats encounter the most unexpected healthcare challenges:

Prescriptions:
- Many medications available in the US may have different names, formulations, or be unavailable abroad
- Controlled substances (ADHD meds, opioids, benzodiazepines, some antidepressants) are heavily restricted or illegal in many countries — research this BEFORE you move
- Generic versions of common drugs are often much cheaper abroad and equally effective
- Talk to your US doctor before moving: get a 3-month supply to start, ask for generic names, and get a letter from your doctor explaining your condition and prescription
- Check if your insurance covers mail-order prescriptions from the US
- Some countries require a local doctor's prescription even for medications that are OTC in the US (and vice versa)

Emergencies:
- Know your local emergency number (it's not 911 everywhere — 112 works in Europe, 120 in China, etc.)
- If you have travel/health insurance, call their 24/7 emergency line first — they can coordinate care and handle payment
- Carry a medical ID card with your blood type, allergies, and emergency contact (in the local language)
- Keep copies of your medical records and important test results digitally (in a password manager or encrypted cloud storage)
- Medical evacuation coverage is worth considering — being flown back to your home country for care can cost $50,000+

Mental Health:
- This is often the hardest part of expat healthcare
- Therapy in English may be hard to find, expensive, or not covered by insurance
- Cultural differences in how mental health is approached and treated can feel isolating
- Options:
  - Online therapy platforms with English-speaking therapists (BetterHelp, Talkspace — note that availability varies by country)
  - Expat support groups (both in-person and online)
  - Continuing with your US therapist via telehealth (check if they're licensed to practice across state/country lines)
  - If you take psychiatric medication, make sure it's available and legal in your destination
- The "expat blues" and culture shock are real — give yourself time and don't hesitate to seek help`,
  },

  // D · Social & Emotional
  {
    id: 14,
    category: 'social',
    q: 'How do I make friends and deal with loneliness?',
    shortA: 'r/expat 最高赞帖常客："silent expat killer"',
    source: 'r/expats',
    answer: `Loneliness is the #1 thing expats struggle with — and it's the most under-discussed before moving. The "silent expat killer" is a common phrase for a reason. Here's what actually works, according to hundreds of expats:

It gets better, but there's a timeline:
- Months 0-3: Honeymoon phase — everything is exciting
- Months 3-9: Culture shock and loneliness hit hard — this is when most people struggle
- Months 9-18: You start building a real life, routines, and friendships
- After 18-24 months: You feel at home

Proven strategies for making friends:
- Join expat groups on Facebook, Meetup, InterNations, and local expat associations — show up even when you don't feel like it
- Pursue hobbies and interests: sports leagues, language classes, dance, board games, hiking groups, volunteer work — shared activities are the #1 way friendships form
- Take language classes — being bad together is bonding, and you meet people at the same life stage
- Use Bumble BFF (yes, it works for platonic friendships abroad too)
- Join a religious or spiritual community if that's your thing
- Say yes to everything for the first 6 months — even if it's not your scene
- Build a routine — go to the same coffee shop, same gym, same market every day. Regular casual interactions become relationships.

What doesn't work:
- Waiting for people to come to you
- Only hanging out with other Americans (fine for short-term, but limits your experience and deep connections)
- Comparing your new social life to your old one — it took years to build those friendships back home

If loneliness gets really bad:
- Talk to a therapist (online or local)
- Consider whether the location is right for you — there's no shame in moving somewhere else or returning
- Reach out to friends back home — they want to hear from you
- Remember: this phase is normal and temporary for almost everyone`,
  },
  {
    id: 15,
    category: 'social',
    q: 'Should I move back to the US?',
    shortA: '"后悔帖"与回流帖常年刷屏、家庭与孤独是主因',
    source: 'r/expats',
    answer: `This question floods expat forums. There's no right answer, but here's a framework that many expats find helpful:

Common reasons people consider moving back:
- Loneliness and lack of deep friendships
- Aging parents or family emergencies back home
- Career setbacks or difficulty finding work abroad
- Relationship issues (partner is local, or long-distance strain)
- Financial stress or rising cost of living
- Healthcare concerns (especially with aging or chronic conditions)
- Missing American things: food, culture, convenience, sports, holidays
- Kids growing up and wanting to go to college in the US

Questions to ask yourself honestly:
1. Have I given it enough time? Most expats say 2+ years minimum before deciding. The first year is brutal for almost everyone.
2. Am I running TO something or running FROM something? If it's just "I'm miserable here," you might bring that misery with you.
3. Can I afford to move back? Reverse culture shock and the cost of re-establishing life in the US (housing, healthcare, cars) are often underestimated.
4. What would I actually be returning to? Be specific — not just "home" but what concrete things are better in the US for me?
5. Have I tried everything here? New city? New job? New hobbies? Therapy?
6. What's my "regret minimization" choice? Which decision will I regret more when I'm 80?

The "trial return" approach:
- Spend 1-3 months in the US before deciding — visit during different seasons, not just during holidays
- Try renting a place, not just staying with family
- Job search from abroad first if that's a factor
- Talk to repatriated expats — their perspective is invaluable

Important: There is no shame in moving back. Many expats do it and find it was the right choice. Many others stay and are glad they pushed through. The only "wrong" answer is making the decision out of fear or without real information.`,
  },
  {
    id: 16,
    category: 'social',
    q: 'How do I handle the language barrier?',
    shortA: '学习路径、就医/办证时的沟通、不会语言能否生存',
    source: 'Quora',
    answer: `The language barrier is one of the biggest practical and emotional challenges of living abroad. Here's the realistic picture and what works:

Can you survive without the local language?
- In major expat hubs and tourist areas: yes, to an extent. You can get by with English for shopping, restaurants, basic services.
- For anything involving bureaucracy (visas, banks, hospitals, schools, utilities): it's much harder without the local language, and you'll be dependent on others.
- Socially: your social circle will be limited to other expats and locals who speak English. You'll miss a lot of cultural nuance and depth.

How to learn effectively:
- Start BEFORE you move — Duolingo, Pimsleur, or Anki for basics. Even 100 core words make a huge difference.
- Once you arrive, immerse:
  - Language classes (in-person group classes are best for motivation and socializing)
  - Private tutors on iTalki or Preply ($10-25/hour, very effective)
  - Language exchange meetups — you help someone with English, they help you with their language
  - Watch Netflix / YouTube in the target language with subtitles
  - Label everything in your house
  - Talk to everyone: shopkeepers, neighbors, baristas — they're almost always patient and appreciative

Critical situations:
- Medical: Learn key medical vocabulary in advance. Bring a translator app (Google Translate offline mode is a lifesaver). Some hospitals have interpreter services.
- Legal / government: Consider hiring a translator or fixer for important appointments. The cost is worth avoiding mistakes.
- Banking: Learn the key terms you'll need. Bring a friend for the first visit.

The mindset shift:
- You will feel stupid at first. Everyone does. It's normal and it passes.
- You don't need to be fluent — functional proficiency (B1-B2 level) gets you 90% of the way there and is achievable in 6-12 months with consistent study.
- People are much more forgiving than you think. Trying and being wrong is respected; not trying at all is what gets you judged.`,
  },

  // E · Everyday Logistics
  {
    id: 17,
    category: 'logistics',
    q: 'What should I ship, sell or store when moving?',
    shortA: '整柜/拼柜海运、家具当地买、保险条款',
    source: 'Facebook 群',
    answer: `One of the biggest pre-move decisions is what to do with all your stuff. The general rule: if you're going for <2 years, store it. If >5 years, ship or replace. Here's the breakdown:

Shipping options:
- Full container (20ft or 40ft): $3,000-$8,000+ depending on route and timing. Best if you're moving a whole household.
- LCL (Less than Container Load / shared container): cheaper for smaller loads but takes longer and has higher risk of damage
- Air freight: very expensive but fast — use only for essentials you need immediately
- By sea: 4-8 weeks transit, plus customs clearance

What to SHIP:
- Sentimental items you can't replace (photos, heirlooms, children's items)
- High-quality furniture or appliances that are significantly more expensive in your destination
- Specialty items that are hard to find abroad (specific brands, sizes, equipment for hobbies)
- Books (they're heavy but shipping them is often cheaper than replacing)
- Tools, especially if you do specialty work

What to SELL:
- Cars (shipping is expensive and registration/modifications can be nightmarish — sell and buy local)
- Large appliances if your destination uses different voltage/plugs
- Furniture that's cheap to replace (IKEA exists almost everywhere)
- Anything you've been meaning to get rid of anyway — moving is the perfect excuse to declutter

What to STORE:
- If you're unsure about staying long-term, keep important furniture and belongings in climate-controlled storage
- Keep important documents, family heirlooms, and seasonal items you might want when you visit

Cost-saving tips:
- Get 3-5 quotes from international movers and check reviews carefully (beware of "bait and switch" pricing)
- Ask about door-to-door vs port-to-port, customs clearance included or not, insurance coverage
- Insurance: get "all risk" coverage, not just "total loss only." Make sure it covers the replacement value, not the weight.
- Check customs rules: many countries allow duty-free import of used household goods if you've owned them for 6+ months and are relocating permanently
- Compare the cost of shipping vs. buying new — you might be surprised how much local furniture costs in your destination`,
  },
  {
    id: 18,
    category: 'logistics',
    q: 'How do I relocate with my pets?',
    shortA: '狂犬疫苗、检疫、航空舱位与隔离期',
    source: 'r/expats',
    answer: `Moving with pets is complicated but doable — the key is starting early (3-6 months minimum for most destinations, up to a year for some). Here's what's involved:

Core requirements (varies by country):
- Microchip (ISO 11784/11785 standard)
- Rabies vaccination (must be administered AFTER microchipping, and must be current)
- Rabies titer test / blood test (for "rabies-free" countries — proves the vaccine is working)
- Health certificate (issued by a government-approved vet within 10 days of travel)
- Import permit from the destination country's agriculture/health department
- Parasite treatment (tapeworm, tick, flea — specific timing requirements)
- Some countries require spay/neuter, age minimums, or breed restrictions

Isolation / quarantine:
- Many countries have no quarantine if all paperwork is perfect: EU, US, Canada, most of Latin America, SE Asia
- Strict quarantine countries: Australia (10 days minimum), New Zealand (10 days minimum), Singapore, Japan (if requirements not met)
- Quarantine costs can be $1,000-$3,000+

Flying with your pet:
- In-cabin: small pets (<8-10kg including carrier) can fly in the cabin with you. Check airline size/weight limits carefully.
- Checked baggage / cargo: larger pets fly in the cargo hold, which is temperature-controlled and pressurized.
- Book early — airlines limit the number of pets per flight.
- Some airlines (and some aircraft) don't transport pets in cargo during summer months due to heat risk.
- Cost: $200-$2,000+ depending on size, route, and airline.

Pet relocation services:
- For $1,500-$5,000+, a pet relocation service handles all paperwork, flights, customs, and ground transport
- Worth it if you're going to a country with complicated requirements (Australia, NZ, Japan, UK) or if you have multiple pets
- Look for IPATA (International Pet and Animal Transportation Association) members

Post-arrival:
- Find a local vet before you arrive or immediately upon arrival
- Register your pet with the local municipality if required
- Pet insurance is available in most countries and worth considering
- Give your pet time to adjust — they also experience culture shock. Keep routines similar and give them lots of attention.`,
  },
  {
    id: 19,
    category: 'logistics',
    q: "Do I need an international driver's license or a local one?",
    shortA: 'IDP 有效期、换照考试、车险认可',
    source: 'Quora',
    answer: `Driving abroad is one of those areas where rules vary wildly and getting it wrong can lead to fines, impounded cars, or invalid insurance. Here's what you need to know:

International Driving Permit (IDP):
- A translation of your US driver's license into 10+ languages
- Required in many countries for tourists and short-term visitors
- Valid for 1 year from issue date
- Must be obtained IN THE US before you leave — you can't get it abroad
- Costs about $20 from AAA (American Automobile Association) — you must apply in person or by mail
- Only valid when carried WITH your actual US driver's license
- Note: many countries say they require it but rarely check — but if you get in an accident or get pulled over, not having one can mean a ticket, impounded car, or void insurance

Getting a local driver's license:
- Once you become a resident, you'll usually need to exchange or get a local license
- Some countries have reciprocity agreements with US states: you can simply exchange your US license for a local one with a written test (or no test)
- Countries with easier exchange: Germany (some states), Canada, Mexico (varies by state), France (some states), Spain (some states)
- Countries that typically require a full driving test: UK, Australia, Netherlands, most of Asia
- In many Latin American and Asian countries, getting a local license is relatively straightforward and sometimes just requires paperwork + payment
- Check with your destination's traffic authority (or consulate in the US) for the exact process

Car insurance:
- Your US auto insurance almost certainly does NOT cover you abroad (except possibly Canada/Mexico with a rider)
- Get local insurance immediately — it's usually legally required
- If you don't have a local license yet, some insurers will cover you with a US license + IDP, but check carefully
- International car rental insurance: use your credit card's coverage (call to confirm it applies in the country) or buy from the rental company

Left-hand driving countries:
- If you're moving to the UK, Australia, New Zealand, Ireland, Japan, India, South Africa, etc., give yourself 2-4 weeks to feel comfortable
- Roundabouts are usually the trickiest part
- Automatic cars are more common in some LHD countries than others (US-style automatics are standard in the US but rare in Europe)`,
  },
  {
    id: 20,
    category: 'logistics',
    q: 'How do I keep a US phone number, address and mail forwarding?',
    shortA: '美号保号、银行/税务地址、邮件代收服务',
    source: 'r/expats',
    answer: `Keeping a US "footprint" — phone number, address, and mail — is surprisingly important for banking, taxes, legal, and staying connected. Here's how to do it:

US Phone Number:
- Google Voice: free, port your number in for $20, works over data/WiFi internationally. Great for 2FA, calls, and texts. Some financial services don't accept it as a "real" mobile number.
- T-Mobile / Verizon / AT&T international plans: expensive ($50-100+/month) but works seamlessly. Keep if you need a "real" US mobile for banks and 2FA.
- NumberBarn / NumberGarage: cheap parking ($2-6/month) to hold your number and forward calls/texts
- eSIM options: Airalo, Nomad, Ubigi — get a local data eSIM in your destination and use Google Voice or WhatsApp for calls/texts on US number
- WhatsApp, Signal, Telegram: most of the world uses these. Install before you go.

US Address:
- You legally need a US address for: bank accounts, credit cards, IRS, Social Security, driver's license, voting
- Friends or family address: the most common solution. But ask them first — it's a responsibility.
- Mail forwarding services:
  - Earth Class Mail: scans envelopes, lets you view online, forwards or shreds. $50-100+/month
  - Anytime Mailbox: similar, many locations, $25-60/month
  - USPS Premium Forwarding: forwards all mail to a foreign address weekly — limited countries
- Some banks and brokerages will close accounts if they detect a foreign address. Use a US address for US financial accounts.
- Your "domicile" state for tax purposes is separate — don't claim residency in a state you no longer live in if you can avoid it. Some states are more aggressive about pursuing expats for taxes (California, New York, Virginia).

Mail forwarding from US to abroad:
- USPS First-Class Mail International: cheapest but slow (1-3 weeks) and unreliable tracking
- Package forwarders (Shipito, MyUS, Borderlinx): get a US address, they receive your packages and forward them internationally. Consolidate shipments to save.
- Amazon Global / international shipping: many Amazon US items ship internationally, but check availability

Important tips:
- Port your number to Google Voice BEFORE canceling your US plan
- Update important addresses before you leave
- Sign up for paperless billing on everything
- Keep your driver's license current — it's your primary US ID while abroad`,
  },
];

// Export to window
Object.assign(window, {
  FAQ_TOP20,
  FAQ_TOP20_CATEGORIES,
});
