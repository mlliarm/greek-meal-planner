'use strict';

const WEEK_LENGTH = 7;

const I18N = {
  en: {
    htmlLang: 'en',
    pageTitle: 'Greek Meal Planner',
    pageHeading: 'Greek Weekly Meal Planner',
    pageSubtitle: 'Logic-based planning · Nutritionally balanced · Never boring',
    buttonPlanThisWeek: 'Plan This Week',
    buttonPlanNextWeek: 'Plan Next Week',
    statusLoading: 'Loading...',
    statusInitialising: 'Initialising Tau Prolog...',
    statusReady: 'Ready - click "Plan This Week" to generate your first meal plan.',
    statusPlanning: 'Planning...',
    statusCouldNotFindPlan: 'Could not find a valid plan after {max} attempts. Refresh and try again.',
    statusCouldNotFindPlanVariety: 'Could not find a valid plan after {max} attempts. Try "Plan This Week" to reset variety tracking or add more dishes to reduce the overlap cap below {allowedOverlap}.',
    statusNewWeekPlanned: 'New week planned - at most {allowedOverlap} dishes repeated from last week.',
    statusWeekReady: 'Weekly plan ready! Use "Plan Next Week" to continue with variety tracking.',
    statusError: 'Error: {error}',
    statusInitError: 'Initialisation error: {error}',
    headerDay: 'Day',
    headerDish: 'Dish',
    headerKcal: 'kcal',
    headerProtein: 'Protein (g)',
    headerCarbs: 'Carbs (g)',
    headerFat: 'Fat (g)',
    titleKcal: 'kilocalories',
    titleProtein: 'grams of protein',
    titleCarbs: 'grams of carbohydrates',
    titleFat: 'grams of fat',
    totalsRow: 'Week Total',
    legendTitle: 'Variety rule:',
    legendBody: 'with {poolSize} dishes in the catalog, "Plan Next Week" allows at most {allowedOverlap} repeated dishes out of {weekLength} while preserving nutritional balance (+/-15% per macro).',
    dayMonday: 'Monday',
    dayTuesday: 'Tuesday',
    dayWednesday: 'Wednesday',
    dayThursday: 'Thursday',
    dayFriday: 'Friday',
    daySaturday: 'Saturday',
    daySunday: 'Sunday'
  },
  el: {
    htmlLang: 'el',
    pageTitle: 'Εβδομαδιαίος Προγραμματισμός Φαγητού',
    pageHeading: 'Ελληνικός Εβδομαδιαίος Προγραμματισμός Φαγητού',
    pageSubtitle: 'Προγραμματισμός με λογική · Ισορροπημένη διατροφή · Χωρίς μονοτονία',
    buttonPlanThisWeek: 'Προγραμμάτισε Αυτή την Εβδομάδα',
    buttonPlanNextWeek: 'Προγραμμάτισε Επόμενη Εβδομάδα',
    statusLoading: 'Φόρτωση...',
    statusInitialising: 'Αρχικοποίηση Tau Prolog...',
    statusReady: 'Έτοιμο - πάτησε "Προγραμμάτισε Αυτή την Εβδομάδα" για το πρώτο πλάνο.',
    statusPlanning: 'Γίνεται προγραμματισμός...',
    statusCouldNotFindPlan: 'Δεν βρέθηκε έγκυρο πλάνο μετά από {max} προσπάθειες. Κάνε ανανέωση και δοκίμασε ξανά.',
    statusCouldNotFindPlanVariety: 'Δεν βρέθηκε έγκυρο πλάνο μετά από {max} προσπάθειες. Πάτησε "Προγραμμάτισε Αυτή την Εβδομάδα" για επαναφορά ή πρόσθεσε περισσότερα πιάτα για όριο επανάληψης κάτω από {allowedOverlap}.',
    statusNewWeekPlanned: 'Το νέο εβδομαδιαίο πλάνο είναι έτοιμο - έως {allowedOverlap} πιάτα επαναλήφθηκαν από την προηγούμενη εβδομάδα.',
    statusWeekReady: 'Το εβδομαδιαίο πλάνο είναι έτοιμο! Πάτησε "Προγραμμάτισε Επόμενη Εβδομάδα" για συνέχεια με ποικιλία.',
    statusError: 'Σφάλμα: {error}',
    statusInitError: 'Σφάλμα αρχικοποίησης: {error}',
    headerDay: 'Ημέρα',
    headerDish: 'Πιάτο',
    headerKcal: 'θερμίδες',
    headerProtein: 'Πρωτεΐνη (g)',
    headerCarbs: 'Υδατάνθρακες (g)',
    headerFat: 'Λιπαρά (g)',
    titleKcal: 'χιλιοθερμίδες',
    titleProtein: 'γραμμάρια πρωτεΐνης',
    titleCarbs: 'γραμμάρια υδατανθράκων',
    titleFat: 'γραμμάρια λιπαρών',
    totalsRow: 'Σύνολο Εβδομάδας',
    legendTitle: 'Κανόνας ποικιλίας:',
    legendBody: 'με {poolSize} πιάτα στον κατάλογο, το "Προγραμμάτισε Επόμενη Εβδομάδα" επιτρέπει έως {allowedOverlap} επαναλήψεις στα {weekLength} πιάτα, διατηρώντας ισορροπημένη διατροφή (+/-15% ανά μακροθρεπτικό).',
    dayMonday: 'Δευτέρα',
    dayTuesday: 'Τρίτη',
    dayWednesday: 'Τετάρτη',
    dayThursday: 'Πέμπτη',
    dayFriday: 'Παρασκευή',
    daySaturday: 'Σάββατο',
    daySunday: 'Κυριακή'
  }
};

