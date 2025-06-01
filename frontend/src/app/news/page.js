"use client";

import { useEffect, useState } from "react";
import { NewsCard } from "../components/NewsCard";
import { getNews } from "../utils/fetchGetAllNews";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Получаем данные
  useEffect(() => {
    async function fetchData() {
      const [data, error] = await getNews(page);
      if (error) {
        console.error("Ошибка при получении новостей:", error);
        alert("Ошибка при загрузке новостей");
        return;
      }
      setNews(data.content || []);
      setTotalPages(data.totalPages || 0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    fetchData();
  }, [page]);

  // Генерация номеров страниц с многоточием
  const getPageNumbers = () => {
    const maxDisplayedPages = 5;
    const pages = [];

    if (totalPages <= maxDisplayedPages) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(0);

    let start = Math.max(page - 1, 1);
    let end = Math.min(page + 1, totalPages - 2);

    if (page > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 3) pages.push("...");

    pages.push(totalPages - 1);

    return pages;
  };

  return (
    <div className="bg-gray-100 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
          Медиа
        </h1>

        {/* Сетка новостей */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {news.map((item, index) => (
            <NewsCard key={item.id || index} item={item} index={index} />
          ))}
        </div>

        {/* Пагинация */}
        <div className="mt-12 flex justify-center items-center space-x-1">
          {/* Кнопка "Назад" */}
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full disabled:opacity-50 transition"
            aria-label="Предыдущая страница"
          >
            <svg
              className="w-5 h-full transform rotate-180"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Номера страниц */}
          {getPageNumbers().map((pageNumber, index) =>
            pageNumber === "..." ? (
              <span key={`dot-${index}`} className="px-2 text-gray-500 select-none">
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

          {/* Кнопка "Вперёд" */}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full disabled:opacity-50 transition"
            aria-label="Следующая страница"
          >
            <svg
              className="w-5 h-full"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >

              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}