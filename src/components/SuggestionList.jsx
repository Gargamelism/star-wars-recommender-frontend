import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getCookie, setCookie } from "../util/cookies";
import { countFavoriteCharacters, getFavoriteCharacters } from "../util/favoriteCharacters";
import SWData from "../util/SWData";

import BasicListItem from "./BasicListItem";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import List from "./List";

export default function SuggestionList({ id, favoriteCharacters }) {
    const [externalId, setExternalId] = useState(useParams());
    const [stateFavoriteCharacters, setFavoriteCharacters] = useState(favoriteCharacters);
    const [stateId, setId] = useState(id);
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [isShareable, setIsShareable] = useState(true);
    const [shareLink, setShareLink] = useState(false);
    const [goBackText, setGoBackText] = useState("Change your favorites");

    useEffect(() => {
        if(externalId.externalId) {
            setGoBackText("Choose your own favorites");
            setIsShareable(false);
            setId(externalId.externalId);
            getFavoriteCharacters(externalId.externalId)
                .then((favoriteCharacters) => {
                    setFavoriteCharacters(favoriteCharacters);
                });
        }
        else if(!stateId && stateFavoriteCharacters.length == 0) {
            const userId = getCookie("userid");
            setId(userId);
            getFavoriteCharacters(userId)
                .then((favoriteCharacters) => (setFavoriteCharacters(favoriteCharacters)));
        }
    }, []);

    const handleCreateShareLink = () => {
        const newShareLink = `http://localhost:3000/suggestion-list/${stateId}`;
        navigator.clipboard.writeText(newShareLink)
        setShareLink(newShareLink);
    };

    useEffect(() => {
        const swData = new SWData();
        swData.getMovies().then((movies) => {

            movies.sort((movieA, movieB) => {
                const movieAFavoriteCharactersCount = countFavoriteCharacters(stateFavoriteCharacters, movieA.characters);
                const movieBFavoriteCharactersCount = countFavoriteCharacters(stateFavoriteCharacters, movieB.characters);
                
                if(movieAFavoriteCharactersCount > 0 || movieBFavoriteCharactersCount > 0) {
                    if(movieAFavoriteCharactersCount > movieBFavoriteCharactersCount) {
                        return -1;
                    }
                    if(movieBFavoriteCharactersCount > movieAFavoriteCharactersCount) {
                        return 1;
                    }
                }

                if(movieA.release_date > movieB.release_date) {
                    return 1;
                }
                if(movieB.release_date > movieA.release_date) {
                    return -1;
                }

                return 0;
            });

            setMovies(movies);
            setIsLoading(false);

        });

    }, [stateId, stateFavoriteCharacters.length]);

    return (
        <div className="container mx-auto py-16 flex flex-col items-center max-w-lg max-h-lg">
            <div className="flex items-center justify-center h-5/6 w-full my-2">
                <h1 className="absolute text-center text-white text-2xl">
                    Your Movie Recommendations
                </h1>
                <img src={process.env.PUBLIC_URL + "/header-image.jpg"} />
            </div>
            <div className="flex flex-col justify-center items-center w-full">
                {
                    isShareable && <Button value="Share!" onClick={handleCreateShareLink} />
                }
                { 
                    shareLink && 
                    <>
                        <a href={shareLink} target="_blank" className="w-max text-blue-500 hover:text-blue-700 hover:underline">{shareLink}</a>
                        <span>Link has been copied to your clipboard!</span>
                    </>
                }
            </div>
            {
                isLoading ?
                    <span>Loading...</span> :
                    <div className="flex flex-col items-center">
                        <List filterVal="" listItem={BasicListItem} items={movies} emptyListMsg="" />
                    </div>
            }
            <ButtonLink value={goBackText} to="/" params="" />
        </div>
    );
}
