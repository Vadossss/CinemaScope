"use client"

import {useEffect, useState} from "react";
import RecommendationSwiper from "@/app/components/RecommendationSwiper";
import PopularMovieSwiper from "@/app/components/PopularMovieSwiper";
import {useAuth} from "@/app/contexts/authContext";
import {Spinner} from "@heroui/react";
import {fetchPopularMovie} from "@/app/utils/fetchPopularMovie";
import {fetchWithAuth} from "@/app/utils/fetchWithAuth";
import GenesModal from "./components/GenresModal";
import { NewsCard } from "./components/NewsCard";
import { getNews } from "./utils/fetchGetAllNews";

export default function Home() {
  const [isLoadingPopular, setLoadingPopular] = useState(true);
  const [isLoadingRecommendation, setLoadingRecommendation] = useState(true);
  const [moviePopularData, setMoviePopularData] = useState(null);
  const [movieRecommendationData, setMovieRecommendationData] = useState(null);
  const { auth, hasChosenGenres, lastDismissed  } = useAuth();
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [result, isLoading] = await fetchPopularMovie();
      console.log(result);
      setMoviePopularData(result);
      setLoadingPopular(false);
      const [newsData, newsError] = await getNews(0, 6);
      if (newsError) {
        console.error(newsError);
        setLatestNews([]);
      } else {
        setLatestNews(newsData?.content || []);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {

    if (hasChosenGenres === null) return;

    if (lastDismissed !== null) {
      const lastDismissedDate = new Date(lastDismissed);
      const now = new Date();
      const hoursSinceDismissed = (now.getTime() - lastDismissedDate.getTime()) / (1000 * 60 * 60);
      console.log("Часы" + hoursSinceDismissed);

      if (hasChosenGenres) {
        setShowGenreModal(false);
      }

      if (!hasChosenGenres && hoursSinceDismissed > 6) {
        setShowGenreModal(true);
      }
    }
    else {
      setShowGenreModal(true);
    }
  }, [hasChosenGenres]);

  useEffect(() => {
    if (hasChosenGenres === null || hasChosenGenres === false) {
      setLoadingRecommendation(false);
      return;
    }
    const fetchData = async () => {
      const res = await fetchWithAuth("/user/userPersonalCatalog?page=1&size=250",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
          });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setMovieRecommendationData(data.data)
        setLoadingRecommendation(false);
      }
      else {
        setMovieRecommendationData(null);
        setLoadingRecommendation(false);
      }
    };

    fetchData();
  }, [hasChosenGenres]);

  if (isLoadingPopular || isLoadingRecommendation) {
    return (
        <div className="w-[1600px] h-screen bg-white flex justify-center rounded-xl items-center">
          <Spinner color="warning" />
        </div>
    )
  }

  const bigIndexes = [0, 5];

  return (
    <div className="w-[1600px] bg-white flex flex-col items-center rounded-xl gap-4 min-h-screen pt-8">
      <GenesModal showGenreModal={showGenreModal} />
      <PopularMovieSwiper movieData={moviePopularData} />
      {auth && <RecommendationSwiper movieData={movieRecommendationData} />}
<div className="mt-16 w-full">
  <h2 className="text-xl text-center font-semibold mb-4">Последние новости</h2>
  {latestNews.length > 0 ? (
    <div className="grid grid-cols-4 gap-2 ml-4 mr-4 mb-4">
      {latestNews.map((item, index) => {
        const isBig = bigIndexes.includes(index);

        return (
          <div
            key={item.id || index}
            className={`news-item ${
              isBig ? "big-card" : ""
            } ${index === 0 ? "col-span-2 row-start-1" : ""} ${
              index === 5 ? "col-span-2 row-start-2" : ""
            }`}
          >
            <NewsCard item={item} index={index} isBig={isBig} />
          </div>
        );
      })}
    </div>
  ) : (
    <p>Новостей пока нет.</p>
  )}
</div>
    </div>
  );
}
