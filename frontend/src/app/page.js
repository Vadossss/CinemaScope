"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import MovieCard from "@/app/components/MovieCard";

export default function Home() {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2bGFkeWthIiwiZXhwIjoxNzQzMjExNDU5fQ.8p_HDbo-lAu6kXHchy1W8Jljq0Sg_tVx1bWpIeBfs70");
  myHeaders.append("Cookie", "accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2bGFkeWthIiwiZXhwIjoxNzQzOTg5MDc3fQ.XBVdU01HHvp9O5TtvcbbfBaWuhuTE6eYR4Mj2Fl2L68; refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2bGFkeWthIiwiZXhwIjoxNzUxNzY0MTc3fQ.TIKbkCahnNae8OVgk_ZH9NSseO3zfTFoP4qdhlpj3PQ");

  const raw = JSON.stringify({
    limit: 100,
    types: [
      "movie"
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8085/films/movie", {
          method: "POST",
          body: raw,
          redirect: "follow",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
        });

        if (res.ok) {
          setData(await res.json());
          setLoading(false);
        }
        else {
          console.log("Ошибка");

        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div>Загрузка </div>
    )
  }

  console.log(data);



  return (
    <div className="grid grid-flow-row grid-cols-9 gap-4">
      {data.map((movie) => (
        <MovieCard key={movie.id} data={movie} />
      ))}
    </div>
  );
}
