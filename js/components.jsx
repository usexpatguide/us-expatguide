/* ============================================================
   ExpatGuide — Shared Components
   ============================================================ */

// ---- Icon helper ----
function Icon({ name, size = 18, style = {} }) {
  const svg = Icons[name] || Icons.info;
  return (
    <span
      className="icon"
      style={{ width: size, height: size, display: 'inline-flex', ...style }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

// ---- Flag Badge (circular flag image with emoji fallback) ----
function FlagBadge({ flagEmoji, size = 24, alt = '', className = '' }) {
  const [imgError, setImgError] = React.useState(false);
  // Derive ISO code from flag emoji: each regional indicator letter is U+1F1E6..U+1F1FF
  // Subtract 0x1F1A5 to get A-Z ASCII code point
  const isoCode = React.useMemo(() => {
    if (!flagEmoji) return '';
    try {
      const cps = Array.from(flagEmoji).map(ch => ch.codePointAt(0));
      if (cps.length === 2 && cps[0] >= 0x1F1E6 && cps[0] <= 0x1F1FF && cps[1] >= 0x1F1E6 && cps[1] <= 0x1F1FF) {
        return String.fromCodePoint(cps[0] - 0x1F1A5, cps[1] - 0x1F1A5).toLowerCase();
      }
    } catch (e) { /* ignore */ }
    return '';
  }, [flagEmoji]);

  const flagUrl = isoCode ? `https://flagcdn.com/w80/${isoCode}.png` : '';

  if (!flagUrl || imgError) {
    return (
      <span
        className={`flag-badge flag-badge-emoji ${className}`}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--ink-100)',
          border: '1.5px solid white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          flexShrink: 0,
          fontSize: size * 0.6,
          lineHeight: 1,
        }}
        title={alt}
      >
        {flagEmoji}
      </span>
    );
  }

  return (
    <img
      className={`flag-badge ${className}`}
      src={flagUrl}
      alt={alt}
      onError={() => setImgError(true)}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
        border: '1.5px solid white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        flexShrink: 0,
        display: 'inline-block',
      }}
    />
  );
}

// ---- Gradient Image (placeholder with pattern) ----
function GradientImage({ index, alt = '', overlay = false }) {
  const pair = imagePairs[index % imagePairs.length];
  const id = `grad-${index}-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
      role="img"
      aria-label={alt}
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={pair[0]} stopOpacity="0.85" />
          <stop offset="100%" stopColor={pair[1]} stopOpacity="0.85" />
        </linearGradient>
        <pattern id={`dots-${id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="white" fillOpacity="0.08" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill={`url(#${id})`} />
      <rect width="800" height="500" fill={`url(#dots-${id})`} />
      {overlay && (
        <rect width="800" height="500" fill="rgba(26, 46, 53, 0.15)" />
      )}
    </svg>
  );
}