const DAY_KEYS = [
  'dayMonday',
  'dayTuesday',
  'dayWednesday',
  'dayThursday',
  'dayFriday',
  'daySaturday',
  'daySunday'
];

const DISH_TRANSLATIONS = {
  spaghetti_bolognese: {
    en: 'Spaghetti with minced meat sauce',
    el: 'Μακαρόνια με κιμά'
  },
  pastitsio: {
    en: 'Pastitsio',
    el: 'Παστίτσιο'
  },
  chicken_potatoes: {
    en: 'Chicken with oven potatoes',
    el: 'Κοτόπουλο με πατάτες φούρνου'
  },
  steak_potatoes: {
    en: 'Steak with potatoes',
    el: 'Μπριζόλα με πατάτες'
  },
  pork_souvlaki: {
    en: 'Pork souvlaki',
    el: 'Χοιρινό σουβλάκι'
  },
  moussaka: {
    en: 'Moussaka',
    el: 'Μουσακάς'
  },
  bean_soup: {
    en: 'Bean soup',
    el: 'Φασολάδα'
  },
  lentil_soup: {
    en: 'Lentil soup',
    el: 'Φακές σούπα'
  },
  fasolakia: {
    en: 'Fasolakia in olive oil',
    el: 'Φασολάκια λαδερά'
  },
  briam: {
    en: 'Briam',
    el: 'Μπριάμ'
  },
  gemista: {
    en: 'Gemista',
    el: 'Γεμιστά'
  },
  omeleta_me_patates: {
    en: 'Omelette with potatoes',
    el: 'Ομελέτα με πατάτες'
  }
};

// Inlined Prolog source so the app works from GitHub Pages and file://
const KNOWLEDGE_PL = `
% Categories
category(pasta).
category(meat_with_side).
category(legumes).
category(vegetables).
category(egg_based).

% dish(Id, Label, Category, Calories, Protein, Carbs, Fat)
dish(spaghetti_bolognese, 'Spaghetti me kima',       pasta,          650, 30, 75, 18).
dish(pastitsio,           'Pastitsio',                pasta,          700, 32, 70, 22).
dish(chicken_potatoes,    'Kotopoulo me patates',     meat_with_side, 600, 40, 45, 15).
dish(steak_potatoes,      'Brizola me patates',       meat_with_side, 700, 45, 40, 25).
dish(pork_souvlaki,       'Souvlaki xoirino',         meat_with_side, 550, 38, 30, 18).
dish(moussaka,            'Moussaka',                 meat_with_side, 640, 27, 34, 34).
dish(bean_soup,           'Fasoulada',                legumes,        420, 18, 60,  8).
dish(lentil_soup,         'Fakes soupa',              legumes,        380, 20, 55,  6).
dish(fasolakia,           'Fasolakia lathera',        vegetables,     300,  8, 35, 12).
dish(briam,               'Briam (ratatouille)',      vegetables,     280,  6, 38, 10).
dish(gemista,             'Gemista',                  vegetables,     430,  9, 63, 14).
dish(omeleta_me_patates,  'Omeleta me patates',       egg_based,      450, 18, 35, 22).

% Weekly nutritional targets (total across 7 meals)
weekly_target(calories, 4200).
weekly_target(protein,   210).
weekly_target(carbs,     350).
weekly_target(fat,       140).

% Allowed deviation per macro (15%)
tolerance(0.15).
`;

