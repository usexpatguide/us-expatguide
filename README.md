# US ExpatGuide

A comprehensive information platform for American expats, covering visas, housing, banking, taxes, healthcare, schools, and daily living guides across 28 countries, 164 cities, and 391 neighborhoods.

## Features

- **Country Rankings**: Most Popular, Upcoming, Most Affordable, English-Friendly
- **City Finder**: 8-question quiz to match you with the best city
- **Country Panels**: Stats, visa guides, banking & tax info, city lists
- **City Pages**: Cost of living, safety, neighborhoods, climate, jobs, FAQs
- **Neighborhood Pages**: Safety ratings, rent, history, lifestyle, walkability, US comparison
- **Bank/Money/Tax**: Country-specific bank listings, tax guides, money transfer
- **FAQ Hub**: Top 20 expat questions + site-wide search
- **Consultation**: $599 one-on-one consultation service

## Tech Stack

- React 18 (UMD build)
- Babel Standalone (in-browser JSX compilation)
- Vanilla CSS
- No build step required — open index.html in a browser

## Structure

```
├── index.html          # Entry point
├── js/
│   ├── app.jsx         # Main app component & routing
│   ├── pages.jsx       # Home, Ranking, City, Country pages
│   ├── components.jsx  # Shared components
│   ├── data.jsx        # Country & city data (5.7MB)
│   ├── neighborhoodData.jsx  # Neighborhood data (3MB)
│   ├── neighborhoodPage.jsx  # Neighborhood page component
│   ├── faqHubPage.jsx  # FAQ hub page
│   ├── faqHubData.jsx  # FAQ data
│   ├── faqGenerator.jsx # FAQ generator
│   ├── consultationPage.jsx # Consultation page
│   ├── quizPage.jsx    # City Finder quiz
│   └── quizData.js     # Quiz questions & scoring
└── css/
    ├── style.css       # Main styles
    ├── neighborhood.css # Neighborhood page styles
    └── faq-hub.css     # FAQ hub styles
```

## Running Locally

Just open `index.html` in a browser. No server or build step needed.

For local development with a server:
```bash
python3 -m http.server 8080
# Then open http://localhost:8080
```
