import React from 'react';

export default function CheckboxCard({ isChecked, name, handleChecked }) {
    
    const checked = isChecked ? 'checked' : '';

    return (
        <div key={name} className="flex justify-around items-center border-2 rounded border-gray-400 m-2 w-full md:w-96">
            <input type="checkbox" value={name} defaultChecked={checked} onClick={handleChecked} className="flex-none w-8" />
            <span className="flex-grow text-center">{name}</span>
        </div>
    );
}