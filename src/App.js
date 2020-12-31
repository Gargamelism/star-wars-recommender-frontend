import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import ChooseCharacters from './components/ChooseCharacters';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/">
                        <ChooseCharacters />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
