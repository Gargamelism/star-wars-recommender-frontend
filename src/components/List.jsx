import React from "react";

export default function List ({ filterVal, listItem, items, emptyListMsg }) {
    if(!items) {
        return (<span>{emptyListMsg}</span> );
    }

    const filteredItems = items.filter(({name}) => (
        name.toLowerCase().includes(filterVal.toLowerCase())
        ))
        .map((item) => {return listItem(item);});

    return (
        <div className="flex flex-col justify-center items-center w-9/12 md:w-max md:w-1/2">
            { filteredItems.length > 0 ? filteredItems : emptyListMsg }
        </div>
    );
}