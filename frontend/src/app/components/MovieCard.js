"use client"

import Link from "next/link";
import { fetchAddWishlist } from "../utils/fetchAddWishlist";

export default function App({ data }) {

    const ratingColor = data.rating.kp > 7.1 ? "#3bb33b" : data.rating.kp > 4.1 ? "#777" : "#ff1414";

    return (
        <div className="w-[150px] group/item">
            <Link href={data.isSeries ? `/series/${data.id}` : `/films/${data.id}`}>
                <div className="relative">
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover/item:opacity-100 transition-opacity rounded"></div>
                    {data?.poster?.previewUrl !== null && data?.poster?.previewUrl ? (
                        <img className="object-fit h-[225px] rounded" src={data.poster.previewUrl} alt="Постер" />
                    ) : (
                        <img className="object-contain h-[225px] rounded" src="icon_movie.svg" alt="Постер" />
                    )}
                </div>

                <div className={`absolute absolute top-2 start-2 pr-2 pl-2 text-sm rounded-sm`}
                    style={{ backgroundColor: ratingColor }}>
                    <p className="text-white font-bold">{(data.rating.kp).toFixed(1)}</p>
                </div>

                <div className={`absolute top-[7px] right-4 pr-2 pl-2 text-sm rounded-sm invisible group-hover/item:visible`}>
                    <button
                        onClick={() => fetchAddWishlist(data.id, "planned")}
                        title="Буду смотреть">
                        <img className="-scale-100" src="icon_add.svg"></img>
                    </button>
                </div>

                <div className="flex flex-col mt-1">
                    <span className="text-base font-medium line-clamp-2 group-hover/item:text-orange-700">{data.name !== null ? data.name : data.alternativeName}</span>
                    <span className="text-xs font-thin text-gray-500">{data.year}{Array.isArray(data.genres) && data.genres[0]?.name ? `, ` + data.genres[0].name : ""}</span>
                </div>
            </Link>
        </div>
    )
}