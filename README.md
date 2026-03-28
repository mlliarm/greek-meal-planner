# Greek Meal Planner

A browser-based weekly meal planner for Greek dishes, powered by Tau Prolog in the frontend.

Live URL pattern:

- `https://mlliarm.github.io/greek-meal-planner/`

## What This Project Does

The app generates a 7-day meal plan that tries to satisfy:

1. Nutritional balance (calories, protein, carbs, fat) close to weekly targets.
2. Variety between weeks (limit repeated dishes from previous week).
3. Dish uniqueness within the same week.

The UI supports both English and Greek, with a language switch in the header.

## How It Works

### 1. Knowledge Base (inlined Prolog facts)

In [app.js](app.js), `KNOWLEDGE_PL` defines:

- dish categories
- dish entries with macro values
- weekly macro targets
- tolerance (`15%`)

Each dish has:

- `id`
- label (internal source string)
- category
- `calories`, `protein`, `carbs`, `fat`

### 2. Planner Rules (inlined Prolog rules)

In [app.js](app.js), `PLANNER_PL` defines:

- `plan_week_from(AllDishes, Plan)`
- selection logic for 7 unique dishes
- macro-sum checks against target ranges

The app creates a Tau Prolog session in the browser, consults both Prolog texts, and queries for a valid plan.

### 3. Search Strategy

When planning a week:

1. JavaScript shuffles all dish IDs.
2. It calls `plan_week_from([...], Plan)`.
3. It retries up to a max attempt count until a valid plan is found.

For "Plan Next Week", JavaScript also checks overlap with the previous week and rejects plans above the allowed overlap.

### 4. Variety Constraint

Allowed overlap is computed dynamically from pool size and week length:

- target overlap cap: `floor(weekLength / 2)`
- feasibility floor: `max(0, (2 * weekLength) - poolSize)`
- effective cap: `max(target cap, feasibility floor)`

This avoids impossible constraints when the dish pool is small.

### 5. Localization (EN/EL)

`I18N` dictionaries in [app.js](app.js) provide translations for:

- page title and subtitles
- buttons and table headers
- status/error messages
- day names
- dish display names
- legend text

Language choice is saved to `localStorage`.

## File Structure

- [index.html](index.html): Page structure and language buttons.
- [style.css](style.css): Styling and responsive layout.
- [app.js](app.js): Prolog source, planner logic, rendering, localization.
- [knowledge.pl](knowledge.pl): Reference knowledge file (not required at runtime).
- [planner.pl](planner.pl): Reference planner file (not required at runtime).
- [.nojekyll](.nojekyll): Prevents GitHub Pages Jekyll processing.

## Why README Is Not Visible On The Web App

GitHub Pages renders [index.html](index.html) as the page content.

A README file is repository documentation and is not injected into [index.html](index.html), so adding this file does not change the UI.

## Run Locally

You can open [index.html](index.html) directly in a browser.

Requirements:

- internet access for Tau Prolog CDN script

Optional local server (if you prefer):

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy To GitHub Pages

1. Push this repo to GitHub as `greek-meal-planner`.
2. In GitHub repo settings, enable **Pages** from branch `main` (root).
3. Visit:
   - `https://mlliarm.github.io/greek-meal-planner/`

## Future Improvements

- Add dish editor UI (add/remove dishes without code changes).
- Add hard category constraints per week.
- Add shopping list generation from selected plan.
- Add printable weekly menu view.
