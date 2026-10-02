/* ============================================================
   Neighborhood Page Component
   ============================================================ */

function NeighborhoodPage({ neighborhoodSlug, onNavigate, onCategoryClick, onArticleClick, onCityClick, onNeighborhoodClick }) {
  // Safety: pull globals from window to avoid ReferenceError if script load order changes
  const _neighborhoodGuides = window.neighborhoodGuides || {};
  const _cityProfiles = window.cityProfiles || {};
  const _neighborhoodSlugMap = window.neighborhoodSlugMap || {};
  const _neighborhoodToCityMap = window.neighborhoodToCityMap || {};

  const rawGuide = _neighborhoodGuides[neighborhoodSlug];
  const [exchangeOpen, setExchangeOpen] = React.useState(false);

  if (!rawGuide) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>Neighborhood not found</h2>
        <p>The neighborhood guide you're looking for doesn't exist.</p>
      </div>
    );
  }

  // Field compatibility layer — supports both old (Mexico) and new (Greece/Italy) data formats.
  // New format uses housing/rentalListings/jobsForExpats; old format uses rentRange/rentals/jobs/essentials.
  const guide = (function normalizeGuide(g) {
    const isEur = g.country && (g.country === 'Greece' || g.country === 'Italy' || g.country === 'Portugal' || g.country === 'Spain');

    // ---- Safety ----
    const rawSafety = g.safety || {};
    const safetyLevel = rawSafety.level || rawSafety.label || 'Moderate';
    const safety = {
      score: typeof rawSafety.score === 'number' ? rawSafety.score : 60,
      level: safetyLevel,
      summary: rawSafety.summary || 'Safety conditions vary by area. Exercise normal precautions.',
      tips: Array.isArray(rawSafety.tips) ? rawSafety.tips : [
        'Keep valuables secure and be aware of your surroundings.',
        'Use licensed transportation services.',
        'Stick to well-lit areas at night.',
      ],
    };

    // ---- Rent range ----
    let rentRange = g.rentRange;
    if (!rentRange && g.housing) {
      rentRange = {
        studio: { mxn: g.housing.rentStudio || '—', usd: g.housing.rentStudio || '—' },
        oneBed: { mxn: g.housing.rentOneBed || '—', usd: g.housing.rentOneBed || '—' },
        twoBed: { mxn: g.housing.rentTwoBed || '—', usd: g.housing.rentTwoBed || '—' },
      };
    }
    if (!rentRange) {
      rentRange = {
        studio: { mxn: '—', usd: '—' },
        oneBed: { mxn: '—', usd: '—' },
        twoBed: { mxn: '—', usd: '—' },
      };
    }
    // Normalize field names inside rentRange (some use 'local' instead of 'mxn')
    for (const k of ['studio', 'oneBed', 'twoBed']) {
      if (rentRange[k]) {
        if (!rentRange[k].mxn && rentRange[k].local) rentRange[k].mxn = rentRange[k].local;
        if (!rentRange[k].mxn) rentRange[k].mxn = '—';
        if (!rentRange[k].usd) rentRange[k].usd = '—';
      }
    }

    // ---- Rentals ----
    let rentals = Array.isArray(g.rentals) ? g.rentals : null;
    if (!rentals && Array.isArray(g.rentalListings)) {
      rentals = g.rentalListings.map((r, i) => {
        let imgIdx = i;
        if (typeof r.image === 'number') imgIdx = r.image;
        else if (r.image && typeof r.image.indexOf === 'function' && r.image.indexOf('RENTAL_IMAGES') >= 0) {
          const m = r.image.match(/\[(\d+)\]/);
          if (m) imgIdx = parseInt(m[1], 10);
        }
        return {
          image: imgIdx,
          title: r.title || 'Cozy apartment',
          type: r.beds || '—',
          size: r.size || '',
          rentMXN: r.price || '—',
          rentUSD: r.price || '—',
          note: r.details || '',
        };
      });
    }
    if (!Array.isArray(rentals)) rentals = [];

    // ---- Jobs ----
    let jobs = g.jobs && typeof g.jobs === 'object' ? g.jobs : null;
    if (!jobs && Array.isArray(g.jobsForExpats)) {
      const iconForTitle = (title) => {
        const t = (title || '').toLowerCase();
        if (t.includes('teach') || t.includes('english') || t.includes('education') || t.includes('tutor')) return 'book';
        if (t.includes('hospitality') || t.includes('bar') || t.includes('restaurant') || t.includes('tour')) return 'fork';
        if (t.includes('remote') || t.includes('digital nomad') || t.includes('freelance') || t.includes('consult')) return 'laptop';
        if (t.includes('healthcare') || t.includes('medical') || t.includes('nurse') || t.includes('doctor')) return 'stethoscope';
        if (t.includes('tech') || t.includes('software') || t.includes('engineer') || t.includes('developer')) return 'laptop';
        if (t.includes('university') || t.includes('research') || t.includes('phd') || t.includes('professor')) return 'book';
        if (t.includes('creative') || t.includes('art') || t.includes('music') || t.includes('design')) return 'lightbulb';
        if (t.includes('retail') || t.includes('shop') || t.includes('sales')) return 'shoppingBag';
        if (t.includes('student') || t.includes('part-time')) return 'book';
        return 'briefcase';
      };
      const types = g.jobsForExpats.map(j => ({
        icon: iconForTitle(j.title),
        title: j.title || 'Job opportunity',
        salary: j.salary || 'Varies',
        desc: j.description || j.desc || '',
      }));
      const platforms = (Array.isArray(g.jobPlatforms) ? g.jobPlatforms : []).map(p => {
        if (typeof p === 'string') return { name: p, url: 'linkedin.com' };
        return p;
      });
      jobs = {
        intro: g.jobWarning || 'Job availability depends on skills and work authorization.',
        types,
        platforms,
        workPermitNote: 'Work authorization rules vary by country and visa type. Always confirm eligibility with local authorities or an immigration lawyer.',
        commuteNote: g.location || '',
      };
    }
    if (jobs) {
      if (!Array.isArray(jobs.types)) jobs.types = [];
      if (!Array.isArray(jobs.platforms)) jobs.platforms = [];
      if (!jobs.intro) jobs.intro = '';
      if (!jobs.workPermitNote) jobs.workPermitNote = '';
      if (!jobs.commuteNote) jobs.commuteNote = '';
    }

    // ---- Essentials: build or fill in missing fields ----
    const rawEssentials = g.essentials && typeof g.essentials === 'object' ? g.essentials : {};
    const rawInternet = g.internet && typeof g.internet === 'object' ? g.internet : (rawEssentials.internet || {});
    const internet = {
      speed: rawInternet.speed || '—',
      providers: rawInternet.providers || '—',
      price: rawInternet.price || '—',
      cost: rawInternet.cost || rawInternet.price || '—',
      note: rawInternet.note || '',
    };

    const rawCost = rawEssentials.costOfLiving || {};
    const singleMonth = rawCost.singleMonth || (g.housing ? g.housing.rentOneBed : null) || '—';
    const coupleMonth = rawCost.coupleMonth || (g.housing ? g.housing.coupleMonth : null) || '—';
    const costOfLiving = {
      singleMonth,
      coupleMonth,
      note: rawCost.note || (g.housing && g.housing.note) || '',
    };

    const gyms = rawEssentials.gyms || g.gyms || 'Gym and fitness options vary by neighborhood.';
    const healthcare = rawEssentials.healthcare || g.healthcare || 'Healthcare facilities and quality vary by area.';
    const expatCommunity = rawEssentials.expatCommunity || g.expatCommunity || 'Expat community size and activity vary by neighborhood.';
    const tips = Array.isArray(rawEssentials.tips) ? rawEssentials.tips : (Array.isArray(g.localTips) ? g.localTips : ['Explore the neighborhood on foot to discover hidden gems.']);

    // Transit: handle both walkability field and essentials.transit
    let transit = rawEssentials.transit && typeof rawEssentials.transit === 'object' ? { ...rawEssentials.transit } : {};
    if (g.walkability && typeof g.walkability === 'object') {
      transit.walkScore = transit.walkScore || g.walkability.score;
      transit.transitScore = transit.transitScore || (g.walkability.transitScore || 60);
      transit.details = Array.isArray(g.walkability.details) ? g.walkability.details : transit.details;
    }
    transit.walkScore = typeof transit.walkScore === 'number' ? transit.walkScore : 70;
    transit.walkLabel = transit.walkLabel || 'Walkable';
    transit.transitScore = typeof transit.transitScore === 'number' ? transit.transitScore : 60;
    transit.transitLabel = transit.transitLabel || 'Moderate';
    transit.carNeeded = transit.carNeeded || 'Depends on the area';
    transit.details = Array.isArray(transit.details) ? transit.details : ['Public transit options vary by city.'];

    const schools = Array.isArray(rawEssentials.schools) ? rawEssentials.schools : ['Schools and education options vary by neighborhood.'];
    const dining = Array.isArray(rawEssentials.dining) ? rawEssentials.dining : ['Local cafes, restaurants, and grocery stores available.'];

    const essentials = {
      transit,
      schools,
      dining,
      costOfLiving,
      internet,
      gyms: typeof gyms === 'string' ? gyms : (Array.isArray(gyms) ? gyms.join(', ') : 'Gym and fitness options vary by neighborhood.'),
      healthcare: typeof healthcare === 'string' ? healthcare : (Array.isArray(healthcare) ? healthcare.join('; ') : 'Healthcare facilities and quality vary by area.'),
      expatCommunity: typeof expatCommunity === 'string' ? expatCommunity : (Array.isArray(expatCommunity) ? expatCommunity.join('; ') : 'Expat community size and activity vary by neighborhood.'),
      tips,
    };

    // ---- Hero image: use existing, or city image, or gradient placeholder ----
    let heroImage = g.heroImage;
    if (!heroImage) {
      // Pick a stable image based on slug hash from the rental image pool as fallback
      const RENTAL_IMGS = window.RENTAL_IMAGES || [];
      if (RENTAL_IMGS.length > 0) {
        let hash = 0;
        const sl = g.slug || g.name || 'default';
        for (let i = 0; i < sl.length; i++) hash = ((hash << 5) - hash + sl.charCodeAt(i)) | 0;
        heroImage = RENTAL_IMGS[Math.abs(hash) % RENTAL_IMGS.length];
      } else {
        heroImage = '';
      }
    }

    // ---- History ----
    const history = g.history || `${g.name || 'This neighborhood'} is a neighborhood in ${g.cityName || 'the city'}, ${g.country || ''}. The area has developed as the city has grown, with a mix of local homes and newer developments. Many expats have settled here in recent years, drawn to the quality of life and affordability.`;

    // ---- Lifestyle & tags ----
    const lifestyle = Array.isArray(g.lifestyle) ? g.lifestyle : [];
    const tags = Array.isArray(g.tags) ? g.tags : (lifestyle.length ? [...lifestyle] : ['Expat Friendly', 'Local Vibe']);

    return {
      ...g,
      heroImage,
      history,
      tags,
      lifestyle,
      safety,
      rentRange,
      rentals,
      jobs,
      essentials,
    };
  })(rawGuide);

  const citySlug = guide.citySlug;
  const cityProfile = _cityProfiles[citySlug];
  const allCityNeighborhoods = cityProfile?.neighborhoods || [];

  // Build ordered neighborhood nav list from _neighborhoodGuides (same city),
  // trying to follow the order in cityProfile.neighborhoods (matched by name).
  const cityGuideList = (function buildCityGuideList() {
    const allGuides = Object.entries(_neighborhoodGuides)
      .filter(([, g]) => g.citySlug === citySlug)
      .map(([slug, g]) => ({ slug, name: g.name }));

    if (!cityProfile?.neighborhoods?.length) return allGuides;

    const normalized = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const nameToGuide = {};
    allGuides.forEach(g => { nameToGuide[normalized(g.name)] = g; });

    const ordered = [];
    const used = new Set();
    for (const n of cityProfile.neighborhoods) {
      const g = nameToGuide[normalized(n.name)];
      if (g) { ordered.push(g); used.add(g.slug); }
    }
    // Append any guides not matched by name (fallback)
    for (const g of allGuides) {
      if (!used.has(g.slug)) ordered.push(g);
    }
    return ordered.length ? ordered : allGuides;
  })();

  const otherNeighborhoods = allCityNeighborhoods.filter(n => {
    // match by name since the city neighborhoods array doesn't have slugs
    return n.name.toLowerCase() !== guide.name.toLowerCase() &&
      n.name.toLowerCase().replace(/[\s/]/g, '') !== guide.name.toLowerCase().replace(/[\s/]/g, '');
  });

  const isEurCountry = guide.country === 'Greece' || guide.country === 'Italy' || guide.country === 'Portugal' || guide.country === 'Spain';
  const currencyCode = isEurCountry ? 'EUR' : 'MXN';
  const safetyColor = guide.safety.score >= 75 ? '#2d8f6f' :
                     guide.safety.score >= 60 ? '#d4a843' : '#c0694c';

  // Compute rental listing image URLs (from data image indexes)
  const rentalListings = (Array.isArray(guide.rentals) ? guide.rentals : []).map((r, i) => ({
    ...r,
    imageUrl: RENTAL_IMAGES[r.image % RENTAL_IMAGES.length],
  }));

  return (
    <div className="nb-page">
      {/* Neighborhood Quick Nav (sticky horizontal scroll) */}
      {cityGuideList.length > 0 && (
        <div className="nb-quick-nav">
          <div className="nb-quick-nav-inner">
            {cityGuideList.map((nb) => {
              const isActive = nb.slug === neighborhoodSlug;
              return (
                <button
                  key={nb.slug}
                  className={`nb-quick-nav-pill${isActive ? ' is-active' : ''}`}
                  onClick={() => {
                    if (!isActive) onNeighborhoodClick(nb.slug);
                  }}
                >
                  {nb.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="nb-breadcrumb">
        <span onClick={() => onNavigate('home')} className="nb-bc-link">Home</span>
        <span className="nb-bc-sep">›</span>
        <span onClick={() => onCityClick(citySlug, guide.cityName, guide.country)} className="nb-bc-link">{guide.cityName}</span>
        <span className="nb-bc-sep">›</span>
        <span className="nb-bc-current">{guide.name}</span>
      </div>

      {/* Back button */}
      <button className="nb-back-btn" onClick={() => onCityClick(citySlug, guide.cityName, guide.country)}>
        ← Back to {guide.cityName} Guide
      </button>

      {/* Hero */}
      <section className="nb-hero">
        <div className="nb-hero-image">
          <img src={guide.heroImage} alt={guide.name} />
          <div className="nb-hero-overlay"></div>
          <div className="nb-hero-content">
            <div className="nb-hero-city">{guide.cityName}, {guide.country}</div>
            <h1 className="nb-hero-title">{guide.name}</h1>
            <p className="nb-hero-tagline">{guide.tagline}</p>
            <div className="nb-hero-tags">
              {(Array.isArray(guide.tags) ? guide.tags : []).map((tag, i) => (
                <span key={i} className="nb-hero-tag">{tag}</span>
              ))}
            </div>
            {guide.lifestyle?.length > 0 && (
              <div className="nb-hero-lifestyle">
                <span className="nb-lifestyle-label">Lifestyle &amp; Culture</span>
                <div className="nb-lifestyle-chips">
                  {(Array.isArray(guide.lifestyle) ? guide.lifestyle : []).map((ls, i) => (
                    <span key={i} className="nb-lifestyle-chip">{ls}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <div className="nb-content-grid">
        {/* Left column */}
        <div className="nb-main-col">

          {/* Safety Rating */}
          <section className="nb-section">
            <h2 className="nb-section-title">
              <Icon name="shield" size={20} /> Safety Rating
            </h2>
            <div className="nb-safety-card">
              <div className="nb-safety-ring">
                <svg viewBox="0 0 120 120" className="nb-safety-ring-svg">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#e8e2d5" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke={safetyColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${guide.safety.score * 3.267} 326.7`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="nb-safety-ring-inner">
                  <div className="nb-safety-score">{guide.safety.score}</div>
                  <div className="nb-safety-score-label">/ 100</div>
                </div>
              </div>
              <div className="nb-safety-info">
                <div className="nb-safety-level" style={{ color: safetyColor }}>{guide.safety.level}</div>
                <p className="nb-safety-summary">{guide.safety.summary}</p>
                <div className="nb-safety-tips-title">Safety Tips</div>
                <ul className="nb-safety-tips">
                  {(Array.isArray(guide.safety?.tips) ? guide.safety.tips : []).map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* History */}
          {guide.history && (
            <section className="nb-section">
              <h2 className="nb-section-title">
                <Icon name="clock" size={20} /> History
              </h2>
              <div className="nb-history-block">
                <p className="nb-history-text">{guide.history}</p>
              </div>
            </section>
          )}

          {/* Housing & Rentals */}
          <section className="nb-section">
            <h2 className="nb-section-title">
              <Icon name="home" size={20} /> Housing & Rentals
            </h2>

            {/* Rent range summary */}
            <div className="nb-rent-range">
              <div className="nb-rent-range-item">
                <div className="nb-rent-type">Studio</div>
                <div className="nb-rent-mxn">{guide.rentRange.studio.mxn} {currencyCode}</div>
                <div className="nb-rent-usd">{guide.rentRange.studio.usd}</div>
              </div>
              <div className="nb-rent-range-item">
                <div className="nb-rent-type">1 Bedroom</div>
                <div className="nb-rent-mxn">{guide.rentRange.oneBed.mxn} {currencyCode}</div>
                <div className="nb-rent-usd">{guide.rentRange.oneBed.usd}</div>
              </div>
              <div className="nb-rent-range-item">
                <div className="nb-rent-type">2 Bedrooms</div>
                <div className="nb-rent-mxn">{guide.rentRange.twoBed.mxn} {currencyCode}</div>
                <div className="nb-rent-usd">{guide.rentRange.twoBed.usd}</div>
              </div>
            </div>

            {/* Sample rental listings */}
            <h3 className="nb-subsection-title">Sample Rental Listings</h3>
            <p className="nb-rental-disclaimer">
              These are example listings for reference. For real-time availability, visit local rental websites.
            </p>
            <div className="nb-rentals-grid">
              {rentalListings.map((r, i) => (
                <div key={i} className="nb-rental-card">
                  <div className="nb-rental-img">
                    <img src={r.imageUrl} alt={r.title} loading="lazy" />
                  </div>
                  <div className="nb-rental-body">
                    <div className="nb-rental-title">{r.title}</div>
                    <div className="nb-rental-meta">
                      <span className="nb-rental-type"><Icon name="home" size={12} /> {r.type}</span>
                      <span className="nb-rental-size"><Icon name="mapPin" size={12} /> {r.size}</span>
                    </div>
                    <div className="nb-rental-price">
                      <span className="nb-rental-mxn">{r.rentMXN} <small>{currencyCode}</small></span>
                      <span className="nb-rental-usd">≈ {r.rentUSD}</span>
                    </div>
                    <div className="nb-rental-note">{r.note}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Local rental sites */}
            <div className="nb-rental-sites">
              <div className="nb-rental-sites-title">Find Real-Time Listings</div>
              <p className="nb-rental-sites-desc">
                Browse current available apartments on the most popular Mexican rental platforms:
              </p>
              <div className="nb-rental-sites-btns">
                <a href="https://www.inmuebles24.com" target="_blank" rel="noopener noreferrer" className="nb-rental-btn">
                  Inmuebles24
                </a>
                <a href="https://www.vivanuncios.com.mx" target="_blank" rel="noopener noreferrer" className="nb-rental-btn">
                  Vivanuncios
                </a>
                <a href="https://www.facebook.com/marketplace" target="_blank" rel="noopener noreferrer" className="nb-rental-btn secondary">
                  Facebook Marketplace
                </a>
              </div>
              <p className="nb-rental-sites-note">
                Note: Listings shown above are examples only. Prices and availability change frequently — always verify directly with the listing platform.
              </p>
            </div>
          </section>

          {/* Local Essentials */}
          <section className="nb-section">
            <h2 className="nb-section-title">
              <Icon name="mapPin" size={20} /> Local Essentials
            </h2>

            {/* Transit & Walkability */}
            <div className="nb-essentials-block">
              <h3 className="nb-essentials-title">
                <Icon name="car" size={16} /> Transportation & Walkability
              </h3>
              <div className="nb-walk-grid">
                <div className="nb-walk-item">
                  <div className="nb-walk-label">Walk Score</div>
                  <div className="nb-walk-score">{guide.essentials.transit.walkScore}</div>
                  <div className="nb-walk-desc">{guide.essentials.transit.walkLabel}</div>
                </div>
                <div className="nb-walk-item">
                  <div className="nb-walk-label">Transit Score</div>
                  <div className="nb-walk-score">{guide.essentials.transit.transitScore}</div>
                  <div className="nb-walk-desc">{guide.essentials.transit.transitLabel}</div>
                </div>
                <div className="nb-walk-item nb-walk-car">
                  <div className="nb-walk-label">Car Needed</div>
                  <div className="nb-walk-desc-car">{guide.essentials.transit.carNeeded}</div>
                </div>
              </div>
              <ul className="nb-bullet-list">
                {(Array.isArray(guide.essentials?.transit?.details) ? guide.essentials.transit.details : []).map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            {/* Schools */}
            <div className="nb-essentials-block">
              <h3 className="nb-essentials-title">
                <Icon name="book" size={16} /> Schools & Education
              </h3>
              <ul className="nb-bullet-list">
                {(Array.isArray(guide.essentials?.schools) ? guide.essentials.schools : []).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Dining & Groceries */}
            <div className="nb-essentials-block">
              <h3 className="nb-essentials-title">
                <Icon name="fork" size={16} /> Dining, Groceries & Shopping
              </h3>
              <ul className="nb-bullet-list">
                {(Array.isArray(guide.essentials?.dining) ? guide.essentials.dining : []).map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            {/* Cost of Living */}
            <div className="nb-essentials-block">
              <h3 className="nb-essentials-title">
                <Icon name="dollar" size={16} /> Estimated Cost of Living
              </h3>
              <div className="nb-cost-grid">
                <div className="nb-cost-item">
                  <div className="nb-cost-label">Single (per month)</div>
                  <div className="nb-cost-value">{guide.essentials.costOfLiving?.singleMonth || '—'}</div>
                </div>
                <div className="nb-cost-item">
                  <div className="nb-cost-label">Couple (per month)</div>
                  <div className="nb-cost-value">{guide.essentials.costOfLiving?.coupleMonth || '—'}</div>
                </div>
              </div>
              <p className="nb-cost-note">{guide.essentials.costOfLiving?.note || ''}</p>
            </div>

            {/* Internet & Utilities */}
            <div className="nb-essentials-block">
              <h3 className="nb-essentials-title">
                <Icon name="wifi" size={16} /> Internet & Amenities
              </h3>
              <div className="nb-essentials-sub">
                <strong>Internet:</strong> {guide.essentials.internet?.speed || '—'}
                <br />
                <strong>Providers:</strong> {guide.essentials.internet?.providers || '—'}
                <br />
                <strong>Price:</strong> {guide.essentials.internet?.price || '—'}
                {guide.essentials.internet?.note && (
                  <><br /><span className="nb-small-note">Note: {guide.essentials.internet.note}</span></>
                )}
              </div>
              <div className="nb-essentials-sub">
                <strong>Gyms & Fitness:</strong> {guide.essentials.gyms}
              </div>
              <div className="nb-essentials-sub">
                <strong>Healthcare:</strong> {guide.essentials.healthcare}
              </div>
            </div>

            {/* Expat Community */}
            <div className="nb-essentials-block">
              <h3 className="nb-essentials-title">
                <Icon name="users" size={16} /> Expat Community
              </h3>
              <p>{guide.essentials.expatCommunity}</p>
            </div>

            {/* Local Tips */}
            <div className="nb-essentials-block nb-tips-block">
              <h3 className="nb-essentials-title">
                <Icon name="lightbulb" size={16} /> Local Tips for Living Here
              </h3>
              <ul className="nb-tips-list">
                {(Array.isArray(guide.essentials?.tips) ? guide.essentials.tips : []).map((tip, i) => (
                  <li key={i}>
                    <span className="nb-tip-icon"><Icon name="lightbulb" size={14} /></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Jobs for US Expats */}
          {guide.jobs && (
            <section className="nb-section">
              <h2 className="nb-section-title">
                <Icon name="briefcase" size={20} /> Jobs for US Expats
              </h2>

              <p className="nb-jobs-intro">{guide.jobs.intro}</p>

              {/* Job type cards */}
              <div className="nb-jobs-grid">
                {(Array.isArray(guide.jobs?.types) ? guide.jobs.types : []).map((job, i) => (
                  <div key={i} className="nb-job-card">
                    <div className="nb-job-card-head">
                      <div className="nb-job-icon"><Icon name={job.icon} size={18} /></div>
                      <div>
                        <h4 className="nb-job-title">{job.title}</h4>
                        <div className="nb-job-salary">{job.salary}</div>
                      </div>
                    </div>
                    <p className="nb-job-desc">{job.desc}</p>
                  </div>
                ))}
              </div>

              {/* Work permit warning */}
              <div className="nb-work-permit-warning">
                <div className="nb-wp-icon">
                  <Icon name="alert" size={22} />
                </div>
                <div className="nb-wp-body">
                  <div className="nb-wp-title">Important: Work Authorization Required</div>
                  <div className="nb-wp-text">{guide.jobs.workPermitNote}</div>
                </div>
              </div>

              {/* Job platforms */}
              <div className="nb-jobs-platforms">
                <h3 className="nb-subsection-title">Where to look for jobs</h3>
                <div className="nb-platform-buttons">
                  {(Array.isArray(guide.jobs?.platforms) ? guide.jobs.platforms : []).map((p, i) => (
                    <a
                      key={i}
                      href={`https://${p.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nb-platform-btn"
                    >
                      <Icon name="externalLink" size={12} /> {p.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Commute note */}
              <div className="nb-jobs-commute">
                <h3 className="nb-subsection-title">
                  <Icon name="mapPin" size={16} style={{ verticalAlign: '-2px' }} /> Commute & local employment note
                </h3>
                <p>{guide.jobs.commuteNote}</p>
              </div>
            </section>
          )}

          {/* FAQ Section */}
          {(() => {
            const nbFaqs = typeof generateNeighborhoodFaqs === 'function' ? generateNeighborhoodFaqs(guide) : [];
            if (!nbFaqs.length) return null;
            return (
              <section className="nb-section">
                <h2 className="nb-section-title">
                  <Icon name="helpCircle" size={20} /> Frequently Asked Questions
                </h2>
                <FAQSection
                  faqs={nbFaqs}
                  title=""
                  subtitle={`Everything to know before moving to ${guide.name}`}
                />
              </section>
            );
          })()}

        </div>

        {/* Right sidebar */}
        <div className="nb-side-col">

          {/* Related neighborhoods */}
          {otherNeighborhoods.length > 0 && (
            <div className="nb-related">
              <h3 className="nb-related-title">More Neighborhoods in {guide.cityName}</h3>
              <div className="nb-related-list">
                {otherNeighborhoods.map((n, i) => {
                  // Find slug from the _neighborhoodSlugMap
                  const idx = allCityNeighborhoods.indexOf(n);
                  const key = `${citySlug}:${idx}`;
                  const slug = _neighborhoodSlugMap[key];
                  return (
                    <div
                      key={i}
                      className="nb-related-item"
                      onClick={() => slug && onNeighborhoodClick(slug)}
                    >
                      {n.image && (
                        <div className="nb-related-img">
                          <img src={n.image} alt={n.name} loading="lazy" />
                        </div>
                      )}
                      <div className="nb-related-body">
                        <div className="nb-related-name">{n.name}</div>
                        <div className="nb-related-vibe">{n.vibe}</div>
                        <div className="nb-related-rent">{n.rent}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Export to window
Object.assign(window, {
  NeighborhoodPage,
});
