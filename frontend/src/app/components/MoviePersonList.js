import Link from "next/link";
import PersonFilmLike from "@/app/components/PersonFilmLink";

export default function MoviePersonList({filmData, title, filterValue, description}) {
    return (
        <>
        {filmData.persons !== null && filmData.persons.filter(p => p.profession === filterValue).length > 0 &&
            <div className="flex flex-col mb-6">
                <div className="mb-2">
                    <Link className="flex gap-2" href={`/films/${filmData.id}/cast`}>
                        <h3 className="font-bold text-sm">{title}</h3>
                        <img src="/icon_next.svg" alt={"next"}/>
                    </Link>
                </div>
                <div>
                    {filmData.persons.filter(p => p.profession === filterValue)
                        // || p.enProfession === 'actor')
                        .slice(0, 10)
                        .map((data, index) => (
                            <div key={index}>
                                <PersonFilmLike data={data}/>
                            </div>
                        ))}
                </div>
                <div className="mt-2">
                    <Link href="">
                        <span
                            className="text-xs font-thin text-orange-600">{filmData.persons.filter(p =>
                            p.profession === filterValue).length} {description}</span>
                    </Link>
                </div>
            </div>}
        </>
    )
}