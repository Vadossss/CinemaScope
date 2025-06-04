"use client";

import { useEffect, useState } from "react";
import { fetchMovies } from "../../utils/fetchMovies";
import Link from "next/link";
import { useParams } from "next/navigation";
import MovieCard from "../../components/MovieCard";

export default function CatalogPage() {
  const [objects, setObjects] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const catalogName = params.catalogName;
  const limit = 36;
  const [pagedObjects, setPagedObjects] = useState([])


  useEffect(() => {
  if (!catalogName) return;
  setLoading(true);
  const load = async () => {
    const [data] = await fetchMovies(catalogName);
    setObjects(data || []);
    setTotalPages(Math.ceil((data?.length || 0) / limit));
    setLoading(false);
  };

  load();
}, [catalogName]);

useEffect(() => {
  setPagedObjects(objects.slice(page * limit, (page + 1) * limit));
}, [objects, page]);

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


  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen w-[1600px]">
      <h1 className="text-3xl font-bold text-black 600 mb-6 text-center">Каталог</h1>

      {/* Лоадер */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Сетка актёров */}
      
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-2">
      {pagedObjects.map((object) => (
        <div key={object.id} className="relative" >
        <MovieCard data={object} />
        </div>
        // <Link key={object.id} href={`/films/${object.id}`} passHref>
        //   <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col h-full">
        //     <img
        //       src={object.poster.url}
        //       alt={object.name}
        //       className="w-full h-70 object-cover"
        //       onError={(e) => {
        //         e.target.src = "/base_poster.svg";
        //       }}
        //     />
        //     <div className="p-4 flex-grow">
        //       <h2 className="font-semibold text-lg truncate text-black 600">
        //         {object.name || object.enName}
        //       </h2>
        //       <p className="text-sm text-gray-600 mt-1">Возраст: {object.age || "—"}</p>
        //       <p className="text-xs text-gray-500 mt-1 line-clamp-2">
        //         {object.profession?.map((p) => p.value).join(", ") || "Профессии не указаны"}
        //       </p>
        //     </div>
        //   </div>
        // </Link>
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
      )}
    </div>
  );
}