// ---- ErrorBoundary: isolate rendering failures per subtree ----
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to console for debugging
    console.error('[ErrorBoundary] caught error in:', this.props.label || 'unknown', error, errorInfo);
    this.setState({ errorInfo });
    // Also expose on window for runtime inspection
    if (!window.__renderErrors) window.__renderErrors = [];
    window.__renderErrors.push({
      label: this.props.label || 'unknown',
      error: error && error.message ? error.message : String(error),
      stack: error && error.stack ? error.stack : null,
      componentStack: errorInfo && errorInfo.componentStack ? errorInfo.componentStack : null,
      time: new Date().toISOString(),
    });
  }

  render() {
    if (this.state.hasError) {
      const { fallback, label } = this.props;
      if (fallback) return fallback;
      return (
        <div
          className="error-boundary-fallback"
          style={{
            padding: '16px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            color: '#991b1b',
            fontSize: '13px',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>
            {label ? `${label} — ` : ''}Unable to load
          </div>
          <div style={{ opacity: 0.8, fontSize: '12px' }}>
            {this.state.error && this.state.error.message ? this.state.error.message : 'Something went wrong while rendering this section.'}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ---- Country hero image with optional hover-to-play video ----
function CountryHeroMedia({ country, imageUrl, imageIndex, videoUrl, alt, imgClassName = 'ranking-flag-img' }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [videoReady, setVideoReady] = React.useState(false);
  const [videoFailed, setVideoFailed] = React.useState(false);
  const videoRef = React.useRef(null);

  const hasVideo = !!videoUrl && !videoFailed;

  const startPlay = () => {
    if (!hasVideo) return;
    setIsPlaying(true);
    const v = videoRef.current;
    if (v) {
      const p = v.play();
      if (p && p.catch) p.catch(() => { setIsPlaying(false); });
    }
  };

  const stopPlay = () => {
    setIsPlaying(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  const handleTouch = (e) => {
    if (!hasVideo) return;
    // Only intercept tap on the image area, not card click
    if (e.target.closest('a,button')) return;
    e.preventDefault();
    if (isPlaying) {
      stopPlay();
    } else {
      startPlay();
    }
  };

  const handleVideoError = () => {
    setVideoFailed(true);
    setIsPlaying(false);
  };

  return (
    <div
      className="country-hero-media"
      onMouseEnter={startPlay}
      onMouseLeave={stopPlay}
      onClick={handleTouch}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={alt}
          className={imgClassName}
          loading="lazy"
          style={{ opacity: isPlaying && videoReady ? 0 : 1, transition: 'opacity 0.3s ease' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      ) : (
        <GradientImage index={imageIndex} alt={alt} />
      )}
      {hasVideo && (
        <video
          ref={videoRef}
          src={videoUrl}
          className={`${imgClassName} country-hero-video`}
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onError={handleVideoError}
          style={{ opacity: isPlaying && videoReady ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

// ---- Navigation ----
function Navbar({ currentPage, currentCategory, onNavigate, onCategoryClick, onFaqHubClick }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a
          className="nav-logo"
          onClick={() => onNavigate('home')}
        >
          <img
            src="https://aka.doubaocdn.com/s/PcRIKOQp9Q"
            alt="ExpatGuide"
            className="nav-logo-img"
          />
        </a>

        <button
          className={`nav-ranking-link ${currentPage === 'ranking' ? 'active' : ''}`}
          onClick={() => onNavigate('ranking')}
        >
          Ranking
        </button>

        <div className="nav-categories">
          {categories.slice(0, 6).map((cat) => (
            <button
              key={cat.slug}
              className={`nav-cat ${currentCategory === cat.slug && currentPage === 'category' ? 'active' : ''}`}
              onClick={() => onCategoryClick(cat.slug)}
            >
              {cat.shortName}
            </button>
          ))}
        </div>

        <button
          className={`nav-quiz-link ${currentPage === 'cityFinder' ? 'active' : ''}`}
          onClick={() => onNavigate('cityFinder')}
        >
          City Finder
        </button>

        <button
          className={`nav-consult-link ${currentPage === 'consultation' ? 'active' : ''}`}
          onClick={() => onNavigate('consultation')}
        >
          Consultation
        </button>

        <button
          className={`nav-faq-link ${currentPage === 'faqHub' ? 'active' : ''}`}
          onClick={() => onFaqHubClick && onFaqHubClick()}
        >
          FAQ Hub
        </button>

        <div className="nav-search">
          <span className="nav-search-icon">
            <Icon name="search" size={16} />
          </span>
          <input
            type="text"
            placeholder="Search guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="nav-actions">
          <button className="btn btn-ghost">Sign in</button>
          <button className="btn btn-primary">Join Free</button>
        </div>

        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <Icon name="menu" size={22} />
        </button>
      </div>
    </nav>
  );
}

// ---- Hero ----
function Hero({ onSearch, onTagClick }) {
  const [query, setQuery] = React.useState('');
  const popularSearches = ['Digital nomad visa', 'Renting in Lisbon', 'Health insurance', 'Bank account', 'International schools'];

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-eyebrow">
          <Icon name="mapPin" size={14} />
          Trusted by 250,000+ expats worldwide
        </div>
        <h1>
          Everything you need to <em>start your new life</em> abroad
        </h1>
        <p className="hero-subtitle">
          Practical, up-to-date guides on visas, housing, healthcare, taxes, and daily living — written by expats who have been there.
        </p>

        <div className="hero-search">
          <span className="hero-search-icon">
            <Icon name="search" size={20} />
          </span>
          <input
            type="text"
            placeholder="Search for guides, destinations, or topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch?.(query)}
          />
          <button className="btn btn-primary hero-search-btn" onClick={() => onSearch?.(query)}>
            Search
          </button>
        </div>

        <div className="hero-tags">
          <span style={{ fontSize: '0.82rem', color: 'var(--ink-500)', marginRight: '4px' }}>Popular:</span>
          {popularSearches.map((tag) => (
            <span key={tag} className="hero-tag" onClick={() => onTagClick?.(tag)}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Category Card ----
function CategoryCard({ category, onClick }) {
  return (
    <div className="category-card" onClick={() => onClick?.(category.slug)}>
      <div className="category-icon">
        <Icon name={category.icon} size={24} />
      </div>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
      <ul className="category-links">
        {category.popular.slice(0, 3).map((a) => (
          <li key={a.slug}>
            <a onClick={(e) => { e.stopPropagation(); }}>
              <Icon name="arrowRight" size={12} style={{ marginRight: '6px', color: 'var(--teal-400)' }} />
              {a.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---- Article Card ----
function ArticleCard({ article, onClick }) {
  const author = authors[article.author];
  const cat = categories.find((c) => c.slug === article.category);

  return (
    <article className="article-card" onClick={() => onClick?.(article.slug)}>
      <div className="article-card-image">
        <span className="article-card-badge">{cat?.shortName || article.category}</span>
        <GradientImage index={article.imageIndex} alt={article.title} />
      </div>
      <div className="article-card-body">
        <div className="article-card-meta">
          <span><Icon name="calendar" size={13} style={{ marginRight: '4px', verticalAlign: '-1px' }} />{article.date}</span>
          <span className="dot"></span>
          <span><Icon name="clock" size={13} style={{ marginRight: '4px', verticalAlign: '-1px' }} />{article.readTime}</span>
        </div>
        <h3>{article.title}</h3>
        <p className="article-card-excerpt">{article.excerpt}</p>
        <div className="article-card-footer">
          <div className="article-author-avatar">{author.initials}</div>
          <div className="article-author-info">
            <div className="article-author-name">{author.name}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ---- Destination Card ----
function DestinationCard({ dest }) {
  return (
    <div className="destination-card">
      <div className="destination-card-image">
        <GradientImage index={dest.imageIndex} alt={dest.name} />
      </div>
      <div className="destination-card-body">
        <h4>{dest.name}</h4>
        <div className="destination-card-country">
          <Icon name="mapPin" size={12} style={{ marginRight: '3px', verticalAlign: '-1px' }} />
          {dest.country}
        </div>
      </div>
    </div>
  );
}

// ---- Newsletter CTA ----
function NewsletterCTA() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <section className="newsletter-section">
      <div className="newsletter-inner">
        <div className="newsletter-icon">
          <Icon name="mail" size={28} />
        </div>
        <h2>Get expat tips in your inbox every week</h2>
        <p>
          Join 250,000+ readers getting practical advice, country guides, and insider tips — curated by people who have made the move themselves.
        </p>
        {submitted ? (
          <div style={{ padding: '16px 24px', background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-lg)', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <Icon name="checkCircle" size={20} />
            Thanks! Check your inbox to confirm.
          </div>
        ) : (
          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubmitted(true);
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn">Subscribe</button>
          </form>
        )}
        <p className="newsletter-note">No spam. Unsubscribe anytime. Read our privacy policy.</p>
      </div>
    </section>
  );
}

// ---- Footer ----
function Footer({ onNavigate, onCategoryClick }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="nav-logo-mark">
                <Icon name="compass" size={18} style={{ color: 'white' }} />
              </span>
              ExpatGuide
            </div>
            <p>Practical, trustworthy guides for anyone starting a new life abroad. Written by expats, for expats, since 2018.</p>
            <div className="footer-social">
              <a aria-label="Facebook"><Icon name="facebook" size={16} /></a>
              <a aria-label="Twitter"><Icon name="twitter" size={16} /></a>
              <a aria-label="LinkedIn"><Icon name="linkedin" size={16} /></a>
              <a aria-label="Instagram"><Icon name="instagram" size={16} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h5>Categories</h5>
            <ul>
              {categories.slice(0, 4).map((c) => (
                <li key={c.slug}>
                  <a onClick={() => onCategoryClick(c.slug)}>{c.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h5>More Topics</h5>
            <ul>
              {categories.slice(4, 8).map((c) => (
                <li key={c.slug}>
                  <a onClick={() => onCategoryClick(c.slug)}>{c.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h5>Destinations</h5>
            <ul>
              {destinations.slice(0, 6).map((d) => (
                <li key={d.name}><a>{d.name}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a>About Us</a></li>
              <li><a>Our Team</a></li>
              <li><a>Write for Us</a></li>
              <li><a>Advertise</a></li>
              <li><a>Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2025 ExpatGuide. All rights reserved.</div>
          <div className="footer-bottom-links">
            <a>Privacy Policy</a>
            <a>Terms of Service</a>
            <a>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---- Breadcrumb ----
function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="separator">/</span>}
          {i === items.length - 1 ? (
            <span className="current">{item.label}</span>
          ) : (
            <a onClick={item.onClick}>{item.label}</a>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// ---- TOC (Table of Contents) ----
function TableOfContents({ headings, activeId }) {
  return (
    <div className="toc">
      <div className="toc-title">On this page</div>
      <ul className="toc-list">
        {headings.map((h, i) => (
          <li key={i} className={`toc-${h.level}`}>
            <a
              href={`#${h.id}`}
              className={activeId === h.id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(h.id);
                if (el) {
                  window.scrollTo({
                    top: el.offsetTop - 80,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---- Article Body Renderer ----
function ArticleBody({ content }) {
  return (
    <div className="article-body">
      {content.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return <h2 key={i} id={`section-${i}`}>{block.text}</h2>;
          case 'h3':
            return <h3 key={i} id={`section-${i}`}>{block.text}</h3>;
          case 'p':
            return <p key={i}>{block.text}</p>;
          case 'ul':
            return (
              <ul key={i}>
                {block.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i}>
                {block.items.map((item, j) => <li key={j}>{item}</li>)}
              </ol>
            );
          case 'blockquote':
            return <blockquote key={i}>{block.text}</blockquote>;
          case 'tip':
            return (
              <div key={i} className="tip-box">
                <div className="tip-box-title">
                  <Icon name="info" size={16} />
                  {block.title}
                </div>
                <p>{block.text}</p>
              </div>
            );
          case 'warning':
            return (
              <div key={i} className="warning-box">
                <div className="warning-box-title">
                  <Icon name="alert" size={16} />
                  {block.title}
                </div>
                <p>{block.text}</p>
              </div>
            );
          case 'table':
            return (
              <table key={i} className="article-table">
                <thead>
                  <tr>
                    {block.headers.map((h, j) => <th key={j}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, j) => (
                    <tr key={j}>
                      {row.map((cell, k) => <td key={k}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

// ---- Sidebar widgets ----
function SidebarCategoryList({ onCategoryClick, currentSlug }) {
  return (
    <div className="sidebar-widget">
      <h4>Categories</h4>
      <ul>
        {categories.map((c) => (
          <li key={c.slug}>
            <a
              onClick={() => onCategoryClick(c.slug)}
              style={currentSlug === c.slug ? { color: 'var(--teal-600)', fontWeight: '600' } : {}}
            >
              <Icon name={c.icon} size={14} />
              {c.name}
              <span className="count">{c.articles}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SidebarPopular({ articles: artList, onArticleClick }) {
  return (
    <div className="sidebar-widget">
      <h4>Most Read</h4>
      <ul>
        {artList.slice(0, 5).map((a) => (
          <li key={a.slug}>
            <a onClick={() => onArticleClick(a.slug)} style={{ gap: 'var(--space-3)' }}>
              <Icon name="star" size={14} style={{ color: 'var(--accent-orange)', flexShrink: 0 }} />
              <span style={{ flex: 1, lineHeight: 1.4 }}>{a.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---- FAQ Section (Accordion) ----
function FAQSection({ faqs, title = 'Frequently Asked Questions', subtitle }) {
  const [openIndex, setOpenIndex] = React.useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="faq-section">
      <div className="faq-section-header">
        <h2 className="faq-section-title">{title}</h2>
        {subtitle && <p className="faq-section-subtitle">{subtitle}</p>}
      </div>
      <div className="faq-list">
        {faqs.map((item, i) => (
          <div
            key={i}
            className={`faq-item ${openIndex === i ? 'faq-item-open' : ''}`}
          >
            <button
              className="faq-question"
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
            >
              <span className="faq-question-text">{item.q}</span>
              <span className="faq-icon" aria-hidden="true">
                {openIndex === i ? '−' : '+'}
              </span>
            </button>
            <div
              className="faq-answer-wrapper"
              style={{
                maxHeight: openIndex === i ? '800px' : '0',
              }}
            >
              <div className="faq-answer">
                {item.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Export to window
Object.assign(window, {
  Icon,
  GradientImage,
  CountryHeroMedia,
  Navbar,
  Hero,
  CategoryCard,
  ArticleCard,
  DestinationCard,
  NewsletterCTA,
  Footer,
  Breadcrumb,
  TableOfContents,
  ArticleBody,
  SidebarCategoryList,
  SidebarPopular,
  FlagBadge,
  ErrorBoundary,
  FAQSection,
});
