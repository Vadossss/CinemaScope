"use client";

import { useEffect, useState } from "react";
import { getPersons } from "@/app/utils/fetchAllPersons";
import Link from "next/link";
import { useParams } from "next/navigation";
import {Spinner} from "@heroui/react";

export default function PersonsPage() {
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const personId = params.personId;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [data, error] = await getPersons(page);

      if (error) {
        console.error("Ошибка при получении персон:", error);
        alert("Ошибка при загрузке персон");
        return;
      }

      if (data) {
        setPersons(data.content || []);
        setTotalPages(data.totalPages || 0);
      }
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    fetchData();
  }, [page]);

  const getPageNumbers = () => {
  const maxDisplayedPages = 5; // Сколько страниц отображать (без учёта многоточий)
  const totalPagesArr = [];

  if (totalPages <= maxDisplayedPages) {
    // Если мало страниц, просто выводим все
    for (let i = 0; i < totalPages; i++) {
      totalPagesArr.push(i);
    }
    return totalPagesArr;
  }

  // Всегда добавляем первую страницу
  totalPagesArr.push(0);

  // Вычисляем начальные и конечные номера страниц вокруг текущей
  let start = Math.max(page - 1, 1);
  let end = Math.min(page + 1, totalPages - 2);

  // Добавляем многоточие между первой и средними
  if (page > 2) {
    totalPagesArr.push("...");
  }

  // Добавляем страницы вокруг текущей
  for (let i = start; i <= end; i++) {
    totalPagesArr.push(i);
  }

  // Добавляем многоточие между средними и последней
  if (page < totalPages - 3) {
    totalPagesArr.push("...");
  }

  // Всегда добавляем последнюю страницу
  totalPagesArr.push(totalPages - 1);

  return totalPagesArr;
};
  const fixPhotoUrl = (url) => {
    if (!url) return "/base_poster.svg";
    return url.replace("https:https://","https://");
  };

  if (loading) {
    return (
        <div className="min-h-screen w-full max-w-[1600px] rounded-xl flex justify-center items-center bg-gray-50 px-4">
          <div className=" p-8">
            <Spinner color="warning"/>
          </div>
        </div>
    )
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 rounded-xl min-h-screen w-[1600px]">
      <h1 className="text-3xl font-bold text-black 600 mb-6 text-center">Персоны</h1>
        <>
          {/* Сетка актёров */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {persons.map((person) => (
              <Link key={person.id} href={`/persons/${person.id}`} passHref>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col h-full">
                  <img
                    src={fixPhotoUrl(person.photo)}
                    alt={person.name}
                    className="w-full h-70 object-cover"
                    onError={(e) => {
                      e.target.src = "/base_poster.svg";
                    }}
                  />
                  <div className="p-4 flex-grow">
                    <h2 className="font-semibold text-lg truncate text-black 600">{person.name || person.enName}</h2>
                    <p className="text-sm text-gray-600 mt-1">Возраст: {person.age || "—"}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {person.profession?.map((p) => p.value).join(", ") || "Профессии не указаны"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Пагинация */}
          <div className="mt-10 flex justify-center items-center space-x-2 flex-wrap">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full disabled:opacity-50 transition"
              aria-label="Предыдущая страница"
            >
              <img
                src="/icon_next.svg"
                alt="Назад"
                className="w-5 h-5 transform rotate-180"
              />
            </button>

            {getPageNumbers().map((pageNumber, index) =>
              pageNumber === "..." ? (
                <span key={`dot-${index}`} className="px-2 text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={`page-${pageNumber}`}
                  onClick={() => setPage(pageNumber)}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    pageNumber === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {pageNumber + 1}
                </button>
              )
            )}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
              disabled={page >= totalPages - 1}
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full disabled:opacity-50 transition"
              aria-label="Следующая страница"
            >
              <img
                src="/icon_next.svg"
                alt="Вперёд"
                className="w-5 h-5"
              />
            </button>
          </div>
        </>
    </div>
  );
}