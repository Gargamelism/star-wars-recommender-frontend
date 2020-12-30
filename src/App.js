import { useState } from 'react';

import CheckboxCard from './components/CheckboxCard';
import Filter from './components/Filter';
import List from './components/List';

function App() {
    const [filterVal, setFilterVal] = useState('');

    return (
        <div className="container mx-auto py-16 flex flex-col items-center">
            <Filter setFilterVal={setFilterVal} />
            <List filterVal={filterVal} listItem={CheckboxCard} items={[{name: "luke", isChecked: true}]} />
        </div>
    );
}

export default App;
