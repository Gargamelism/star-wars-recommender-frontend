import { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ChooseCharacters from "./components/ChooseCharacters";
import SuggestionList from "./components/SuggestionList";

import { getCookie, setCookie } from "./util/cookies";
import { getFavoriteCharacters } from "./util/favoriteCharacters";

import { favoriteCharactersReducer, ADD_MULTIPLE, INITIAL_FAVORITE_CHARACTERS } from "./reducers/favoriteCharacters";

function App() {
    const [favoriteCharacters, dispatchFavoriteCharacters] = useReducer(favoriteCharactersReducer, INITIAL_FAVORITE_CHARACTERS);
    const [id, setId] = useState(false);

    useEffect(() => {
        const localId = getCookie("userid");
        setId(localId);
        if (!localId) {
            fetch("http://localhost:8000/api/v1/favorite-characters", {method: "POST"})
                .then((response) => (response.json()))
                .then((response) => {
                    setId(response["userid"]);
                    setCookie("userid", response["userid"]);
                });
        }

    }, []);

    useEffect(() => {
        if (!id) {
            return;
        }

        getFavoriteCharacters(id)
            .then((favoriteCharacters) => {
                    dispatchFavoriteCharacters({
                        type: ADD_MULTIPLE,
                        payload: favoriteCharacters
                    });
                });
        
    }, [id]);

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/suggestion-list/:externalId">
                        <SuggestionList favoriteCharacters={favoriteCharacters} />
                    </Route>
                    <Route path="/suggestion-list">
                        <SuggestionList id={id} favoriteCharacters={favoriteCharacters} />
                    </Route>
                    <Route path="/">
                        <ChooseCharacters favoriteCharacters={favoriteCharacters} dispatchFavoriteCharacters={dispatchFavoriteCharacters} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
