/*
    City Finder Quiz — data and scoring engine
    ============================================================ */

// 12 Mexican cities with 16-dimension scores (0-100), vibe type, and tagline
const quizCities = [
  {
    slug: 'mexico-city',
    name: 'Mexico City',
    country: 'Mexico',
    vibeType: 'big city',
    setting: ['City'],
    vibe: ['Modern', 'Cosmopolitan', 'Nightlife'],
    hasFullPage: true,
    scores: {
      cost: 55, healthcare: 80, internet: 85, schools: 82, safety: 48,
      visaEase: 75, climate: 65, community: 85, jobMarket: 85, infrastructure: 88,
      coworking: 88, universities: 88, nightlife: 90, banking: 85, culture: 95, space: 55,
    },
  },
  {
    slug: 'guadalajara-chapala',
    name: 'Guadalajara',
    country: 'Mexico',
    vibeType: 'big city',
    setting: ['City'],
    vibe: ['Tech Hub', 'Family-Friendly', 'Modern'],
    tagline: 'Tech hub with colonial charm',
    hasFullPage: true,
    scores: {
      cost: 60, healthcare: 78, internet: 80, schools: 80, safety: 55,
      visaEase: 75, climate: 78, community: 82, jobMarket: 78, infrastructure: 82,
      coworking: 80, universities: 82, nightlife: 82, banking: 80, culture: 85, space: 60,
    },
  },
  {
    slug: 'lake-chapala',
    name: 'Lake Chapala / Ajijic',
    country: 'Mexico',
    vibeType: 'quiet town',
    setting: ['Lake / Riverside'],
    vibe: ['Slow-Paced', 'Retirement', 'Cosmopolitan'],
    tagline: 'The #1 US retiree community',
    hasFullPage: false,
    scores: {
      cost: 72, healthcare: 70, internet: 62, schools: 55, safety: 70,
      visaEase: 78, climate: 88, community: 90, jobMarket: 30, infrastructure: 55,
      coworking: 40, universities: 40, nightlife: 45, banking: 55, culture: 70, space: 72,
    },
  },
  {
    slug: 'san-miguel-de-allende',
    name: 'San Miguel de Allende',
    country: 'Mexico',
    vibeType: 'quiet town',
    setting: ['Mountain / Highlands'],
    vibe: ['Heritage', 'Artsy', 'Slow-Paced'],
    tagline: 'Artsy colonial icon',
    hasFullPage: false,
    scores: {
      cost: 62, healthcare: 72, internet: 68, schools: 65, safety: 68,
      visaEase: 76, climate: 82, community: 88, jobMarket: 35, infrastructure: 62,
      coworking: 50, universities: 55, nightlife: 70, banking: 60, culture: 92, space: 65,
    },
  },
  {
    slug: 'puerto-vallarta',
    name: 'Puerto Vallarta',
    country: 'Mexico',
    vibeType: 'beach',
    setting: ['Coastal / Beach'],
    vibe: ['Nightlife', 'Cosmopolitan', 'Resort'],
    tagline: 'Beach life with a big expat scene',
    hasFullPage: false,
    scores: {
      cost: 62, healthcare: 74, internet: 70, schools: 68, safety: 58,
      visaEase: 75, climate: 90, community: 86, jobMarket: 42, infrastructure: 68,
      coworking: 55, universities: 50, nightlife: 75, banking: 62, culture: 75, space: 68,
    },
  },
  {
    slug: 'monterrey',
    name: 'Monterrey',
    country: 'Mexico',
    vibeType: 'big city',
    setting: ['City', 'Mountain / Highlands'],
    vibe: ['Business', 'Modern', 'Family-Friendly'],
    tagline: "Mexico's business engine",
    hasFullPage: false,
    scores: {
      cost: 68, healthcare: 82, internet: 88, schools: 85, safety: 52,
      visaEase: 74, climate: 72, community: 65, jobMarket: 90, infrastructure: 90,
      coworking: 85, universities: 88, nightlife: 78, banking: 88, culture: 75, space: 72,
    },
  },
  {
    slug: 'merida',
    name: 'Mérida',
    country: 'Mexico',
    vibeType: 'quiet town',
    setting: ['City'],
    vibe: ['Heritage', 'Safe', 'Slow-Paced'],
    tagline: 'Safest big city in Mexico',
    hasFullPage: false,
    scores: {
      cost: 72, healthcare: 75, internet: 72, schools: 70, safety: 78,
      visaEase: 76, climate: 80, community: 72, jobMarket: 50, infrastructure: 72,
      coworking: 55, universities: 62, nightlife: 58, banking: 65, culture: 82, space: 72,
    },
  },
  {
    slug: 'tulum',
    name: 'Tulum',
    country: 'Mexico',
    vibeType: 'beach',
    setting: ['Coastal / Beach', 'Jungle / Tropical'],
    vibe: ['Trendy', 'Wellness', 'Nightlife'],
    tagline: 'Boho beach escape',
    hasFullPage: false,
    scores: {
      cost: 48, healthcare: 60, internet: 55, schools: 50, safety: 42,
      visaEase: 72, climate: 92, community: 68, jobMarket: 30, infrastructure: 45,
      coworking: 60, universities: 35, nightlife: 72, banking: 45, culture: 65, space: 70,
    },
  },
  {
    slug: 'los-cabos',
    name: 'Los Cabos',
    country: 'Mexico',
    vibeType: 'beach',
    setting: ['Coastal / Beach', 'Desert'],
    vibe: ['Resort', 'Luxury', 'Nightlife'],
    tagline: 'Resort coast living',
    hasFullPage: false,
    scores: {
      cost: 50, healthcare: 68, internet: 62, schools: 58, safety: 48,
      visaEase: 73, climate: 90, community: 75, jobMarket: 40, infrastructure: 60,
      coworking: 50, universities: 40, nightlife: 68, banking: 55, culture: 62, space: 66,
    },
  },
  {
    slug: 'oaxaca',
    name: 'Oaxaca',
    country: 'Mexico',
    vibeType: 'quiet town',
    setting: ['Mountain / Highlands'],
    vibe: ['Heritage', 'Artsy', 'Slow-Paced'],
    tagline: 'Culture capital of Mexico',
    hasFullPage: false,
    scores: {
      cost: 70, healthcare: 66, internet: 55, schools: 55, safety: 60,
      visaEase: 74, climate: 80, community: 65, jobMarket: 32, infrastructure: 52,
      coworking: 42, universities: 50, nightlife: 62, banking: 50, culture: 95, space: 62,
    },
  },
  {
    slug: 'queretaro',
    name: 'Querétaro',
    country: 'Mexico',
    vibeType: 'big city',
    setting: ['City'],
    vibe: ['Modern', 'Business', 'Family-Friendly'],
    tagline: 'Safe, modern, business-friendly',
    hasFullPage: false,
    scores: {
      cost: 72, healthcare: 78, internet: 85, schools: 82, safety: 72,
      visaEase: 75, climate: 78, community: 55, jobMarket: 78, infrastructure: 82,
      coworking: 75, universities: 78, nightlife: 65, banking: 78, culture: 78, space: 68,
    },
  },
  {
    slug: 'playa-del-carmen',
    name: 'Playa del Carmen',
    country: 'Mexico',
    vibeType: 'beach',
    setting: ['Coastal / Beach'],
    vibe: ['Resort', 'Nightlife', 'Cosmopolitan'],
    tagline: 'Riviera Maya beach town',
    hasFullPage: false,
    scores: {
      cost: 55, healthcare: 66, internet: 65, schools: 60, safety: 46,
      visaEase: 72, climate: 92, community: 78, jobMarket: 38, infrastructure: 58,
      coworking: 62, universities: 42, nightlife: 80, banking: 52, culture: 68, space: 64,
    },
  },
];

