/* ============================================================
   FAQ Generator — Data-driven FAQ generation for cities & neighborhoods
   Generates contextual Q&A from existing profile data.
   ============================================================ */

// ---------- Helpers ----------
function _has(obj, key) {
  return obj && obj[key] !== undefined && obj[key] !== null && obj[key] !== '';
}

function _first(arr, n = 3) {
  if (!arr || !arr.length) return [];
  return arr.slice(0, n);
}

// ======================================================================
// CITY FAQ GENERATOR
// ======================================================================
function generateCityFaqs(city) {
  if (!city || !city.name) return [];
  const name = city.name;
  const country = city.country || '';
  const faqs = [];

  // 1. Cost of Living
  if (city.costOfLiving) {
    const col = city.costOfLiving;
    const single = col.singleMonth || 'varies';
    const couple = col.coupleMonth || '';
    const family = col.familyMonth || '';
    const vs = col.vsUS || '';
    let answer = `A single person can live comfortably in ${name} on roughly ${single} per month.`;
    if (couple) answer += ` A couple typically needs ${couple}.`;
    if (family) answer += ` For a family of three, budget around ${family}.`;
    if (vs) answer += ` Overall, the cost of living is ${vs.toLowerCase()}.`;
    if (city.budget && city.budget.breakdown) {
      answer += ' The biggest expense is usually housing, followed by groceries and transportation.';
    }
    faqs.push({
      q: `How much does it cost to live in ${name} per month?`,
      a: answer,
    });
  }

  // 2. Visa & Residency
  if (city.visa) {
    const v = city.visa;
    let summary = v.summary || v.usCitizens || v.types || '';
    if (typeof summary === 'object') summary = JSON.stringify(summary);
    let types = '';
    if (v.types && Array.isArray(v.types)) {
      types = v.types.map(t => (typeof t === 'string' ? t : t.name || t.type || '')).filter(Boolean).join(', ');
    } else if (v.types && typeof v.types === 'string') {
      types = v.types;
    }
    let answer = '';
    if (v.usCitizens && typeof v.usCitizens === 'string') {
      answer = v.usCitizens;
    } else if (v.summary && typeof v.summary === 'string') {
      answer = v.summary;
    } else {
      answer = `US citizens can typically stay in ${name} as tourists for up to 90 days, depending on ${country || 'local'} rules.`;
      if (types) answer += ` For longer stays, common options include ${types}.`;
    }
    if (v.touristLength) answer += ` Tourist stays are generally ${v.touristLength}.`;
    faqs.push({
      q: `How can US citizens stay long-term in ${name}?`,
      a: answer,
    });
  }

  // 3. Safety
  if (city.safety) {
    const s = city.safety;
    let answer = '';
    if (s.overall) {
      answer = `${s.overall} `;
    } else if (s.score) {
      answer = `${name} has a safety score of ${s.score}/100. `;
    } else {
      answer = `Safety in ${name} varies by neighborhood. `;
    }
    if (s.safeAreas && Array.isArray(s.safeAreas)) {
      answer += `Generally safe areas include ${s.safeAreas.slice(0, 4).join(', ')}. `;
    }
    if (s.avoid && Array.isArray(s.avoid)) {
      answer += `Areas to avoid include ${s.avoid.slice(0, 3).join(', ')}. `;
    }
    if (s.tips && Array.isArray(s.tips) && s.tips.length) {
      answer += ` Key tips: ${s.tips[0]}`;
      if (s.tips[1]) answer += `; ${s.tips[1].charAt(0).toLowerCase() + s.tips[1].slice(1)}`;
      answer += '.';
    }
    faqs.push({
      q: `Is ${name} safe? What areas should I know about?`,
      a: answer,
    });
  }

  // 4. Healthcare
  if (city.healthcare) {
    const h = city.healthcare;
    let answer = '';
    if (h.quality) answer += `Healthcare quality in ${name} is ${h.quality.toLowerCase()}. `;
    else answer += `Healthcare in ${name} is generally accessible. `;
    if (h.hospitals && Array.isArray(h.hospitals)) {
      answer += `Top hospitals include ${h.hospitals.slice(0, 3).join(', ')}. `;
    }
    if (h.insurance) answer += ` ${h.insurance}`;
    if (h.cost) answer += ` ${h.cost}`;
    if (h.doctorVisit || h.dentist) {
      const parts = [];
      if (h.doctorVisit) parts.push(`a doctor visit costs around ${h.doctorVisit}`);
      if (h.dentist) parts.push(`dental visits start at ${h.dentist}`);
      if (parts.length) answer += ` Typical costs: ${parts.join(', ')}.`;
    }
    faqs.push({
      q: `How is the healthcare in ${name}?`,
      a: answer.trim(),
    });
  }

  // 5. Schools & Education
  if (city.schools) {
    const sc = city.schools;
    let answer = '';
    if (sc.international && Array.isArray(sc.international)) {
      answer = `International schools in ${name} include ${sc.international.slice(0, 4).join(', ')}. `;
    } else if (sc.international && typeof sc.international === 'string') {
      answer = `${sc.international} `;
    } else {
      answer = `${name} has several international school options. `;
    }
    if (sc.tuition) answer += `Tuition ranges roughly ${sc.tuition} per year. `;
    if (sc.local) answer += ` Local public schools: ${sc.local}`;
    if (sc.universities && Array.isArray(sc.universities)) {
      answer += ` Universities include ${sc.universities.slice(0, 3).join(', ')}.`;
    }
    faqs.push({
      q: `What international schools are in ${name}?`,
      a: answer.trim(),
    });
  }

  // 6. Transportation
  if (city.walkability) {
    const w = city.walkability;
    let answer = '';
    if (w.walkScore && w.walkLabel) {
      answer = `${name} has a walk score of ${w.walkScore}/100 (${w.walkLabel}). `;
    }
    if (w.transitScore && w.transitLabel) {
      answer += `Public transit scores ${w.transitScore}/100 (${w.transitLabel}). `;
    }
    if (w.carNeeded) {
      answer += `${w.carNeeded.charAt(0).toUpperCase() + w.carNeeded.slice(1)}. `;
    }
    if (w.details && w.details.length) {
      answer += w.details[0];
      if (w.details[1]) answer += ' ' + w.details[1];
    }
    faqs.push({
      q: `Do I need a car in ${name}? How is public transit?`,
      a: answer.trim(),
    });
  }

  // 7. Internet
  if (city.internet) {
    const net = city.internet;
    let answer = `Internet in ${name} typically runs at ${net.speed || 'varies'}. `;
    if (net.cost) answer += `Monthly cost is around ${net.cost}. `;
    if (net.providers && Array.isArray(net.providers)) {
      answer += `Main providers include ${net.providers.slice(0, 4).join(', ')}. `;
    } else if (net.providers) {
      answer += `Providers: ${net.providers}. `;
    }
    if (net.mobile) answer += `Mobile options: ${net.mobile}. `;
    if (net.note) answer += net.note;
    faqs.push({
      q: `How fast is the internet in ${name}?`,
      a: answer.trim(),
    });
  }

  // 8. Banking
  if (city.banking) {
    const b = city.banking;
    let answer = '';
    if (b.opening) answer += `${b.opening} `;
    else answer += `Opening a bank account in ${name} is possible for expats, though documentation requirements vary. `;
    if (b.banks && Array.isArray(b.banks)) {
      answer += `Major banks include ${b.banks.slice(0, 5).join(', ')}. `;
    }
    if (b.atms) answer += `${b.atms} `;
    if (b.cards) answer += `${b.cards} `;
    if (b.transfers) answer += `${b.transfers}`;
    faqs.push({
      q: `Can I open a bank account in ${name}? How easy is it?`,
      a: answer.trim(),
    });
  }

  // 9. Language
  if (city.overview && city.overview.language) {
    const o = city.overview;
    let answer = `The primary language in ${name} is ${o.language}. `;
    if (o.englishLevel) {
      answer += `English proficiency is generally ${o.englishLevel.toLowerCase()} — `;
      if (/high/i.test(o.englishLevel)) {
        answer += 'you can get by with English in expat areas, tourism zones, and among younger professionals.';
      } else if (/medium|moderate/i.test(o.englishLevel)) {
        answer += "it's helpful in expat areas and with younger people, but learning basic local phrases will make daily life much easier.";
      } else {
        answer += 'you will want to learn at least basic conversational local language for everyday errands and interactions.';
      }
    } else {
      answer += 'Learning at least basic conversational skills is strongly recommended for daily life.';
    }
    faqs.push({
      q: `Can I get by with English in ${name}, or do I need to learn the local language?`,
      a: answer,
    });
  }

  // 10. Best neighborhoods
  if (city.neighborhoods && Array.isArray(city.neighborhoods) && city.neighborhoods.length) {
    const nbs = city.neighborhoods.filter(n => n && n.name).slice(0, 5);
    if (nbs.length) {
      const names = nbs.map(n => n.name);
      const descLines = nbs.map(n => {
        if (n.vibe) return `${n.name} (${n.vibe})`;
        if (n.description) return `${n.name}`;
        return n.name;
      });
      const answer = `Popular neighborhoods for expats in ${name} include ${descLines.join(', ')}. The best area depends on your budget, lifestyle, and whether you need to be near work or schools — walkable central areas tend to be pricier, while suburban neighborhoods offer more space for less money.`;
      faqs.push({
        q: `What are the best neighborhoods to live in ${name}?`,
        a: answer,
      });
    }
  }

  return faqs;
}

