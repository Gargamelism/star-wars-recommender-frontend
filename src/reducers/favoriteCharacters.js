import { getCookie } from "../util/cookies";

export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const ADD_MULTIPLE = "ADD_MULTIPLE";

export const INITIAL_FAVORITE_CHARACTERS = [];

export const favoriteCharactersReducer = (favoriteCharacters, action) => {
    let newFavorites = favoriteCharacters;

    switch(action.type) {
        case ADD_FAVORITE:
            newFavorites = [...favoriteCharacters, action.payload];
            break;
        case REMOVE_FAVORITE:
            newFavorites = favoriteCharacters.filter(character => (character !== action.payload));
            break;
        case ADD_MULTIPLE:
            newFavorites = [...favoriteCharacters, ...action.payload];
            break;
        default:
            console.log(`unknown action.type <${action.type}>`);
    }

    newFavorites = [...new Set(newFavorites)];

    const userId = getCookie("userid");
    const uri = `http://localhost:8000/api/v1/favorite-characters/${userId}`;
    const body = {
        user_id: userId,
        favorite_characters: newFavorites
    };

    if(userId) {
        fetch(uri, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }

    return newFavorites;
};