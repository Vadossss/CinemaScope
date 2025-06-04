"use client"

import RateMovieButton from "@/app/components/RateMovieButton";
import WhereToWatchAccordion from "./WhereToWatchAccordion"
import ButtonAddToLists from "./ButtonAddToLists";
import {useEffect, useState} from "react";

export const Bookmark = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-120v-640q0-33 23.5-56.5T280-840h240v80H280v518l200-86 200 86v-278h80v400L480-240 200-120Zm80-640h240-240Zm400 160v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" /></svg>
    )
}

export default function MovieHeader({filmData}) {
    const ratingColor = filmData.rating.kp > 7.1 ? "#3bb33b" : filmData.rating.kp > 4.1 ? "#777" : "#ff1414";
    const [score, setScore] = useState(filmData.rating.rate || 0);
    const [countScores, setCountScores] = useState(filmData.votes.vote || 0);
    const [newCount, setNewCount] = useState(false);
    const [usRatingColor, setUsRatingColor] = useState(filmData.rating.rate > 7.1 ? "#3bb33b" : filmData.rating.rate > 4.1 ? "#777" : "#ff1414");

    useEffect(() => {
        setUsRatingColor(score > 7.1 ? "#3bb33b" : score > 4.1 ? "#777" : "#ff1414");
    }, [score]);

    useEffect(() => {
        if (newCount) {
            setCountScores(countScores + 1);
        }
    }, [score])

    // useEffect(() => {
    //     setScore(filmData.rating.rate);
    //     setCountScores(filmData.votes.vote);
    // }, [filmData]);

    return (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            <div className="flex flex-col gap-2 flex-1 max-w-full lg:max-w-[600px]">
                <h1>
          <span className="text-3xl sm:text-4xl font-bold">
            {filmData.name ?? filmData.alternativeName} {filmData.year && `(${filmData.year})`}
          </span>
                </h1>
                <span className="text-gray-500 text-sm">
          {filmData.ageRating ? `${filmData.ageRating}+` : filmData.alternativeName}
        </span>
                {/*<Button className="bg-gray-300 pr-3 pl-2 w-max" startContent={<Bookmark />} variant="bordered">*/}
                {/*    Буду смотреть*/}
                {/*</Button>*/}
                <ButtonAddToLists movieId={filmData.id}/>
                <div className="w-full max-w-[160px] mt-2">
                    <WhereToWatchAccordion filmData={filmData} />
                </div>
            </div>

            <div className="flex flex-col items-start sm:items-center lg:items-start gap-2">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        {filmData.rating.kp > 0 ? (
                            <span className="text-4xl font-bold" style={{ color: ratingColor }}>
                                {filmData.rating.kp.toFixed(1)}
                            </span>
                        ) : (
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-bold">-</span>
                            </div>
                        )}
                        <span className="text-xs font-thin text-gray-500">{filmData.votes.kp.toLocaleString("ru-RU")} оценок</span>
                    </div>
                    <div className="flex flex-col">
                        {score > 0 ? (
                            <span className="text-2xl font-bold" style={{ color: usRatingColor }}>
                        {score.toFixed(1)}
                  </span>
                        ) : (
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-bold">-</span>
                            </div>
                        )}
                        <span className="text-xs font-thin text-gray-500">{countScores.toLocaleString("ru-RU")} оценок</span>
                    </div>
                </div>
                <RateMovieButton setScore={setScore} setNewCount={setNewCount} movieId={filmData.id} />
            </div>
        </div>
    );
}