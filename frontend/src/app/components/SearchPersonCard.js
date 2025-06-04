"use client"

import Link from "next/link";
import {useState} from "react";


export default function SearchPersonCard({person}) {
    const [imgLoaded, setImgLoaded] = useState(false);
    const url = `/persons/${person.id}`;

    return (
        <Link href={url}>
            <div
                key={person.id}
                className="flex w-full gap-2 bg-gray-100 rounded p-2 hover:bg-gray-200 cursor-pointer">
                    {!imgLoaded && (
                        <div className="relative overflow-hidden rounded h-[90px] w-16 bg-gray-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 animate-[shimmer_2s_infinite]" />
                        </div>
                    )}
                    <img className="w-16 h-auto rounded" src={
                                                                ((person?.photo || "/base_poster.svg").replace("https:https://", "https://"))
                                                            }
                         alt={person?.name}
                         onLoad={() => setImgLoaded(true)}
                    />
                    <div className="flex flex-col justify-center">
                        <p className="text-sm font-medium text-black">{person?.name}</p>
                    </div>
            </div>
        </Link>
    )
}