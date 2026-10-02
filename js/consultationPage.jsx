/* ============================================================
   Consultation Page — 1:1 Expat Advisory
   ============================================================ */

function ConsultationPage({ onNavigate }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [openFaq, setOpenFaq] = React.useState(0);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    country: '',
    background: '',
    datePref: '',
  });

  const problems = [
    { icon: 'map', title: 'Not sure which country fits you', desc: 'Countless options, each with different rules, costs, and lifestyles. How do you pick the right one for your situation?' },
    { icon: 'calculator', title: 'Cost of living uncertainty', desc: "Will your savings and income stretch far enough? We break down real costs — rent, healthcare, taxes, education — and compare to what you're used to." },
    { icon: 'fileText', title: 'Visa paths are overwhelming', desc: 'Digital nomad, golden visa, work permit, family reunification — which one do you actually qualify for, and which gives you the best long-term options?' },
    { icon: 'home', title: "Where exactly should you live?", desc: 'Capital city or coastal town? Expats hub or local neighborhood? We match your priorities to the right city and neighborhood.' },
  ];

  const included = [
    { icon: 'video', title: '45–60 minute 1:1 deep dive', desc: 'A live video or phone call with an experienced expat advisor, tailored entirely to your situation and questions.' },
    { icon: 'mapPin', title: 'Personalized country & city recommendations', desc: 'Based on your budget, family size, career goals, and lifestyle preferences — we narrow it down to 2–3 best-fit destinations.' },
    { icon: 'passport', title: 'Visa & immigration pathway analysis', desc: 'We identify the visa programs you qualify for, compare difficulty, cost, and timeline, and recommend the smartest path forward.' },
    { icon: 'calculator', title: 'Cost of living & budget breakdown', desc: 'Detailed monthly budget estimates including rent, healthcare, education, taxes, and lifestyle — compared to your US baseline.' },
    { icon: 'heart', title: 'Healthcare, education, taxes & employment overview', desc: 'Key facts about each destination across all the categories that matter most to expats and their families.' },
    { icon: 'fileCheck', title: 'Written summary & action plan', desc: 'After the call, you receive a personalized written report with our recommendations and a clear next-steps checklist.' },
  ];

  const steps = [
    { num: '1', title: 'Book your session', desc: 'Pick a time that works for you and complete a quick 2-minute booking form.' },
    { num: '2', title: 'Fill out the pre-call questionnaire', desc: 'Tell us about your background, goals, and questions so we come fully prepared.' },
    { num: '3', title: 'Meet with your advisor', desc: 'A 45–60 minute 1:1 call covering every area you care about.' },
    { num: '4', title: 'Get your personalized report', desc: 'Within 3 business days, receive a written summary and action plan by email.' },
  ];

  const pricingPlans = [
    {
      name: 'Quick Session',
      price: 99,
      period: 'per session',
      desc: 'A focused 30-minute call to answer your most pressing questions.',
      features: [
        '30-minute video or phone call',
        'Up to 3 topics of your choice',
        'Email follow-up with key takeaways',
        'Schedule within 7 days',
      ],
      featured: false,
      cta: 'Book Quick Session',
    },
    {
      name: 'Full Consultation',
      price: 199,
      period: 'per session',
      desc: 'Our most popular package — a comprehensive deep dive into your expat plans.',
      features: [
        '45–60 minute video or phone call',
        'Personalized country & city recommendations',
        'Visa pathway analysis & comparison',
        'Cost of living budget breakdown',
        'Written summary report + action checklist',
        '1 free follow-up email question',
      ],
      featured: true,
      badge: 'Most Popular',
      cta: 'Book Full Consultation',
    },
    {
      name: 'Deep Dive Report',
      price: 599,
      period: 'per session',
      desc: 'Extended consultation plus an in-depth customized research report.',
      features: [
        '90-minute video or phone call',
        'Everything in the Full Consultation',
        'Detailed side-by-side destination report',
        'Visa eligibility assessment matrix',
        'Custom cost-of-living comparison spreadsheet',
        'Priority scheduling (48 hours)',
      ],
      featured: false,
      cta: 'Book Deep Dive',
    },
  ];

  const teamMembers = [
    { icon: 'globe', name: 'Experienced Expat Advisors', role: 'Immigration & Relocation', desc: 'A team of advisors with 10+ years of combined experience helping expats navigate visas, relocation, and life abroad.' },
    { icon: 'briefcase', name: 'Visa & Immigration Experts', role: 'Legal Pathways', desc: 'Well-versed in the visa programs, residency rules, and citizenship paths of 20+ popular expat destinations.' },
    { icon: 'bookOpen', name: 'On-the-Ground Researchers', role: 'Cost of Living & Lifestyle', desc: 'Our local researchers provide up-to-date, verified data on housing, healthcare, schools, and daily costs.' },
  ];

  const faqs = [
    { q: 'What language is the consultation in?', a: 'All consultations are conducted in English. Our advisors are native or fluent English speakers. If you need interpretation assistance, please mention it in your booking form and we will do our best to accommodate.' },
    { q: 'Can you guarantee I will get a visa?', a: 'No — and you should be wary of anyone who does. Visa approval is always at the discretion of the issuing government. What we can guarantee is expert, honest advice on your eligibility, the strongest pathways for your profile, and how to maximize your chances of success.' },
    { q: 'What is your refund policy?', a: 'If you are not satisfied with your consultation, let us know within 7 days and we will refund your payment in full — no questions asked. We also offer free rescheduling up to 24 hours before your appointment.' },
    { q: 'Can I have the consultation in Chinese / Mandarin?', a: 'Currently our consultations are offered primarily in English. We do have a limited number of Mandarin-speaking advisors available. If you prefer a consultation in Chinese, please note this in your booking form and we will do our best to match you with a Mandarin-speaking advisor, subject to availability.' },
    { q: 'How soon can I book?', a: 'Standard sessions can typically be scheduled within 5–7 business days. Our Deep Dive Report package includes priority scheduling with sessions available within 48 hours of booking, subject to advisor availability.' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollToForm = () => {
    const el = document.getElementById('cons-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fade-in cons-page">
      {/* ===== HERO ===== */}
      <section className="cons-hero">
        <div className="container">
          <div className="cons-hero-eyebrow">
            <Icon name="sparkles" size={14} />
            1:1 Expat Advisory
          </div>
          <h1>Not Sure Which Country Is Right for You?</h1>
          <p className="cons-hero-subtitle">
            A $199 one-on-one deep consultation to help you make smarter decisions
            about where to live, which visa to pursue, how much it will cost, and
            what to prepare before you go.
          </p>
          <div className="cons-hero-actions">
            <button className="cons-hero-btn primary" onClick={scrollToForm}>
              Book a Consultation
            </button>
            <button className="cons-hero-btn secondary" onClick={() => onNavigate('ranking')}>
              Explore Countries First
            </button>
          </div>
          <div className="cons-hero-meta">
            <div className="cons-hero-meta-item">
              <Icon name="calendar" size={16} />
              45–60 minutes
            </div>
            <div className="cons-hero-meta-item">
              <Icon name="shield" size={16} />
              7-day satisfaction guarantee
            </div>
            <div className="cons-hero-meta-item">
              <Icon name="globe" size={16} />
              20+ countries covered
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE SOLVE ===== */}
      <section className="cons-section">
        <div className="container">
          <div className="cons-section-head">
            <div className="cons-section-eyebrow">What you get clarity on</div>
            <h2 className="cons-section-title">
              The big questions every expat faces
            </h2>
            <p className="cons-section-desc">
              Choosing the wrong country, visa path, or city is expensive to fix.
              We help you get it right the first time — with data, experience, and
              unbiased advice.
            </p>
          </div>

          <div className="cons-problem-grid">
            {problems.map((p, i) => (
              <div key={i} className="cons-problem-card">
                <div className="cons-problem-icon">
                  <Icon name={p.icon} size={22} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT'S INCLUDED ===== */}
      <section className="cons-section alt-bg">
        <div className="container">
          <div className="cons-section-head">
            <div className="cons-section-eyebrow">What's included</div>
            <h2 className="cons-section-title">Everything in your $199 consultation</h2>
            <p className="cons-section-desc">
              A comprehensive, personalized session with an experienced expat
              advisor — plus a written report you can reference anytime.
            </p>
          </div>

          <div className="cons-included-wrap">
            <div className="cons-included-visual">
              <div className="cons-included-visual-price">
                <span>$</span>199
              </div>
              <div className="cons-included-visual-label">
                per 1:1 consultation
              </div>
              <ul className="cons-included-visual-features">
                <li><Icon name="check" size={18} /> 45–60 minute live call</li>
                <li><Icon name="check" size={18} /> Personalized recommendations</li>
                <li><Icon name="check" size={18} /> Written summary & action plan</li>
                <li><Icon name="check" size={18} /> 7-day money-back guarantee</li>
              </ul>
            </div>

            <div className="cons-included-list">
              {included.map((item, i) => (
                <div key={i} className="cons-included-item">
                  <div className="cons-included-item-icon">
                    <Icon name={item.icon} size={20} />
                  </div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="cons-section">
        <div className="container">
          <div className="cons-section-head">
            <div className="cons-section-eyebrow">How it works</div>
            <h2 className="cons-section-title">Simple, straightforward process</h2>
            <p className="cons-section-desc">
              From booking to your personalized report in 4 easy steps.
            </p>
          </div>

          <div className="cons-steps">
            {steps.map((s, i) => (
              <div key={i} className="cons-step">
                <div className="cons-step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="cons-section alt-bg">
        <div className="container">
          <div className="cons-section-head">
            <div className="cons-section-eyebrow">Pricing</div>
            <h2 className="cons-section-title">Choose the right package for you</h2>
            <p className="cons-section-desc">
              All packages include our 7-day satisfaction guarantee.
              Not happy? Full refund, no questions asked.
            </p>
          </div>

          <div className="cons-pricing-grid">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`cons-pricing-card ${plan.featured ? 'featured' : ''}`}
              >
                {plan.badge && <div className="cons-pricing-badge">{plan.badge}</div>}
                <div className="cons-pricing-name">{plan.name}</div>
                <div className="cons-pricing-price">
                  <span className="cons-pricing-currency">$</span>
                  <span className="cons-pricing-amount">{plan.price}</span>
                </div>
                <div className="cons-pricing-period">{plan.period}</div>
                <div className="cons-pricing-desc">{plan.desc}</div>
                <ul className="cons-pricing-features">
                  {plan.features.map((f, j) => (
                    <li key={j}>
                      <Icon name="check" size={16} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`cons-pricing-btn ${plan.featured ? 'primary' : 'outline'}`}
                  onClick={scrollToForm}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="cons-section">
        <div className="container">
          <div className="cons-section-head">
            <div className="cons-section-eyebrow">Who you'll work with</div>
            <h2 className="cons-section-title">Experienced expat advisory team</h2>
            <p className="cons-section-desc">
              Our advisors have lived, worked, and navigated the immigration systems
              of countries around the world — so we know firsthand what you're going through.
            </p>
          </div>

          <div className="cons-team-grid">
            {teamMembers.map((m, i) => (
              <div key={i} className="cons-team-card">
                <div className="cons-team-avatar">
                  <Icon name={m.icon} size={28} />
                </div>
                <h3>{m.name}</h3>
                <div className="cons-team-role">{m.role}</div>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FORM ===== */}
      <section className="cons-section alt-bg" id="cons-form">
        <div className="container">
          <div className="cons-section-head">
            <div className="cons-section-eyebrow">Book your consultation</div>
            <h2 className="cons-section-title">Let's figure this out together</h2>
            <p className="cons-section-desc">
              Fill out the form below and we'll get back to you within 1 business day
              to schedule your session.
            </p>
          </div>

          <div className="cons-form-wrap">
            {submitted ? (
              <div className="cons-form-success">
                <div className="cons-form-success-icon">
                  <Icon name="checkCircle" size={32} />
                </div>
                <h3>We've received your request</h3>
                <p>
                  Thank you! We've got your booking request and will be in touch via email
                  within 1 business day to confirm your consultation time and send the
                  pre-call questionnaire.
                </p>
              </div>
            ) : (
              <form className="cons-form" onSubmit={handleSubmit}>
                <div className="cons-form-row">
                  <div className="cons-form-field">
                    <label htmlFor="cons-name">Your Name</label>
                    <input
                      id="cons-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Jane Smith"
                      required
                    />
                  </div>
                  <div className="cons-form-field">
                    <label htmlFor="cons-email">Email Address</label>
                    <input
                      id="cons-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="cons-form-row">
                  <div className="cons-form-field">
                    <label htmlFor="cons-country">
                      Preferred destination(s)
                    </label>
                    <select
                      id="cons-country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    >
                      <option value="">Not sure yet — help me decide</option>
                      <option value="portugal">Portugal</option>
                      <option value="spain">Spain</option>
                      <option value="germany">Germany</option>
                      <option value="netherlands">Netherlands</option>
                      <option value="canada">Canada</option>
                      <option value="singapore">Singapore</option>
                      <option value="japan">Japan</option>
                      <option value="thailand">Thailand</option>
                      <option value="mexico">Mexico</option>
                      <option value="other">Other / Multiple</option>
                    </select>
                  </div>
                  <div className="cons-form-field">
                    <label htmlFor="cons-date">
                      Preferred date range
                    </label>
                    <input
                      id="cons-date"
                      type="text"
                      name="datePref"
                      value={formData.datePref}
                      onChange={handleInputChange}
                      placeholder="e.g. Week of Oct 14"
                    />
                  </div>
                </div>

                <div className="cons-form-field full">
                  <label htmlFor="cons-background">
                    Tell us about your situation — family, career, budget, timeline
                  </label>
                  <textarea
                    id="cons-background"
                    name="background"
                    value={formData.background}
                    onChange={handleInputChange}
                    placeholder="For example: Married with 2 kids, currently in tech in SF, budget around $5k/month, hoping to move within 12 months. Most curious about Portugal and Spain."
                    rows={5}
                  ></textarea>
                </div>

                <button type="submit" className="cons-form-submit">
                  Request Your Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="cons-section">
        <div className="container">
          <div className="cons-section-head">
            <div className="cons-section-eyebrow">FAQ</div>
            <h2 className="cons-section-title">Frequently asked questions</h2>
            <p className="cons-section-desc">
              Everything you might want to know before booking.
            </p>
          </div>

          <div className="cons-faq">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`cons-faq-item ${openFaq === i ? 'open' : ''}`}
              >
                <button
                  className="cons-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <Icon name="chevronDown" size={18} />
                </button>
                <div className="cons-faq-a">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </div>
  );
}

Object.assign(window, {
  ConsultationPage,
});