// ======================================================================
// NEIGHBORHOOD FAQ GENERATOR
// ======================================================================
function generateNeighborhoodFaqs(guide) {
  if (!guide || !guide.name) return [];
  const name = guide.name;
  const city = guide.cityName || '';
  const faqs = [];

  // 1. Rent ranges
  if (guide.rentRange) {
    const r = guide.rentRange;
    const parts = [];
    if (r.studio) parts.push(`studio: ${r.studio.usd || r.studio}`);
    if (r.oneBed) parts.push(`1-bed: ${r.oneBed.usd || r.oneBed}`);
    if (r.twoBed) parts.push(`2-bed: ${r.twoBed.usd || r.twoBed}`);
    if (r.threeBed) parts.push(`3-bed/house: ${r.threeBed.usd || r.threeBed}`);
    let answer = '';
    if (parts.length) {
      answer = `Rental prices in ${name} break down roughly as follows — ${parts.join(', ')}. `;
    } else {
      answer = `Rental prices in ${name} vary by size and condition. `;
    }
    if (guide.rentRange.note) answer += guide.rentRange.note;
    faqs.push({
      q: `How much is rent in ${name}?`,
      a: answer.trim(),
    });
  }

  // 2. Safety
  if (guide.safety) {
    const s = guide.safety;
    let answer = '';
    if (s.score && s.level) {
      answer = `${name} has a safety score of ${s.score}/100 (${s.level}). `;
    } else if (s.level) {
      answer = `${name} is generally ${s.level.toLowerCase()}. `;
    }
    if (s.summary) answer += s.summary + ' ';
    if (s.tips && Array.isArray(s.tips) && s.tips.length) {
      answer += `Key precautions: ${s.tips.slice(0, 3).join(' ')}`;
    }
    faqs.push({
      q: `Is ${name} safe? What should I watch out for?`,
      a: answer.trim(),
    });
  }

  // 3. Walkability (from essentials.transit)
  if (guide.essentials && guide.essentials.transit) {
    const t = guide.essentials.transit;
    let answer = '';
    if (t.walkScore && t.walkLabel) {
      answer = `${name} has a walk score of ${t.walkScore}/100 (${t.walkLabel}). `;
    }
    if (t.carNeeded) {
      answer += `${t.carNeeded.charAt(0).toUpperCase() + t.carNeeded.slice(1)}. `;
    }
    if (t.details && t.details.length) {
      answer += t.details.slice(0, 2).join(' ');
    }
    faqs.push({
      q: `Is ${name} walkable? Can I do daily errands on foot?`,
      a: answer.trim(),
    });
  }

  // 4. Public transit
  if (guide.essentials && guide.essentials.transit && guide.essentials.transit.transitScore) {
    const t = guide.essentials.transit;
    let answer = `Public transit access scores ${t.transitScore}/100 (${t.transitLabel}). `;
    if (t.details && t.details.length > 1) {
      answer += t.details.slice(1, 3).join(' ');
    }
    faqs.push({
      q: `How good is public transportation from ${name}?`,
      a: answer.trim(),
    });
  }

  // 5. Who it's for
  if (guide.tags || guide.lifestyle) {
    const tags = guide.tags || [];
    const lifestyle = guide.lifestyle || [];
    const all = [...tags, ...lifestyle];
    let who = [];
    if (lifestyle.some(l => /family/i.test(l))) who.push('families');
    if (lifestyle.some(l => /young|hipster|creative|artsy/i.test(l))) who.push('young professionals');
    if (tags.some(t => /expat|nomad|remote/i.test(t))) who.push('expats and digital nomads');
    if (lifestyle.some(l => /retire/i.test(l))) who.push('retirees');
    if (lifestyle.some(l => /nightlife|party/i.test(l))) who.push('people who enjoy nightlife');
    if (who.length === 0) who = [all.slice(0, 2).join(' and ').toLowerCase() + ' seekers'];
    const answer = `${name} is a great fit for ${who.join(', ')}. With ${all.slice(0, 4).join(', ')}, the area caters to people who value those lifestyle priorities in ${city}.`;
    faqs.push({
      q: `Who is ${name} best for?`,
      a: answer,
    });
  }

  // 6. Amenities / essentials
  if (guide.essentials) {
    const e = guide.essentials;
    const amenities = [];
    if (e.dining && Array.isArray(e.dining) && e.dining.length) {
      amenities.push('dining and cafes');
    }
    if (e.schools && Array.isArray(e.schools) && e.schools.length) {
      amenities.push('schools');
    }
    if (e.gyms) amenities.push('gyms and fitness options');
    if (e.healthcare) amenities.push('healthcare services');
    if (e.internet) amenities.push('high-speed internet');
    if (amenities.length) {
      let answer = `${name} offers good access to ${amenities.join(', ')}. `;
      if (e.dining && e.dining.length) {
        answer += `${e.dining[0]} `;
        if (e.dining[1]) answer += e.dining[1].charAt(0).toLowerCase() + e.dining[1].slice(1);
      }
      if (e.healthcare) answer += ` ${e.healthcare}`;
      faqs.push({
        q: `What amenities are available in ${name}?`,
        a: answer.trim(),
      });
    }
  }

  // 7. Expat community
  if (guide.essentials && guide.essentials.expatCommunity) {
    faqs.push({
      q: `How big is the expat community in ${name}?`,
      a: guide.essentials.expatCommunity,
    });
  }

  // 8. Noise / nightlife
  if (guide.tags && guide.tags.some(t => /nightlife|quiet|family/i.test(t))) {
    const isNoisy = guide.lifestyle && guide.lifestyle.some(l => /nightlife|party|trendy|hipster/i.test(l));
    const isQuiet = guide.tags.some(t => /quiet|residential|family/i.test(t));
    let answer;
    if (isNoisy) {
      answer = `${name} has a vibrant nightlife and bar scene, especially on weekends. Main streets and popular restaurant areas can be noisy at night — look for apartments on side streets or upper floors if you need quiet. It's not the best fit for those seeking a tranquil residential vibe.`;
    } else if (isQuiet) {
      answer = `${name} is generally quiet and residential, with a calm atmosphere. There are local restaurants and cafes, but it's not a nightlife destination. Good choice for families, retirees, or anyone who values peace and quiet.`;
    } else {
      answer = `${name} has a mix of quiet residential streets and some busier commercial areas. Noise levels depend on exactly where you live — side streets tend to be calm, while streets with bars and restaurants can be lively on weekends.`;
    }
    faqs.push({
      q: `What's the noise level like in ${name}? Is it good for nightlife?`,
      a: answer,
    });
  }

  return faqs;
}

// Export to window
Object.assign(window, {
  generateCityFaqs,
  generateNeighborhoodFaqs,
});
