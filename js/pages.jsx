/* ============================================================
   ExpatGuide — Page Components
   ============================================================ */

// ============================================================
// HOME PAGE
// ============================================================
function HomePage({ onNavigate, onCategoryClick, onArticleClick, onRankingClick, onCityClick }) {
  const featuredArticles = articles.slice(0, 3);
  const latestArticles = articles.slice(3, 9);

  return (
    <div className="fade-in">
      <Hero
        onTagClick={(q) => console.log('Search:', q)}
        onSearch={(q) => console.log('Search:', q)}
      />

      {/* City Finder CTA Banner */}
      <section className="home-quiz-cta">
        <div className="container">
          <div className="home-quiz-cta-inner">
            <div className="home-quiz-cta-content">
              <div className="home-quiz-cta-eyebrow">
                <Icon name="sparkles" size={14} />
                2-minute quiz
              </div>
              <h2 className="home-quiz-cta-title">Not sure where to start?</h2>
              <p className="home-quiz-cta-desc">
                Answer a few questions and we'll match you with the best cities in Mexico based on your lifestyle, budget, and priorities.
              </p>
            </div>
            <button
              className="btn btn-primary btn-lg home-quiz-cta-btn"
              onClick={() => onNavigate('cityFinder')}
            >
              Take the City Finder quiz
              <Icon name="arrowRight" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-eyebrow">Explore by Topic</div>
              <h2 className="section-title">Everything you need to start your expat journey</h2>
              <p className="section-desc">
                Browse our most popular categories, each packed with in-depth guides, checklists, and practical advice from real expats.
              </p>
            </div>
            <a className="section-link" onClick={() => onNavigate('home')}>
              View all categories <Icon name="arrowRight" size={14} />
            </a>
          </div>

          <div className="category-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} onClick={onCategoryClick} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured / Latest Articles */}
      <section className="section" style={{ background: 'var(--ink-50)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-eyebrow">Latest Guides</div>
              <h2 className="section-title">Fresh from our editors</h2>
              <p className="section-desc">
                New and updated guides to help you navigate life abroad — thoroughly researched and regularly updated.
              </p>
            </div>
            <a className="section-link">
              Browse all articles <Icon name="arrowRight" size={14} />
            </a>
          </div>

          <div className="article-grid">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} onClick={onArticleClick} />
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="section destinations-section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-eyebrow">Popular Destinations</div>
              <h2 className="section-title">Explore top expat cities</h2>
              <p className="section-desc">
                In-depth city guides covering cost of living, visa options, neighborhoods, and community insights.
              </p>
            </div>
            <a className="section-link" onClick={onRankingClick}>
              View full ranking <Icon name="arrowRight" size={14} />
            </a>
          </div>

          <div className="city-explore-groups">
            {(() => {
              const _profiles = window.cityProfiles || {};
              const groups = {};
              Object.entries(_profiles).forEach(([slug, p]) => {
                if (!p || !p.name || !slug) return;
                const c = p.country || 'Other';
                if (!groups[c]) groups[c] = [];
                // avoid duplicate slugs within same country
                if (!groups[c].find(x => x.slug === slug)) {
                  groups[c].push({ slug, name: p.name, heroImage: p.heroImage, country: c });
                }
              });
              const sortedCountries = Object.keys(groups).sort((a, b) => {
                // sort by number of cities desc, then alphabetically
                if (groups[b].length !== groups[a].length) return groups[b].length - groups[a].length;
                return a.localeCompare(b);
              });
              return sortedCountries.map((country) => (
                <div key={country} className="city-explore-group">
                  <div className="city-explore-group-head">
                    <h3 className="city-explore-group-title">{country}</h3>
                    <span className="city-explore-group-count">{groups[country].length} {groups[country].length === 1 ? 'city' : 'cities'}</span>
                  </div>
                  <div className="city-explore-grid">
                    {groups[country].map((city) => (
                      <button
                        key={city.slug}
                        className="city-explore-tile"
                        onClick={() => onCityClick && onCityClick(city.slug, city.name, city.country)}
                      >
                        {city.heroImage ? (
                          <img src={city.heroImage} alt={city.name} className="city-explore-tile-img" />
                        ) : (
                          <div className="city-explore-tile-fallback" />
                        )}
                        <div className="city-explore-tile-overlay" />
                        <div className="city-explore-tile-text">
                          <div className="city-explore-tile-name">{city.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Featured guides spotlight - editorial-style feature strip */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-eyebrow">Editor's Picks</div>
              <h2 className="section-title">Essential reading for new expats</h2>
              <p className="section-desc">
                Our most comprehensive guides — curated to give you the strongest start in your new country.
              </p>
            </div>
          </div>

          <div className="article-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} onClick={onArticleClick} />
            ))}
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </div>
  );
}

// ============================================================
// ARTICLE PAGE
// ============================================================
function ArticlePage({ articleSlug, onNavigate, onCategoryClick, onArticleClick }) {
  const article = articles.find((a) => a.slug === articleSlug) || articles[0];
  const author = authors[article.author];
  const category = categories.find((c) => c.slug === article.category);
  const [activeSection, setActiveSection] = React.useState('');

  // Extract headings for TOC from article content
  const headings = React.useMemo(() => {
    if (!article.content) return [];
    const result = [];
    article.content.forEach((block, i) => {
      if (block.type === 'h2' || block.type === 'h3') {
        result.push({
          id: `section-${i}`,
          text: block.text,
          level: block.type,
        });
      }
    });
    return result;
  }, [article.slug]);

  // Scroll spy for TOC
  React.useEffect(() => {
    if (!article.content) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [article.slug, headings.length]);

  // Scroll to top on article change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.slug]);

  // Related articles (same category, excluding current)
  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  // If article has no content, show a placeholder article body
  const articleContent = article.content || [
    { type: 'h2', text: 'Introduction' },
    { type: 'p', text: article.excerpt },
    { type: 'p', text: 'Moving to a new country is one of the most exciting — and most challenging — experiences you will ever have. The practical details alone can feel overwhelming: visas, housing, bank accounts, healthcare, taxes. But with the right information and a clear plan, you can navigate each step with confidence.' },
    { type: 'tip', title: 'Good to know', text: 'This is a sample article body designed to showcase the article page template. In production, each article would have fully researched, up-to-date content written by subject-matter experts.' },
    { type: 'h2', text: 'Getting Started' },
    { type: 'p', text: 'Before you make any big decisions, take time to research your destination thoroughly. Different countries have very different rules, costs, and lifestyles. What works for one expat might not work for you — and that is okay.' },
    { type: 'h3', text: 'Research Your Options' },
    { type: 'p', text: 'Start with the basics: visa requirements, cost of living, job market, and healthcare quality. Then dig deeper into the specifics that matter most to you and your family.' },
    { type: 'ul', items: [
      'Visa and residency options',
      'Cost of living breakdown',
      'Housing market and availability',
      'Healthcare quality and accessibility',
      'School options (if you have children)',
      'Job market and work culture',
    ]},
    { type: 'h3', text: 'Visit First If You Can' },
    { type: 'p', text: 'Nothing replaces a first-hand visit. If budget and time allow, spend at least two to four weeks in your target destination before committing to a move. Rent an apartment in a neighborhood you are considering, use local transit, try grocery shopping, and talk to other expats.' },
    { type: 'blockquote', text: 'The best way to know if a place is right for you is to live like a local — not like a tourist. Skip the landmarks and spend your time doing everyday things.' },
    { type: 'h2', text: 'Planning Your Move' },
    { type: 'p', text: 'Once you have decided on your destination, it is time to get organized. A structured approach will save you stress, money, and last-minute surprises.' },
    { type: 'table', headers: ['Task', 'Timeline', 'Priority'], rows: [
      ['Apply for visa / residency', '3–6 months before', 'High'],
      ['Book flights and temporary housing', '2–3 months before', 'High'],
      ['Set up international bank accounts', '1–2 months before', 'Medium'],
      ['Sell / ship your belongings', '1–2 months before', 'Medium'],
      ['Get international health insurance', '1 month before', 'High'],
      ['Notify tax authorities', '1–3 months before', 'Medium'],
    ]},
    { type: 'warning', title: 'Before you go', text: 'Make sure you have all important documents — passports, birth certificates, marriage certificates, academic degrees — translated and apostilled well in advance. Some countries require these for visa applications, and processing can take weeks.' },
    { type: 'h2', text: 'Settling In' },
    { type: 'p', text: 'The first few months in a new country are a whirlwind. Be kind to yourself and expect a period of adjustment. Culture shock is real, even for experienced expats.' },
    { type: 'h3', text: 'Build Your Routine Slowly' },
    { type: 'p', text: 'Do not try to do everything at once. Focus on the essentials first — getting your residence card, opening a bank account, finding a regular grocery store — then layer in the rest over time.' },
    { type: 'h3', text: 'Connect with the Community' },
    { type: 'p', text: 'One of the fastest ways to feel at home is to build a social network. Join expat groups, take language classes, volunteer, or find a hobby group. The expat community is often incredibly welcoming and supportive.' },
    { type: 'h2', text: 'Next Steps' },
    { type: 'p', text: 'Ready to dive deeper? Check out the related articles below for more detailed guides on specific aspects of expat life. And subscribe to our newsletter for weekly tips and updates.' },
  ];

  return (
    <div className="article-page fade-in">
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Home', onClick: () => onNavigate('home') },
            { label: category.name, onClick: () => onCategoryClick(category.slug) },
            { label: article.title },
          ]}
        />

        <div className="article-layout">
          <main className="article-main">
            <header className="article-header">
              <span className="article-category-badge" onClick={() => onCategoryClick(category.slug)}>
                <Icon name={category.icon} size={12} />
                {category.name}
              </span>
              <h1>{article.title}</h1>
              {article.subtitle && (
                <p className="article-subtitle">{article.subtitle}</p>
              )}
              <div className="article-meta-row">
                <div className="article-meta-author">
                  <div className="article-meta-avatar">{author.initials}</div>
                  <div className="article-meta-info">
                    <div className="name">{author.name}</div>
                    <div className="role">{author.role}</div>
                  </div>
                </div>
                <div className="article-meta-details">
                  <span className="item">
                    <Icon name="calendar" size={14} />
                    {article.date}
                  </span>
                  <span className="item">
                    <Icon name="clock" size={14} />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </header>

            <div className="article-featured-image">
              <GradientImage index={article.imageIndex} alt={article.title} overlay />
            </div>

            <ArticleBody content={articleContent} />

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <section className="related-section">
                <h2>Related Articles</h2>
                <div className="related-grid">
                  {relatedArticles.map((a) => (
                    <ArticleCard key={a.slug} article={a} onClick={onArticleClick} />
                  ))}
                </div>
              </section>
            )}
          </main>

          <aside className="article-sidebar">
            <TableOfContents headings={headings.length > 0 ? headings : [
              { id: 'section-0', text: 'Introduction', level: 'h2' },
              { id: 'section-3', text: 'Getting Started', level: 'h2' },
              { id: 'section-4', text: 'Research Your Options', level: 'h3' },
              { id: 'section-6', text: 'Visit First If You Can', level: 'h3' },
              { id: 'section-8', text: 'Planning Your Move', level: 'h2' },
              { id: 'section-12', text: 'Settling In', level: 'h2' },
              { id: 'section-13', text: 'Build Your Routine Slowly', level: 'h3' },
              { id: 'section-15', text: 'Connect with the Community', level: 'h3' },
              { id: 'section-16', text: 'Next Steps', level: 'h2' },
            ]} activeId={activeSection} />

            <div style={{ marginTop: 'var(--space-5)' }}>
              <SidebarPopular articles={articles} onArticleClick={onArticleClick} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CATEGORY PAGE
// ============================================================
function CategoryPage({ categorySlug, onNavigate, onCategoryClick, onArticleClick }) {
  const category = categories.find((c) => c.slug === categorySlug) || categories[0];
  const [filter, setFilter] = React.useState('all');
  const [sort, setSort] = React.useState('newest');

  // Get articles for this category
  const categoryArticles = articles.filter((a) => a.category === category.slug);
  // Pad with more articles from other categories to make the list feel full
  const allArticles = [
    ...categoryArticles,
    ...articles.filter((a) => a.category !== category.slug).map((a) => ({
      ...a,
      category: category.slug,
      imageIndex: (a.imageIndex + 3) % imagePairs.length,
    })).slice(0, 6),
  ];

  const filtered = React.useMemo(() => {
    let result = [...allArticles];
    if (sort === 'popular') {
      result = result.reverse();
    }
    return result;
  }, [filter, sort, category.slug]);

  // Scroll to top on category change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categorySlug]);

  return (
    <div className="fade-in">
      <section className="category-hero">
        <div className="category-hero-inner">
          <div className="category-hero-icon">
            <Icon name={category.icon} size={36} />
          </div>
          <div>
            <Breadcrumb
              items={[
                { label: 'Home', onClick: () => onNavigate('home') },
                { label: category.name },
              ]}
            />
            <h1>{category.name}</h1>
            <p>{category.description}</p>
            <div className="category-stats">
              <div className="category-stat">
                <span className="num">{category.articles}</span>
                <span className="label">Guides & Articles</span>
              </div>
              <div className="category-stat">
                <span className="num">12</span>
                <span className="label">Country Guides</span>
              </div>
              <div className="category-stat">
                <span className="num">4.8</span>
                <span className="label">Reader Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="category-content">
        <div className="container">
          <div className="category-layout">
            <div>
              <div className="category-filter-bar">
                <div className="filter-tabs">
                  <button
                    className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                  >
                    All
                  </button>
                  <button
                    className={`filter-tab ${filter === 'guides' ? 'active' : ''}`}
                    onClick={() => setFilter('guides')}
                  >
                    Guides
                  </button>
                  <button
                    className={`filter-tab ${filter === 'checklists' ? 'active' : ''}`}
                    onClick={() => setFilter('checklists')}
                  >
                    Checklists
                  </button>
                  <button
                    className={`filter-tab ${filter === 'news' ? 'active' : ''}`}
                    onClick={() => setFilter('news')}
                  >
                    News
                  </button>
                </div>

                <select
                  className="sort-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="newest">Newest first</option>
                  <option value="popular">Most popular</option>
                  <option value="read-time">Quickest reads</option>
                </select>
              </div>

              <div className="category-article-list">
                {filtered.map((article) => (
                  <div
                    key={article.slug + Math.random()}
                    className="category-article-item"
                    onClick={() => onArticleClick(article.slug)}
                  >
                    <div className="thumb">
                      <GradientImage index={article.imageIndex} alt={article.title} />
                    </div>
                    <div className="content">
                      <span className="category-tag">
                        <Icon name={category.icon} size={10} style={{ marginRight: '4px', verticalAlign: '-1px' }} />
                        {category.shortName}
                      </span>
                      <h3>{article.title}</h3>
                      <p className="excerpt">{article.excerpt}</p>
                      <div className="meta">
                        <span><Icon name="calendar" size={12} style={{ marginRight: '3px', verticalAlign: '-1px' }} />{article.date}</span>
                        <span><Icon name="clock" size={12} style={{ marginRight: '3px', verticalAlign: '-1px' }} />{article.readTime}</span>
                        <span style={{ marginLeft: 'auto' }}>
                          {authors[article.author % authors.length].name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-7)', gap: '6px' }}>
                {['1', '2', '3', '4', '...', '12'].map((p, i) => (
                  <button
                    key={i}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border)',
                      background: p === '1' ? 'var(--teal-500)' : 'var(--white)',
                      color: p === '1' ? 'white' : 'var(--ink-700)',
                      fontSize: '0.88rem',
                      fontWeight: p === '1' ? '600' : '400',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <aside className="sidebar category-sidebar">
              <SidebarCategoryList onCategoryClick={onCategoryClick} currentSlug={category.slug} />
              <SidebarPopular articles={articles} onArticleClick={onArticleClick} />

              <div className="sidebar-widget" style={{ background: 'var(--teal-50)', borderColor: 'var(--teal-200)' }}>
                <h4 style={{ color: 'var(--teal-700)' }}>Need personalized advice?</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-500)', marginBottom: 'var(--space-3)' }}>
                  Book a 1-on-1 consultation with one of our {category.name.toLowerCase()} experts.
                </p>
                <button className="btn btn-primary" style={{ width: '100%', fontSize: '0.85rem' }}>
                  Book a Consultation
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </div>
  );
}

// ============================================================
// RANKING PAGE — Top Countries Loved by US Expats
// ============================================================
function RankingPage({ onNavigate, onCategoryClick, onArticleClick, onCityClick, onVisaClick, onBankClick }) {
  // Initialize votes from localStorage or fall back to initialVotes
  const [votes, setVotes] = React.useState(() => {
    try {
      const saved = localStorage.getItem('expatguide-ranking-votes');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
    const initial = {};
    rankedCountries.forEach((c) => {
      initial[c.slug] = c.initialVotes;
    });
    return initial;
  });

  // Track which countries user has already voted for (one per country)
  const [voted, setVoted] = React.useState(() => {
    try {
      const saved = localStorage.getItem('expatguide-ranking-voted');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {};
  });

  // Persist votes to localStorage whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem('expatguide-ranking-votes', JSON.stringify(votes));
    } catch (e) { /* ignore */ }
  }, [votes]);

  React.useEffect(() => {
    try {
      localStorage.setItem('expatguide-ranking-voted', JSON.stringify(voted));
    } catch (e) { /* ignore */ }
  }, [voted]);

  // Sort countries by vote count (descending)
  const sortedCountries = React.useMemo(() => {
    return [...rankedCountries]
      .sort((a, b) => (votes[b.slug] || 0) - (votes[a.slug] || 0));
  }, [votes]);

  const [celebrating, setCelebrating] = React.useState({});

  const triggerCelebrate = (slug) => {
    setCelebrating((prev) => ({ ...prev, [slug]: Date.now() }));
    setTimeout(() => {
      setCelebrating((prev) => {
        const next = { ...prev };
        delete next[slug];
        return next;
      });
    }, 1100);
  };

  const handleVote = (slug) => {
    if (voted[slug]) {
      // Un-vote
      setVoted((prev) => {
        const next = { ...prev };
        delete next[slug];
        return next;
      });
      setVotes((prev) => ({
        ...prev,
        [slug]: Math.max(0, (prev[slug] || 0) - 1),
      }));
    } else {
      triggerCelebrate(slug);
      setVoted((prev) => ({ ...prev, [slug]: true }));
      setVotes((prev) => ({
        ...prev,
        [slug]: (prev[slug] || 0) + 1,
      }));
    }
  };

  const [expandedCities, setExpandedCities] = React.useState(() => {
    const init = {};
    rankedCountries.forEach((c) => { init[c.slug] = true; });
    upcomingCountries.forEach((c) => { init[c.slug] = true; });
    affordableCountries.forEach((c) => { init[c.slug] = true; });
    englishFriendlyCountries.forEach((c) => { init[c.slug] = true; });
    return init;
  });
  const [pppCountry, setPppCountry] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('popular');

  // Helper: get city hero image from cityProfiles by slug
  const getCityHeroImage = (citySlug) => {
    const profiles = window.cityProfiles || {};
    const profile = profiles[citySlug];
    return profile && profile.heroImage ? profile.heroImage : null;
  };

  const rankingTabs = [
    { id: 'popular', label: 'Most Popular', icon: 'trophy', subtitle: 'Based on thousands of expat votes' },
    { id: 'upcoming', label: 'Upcoming', icon: 'thumbsUp', subtitle: 'Destinations rapidly gaining attention' },
    { id: 'affordable', label: 'Most Affordable', icon: 'wallet', subtitle: 'Lowest cost of living vs. the US' },
    { id: 'english', label: 'English-Friendly', icon: 'languages', subtitle: 'Highest English proficiency' },
  ];

  const currentTab = rankingTabs.find((t) => t.id === activeTab) || rankingTabs[0];

  const toggleCities = (slug, e) => {
    setExpandedCities((prev) => {
      const willExpand = !prev[slug];
      // If expanding, scroll the panel into view after state update
      if (willExpand && e && e.currentTarget) {
        const btn = e.currentTarget;
        requestAnimationFrame(() => {
          const panel = btn.parentElement.querySelector('.cities-panel');
          if (panel) panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        });
      }
      return {
        ...prev,
        [slug]: willExpand,
      };
    });
  };

  const openPpp = (country) => setPppCountry(country);
  const closePpp = () => setPppCountry(null);

  const getPriceItemIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('meal for') || n.includes('restaurant') || n.includes('dining')) return '🍽️';
    if (n.includes('eggs') || n.includes('bread') || n.includes('milk') || n.includes('rice')
      || n.includes('chicken') || n.includes('beef') || n.includes('tomatoes') || n.includes('potatoes')
      || n.includes('groceries') || n.includes('supermarket')) return '🛒';
    if (n.includes('apartment rent') || n.includes('rent') || n.includes('housing')) return '🏠';
    if (n.includes('utilities') || n.includes('electricity') || n.includes('water, gas') || n.includes('bills')) return '💡';
    if (n.includes('gasoline') || n.includes('public transit') || n.includes('metro') || n.includes('mrt')
      || n.includes('transit') || n.includes('taxi') || n.includes('grab') || n.includes('uber') || n.includes('bus')) return '🚇';
    if (n.includes('internet') || n.includes('phone') || n.includes('mobile') || n.includes('smartphone')) return '🌐';
    if (n.includes('movie ticket') || n.includes('entertainment') || n.includes('nightlife')) return '🎬';
    if (n.includes('gym') || n.includes('fitness') || n.includes('sports')) return '🏋️';
    if (n.includes('health insurance') || n.includes('healthcare') || n.includes('doctor') || n.includes('medicine')) return '🏥';
    if (n.includes('clothing') || n.includes('shopping')) return '👕';
    if (n.includes('cappuccino') || n.includes('coffee')) return '☕';
    if (n.includes('beer') || n.includes('wine') || n.includes('drink')) return '🍺';
    if (n.includes('preschool') || n.includes('kindergarten') || n.includes('university') || n.includes('tuition')
      || n.includes('school') || n.includes('education') || n.includes('childcare')) return '🎓';
    if (n.includes('taxes') || n.includes('tax ')) return '🧾';
    if (n.includes('suv') || n.includes('toyota') || n.includes('car')) return '🚗';
    return null;
  };

  // Sort countries by vote count (descending)
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const formatNumber = (n) => n.toLocaleString();

  return (
    <div className="fade-in">
      <section className="ranking-hero">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Home', onClick: () => onNavigate('home') },
              { label: 'Top Countries Ranking' },
            ]}
          />
          <div className="ranking-hero-content">
              <div className="ranking-hero-icon">
                <Icon name="trophy" size={40} />
              </div>
              <div className="section-eyebrow" style={{ color: 'var(--teal-600)' }}>2025 Ranking</div>
              <h1 className="ranking-hero-title">
                Top Countries Loved by <em>US Expats</em>
              </h1>
              <p className="ranking-hero-sub">
                {currentTab.subtitle}
              </p>
              <div className="ranking-stats-row">
                <div className="ranking-stat">
                  <div className="num">
                    {activeTab === 'popular' ? '10' :
                     activeTab === 'upcoming' ? '8' :
                     activeTab === 'affordable' ? '8' : '10'}
                  </div>
                  <div className="label">Countries ranked</div>
                </div>
                <div className="ranking-stat">
                  <div className="num">
                    {activeTab === 'popular' ? formatNumber(Object.values(votes).reduce((a, b) => a + b, 0)) :
                     activeTab === 'upcoming' ? '8' :
                     activeTab === 'affordable' ? 'Top 55%+' : 'Top 10'}
                  </div>
                  <div className="label">
                    {activeTab === 'popular' ? 'Total votes' :
                     activeTab === 'upcoming' ? 'Growing fast' :
                     activeTab === 'affordable' ? 'vs. US average' : 'EF EPI Score'}
                  </div>
                </div>
                <div className="ranking-stat">
                  <div className="num">
                    {activeTab === 'popular' ? '4' :
                     activeTab === 'upcoming' ? '3' :
                     activeTab === 'affordable' ? '3' : '2'}
                  </div>
                  <div className="label">Regions</div>
                </div>
              </div>

              {/* Ranking tabs */}
              <div className="ranking-tabs">
                {rankingTabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`ranking-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon name={tab.icon} size={15} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
        </div>
      </section>

      <section className="ranking-list-section">
        <div className="container">
          <div className="ranking-list">

            {/* ====== Most Popular Tab (original full cards) ====== */}
            {activeTab === 'popular' && sortedCountries.map((country, index) => {
              const rank = index + 1;
              const hasVoted = voted[country.slug];
              const voteCount = votes[country.slug] || 0;
              const isTop3 = rank <= 3;

              return (
                <div
                  key={country.slug}
                  className={`ranking-card ${isTop3 ? 'ranking-card-top' : ''}`}
                >
                  <div className={`ranking-rank ${isTop3 ? `rank-${rank}` : ''}`}>
                    {isTop3 ? (
                      <Icon name="trophy" size={22} />
                    ) : (
                      <span className="rank-number">{rank}</span>
                    )}
                  </div>

                  <div className="ranking-flag">
                    <CountryHeroMedia
                      country={country}
                      imageUrl={country.imageUrl}
                      imageIndex={country.imageIndex}
                      videoUrl={countryVideos[country.name]}
                      alt={country.name}
                      imgClassName="ranking-flag-img"
                    />
                    <FlagBadge flagEmoji={country.flagEmoji} size={36} alt={country.name} className="ranking-flag-emoji" />
                  </div>

                  <div className="ranking-body">
                    <div className="ranking-header-row">
                      <h3 className="ranking-country-name">
                        {country.name}
                        <FlagBadge flagEmoji={country.flagEmoji} size={24} alt={country.name} className="ranking-flag-inline" />
                      </h3>
                      <div className="ranking-header-tags">
                        <span className="ranking-region">
                          <Icon name="globe" size={13} /> {country.continent}
                        </span>
                        {country.usExpatsEstimate && (
                          <span className="ranking-badge">
                            <Icon name="usersRound" size={12} /> {country.usExpatsEstimate} US expats
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="ranking-intro">{country.intro}</p>

                    <div className="ranking-stats-grid">
                      <div className="ranking-stat-cell">
                        <Icon name="building" size={16} />
                        <div>
                          <span className="stat-cell-label">Capital</span>
                          <span className="stat-cell-value">
                            {country.capital}
                            <span className="stat-cell-sublabel"> · {country.capitalPopulation}</span>
                          </span>
                        </div>
                      </div>
                      <div className="ranking-stat-cell">
                        <Icon name="users" size={16} />
                        <div>
                          <span className="stat-cell-label">Population</span>
                          <span className="stat-cell-value">{country.population}</span>
                        </div>
                      </div>
                      <div className="ranking-stat-cell">
                        <Icon name="languages" size={16} />
                        <div>
                          <span className="stat-cell-label">Language</span>
                          <span className="stat-cell-value stat-cell-language">
                            {country.language}
                            <span className={`eng-tag eng-${country.englishLevel}`} title={country.englishNote}>
                              <span className="eng-dot" /> {country.englishLevelLabel}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div
                        className="ranking-stat-cell currency-cell"
                        onDoubleClick={() => openPpp(country)}
                        title="Double-click for cost of living in USD"
                      >
                        <Icon name="coin" size={16} />
                        <div>
                          <span className="stat-cell-label">
                            Currency <span className="dbl-hint">double-click for prices</span>
                          </span>
                          <span className="stat-cell-value">{country.currency}</span>
                          <span className="stat-rate">
                            1 USD ≈ {(1 / country.exchangeRateToUsd).toFixed(country.exchangeRateToUsd > 0.5 ? 2 : 0)} {country.currencyCode}
                          </span>
                        </div>
                      </div>
                      <div className="ranking-stat-cell">
                        <Icon name="wallet" size={16} />
                        <div>
                          <span className="stat-cell-label">Cost of Living Index</span>
                          <span className="stat-cell-value">
                            {country.costOfLivingIndex}
                            <span className="stat-cell-sublabel"> / 100</span>
                          </span>
                        </div>
                      </div>
                      <div className="ranking-stat-cell">
                        <Icon name="thermometer" size={16} />
                        <div>
                          <span className="stat-cell-label">Avg. Temperature</span>
                          <span className="stat-cell-value">{country.avgTemperature}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ranking-scores-row">
                      <div className="ranking-score">
                        <div className="score-label">
                          <Icon name="shield" size={14} /> Safety
                        </div>
                        <div className="score-bar">
                          <div
                            className="score-bar-fill"
                            style={{ width: `${parseInt(country.safetyIndex) / 100 * 100}%` }}
                          />
                        </div>
                        <div className="score-value">{country.safetyIndex}</div>
                      </div>
                      <div className="ranking-score">
                        <div className="score-label">
                          <Icon name="stethoscope" size={14} /> Healthcare
                        </div>
                        <div className="score-bar">
                          <div
                            className="score-bar-fill"
                            style={{ width: `${parseFloat(country.healthcareRating) / 10 * 100}%` }}
                          />
                        </div>
                        <div className="score-value">{country.healthcareRating}</div>
                      </div>
                    </div>

                    <div className="ranking-why">
                      <div className="ranking-why-title">Why it's popular</div>
                      <ul className="ranking-why-list">
                        {(country.whyPopular || []).map((reason, i) => (
                          <li key={i}>
                            <Icon name="checkCircle" size={14} />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Visa & Immigration button */}
                    <div className="ranking-visa-row">
                      <button
                        className="btn btn-teal btn-visa-inline"
                        onClick={() => onVisaClick && onVisaClick(country.slug)}
                      >
                        <Icon name="passport" size={16} />
                        <span>Visa &amp; Immigration Guide</span>
                        <Icon name="arrowRight" size={14} />
                      </button>
                    </div>

                    {/* Bank, Money & Tax button */}
                    <div className="ranking-bank-row">
                      <button
                        className="btn btn-teal btn-bank-inline"
                        onClick={() => onBankClick && onBankClick(country.slug)}
                      >
                        <Icon name="bank" size={16} />
                        <span>Bank, Money &amp; Tax</span>
                        <Icon name="arrowRight" size={14} />
                      </button>
                    </div>

                  </div>

                  <div className="ranking-vote-col">
                    <div className={`vote-btn-wrap ${celebrating[country.slug] ? 'celebrate' : ''}`}>
                      <button
                        className={`vote-btn ${hasVoted ? 'voted' : ''} ${celebrating[country.slug] ? 'celebrate' : ''}`}
                        onClick={() => handleVote(country.slug)}
                        aria-label={hasVoted ? 'Remove vote' : 'Upvote'}
                      >
                        <Icon name="thumbsUp" size={20} />
                      </button>
                      <div className="vote-particles">
                        {[0,1,2,3,4,5,6,7].map((i) => {
                          const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
                          const dist = 28 + (i % 3) * 6;
                          const dx = Math.cos(angle) * dist;
                          const dy = Math.sin(angle) * dist;
                          const isStar = i % 2 === 0;
                          const delay = (i % 4) * 0.03;
                          const size = isStar ? 14 : (6 + (i % 3) * 2);
                          return (
                            <span
                              key={`${country.slug}-p-${i}`}
                              className={`vote-particle ${isStar ? 'star' : ''}`}
                              style={{
                                '--particle-end': `translate(${dx}px, ${dy}px)`,
                                animationDelay: `${delay}s`,
                                width: `${size}px`,
                                height: `${size}px`,
                                marginLeft: `-${size/2}px`,
                                marginTop: `-${size/2}px`,
                              }}
                            />
                          );
                        })}
                        <span className="vote-glow-ring" />
                      </div>
                    </div>
                    <div className="vote-count" title={`${formatNumber(voteCount)} votes`}>
                      {formatNumber(voteCount)}
                    </div>
                    <div className="vote-label">votes</div>
                    <div className="vote-trend">
                      <Icon name="heart" size={12} />
                      <span>#{rank}</span>
                    </div>

                    {/* Cities — vertical list in right column, below vote button */}
                    {country.topCities && country.topCities.length > 0 && (
                      <div className="ranking-cities-sidebar">
                        <div className="ranking-cities-sidebar-title">
                          <Icon name="building" size={12} />
                          <span>Top {country.name} Cities</span>
                        </div>
                        <div className="ranking-cities-vertical">
                          {(country.topCities || []).filter((city) => city && city.name && city.slug).map((city, ci) => (
                             <div
                               key={`${country.slug}-${city.slug}`}
                               className="city-vertical-item"
                               style={{
                                 backgroundImage: getCityHeroImage(city.slug)
                                   ? `url(${getCityHeroImage(city.slug)})`
                                   : undefined,
                               }}
                               onClick={() => onCityClick && onCityClick(city.slug, city.name, country.name)}
                               title="Click to open community"
                             >
                               <div className="city-vertical-overlay"></div>
                               <div className="city-vertical-rank">{ci + 1}</div>
                               <div className="city-vertical-thumb">
                                {city.imageUrl ? (
                                  <img
                                    src={city.imageUrl}
                                    alt={city.name}
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                      const fallback = e.currentTarget.nextElementSibling;
                                      if (fallback) fallback.style.display = 'flex';
                                    }}
                                  />
                                ) : null}
                                {!city.imageUrl ? (
                                  <div className="city-vertical-thumb-fallback">
                                    <span>{city.name.charAt(0)}</span>
                                  </div>
                                ) : (
                                  <div className="city-vertical-thumb-fallback" style={{ display: 'none' }}>
                                    <span>{city.name.charAt(0)}</span>
                                  </div>
                                )}
                              </div>
                              <div className="city-vertical-info">
                                <div className="city-vertical-name">{city.name}</div>
                                <div className="city-vertical-expats">
                                  <Icon name="usersRound" size={10} />
                                  <span>{city.expats} expats</span>
                                </div>
                              </div>
                              <Icon name="chevronRight" size={12} className="city-vertical-arrow" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                   </div>
                </div>
              );
            })}

            {/* ====== Upcoming Tab ====== */}
            {activeTab === 'upcoming' && upcomingCountries.map((country, index) => {
              const rank = index + 1;
              const hasVoted = voted[country.slug];
              const voteCount = votes[country.slug] || 0;
              const isTop3 = rank <= 3;

              return (
                <div
                  key={country.slug}
                  className={`ranking-card ${isTop3 ? 'ranking-card-top' : ''}`}
                >
                  <div className={`ranking-rank ${isTop3 ? `rank-${rank}` : ''}`}>
                    {isTop3 ? (
                      <Icon name="trophy" size={22} />
                    ) : (
                      <span className="rank-number">{rank}</span>
                    )}
                  </div>

                  <div className="ranking-flag">
                    <CountryHeroMedia
                      country={country}
                      imageUrl={country.imageUrl}
                      imageIndex={country.imageIndex}
                      videoUrl={countryVideos[country.name]}
                      alt={country.name}
                      imgClassName="ranking-flag-img"
                    />
                    <FlagBadge flagEmoji={country.flagEmoji} size={36} alt={country.name} className="ranking-flag-emoji" />
                  </div>

                  <div className="ranking-body">
                    <div className="ranking-header-row">
                      <h3 className="ranking-country-name">
                        {country.name}
                        <FlagBadge flagEmoji={country.flagEmoji} size={24} alt={country.name} className="ranking-flag-inline" />
                      </h3>
                      <div className="ranking-header-tags">
                        <span className="ranking-region">
                          <Icon name="globe" size={13} /> {country.continent}
                        </span>
                        {country.trendPercent && (
                          <span className="ranking-badge trend-badge">
                            <Icon name="thumbsUp" size={12} /> Rising {country.trendPercent}
                          </span>
                        )}
                        {country.usExpatsEstimate && (
                          <span className="ranking-badge">
                            <Icon name="usersRound" size={12} /> {country.usExpatsEstimate} US expats
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="ranking-intro">{country.intro}</p>

                    <div className="ranking-stats-grid">
                      <div className="ranking-stat-cell">
                        <Icon name="building" size={16} />
                        <div>
                          <span className="stat-cell-label">Capital</span>
                          <span className="stat-cell-value">
                            {country.capital}
                            {country.capitalPopulation && <span className="stat-cell-sublabel"> · {country.capitalPopulation}</span>}
                          </span>
                        </div>
                      </div>
                      <div className="ranking-stat-cell">
                        <Icon name="users" size={16} />
                        <div>
                          <span className="stat-cell-label">Population</span>
                          <span className="stat-cell-value">{country.population}</span>
                        </div>
                      </div>
                      <div className="ranking-stat-cell">
                        <Icon name="languages" size={16} />
                        <div>
                          <span className="stat-cell-label">Language</span>
                          <span className="stat-cell-value stat-cell-language">
                            {country.language}
                            <span className={`eng-tag eng-${country.englishLevel}`} title={country.englishNote}>
                              <span className="eng-dot" /> {country.englishLevelLabel}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div
                        className="ranking-stat-cell currency-cell"
                        onDoubleClick={() => openPpp(country)}
                        title="Double-click for cost of living in USD"
                      >
                        <Icon name="coin" size={16} />
                        <div>
                          <span className="stat-cell-label">
                            Currency <span className="dbl-hint">double-click for prices</span>
                          </span>
                          <span className="stat-cell-value">{country.currency}</span>
                          <span className="stat-rate">
                            1 USD ≈ {(1 / country.exchangeRateToUsd).toFixed(country.exchangeRateToUsd > 0.5 ? 2 : 0)} {country.currencyCode}
                          </span>
                        </div>
                      </div>
                      <div className="ranking-stat-cell">
                        <Icon name="wallet" size={16} />
                        <div>
                          <span className="stat-cell-label">Cost of Living Index</span>
                          <span className="stat-cell-value">
                            {country.costOfLivingIndex}
                            <span className="stat-cell-sublabel"> / 100</span>
                          </span>
                        </div>
                      </div>
                      <div className="ranking-stat-cell">
                        <Icon name="thermometer" size={16} />
                        <div>
                          <span className="stat-cell-label">Avg. Temperature</span>
                          <span className="stat-cell-value">{country.avgTemperature}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ranking-scores-row">
                      <div className="ranking-score">
                        <div className="score-label">
                          <Icon name="shield" size={14} /> Safety
                        </div>
                        <div className="score-bar">
                          <div
                            className="score-bar-fill"
                            style={{ width: `${parseInt(country.safetyIndex) / 100 * 100}%` }}
                          />
                        </div>
                        <div className="score-value">{country.safetyIndex}</div>
                      </div>
                      <div className="ranking-score">
                        <div className="score-label">
                          <Icon name="stethoscope" size={14} /> Healthcare
                        </div>
                        <div className="score-bar">
                          <div
                            className="score-bar-fill"
                            style={{ width: `${parseFloat(country.healthcareRating) / 10 * 100}%` }}
                          />
                        </div>
                        <div className="score-value">{country.healthcareRating}</div>
                      </div>
                    </div>

                    <div className="ranking-why">
                      <div className="ranking-why-title">Why it's popular</div>
                      <ul className="ranking-why-list">
                        {(country.whyPopular || []).map((reason, i) => (
                          <li key={i}>
                            <Icon name="checkCircle" size={14} />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="ranking-visa-row">
                      <button
                        className="btn btn-teal btn-visa-inline"
                        onClick={() => onVisaClick && onVisaClick(country.slug)}
                      >
                        <Icon name="passport" size={16} />
                        <span>Visa &amp; Immigration Guide</span>
                        <Icon name="arrowRight" size={14} />
                      </button>
                    </div>

                    <div className="ranking-bank-row">
                      <button
                        className="btn btn-teal btn-bank-inline"
                        onClick={() => onBankClick && onBankClick(country.slug)}
                      >
                        <Icon name="bank" size={16} />
                        <span>Bank, Money &amp; Tax</span>
                        <Icon name="arrowRight" size={14} />
                      </button>
                    </div>


                  </div>

                  <div className="ranking-vote-col">
                    <div className={`vote-btn-wrap ${celebrating[country.slug] ? 'celebrate' : ''}`}>
                      <button
                        className={`vote-btn ${hasVoted ? 'voted' : ''} ${celebrating[country.slug] ? 'celebrate' : ''}`}
                        onClick={() => handleVote(country.slug)}
                        aria-label={hasVoted ? 'Remove vote' : 'Upvote'}
                      >
                        <Icon name="thumbsUp" size={20} />
                      </button>
                      <div className="vote-particles">
                        {[0,1,2,3,4,5,6,7].map((i) => {
                          const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
                          const dist = 28 + (i % 3) * 6;
                          const dx = Math.cos(angle) * dist;
                          const dy = Math.sin(angle) * dist;
                          const isStar = i % 2 === 0;
                          const delay = (i % 4) * 0.03;
                          const size = isStar ? 14 : (6 + (i % 3) * 2);
                          return (
                            <span
                              key={`${country.slug}-p-${i}`}
                              className={`vote-particle ${isStar ? 'star' : ''}`}
                              style={{
                                '--particle-end': `translate(${dx}px, ${dy}px)`,
                                animationDelay: `${delay}s`,
                                width: `${size}px`,
                                height: `${size}px`,
                                marginLeft: `-${size/2}px`,
                                marginTop: `-${size/2}px`,
                              }}
                            />
                          );
                        })}
                        <span className="vote-glow-ring" />
                      </div>
                    </div>
                    <div className="vote-count" title={`${formatNumber(voteCount)} votes`}>
                      {formatNumber(voteCount)}
                    </div>
                    <div className="vote-label">votes</div>
                    <div className="vote-trend">
                      <Icon name="heart" size={12} />
                      <span>#{rank}</span>
                    </div>
                    {/* Cities — vertical list in right column, below vote button */}
                    {country.topCities && country.topCities.length > 0 && (
                      <div className="ranking-cities-sidebar">
                        <div className="ranking-cities-sidebar-title">
                          <Icon name="building" size={12} />
                          <span>Top {country.name} Cities</span>
                        </div>
                        <div className="ranking-cities-vertical">
                          {(country.topCities || []).filter((city) => city && city.name && city.slug).map((city, ci) => (
                             <div
                               key={`${country.slug}-${city.slug}`}
                               className="city-vertical-item"
                               style={{
                                 backgroundImage: getCityHeroImage(city.slug)
                                   ? `url(${getCityHeroImage(city.slug)})`
                                   : undefined,
                               }}
                               onClick={() => onCityClick && onCityClick(city.slug, city.name, country.name)}
                               title="Click to open community"
                             >
                               <div className="city-vertical-overlay"></div>
                               <div className="city-vertical-rank">{ci + 1}</div>
                               <div className="city-vertical-thumb">
                                {city.imageUrl ? (
                                  <img
                                    src={city.imageUrl}
                                    alt={city.name}
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                      const fallback = e.currentTarget.nextElementSibling;
                                      if (fallback) fallback.style.display = 'flex';
                                    }}
                                  />
                                ) : null}
                                {!city.imageUrl ? (
                                  <div className="city-vertical-thumb-fallback">
                                    <span>{city.name.charAt(0)}</span>
                                  </div>
                                ) : (
                                  <div className="city-vertical-thumb-fallback" style={{ display: 'none' }}>
                                    <span>{city.name.charAt(0)}</span>
                                  </div>
                                )}
                              </div>
                              <div className="city-vertical-info">
                                <div className="city-vertical-name">{city.name}</div>
                                <div className="city-vertical-expats">
                                  <Icon name="usersRound" size={10} />
                                  <span>{city.expats} expats</span>
                                </div>
                              </div>
                              <Icon name="chevronRight" size={12} className="city-vertical-arrow" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}

            {/* ====== Most Affordable Tab ====== */}
            {activeTab === 'affordable' && affordableCountries.map((country, index) => {
              const rank = index + 1;
              const hasVoted = voted[country.slug];
              const voteCount = votes[country.slug] || 0;
              const isTop3 = rank <= 3;

              return (
                <div
                  key={country.slug}
                  className={`ranking-card ${isTop3 ? 'ranking-card-top' : ''}`}
                >
                  <div className={`ranking-rank ${isTop3 ? `rank-${rank}` : ''}`}>
                    {isTop3 ? (
                      <Icon name="trophy" size={22} />
                    ) : (
                      <span className="rank-number">{rank}</span>
                    )}
                  </div>

                  <div className="ranking-flag">
                    <CountryHeroMedia
                      country={country}
                      imageUrl={country.imageUrl}
                      imageIndex={country.imageIndex}
                      videoUrl={countryVideos[country.name]}
                      alt={country.name}
                      imgClassName="ranking-flag-img"
                    />
                    <FlagBadge flagEmoji={country.flagEmoji} size={36} alt={country.name} className="ranking-flag-emoji" />
                  </div>

                  <div className="ranking-body">
                    <div className="ranking-header-row">
                      <h3 className="ranking-country-name">
                        {country.name}
                        <FlagBadge flagEmoji={country.flagEmoji} size={24} alt={country.name} className="ranking-flag-inline" />
                      </h3>
                      <div className="ranking-header-tags">
                        <span className="ranking-region">
                          <Icon name="globe" size={13} /> {country.continent}
                        </span>
                        <span className="ranking-badge affordable-badge">
                          <Icon name="wallet" size={12} /> {country.cheaperThanUS} cheaper
                        </span>
                        {country.usExpatsEstimate && (
                          <span className="ranking-badge">
                            <Icon name="usersRound" size={12} /> {country.usExpatsEstimate} US expats
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="ranking-intro">{country.intro}</p>

                    {/* US equivalent highlight (kept from affordable layout) */}
                    <div className="affordable-stats">
                      <div className="aff-stat">
                         <div className="aff-stat-label">Typical Monthly Budget</div>
                         <div className="aff-stat-value">{country.monthlyBudget} USD</div>
                         <div className="aff-us-equiv">
                           <span className="us-equiv-icon" aria-hidden="true">★</span>
                           Same lifestyle in the US ≈ <strong>{country.usEquivalent}/mo</strong>
                         </div>
                       </div>
                      <div className="aff-stat">
                        <div className="aff-stat-label">1-Bedroom Rent</div>
                        <div className="aff-stat-value">{country.rent1Bed} USD</div>
                      </div>
                    </div>

                    <div className="ranking-stats-grid">
                      <div className="ranking-stat-cell">
                        <Icon name="building" size={16} />
                        <div>
                          <span className="stat-cell-label">Capital</span>
                          <span className="stat-cell-value">
                            {country.capital}
                            {country.capitalPopulation && <span className="stat-cell-sublabel"> · {country.capitalPopulation}</span>}
                          </span>
                        </div>
                      </div>
                      <div className="ranking-stat-cell">
                        <Icon name="users" size={16} />
                        <div>
                          <span className="stat-cell-label">Population</span>
                          <span className="stat-cell-value">{country.population}</span>
                        </div>
                      </div>
                      <div className="ranking-stat-cell">
                        <Icon name="languages" size={16} />
                        <div>
                          <span className="stat-cell-label">Language</span>
                          <span className="stat-cell-value stat-cell-language">
                            {country.language}
                            <span className={`eng-tag eng-${country.englishLevel}`} title={country.englishNote}>
                              <span className="eng-dot" /> {country.englishLevelLabel}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div
                        className="ranking-stat-cell currency-cell"
                        onDoubleClick={() => openPpp(country)}
                        title="Double-click for cost of living in USD"
                      >
                        <Icon name="coin" size={16} />
                        <div>
                          <span className="stat-cell-label">
                            Currency <span className="dbl-hint">double-click for prices</span>
                          </span>
                          <span className="stat-cell-value">{country.currency}</span>
                          <span className="stat-rate">
                            1 USD ≈ {(1 / country.exchangeRateToUsd).toFixed(country.exchangeRateToUsd > 0.5 ? 2 : 0)} {country.currencyCode}
                          </span>
                        </div>
                      </div>
                      <div className="ranking-stat-cell">
                        <Icon name="wallet" size={16} />
                        <div>
                          <span className="stat-cell-label">Cost of Living Index</span>
                          <span className="stat-cell-value">
                            {country.costOfLivingIndex}
                            <span className="stat-cell-sublabel"> / 100</span>
                          </span>
                        </div>
                      </div>
                      <div className="ranking-stat-cell">
                        <Icon name="thermometer" size={16} />
                        <div>
                          <span className="stat-cell-label">Avg. Temperature</span>
                          <span className="stat-cell-value">{country.avgTemperature}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ranking-scores-row">
                      <div className="ranking-score">
                        <div className="score-label">
                          <Icon name="shield" size={14} /> Safety
                        </div>
                        <div className="score-bar">
                          <div
                            className="score-bar-fill"
                            style={{ width: `${parseInt(country.safetyIndex) / 100 * 100}%` }}
                          />
                        </div>
                        <div className="score-value">{country.safetyIndex}</div>
                      </div>
                      <div className="ranking-score">
                        <div className="score-label">
                          <Icon name="stethoscope" size={14} /> Healthcare
                        </div>
                        <div className="score-bar">
                          <div
                            className="score-bar-fill"
                            style={{ width: `${parseFloat(country.healthcareRating) / 10 * 100}%` }}
                          />
                        </div>
                        <div className="score-value">{country.healthcareRating}</div>
                      </div>
                    </div>

                    <div className="ranking-why">
                      <div className="ranking-why-title">Why it's popular</div>
                      <ul className="ranking-why-list">
                        {(country.whyPopular || []).map((reason, i) => (
                          <li key={i}>
                            <Icon name="checkCircle" size={14} />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="ranking-visa-row">
                      <button
                        className="btn btn-teal btn-visa-inline"
                        onClick={() => onVisaClick && onVisaClick(country.slug)}
                      >
                        <Icon name="passport" size={16} />
                        <span>Visa &amp; Immigration Guide</span>
                        <Icon name="arrowRight" size={14} />
                      </button>
                    </div>

                    <div className="ranking-bank-row">
                      <button
                        className="btn btn-teal btn-bank-inline"
                        onClick={() => onBankClick && onBankClick(country.slug)}
                      >
                        <Icon name="bank" size={16} />
                        <span>Bank, Money &amp; Tax</span>
                        <Icon name="arrowRight" size={14} />
                      </button>
                    </div>


                  </div>

                  <div className="ranking-vote-col">
                    <div className={`vote-btn-wrap ${celebrating[country.slug] ? 'celebrate' : ''}`}>
                      <button
                        className={`vote-btn ${hasVoted ? 'voted' : ''} ${celebrating[country.slug] ? 'celebrate' : ''}`}
                        onClick={() => handleVote(country.slug)}
                        aria-label={hasVoted ? 'Remove vote' : 'Upvote'}
                      >
                        <Icon name="thumbsUp" size={20} />
                      </button>
                      <div className="vote-particles">
                        {[0,1,2,3,4,5,6,7].map((i) => {
                          const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
                          const dist = 28 + (i % 3) * 6;
                          const dx = Math.cos(angle) * dist;
                          const dy = Math.sin(angle) * dist;
                          const isStar = i % 2 === 0;
                          const delay = (i % 4) * 0.03;
                          const size = isStar ? 14 : (6 + (i % 3) * 2);
                          return (
                            <span
                              key={`${country.slug}-p-${i}`}
                              className={`vote-particle ${isStar ? 'star' : ''}`}
                              style={{
                                '--particle-end': `translate(${dx}px, ${dy}px)`,
                                animationDelay: `${delay}s`,
                                width: `${size}px`,
                                height: `${size}px`,
                                marginLeft: `-${size/2}px`,
                                marginTop: `-${size/2}px`,
                              }}
                            />
                          );
                        })}
                        <span className="vote-glow-ring" />
                      </div>
                    </div>
                    <div className="vote-count" title={`${formatNumber(voteCount)} votes`}>
                      {formatNumber(voteCount)}
                    </div>
                    <div className="vote-label">votes</div>
                    <div className="vote-trend">
                      <Icon name="heart" size={12} />
                      <span>#{rank}</span>
                    </div>
                    {/* Cities — vertical list in right column, below vote button */}
                    {country.topCities && country.topCities.length > 0 && (
                      <div className="ranking-cities-sidebar">
                        <div className="ranking-cities-sidebar-title">
                          <Icon name="building" size={12} />
                          <span>Top {country.name} Cities</span>
                        </div>
                        <div className="ranking-cities-vertical">
                          {(country.topCities || []).filter((city) => city && city.name && city.slug).map((city, ci) => (
                             <div
                               key={`${country.slug}-${city.slug}`}
                               className="city-vertical-item"
                               style={{
                                 backgroundImage: getCityHeroImage(city.slug)
                                   ? `url(${getCityHeroImage(city.slug)})`
                                   : undefined,
                               }}
                               onClick={() => onCityClick && onCityClick(city.slug, city.name, country.name)}
                               title="Click to open community"
                             >
                               <div className="city-vertical-overlay"></div>
                               <div className="city-vertical-rank">{ci + 1}</div>
                               <div className="city-vertical-thumb">
                                {city.imageUrl ? (
                                  <img
                                    src={city.imageUrl}
                                    alt={city.name}
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                      const fallback = e.currentTarget.nextElementSibling;
                                      if (fallback) fallback.style.display = 'flex';
                                    }}
                                  />
                                ) : null}
                                {!city.imageUrl ? (
                                  <div className="city-vertical-thumb-fallback">
                                    <span>{city.name.charAt(0)}</span>
                                  </div>
                                ) : (
                                  <div className="city-vertical-thumb-fallback" style={{ display: 'none' }}>
                                    <span>{city.name.charAt(0)}</span>
                                  </div>
                                )}
                              </div>
                              <div className="city-vertical-info">
                                <div className="city-vertical-name">{city.name}</div>
                                <div className="city-vertical-expats">
                                  <Icon name="usersRound" size={10} />
                                  <span>{city.expats} expats</span>
                                </div>
                              </div>
                              <Icon name="chevronRight" size={12} className="city-vertical-arrow" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}

            {/* Methodology note for affordable tab */}
            {activeTab === 'affordable' && (
              <div className="affordable-methodology">
                US equivalent = local monthly budget ÷ (1 − % cheaper than US). Estimated purchasing power parity, not a precise comparison.
              </div>
            )}

            {/* ====== English-Friendly Tab ====== */}
            {activeTab === 'english' && englishFriendlyCountries.map((country, index) => {
              const rank = index + 1;
              const hasVoted = voted[country.slug];
              const voteCount = votes[country.slug] || 0;
              const isTop3 = rank <= 3;

              return (
                <div
                  key={country.slug}
                  className={`ranking-card ${isTop3 ? 'ranking-card-top' : ''}`}
                >
                  <div className={`ranking-rank ${isTop3 ? `rank-${rank}` : ''}`}>
                    {isTop3 ? (
                      <Icon name="trophy" size={22} />
                    ) : (
                      <span className="rank-number">{rank}</span>
                    )}
                  </div>

                  <div className="ranking-flag">
                    <CountryHeroMedia
                      country={country}
                      imageUrl={country.imageUrl}
                      imageIndex={country.imageIndex}
                      videoUrl={countryVideos[country.name]}
                      alt={country.name}
                      imgClassName="ranking-flag-img"
                    />
                    <FlagBadge flagEmoji={country.flagEmoji} size={36} alt={country.name} className="ranking-flag-emoji" />
                  </div>

                  <div className="ranking-body">
                    <div className="ranking-header-row">
                      <h3 className="ranking-country-name">
                        {country.name}
                        <FlagBadge flagEmoji={country.flagEmoji} size={24} alt={country.name} className="ranking-flag-inline" />
                      </h3>
                      <div className="ranking-header-tags">
                        <span className="ranking-region">
                          <Icon name="globe" size={13} /> {country.continent}
                        </span>
                        <span className="ranking-badge english-badge">
                          <Icon name="languages" size={12} /> {country.epiLevel}
                        </span>
                        {country.usExpatsEstimate && (
                          <span className="ranking-badge">
                            <Icon name="usersRound" size={12} /> {country.usExpatsEstimate} US expats
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="ranking-intro">{country.intro}</p>

                    {/* EF EPI score row (kept from english layout) */}
                    <div className="english-score-row">
                      <div className="english-score">
                        <div className="english-score-label">EF EPI 2025 Score</div>
                        <div className="english-score-value">
                          {country.epiScore || '—'}
                          {country.epiScore && (
                            <span className="english-score-max"> / 700</span>
                          )}
                        </div>
                      </div>
                      <div className="english-bar">
                        <div
                          className="english-bar-fill"
                          style={{ width: `${country.epiScore ? (country.epiScore / 700 * 100) : 90}%` }}
                        />
                      </div>
                    </div>

                    <div className="ranking-stats-grid">
                      <div className="ranking-stat-cell">
                        <Icon name="building" size={16} />
                        <div>
                          <span className="stat-cell-label">Capital</span>
                          <span className="stat-cell-value">
                            {country.capital}
                            {country.capitalPopulation && <span className="stat-cell-sublabel"> · {country.capitalPopulation}</span>}
                          </span>
                        </div>
                      </div>
                      <div className="ranking-stat-cell">
                        <Icon name="users" size={16} />
                        <div>
                          <span className="stat-cell-label">Population</span>
                          <span className="stat-cell-value">{country.population}</span>
                        </div>
                      </div>
                      <div className="ranking-stat-cell">
                        <Icon name="languages" size={16} />
                        <div>
                          <span className="stat-cell-label">Language</span>
                          <span className="stat-cell-value stat-cell-language">
                            {country.language}
                            <span className={`eng-tag eng-${country.englishLevel}`} title={country.englishNote}>
                              <span className="eng-dot" /> {country.englishLevelLabel}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div
                        className="ranking-stat-cell currency-cell"
                        onDoubleClick={() => openPpp(country)}
                        title="Double-click for cost of living in USD"
                      >
                        <Icon name="coin" size={16} />
                        <div>
                          <span className="stat-cell-label">
                            Currency <span className="dbl-hint">double-click for prices</span>
                          </span>
                          <span className="stat-cell-value">{country.currency}</span>
                          <span className="stat-rate">
                            1 USD ≈ {(1 / country.exchangeRateToUsd).toFixed(country.exchangeRateToUsd > 0.5 ? 2 : 0)} {country.currencyCode}
                          </span>
                        </div>
                      </div>
                      <div className="ranking-stat-cell">
                        <Icon name="wallet" size={16} />
                        <div>
                          <span className="stat-cell-label">Cost of Living Index</span>
                          <span className="stat-cell-value">
                            {country.costOfLivingIndex}
                            <span className="stat-cell-sublabel"> / 100</span>
                          </span>
                        </div>
                      </div>
                      <div className="ranking-stat-cell">
                        <Icon name="thermometer" size={16} />
                        <div>
                          <span className="stat-cell-label">Avg. Temperature</span>
                          <span className="stat-cell-value">{country.avgTemperature}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ranking-scores-row">
                      <div className="ranking-score">
                        <div className="score-label">
                          <Icon name="shield" size={14} /> Safety
                        </div>
                        <div className="score-bar">
                          <div
                            className="score-bar-fill"
                            style={{ width: `${parseInt(country.safetyIndex) / 100 * 100}%` }}
                          />
                        </div>
                        <div className="score-value">{country.safetyIndex}</div>
                      </div>
                      <div className="ranking-score">
                        <div className="score-label">
                          <Icon name="stethoscope" size={14} /> Healthcare
                        </div>
                        <div className="score-bar">
                          <div
                            className="score-bar-fill"
                            style={{ width: `${parseFloat(country.healthcareRating) / 10 * 100}%` }}
                          />
                        </div>
                        <div className="score-value">{country.healthcareRating}</div>
                      </div>
                    </div>

                    <div className="ranking-why">
                      <div className="ranking-why-title">Why it's popular</div>
                      <ul className="ranking-why-list">
                        {(country.whyPopular || []).map((reason, i) => (
                          <li key={i}>
                            <Icon name="checkCircle" size={14} />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="ranking-visa-row">
                      <button
                        className="btn btn-teal btn-visa-inline"
                        onClick={() => onVisaClick && onVisaClick(country.slug)}
                      >
                        <Icon name="passport" size={16} />
                        <span>Visa &amp; Immigration Guide</span>
                        <Icon name="arrowRight" size={14} />
                      </button>
                    </div>

                    <div className="ranking-bank-row">
                      <button
                        className="btn btn-teal btn-bank-inline"
                        onClick={() => onBankClick && onBankClick(country.slug)}
                      >
                        <Icon name="bank" size={16} />
                        <span>Bank, Money &amp; Tax</span>
                        <Icon name="arrowRight" size={14} />
                      </button>
                    </div>


                  </div>

                  <div className="ranking-vote-col">
                    <div className={`vote-btn-wrap ${celebrating[country.slug] ? 'celebrate' : ''}`}>
                      <button
                        className={`vote-btn ${hasVoted ? 'voted' : ''} ${celebrating[country.slug] ? 'celebrate' : ''}`}
                        onClick={() => handleVote(country.slug)}
                        aria-label={hasVoted ? 'Remove vote' : 'Upvote'}
                      >
                        <Icon name="thumbsUp" size={20} />
                      </button>
                      <div className="vote-particles">
                        {[0,1,2,3,4,5,6,7].map((i) => {
                          const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
                          const dist = 28 + (i % 3) * 6;
                          const dx = Math.cos(angle) * dist;
                          const dy = Math.sin(angle) * dist;
                          const isStar = i % 2 === 0;
                          const delay = (i % 4) * 0.03;
                          const size = isStar ? 14 : (6 + (i % 3) * 2);
                          return (
                            <span
                              key={`${country.slug}-p-${i}`}
                              className={`vote-particle ${isStar ? 'star' : ''}`}
                              style={{
                                '--particle-end': `translate(${dx}px, ${dy}px)`,
                                animationDelay: `${delay}s`,
                                width: `${size}px`,
                                height: `${size}px`,
                                marginLeft: `-${size/2}px`,
                                marginTop: `-${size/2}px`,
                              }}
                            />
                          );
                        })}
                        <span className="vote-glow-ring" />
                      </div>
                    </div>
                    <div className="vote-count" title={`${formatNumber(voteCount)} votes`}>
                      {formatNumber(voteCount)}
                    </div>
                    <div className="vote-label">votes</div>
                    <div className="vote-trend">
                      <Icon name="heart" size={12} />
                      <span>#{rank}</span>
                    </div>
                    {/* Cities — vertical list in right column, below vote button */}
                    {country.topCities && country.topCities.length > 0 && (
                      <div className="ranking-cities-sidebar">
                        <div className="ranking-cities-sidebar-title">
                          <Icon name="building" size={12} />
                          <span>Top {country.name} Cities</span>
                        </div>
                        <div className="ranking-cities-vertical">
                          {(country.topCities || []).filter((city) => city && city.name && city.slug).map((city, ci) => (
                             <div
                               key={`${country.slug}-${city.slug}`}
                               className="city-vertical-item"
                               style={{
                                 backgroundImage: getCityHeroImage(city.slug)
                                   ? `url(${getCityHeroImage(city.slug)})`
                                   : undefined,
                               }}
                               onClick={() => onCityClick && onCityClick(city.slug, city.name, country.name)}
                               title="Click to open community"
                             >
                               <div className="city-vertical-overlay"></div>
                               <div className="city-vertical-rank">{ci + 1}</div>
                               <div className="city-vertical-thumb">
                                {city.imageUrl ? (
                                  <img
                                    src={city.imageUrl}
                                    alt={city.name}
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                      const fallback = e.currentTarget.nextElementSibling;
                                      if (fallback) fallback.style.display = 'flex';
                                    }}
                                  />
                                ) : null}
                                {!city.imageUrl ? (
                                  <div className="city-vertical-thumb-fallback">
                                    <span>{city.name.charAt(0)}</span>
                                  </div>
                                ) : (
                                  <div className="city-vertical-thumb-fallback" style={{ display: 'none' }}>
                                    <span>{city.name.charAt(0)}</span>
                                  </div>
                                )}
                              </div>
                              <div className="city-vertical-info">
                                <div className="city-vertical-name">{city.name}</div>
                                <div className="city-vertical-expats">
                                  <Icon name="usersRound" size={10} />
                                  <span>{city.expats} expats</span>
                                </div>
                              </div>
                              <Icon name="chevronRight" size={12} className="city-vertical-arrow" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>

          {activeTab === 'popular' && (
            <div style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--ink-500)', marginBottom: 'var(--space-4)' }}>
                💡 Click the thumbs-up to cast your vote. Your vote is saved locally and helps keep the ranking accurate.
              </p>
            </div>
          )}
        </div>
       </section>

      {pppCountry && (
        <div
          className="ppp-modal-overlay"
          onClick={closePpp}
          role="dialog"
          aria-modal="true"
          aria-label={`Purchasing power in ${pppCountry.name}`}
        >
          <div className="ppp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ppp-modal-header">
              <div className="ppp-modal-title-row">
                <span className="ppp-flag">{pppCountry.flagEmoji}</span>
                <div>
                  <h3 className="ppp-modal-title">
                    Cost of Living in {pppCountry.name}
                  </h3>
                  <p className="ppp-modal-subtitle">
                    {pppCountry.currency} · 1 USD ≈ {(1 / pppCountry.exchangeRateToUsd).toFixed(pppCountry.exchangeRateToUsd > 0.5 ? 2 : 0)} {pppCountry.currencyCode} · {pppCountry.capital} prices
                  </p>
                </div>
              </div>
              <button
                className="ppp-close-btn"
                onClick={closePpp}
                aria-label="Close"
              >
                <Icon name="x" size={18} />
              </button>
            </div>
            <div className="ppp-modal-body">
              <table className="ppp-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th style={{ textAlign: 'right' }}>Local Price</th>
                    <th style={{ textAlign: 'right' }}>≈ USD</th>
                  </tr>
                </thead>
                <tbody>
                  {(pppCountry.priceList || []).map((item, i) => (
                    <tr key={i}>
                      <td className="ppp-item-name">
                        <span className="ppp-item-icon" aria-hidden="true">{getPriceItemIcon(item.name)}</span>
                        {item.name}
                      </td>
                      <td className="ppp-local">
                        {item.localPrice.toLocaleString(undefined, { minimumFractionDigits: item.localPrice < 10 ? 2 : 0, maximumFractionDigits: 2 })} {pppCountry.currencyCode}
                      </td>
                      <td className="ppp-usd">
                        ${(item.localPrice * pppCountry.exchangeRateToUsd).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="ppp-summary">
                <div className="ppp-summary-item">
                  <span className="summary-label">Cost of Living Index</span>
                  <span className="summary-value">{pppCountry.costOfLivingIndex} / 100</span>
                </div>
                <div className="ppp-summary-item">
                  <span className="summary-label">vs. US Average</span>
                  <span className="summary-value">{pppCountry.costOfLivingIndex < 100 ? `${100 - pppCountry.costOfLivingIndex}% cheaper` : `${pppCountry.costOfLivingIndex - 100}% more expensive`}</span>
                </div>
              </div>
              <p className="ppp-note">
                Prices are approximate 2025 estimates for {pppCountry.capital} / major cities, in local currency. Actual costs vary by city and lifestyle.
                Double-click the currency field in any card to compare.
              </p>
            </div>
          </div>
        </div>
      )}

      <NewsletterCTA />
    </div>
  );
}

// ---- City Community Page (placeholder) ----
// ============================================================
// CITY LIFE PROFILE PAGE
// ============================================================
function CityCommunityPage({ citySlug, cityName, countryName, onNavigate, onCategoryClick, onArticleClick, onNeighborhoodClick, onCityClick }) {
  // Safety: pull globals from window to avoid ReferenceError if script load order changes
  const _cityProfiles = window.cityProfiles || {};
  const _cityMapBubbles = window.cityMapBubbles || {};
  const _neighborhoodSlugMap = window.neighborhoodSlugMap || {};

  const profile = _cityProfiles[citySlug];
  const hasData = !!profile;
  const [mapOpen, setMapOpen] = React.useState(false);

  // Hero & overview
  const name = profile ? profile.name : cityName;
  const fullName = profile ? (profile.fullName || profile.name) : cityName;
  const country = profile ? profile.country : countryName;

  // ---- Helper: visa field text (string or {duration, eligible, desc, note} object) ----
  const visaText = (v) => {
    if (v == null) return 'Information coming soon';
    if (typeof v === 'string') return v;
    if (typeof v === 'object') {
      const parts = [];
      if (v.duration) parts.push('Duration: ' + v.duration);
      if (v.eligible) parts.push('Eligible: ' + v.eligible);
      if (v.desc) parts.push(v.desc);
      if (v.note) parts.push(v.note);
      return parts.join(' · ') || 'Information coming soon';
    }
    return 'Information coming soon';
  };

  // ---- Same-country city quick nav list ----
  const countryCityList = (function buildCountryCityList() {
    if (!countryName) return [];
    const normalized = (s) => (s || '').toLowerCase().trim();
    const pools = [rankedCountries, upcomingCountries, affordableCountries, englishFriendlyCountries];
    for (const pool of pools) {
      const match = (pool || []).find(c => normalized(c.name) === normalized(countryName));
      if (match && match.topCities && match.topCities.length) {
        return match.topCities.map(c => ({ slug: c.slug, name: c.name }));
      }
    }
    const results = [];
    for (const [slug, p] of Object.entries(_cityProfiles)) {
      if (p && normalized(p.country) === normalized(countryName)) {
        results.push({ slug, name: p.name });
      }
    }
    return results;
  })();

  // ---- Helper: Section card wrapper ----
  const SectionCard = ({ icon, title, subtitle, children, accent = 'teal' }) => (
    <div className={`clp-section-card clp-accent-${accent}`}>
      <div className="clp-section-head">
        <div className="clp-section-icon">
          <Icon name={icon} size={22} />
        </div>
        <div>
          <h3 className="clp-section-title">{title}</h3>
          {subtitle && <p className="clp-section-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="clp-section-body">{children}</div>
    </div>
  );

  const PlaceholderCard = () => (
    <div className="clp-placeholder">
      <div className="clp-placeholder-icon"><Icon name="clock" size={28} /></div>
      <div>
        <div className="clp-placeholder-title">Data coming soon</div>
        <div className="clp-placeholder-desc">We're compiling verified data for {name}. Check back soon.</div>
      </div>
    </div>
  );

  const fullPagePlaceholder = (
    <div className="fade-in clp-page">
      <section className="clp-hero">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Home', onClick: () => onNavigate('home') },
              { label: 'Top Countries Ranking', onClick: () => onNavigate('ranking') },
              { label: `${name} Life Profile` },
            ]}
          />
          <div className="clp-hero-content">
            <button className="clp-back-btn" onClick={() => onNavigate('ranking')}>
              <Icon name="chevronRight" size={14} style={{ transform: 'rotate(180deg)', marginRight: '4px' }} />
              Back to Country Rankings
            </button>
            <div className="clp-hero-header">
              <div className="clp-hero-icon">
                <Icon name="mapPin" size={36} />
              </div>
              <div className="clp-hero-text">
                <div className="section-eyebrow" style={{ color: 'var(--teal-600)' }}>
                  {country} · City Life Profile
                </div>
                <h1 className="clp-hero-title">{name}</h1>
              </div>
            </div>
          </div>
          <PlaceholderCard />
        </div>
      </section>
    </div>
  );

  // ---- Overview stat ----
  const OverviewStat = ({ icon, label, value }) => (
    <div className="clp-overview-stat">
      <div className="clp-overview-stat-icon"><Icon name={icon} size={16} /></div>
      <div>
        <div className="clp-overview-stat-label">{label}</div>
        <div className="clp-overview-stat-value">{value}</div>
      </div>
    </div>
  );

  // ---- Back button ----
  const backRanking = () => onNavigate('ranking');

  return (
    <ErrorBoundary label={`CityCommunityPage:${citySlug}`} fallback={fullPagePlaceholder}>
    <div className="fade-in clp-page">
      {/* City Quick Nav (sticky horizontal scroll) */}
      {countryCityList.length > 0 && (
        <div className="city-quick-nav">
          <div className="city-quick-nav-inner">
            {countryCityList.map((c) => {
              const isActive = c.slug === citySlug;
              return (
                <button
                  key={c.slug}
                  className={`city-quick-nav-pill${isActive ? ' is-active' : ''}`}
                  onClick={() => {
                    if (!isActive && onCityClick) onCityClick(c.slug, c.name, countryName);
                  }}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== HERO ===== */}
      <section
        className={`clp-hero${hasData && profile.heroImage ? ' has-image' : ''}`}
        style={hasData && profile.heroImage ? {
          backgroundImage: `linear-gradient(to right, rgba(9,54,58,0.88) 0%, rgba(9,54,58,0.55) 45%, rgba(9,54,58,0.25) 100%), url(${profile.heroImage})`,
        } : undefined}
      >
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Home', onClick: () => onNavigate('home') },
              { label: 'Top Countries Ranking', onClick: backRanking },
              { label: `${name} Life Profile` },
            ]}
          />
          <div className="clp-hero-content">
            <button className="clp-back-btn" onClick={backRanking}>
              <Icon name="chevronRight" size={14} style={{ transform: 'rotate(180deg)', marginRight: '4px' }} />
              Back to Country Rankings
            </button>
            <div className="clp-hero-header">
              {hasData && profile.coordinates ? (
                <button
                  className="clp-hero-icon clp-hero-icon-btn"
                  onClick={() => setMapOpen(true)}
                  title="View on map"
                  aria-label="View on map"
                >
                  <Icon name="mapPin" size={32} />
                  <span className="clp-hero-icon-tooltip">View on map</span>
                </button>
              ) : (
                <div className="clp-hero-icon">
                  <Icon name="mapPin" size={32} />
                </div>
              )}
                <div className="clp-hero-text">
                  <div className="section-eyebrow clp-hero-eyebrow">
                    {country} · City Life Profile
                  </div>
                  <h1 className="clp-hero-title">
                    {name}
                  </h1>
                {hasData && profile.tagline && (
                  <p className="clp-hero-tagline">{profile.tagline}</p>
                )}
                {hasData && (profile.setting?.length || profile.vibe?.length) && (
                  <div className="clp-hero-tags">
                    {profile.setting?.length > 0 && (
                      <div className="clp-tag-row">
                        <span className="clp-tag-label">Setting</span>
                        <div className="clp-tag-chips">
                          {(Array.isArray(profile.setting) ? profile.setting : []).map((s, i) => (
                            <span key={i} className="clp-chip clp-chip-setting">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {profile.vibe?.length > 0 && (
                      <div className="clp-tag-row">
                        <span className="clp-tag-label">Vibe</span>
                        <div className="clp-tag-chips">
                          {(Array.isArray(profile.vibe) ? profile.vibe : []).map((v, i) => (
                            <span key={i} className="clp-chip clp-chip-vibe">{v}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {hasData && profile.overview ? (
              <div className="clp-overview-grid">
                <OverviewStat icon="users" label="Population" value={profile.overview.population} />
                <OverviewStat icon="globe" label="Area" value={profile.overview.area} />
                <OverviewStat icon="thermometer" label="Avg Temp" value={profile.overview.avgTemp} />
                <OverviewStat icon="clock" label="Timezone" value={profile.overview.timezone} />
                <OverviewStat icon="coin" label="Currency" value={profile.overview.currency} />
                <OverviewStat icon="languages" label="Language" value={profile.overview.language} />
                <OverviewStat icon="school" label="English Level" value={profile.overview.englishLevel} />
              </div>
            ) : (
              <PlaceholderCard />
            )}
          </div>
        </div>
      </section>

      {/* ===== BODY SECTIONS ===== */}
      <section className="clp-sections">
        <div className="container">
          <div className="clp-sections-grid">

            {/* 2. Cost of Living */}
            <SectionCard icon="wallet" title="Cost of Living" subtitle="How far does your dollar go?">
              {hasData && profile.costOfLiving ? (
                <div>
                  <div className="clp-cost-index">
                    <div className="clp-cost-index-num">{profile.costOfLiving.index}<span> / 100</span></div>
                    <div className="clp-cost-index-label">Cost Index (US = 100)</div>
                  </div>
                  <div className="clp-cost-tag">
                    <Icon name="checkCircle" size={16} />
                    <span>{profile.costOfLiving.vsUS}</span>
                  </div>
                  <div className="clp-cost-row">
                    <div className="clp-cost-item">
                      <div className="clp-cost-item-label">Single / month</div>
                      <div className="clp-cost-item-value">{profile.costOfLiving.singleMonth}</div>
                    </div>
                    <div className="clp-cost-item">
                      <div className="clp-cost-item-label">Couple / month</div>
                      <div className="clp-cost-item-value">{profile.costOfLiving.coupleMonth}</div>
                    </div>
                    <div className="clp-cost-item">
                      <div className="clp-cost-item-label">Family of 3 / month</div>
                      <div className="clp-cost-item-value">{profile.costOfLiving.familyMonth}</div>
                    </div>
                  </div>
                </div>
              ) : (<PlaceholderCard />)}
            </SectionCard>

            {/* 19. Scores summary */}
            <SectionCard icon="trophy" title="Scores at a Glance" subtitle="Key quality-of-life metrics">
              {hasData && profile.scores ? (
                <div className="clp-scores-grid">
                  {(Array.isArray(profile.scores) ? profile.scores : []).map((s, i) => (
                    <div key={i} className="clp-score-item">
                      <div className="clp-score-ring">
                        <div className="clp-score-num">{s.value}</div>
                        <div className="clp-score-total">/ {s.max}</div>
                      </div>
                      <div className="clp-score-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              ) : (<PlaceholderCard />)}
            </SectionCard>

            {/* 3. Comfortable Monthly Budget */}
            <div className="clp-span-2">
              <SectionCard icon="coin" title="Comfortable Monthly Budget" subtitle="How much you'll actually spend, broken down">
                {hasData && profile.budget ? (
                  <div>
                    <div className="clp-budget-header">
                      <div className="clp-budget-total">
                        <div className="clp-budget-total-label">Comfortable Single Budget</div>
                        <div className="clp-budget-total-value">{profile.budget.single.total}<span>/mo</span></div>
                        <div className="clp-budget-total-note">{profile.budget.single.note}</div>
                      </div>
                    </div>
                    <div className="clp-budget-breakdown">
                      {(Array.isArray(profile.budget?.breakdown) ? profile.budget?.breakdown : []).map((item, i) => (
                        <div key={i} className="clp-budget-row">
                          <div className="clp-budget-row-label">
                            <span>{item.label}</span>
                            <span className="clp-budget-amount">${item.amount}</span>
                          </div>
                          <div className="clp-budget-bar-wrap">
                            <div
                              className="clp-budget-bar"
                              style={{ width: `${item.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (<PlaceholderCard />)}
              </SectionCard>
            </div>

            {/* 4. Monthly Rent */}
            <div className="clp-span-2">
              <SectionCard icon="home" title="Monthly Rent" subtitle="By unit size and neighborhood">
                {hasData && profile.rent ? (
                  <div className="clp-rent-table">
                    <div className="clp-rent-header">
                      <div className="clp-rent-col-type">Unit Type</div>
                      <div className="clp-rent-col">City Center</div>
                      <div className="clp-rent-col">Expat / Trendy Area</div>
                      <div className="clp-rent-col">Suburbs</div>
                    </div>
                    {(Array.isArray(profile.rent) ? profile.rent : []).map((r, i) => (
                      <div key={i} className="clp-rent-row">
                        <div className="clp-rent-col-type">{r.type}</div>
                        <div className="clp-rent-col">{r.cityCenter}</div>
                        <div className="clp-rent-col accent">{r.expatArea}</div>
                        <div className="clp-rent-col">{r.suburbs}</div>
                      </div>
                    ))}
                  </div>
                ) : (<PlaceholderCard />)}
              </SectionCard>
            </div>

            {/* 5. Organic & Grocery */}
            <SectionCard icon="shopping" title="Organic & Grocery" subtitle="Where to buy food and how much it costs">
              {hasData && profile.grocery ? (
                <div className="clp-grocery-body">
                  <div className="clp-grocery-tag">{profile.grocery.priceLevel}</div>
                  {profile.grocery.organicAvailable && (
                    <div className="clp-grocery-block">
                      <div className="clp-grocery-block-title">
                        <Icon name="checkCircle" size={14} style={{ color: 'var(--teal-600)' }} />
                        Organic food available
                      </div>
                      <div className="clp-grocery-list">
                        {(Array.isArray(profile.grocery?.organicStores) ? profile.grocery?.organicStores : []).map((s, i) => (
                          <span key={i} className="clp-chip">{s}</span>
                        ))}
                      </div>
                      <p className="clp-grocery-note">{profile.grocery.organicNote}</p>
                    </div>
                  )}
                  <div className="clp-grocery-block">
                    <div className="clp-grocery-block-title">Local markets</div>
                    <div className="clp-grocery-list">
                      {(Array.isArray(profile.grocery?.markets) ? profile.grocery?.markets : []).map((s, i) => (
                        <span key={i} className="clp-chip">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="clp-grocery-block">
                    <div className="clp-grocery-block-title">Imported & big-box</div>
                    <div className="clp-grocery-list">
                      {(Array.isArray(profile.grocery?.importedStores) ? profile.grocery?.importedStores : []).map((s, i) => (
                        <span key={i} className="clp-chip">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (<PlaceholderCard />)}
            </SectionCard>

            {/* 6. Lifestyle vs US */}
            <SectionCard icon="bank" title="Cost vs. US" subtitle="How each category compares to American prices">
              {hasData && profile.lifestyleVsUS ? (
                <div className="clp-lifestyle-body">
                  {(Array.isArray(profile.lifestyleVsUS) ? profile.lifestyleVsUS : []).map((item, i) => (
                    <div key={i} className="clp-lifestyle-row">
                      <div className="clp-lifestyle-label">{item.category}</div>
                      <div className="clp-lifestyle-bar-wrap">
                        <div className="clp-lifestyle-bar" style={{ width: `${item.cheaperPct}%` }} />
                      </div>
                      <div className="clp-lifestyle-value">{item.cheaperPct}% cheaper</div>
                    </div>
                  ))}
                </div>
              ) : (<PlaceholderCard />)}
            </SectionCard>

            {/* 7. Walkability vs Car */}
            <SectionCard icon="mapPin" title="Walkability & Transit" subtitle="Do you need a car to get around?">
              {hasData && profile.walkability ? (
                <div>
                  <div className="clp-walk-scores">
                    <div className="clp-walk-score-big">
                      <div className="clp-walk-score-num">{profile.walkability.walkScore}</div>
                      <div className="clp-walk-score-label">Walk Score</div>
                      <div className="clp-walk-score-tag">{profile.walkability.walkLabel}</div>
                    </div>
                    <div className="clp-walk-score-big alt">
                      <div className="clp-walk-score-num">{profile.walkability.transitScore}</div>
                      <div className="clp-walk-score-label">Transit Score</div>
                      <div className="clp-walk-score-tag">{profile.walkability.transitLabel}</div>
                    </div>
                  </div>
                  <div className="clp-walk-tagline">
                    <Icon name="car" size={16} style={{ display: 'none' }} />
                    <strong>Car needed:</strong> {profile.walkability.carNeeded}
                  </div>
                  <ul className="clp-bullet-list">
                    {(Array.isArray(profile.walkability?.details) ? profile.walkability?.details : []).map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              ) : (<PlaceholderCard />)}
            </SectionCard>

            {/* 12. Climate */}
            <SectionCard icon="thermometer" title="Climate" subtitle="What to expect, year-round">
              {hasData && profile.climate ? (
                <div>
                  <div className="clp-climate-temp">
                    <div className="clp-climate-temp-icon"><Icon name="thermometer" size={24} /></div>
                    <div>
                      <div className="clp-climate-temp-value">{profile.climate.tempRange}</div>
                      <div className="clp-climate-temp-label">Annual average range</div>
                    </div>
                  </div>
                  <div className="clp-climate-seasons">
                    {(Array.isArray(profile.climate?.seasons) ? profile.climate?.seasons : []).map((s, i) => (
                      <div key={i} className="clp-climate-season">
                        <div className="clp-climate-season-name">{s.name}</div>
                        <div className="clp-climate-season-desc">{s.desc}</div>
                      </div>
                    ))}
                  </div>
                  <p className="clp-climate-note">{profile.climate.note}</p>
                </div>
              ) : (<PlaceholderCard />)}
            </SectionCard>

            {/* 7.5 Interactive Neighborhood Map */}
            <div className="clp-span-2">
              <SectionCard
                icon="mapPin"
                title={`Neighborhood Map — Explore ${name}`}
                subtitle="Hover the bubbles to see where each neighborhood sits in the city"
              >
                {hasData && profile.coordinates && _cityMapBubbles && _cityMapBubbles[citySlug] ? (
                  <NeighborhoodMap
                    citySlug={citySlug}
                    cityName={name}
                    lat={profile.coordinates.lat}
                    lng={profile.coordinates.lng}
                    bubbles={_cityMapBubbles[citySlug]}
                    neighborhoods={profile.neighborhoods}
                    onNeighborhoodClick={onNeighborhoodClick}
                  />
                ) : (
                  <div className="clp-placeholder">
                    <div className="clp-placeholder-icon"><Icon name="mapPin" size={28} /></div>
                    <div>
                      <div className="clp-placeholder-title">Map coming soon</div>
                      <div className="clp-placeholder-desc">We're mapping neighborhoods for {name}. Check back soon.</div>
                    </div>
                  </div>
                )}
              </SectionCard>
            </div>

            {/* 8. Neighborhoods */}
            <div className="clp-hood-section-wrap">
              <SectionCard icon="building" title="Neighborhoods for Expats" subtitle="Top areas to live" className="clp-hood-side-card">
                {hasData && profile.neighborhoods ? (
                  <div className="clp-hood-vertical">
                    {(Array.isArray(profile.neighborhoods) ? profile.neighborhoods : []).filter(n => n).map((n, i) => {
                      const nbSlug = _neighborhoodSlugMap[`${citySlug}:${profile.neighborhoods.indexOf(n)}`];
                      return (
                        <div
                          key={i}
                          className={`clp-hood-vertical-item ${nbSlug ? 'is-clickable' : ''} ${n.featured ? 'is-featured' : ''}`}
                          onClick={() => nbSlug && onNeighborhoodClick && onNeighborhoodClick(nbSlug)}
                          title={nbSlug ? 'Open neighborhood guide' : ''}
                        >
                          <div className="clp-hood-vertical-rank">{i + 1}</div>
                          <div className="clp-hood-vertical-thumb">
                            {n.image ? (
                              <img src={n.image} alt={n.name} loading="lazy" />
                            ) : (
                              <div className="clp-hood-vertical-thumb-fallback">
                                <span>{n.name.charAt(0)}</span>
                              </div>
                            )}
                          </div>
                          <div className="clp-hood-vertical-info">
                            <div className="clp-hood-vertical-name">{n.name}</div>
                            <div className="clp-hood-vertical-meta">
                              {n.rent && (
                                <span className="clp-hood-vertical-rent">
                                  <Icon name="home" size={10} />
                                  <span>{n.rent}</span>
                                </span>
                              )}
                              {n.safety && (
                                <span className="clp-hood-vertical-safety">
                                  <Icon name="shield" size={10} />
                                  <span>{n.safety}</span>
                                </span>
                              )}
                              {n.walkability && !n.safety && !n.rent && n.vibe && (
                                <span className="clp-hood-vertical-vibe">{n.vibe}</span>
                              )}
                            </div>
                          </div>
                          <Icon name="chevronRight" size={12} className="clp-hood-vertical-arrow" />
                        </div>
                      );
                    })}
                  </div>
                ) : (<PlaceholderCard />)}
              </SectionCard>
            </div>

            {/* 9. Safety */}
            <SectionCard icon="shield" title="Safety" subtitle="What to know before you go">
              {hasData && profile.safety ? (
                <div>
                  <div className="clp-score-big-inline">
                    <div className="clp-score-num" style={{ fontSize: '2rem' }}>{profile.safety.score}</div>
                    <div>
                      <div className="clp-score-label" style={{ textAlign: 'left' }}>/ 100</div>
                      <div className="clp-safety-label">{profile.safety.label}</div>
                    </div>
                  </div>
                  <p className="clp-safety-desc">{profile.safety.expatAreasSafe}</p>
                  <div className="clp-safety-tips-title">Tips</div>
                  <ul className="clp-bullet-list">
                    {(Array.isArray(profile.safety?.tips) ? profile.safety?.tips : []).map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
              ) : (<PlaceholderCard />)}
            </SectionCard>

            {/* 10. Healthcare */}
            <SectionCard icon="stethoscope" title="Healthcare" subtitle="Quality, costs, and insurance">
              {hasData && profile.healthcare ? (
                <div>
                  <div className="clp-score-big-inline">
                    <div className="clp-score-num" style={{ fontSize: '2rem', color: 'var(--teal-700)' }}>{profile.healthcare.score}</div>
                    <div>
                      <div className="clp-score-label" style={{ textAlign: 'left' }}>/ 100</div>
                      <div className="clp-safety-label">{profile.healthcare.label}</div>
                    </div>
                  </div>
                  <div className="clp-hc-block">
                    <div className="clp-hc-block-title">Public system</div>
                    <p>{profile.healthcare.public}</p>
                  </div>
                  <div className="clp-hc-block">
                    <div className="clp-hc-block-title">Private system</div>
                    <p>{profile.healthcare.private}</p>
                  </div>
                  <div className="clp-hc-block">
                    <div className="clp-hc-block-title">Insurance cost</div>
                    <p>{profile.healthcare.insurance}</p>
                  </div>
                </div>
              ) : (<PlaceholderCard />)}
            </SectionCard>

            {/* 12. Expat Community */}
            <SectionCard icon="users" title="Expat Community" subtitle="Meet people and plug in">
              {hasData && profile.expatCommunity ? (
                <div>
                  <div className="clp-expat-size">
                    <Icon name="usersRound" size={18} />
                    <span>{profile.expatCommunity.size}</span>
                  </div>
                  <div className="clp-hc-block">
                    <div className="clp-hc-block-title">Where to find the community</div>
                    <ul className="clp-bullet-list">
                      {(Array.isArray(profile.expatCommunity?.channels) ? profile.expatCommunity?.channels : []).map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                </div>
              ) : (<PlaceholderCard />)}
            </SectionCard>

            {/* 13. Schools */}
            <SectionCard icon="school" title="Schools & Education" subtitle="International schools and local options">
              {hasData && profile.schools ? (
                <div>
                  <div className="clp-school-tuition">
                    <div className="clp-school-tuition-value">{profile.schools.tuitionRange}</div>
                    <div className="clp-school-tuition-label">Annual international school tuition</div>
                  </div>
                  <div className="clp-hc-block">
                    <div className="clp-hc-block-title">International schools</div>
                    <ul className="clp-bullet-list">
                      {(Array.isArray(profile.schools?.international) ? profile.schools?.international : []).map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                  <div className="clp-hc-block">
                    <div className="clp-hc-block-title">Local schools</div>
                    <p>{profile.schools.local}</p>
                  </div>
                </div>
              ) : (<PlaceholderCard />)}
            </SectionCard>

            {/* 14. Commute & Transit */}
            <div className="clp-span-2">
              <SectionCard icon="globe" title="Commute & Transit" subtitle="Getting around the city">
                {hasData && profile.commute ? (
                  <div>
                    <div className="clp-commute-table">
                      <div className="clp-commute-header">
                        <div>Option</div>
                        <div>Typical Cost</div>
                        <div>Notes</div>
                      </div>
                      {(Array.isArray(profile.commute?.options) ? profile.commute?.options : []).map((o, i) => (
                        <div key={i} className="clp-commute-row">
                          <div className="clp-commute-name">{o.name}</div>
                          <div className="clp-commute-cost">{o.cost}</div>
                          <div className="clp-commute-note">{o.note}</div>
                        </div>
                      ))}
                    </div>
                    <div className="clp-commute-traffic">
                      <strong>Traffic note:</strong> {profile.commute.traffic}
                    </div>
                  </div>
                ) : (<PlaceholderCard />)}
              </SectionCard>
            </div>

            {/* 15. Taxes */}
            <SectionCard icon="wallet" title="Taxes" subtitle="What you'll owe">
              {hasData && profile.taxes ? (
                <div className="clp-tax-body">
                  <div className="clp-tax-block">
                    <div className="clp-tax-label">Income Tax</div>
                    <p>{profile.taxes.incomeTax}</p>
                  </div>
                  <div className="clp-tax-block">
                    <div className="clp-tax-label">Property Tax (Predial)</div>
                    <p>{profile.taxes.propertyTax}</p>
                  </div>
                  <div className="clp-tax-block">
                    <div className="clp-tax-label">Sales Tax (VAT / IVA)</div>
                    <p>{profile.taxes.salesTax}</p>
                  </div>
                  <p className="clp-tax-note">{profile.taxes.note}</p>
                </div>
              ) : (<PlaceholderCard />)}
            </SectionCard>

            {/* 16. Visa & Residency */}
            <SectionCard icon="passport" title="Visa & Residency" subtitle="Staying legally long-term">
              {hasData && profile.visa ? (
                <div className="clp-visa-body">
                  <div className="clp-visa-block">
                    <div className="clp-visa-label">Temporary Resident</div>
                    <p>{visaText(profile.visa.temporary)}</p>
                  </div>
                  <div className="clp-visa-block">
                    <div className="clp-visa-label">Permanent Resident</div>
                    <p>{visaText(profile.visa.permanent)}</p>
                  </div>
                  <div className="clp-visa-block">
                    <div className="clp-visa-label">Tourist (FMM)</div>
                    <p>{visaText(profile.visa.tourist)}</p>
                  </div>
                  {profile.visa.note && <p className="clp-visa-note">{profile.visa.note}</p>}
                </div>
              ) : (<PlaceholderCard />)}
            </SectionCard>

            {/* 17. Banking & Money */}
            <SectionCard icon="coin" title="Banking & Money" subtitle="Accounts, ATMs, and currency">
              {hasData && profile.banking ? (
                <div className="clp-bank-body">
                  <div className="clp-bank-block">
                    <div className="clp-bank-label">Opening an account</div>
                    <p>{profile.banking.opening || profile.banking.requirements || 'Information coming soon'}</p>
                  </div>
                  <div className="clp-bank-block">
                    <div className="clp-bank-label">Major banks</div>
                    <div className="clp-grocery-list">
                      {(profile.banking?.majorBanks || (Array.isArray(profile.banking?.topBanks) ? profile.banking?.topBanks : []).map(b => b.name) || []).map((b, i) => (
                         <span key={i} className="clp-chip">{typeof b === 'string' ? b : b.name}</span>
                       ))}
                    </div>
                  </div>
                  <div className="clp-bank-block">
                    <div className="clp-bank-label">ATMs & cards</div>
                    <p>{profile.banking.atm || profile.banking.atms || 'Information coming soon'}</p>
                  </div>
                  <div className="clp-bank-block">
                    <div className="clp-bank-label">USD usage</div>
                    <p>{profile.banking.usd || profile.banking.note || 'Information coming soon'}</p>
                  </div>
                </div>
              ) : (<PlaceholderCard />)}
            </SectionCard>

            {/* 18. Internet & Connectivity */}
            <SectionCard icon="globe" title="Internet & Connectivity" subtitle="Speed, cost, providers">
              {hasData && profile.internet ? (
                <div className="clp-inet-body">
                  <div className="clp-inet-speed">
                    <div className="clp-inet-speed-value">{profile.internet.speed}</div>
                    <div className="clp-inet-speed-label">Typical fiber speeds</div>
                  </div>
                  <div className="clp-inet-cost">
                    <div className="clp-inet-cost-value">{profile.internet.cost}</div>
                    <div className="clp-inet-cost-label">Monthly cost</div>
                  </div>
                  <div className="clp-bank-block">
                    <div className="clp-bank-label">Providers</div>
                    <div className="clp-grocery-list">
                      {(Array.isArray(profile.internet?.providers) ? profile.internet?.providers : []).map((p, i) => (
                        <span key={i} className="clp-chip">{p}</span>
                      ))}
                    </div>
                  </div>
                  <div className="clp-bank-block">
                    <div className="clp-bank-label">Mobile</div>
                    <p>{profile.internet.mobile}</p>
                  </div>
                  <p className="clp-inet-note">{profile.internet.note}</p>
                </div>
              ) : (<PlaceholderCard />)}
            </SectionCard>

          </div>

          {/* FAQ Section */}
          {(() => {
            const cityFaqs = typeof generateCityFaqs === 'function' ? generateCityFaqs(profile) : [];
            if (!cityFaqs.length) return null;
            return (
              <FAQSection
                faqs={cityFaqs}
                title="Frequently Asked Questions"
                subtitle={`Everything you need to know about living in ${name}`}
              />
            );
          })()}

          {/* Bottom CTA */}
          <div className="clp-bottom-cta">
            <button className="btn btn-primary btn-lg" onClick={backRanking}>
              ← Back to Country Rankings
            </button>
          </div>
        </div>
      </section>

      {/* ===== MAP MODAL ===== */}
      {mapOpen && hasData && profile.coordinates && (
        <div
          className="map-modal-overlay"
          onClick={() => setMapOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Map of ${name}`}
        >
          <div className="map-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="map-modal-close"
              onClick={() => setMapOpen(false)}
              aria-label="Close"
            >
              <Icon name="x" size={18} />
            </button>

            <div className="map-modal-header">
              <div className="map-modal-title-row">
                <div className="map-modal-icon">
                  <img
                    src="https://aka.doubaocdn.com/s/hMXK4BP5Z9"
                    alt=""
                    style={{ width: 28, height: 28 }}
                  />
                </div>
                <div>
                  <h3 className="map-modal-title">{fullName}</h3>
                  <p className="map-modal-subtitle">{profile.country} · {profile.region || ''}</p>
                </div>
              </div>
            </div>

            <div className="map-modal-map">
              <iframe
                title={`Map of ${name}`}
                className="map-iframe map-iframe-google"
                src={`https://maps.google.com/maps?q=${profile.coordinates.lat},${profile.coordinates.lng}&z=12&output=embed`}
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; const osm = e.target.parentElement?.querySelector('.map-iframe-osm'); if (osm) { osm.style.display = 'block'; } }}
              />
              <iframe
                title={`Map of ${name} (OpenStreetMap)`}
                className="map-iframe map-iframe-osm"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${profile.coordinates.lng - 0.1}%2C${profile.coordinates.lat - 0.08}%2C${profile.coordinates.lng + 0.1}%2C${profile.coordinates.lat + 0.08}&layer=mapnik&marker=${profile.coordinates.lat}%2C${profile.coordinates.lng}`}
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="map-fallback">
                <div className="map-fallback-inner">
                  <div className="map-fallback-pin">📍</div>
                  <div className="map-fallback-coords">
                    {Math.abs(profile.coordinates.lat).toFixed(4)}°{profile.coordinates.lat >= 0 ? 'N' : 'S'}, {Math.abs(profile.coordinates.lng).toFixed(4)}°{profile.coordinates.lng >= 0 ? 'E' : 'W'}
                  </div>
                  <div className="map-fallback-note">Map data © Google Maps / OpenStreetMap contributors</div>
                </div>
              </div>
            </div>

            <div className="map-modal-info">
              <a
                className="map-open-gmaps-btn"
                href={`https://www.google.com/maps/search/?api=1&query=${profile.coordinates.lat},${profile.coordinates.lng}`}
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="gmaps-btn-icon">
                  <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                </svg>
                <span>Open in Google Maps</span>
                <Icon name="externalLink" size={14} />
              </a>
              <div className="map-modal-info-row">
                <Icon name="mapPin" size={16} />
                <div>
                  <div className="map-info-label">Coordinates</div>
                  <div className="map-info-value">
                    {Math.abs(profile.coordinates.lat).toFixed(4)}°{profile.coordinates.lat >= 0 ? 'N' : 'S'}, {Math.abs(profile.coordinates.lng).toFixed(4)}°{profile.coordinates.lng >= 0 ? 'E' : 'W'}
                  </div>
                </div>
              </div>
              {profile.region && (
                <div className="map-modal-info-row">
                  <Icon name="globe" size={16} />
                  <div>
                    <div className="map-info-label">Region / State</div>
                    <div className="map-info-value">{profile.region}</div>
                  </div>
                </div>
              )}
              {profile.mapLocation && (
                <div className="map-modal-desc">
                  {profile.mapLocation}
                </div>
              )}
              <div className="map-modal-attribution">
                Map data © <a href="https://www.google.com/maps" target="_blank" rel="noreferrer">Google Maps</a> · <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </ErrorBoundary>
  );
}

// ============================================================
// ============================================================
//    NeighborhoodMap — interactive city map with bubbles
// ============================================================
function NeighborhoodMap({ citySlug, cityName, lat, lng, bubbles, neighborhoods, onNeighborhoodClick }) {
  const [hoveredIdx, setHoveredIdx] = React.useState(null);
  const [mobileZoomed, setMobileZoomed] = React.useState(false);

  // Safety: pull from window to avoid ReferenceError if script load order changes
  const _neighborhoodSlugMap = window.neighborhoodSlugMap || {};

  // Try to match bubble name to a neighborhood slug
  const getNeighborhoodSlug = (bubbleName) => {
    if (!neighborhoods) return null;
    // fuzzy match: find the neighborhood whose name starts with or contains the bubble name
    const matchIdx = neighborhoods.findIndex(n => {
      const nbName = n.name.toLowerCase();
      const bName = bubbleName.toLowerCase();
      return nbName.startsWith(bName) || nbName.includes(bName) || bName.includes(nbName.split(' ')[0]);
    });
    if (matchIdx === -1) return null;
    const key = `${citySlug}:${matchIdx}`;
    return _neighborhoodSlugMap[key] || null;
  };

  const handleBubbleClick = (bubbleName) => {
    const slug = getNeighborhoodSlug(bubbleName);
    if (slug && onNeighborhoodClick) {
      onNeighborhoodClick(slug);
    }
  };

  const handleMapClick = () => {
    // Toggle zoom on mobile tap
    if (window.innerWidth < 768) {
      setMobileZoomed(prev => !prev);
    }
  };

  return (
    <div className="nb-map-wrap">
      <div
        className={`nb-map-container ${mobileZoomed ? 'nb-map-zoomed' : ''}`}
        onMouseEnter={() => {}}
        onClick={handleMapClick}
      >
        <iframe
          className="nb-map-iframe"
          title={`${cityName} neighborhood map`}
          src={`https://maps.google.com/maps?q=${lat},${lng}&z=12&output=embed`}
          loading="lazy"
          frameBorder="0"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        {/* Bubble overlay layer */}
        <div className="nb-map-bubbles" aria-hidden="false">
          {bubbles.map((b, i) => {
            const slug = getNeighborhoodSlug(b.name);
            const isHovered = hoveredIdx === i;
            return (
              <button
                key={i}
                className={`nb-map-bubble nb-bubble-align-${b.align} ${isHovered ? 'nb-bubble-hover' : ''} ${slug ? 'nb-bubble-clickable' : ''}`}
                style={{ top: b.top, left: b.left }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBubbleClick(b.name);
                }}
                aria-label={`${b.name} neighborhood`}
              >
                <span className="nb-bubble-dot"></span>
                <span className="nb-bubble-label">{b.name}</span>
              </button>
            );
          })}
        </div>
        {/* Map credit */}
        <div className="nb-map-credit">
          <Icon name="mapPin" size={12} /> Map data © Google
        </div>
      </div>

      {/* Legend */}
      <div className="nb-map-legend">
        <div className="nb-map-legend-title">
          <Icon name="map" size={14} /> Neighborhoods
        </div>
        <div className="nb-map-legend-list">
          {bubbles.map((b, i) => {
            const slug = getNeighborhoodSlug(b.name);
            const isHovered = hoveredIdx === i;
            return (
              <button
                key={i}
                className={`nb-legend-item ${isHovered ? 'nb-legend-active' : ''} ${slug ? 'nb-legend-clickable' : ''}`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBubbleClick(b.name);
                }}
              >
                <span className="nb-legend-dot" />
                <span className="nb-legend-name">{b.name}</span>
                {slug && <span className="nb-legend-arrow">→</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// VISA & IMMIGRATION GUIDE PAGE
// ============================================================
function VisaImmigrationPage({ countrySlug, onNavigate, onRankingClick }) {
  const guide = visaGuides[countrySlug];
  const country = guide ? guide.country : countrySlug;
  const flagEmoji = guide ? guide.flagEmoji : '🏳️';
  const isPlaceholder = !guide || guide.placeholder;
  const [expandedPrograms, setExpandedPrograms] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState({});

  const vpcTabs = [
    { key: 'overview', label: 'Overview', icon: 'info' },
    { key: 'process', label: 'Process', icon: 'clipboardList' },
    { key: 'timeline', label: 'Timeline', icon: 'calendar' },
    { key: 'costs', label: 'Costs', icon: 'receipt' },
    { key: 'documents', label: 'Documents', icon: 'folderOpen' },
    { key: 'financial', label: 'Financial', icon: 'banknote' },
    { key: 'pitfalls', label: 'Pitfalls', icon: 'alertTriangle' },
    { key: 'path', label: 'Path to Citizenship', icon: 'route' },
    { key: 'scores', label: 'Score Card', icon: 'award' },
  ];

  const checkTabHasContent = (v, tabKey, guide) => {
    switch (tabKey) {
      case 'overview': return true;
      case 'process': return (v.process && v.process.length > 0) || (guide && guide.applicationProcess && guide.applicationProcess.length > 0);
      case 'timeline': return (v.timeline && v.timeline.length > 0) || (guide && guide.timeline && guide.timeline.length > 0);
      case 'costs': return (v.costs && v.costs.length > 0) || (guide && guide.costs && guide.costs.length > 0);
      case 'documents': return (v.documents && v.documents.length > 0) || (guide && guide.documents && guide.documents.length > 0);
      case 'financial': return (v.financialReq && v.financialReq.hasRequirement) || (guide && guide.financialRequirements);
      case 'pitfalls': return (v.pitfalls && v.pitfalls.length > 0) || (guide && guide.pitfalls && guide.pitfalls.length > 0);
      case 'path': return (v.residencyPath && (v.residencyPath.hasPath || v.residencyPath.summary)) || (guide && guide.residencyPath);
      case 'scores': return (v.scores && v.scores.length > 0) || (guide && guide.scores && guide.scores.length > 0);
      default: return false;
    }
  };

  // Categorize a visa program as 'visa' or 'residency' based on its nature
  const getProgramCategory = (v) => {
    const name = v.name || '';
    // Residency programs: temporary/permanent residency, pensionado/passive income, rentista, NLV, D7 (residency by passive income), inversionista/investor residency
    const residencyPatterns = [
      'temporary resident', 'permanent resident', 'temporary residency', 'permanent residency',
      'pensionado', 'rentista', 'passive income', 'retirement', 'non-lucrative', 'nlv',
      'inversionista', 'investor residency', 'residencia no lucrativa',
    ];
    const lower = name.toLowerCase();
    // Golden visa is a visa-type program (entry/investment visa, not pure residency)
    if (lower.includes('golden visa')) return 'visa';
    for (const pat of residencyPatterns) {
      if (lower.includes(pat)) return 'residency';
    }
    return 'visa';
  };

  const backRanking = () => onRankingClick && onRankingClick();

  const SectionCard = ({ icon, title, subtitle, children }) => (
    <div className="clp-section">
      <div className="clp-section-head">
        <div className="clp-section-icon"><Icon name={icon} size={18} /></div>
        <div>
          <h2 className="clp-section-title">{title}</h2>
          {subtitle && <p className="clp-section-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="clp-section-body">{children}</div>
    </div>
  );

  const PlaceholderCard = () => (
    <div className="clp-placeholder">
      <div className="clp-placeholder-icon"><Icon name="clock" size={28} /></div>
      <div>
        <div className="clp-placeholder-title">Data coming soon</div>
        <div className="clp-placeholder-desc">We're compiling verified visa & immigration data for {country}. Check back soon.</div>
      </div>
    </div>
  );

  return (
    <div className="fade-in clp-page visa-page">
      {/* ===== HERO ===== */}
      <section className="clp-hero">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Home', onClick: () => onNavigate('home') },
              { label: 'Top Countries Ranking', onClick: backRanking },
              { label: `${country} Visa Guide` },
            ]}
          />
          <div className="clp-hero-content">
            <button className="clp-back-btn" onClick={backRanking}>
              <Icon name="chevronRight" size={14} style={{ transform: 'rotate(180deg)', marginRight: '4px' }} />
              Back to Country Rankings
            </button>
            <div className="clp-hero-header">
              <div className="clp-hero-icon">
                <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>{flagEmoji}</span>
              </div>
              <div className="clp-hero-text">
                <div className="section-eyebrow" style={{ color: 'var(--teal-600)' }}>
                  {country} · Visa & Immigration Guide
                </div>
                <h1 className="clp-hero-title">
                  {guide ? guide.title : `Moving to ${country}: Visa Guide`}
                </h1>
                {guide && guide.subtitle && (
                  <p className="clp-hero-tagline">{guide.subtitle}</p>
                )}
              </div>
            </div>

            {!isPlaceholder && guide.visaTypes && guide.visaTypes.some(v => v.difficultyScore !== null) && (
              <div className="visa-hero-stats">
                <div className="visa-diff-badge">
                    <div className="visa-diff-label">Visa Programs</div>
                    <div className="visa-diff-level">{(guide.visaTypes || []).filter(v => v.difficultyScore !== null).length} pathways</div>
                    <div className="visa-diff-bar">
                      <div className="visa-diff-fill" style={{ width: '100%' }} />
                    </div>
                  </div>
                <div className="visa-diff-summary">
                  <Icon name="info" size={16} />
                  <span>Each program has its own difficulty, cost, and timeline. Compare them below to find the best path for you.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== BODY SECTIONS ===== */}
      <section className="clp-sections">
        <div className="container">
          <div className="clp-sections-grid">

            {isPlaceholder ? (
              <SectionCard icon="passport" title="Visa & Residency Programs" subtitle="Detailed data coming soon — click to expand">
                <div className="visa-program-cards">
                  {(guide.visaTypes || []).map((v, i) => {
                      const isOpen = expandedPrograms === i;
                      return (
                        <div key={i} className="visa-program-card vpc-placeholder">
                          <button
                            className="vpc-header"
                            onClick={() => setExpandedPrograms(isOpen ? null : i)}
                            aria-expanded={isOpen}
                          >
                            <div className="vpc-icon">
                              <Icon name={v.icon || 'passport'} size={20} />
                            </div>
                            <div className="vpc-title-row">
                              <h3 className="vpc-name">
                                {v.name}
                                <span className="vpc-soon-tag">Data coming soon</span>
                              </h3>
                              <div className="vpc-quick-stats">
                                <span className="vpc-stat vpc-stat-muted">
                                  <span className="vpc-stat-label">Difficulty</span>
                                  <span className="vpc-stat-value">Pending</span>
                                </span>
                              </div>
                            </div>
                            <div className="vpc-chevron">
                              <Icon
                                name="chevronRight"
                                size={18}
                                style={{
                                  transition: 'transform 0.25s ease',
                                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                }}
                              />
                            </div>
                          </button>
                          {isOpen && (
                            <div className="vpc-body">
                              <div className="vpc-placeholder-body">
                                <Icon name="clock" size={22} />
                                <div>
                                  <div className="vpc-ph-title">Data coming soon</div>
                                  <div className="vpc-ph-desc">We're compiling verified details for this program. Check back soon for difficulty scores, cost breakdowns, and application steps.</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </SectionCard>
             ) : (
               <>
                  {/* Two-column layout: Visa Programs (left) + Residency Programs (right) */}
                  <div className="clp-span-2">
                    <div className="visa-two-col">
                   <div className="visa-col">
                     <div className="visa-col-header">
                       <div className="visa-col-icon"><Icon name="passport" size={18} /></div>
                       <div>
                         <h2 className="visa-col-title">Visa Programs</h2>
                         <p className="visa-col-subtitle">Entry, work, study & short-term visas</p>
                       </div>
                     </div>
                     <div className="visa-program-cards">
                       {guide.visaTypes
                         .map((v, origIdx) => ({ v, origIdx }))
                         .filter(({ v }) => getProgramCategory(v) === 'visa')
                         .map(({ v, origIdx }) => {
                           const i = origIdx;
                           const isOpen = expandedPrograms === i;
                      const hasData = (v.difficultyScore !== null && v.difficultyScore !== undefined && !v.placeholder) || v.abolished;
                      return (
                        <div
                          key={i}
                          className={`visa-program-card ${isOpen ? 'is-open' : ''} ${v.noDedicatedProgram ? 'vpc-muted' : ''} ${v.abolished ? 'vpc-abolished' : ''} ${!hasData ? 'vpc-placeholder' : ''}`}
                        >
                          <button
                            className="vpc-header"
                            onClick={() => setExpandedPrograms(isOpen ? null : i)}
                            aria-expanded={isOpen}
                          >
                            <div className="vpc-icon">
                              <Icon name={v.icon || 'passport'} size={20} />
                            </div>
                            <div className="vpc-title-row">
                              <h3 className="vpc-name">
                                {v.name}
                                {v.noDedicatedProgram && (
                                  <span className="vpc-notice-tag">No dedicated program</span>
                                )}
                                {v.abolished && (
                                  <span className="vpc-abolished-tag">Closed / Abolished</span>
                                )}
                                {v.placeholder && (
                                  <span className="vpc-soon-tag">Data coming soon</span>
                                )}
                              </h3>
                              <div className="vpc-quick-stats">
                                {hasData && (
                                  <>
                                    <span className="vpc-stat">
                                      <span className="vpc-stat-label">Difficulty</span>
                                      {v.abolished ? (
                                        <span className="vpc-stat-diff diff-closed">{v.difficultyLevel}</span>
                                      ) : (
                                        <span className={`vpc-stat-diff diff-${v.difficultyScore < 40 ? 'easy' : v.difficultyScore < 65 ? 'moderate' : 'hard'}`}>
                                          {v.difficultyLevel} ({v.difficultyScore})
                                        </span>
                                      )}
                                    </span>
                                    <span className="vpc-stat">
                                      <span className="vpc-stat-label">Cost</span>
                                      <span className="vpc-stat-value">{v.costRange}</span>
                                    </span>
                                    <span className="vpc-stat">
                                      <span className="vpc-stat-label">Time</span>
                                      <span className="vpc-stat-value">{v.processingTime}</span>
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="vpc-chevron">
                              <Icon
                                name="chevronRight"
                                size={18}
                                style={{
                                  transition: 'transform 0.25s ease',
                                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                }}
                              />
                            </div>
                          </button>

                           {isOpen && (
                             <div className="vpc-body">
                               {hasData ? (
                                 <>
                                   {/* Best for — prominent at top */}
                                   {v.bestFor && v.bestFor.length > 0 && (
                                     <div className="vpc-bestfor-hero">
                                       <div className="vpc-bestfor-hero-label">
                                         <Icon name="users" size={16} /> Best For
                                       </div>
                                       <div className="vpc-bestfor-hero-chips">
                                         {(v.bestFor || []).map((bf, bi) => (
                                           <span key={bi} className="vpc-bestfor-pill">{bf}</span>
                                         ))}
                                       </div>
                                     </div>
                                   )}

                                   {/* Tabs */}
                                   <div className="vpc-tabs">
                                     {vpcTabs.map((tab, ti) => {
                                       const hasContent = checkTabHasContent(v, tab.key, guide);
                                       if (!hasContent) return null;
                                       return (
                                         <button
                                           key={tab.key}
className={`vpc-tab ${activeTab[i] === tab.key || (!activeTab[i] && ti === 0) ? 'vpc-tab-active' : ''}`}
                                            onClick={() => setActiveTab({ ...activeTab, [i]: tab.key })}
                                         >
                                           <Icon name={tab.icon} size={14} />
                                           {tab.label}
                                         </button>
                                       );
                                     })}
                                   </div>

                                   {/* Tab content */}
                                   <div className="vpc-tab-content">
                                     {/* Overview tab (always first) */}
                                     {(!activeTab[i] || activeTab[i] === 'overview') && (
                                       <div className="vpc-tab-pane">
                                         <div className="vpc-section">
                                           <h4 className="vpc-section-title"><Icon name="gauge" size={16} /> Why this difficulty</h4>
                                           <p className="vpc-difficulty-note">{v.difficultySummary}</p>
                                         </div>
                                         <div className="vpc-section">
                                           <h4 className="vpc-section-title"><Icon name="checkCircle" size={16} /> Key Requirements</h4>
                                           <p className="vpc-requirements">{v.keyRequirements}</p>
                                         </div>
                                         {v.description && (
                                           <div className="vpc-section">
                                             <h4 className="vpc-section-title"><Icon name="fileText" size={16} /> Full Details</h4>
                                             <p className="vpc-desc">{v.description}</p>
                                           </div>
                                         )}
                                         {v.caveat && (
                                           <div className="vpc-caveat">
                                             <Icon name="alertTriangle" size={16} />
                                             <span>{v.caveat}</span>
                                           </div>
                                         )}
                                         {v.usFriendly !== null && v.usFriendly !== undefined && (
                                           <div className={`vpc-usfriendly ${v.usFriendly ? 'vpc-us-yes' : 'vpc-us-no'}`}>
                                             <Icon name={v.usFriendly ? 'checkCircle' : 'info'} size={16} />
                                             <span>
                                               <strong>{v.usFriendly ? 'US citizen friendly' : 'Note for US citizens'}</strong>
                                               {v.usFriendlyNote && ` — ${v.usFriendlyNote}`}
                                             </span>
                                           </div>
                                         )}
                                       </div>
                                     )}

                                     {/* Process tab */}
                                     {(activeTab[i] === 'process') && (v.process && v.process.length > 0 || guide.applicationProcess && guide.applicationProcess.length > 0) && (
                                       <div className="vpc-tab-pane">
                                         <div className="visa-process-steps">
                                           {(v.process && v.process.length > 0 ? v.process : guide.applicationProcess).map((step) => (
                                             <div key={step.step} className="visa-process-step">
                                               <div className="visa-step-number">Step {step.step}</div>
                                               <h3 className="visa-step-title">{step.title}</h3>
                                               <div className="visa-step-meta">
                                                 {step.location && (
                                                   <div className="visa-step-meta-item">
                                                     <Icon name="mapPin" size={13} /> {step.location}
                                                   </div>
                                                 )}
                                                 {step.duration && (
                                                   <div className="visa-step-meta-item">
                                                     <Icon name="clock" size={13} /> {step.duration}
                                                   </div>
                                                 )}
                                               </div>
                                               <ul className="visa-step-list">
                                                 {(step.details || []).map((d, di) => (
                                                   <li key={di}>
                                                     <Icon name="checkCircle" size={14} />
                                                     <span>{d}</span>
                                                   </li>
                                                 ))}
                                               </ul>
                                             </div>
                                           ))}
                                         </div>
                                       </div>
                                     )}

                                     {/* Timeline tab */}
                                     {(activeTab[i] === 'timeline') && (v.timeline && v.timeline.length > 0 || guide.timeline && guide.timeline.length > 0) && (
                                       <div className="vpc-tab-pane">
                                         <div className="visa-timeline">
                                           {(v.timeline && v.timeline.length > 0 ? v.timeline : guide.timeline).map((t, ti) => (
                                             <div key={ti} className={`visa-tl-item ${ti === v.timeline.length - 1 ? 'visa-tl-total' : ''}`}>
                                               <div className="visa-tl-dot" />
                                               <div className="visa-tl-content">
                                                 <div className="visa-tl-phase">{t.phase}</div>
                                                 <div className="visa-tl-duration">{t.duration}</div>
                                                 {t.note && <div className="visa-tl-note">{t.note}</div>}
                                               </div>
                                             </div>
                                           ))}
                                         </div>
                                       </div>
                                     )}

                                     {/* Costs tab */}
                                     {(activeTab[i] === 'costs') && (v.costs && v.costs.length > 0 || guide.costs && guide.costs.length > 0) && (
                                       <div className="vpc-tab-pane">
                                         <table className="visa-cost-table">
                                           <thead>
                                             <tr>
                                               <th>Item</th>
                                               <th>Cost</th>
                                               <th>Notes</th>
                                             </tr>
                                           </thead>
                                           <tbody>
                                             {(v.costs && v.costs.length > 0 ? v.costs : guide.costs).map((c, ci) => (
                                               <tr key={ci} className={ci === v.costs.length - 1 ? 'visa-cost-total' : ''}>
                                                 <td>{c.item}</td>
                                                 <td className="visa-cost-amount">{c.amount}</td>
                                                 <td className="visa-cost-note">{c.note}</td>
                                               </tr>
                                             ))}
                                           </tbody>
                                         </table>
                                       </div>
                                     )}

                                     {/* Documents tab */}
                                     {(activeTab[i] === 'documents') && (v.documents && v.documents.length > 0 || guide.documents && guide.documents.length > 0) && (
                                       <div className="vpc-tab-pane">
                                         <ul className="visa-doc-list">
                                           {(v.documents && v.documents.length > 0 ? v.documents : guide.documents).map((d, di) => (
                                             <li key={di} className={d.required ? 'visa-doc-required' : 'visa-doc-optional'}>
                                               <span className="visa-doc-check">
                                                 {d.required ? (
                                                   <Icon name="checkCircle" size={16} />
                                                 ) : (
                                                   <Icon name="circle" size={16} />
                                                 )}
                                               </span>
                                               <div className="visa-doc-content">
                                                 <div className="visa-doc-item">{d.item}</div>
                                                 <div className="visa-doc-note">{d.note}</div>
                                               </div>
                                               <span className={`visa-doc-tag ${d.required ? 'tag-req' : 'tag-opt'}`}>
                                                 {d.required ? 'Required' : 'Optional'}
                                               </span>
                                             </li>
                                           ))}
                                         </ul>
                                       </div>
                                     )}

                                     {/* Financial tab */}
                                     {(activeTab[i] === 'financial') && ((v.financialReq && v.financialReq.hasRequirement) || (!v.financialReq && guide.financialRequirements)) && (
                                       <div className="vpc-tab-pane">
                                         {v.financialReq && v.financialReq.hasRequirement ? (
                                           <>
                                             <div className="visa-financial-note">
                                               <Icon name="info" size={14} />
                                               <span>{v.financialReq.note || v.financialReq.summary}</span>
                                             </div>
                                             {v.financialReq.paths && v.financialReq.paths.length > 0 && (
                                               <div className="visa-financial-paths">
                                                 {(v.financialReq.paths || []).map((path, pi) => (
                                                   <div key={pi} className="visa-financial-path">
                                                     <h3 className="visa-financial-path-title">{path.label}</h3>
                                                     <p className="visa-financial-path-desc">{path.description}</p>
                                                     <ul className="visa-financial-list">
                                                       {(path.details || []).map((d, di) => (
                                                         <li key={di}>
                                                           <div className="visa-financial-label">{d.label}</div>
                                                           <div className="visa-financial-value">{d.value}</div>
                                                           <div className="visa-financial-note-sm">{d.note}</div>
                                                         </li>
                                                       ))}
                                                     </ul>
                                                   </div>
                                                 ))}
                                               </div>
                                             )}
                                           </>
                                         ) : (
                                           <>
                                             <div className="visa-financial-note">
                                               <Icon name="info" size={14} />
                                               <span>{guide.financialRequirements.note}</span>
                                             </div>
                                             <div className="visa-financial-paths">
                                                {[guide.financialRequirements.incomePath, guide.financialRequirements.savingsPath].filter(Boolean).map((path, pi) => (
                                                  <div key={pi} className="visa-financial-path">
                                                    <h3 className="visa-financial-path-title">{path.label}</h3>
                                                    <p className="visa-financial-path-desc">{path.description}</p>
                                                    <ul className="visa-financial-list">
                                                      {(path.details || []).map((d, di) => (
                                                       <li key={di}>
                                                         <div className="visa-financial-label">{d.label}</div>
                                                         <div className="visa-financial-value">{d.value}</div>
                                                         <div className="visa-financial-note-sm">{d.note}</div>
                                                       </li>
                                                     ))}
                                                   </ul>
                                                 </div>
                                               ))}
                                             </div>
                                           </>
                                         )}
                                       </div>
                                     )}

                                     {/* Pitfalls tab */}
                                     {(activeTab[i] === 'pitfalls') && (v.pitfalls && v.pitfalls.length > 0 || guide.pitfalls && guide.pitfalls.length > 0) && (
                                       <div className="vpc-tab-pane">
                                         <div className="visa-pitfalls-grid">
                                           {(v.pitfalls && v.pitfalls.length > 0 ? v.pitfalls : guide.pitfalls).map((p, pi) => (
                                             <div key={pi} className="visa-pitfall-card">
                                               <div className="visa-pitfall-icon">
                                                 <Icon name="alertTriangle" size={18} />
                                               </div>
                                               <div>
                                                 <h4 className="visa-pitfall-title">{p.title}</h4>
                                                 <p className="visa-pitfall-desc">{p.desc}</p>
                                               </div>
                                             </div>
                                           ))}
                                         </div>
                                       </div>
                                     )}

                                     {/* Path tab */}
                                     {(activeTab[i] === 'path') && ((v.residencyPath && v.residencyPath.hasPath) || (!v.residencyPath && guide.residencyPath)) && (
                                       <div className="vpc-tab-pane">
                                         {v.residencyPath ? (
                                           <div className="visa-path-flow">
                                             {v.residencyPath.temporary && (
                                               <div className="visa-path-card">
                                                 <div className="visa-path-badge">Step 1</div>
                                                 <h4>Temporary Residency</h4>
                                                 <p>{v.residencyPath.temporary}</p>
                                               </div>
                                             )}
                                             {v.residencyPath.permanent && (
                                               <>
                                                 <div className="visa-path-arrow">
                                                   <Icon name="arrowRight" size={24} />
                                                 </div>
                                                 <div className="visa-path-card">
                                                   <div className="visa-path-badge">Step 2</div>
                                                   <h4>Permanent Residency</h4>
                                                   <p>{v.residencyPath.permanent}</p>
                                                 </div>
                                               </>
                                             )}
                                             {v.residencyPath.citizenship && (
                                               <>
                                                 <div className="visa-path-arrow">
                                                   <Icon name="arrowRight" size={24} />
                                                 </div>
                                                 <div className="visa-path-card">
                                                   <div className="visa-path-badge">Step 3</div>
                                                   <h4>Citizenship</h4>
                                                   <p>{v.residencyPath.citizenship}</p>
                                                 </div>
                                               </>
                                             )}
                                           </div>
                                         ) : (
                                           <div className="visa-path-flow">
                                             <div className="visa-path-card">
                                               <div className="visa-path-badge">Step 1</div>
                                               <h4>Temporary Residency</h4>
                                               <p>{guide.residencyPath.temporary}</p>
                                             </div>
                                             <div className="visa-path-arrow">
                                               <Icon name="arrowRight" size={24} />
                                             </div>
                                             <div className="visa-path-card">
                                               <div className="visa-path-badge">Step 2</div>
                                               <h4>Permanent Residency</h4>
                                               <p>{guide.residencyPath.permanent}</p>
                                             </div>
                                             <div className="visa-path-arrow">
                                               <Icon name="arrowRight" size={24} />
                                             </div>
                                             <div className="visa-path-card">
                                               <div className="visa-path-badge">Step 3</div>
                                               <h4>Citizenship</h4>
                                               <p>{guide.residencyPath.citizenship}</p>
                                             </div>
                                           </div>
                                         )}
                                       </div>
                                     )}

                                     {/* No path case */}
                                     {(activeTab[i] === 'path') && v.residencyPath && !v.residencyPath.hasPath && v.residencyPath.summary && (
                                       <div className="vpc-tab-pane">
                                         <div className="vpc-usfriendly vpc-us-no">
                                           <Icon name="info" size={16} />
                                           <span>{v.residencyPath.summary}</span>
                                         </div>
                                       </div>
                                     )}

                                     {/* Score tab */}
                                     {(activeTab[i] === 'scores') && (v.scores && v.scores.length > 0 || guide.scores && guide.scores.length > 0) && (
                                       <div className="vpc-tab-pane">
                                         <div className="clp-scores-grid">
                                           {(v.scores && v.scores.length > 0 ? v.scores : guide.scores).map((s, si) => (
                                             <div key={si} className="score-ring-card" title={s.tip}>
                                               <div className="score-ring">
                                                 <svg viewBox="0 0 100 100">
                                                   <circle cx="50" cy="50" r="40" fill="none" stroke="var(--ink-100)" strokeWidth="8" />
                                                   <circle
                                                     cx="50" cy="50" r="40" fill="none"
                                                     stroke="var(--teal-500)"
                                                     strokeWidth="8"
                                                     strokeLinecap="round"
                                                     strokeDasharray={`${(s.value / s.max) * 251.2} 251.2`}
                                                     transform="rotate(-90 50 50)"
                                                   />
                                                 </svg>
                                                 <div className="score-ring-value">{s.value}</div>
                                               </div>
                                               <div className="score-ring-label">{s.label}</div>
                                             </div>
                                           ))}
                                         </div>
                                       </div>
                                     )}
                                   </div>
                                 </>
                               ) : (
                                 <div className="vpc-placeholder-body">
                                   <Icon name="clock" size={22} />
                                   <div>
                                     <div className="vpc-ph-title">Data coming soon</div>
                                     <div className="vpc-ph-desc">We're compiling verified details for this program. Check back soon for step-by-step processes, cost breakdowns, document checklists, and more.</div>
                                   </div>
                                 </div>
                               )}
                             </div>
                           )}
                        </div>
                       );
                     })}
                     </div>
                   </div>
                   <div className="visa-col">
                     <div className="visa-col-header">
                       <div className="visa-col-icon visa-col-icon-res"><Icon name="home" size={18} /></div>
                       <div>
                         <h2 className="visa-col-title">Residency Programs</h2>
                         <p className="visa-col-subtitle">Long-term stay & immigration pathways</p>
                       </div>
                     </div>
                     <div className="visa-program-cards">
                       {guide.visaTypes
                         .map((v, origIdx) => ({ v, origIdx }))
                         .filter(({ v }) => getProgramCategory(v) === 'residency')
                         .map(({ v, origIdx }) => {
                           const i = origIdx;
                           const isOpen = expandedPrograms === i;
                           const hasData = (v.difficultyScore !== null && v.difficultyScore !== undefined && !v.placeholder) || v.abolished;
                           return (
                             <div
                               key={i}
                               className={`visa-program-card ${isOpen ? 'is-open' : ''} ${v.noDedicatedProgram ? 'vpc-muted' : ''} ${v.abolished ? 'vpc-abolished' : ''} ${!hasData ? 'vpc-placeholder' : ''}`}
                             >
                               <button
                                 className="vpc-header"
                                 onClick={() => setExpandedPrograms(isOpen ? null : i)}
                                 aria-expanded={isOpen}
                               >
                                 <div className="vpc-icon">
                                   <Icon name={v.icon || 'passport'} size={20} />
                                 </div>
                                 <div className="vpc-title-row">
                                   <h3 className="vpc-name">
                                     {v.name}
                                     {v.noDedicatedProgram && (
                                       <span className="vpc-notice-tag">No dedicated program</span>
                                     )}
                                     {v.abolished && (
                                       <span className="vpc-abolished-tag">Closed / Abolished</span>
                                     )}
                                     {v.placeholder && (
                                       <span className="vpc-soon-tag">Data coming soon</span>
                                     )}
                                   </h3>
                                   <div className="vpc-quick-stats">
                                     {hasData && (
                                       <>
                                         <span className="vpc-stat">
                                           <span className="vpc-stat-label">Difficulty</span>
                                           {v.abolished ? (
                                             <span className="vpc-stat-diff diff-closed">{v.difficultyLevel}</span>
                                           ) : (
                                             <span className={`vpc-stat-diff diff-${v.difficultyScore < 40 ? 'easy' : v.difficultyScore < 65 ? 'moderate' : 'hard'}`}>
                                               {v.difficultyLevel} ({v.difficultyScore})
                                             </span>
                                           )}
                                         </span>
                                         <span className="vpc-stat">
                                           <span className="vpc-stat-label">Cost</span>
                                           <span className="vpc-stat-value">{v.costRange}</span>
                                         </span>
                                         <span className="vpc-stat">
                                           <span className="vpc-stat-label">Time</span>
                                           <span className="vpc-stat-value">{v.processingTime}</span>
                                         </span>
                                       </>
                                     )}
                                   </div>
                                 </div>
                                 <div className="vpc-chevron">
                                   <Icon
                                     name="chevronRight"
                                     size={18}
                                     style={{
                                       transition: 'transform 0.25s ease',
                                       transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                     }}
                                   />
                                 </div>
                               </button>

                               {isOpen && (
                                 <div className="vpc-body">
                                   {hasData ? (
                                     <>
                                       {/* Best for — prominent at top */}
                                       {v.bestFor && v.bestFor.length > 0 && (
                                         <div className="vpc-bestfor-hero">
                                           <div className="vpc-bestfor-hero-label">
                                             <Icon name="users" size={16} /> Best For
                                           </div>
                                           <div className="vpc-bestfor-hero-chips">
                                             {(v.bestFor || []).map((bf, bi) => (
                                               <span key={bi} className="vpc-bestfor-pill">{bf}</span>
                                             ))}
                                           </div>
                                         </div>
                                       )}

                                       {/* Tabs */}
                                       <div className="vpc-tabs">
                                         {vpcTabs.map((tab, ti) => {
                                           const hasContent = checkTabHasContent(v, tab.key, guide);
                                           if (!hasContent) return null;
                                           return (
                                             <button
                                               key={tab.key}
className={`vpc-tab ${activeTab[i] === tab.key || (!activeTab[i] && ti === 0) ? 'vpc-tab-active' : ''}`}
                                            onClick={() => setActiveTab({ ...activeTab, [i]: tab.key })}
                                             >
                                               <Icon name={tab.icon} size={14} />
                                               {tab.label}
                                             </button>
                                           );
                                         })}
                                       </div>

                                       {/* Tab content */}
                                       <div className="vpc-tab-content">
                                         {/* Overview tab (always first) */}
                                         {(!activeTab[i] || activeTab[i] === 'overview') && (
                                           <div className="vpc-tab-pane">
                                             <div className="vpc-section">
                                               <h4 className="vpc-section-title"><Icon name="gauge" size={16} /> Why this difficulty</h4>
                                               <p className="vpc-difficulty-note">{v.difficultySummary}</p>
                                             </div>
                                             <div className="vpc-section">
                                               <h4 className="vpc-section-title"><Icon name="checkCircle" size={16} /> Key Requirements</h4>
                                               <p className="vpc-requirements">{v.keyRequirements}</p>
                                             </div>
                                             {v.description && (
                                               <div className="vpc-section">
                                                 <h4 className="vpc-section-title"><Icon name="fileText" size={16} /> Full Details</h4>
                                                 <p className="vpc-desc">{v.description}</p>
                                               </div>
                                             )}
                                             {v.caveat && (
                                               <div className="vpc-caveat">
                                                 <Icon name="alertTriangle" size={16} />
                                                 <span>{v.caveat}</span>
                                               </div>
                                             )}
                                             {v.usFriendly !== null && v.usFriendly !== undefined && (
                                               <div className={`vpc-usfriendly ${v.usFriendly ? 'vpc-us-yes' : 'vpc-us-no'}`}>
                                                 <Icon name={v.usFriendly ? 'checkCircle' : 'info'} size={16} />
                                                 <span>
                                                   <strong>{v.usFriendly ? 'US citizen friendly' : 'Note for US citizens'}</strong>
                                                   {v.usFriendlyNote && ` — ${v.usFriendlyNote}`}
                                                 </span>
                                               </div>
                                             )}
                                           </div>
                                         )}

                                         {/* Process tab */}
                                         {(activeTab[i] === 'process') && (v.process && v.process.length > 0 || guide.applicationProcess && guide.applicationProcess.length > 0) && (
                                           <div className="vpc-tab-pane">
                                             <div className="visa-process-steps">
                                               {(v.process && v.process.length > 0 ? v.process : guide.applicationProcess).map((step) => (
                                                 <div key={step.step} className="visa-process-step">
                                                   <div className="visa-step-number">Step {step.step}</div>
                                                   <h3 className="visa-step-title">{step.title}</h3>
                                                   <div className="visa-step-meta">
                                                     {step.location && (
                                                       <div className="visa-step-meta-item">
                                                         <Icon name="mapPin" size={13} /> {step.location}
                                                       </div>
                                                     )}
                                                     {step.duration && (
                                                       <div className="visa-step-meta-item">
                                                         <Icon name="clock" size={13} /> {step.duration}
                                                       </div>
                                                     )}
                                                   </div>
                                                   <ul className="visa-step-list">
                                                     {(step.details || []).map((d, di) => (
                                                       <li key={di}>
                                                         <Icon name="checkCircle" size={14} />
                                                         <span>{d}</span>
                                                       </li>
                                                     ))}
                                                   </ul>
                                                 </div>
                                               ))}
                                             </div>
                                           </div>
                                         )}

                                         {/* Timeline tab */}
                                         {(activeTab[i] === 'timeline') && (v.timeline && v.timeline.length > 0 || guide.timeline && guide.timeline.length > 0) && (
                                           <div className="vpc-tab-pane">
                                             <div className="visa-timeline">
                                               {(v.timeline && v.timeline.length > 0 ? v.timeline : guide.timeline).map((t, ti) => (
                                                 <div key={ti} className={`visa-tl-item ${ti === v.timeline.length - 1 ? 'visa-tl-total' : ''}`}>
                                                   <div className="visa-tl-dot" />
                                                   <div className="visa-tl-content">
                                                     <div className="visa-tl-phase">{t.phase}</div>
                                                     <div className="visa-tl-duration">{t.duration}</div>
                                                     {t.note && <div className="visa-tl-note">{t.note}</div>}
                                                   </div>
                                                 </div>
                                               ))}
                                             </div>
                                           </div>
                                         )}

                                         {/* Costs tab */}
                                         {(activeTab[i] === 'costs') && (v.costs && v.costs.length > 0 || guide.costs && guide.costs.length > 0) && (
                                           <div className="vpc-tab-pane">
                                             <table className="visa-cost-table">
                                               <thead>
                                                 <tr>
                                                   <th>Item</th>
                                                   <th>Cost</th>
                                                   <th>Notes</th>
                                                 </tr>
                                               </thead>
                                               <tbody>
                                                 {(v.costs && v.costs.length > 0 ? v.costs : guide.costs).map((c, ci) => (
                                                   <tr key={ci} className={ci === v.costs.length - 1 ? 'visa-cost-total' : ''}>
                                                     <td>{c.item}</td>
                                                     <td className="visa-cost-amount">{c.amount}</td>
                                                     <td className="visa-cost-note">{c.note}</td>
                                                   </tr>
                                                 ))}
                                               </tbody>
                                             </table>
                                           </div>
                                         )}

                                         {/* Documents tab */}
                                         {(activeTab[i] === 'documents') && (v.documents && v.documents.length > 0 || guide.documents && guide.documents.length > 0) && (
                                           <div className="vpc-tab-pane">
                                             <ul className="visa-doc-list">
                                               {(v.documents && v.documents.length > 0 ? v.documents : guide.documents).map((d, di) => (
                                                 <li key={di} className={d.required ? 'visa-doc-required' : 'visa-doc-optional'}>
                                                   <span className="visa-doc-check">
                                                     {d.required ? (
                                                       <Icon name="checkCircle" size={16} />
                                                     ) : (
                                                       <Icon name="circle" size={16} />
                                                     )}
                                                   </span>
                                                   <div className="visa-doc-content">
                                                     <div className="visa-doc-item">{d.item}</div>
                                                     <div className="visa-doc-note">{d.note}</div>
                                                   </div>
                                                   <span className={`visa-doc-tag ${d.required ? 'tag-req' : 'tag-opt'}`}>
                                                     {d.required ? 'Required' : 'Optional'}
                                                   </span>
                                                 </li>
                                               ))}
                                             </ul>
                                           </div>
                                         )}

                                         {/* Financial tab */}
                                         {(activeTab[i] === 'financial') && ((v.financialReq && v.financialReq.hasRequirement) || (!v.financialReq && guide.financialRequirements)) && (
                                           <div className="vpc-tab-pane">
                                             {v.financialReq && v.financialReq.hasRequirement ? (
                                               <>
                                                 <div className="visa-financial-note">
                                                   <Icon name="info" size={14} />
                                                   <span>{v.financialReq.note || v.financialReq.summary}</span>
                                                 </div>
                                                  {v.financialReq.paths && v.financialReq.paths.length > 0 && (
                                                    <div className="visa-financial-paths">
                                                      {(v.financialReq.paths || []).map((path, pi) => (
                                                        <div key={pi} className="visa-financial-path">
                                                          <h3 className="visa-financial-path-title">{path.label}</h3>
                                                          <p className="visa-financial-path-desc">{path.description}</p>
                                                          <ul className="visa-financial-list">
                                                            {(path.details || []).map((d, di) => (
                                                             <li key={di}>
                                                               <div className="visa-financial-label">{d.label}</div>
                                                               <div className="visa-financial-value">{d.value}</div>
                                                               <div className="visa-financial-note-sm">{d.note}</div>
                                                             </li>
                                                           ))}
                                                         </ul>
                                                       </div>
                                                     ))}
                                                   </div>
                                                 )}
                                               </>
                                             ) : (
                                               <>
                                                 <div className="visa-financial-note">
                                                   <Icon name="info" size={14} />
                                                   <span>{guide.financialRequirements.note}</span>
                                                 </div>
                                                 <div className="visa-financial-paths">
                                                   {[guide.financialRequirements.incomePath, guide.financialRequirements.savingsPath].filter(Boolean).map((path, pi) => (
                                                     <div key={pi} className="visa-financial-path">
                                                       <h3 className="visa-financial-path-title">{path.label}</h3>
                                                       <p className="visa-financial-path-desc">{path.description}</p>
                                                       <ul className="visa-financial-list">
                                                         {(path.details || []).map((d, di) => (
                                                           <li>
                                                             <div className="visa-financial-label">{d.label}</div>
                                                             <div className="visa-financial-value">{d.value}</div>
                                                             <div className="visa-financial-note-sm">{d.note}</div>
                                                           </li>
                                                         ))}
                                                       </ul>
                                                     </div>
                                                   ))}
                                                 </div>
                                               </>
                                             )}
                                           </div>
                                         )}

                                         {/* Pitfalls tab */}
                                         {(activeTab[i] === 'pitfalls') && (v.pitfalls && v.pitfalls.length > 0 || guide.pitfalls && guide.pitfalls.length > 0) && (
                                           <div className="vpc-tab-pane">
                                             <div className="visa-pitfalls-grid">
                                               {(v.pitfalls && v.pitfalls.length > 0 ? v.pitfalls : guide.pitfalls).map((p, pi) => (
                                                 <div key={pi} className="visa-pitfall-card">
                                                   <div className="visa-pitfall-icon">
                                                     <Icon name="alertTriangle" size={18} />
                                                   </div>
                                                   <div>
                                                     <h4 className="visa-pitfall-title">{p.title}</h4>
                                                     <p className="visa-pitfall-desc">{p.desc}</p>
                                                   </div>
                                                 </div>
                                               ))}
                                             </div>
                                           </div>
                                         )}

                                         {/* Path tab */}
                                         {(activeTab[i] === 'path') && ((v.residencyPath && v.residencyPath.hasPath) || (!v.residencyPath && guide.residencyPath)) && (
                                           <div className="vpc-tab-pane">
                                             {v.residencyPath ? (
                                               <div className="visa-path-flow">
                                                 {v.residencyPath.temporary && (
                                                   <div className="visa-path-card">
                                                     <div className="visa-path-badge">Step 1</div>
                                                     <h4>Temporary Residency</h4>
                                                     <p>{v.residencyPath.temporary}</p>
                                                   </div>
                                                 )}
                                                 {v.residencyPath.permanent && (
                                                   <>
                                                     <div className="visa-path-arrow">
                                                       <Icon name="arrowRight" size={24} />
                                                     </div>
                                                     <div className="visa-path-card">
                                                       <div className="visa-path-badge">Step 2</div>
                                                       <h4>Permanent Residency</h4>
                                                       <p>{v.residencyPath.permanent}</p>
                                                     </div>
                                                   </>
                                                 )}
                                                 {v.residencyPath.citizenship && (
                                                   <>
                                                     <div className="visa-path-arrow">
                                                       <Icon name="arrowRight" size={24} />
                                                     </div>
                                                     <div className="visa-path-card">
                                                       <div className="visa-path-badge">Step 3</div>
                                                       <h4>Citizenship</h4>
                                                       <p>{v.residencyPath.citizenship}</p>
                                                     </div>
                                                   </>
                                                 )}
                                               </div>
                                             ) : (
                                               <div className="visa-path-flow">
                                                 <div className="visa-path-card">
                                                   <div className="visa-path-badge">Step 1</div>
                                                   <h4>Temporary Residency</h4>
                                                   <p>{guide.residencyPath.temporary}</p>
                                                 </div>
                                                 <div className="visa-path-arrow">
                                                   <Icon name="arrowRight" size={24} />
                                                 </div>
                                                 <div className="visa-path-card">
                                                   <div className="visa-path-badge">Step 2</div>
                                                   <h4>Permanent Residency</h4>
                                                   <p>{guide.residencyPath.permanent}</p>
                                                 </div>
                                                 <div className="visa-path-arrow">
                                                   <Icon name="arrowRight" size={24} />
                                                 </div>
                                                 <div className="visa-path-card">
                                                   <div className="visa-path-badge">Step 3</div>
                                                   <h4>Citizenship</h4>
                                                   <p>{guide.residencyPath.citizenship}</p>
                                                 </div>
                                               </div>
                                             )}
                                           </div>
                                         )}

                                         {/* No path case */}
                                         {(activeTab[i] === 'path') && v.residencyPath && !v.residencyPath.hasPath && v.residencyPath.summary && (
                                           <div className="vpc-tab-pane">
                                             <div className="vpc-usfriendly vpc-us-no">
                                               <Icon name="info" size={16} />
                                               <span>{v.residencyPath.summary}</span>
                                             </div>
                                           </div>
                                         )}

                                         {/* Score tab */}
                                         {(activeTab[i] === 'scores') && (v.scores && v.scores.length > 0 || guide.scores && guide.scores.length > 0) && (
                                           <div className="vpc-tab-pane">
                                             <div className="clp-scores-grid">
                                               {(v.scores && v.scores.length > 0 ? v.scores : guide.scores).map((s, si) => (
                                                 <div key={si} className="score-ring-card" title={s.tip}>
                                                   <div className="score-ring">
                                                     <svg viewBox="0 0 100 100">
                                                       <circle cx="50" cy="50" r="40" fill="none" stroke="var(--ink-100)" strokeWidth="8" />
                                                       <circle
                                                         cx="50" cy="50" r="40" fill="none"
                                                         stroke="var(--teal-500)"
                                                         strokeWidth="8"
                                                         strokeLinecap="round"
                                                         strokeDasharray={`${(s.value / s.max) * 251.2} 251.2`}
                                                         transform="rotate(-90 50 50)"
                                                       />
                                                     </svg>
                                                     <div className="score-ring-value">{s.value}</div>
                                                   </div>
                                                   <div className="score-ring-label">{s.label}</div>
                                                 </div>
                                               ))}
                                             </div>
                                           </div>
                                         )}
                                       </div>
                                     </>
                                   ) : (
                                     <div className="vpc-placeholder-body">
                                       <Icon name="clock" size={22} />
                                       <div>
                                         <div className="vpc-ph-title">Data coming soon</div>
                                         <div className="vpc-ph-desc">We're compiling verified details for this program. Check back soon for step-by-step processes, cost breakdowns, document checklists, and more.</div>
                                       </div>
                                     </div>
                                   )}
                                 </div>
                               )}
                             </div>
                           );
                         })}
                     </div>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Bottom CTA */}
          <div className="clp-bottom-cta">
            <button className="btn btn-primary btn-lg" onClick={backRanking}>
              ← Back to Country Rankings
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function BankMoneyTaxPage({ countrySlug, onNavigate, onRankingClick, onBankAccountClick }) {
  const guide = bankGuides[countrySlug];
  const country = guide ? guide.country : countrySlug;
  const flagEmoji = guide ? guide.flagEmoji : '🏳️';
  const isPlaceholder = !guide || guide.placeholder;

  const backRanking = () => onRankingClick && onRankingClick();

  const SectionCard = ({ icon, title, subtitle, children }) => (
    <div className="clp-section">
      <div className="clp-section-head">
        <div className="clp-section-icon"><Icon name={icon} size={18} /></div>
        <div>
          <h2 className="clp-section-title">{title}</h2>
          {subtitle && <p className="clp-section-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="clp-section-body">{children}</div>
    </div>
  );

  const PlaceholderBlock = ({ label }) => (
    <div className="clp-placeholder">
      <div className="clp-placeholder-icon"><Icon name="clock" size={28} /></div>
      <div>
        <div className="clp-placeholder-title">Data coming soon</div>
        <div className="clp-placeholder-desc">We're compiling verified banking, money & tax data for {country}. Check back soon.</div>
      </div>
    </div>
  );

  // -------- Score bar helper --------
  const ScoreBar = ({ label, value, max = 100, direction = 'higher', tip }) => {
    const pct = Math.round((value / max) * 100);
    const color = direction === 'lower'
      ? (pct <= 33 ? '#2A9D8F' : pct <= 66 ? '#E9C46A' : '#E76F51')
      : (pct >= 67 ? '#2A9D8F' : pct >= 34 ? '#E9C46A' : '#E76F51');
    return (
      <div className="vpc-score-row" title={tip}>
        <div className="vpc-score-label">{label}</div>
        <div className="vpc-score-bar-wrap">
          <div className="vpc-score-bar" style={{ width: pct + '%', backgroundColor: color }} />
        </div>
        <div className="vpc-score-value" style={{ color }}>{value}/{max}</div>
      </div>
    );
  };

  return (
    <div className="fade-in clp-page bank-page">
      {/* ===== HERO ===== */}
      <section className="clp-hero">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Home', onClick: () => onNavigate('home') },
              { label: 'Top Countries Ranking', onClick: backRanking },
              { label: `${country} Bank, Money & Tax` },
            ]}
          />
          <div className="clp-hero-content">
            <button className="clp-back-btn" onClick={backRanking}>
              <Icon name="chevronRight" size={14} style={{ transform: 'rotate(180deg)', marginRight: '4px' }} />
              Back to ranking
            </button>
            <div className="clp-hero-title-row">
              <span className="clp-flag" style={{ fontSize: '2.2rem' }}>{flagEmoji}</span>
              <h1 className="clp-page-title">{guide ? guide.title : `${country}: Banking, Money & Tax Guide`}</h1>
            </div>
            <p className="clp-page-subtitle">
              {guide ? guide.subtitle : `Banking, currency, and tax information for expats in ${country}.`}
            </p>
          </div>
        </div>
      </section>

      <div className="container clp-body">

        {/* ===== DISCLAIMER BANNER ===== */}
        <div className="bank-disclaimer-banner" role="alert">
          <div className="bank-disclaimer-icon">
            <Icon name="alert" size={22} />
          </div>
          <div className="bank-disclaimer-body">
            <div className="bank-disclaimer-title">Disclaimer</div>
            <div className="bank-disclaimer-text">
              The information on this page is provided for general informational purposes only and does not constitute professional financial, tax, legal, or investment advice. It is an aggregate of information gathered from publicly available online sources and may become outdated. ExpatGuide and its operators are not responsible for any decisions, actions, or losses made in reliance on this content. Always consult a qualified professional (e.g., CPA, tax attorney, or licensed advisor) for advice tailored to your situation.
            </div>
          </div>
        </div>

        {isPlaceholder ? (
          <>
            <SectionCard icon="bank" title="Banking in the Country" subtitle="Opening accounts, best banks for expats, and documentation requirements">
              <PlaceholderBlock label="Banking data" />
            </SectionCard>
            <SectionCard icon="coin" title="Currency & Money" subtitle="Local currency, ATMs, cash usage, and cross-border transfers">
              <PlaceholderBlock label="Money data" />
            </SectionCard>
            <SectionCard icon="shield" title="US Taxes" subtitle="FEIE, FTC, FBAR, and other US tax considerations for expats">
              <PlaceholderBlock label="US tax data" />
            </SectionCard>
            <SectionCard icon="receipt" title={`${country} Taxes`} subtitle="Tax residency, rates, and local tax obligations">
              <PlaceholderBlock label="Local tax data" />
            </SectionCard>
            <SectionCard icon="alertTriangle" title="Common Pitfalls" subtitle="Watch out for these banking and tax mistakes expats often make">
              <PlaceholderBlock label="Pitfall data" />
            </SectionCard>
            <SectionCard icon="award" title="Financial Score Card" subtitle="How this country rates for expat finances">
              <PlaceholderBlock label="Score data" />
            </SectionCard>
            <SectionCard icon="externalLink" title="Official Resources" subtitle="Government sites, tax authorities, and official bank portals">
              <PlaceholderBlock label="Resources data" />
            </SectionCard>
          </>
        ) : (
          <>
            {/* ===== BANKING SECTION ===== */}
             <div className="bank-section-wrap">
               <div className="bank-flag-watermark">
                 <div className="bank-flag-stripe bank-flag-green"></div>
                 <div className="bank-flag-stripe bank-flag-white"></div>
                 <div className="bank-flag-stripe bank-flag-red"></div>
               </div>
               <div className="bank-section-content">
             <SectionCard icon="bank" title="Top Banks for US Expats" subtitle={`Banks ranked by how friendly and accessible they are for Americans moving to ${country}`}>
               <p className="clp-lead-paragraph">{guide.bankingOverview}</p>

               <h3 className="clp-subheading">What you'll need to open a bank account</h3>
               <div className="clp-doc-grid">
                  {(guide.bankDocs || []).map((doc, i) => (
                    <div key={i} className="clp-doc-item">
                     <div className="clp-doc-icon"><Icon name="folderOpen" size={16} /></div>
                     <div>
                       <div className="clp-doc-name">{doc.item}</div>
                       <div className="clp-doc-note">{doc.note}</div>
                     </div>
                   </div>
                 ))}
               </div>

               <h3 className="clp-subheading">Bank comparison</h3>
               <div className="bank-horizontal-list">
                  {(guide.banks || []).map((bank, i) => (
                    <div key={i} className="bank-h-card">
                     <div className="bank-h-left">
                       <div
                         className="bank-h-logo"
                         style={{ backgroundColor: bank.logoColor || '#666' }}
                       >
                         <span className="bank-h-logo-text">{bank.logoInitials || bank.name.slice(0, 2).toUpperCase()}</span>
                       </div>
                       <div className="bank-h-info">
                         <h4 className="bank-h-name">{bank.name}</h4>
                         <div className="bank-h-meta">
                           <span className="bank-h-type">{bank.type}</span>
                           <span className="bank-h-deposit">Min. deposit: {bank.minDeposit}</span>
                         </div>
                         <div className="bank-h-oneliner">{bank.oneLiner}</div>
                       </div>
                     </div>
                     <div className="bank-h-right">
                       <div className="bank-h-score-ring">
                         <svg viewBox="0 0 80 80" className="bank-h-score-svg">
                           <circle cx="40" cy="40" r="32" fill="none" stroke="#e8e2d5" strokeWidth="7" />
                           <circle
                             cx="40" cy="40" r="32" fill="none"
                             stroke={bank.foreignerFriendly >= 85 ? '#2d8f6f' : bank.foreignerFriendly >= 70 ? '#d4a843' : '#c0694c'}
                             strokeWidth="7"
                             strokeLinecap="round"
                             strokeDasharray={`${bank.foreignerFriendly * 2.01} 201.1`}
                             transform="rotate(-90 40 40)"
                           />
                         </svg>
                         <div className="bank-h-score-inner">
                           <div className="bank-h-score-num">{bank.foreignerFriendly}</div>
                           <div className="bank-h-score-sublabel">/ 100</div>
                         </div>
                       </div>
                       <div className="bank-h-score-label" style={{ color: bank.foreignerFriendly >= 85 ? '#2d8f6f' : bank.foreignerFriendly >= 70 ? '#d4a843' : '#c0694c' }}>
                         {bank.foreignerFriendlyLabel}
                       </div>
                        <div className="bank-h-score-sub">US expat friendly</div>
                        {bank.guideSlug && (
                          <button
                            className="bank-h-guide-btn"
                            onClick={() => onBankAccountClick && onBankAccountClick(bank.guideSlug)}
                          >
                            Debit Account Guide
                            <Icon name="chevronRight" size={14} />
                          </button>
                        )}
                      </div>
                   </div>
                 ))}
               </div>
             </SectionCard>
               </div>
             </div>

            {/* ===== MONEY SECTION ===== */}
            <SectionCard icon="coin" title="Currency & Money" subtitle="Pesos, ATMs, cash, cards, and cross-border transfers">
              <p className="clp-lead-paragraph">{guide.moneyOverview}</p>
              <div className="bank-money-grid">
                {(guide.moneyPoints || []).map((point, i) => (
                  <div key={i} className="bank-money-card">
                    <div className="bank-money-icon"><Icon name={point.icon} size={20} /></div>
                    <h4>{point.title}</h4>
                    <p>{point.desc}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* ===== US TAXES ===== */}
            <SectionCard icon="shield" title={`US Taxes for Expats in ${country}`} subtitle="FEIE, FTC, FBAR / FATCA, and citizenship-based taxation">
              <p className="clp-lead-paragraph">{guide.usTaxOverview}</p>
              <div className="bank-tax-grid">
                {(guide.usTaxSections || []).map((section, i) => (
                  <div key={i} className="bank-tax-card">
                    <div className="bank-tax-head">
                      <div className="bank-tax-icon"><Icon name={section.icon} size={18} /></div>
                      <h4>{section.title}</h4>
                    </div>
                    <ul>
                      {(section.points || []).map((p, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: p }} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* ===== LOCAL TAXES ===== */}
            <SectionCard icon="receipt" title={`${country} Taxes`} subtitle={`Tax residency, rates, and local tax obligations in ${country}`}>
              <p className="clp-lead-paragraph">{guide.localTaxOverview || guide.mexicoTaxOverview}</p>
              <div className="bank-tax-grid">
                {((guide.localTaxSections || guide.mexicoTaxSections) || []).map((section, i) => (
                  <div key={i} className="bank-tax-card">
                    <div className="bank-tax-head">
                      <div className="bank-tax-icon"><Icon name={section.icon} size={18} /></div>
                      <h4>{section.title}</h4>
                    </div>
                    <ul>
                      {(section.points || []).map((p, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: p }} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* ===== PITFALLS ===== */}
            <SectionCard icon="alertTriangle" title="Common Pitfalls" subtitle={`Banking and tax mistakes expats often make in ${country}`}>
              <div className="vpc-pitfalls-grid">
                {(guide.pitfalls || []).map((pit, i) => (
                  <div key={i} className="vpc-pitfall-card">
                    <div className="vpc-pitfall-head">
                      <Icon name="alertTriangle" size={16} style={{ color: 'var(--terracotta-500)' }} />
                      <h4>{pit.title}</h4>
                    </div>
                    <p>{pit.desc}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* ===== SCORE CARD ===== */}
            <SectionCard icon="award" title="Financial Score Card" subtitle={`How ${country} rates for US expat finances`}>
              <div className="vpc-scores-wrap">
                {(guide.scoreCard || []).map((s, i) => (
                  <ScoreBar key={i} label={s.label} value={s.value} max={s.max} direction={s.direction} tip={s.tip} />
                ))}
              </div>
            </SectionCard>

            {/* ===== OFFICIAL RESOURCES ===== */}
            <SectionCard icon="externalLink" title="Official Resources" subtitle="Government sites, tax authorities, and leading banks">
              <div className="vpc-resources-grid">
                {(guide.officialResources || []).map((res, i) => (
                  <a key={i} className="vpc-resource-card" href={`https://${res.url}`} target="_blank" rel="noopener noreferrer">
                    <div className="vpc-resource-head">
                      <Icon name="externalLink" size={14} style={{ color: 'var(--teal-500)' }} />
                      <span className="vpc-resource-name">{res.name}</span>
                    </div>
                    <div className="vpc-resource-url">{res.url}</div>
                    <div className="vpc-resource-desc">{res.desc}</div>
                  </a>
                ))}
              </div>
            </SectionCard>
          </>
        )}
      </div>
    </div>
  );
}

// ====================================================================
//    Bank Account Guide Page (per-bank detail page)
// ====================================================================
function BankAccountGuidePage({ bankSlug, onNavigate, onBankClick, onRankingClick }) {
  const guide = bankAccountGuides[bankSlug];

  if (!guide) {
    return (
      <div className="fade-in clp-page">
        <section className="clp-hero">
          <div className="container">
            <h1>Bank account guide not found</h1>
            <p>The guide you're looking for doesn't exist or hasn't been published yet.</p>
            <button className="clp-back-btn" onClick={() => onBankClick && onBankClick('mexico')}>
              <Icon name="chevronRight" size={14} style={{ transform: 'rotate(180deg)', marginRight: '4px' }} />
              Back to Mexico Banking
            </button>
          </div>
        </section>
      </div>
    );
  }

  const scoreColor = guide.expatScore >= 85
    ? '#2d8f6f'
    : guide.expatScore >= 70
    ? '#d4a843'
    : '#c0694c';

  const scoreCircumference = 2 * Math.PI * 52;
  const scoreDash = (guide.expatScore / 100) * scoreCircumference;

  const backToBank = () => onBankClick && onBankClick(guide.countrySlug);

  return (
    <div className="fade-in clp-page bank-account-page">
      {/* ===== HERO ===== */}
      <section className="clp-hero">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Home', onClick: () => onNavigate && onNavigate('home') },
              { label: `${guide.countryName} Bank, Money & Tax`, onClick: backToBank },
              { label: `${guide.bankNameShort} Debit Account Guide` },
            ]}
          />
          <div className="clp-hero-content">
            <button className="clp-back-btn" onClick={backToBank}>
              <Icon name="chevronRight" size={14} style={{ transform: 'rotate(180deg)', marginRight: '4px' }} />
              Back to {guide.countryName} banking
            </button>
            <div className="bag-hero-row">
              <div className="bag-hero-main">
                <div className="bag-hero-logo" style={{ backgroundColor: guide.logoColor }}>
                  <span className="bag-hero-logo-text">{guide.logoInitials}</span>
                </div>
                <div className="bag-hero-text">
                  <span className="bag-hero-bank-name">{guide.bankName}</span>
                  <span className="bag-hero-badge">Debit Account Guide</span>
                  <h1 className="bag-hero-title">{guide.accountName}</h1>
                  <p className="bag-hero-tagline">{guide.heroTagline}</p>
                </div>
              </div>
              <div className="bag-hero-score">
                <div className="bag-score-ring">
                  <svg viewBox="0 0 120 120" className="bag-score-svg">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#e8e2d5" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="52" fill="none"
                      stroke={scoreColor}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${scoreDash} ${scoreCircumference}`}
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="bag-score-inner">
                    <div className="bag-score-num">{guide.expatScore}</div>
                    <div className="bag-score-sublabel">/ 100</div>
                  </div>
                </div>
                <div className="bag-score-label" style={{ color: scoreColor }}>{guide.expatScoreLabel}</div>
                <div className="bag-score-sub">US Expat Friendly</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container clp-body">
        {/* ===== DISCLAIMER ===== */}
        <div className="bank-disclaimer-banner" role="alert">
          <div className="bank-disclaimer-icon">
            <Icon name="alert" size={22} />
          </div>
          <div className="bank-disclaimer-body">
            <div className="bank-disclaimer-title">Disclaimer</div>
            <div className="bank-disclaimer-text">
              The information on this page is provided for general informational purposes only and does not constitute professional financial, tax, legal, or investment advice. Fees, requirements, and account terms change frequently — always confirm current details directly with the bank. ExpatGuide and its operators are not responsible for any decisions, actions, or losses made in reliance on this content.
            </div>
          </div>
        </div>

        {/* ===== ACCOUNT OVERVIEW ===== */}
        <div className="clp-section">
          <div className="clp-section-head">
            <div className="clp-section-icon"><Icon name="wallet" size={18} /></div>
            <div>
              <h2 className="clp-section-title">Account Overview</h2>
              <p className="clp-section-subtitle">{guide.accountType}</p>
            </div>
          </div>
          <div className="clp-section-body">
            <p className="clp-lead-paragraph">{guide.accountOverview}</p>
          </div>
        </div>

        {/* ===== KEY FEATURES ===== */}
        <div className="clp-section">
          <div className="clp-section-head">
            <div className="clp-section-icon"><Icon name="sparkles" size={18} /></div>
            <div>
              <h2 className="clp-section-title">Key Features</h2>
              <p className="clp-section-subtitle">What this account offers for day-to-day banking</p>
            </div>
          </div>
          <div className="clp-section-body">
            <div className="bag-features-grid">
              {(guide.keyFeatures || []).map((f, i) => (
                <div key={i} className="bag-feature-card">
                  <div className="bag-feature-icon">
                    <Icon name={f.icon} size={22} />
                  </div>
                  <h3 className="bag-feature-title">{f.title}</h3>
                  <p className="bag-feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== FEES ===== */}
        <div className="clp-section">
          <div className="clp-section-head">
            <div className="clp-section-icon"><Icon name="receipt" size={18} /></div>
            <div>
              <h2 className="clp-section-title">Fees</h2>
              <p className="clp-section-subtitle">Typical fees — always confirm current rates with the bank</p>
            </div>
          </div>
          <div className="clp-section-body">
            <div className="bag-fees-table">
              {(guide.fees || []).map((f, i) => (
                <div key={i} className="bag-fee-row">
                  <div className="bag-fee-item">
                    <span className="bag-fee-name">{f.item}</span>
                    {f.note && <span className="bag-fee-note">{f.note}</span>}
                  </div>
                  <div className="bag-fee-value">{f.value}</div>
                </div>
              ))}
            </div>
            <p className="bag-fees-disclaimer">
              <Icon name="info" size={14} style={{ marginRight: '6px', verticalAlign: '-2px' }} />
              Fees vary by account tier, location, and time. Confirm the current fee schedule directly with {guide.bankNameShort} before opening an account.
            </p>
          </div>
        </div>

        {/* ===== OPENING REQUIREMENTS ===== */}
        <div className="clp-section">
          <div className="clp-section-head">
            <div className="clp-section-icon"><Icon name="folderOpen" size={18} /></div>
            <div>
              <h2 className="clp-section-title">Opening Requirements for US Expats</h2>
              <p className="clp-section-subtitle">Documents you'll typically need to open an account</p>
            </div>
          </div>
          <div className="clp-section-body">
            <div className="clp-doc-grid">
              {(guide.openingDocs || []).map((doc, i) => (
                <div key={i} className="clp-doc-item">
                  <div className="clp-doc-icon"><Icon name="checkCircle" size={16} /></div>
                  <div>
                    <div className="clp-doc-name">{doc.item}</div>
                    <div className="clp-doc-note">{doc.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== HOW TO OPEN ===== */}
        <div className="clp-section">
          <div className="clp-section-head">
            <div className="clp-section-icon"><Icon name="clipboardList" size={18} /></div>
            <div>
              <h2 className="clp-section-title">How to Open</h2>
              <p className="clp-section-subtitle">Typical process — steps may vary by branch or application type</p>
            </div>
          </div>
          <div className="clp-section-body">
            <div className="bag-steps-list">
              {(guide.openingSteps || []).map((step, i) => (
                <div key={i} className="bag-step-item">
                  <div className="bag-step-num">{i + 1}</div>
                  <div className="bag-step-body">
                    <h3 className="bag-step-title">{step.title}</h3>
                    <p className="bag-step-desc">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== US EXPAT FRIENDLINESS ===== */}
        <div className="clp-section">
          <div className="clp-section-head">
            <div className="clp-section-icon"><Icon name="award" size={18} /></div>
            <div>
              <h2 className="clp-section-title">US Expat Friendliness</h2>
              <p className="clp-section-subtitle">What's great — and what to watch out for</p>
            </div>
          </div>
          <div className="clp-section-body">
            <div className="bag-friendliness-grid">
              <div className="bag-pros-card">
                <div className="bag-pros-head">
                  <Icon name="thumbsUp" size={18} style={{ color: 'var(--teal-600)' }} />
                  <h3>What we like</h3>
                </div>
                <ul>
                  {(guide.friendlinessPros || []).map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="bag-cons-card">
                <div className="bag-cons-head">
                  <Icon name="alertTriangle" size={18} style={{ color: 'var(--terracotta-500)' }} />
                  <h3>What to consider</h3>
                </div>
                <ul>
                  {(guide.friendlinessCons || []).map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TIPS & WARNINGS ===== */}
        <div className="clp-section">
          <div className="clp-section-head">
            <div className="clp-section-icon"><Icon name="lightbulb" size={18} /></div>
            <div>
              <h2 className="clp-section-title">Tips & Warnings</h2>
              <p className="clp-section-subtitle">Practical advice for US expats banking with {guide.bankNameShort}</p>
            </div>
          </div>
          <div className="clp-section-body">
            <div className="bag-tips-grid">
              {(guide.tipsWarnings || []).map((tip, i) => (
                <div key={i} className="bag-tip-card">
                  <div className="bag-tip-head">
                    <Icon name="lightbulb" size={18} style={{ color: '#d4a843' }} />
                    <h3>{tip.title}</h3>
                  </div>
                  <p>{tip.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== FAQ ===== */}
        <div className="clp-section">
          <div className="clp-section-head">
            <div className="clp-section-icon"><Icon name="helpCircle" size={18} /></div>
            <div>
              <h2 className="clp-section-title">FAQ</h2>
              <p className="clp-section-subtitle">Common questions from US expats</p>
            </div>
          </div>
          <div className="clp-section-body">
            <div className="bag-faq-list">
              {(guide.faqs || []).map((faq, i) => (
                <details key={i} className="bag-faq-item">
                  <summary className="bag-faq-q">
                    <span>{faq.q}</span>
                    <Icon name="chevronDown" size={16} />
                  </summary>
                  <div className="bag-faq-a">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* ===== BACK CTA ===== */}
        <div className="bag-back-cta">
          <button className="bag-back-btn" onClick={backToBank}>
            <Icon name="chevronRight" size={16} style={{ transform: 'rotate(180deg)', marginRight: '6px' }} />
            Back to all {guide.countryName} banks
          </button>
        </div>
      </div>
    </div>
  );
}

// Export to window
Object.assign(window, {
  HomePage,
  ArticlePage,
  CategoryPage,
  RankingPage,
  CityCommunityPage,
  VisaImmigrationPage,
  BankMoneyTaxPage,
  BankAccountGuidePage,
});
