"use client"

import {useState} from "react";

function upperCase(word) {
    return word ? word.charAt(0).toUpperCase() + word.slice(1) : '';
}

export default function App({name, onClick}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <button
            className={`rounded-xl p-2 ease-in duration-100 ${isOpen ? "bg-orange-500 text-white" : "bg-gray-200 text-black"}`}
            onClick={(e) => {
                    setIsOpen(!isOpen);
                    onClick(name);
                }
            }
        >
            {upperCase(name)}
        </button>
    )
}