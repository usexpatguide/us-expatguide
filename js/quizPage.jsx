/*
    City Finder Quiz Page
    ============================================================ */

// Questions definition
const QUIZ_QUESTIONS = [
  {
    id: 'lifestyle',
    title: 'What best describes your move?',
    subtitle: 'This helps us weight what matters most to you',
    options: [
      { value: 'retired', label: 'Retired', desc: 'Slow pace, healthcare, community' },
      { value: 'family', label: 'Raising a family', desc: 'Schools, safety, space' },
      { value: 'career', label: 'Overseas career', desc: 'Jobs, infrastructure, networking' },
      { value: 'nomad', label: 'Digital nomad', desc: 'Internet, visas, co-working' },
      { value: 'student', label: 'Student', desc: 'Universities, nightlife, budget' },
      { value: 'business', label: 'Business & investing', desc: 'Banking, economy, stability' },
      { value: 'heritage', label: 'Heritage & lifestyle', desc: 'Culture, language, authenticity' },
    ],
  },
  {
    id: 'budget',
    title: 'What\'s your monthly budget?',
    subtitle: 'In USD — including rent',
    options: [
      { value: 'under1500', label: 'Under $1,500', desc: 'Frugal, value-focused' },
      { value: 'mid1500', label: '$1,500 – $3,000', desc: 'Comfortable middle ground' },
      { value: 'mid3000', label: '$3,000 – $5,000', desc: 'Upscale, plenty of options' },
      { value: 'over5000', label: '$5,000+', desc: 'Luxury, top-tier amenities' },
    ],
  },
  {
    id: 'income',
    title: 'How do you earn (or plan to earn)?',
    subtitle: 'This shapes visa and job-market recommendations',
    options: [
      { value: 'remote', label: 'Remote job', desc: 'Working online for a foreign employer' },
      { value: 'local', label: 'Local job', desc: 'Working for a local company' },
      { value: 'business', label: 'Own business', desc: 'Entrepreneur / self-employed' },
      { value: 'pension', label: 'Pension', desc: 'Retirement income / savings' },
      { value: 'none', label: 'Not working yet', desc: 'Still figuring it out' },
    ],
  },
  {
    id: 'kids',
    title: 'Do you have school-age kids?',
    subtitle: 'Affects how we weigh schools and safety',
    skipIf: (answers) => answers.lifestyle === 'nomad' || answers.lifestyle === 'student',
    options: [
      { value: 'international', label: 'Yes, need international school', desc: 'English-medium, IB or US curriculum' },
      { value: 'local', label: 'Yes, local school OK', desc: 'Open to local language schools' },
      { value: 'no', label: 'No', desc: 'No school-age children' },
    ],
  },
  {
    id: 'vibe',
    title: 'What climate & vibe do you prefer?',
    subtitle: 'Pick the one that sounds most like home',
    options: [
      { value: 'beach', label: 'Beach / coast', desc: 'Warm, ocean, laid-back' },
      { value: 'highlands', label: 'Highlands & mountains', desc: 'Cooler, colonial towns, nature' },
      { value: 'bigcity', label: 'Big city energy', desc: 'Fast-paced, culture, career' },
      { value: 'quiet', label: 'Quiet town', desc: 'Slow, small, community-focused' },
    ],
  },
  {
    id: 'healthcare',
    title: 'How important is healthcare to you?',
    subtitle: 'Quality of hospitals and doctors',
    options: [
      { value: 'top', label: 'Top-tier care', desc: 'World-class hospitals are a must' },
      { value: 'good', label: 'Good enough', desc: 'Solid standard care is fine' },
      { value: 'none', label: 'Not a factor', desc: 'Young, healthy, rarely need care' },
    ],
  },
  {
    id: 'language',
    title: 'How comfortable are you with Spanish?',
    subtitle: 'Honest answer = better matches',
    options: [
      { value: 'englishOnly', label: 'English-only', desc: 'I need English to get by' },
      { value: 'learning', label: 'Learning the language', desc: 'I speak basics and want to improve' },
      { value: 'fluent', label: 'Already fluent', desc: 'I speak Spanish well or fluently' },
    ],
  },
];

