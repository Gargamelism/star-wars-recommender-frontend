import React from "react";
import { Link } from "react-router-dom";

export default function ButtonLink({ value, to, params }) {
    
    return (
        <Link to={to} params={params} className="w-1/2 rounded-lg text-center text-white bg-blue-500 hover:bg-blue-600 border-black border-2">{value}</Link>
    );
}