const PLANNER_PL = `
% plan_week_from(+OrderedDishes, -Plan)
% Called from JS with a pre-shuffled list so each attempt explores a different
% search space, giving varied results without needing the lists module.
plan_week_from(AllDishes, Plan) :-
  select_n(7, AllDishes, Plan),
  nutritionally_balanced(Plan).

% select_n(+N, +List, -Selection)
% Picks N distinct elements from List (removes each chosen element so no repeats).
select_n(0, _, []) :- !.
select_n(N, List, [H|Rest]) :-
  N > 0,
  select_dish(H, List, Remaining),
  N1 is N - 1,
  select_n(N1, Remaining, Rest).

% select_dish(?Elem, +List, -Rest)
select_dish(X, [X|T], T).
select_dish(X, [H|T], [H|R]) :-
  select_dish(X, T, R).

nutritionally_balanced(Plan) :-
    within_tolerance(Plan, calories),
    within_tolerance(Plan, protein),
    within_tolerance(Plan, carbs),
    within_tolerance(Plan, fat).

within_tolerance(Plan, Macro) :-
    sum_macro(Plan, Macro, Total),
    weekly_target(Macro, Target),
    tolerance(Tol),
    Low  is Target * (1.0 - Tol),
    High is Target * (1.0 + Tol),
    Total >= Low,
    Total =< High.

sum_macro([], _, 0).
sum_macro([Id|Rest], Macro, Total) :-
    dish_macro(Id, Macro, Val),
    sum_macro(Rest, Macro, RestTotal),
    Total is RestTotal + Val.

dish_macro(Id, calories, V) :- dish(Id, _, _, V, _, _, _).
dish_macro(Id, protein,  V) :- dish(Id, _, _, _, V, _, _).
dish_macro(Id, carbs,    V) :- dish(Id, _, _, _, _, V, _).
dish_macro(Id, fat,      V) :- dish(Id, _, _, _, _, _, V).
`;

const knowledgeText = KNOWLEDGE_PL;
const plannerText = PLANNER_PL;

let currentLang = getInitialLanguage();
let dishMap = {};
let nutritionMap = {};
let previousPlan = null;
let statusState = {
  translatable: true,
  key: 'statusLoading',
  params: {},
  type: 'info'
};

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem('mealPlannerLanguage');
    if (saved === 'en' || saved === 'el') return saved;
  } catch (_) {
    // Ignore localStorage failures and fallback to browser language.
  }
  return navigator.language && navigator.language.toLowerCase().startsWith('el') ? 'el' : 'en';
}

function persistLanguage(lang) {
  try {
    localStorage.setItem('mealPlannerLanguage', lang);
  } catch (_) {
    // Ignore localStorage failures.
  }
}

function t(key) {
  const dict = I18N[currentLang] || I18N.en;
  return dict[key] ?? I18N.en[key] ?? key;
}

function tf(key, params = {}) {
  return t(key).replace(/\{(\w+)\}/g, (_, token) => {
    if (Object.prototype.hasOwnProperty.call(params, token)) {
      return String(params[token]);
    }
    return `{${token}}`;
  });
}

function dayLabel(index) {
  const key = DAY_KEYS[index] || DAY_KEYS[0];
  return t(key);
}

function dishLabel(id) {
  const entry = DISH_TRANSLATIONS[id];
  if (!entry) return dishMap[id] ?? id;
  return entry[currentLang] ?? entry.en ?? dishMap[id] ?? id;
}

function getAllowedOverlap(poolSize) {
  const targetMaxOverlap = Math.floor(WEEK_LENGTH / 2);
  const minimumFeasibleOverlap = Math.max(0, (WEEK_LENGTH * 2) - poolSize);
  return Math.max(targetMaxOverlap, minimumFeasibleOverlap);
}

function writeStatus(msg, type = 'info') {
  const el = document.getElementById('status');
  if (!el) return;
  el.textContent = msg;
  el.className = 'status ' + type;
}

function setStatus(msg, type = 'info') {
  statusState = {
    translatable: false,
    msg,
    type
  };
  writeStatus(msg, type);
}

