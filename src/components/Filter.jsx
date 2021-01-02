import React from "react";

export default function Filter ({ setFilterVal, placeholder = "" }) {
    
    const handleFilterInput = (event) => {
        event.preventDefault();

        setFilterVal(event.target.value);
    };

    return (
        <input 
            type="text" 
            id="characters-filter" 
            className="w-full rounded-lg border-black border-2 mr-0 md:mr-2 mb-2 md:mb-0" 
            onChange={handleFilterInput} 
            placeholder={placeholder}
        />
    );
}