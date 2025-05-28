"use client";

import { useEffect, useState } from "react";

export default function PersonsPage() {
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8085/person/getPersons?page=${page}&size=15`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Ошибка сервера: ${res.status} - ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        setPersons(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.error("Ошибка при получении персон:", err);
        alert(err.message);
      });
  }, [page]);

  // Пагинация с максимум 10 кнопок (как раньше)
  const getPageNumbers = () => {
    const maxButtons = 10;
    let start = 0;
    let end = totalPages;

    if (totalPages > maxButtons) {
      start = Math.max(page - Math.floor(maxButtons / 2), 0);
      end = start + maxButtons;

      if (end > totalPages) {
        end = totalPages;
        start = end - maxButtons;
      }
    }

    const pages = [];
    for (let i = start; i < end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Персоны</h1>

      {/* Сетка 5 колонок с карточками актёров */}
      <div className="grid grid-cols-5 gap-6">
        {persons.map((person) => (
          <div
            key={person.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center"
          >
            <img
              src={person.photo}
              alt={person.name}
              className="w-24 h-24 object-cover rounded-md mb-3"
            />
            <h2 className="font-semibold text-lg mb-1">
              {person.name || person.enName}
            </h2>
            <p className="text-sm text-gray-600 mb-1">Возраст: {person.age || "—"}</p>
            <p className="text-sm text-gray-500">
              {person.profession?.map((p) => p.value).join(", ") || "Профессии не указаны"}
            </p>
          </div>
        ))}
      </div>

      {/* Пагинация */}
      <div className="flex justify-center mt-8 space-x-2 items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Назад
        </button>

        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={`px-3 py-2 rounded ${
              pageNumber === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {pageNumber + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page + 1 >= totalPages}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Вперёд
        </button>
      </div>
    </div>
  );
}
