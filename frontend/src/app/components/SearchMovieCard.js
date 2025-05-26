import Link from "next/link";

export default function App({movie}) {

    const url = movie.isSeries ? `/series/${movie.id}` : `/films/${movie.id}`;

    return (
        <Link href={url}>
            <div
                key={movie.id}
                className="flex w-full gap-2 bg-gray-100 rounded p-2 hover:bg-gray-200 cursor-pointer">
                    <img className="w-16 h-auto rounded" src={movie?.poster?.url ? movie?.poster?.url : "/base_poster.svg"}
                         alt={movie?.name}/>
                    <div className="flex flex-col justify-center">
                        <p className="text-sm font-medium text-black">{movie?.name}</p>
                    </div>
            </div>
        </Link>
    )
}