// Base weight tables by Q1 answer (lifestyle type)
// Each: dimension -> weight; unspecified dimensions default to 0
const quizWeightTables = {
  retired: {
    healthcare: 0.30,
    cost: 0.25,
    climate: 0.20,
    community: 0.15,
    safety: 0.10,
  },
  family: {
    schools: 0.30,
    safety: 0.25,
    healthcare: 0.20,
    space: 0.15,
    cost: 0.10,
  },
  career: {
    jobMarket: 0.30,
    infrastructure: 0.25,
    cost: 0.20,
    internet: 0.15,
    community: 0.10,
  },
  nomad: {
    internet: 0.30,
    cost: 0.25,
    visaEase: 0.20,
    coworking: 0.15,
    community: 0.10,
  },
  student: {
    universities: 0.35,
    cost: 0.25,
    nightlife: 0.20,
    safety: 0.10,
    community: 0.10,
  },
  business: {
    banking: 0.30,
    jobMarket: 0.25,
    infrastructure: 0.25,
    cost: 0.10,
    safety: 0.10,
  },
  heritage: {
    culture: 0.35,
    community: 0.25,
    climate: 0.20,
    cost: 0.10,
    healthcare: 0.10,
  },
};

// Dimension display names for "why matched" explanations
const quizDimensionLabels = {
  cost: 'Your budget range',
  healthcare: 'Healthcare quality',
  internet: 'Internet speed',
  schools: 'International schools',
  safety: 'Safety',
  visaEase: 'Visa ease',
  climate: 'Climate & weather',
  community: 'Expat community',
  jobMarket: 'Job market',
  infrastructure: 'Infrastructure',
  coworking: 'Co-working spaces',
  universities: 'Universities',
  nightlife: 'Nightlife & culture',
  banking: 'Banking & finance',
  culture: 'Culture & heritage',
  space: 'Living space',
};

