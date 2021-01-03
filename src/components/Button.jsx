import React from "react";

export default function ButtonLink({ value, onClick }) {
    
    return (
        <input type="button" value={value} onClick={onClick} className="w-1/2 rounded-lg text-center text-white bg-blue-500 hover:bg-blue-600 cursor-pointer border-black border-2" />
    );
}