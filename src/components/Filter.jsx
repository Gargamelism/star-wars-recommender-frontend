import React from 'react';

export default function Filter ({ setFilterVal, placeholder = '' }) {
    
    const handleFilterInput = (event) => {
        event.preventDefault();

        setFilterVal(event.target.value);
    };

    return (
        <input 
            type="text" 
            id="characters-filter" 
            className="w-9/12 rounded-lg border-black border-2" 
            onChange={handleFilterInput} 
            placeholder={placeholder}
        />
    );
}