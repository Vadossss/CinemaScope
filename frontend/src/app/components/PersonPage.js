"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


import PersonHeader from "./PersonHeader";
import PersonBody from "./PersonBody";
import PersonMovieList from "./PersonMovieList";
import { fetchGetPersonByID } from "../utils/fetchGetPersonByID";

export default function PersonPage() {
  const params = useParams();
  const id = params.id; // теперь id из сегмента пути /persons/[id]

  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("ID не указан");
      setLoading(false);
      return;
    }

    async function fetchPerson() {
      const [data, hasError] = await fetchGetPersonByID(id);

      if (hasError) {
        setError("Ошибка загрузки данных.");
        setPerson(null);
      } else {
        setPerson(data);
        setError(null);
      }

      setLoading(false);
    }

    fetchPerson();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{ color: "red" }}>Ошибка: {error}</div>;
  if (!person) return <div>Персона не найдена</div>;

    return (
    <div className="min-h-screen w-full bg-gray-50 py-6 px-4">
        <div className="max-w-screen-xl mx-auto bg-white rounded shadow p-6 flex flex-col gap-6">
        {/* Секция информации */}
        <div className="flex flex-col md:flex-row gap-6">
            {/* Левая часть (фото и имя) */}
            <div className="w-full md:w-1/3">
            <PersonHeader person={person} />
            </div>

            {/* Правая часть (данные) */}
            <div className="w-full md:w-2/3">
            <PersonBody person={person} />
            </div>
        </div>

        {/* Фильмы */}
        <PersonMovieList movies={person.movies} />
        </div>
    </div>
    );
}
