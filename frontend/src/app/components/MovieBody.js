import Link from "next/link";
import PersonFilmLike from "@/app/components/PersonFilmLink";
import MoviePersonList from "@/app/components/MoviePersonList";

export default function App({ filmData }) {

    const formatPersons = (professionRu, professionEn) => {
        const persons = filmData?.persons?.filter(p =>
            p.profession === professionRu || p.enProfession === professionEn
        ) || [];
        return persons.map(p => p.name || p.enName).filter(Boolean).join(", ");
    };

    const formatMoney = (data) => {
        if (data?.currency && data?.value != null) {
            return data.currency + data.value.toLocaleString("ru-RU");
        }
        return null;
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        if (isNaN(date)) return null;
        return date.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const pluralizeMinutes = (num) => {
        const lastDigit = num % 10;
        const lastTwoDigits = num % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return `${num} минут`;
        }

        if (lastDigit === 1) {
            return `${num} минута`;
        }

        if (lastDigit >= 2 && lastDigit <= 4) {
            return `${num} минуты`;
        }

        return `${num} минут`;
    };

    const categories = [
        { name: "Год производства", value: filmData?.year },
        { name: "Страна", value: filmData?.countries?.[0]?.name },
        { name: "Жанр", value: filmData?.genres?.map(g => g.name).join(', ') },
        { name: "Слоган", value: filmData?.slogan },
        { name: "Длина серии", value: filmData?.seriesLength != null ? pluralizeMinutes(filmData.seriesLength) : null },
        { name: "Режиссер", value: formatPersons("режиссеры", "director") },
        { name: "Сценарий", value: formatPersons("сценаристы", "writer") },
        { name: "Продюсер", value: formatPersons("продюсеры", "producer") },
        { name: "Оператор", value: formatPersons("операторы", "operator") },
        { name: "Композитор", value: formatPersons("композиторы", "composer") },
        { name: "Художник", value: formatPersons("художники", "designer") },
        { name: "Монтаж", value: formatPersons("монтажеры", "editor") },
        { name: "Бюджет", value: formatMoney(filmData?.budget) },
        { name: "Сборы в США", value: formatMoney(filmData?.fees?.usa) },
        { name: "Сборы в мире", value: formatMoney(filmData?.fees?.world) },
        { name: "Премьера в мире", value: formatDate(filmData?.premiere?.world) },
        { name: "Рейтинг MPAA", value: filmData?.ratingMpaa },
    ];

    return (
        <div className="flex gap-10 pt-10">
            <div className="w-[600px]">
                <h1 className="mb-2">
                    <span className="text-xl font-bold">О фильме</span>
                </h1>

                {categories.filter(cat => cat.value).map((data, index) => (
                    <div key={index} className="flex mb-1">
                        <div className="w-[160px]">
                            <span className="text-sm text-gray-500">{data.name}</span>
                        </div>
                        <div className="flex-1">
                            <span className="text-sm">{data.value}</span>
                        </div>
                    </div>
                ))}

                {filmData?.ageRating && (
                    <div className="flex mb-1">
                        <div className="w-[160px]">
                            <span className="text-sm text-gray-500">Возраст</span>
                        </div>
                        <div className="flex-1">
                            <span className="text-sm border-2 pl-1 pr-1">{filmData.ageRating + '+'}</span>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <div className="w-[160px]">
                    <MoviePersonList
                        filmData={filmData}
                        title="В главных ролях"
                        filterValue="актеры"
                        description="актёров"
                    />
                    <MoviePersonList
                        filmData={filmData}
                        title="Роли дублировали"
                        filterValue="актеры дубляжа"
                        description="актёров"
                    />
                </div>
            </div>
        </div>
    );
}
