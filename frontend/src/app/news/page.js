"use client";

import { useEffect, useState } from "react";
import { NewsCard } from "../components/NewsCard";
import { getNews } from "../utils/fetchGetAllNews";
import {Spinner} from "@heroui/react";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setLoading] = useState(true);

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
      setLoading(false);
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

  if (isLoading) {
    return (
        <div className="w-[1600px] h-screen bg-white flex justify-center rounded-xl items-center">
          <Spinner color="warning" />
        </div>
    )
  }

  return (
    <div className="bg-gray-100 py-8 px-8 rounded-xl w-[1600px]">
      <div className="mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
          Медиа
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {news.map((item, index) => (
            <NewsCard key={item.id || index} item={item} index={index} />
          ))}
        </div>

        <div className="mt-12 flex justify-center items-center space-x-1">

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