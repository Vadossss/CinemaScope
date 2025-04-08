import Link from "next/link";

export default function App({ data }) {

    const ratingColor = data.rating.kp > 7.1 ? "#3bb33b" : data.rating.kp > 4.1 ? "#777" : "#ff1414";

    return (
        <div className="w-[150px]">
            <Link href="/">
                {data?.poster?.previewUrl !== null && data?.poster?.previewUrl ? (
                    <img className="object-contain h-[225px]" src={data.poster.previewUrl} alt="Постер" />
                ) : (
                    <img className="object-contain h-[225px]" src="icon_movie.svg" alt="Постер" />
                )}

                <div className={`absolute absolute top-2 start-2 pr-2 pl-2 text-sm`}
                    style={{ backgroundColor: ratingColor }}>
                    <p>{(data.rating.kp).toFixed(1)}</p>
                </div>
                <div className="flex flex-col mt-1">
                    <span className="text-base font-medium">{data.name !== null ? data.name : data.alternativeName}</span>
                    <span className="text-xs font-thin text-gray-500">{data.year}{Array.isArray(data.genres) && data.genres[0]?.name ? `, ` + data.genres[0].name : ""}</span>
                </div>
            </Link>
        </div>
    )
}