function setStatusT(key, type = 'info', params = {}) {
  statusState = {
    translatable: true,
    key,
    type,
    params
  };
  writeStatus(tf(key, params), type);
}

function refreshStatusLanguage() {
  if (!statusState) return;
  if (statusState.translatable) {
    writeStatus(tf(statusState.key, statusState.params), statusState.type);
    return;
  }
  writeStatus(statusState.msg, statusState.type);
}

function updateVarietyLegend() {
  const legend = document.getElementById('variety-legend');
  if (!legend) return;

  const poolSize = Object.keys(dishMap).length;
  const allowedOverlap = getAllowedOverlap(poolSize);
  const title = t('legendTitle');
  const body = tf('legendBody', {
    poolSize,
    allowedOverlap,
    weekLength: WEEK_LENGTH
  });

  legend.innerHTML = `<strong>${title}</strong> ${body}`;
}

function applyLanguage() {
  const html = document.documentElement;
  html.lang = t('htmlLang');

  document.title = t('pageTitle');

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText('page-title', t('pageHeading'));
  setText('page-subtitle', t('pageSubtitle'));
  setText('btn-generate', t('buttonPlanThisWeek'));
  setText('btn-new-week', t('buttonPlanNextWeek'));

  setText('th-day', t('headerDay'));
  setText('th-dish', t('headerDish'));
  setText('th-kcal', t('headerKcal'));
  setText('th-protein', t('headerProtein'));
  setText('th-carbs', t('headerCarbs'));
  setText('th-fat', t('headerFat'));

  const thKcal = document.getElementById('th-kcal');
  const thProtein = document.getElementById('th-protein');
  const thCarbs = document.getElementById('th-carbs');
  const thFat = document.getElementById('th-fat');

  if (thKcal) thKcal.title = t('titleKcal');
  if (thProtein) thProtein.title = t('titleProtein');
  if (thCarbs) thCarbs.title = t('titleCarbs');
  if (thFat) thFat.title = t('titleFat');

  const enBtn = document.getElementById('lang-en');
  const elBtn = document.getElementById('lang-el');
  if (enBtn) enBtn.classList.toggle('active', currentLang === 'en');
  if (elBtn) elBtn.classList.toggle('active', currentLang === 'el');

  updateVarietyLegend();
  refreshStatusLanguage();

  if (previousPlan) {
    renderPlan(previousPlan);
  }
}

function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'el') return;
  if (lang === currentLang) return;
  currentLang = lang;
  persistLanguage(lang);
  applyLanguage();
}

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function consultText(session, text) {
  return new Promise((resolve, reject) => {
    session.consult(text, {
      success: resolve,
      error: (err) => reject(new Error(pl.format_answer(err)))
    });
  });
}

function queryOnce(session, goal) {
  const normalizedGoal = goal.trim().endsWith('.') ? goal.trim() : `${goal.trim()}.`;
  return new Promise((resolve, reject) => {
    session.query(normalizedGoal, {
      success: () => {
        session.answer({
          success: (answer) => resolve(answer),
          error: (err) => reject(new Error(pl.format_answer(err))),
          fail: () => resolve(null),
          limit: () => resolve(null)
        });
      },
      error: (err) => reject(new Error(pl.format_answer(err)))
    });
  });
}

function termToArray(term) {
  const result = [];
  let cur = term;
  while (cur && cur.indicator !== './0') {
    if (cur.id === '[]') break;
    if (cur.args && cur.args.length === 2) {
      const head = cur.args[0];
      result.push(head.id ?? head.value ?? String(head));
      cur = cur.args[1];
    } else {
      break;
    }
  }
  return result;
}

function buildDishMap(text) {
  const map = {};
  const re = /dish\(\s*(\w+)\s*,\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    map[m[1]] = m[2];
  }
  return map;
}

function buildNutritionMap(text) {
  const map = {};
  const re = /dish\(\s*(\w+)\s*,\s*'[^']*'\s*,\s*\w+\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    map[m[1]] = {
      calories: parseInt(m[2], 10),
      protein: parseInt(m[3], 10),
      carbs: parseInt(m[4], 10),
      fat: parseInt(m[5], 10)
    };
  }
  return map;
}

async function createSession(knowledge, planner) {
  const session = pl.create(5000);
  await consultText(session, knowledge);
  await consultText(session, planner);
  return session;
}