function CityFinderQuizPage({ onNavigate, onCityClick }) {
  const [step, setStep] = React.useState(0); // 0..n-1 = questions, n = results
  const [answers, setAnswers] = React.useState({});
  const [results, setResults] = React.useState(null);
  const [entering, setEntering] = React.useState(true);

  // Filter out skipped questions (Q4 kids for nomad/student)
  const visibleQuestions = QUIZ_QUESTIONS.filter(q => !q.skipIf || !q.skipIf(answers));
  const totalQuestions = visibleQuestions.length;
  const currentQuestion = visibleQuestions[step];
  const isLast = step === totalQuestions - 1;
  const isResults = step >= totalQuestions;

  // Get answer for current question
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : null;

  const selectAnswer = (value) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const goNext = () => {
    if (isLast) {
      // Compute results
      const matched = runQuizMatch(answers);
      setResults(matched);
      setStep(totalQuestions);
    } else {
      setEntering(false);
      setTimeout(() => {
        setStep(s => s + 1);
        setEntering(true);
      }, 120);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setEntering(false);
      setTimeout(() => {
        setStep(s => s - 1);
        setEntering(true);
      }, 120);
    }
  };

  const retakeQuiz = () => {
    setAnswers({});
    setResults(null);
    setStep(0);
  };

  const handleCityClick = (city) => {
    if (city.hasFullPage && onCityClick) {
      onCityClick(city.slug, city.name, city.country);
    }
  };

  const handleConsultation = () => {
    onNavigate('consultation');
  };

  return (
    <div className="cq-page">
      {!isResults ? (
        // ===== Quiz flow =====
        <div className="cq-hero">
          <div className="cq-hero-inner">
            <div className="cq-eyebrow">
              <Icon name="compass" size={14} />
              City Finder Quiz
            </div>
            <h1 className="cq-title">Find your best city in Mexico</h1>
            <p className="cq-subtitle">
              Answer a few quick questions and we'll match you with the top 3 cities that fit your lifestyle, budget, and priorities.
            </p>
          </div>
        </div>
      ) : null}

      <div className="cq-body">
        <div className="cq-card-wrap">
          {!isResults ? (
            <div className={`cq-quiz-card ${entering ? 'cq-slide-in' : 'cq-slide-out'}`} key={currentQuestion?.id}>
              {/* Progress */}
              <div className="cq-progress-bar">
                <div
                  className="cq-progress-fill"
                  style={{ width: `${((step + 1) / totalQuestions) * 100}%` }}
                />
              </div>
              <div className="cq-progress-text">
                Question {step + 1} of {totalQuestions}
              </div>

              {/* Question */}
              <div className="cq-question">
                <h2 className="cq-question-title">{currentQuestion.title}</h2>
                {currentQuestion.subtitle && (
                  <p className="cq-question-subtitle">{currentQuestion.subtitle}</p>
                )}
              </div>

              {/* Options */}
              <div className={`cq-options cq-options-${currentQuestion.options.length}`}>
                {currentQuestion.options.map((opt) => {
                  const selected = currentAnswer === opt.value;
                  return (
                    <button
                      key={opt.value}
                      className={`cq-option ${selected ? 'cq-option-selected' : ''}`}
                      onClick={() => selectAnswer(opt.value)}
                    >
                      <div className="cq-option-check">
                        {selected && <Icon name="check" size={14} />}
                      </div>
                      <div className="cq-option-content">
                        <div className="cq-option-label">{opt.label}</div>
                        {opt.desc && <div className="cq-option-desc">{opt.desc}</div>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Nav buttons */}
              <div className="cq-nav">
                <button
                  className="btn btn-ghost cq-back-btn"
                  onClick={goBack}
                  disabled={step === 0}
                >
                  <Icon name="chevronRight" size={14} style={{ transform: 'rotate(180deg)' }} />
                  Back
                </button>
                <button
                  className="btn btn-primary cq-next-btn"
                  onClick={goNext}
                  disabled={!currentAnswer}
                >
                  {isLast ? 'See My Matches' : 'Next question'}
                  <Icon name="arrowRight" size={14} />
                </button>
              </div>
            </div>
          ) : (
            // ===== Results =====
            <div className="cq-results">
              <div className="cq-results-header">
                <div className="cq-eyebrow cq-eyebrow-accent">
                  <Icon name="sparkles" size={14} />
                  Your Top Matches
                </div>
                <h2 className="cq-results-title">Here are your best fits</h2>
                <p className="cq-results-subtitle">
                  We scored 12 Mexican cities based on your priorities. Here are the top 3.
                </p>
              </div>

              {results && results[0]?.score < 50 && (
                <div className="cq-tip-banner">
                  <Icon name="info" size={16} />
                  <span>
                    No standout matches yet. Consider <strong>relaxing your budget</strong>, being more <strong>open to language learning</strong>, or
                    broadening your vibe preferences for better options.
                  </span>
                </div>
              )}

              <div className="cq-results-cards">
                {results && results.slice(0, 3).map((result, idx) => (
                  <div key={result.city.slug} className={`cq-result-card cq-rank-${idx + 1}`}>
                    <div className="cq-result-rank">
                      <span className="cq-rank-num">#{idx + 1}</span>
                      <span className="cq-rank-label">Best match</span>
                    </div>

                    <div className="cq-result-head">
                      <h3 className="cq-result-city">{result.city.name}</h3>
                      <div className="cq-result-tagline">{result.city.tagline}</div>
                    </div>

                    <div className="cq-result-score">
                      <div className="cq-score-circle">
                        <div className="cq-score-num">{result.score}</div>
                        <div className="cq-score-pct">%</div>
                      </div>
                      <div className="cq-score-label">Match score</div>
                    </div>

                    <div className="cq-result-reasons">
                      <div className="cq-reasons-title">Why it's a match</div>
                      <ul className="cq-reasons-list">
                        {result.topDims.map((dim, i) => (
                          <li key={dim}>
                            <span className="cq-reason-check"><Icon name="check" size={12} /></span>
                            {quizDimensionLabels[dim] || dim}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="cq-result-ctas">
                      {result.city.hasFullPage ? (
                        <button
                          className="btn btn-primary cq-cta-main"
                          onClick={() => handleCityClick(result.city)}
                        >
                          View City Guide
                          <Icon name="arrowRight" size={14} />
                        </button>
                      ) : (
                        <button className="btn btn-primary cq-cta-main" disabled style={{ opacity: 0.6, cursor: 'default' }}>
                          Download City Guide — coming soon
                        </button>
                      )}
                      <button
                        className="btn btn-ghost cq-cta-secondary"
                        onClick={handleConsultation}
                      >
                        <Icon name="calendar" size={14} />
                        Book a consultation
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cq-results-footer">
                <button className="btn btn-ghost cq-retake-btn" onClick={retakeQuiz}>
                  <Icon name="refresh" size={14} />
                  Retake quiz
                </button>
                <div className="cq-share">
                  <span className="cq-share-label">Share your results</span>
                  <div className="cq-share-buttons">
                    <button className="cq-share-btn" title="Copy link">
                      <Icon name="link" size={14} />
                    </button>
                    <button className="cq-share-btn" title="Share">
                      <Icon name="share" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Export
Object.assign(window, {
  CityFinderQuizPage,
  QUIZ_QUESTIONS,
});
