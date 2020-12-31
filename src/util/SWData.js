
export default class SWData {
    constructor() {
        this.BASE_URI = 'http://swapi.dev/';
        this.PEOPLE_PATH = 'api/people/';

        this.people = [];
    }

    async getCharacters() {
        let nextPageUri = '';
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
}