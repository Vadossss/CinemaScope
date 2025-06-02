import Link from "next/link";

export default function SearchPersonCard({person}) {

    const url = `/persons/${person.id}`;

    return (
        <Link href={url}>
            <div
                key={person.id}
                className="flex w-full gap-2 bg-gray-100 rounded p-2 hover:bg-gray-200 cursor-pointer">
                    <img className="w-16 h-auto rounded" src={
                                                                ((person?.photo || "/base_poster.svg").replace("https:https://", "https://"))
                                                            }
                         alt={person?.name}/>
                    <div className="flex flex-col justify-center">
                        <p className="text-sm font-medium text-black">{person?.name}</p>
                    </div>
            </div>
        </Link>
    )
}