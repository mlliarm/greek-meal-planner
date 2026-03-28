% plan_week_from(+OrderedDishes, -Plan)
% Called from JS with a pre-shuffled list so each attempt explores a different
% search space without depending on the lists module.
plan_week_from(AllDishes, Plan) :-
    select_n(7, AllDishes, Plan),
    nutritionally_balanced(Plan).

% select_n(+N, +List, -Selection)
% Picks N distinct elements from List by removing each selected dish.
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

% ─── Nutritional balance ─────────────────────────────────────────────────────
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

% ─── Category coverage ───────────────────────────────────────────────────────
% Every category must be represented at least once in the plan.
covers_all_categories(Plan) :-
    findall(C, category(C), Cats),
    maplist(category_represented(Plan), Cats).

category_represented(Plan, Cat) :-
    member(Id, Plan),
    dish(Id, _, Cat, _, _, _, _).
