
export function countFavoriteCharacters(favoriteCharacters, characters) {
    return favoriteCharacters.filter((character) => 
            (characters.indexOf(character) !== -1)
        ).length;
}

export function getFavoriteCharacters(id) {
    return fetch(`http://localhost:8000/api/v1/favorite-characters/${id}`)
            .then((response) => (response.json()))
            .then((response) => {
                if(response.detail === "Not found.") {
                    return [];
                }
                return response.favorite_characters;
            });
}