/* ============================================================
   ExpatGuide — Main App (Router & State)
   ============================================================ */

function App() {
  const [page, setPage] = React.useState('home'); // 'home' | 'article' | 'category' | 'ranking' | 'city' | 'neighborhood' | 'visa' | 'bank' | 'consultation' | 'cityFinder' | 'faqHub'
  const [showDiag, setShowDiag] = React.useState(false);
  const [errorCount, setErrorCount] = React.useState(0);

  // Global runtime error capture + diagnostics panel
  React.useEffect(() => {
    const handleError = (event) => {
      console.error('[RUNTIME ERROR]', event.error || event.message, event.filename, event.lineno, event.colno);
      if (!window.__runtimeErrors) window.__runtimeErrors = [];
      window.__runtimeErrors.push({
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        col: event.colno,
        stack: event.error && event.error.stack ? event.error.stack : null,
        time: new Date().toISOString(),
      });
      setErrorCount((c) => c + 1);
    };
    const handleRejection = (event) => {
      console.error('[UNHANDLED REJECTION]', event.reason);
      if (!window.__runtimeErrors) window.__runtimeErrors = [];
      window.__runtimeErrors.push({
        message: 'Unhandled Promise Rejection: ' + (event.reason && event.reason.message ? event.reason.message : String(event.reason)),
        stack: event.reason && event.reason.stack ? event.reason.stack : null,
        time: new Date().toISOString(),
      });
      setErrorCount((c) => c + 1);
    };
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);
    // Keyboard shortcut: Ctrl+Shift+D toggles diagnostics
    const handleKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setShowDiag((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);
  const [neighborhoodSlug, setNeighborhoodSlug] = React.useState('');
  const [articleSlug, setArticleSlug] = React.useState(articles[0].slug);
  const [categorySlug, setCategorySlug] = React.useState(categories[0].slug);
  const [citySlug, setCitySlug] = React.useState('');
  const [cityName, setCityName] = React.useState('');
  const [cityCountryName, setCityCountryName] = React.useState('');
  const [visaCountrySlug, setVisaCountrySlug] = React.useState('');
  const [bankCountrySlug, setBankCountrySlug] = React.useState('');
  const [bankAccountSlug, setBankAccountSlug] = React.useState('');

  const handleNavigate = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (slug) => {
    setCategorySlug(slug);
    setPage('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleClick = (slug) => {
    setArticleSlug(slug);
    setPage('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRankingClick = () => {
    setPage('ranking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFaqHubClick = () => {
    setPage('faqHub');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCityClick = (slug, name, countryName) => {
    setCitySlug(slug);
    setCityName(name);
    setCityCountryName(countryName);
    setPage('city');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVisaClick = (slug) => {
    setVisaCountrySlug(slug);
    setPage('visa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBankClick = (slug) => {
    setBankCountrySlug(slug);
    setPage('bank');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBankAccountClick = (bankSlug) => {
    setBankAccountSlug(bankSlug);
    setPage('bankAccount');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNeighborhoodClick = (slug) => {
    setNeighborhoodSlug(slug);
    setPage('neighborhood');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar
        currentPage={page}
        currentCategory={categorySlug}
        onNavigate={handleNavigate}
        onCategoryClick={handleCategoryClick}
        onFaqHubClick={handleFaqHubClick}
      />

      <main>
        {page === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onCategoryClick={handleCategoryClick}
            onArticleClick={handleArticleClick}
            onRankingClick={handleRankingClick}
            onCityClick={handleCityClick}
          />
        )}
        {page === 'article' && (
          <ArticlePage
            articleSlug={articleSlug}
            onNavigate={handleNavigate}
            onCategoryClick={handleCategoryClick}
            onArticleClick={handleArticleClick}
          />
        )}
        {page === 'category' && (
          <CategoryPage
            categorySlug={categorySlug}
            onNavigate={handleNavigate}
            onCategoryClick={handleCategoryClick}
            onArticleClick={handleArticleClick}
          />
        )}
        {page === 'ranking' && (
          <RankingPage
            onNavigate={handleNavigate}
            onCategoryClick={handleCategoryClick}
            onArticleClick={handleArticleClick}
            onCityClick={handleCityClick}
            onVisaClick={handleVisaClick}
            onBankClick={handleBankClick}
          />
        )}
        {page === 'city' && (
          <CityCommunityPage
            citySlug={citySlug}
            cityName={cityName}
            countryName={cityCountryName}
            onNavigate={handleNavigate}
            onCategoryClick={handleCategoryClick}
            onArticleClick={handleArticleClick}
            onNeighborhoodClick={handleNeighborhoodClick}
            onCityClick={handleCityClick}
          />
        )}
        {page === 'neighborhood' && (
          <NeighborhoodPage
            neighborhoodSlug={neighborhoodSlug}
            onNavigate={handleNavigate}
            onCategoryClick={handleCategoryClick}
            onArticleClick={handleArticleClick}
            onCityClick={handleCityClick}
            onNeighborhoodClick={handleNeighborhoodClick}
          />
        )}
        {page === 'visa' && (
          <VisaImmigrationPage
            countrySlug={visaCountrySlug}
            onNavigate={handleNavigate}
            onRankingClick={handleRankingClick}
          />
        )}
        {page === 'bank' && (
          <BankMoneyTaxPage
            countrySlug={bankCountrySlug}
            onNavigate={handleNavigate}
            onRankingClick={handleRankingClick}
            onBankAccountClick={handleBankAccountClick}
          />
        )}
        {page === 'bankAccount' && (
          <BankAccountGuidePage
            bankSlug={bankAccountSlug}
            onNavigate={handleNavigate}
            onBankClick={handleBankClick}
            onRankingClick={handleRankingClick}
          />
        )}
        {page === 'consultation' && (
          <ConsultationPage
            onNavigate={handleNavigate}
          />
        )}
        {page === 'cityFinder' && (
          <CityFinderQuizPage
            onNavigate={handleNavigate}
            onCityClick={handleCityClick}
          />
        )}
        {page === 'faqHub' && (
          <FAQHubPage
            onNavigate={handleNavigate}
            onCityClick={handleCityClick}
            onNeighborhoodClick={handleNeighborhoodClick}
          />
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onCategoryClick={handleCategoryClick}
      />

      {/* Runtime diagnostics floating panel (Ctrl+Shift+D to toggle) */}
      {errorCount > 0 && !showDiag && (
        <div
          onClick={() => setShowDiag(true)}
          style={{
            position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999,
            background: '#dc2626', color: 'white', borderRadius: '999px',
            width: '40px', height: '40px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '14px', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          }}
          title={`${errorCount} error(s) — click to view`}
        >
          {errorCount}
        </div>
      )}
      {showDiag && (
        <div style={{
          position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999,
          width: '420px', maxWidth: 'calc(100vw - 40px)', maxHeight: '60vh',
          background: '#0f172a', color: '#e2e8f0', borderRadius: '12px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
          fontFamily: 'ui-monospace, Menlo, monospace', fontSize: '12px',
          overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            padding: '10px 14px', background: '#1e293b',
            display: 'flex', alignItems: 'center', gap: '8px',
            borderBottom: '1px solid #334155',
          }}>
            <span style={{ fontWeight: 600, color: '#f87171' }}>⚠ Runtime Errors</span>
            <span style={{ marginLeft: 'auto', opacity: 0.6, fontSize: '11px' }}>
              Ctrl+Shift+D to toggle
            </span>
            <button
              onClick={() => setShowDiag(false)}
              style={{
                background: 'transparent', border: 'none', color: '#94a3b8',
                cursor: 'pointer', fontSize: '16px', padding: '0 4px',
              }}
            >
              ×
            </button>
          </div>
          <div style={{ padding: '10px 14px', overflowY: 'auto', flex: 1 }}>
            {window.__runtimeErrors && window.__runtimeErrors.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{ color: '#f87171', fontWeight: 600, marginBottom: '6px' }}>
                  Window errors ({window.__runtimeErrors.length})
                </div>
                {window.__runtimeErrors.map((e, i) => (
                  <div key={`re-${i}`} style={{
                    padding: '6px 8px', marginBottom: '4px',
                    background: '#1e293b', borderRadius: '6px',
                    borderLeft: '3px solid #ef4444',
                  }}>
                    <div>{e.message}</div>
                    {e.filename && (
                      <div style={{ opacity: 0.6, fontSize: '11px', marginTop: '2px' }}>
                        @ {e.filename}:{e.line}:{e.col}
                      </div>
                    )}
                    {e.stack && (
                      <pre style={{
                        margin: '4px 0 0', whiteSpace: 'pre-wrap',
                        fontSize: '10px', opacity: 0.7, maxHeight: '80px',
                        overflow: 'auto',
                      }}>{e.stack}</pre>
                    )}
                  </div>
                ))}
              </div>
            )}
            {window.__renderErrors && window.__renderErrors.length > 0 && (
              <div>
                <div style={{ color: '#fbbf24', fontWeight: 600, marginBottom: '6px' }}>
                  Render errors (ErrorBoundary) ({window.__renderErrors.length})
                </div>
                {window.__renderErrors.map((e, i) => (
                  <div key={`rbe-${i}`} style={{
                    padding: '6px 8px', marginBottom: '4px',
                    background: '#1e293b', borderRadius: '6px',
                    borderLeft: '3px solid #f59e0b',
                  }}>
                    <div style={{ color: '#fbbf24' }}>{e.label}</div>
                    <div>{e.error}</div>
                    {e.componentStack && (
                      <pre style={{
                        margin: '4px 0 0', whiteSpace: 'pre-wrap',
                        fontSize: '10px', opacity: 0.7, maxHeight: '100px',
                        overflow: 'auto',
                      }}>{e.componentStack}</pre>
                    )}
                  </div>
                ))}
              </div>
            )}
            {(!window.__runtimeErrors || window.__runtimeErrors.length === 0) &&
             (!window.__renderErrors || window.__renderErrors.length === 0) && (
              <div style={{ color: '#4ade80' }}>No errors captured yet.</div>
            )}
            <div style={{
              marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #334155',
              opacity: 0.6, fontSize: '11px',
            }}>
              Type in console:
              <br />• <code>window.__runtimeErrors</code> — window errors
              <br />• <code>window.__renderErrors</code> — React render errors
              <br />• <code>Object.keys(rankedCountries)</code> — countries array
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
