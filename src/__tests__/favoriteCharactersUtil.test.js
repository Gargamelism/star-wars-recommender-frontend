import { countFavoriteCharacters } from "../util/favoriteCharacters";

it("counts countFavoriteCharacters", () => {
    expect(countFavoriteCharacters([1], [1, 2, 3]))
        .toEqual(1);
    expect(countFavoriteCharacters([1, 2, 3], [4, 5, 6]))
        .toEqual(0);
});