import { favoriteCharactersReducer, ADD_FAVORITE, REMOVE_FAVORITE, ADD_MULTIPLE } from "../reducers/favoriteCharacters";

it("performs ADD_FAVORITE favoriteCharacters reductions", () => {
    expect(favoriteCharactersReducer(["1"], {type: ADD_FAVORITE,
                                             payload: "2"}))
        .toEqual(["1", "2"]);
    expect(favoriteCharactersReducer(["1"], {type: ADD_FAVORITE,
                                             payload: "1"}))
        .toEqual(["1"]);
});

it("performs REMOVE_FAVORITE favoriteCharacters reductions", () => {
    expect(favoriteCharactersReducer(["1"], {type: REMOVE_FAVORITE,
                                             payload: "1"}))
        .toEqual([]);
    expect(favoriteCharactersReducer(["1", "2"], {type: REMOVE_FAVORITE,
                                             payload: "1"}))
        .toEqual(["2"]);
});

it("performs ADD_MULTIPLE favoriteCharacters reductions", () => {
    expect(favoriteCharactersReducer(["1"], {type: ADD_MULTIPLE,
                                             payload: ["1", "2"]}))
        .toEqual(["1", "2"]);
    expect(favoriteCharactersReducer([], {type: ADD_MULTIPLE,
                                             payload: ["1", "2"]}))
        .toEqual(["1", "2"]);
});

it("performs unkown favoriteCharacters reductions", () => {
    expect(favoriteCharactersReducer(["1"], {type: "unkown",
                                             payload: ["1", "2"]}))
        .toEqual(["1"]);
    expect(favoriteCharactersReducer([], {type: "unkown",
                                             payload: ["1", "2"]}))
        .toEqual([]);
});