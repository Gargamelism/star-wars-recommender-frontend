
export default class SWData {
    constructor() {
        this.BASE_URI = "http://swapi.dev/api/";
        this.PEOPLE_PATH = "people/";
        this.MOVIES_PATH = "films/";

        this.people = [];
        this.movies = [];
    }

    async getCharacters() {
        let nextPageUri = "";
        try {
            do {
                const uri = nextPageUri || `${this.BASE_URI}${this.PEOPLE_PATH}`;
                const response = await (await fetch(uri)).json();
                nextPageUri = response.next;
    
                this.people = this.people.concat(response.results.map(({name, url}) => ({name, url})));
            } while(nextPageUri !== null)
        } catch(e) {
            console.error(e);
        }

        return this.people;
    }

    async getMovies() {
        try {
            const uri = `${this.BASE_URI}${this.MOVIES_PATH}`;
            const response = await (await fetch(uri)).json();
            this.movies = response.results.map(({title, characters, release_date}) => ({
                characters,
                release_date: new Date(release_date),
                name: title
            }));
        } catch(e) {
            console.error(e);
        }

        return this.movies;
    }
}