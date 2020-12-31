
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const INITIAL_FAVORITE_CHARACTERS = [];

export const favoriteCharactersReducer = (favoriteCharacters, action) => {
    switch(action.type) {
        case ADD_FAVORITE:
            return [...favoriteCharacters, action.payload];
        case REMOVE_FAVORITE:
            return favoriteCharacters.filter(character => (character != action.payload));
    }
};