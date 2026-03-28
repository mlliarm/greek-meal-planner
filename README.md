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

## Source Of Truth

The runtime source of truth is in `app.js`:

- `KNOWLEDGE_PL` and `PLANNER_PL` are embedded and consulted directly by Tau Prolog in the browser.
- `knowledge.pl` and `planner.pl` are kept as human-readable snapshots for reference and review.
- If there is ever a mismatch, treat `app.js` as authoritative and update snapshot files accordingly.

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
- [knowledge.pl](knowledge.pl): Snapshot of the embedded knowledge base in `app.js` (not required at runtime).
- [planner.pl](planner.pl): Snapshot of the embedded planner rules in `app.js` (not required at runtime).
- [.nojekyll](.nojekyll): Prevents GitHub Pages Jekyll processing.

## Future Improvements

- Add dish editor UI (add/remove dishes without code changes).
- Add hard category constraints per week.
- Add shopping list generation from selected plan.
- Add printable weekly menu view.
