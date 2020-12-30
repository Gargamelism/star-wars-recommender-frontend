import React from 'react';

export default function CheckboxCard({ isChecked, name }) {
    
    const checked = isChecked ? 'checked' : '';

    return (
        <div className="flex justify-around items-center border-2 rounded border-gray-400 m-5 w-9/12">
            <input type="checkbox" value={name} defaultChecked={checked} className="flex-none w-8" />
            <span className="flex-grow">{name}</span>
        </div>
    );
}