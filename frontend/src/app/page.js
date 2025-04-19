"use client"

import { useState } from "react";
import RecommendationSwiper from "@/app/components/RecommendationSwiper";
import PopularMovieSwiper from "@/app/components/PopularMovieSwiper";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2bGFkeWthIiwiZXhwIjoxNzQzMjExNDU5fQ.8p_HDbo-lAu6kXHchy1W8Jljq0Sg_tVx1bWpIeBfs70");
  myHeaders.append("Cookie", "accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2bGFkeWthIiwiZXhwIjoxNzQzOTg5MDc3fQ.XBVdU01HHvp9O5TtvcbbfBaWuhuTE6eYR4Mj2Fl2L68; refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2bGFkeWthIiwiZXhwIjoxNzUxNzY0MTc3fQ.TIKbkCahnNae8OVgk_ZH9NSseO3zfTFoP4qdhlpj3PQ");

  if (isLoading && data !== null) {
    return (
      <div>Загрузка </div>
    )
  }

  return (
    <div className="max-w-[1504px] bg-white">
      <PopularMovieSwiper />
      <RecommendationSwiper />
    </div>
  );
}
