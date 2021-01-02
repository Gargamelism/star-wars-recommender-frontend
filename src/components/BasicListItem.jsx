import React from "react";

export default function BasicListItem({ name }) {
    return (
        <span key={name} className="flex-grow text-center border-2 rounded border-gray-400 m-1 px-1">{name}</span>
    );
}