function renderPlan(ids) {
  const tbody = document.querySelector('#plan-table tbody');
  const tfoot = document.querySelector('#plan-table tfoot');
  if (!tbody || !tfoot) return;

  tbody.innerHTML = '';

  let totCal = 0;
  let totPro = 0;
  let totCarb = 0;
  let totFat = 0;

  ids.forEach((id, i) => {
    const n = nutritionMap[id] ?? {};
    totCal += n.calories ?? 0;
    totPro += n.protein ?? 0;
    totCarb += n.carbs ?? 0;
    totFat += n.fat ?? 0;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${dayLabel(i)}</td>
      <td>${dishLabel(id)}</td>
      <td>${n.calories ?? '-'}</td>
      <td>${n.protein ?? '-'}</td>
      <td>${n.carbs ?? '-'}</td>
      <td>${n.fat ?? '-'}</td>
    `;
    tbody.appendChild(tr);
  });

  tfoot.innerHTML = `
    <tr class="totals-row">
      <td colspan="2"><strong>${t('totalsRow')}</strong></td>
      <td><strong>${totCal}</strong></td>
      <td><strong>${totPro}</strong></td>
      <td><strong>${totCarb}</strong></td>
      <td><strong>${totFat}</strong></td>
    </tr>
  `;
}

async function generatePlan(enforceVariety) {
  const btnGenerate = document.getElementById('btn-generate');
  const btnNewWeek = document.getElementById('btn-new-week');

  setStatusT('statusPlanning', 'info');
  if (btnGenerate) btnGenerate.disabled = true;
  if (btnNewWeek) btnNewWeek.disabled = true;

  try {
    let plan = null;
    let attempts = 0;
    const MAX = 80;

    const session = await createSession(knowledgeText, plannerText);
    const allDishIds = Object.keys(dishMap);
    const allowedOverlap = getAllowedOverlap(allDishIds.length);

    while (attempts < MAX) {
      attempts++;

      const shuffled = shuffle(allDishIds);
      const goal = `plan_week_from([${shuffled.join(',')}], Plan)`;
      const answer = await queryOnce(session, goal);
      if (!answer) continue;

      const planTerm = answer.links?.Plan;
      if (!planTerm) continue;

      const ids = termToArray(planTerm);
      if (ids.length !== WEEK_LENGTH) continue;

      if (enforceVariety && previousPlan) {
        const overlap = ids.filter((id) => previousPlan.includes(id));
        if (overlap.length > allowedOverlap) continue;
      }

      plan = ids;
      break;
    }

    if (!plan) {
      if (enforceVariety) {
        setStatusT('statusCouldNotFindPlanVariety', 'error', {
          max: MAX,
          allowedOverlap
        });
      } else {
        setStatusT('statusCouldNotFindPlan', 'error', { max: MAX });
      }
      return;
    }

    renderPlan(plan);
    previousPlan = plan;
    if (btnNewWeek) btnNewWeek.disabled = false;

    if (enforceVariety) {
      setStatusT('statusNewWeekPlanned', 'success', { allowedOverlap });
    } else {
      setStatusT('statusWeekReady', 'success');
    }
  } catch (e) {
    setStatusT('statusError', 'error', { error: e.message });
  } finally {
    if (btnGenerate) btnGenerate.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const btnGenerate = document.getElementById('btn-generate');
  const btnNewWeek = document.getElementById('btn-new-week');
  const btnLangEn = document.getElementById('lang-en');
  const btnLangEl = document.getElementById('lang-el');

  if (btnGenerate) btnGenerate.disabled = true;
  if (btnNewWeek) btnNewWeek.disabled = true;

  applyLanguage();
  setStatusT('statusInitialising', 'info');

  try {
    dishMap = buildDishMap(knowledgeText);
    nutritionMap = buildNutritionMap(knowledgeText);
    updateVarietyLegend();

    await createSession(knowledgeText, plannerText);

    setStatusT('statusReady', 'success');
    if (btnGenerate) btnGenerate.disabled = false;
  } catch (e) {
    setStatusT('statusInitError', 'error', { error: e.message });
    return;
  }

  if (btnGenerate) {
    btnGenerate.addEventListener('click', () => generatePlan(false));
  }

  if (btnNewWeek) {
    btnNewWeek.addEventListener('click', () => generatePlan(true));
  }

  if (btnLangEn) {
    btnLangEn.addEventListener('click', () => setLanguage('en'));
  }

  if (btnLangEl) {
    btnLangEl.addEventListener('click', () => setLanguage('el'));
  }
});
