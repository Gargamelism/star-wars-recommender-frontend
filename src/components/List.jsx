import React from 'react';

export default function List ({ filterVal, listItem, items }) {
    
    const filteredItems = items.filter(({name}) => (
        name.toLowerCase().includes(filterVal.toLowerCase())
        ))
        .map((item) => (listItem(item)));



    return (
        <div className="flex justify-center w-9/12">
            {filteredItems.length > 0 ? filteredItems : 'The Force is weak with this search'}
        </div>
    );
}