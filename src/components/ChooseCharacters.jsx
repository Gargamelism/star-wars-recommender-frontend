import { useEffect, useState } from "react";

import SWData from "../util/SWData";

import { ADD_FAVORITE, REMOVE_FAVORITE } from "../reducers/favoriteCharacters";

import ButtonLink from "./ButtonLink";
import CheckboxCard from "./CheckboxCard";
import Filter from "./Filter";
import List from "./List";

export default function ChooseCharacters({favoriteCharacters, dispatchFavoriteCharacters}) {
    const [filterVal, setFilterVal] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
    
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
            const charactersList = characters.map(character => (
                {
                    ...character,
                    value: character.url,
                    isChecked: favoriteCharacters.indexOf(character.url) !== -1,
                    handleChecked: handleChecked
                }
            ));

            setCharacters(charactersList);
            setIsLoading(false);

        });

    }, [isLoading, favoriteCharacters]);

    useEffect(() => {
        const updatedCharacters = characters.map(character => {
            return {
                ...character,
                isChecked: favoriteCharacters.indexOf(character.url) !== -1
            }
        });

        setCharacters(updatedCharacters);
    }, [favoriteCharacters]);

    const emptyListMsg = "The Force is weak with this search";

    return (
        <div className="container mx-auto py-16 flex flex-col items-center max-w-lg max-h-lg">
            <div className="flex items-center justify-center h-5/6 w-full my-2">
                <h1 className="absolute text-center text-white text-2xl">
                    Get Star Wars Movie Recommendations
                </h1>
                <img src={process.env.PUBLIC_URL + "/header-image.jpg"} />
            </div>
            <div className="flex flex-col items-center md:flex-row w-full">
                <Filter setFilterVal={setFilterVal} placeholder="Start typing to search for a character" />
                <ButtonLink value="Suggest!" to="/suggestion-list" params={favoriteCharacters} />
            </div>
            {
                isLoading ?
                    <span>Loading...</span> :
                    <div className="flex flex-col items-center">
                        <h1>Please Select Your Favorite Characters:</h1>
                        <List filterVal={filterVal} listItem={CheckboxCard} items={characters} emptyListMsg={emptyListMsg} />
                    </div>
            }
        </div>
    );
}
