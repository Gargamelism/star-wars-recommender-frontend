import { useEffect, useReducer, useState } from 'react';

import SWData from './util/SWData';

import {favoriteCharactersReducer, ADD_FAVORITE, REMOVE_FAVORITE, INITIAL_FAVORITE_CHARACTERS } from './reducers/favoriteCharacters';

import CheckboxCard from './components/CheckboxCard';
import Filter from './components/Filter';
import List from './components/List';

function App() {
    const [filterVal, setFilterVal] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
    const [favoriteCharacters, dispatchFavoriteCharacters] = useReducer(favoriteCharactersReducer, INITIAL_FAVORITE_CHARACTERS);

    const handleChecked = (event) => {
        const actionType = event.target.checked ? ADD_FAVORITE : REMOVE_FAVORITE;
        dispatchFavoriteCharacters({
            type: actionType,
            payload: event.target.value
        });
    };

    useEffect(() => {
        const swData = new SWData();
        swData.getCharacters().then((characters) => {
            
            const charactersList = characters.map(charcter => (
                {
                    ...charcter,
                    isChecked: false,
                    handleChecked: handleChecked
                }
            ));

            setCharacters(charactersList);
            setIsLoading(false);
        });

    }, [isLoading]);

    useEffect(() => {
        const updatedCharacters = characters.map(character => {
            return {
                ...character,
                isChecked: favoriteCharacters.indexOf(character.name) !== -1
            }
        });

        setCharacters(updatedCharacters);
    }, [favoriteCharacters]);

    const emptyListMsg = "The Force is weak with this search";

    return (
        <div className="container mx-auto py-16 flex flex-col items-center">
            <Filter setFilterVal={setFilterVal} placeholder="Search for character" />
            {
                isLoading ? 
                    <span>Loading...</span> :
                    <List filterVal={filterVal} listItem={CheckboxCard} items={characters} emptyListMsg={emptyListMsg} />
            }
        </div>
    );
}

export default App;
