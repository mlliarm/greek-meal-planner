% ─── Categories ────────────────────────────────────────────────────────────────
% category(Name)
category(pasta).
category(meat_with_side).
category(legumes).
category(vegetables).
category(egg_based).

% ─── Dishes ──────────────────────────────────────────────────────────────────
% dish(Id, Label, Category, Calories, Protein, Carbs, Fat)
% Nutritional values are approximate per serving (kcal, g, g, g)

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

% ─── Weekly nutritional targets (total across 7 dinners) ─────────────────────
% weekly_target(Macro, Target)
weekly_target(calories, 4200).  % ~600 kcal/meal avg
weekly_target(protein,   210).  % ~30 g/meal avg
weekly_target(carbs,     350).  % ~50 g/meal avg
weekly_target(fat,       140).  % ~20 g/meal avg

% Allowed deviation from each weekly target (15%)
tolerance(0.15).
