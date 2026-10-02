/* ============================================================
   FAQ Hub Page — Top 20 Questions + Site-wide FAQ Search
   ============================================================ */

function FAQHubPage({ onNavigate, onCityClick, onNeighborhoodClick }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [openQ, setOpenQ] = React.useState(null);
  const searchInputRef = React.useRef(null);

  // ---- Safe global references (lifted to component scope so JSX can use them) ----
  const cityProfiles = window.cityProfiles || {};
  const neighborhoodGuides = window.neighborhoodGuides || {};
  const faqCats = window.FAQ_TOP20_CATEGORIES || [];
  const faqList = window.FAQ_TOP20 || [];
  const Icon = window.Icon || (() => null);

  // ---- Build search index from all FAQ sources ----
  const searchIndex = React.useMemo(() => {
    const items = [];

    // Source 1: Top 20
    const top20 = window.FAQ_TOP20 || [];
    top20.forEach((q) => {
      items.push({
        type: 'top20',
        id: `top20-${q.id}`,
        question: q.q,
        answer: q.answer,
        shortA: q.shortA,
        source: q.source,
        category: q.category,
        rank: q.id,
      });
    });

    // Source 2: City FAQs (generated on the fly from cityProfiles)
    const generateCityFaqs = window.generateCityFaqs;
    if (generateCityFaqs) {
      Object.entries(cityProfiles).forEach(([slug, city]) => {
        const faqs = generateCityFaqs(city);
        faqs.forEach((f, i) => {
          items.push({
            type: 'city',
            id: `city-${slug}-${i}`,
            question: f.q,
            answer: f.a,
            citySlug: slug,
            cityName: city.name,
            country: city.country,
            source: city.name,
            category: null,
            rank: 100 + i,
          });
        });
      });
    }

    // Source 3: Neighborhood FAQs
    const generateNeighborhoodFaqs = window.generateNeighborhoodFaqs;
    if (generateNeighborhoodFaqs) {
      Object.entries(neighborhoodGuides).forEach(([slug, guide]) => {
        const faqs = generateNeighborhoodFaqs(guide);
        faqs.forEach((f, i) => {
          items.push({
            type: 'neighborhood',
            id: `nb-${slug}-${i}`,
            question: f.q,
            answer: f.a,
            nbSlug: slug,
            nbName: guide.name,
            cityName: guide.cityName,
            source: `${guide.cityName} · ${guide.name}`,
            category: null,
            rank: 200 + i,
          });
        });
      });
    }

    return items;
  }, []);

  // ---- Search results ----
  const searchResults = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const terms = q.split(/\s+/).filter(Boolean);
    const scored = searchIndex
      .map((item) => {
        let score = 0;
        const qLower = item.question.toLowerCase();
        const aLower = item.answer.toLowerCase();
        terms.forEach((t) => {
          // exact match in question → highest
          if (qLower.includes(t)) score += 10;
          // match at start of question → boost
          if (qLower.startsWith(t)) score += 5;
          // match in answer → lower
          if (aLower.includes(t)) score += 2;
          // match in source name → bonus
          if (item.source && item.source.toLowerCase().includes(t)) score += 3;
        });
        return { item, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 30);
    return scored;
  }, [searchQuery, searchIndex]);

  // ---- Filtered top 20 by category ----
  const filteredTop20 = React.useMemo(() => {
    if (activeCategory === 'all') return faqList;
    return faqList.filter((q) => q.category === activeCategory);
  }, [activeCategory, faqList]);

  // Group by category for display (in original order)
  const groupedTop20 = React.useMemo(() => {
    const groups = {};
    faqCats.forEach((c) => {
      groups[c.id] = filteredTop20.filter((q) => q.category === c.id);
    });
    return groups;
  }, [filteredTop20]);

  const toggleQ = (id) => {
    setOpenQ(openQ === id ? null : id);
  };

  const handleResultClick = (item) => {
    if (item.type === 'top20') {
      // Scroll to and expand this question
      setOpenQ(item.rank);
      setSearchQuery('');
      const el = document.getElementById(`faq-top20-${item.rank}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (item.type === 'city') {
      // Navigate to city page; FAQ section will render
      if (onCityClick) onCityClick(item.citySlug, item.cityName, item.country);
    } else if (item.type === 'neighborhood') {
      if (onNeighborhoodClick) onNeighborhoodClick(item.nbSlug);
    }
  };

  const getCategoryColor = (catId) => {
    const cat = faqCats.find((c) => c.id === catId);
    return cat ? cat.color : 'blue';
  };

  const getSourceBadge = (item) => {
    if (item.type === 'top20') return { label: 'Top 20', color: 'teal' };
    if (item.type === 'city') return { label: `City: ${item.cityName}`, color: 'blue' };
    if (item.type === 'neighborhood') return { label: `Neighborhood: ${item.nbName}`, color: 'orange' };
    return { label: 'FAQ', color: 'gray' };
  };

  const getHighlightedText = (text, query) => {
    const safeText = text || '';
    if (!query || !query.trim()) return { __html: safeText };
    const q = query.trim();
    const lowerText = safeText.toLowerCase();
    const idx = lowerText.indexOf(q.toLowerCase());
    if (idx === -1) {
      // Try each term
      const terms = q.split(/\s+/);
      let firstIdx = safeText.length;
      let matchedTerm = '';
      terms.forEach((t) => {
        const i = lowerText.indexOf(t.toLowerCase());
        if (i !== -1 && i < firstIdx) {
          firstIdx = i;
          matchedTerm = t;
        }
      });
      if (matchedTerm) {
        const start = Math.max(0, firstIdx - 40);
        const end = Math.min(safeText.length, firstIdx + matchedTerm.length + 60);
        const prefix = start > 0 ? '…' : '';
        const suffix = end < safeText.length ? '…' : '';
        const snippet = safeText.substring(start, end);
        return { __html: prefix + snippet.replace(new RegExp(matchedTerm, 'gi'), (m) => `<mark>${m}</mark>`) + suffix };
      }
      return { __html: safeText.substring(0, 120) + (safeText.length > 120 ? '…' : '') };
    }
    const start = Math.max(0, idx - 40);
    const end = Math.min(safeText.length, idx + q.length + 60);
    const prefix = start > 0 ? '…' : '';
    const suffix = end < safeText.length ? '…' : '';
    const snippet = safeText.substring(start, end);
    return { __html: prefix + snippet.replace(new RegExp(q, 'gi'), (m) => `<mark>${m}</mark>`) + suffix };
  };

  return (
    <div className="faqhub-page">
      {/* Hero / Search Section */}
      <section className="faqhub-hero">
        <div className="faqhub-hero-inner">
          <div className="faqhub-eyebrow">
            <span className="faqhub-eyebrow-dot"></span>
            Expat FAQ Hub
          </div>
          <h1 className="faqhub-title">Top 20 Questions American Expats Ask</h1>
          <p className="faqhub-subtitle">
            综合归纳自 r/expats、r/AmericanExpats、r/expatfinance、Facebook 侨民群与 Quora 的反复出现话题。定性排序，非精确统计。
          </p>

          {/* Search Box */}
          <div className="faqhub-search">
            <span className="faqhub-search-icon">
              <Icon name="search" size={20} />
            </span>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search all expat FAQs — cities, neighborhoods, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="faqhub-search-input"
            />
            {searchQuery && (
              <button
                className="faqhub-search-clear"
                onClick={() => { setSearchQuery(''); searchInputRef.current?.focus(); }}
                aria-label="Clear search"
              >
                <Icon name="x" size={16} />
              </button>
            )}
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="faqhub-search-results">
              <div className="faqhub-search-results-header">
                <span>
                  {searchResults.length > 0
                    ? `${searchResults.length} result${searchResults.length === 1 ? '' : 's'} found`
                    : 'No results found'}
                </span>
                <span className="faqhub-search-scope">
                  Searching Top 20 + {Object.keys(cityProfiles).length} cities +{' '}
                  {Object.keys(neighborhoodGuides).length} neighborhoods
                </span>
              </div>

              {searchResults.length === 0 ? (
                <div className="faqhub-empty">
                  <div className="faqhub-empty-icon">🔍</div>
                  <h4>No matching FAQs</h4>
                  <p>Try different keywords, or browse the categories below.</p>
                </div>
              ) : (
                <div className="faqhub-results-list">
                  {searchResults.map(({ item, score }) => {
                    const badge = getSourceBadge(item);
                    const qText = item.question || '';
                    const aText = item.answer || '';
                    return (
                      <div
                        key={item.id}
                        className="faqhub-result-item"
                        onClick={() => handleResultClick(item)}
                      >
                        <div className="faqhub-result-badge" data-color={badge.color}>
                          {badge.label}
                        </div>
                        <div className="faqhub-result-q"
                          dangerouslySetInnerHTML={getHighlightedText(qText, searchQuery)}
                        />
                        <div className="faqhub-result-snippet"
                          dangerouslySetInnerHTML={getHighlightedText(aText, searchQuery)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Category Tabs */}
      {!searchQuery && (
        <section className="faqhub-categories">
          <div className="faqhub-categories-inner">
            <button
              className={`faqhub-cat-pill ${activeCategory === 'all' ? 'active all' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Questions
            </button>
            {faqCats.map((cat) => (
              <button
                key={cat.id}
                className={`faqhub-cat-pill ${activeCategory === cat.id ? 'active' : ''} cat-${cat.color}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.shortLabel} · {cat.count}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Top 20 Questions List */}
      {!searchQuery && (
        <section className="faqhub-questions">
          <div className="faqhub-questions-inner">
            {faqCats.map((cat) => {
              const questions = groupedTop20[cat.id];
              if (questions.length === 0) return null;
              return (
                <div key={cat.id} className="faqhub-category-group">
                  <div className={`faqhub-category-bar cat-${cat.color}`}>
                    <span className="faqhub-cat-label">{cat.label}</span>
                    <span className="faqhub-cat-subtitle">{cat.subtitle}</span>
                  </div>
                  <div className="faqhub-questions-card">
                    {questions.map((q, idx) => (
                      <div
                        key={q.id}
                        id={`faq-top20-${q.id}`}
                        className={`faqhub-question-item ${openQ === q.id ? 'open' : ''}`}
                      >
                        <button
                          className="faqhub-q-btn"
                          onClick={() => toggleQ(q.id)}
                          aria-expanded={openQ === q.id}
                        >
                          <span className={`faqhub-q-badge cat-${cat.color}`}>
                            {q.id}
                          </span>
                          <span className="faqhub-q-text">
                            <span className="faqhub-q-en">{q.q}</span>
                            <span className="faqhub-q-zh">{q.shortA}</span>
                          </span>
                          <span className="faqhub-q-source">{q.source}</span>
                          <span className="faqhub-q-toggle">{openQ === q.id ? '−' : '+'}</span>
                        </button>
                        <div
                          className="faqhub-a-wrapper"
                          style={{ maxHeight: openQ === q.id ? '2000px' : '0' }}
                        >
                          <div className="faqhub-a-content">
                            {q.answer.split('\n\n').map((para, pi) => (
                              <p key={pi}>{para}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

// Export to window
Object.assign(window, {
  FAQHubPage,
});