// Calculate match score for a city given user answers
function calculateCityScore(city, answers) {
  const baseWeights = { ...quizWeightTables[answers.lifestyle] };
  if (!baseWeights) return { score: 0, topDims: [] };

  // Q2 budget adjustment: cost weight multiplier
  if (answers.budget === 'under1500' && baseWeights.cost) {
    baseWeights.cost *= 1.35;
  } else if (answers.budget === 'over5000' && baseWeights.cost) {
    baseWeights.cost *= 0.6;
  }

  // Q6 healthcare "Not a factor" → zero out and redistribute
  if (answers.healthcare === 'none' && baseWeights.healthcare) {
    const hcWeight = baseWeights.healthcare;
    baseWeights.healthcare = 0;
    const nonZeroDims = Object.entries(baseWeights).filter(([, w]) => w > 0);
    if (nonZeroDims.length > 0) {
      const share = hcWeight / nonZeroDims.length;
      nonZeroDims.forEach(([dim]) => {
        baseWeights[dim] += share;
      });
    }
  }

  // Q7 language adjustment: "English-only" → boost community weight
  if (answers.language === 'englishOnly' && baseWeights.community) {
    const boost = 0.05;
    // reduce others proportionally
    const othersTotal = Object.entries(baseWeights)
      .filter(([d]) => d !== 'community')
      .reduce((sum, [, w]) => sum + w, 0);
    if (othersTotal > 0) {
      Object.keys(baseWeights).forEach(dim => {
        if (dim !== 'community' && baseWeights[dim] > 0) {
          baseWeights[dim] -= (baseWeights[dim] / othersTotal) * boost;
        }
      });
    }
    baseWeights.community += boost;
  }

  // Q5 climate/vibe match
  let climateScore = city.scores.climate;
  if (answers.vibe) {
    const cityVibe = city.vibeType;
    const answerVibe = answers.vibe;
    // Map answer values to vibe types
    const vibeMatches = (
      (answerVibe === 'beach' && cityVibe === 'beach') ||
      (answerVibe === 'highlands' && cityVibe === 'quiet town') || // highlands ~ quiet mountain/colonial towns
      (answerVibe === 'bigcity' && cityVibe === 'big city') ||
      (answerVibe === 'quiet' && cityVibe === 'quiet town')
    );
    if (vibeMatches) {
      climateScore = 90;
    } else {
      climateScore = city.scores.climate * 0.5;
    }
  }

  // Compute weighted total
  let totalScore = 0;
  let totalWeight = 0;
  const contributions = [];

  Object.entries(baseWeights).forEach(([dim, weight]) => {
    if (weight <= 0) return;
    let dimScore = dim === 'climate' ? climateScore : (city.scores[dim] || 0);
    totalScore += dimScore * weight;
    totalWeight += weight;
    contributions.push({ dim, weight, score: dimScore, weighted: dimScore * weight });
  });

  const finalScore = totalWeight > 0 ? Math.round((totalScore / totalWeight)) : 0;

  // Top 3 dimensions that drove the match (by weighted contribution)
  contributions.sort((a, b) => b.weighted - a.weighted);
  const topDims = contributions.slice(0, 3).map(c => c.dim);

  return { score: finalScore, topDims };
}

// Run full quiz matching against all cities
function runQuizMatch(answers) {
  const results = quizCities.map(city => {
    const { score, topDims } = calculateCityScore(city, answers);
    return { city, score, topDims };
  });
  results.sort((a, b) => b.score - a.score);
  return results;
}

// Export
Object.assign(window, {
  quizCities,
  quizWeightTables,
  quizDimensionLabels,
  calculateCityScore,
  runQuizMatch,
});
