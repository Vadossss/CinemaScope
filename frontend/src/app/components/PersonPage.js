"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import PersonHeader from "./PersonHeader";
import PersonBody from "./PersonBody";
import PersonMovieList from "./PersonMovieList";
import { fetchGetPersonByID } from "../utils/fetchGetPersonByID";
import {Spinner} from "@heroui/react";

export default function PersonPage() {
  const params = useParams();
  const id = params.id;

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

  if (loading) {
    return (
        <div className="min-h-screen w-full max-w-[1600px] rounded-xl flex justify-center items-center bg-gray-50 px-4">
          <div className=" p-8">
            <Spinner color="warning"/>
          </div>
        </div>
    )
  }

  if (error)
    return (
      <div className="text-red-500 text-center p-6">
        <h2>Ошибка</h2>
        <p>{error}</p>
      </div>
    );

  if (!person)
    return (
      <div className="text-center p-6">
        <p>Персона не найдена.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-white rounded-xl py-8 px-4 w-[1600px]">
      <div className="max-w-6xl mx-auto  p-6 space-y-8">
        {/* Заголовок и фото */}
        <PersonHeader person={person} />

        {/* Основная информация */}
        <PersonBody person={person} />

        {/* Фильмы */}
        <PersonMovieList movies={person.movies} />
      </div>
    </div>
  );
}