import Link from "next/link";
import PersonFilmLike from "@/app/components/PersonFilmLink";
import MoviePersonList from "@/app/components/MoviePersonList";

export default function App({filmData}) {

    const categories = [
        { name: "Год производства", value: filmData?.year || '-' },
        { name: "Страна", value: filmData?.countries[0]?.name || '-' },
        { name: "Жанр", value: filmData?.genres.map(g => g.name).join(', ') },
        { name: "Слоган", value: filmData?.slogan || '-' },
        {
            name: "Режиссер", value: filmData?.persons?.filter((p) => p.profession === "режиссеры"
                || p.enProfession === 'director')?.map(p => p.name || p.enName)?.filter(Boolean)?.join(", ") || '-'
        },
        {
            name: "Сценарий", value: filmData?.persons?.filter((p) => p.profession === "сценаристы"
                || p.enProfession === 'writer')?.map(p => p.name || p.enName)?.filter(Boolean)?.join(", ") || '-'
        },
        {
            name: "Продюсер", value: filmData?.persons?.filter((p) => p.profession === "продюсеры"
                || p.enProfession === 'producer')?.map(p => p.name || p.enName)?.filter(Boolean)?.join(", ") || '-'
        },
        {
            name: "Оператор", value: filmData?.persons?.filter((p) => p.profession === "операторы"
                || p.enProfession === 'operator')?.map(p => p.name || p.enName)?.filter(Boolean)?.join(", ") || '-'
        },
        {
            name: "Композитор", value: filmData?.persons?.filter((p) => p.profession === "композиторы"
                || p.enProfession === 'composer')?.map(p => p.name || p.enName)?.filter(Boolean)?.join(", ") || '-'
        },
        {
            name: "Художник", value: filmData?.persons?.filter((p) => p.profession === "художники"
                || p.enProfession === 'designer')?.map(p => p.name || p.enName)?.filter(Boolean)?.join(", ") || '-'
        },
        {
            name: "Монтаж", value: filmData?.persons?.filter((p) => p.profession === "монтажеры"
                || p.enProfession === 'editor')?.map(p => p.name || p.enName)?.filter(Boolean)?.join(", ") || '-'
        },
        { name: "Бюджет", value: filmData?.budget?.currency + filmData?.budget?.value.toLocaleString("ru-RU") || '-' },
        { name: "Сборы в США", value: filmData?.fees?.usa?.currency + filmData?.fees?.usa?.value.toLocaleString("ru-RU") || '-' },
        { name: "Сборы в мире", value: filmData?.fees?.world?.currency + filmData?.fees?.world?.value.toLocaleString("ru-RU") || '-' },
        {
            name: "Премьера в мире", value: new Date(filmData?.premiere?.world).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric"
            }) || '-'
        },
        { name: "Рейтинг MPAA", value: filmData?.ratingMpaa || '-' },
    ];

    return (
        <div className="flex gap-10 pt-10">
            <div className="w-[600px]">
                <h1 className="mb-2">
                    <span className="text-xl font-bold">О фильме</span>
                </h1>
                {categories.map((data, index) => (
                    <div key={index} className="flex">
                        <div className="w-[160px]">
                            <span className="text-sm text-gray-500">{data.name}</span>
                        </div>
                        <div className="flex-1">
                            <span className="text-sm">{data.value}</span>
                        </div>
                    </div>
                ))}
                <div className="flex">
                    <div className="w-[160px]">
                        <span className="text-sm text-gray-500">Возраст</span>
                    </div>
                    <div className="flex-1 ">
                        <span className="text-sm border-2 pl-1 pr-1">{filmData.ageRating + '+' || '-'}</span>
                    </div>
                </div>

            </div>
            <div>
                <div className="w-[160px]">
                    <MoviePersonList
                        filmData={filmData}
                        title={"В главных ролях"}
                        filterValue={"актеры"}
                        description={"актёров"} />
                    <MoviePersonList
                        filmData={filmData}
                        title={"Роли дублировали"}
                        filterValue={"актеры дубляжа"}
                        description={"актёров"} />
                </div>
            </div>
        </div>
    )
}