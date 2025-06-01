import {Button} from "@heroui/react";
import RateMovieButton from "@/app/components/RateMovieButton";
import WhereToWatchAccordion from "./WhereToWatchAccordion"

export const Bookmark = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-120v-640q0-33 23.5-56.5T280-840h240v80H280v518l200-86 200 86v-278h80v400L480-240 200-120Zm80-640h240-240Zm400 160v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" /></svg>
    )
}

export default function MovieHeader({filmData}) {
    const ratingColor = filmData.rating.kp > 7.1 ? "#3bb33b" : filmData.rating.kp > 4.1 ? "#777" : "#ff1414";
    return (
        <div className="flex gap-10">
            <div className="flex flex-col gap-2 w-[600px]">
                <div>
                    <h1>
                        <span
                            className="text-4xl font-bold">{filmData.name !== null ? filmData.name : filmData.alternativeName} {filmData.year && `(${filmData.year})`}</span>
                    </h1>
                </div>
                <div>
                    <span
                        className="text-gray-500">{filmData.ageRating !== null ? `${filmData.ageRating}+` : filmData.alternativeName}</span>
                </div>
                <div>
                    <Button className="bg-gray-300 pr-3 pl-2" startContent={<Bookmark/>} variant="bordered">
                        Буду смотреть
                    </Button>
                </div>
                <div className="w-[160px]">
                    <WhereToWatchAccordion filmData={filmData} />
                </div>
            </div>
            <div className="flex flex-col">
                <div>
                    <h1>
                        {filmData.rating.kp > 0 ? (
                            <span
                                className="text-4xl font-bold"
                                style={{color: ratingColor}}
                            >{(filmData.rating.kp).toFixed(1)}
                            </span>
                        ) : (
                            <div className="flex flex-col">
                                <span
                                    className="text-4xl font-bold"
                                >-</span>
                                {/*<span*/}
                                {/*    className="text-xs line-clamp-3 leading-5"*/}
                                {/*>Недостаточно оценок, рейтинг формируется</span>*/}
                            </div>
                        )}
                    </h1>
                </div>
                <div>
                    <span
                        className="text-xs font-thin text-gray-500">{filmData.votes.kp.toLocaleString("RU-ru")} оценок</span>
                </div>
                <RateMovieButton movieId={filmData.id}/>
            </div>
        </div>
    )
}