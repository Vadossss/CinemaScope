"use client"

import Link from "next/link";
import { fetchAddWishlist } from "../utils/fetchAddWishlist";
import ProfileCardMovieModal from "./ProfileCardMovieModal";
import {useDisclosure} from "@heroui/react";
import {useAuth} from "@/app/contexts/authContext";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {fetchGetUserScores} from "@/app/utils/fetchGetUserScores";

export default function App({ setUpdate, data }) {
    const params = useParams();
    const paramUserId = params.userId;
    const [scores, setScores] = useState(null);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useAuth();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        const fetchData = async () => {
            const [result, isLoading] = await fetchGetUserScores(paramUserId);
            setScores(result);
            setIsLoading(false)
            setScore(result[data.id]?.score ?? null)
        }
        fetchData();
    }, []);

    useEffect(() => {
        setUpdate(true);
    }, [score])

    if (isLoading) {
        return (
            <div></div>
        )
    }


    // const ratingColor = data.rating.kp > 7.1 ? "#3bb33b" : data.rating.kp > 4.1 ? "#777" : "#ff1414";

    let bgColor;
    if (score !== null) {
        bgColor = score >= 7 ? "#3bb33b" : score > 4 ? "#777" : "#ff1414";
    }

    return (
        <div className="w-[149px] group/item text-black relative">

            {userId === paramUserId && (
                <>
                    <ProfileCardMovieModal isOpen={isOpen} setScore={setScore} onopen={onOpen} onOpenChange={onOpenChange} score={score} bgColor={bgColor} movieId={data.id} />

                    <div className={`group absolute z-10 top-[7px] right-0 pr-2 pl-2 text-sm rounded-sm invisible group-hover/item:visible`}>
                        <button
                            className="bg-transparent hover:bg-[rgba(42,42,42,0.5)] transition-colors rounded"
                            onClick={(e) => {
                                onOpen()
                            }}
                            title="Буду смотреть">
                            <img className="scale-100" src="/icon_edit2.svg"></img>
                        </button>
                    </div>
                </>
            )}



            <Link href={data.isSeries ? `/series/${data.id}` : `/films/${data.id}`}>
                <div className="relative">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover/item:opacity-100 transition-opacity rounded"></div>
                    {data?.poster?.previewUrl !== null && data?.poster?.previewUrl ? (
                        <img className="object-fit h-[225px] rounded" src={data.poster.previewUrl} alt="Постер"/>
                    ) : (
                        <img className="object-contain h-[225px] rounded" src="icon_movie.svg" alt="Постер"/>
                    )}
                </div>

                {score !== null && (
                    <div className={`absolute top-2 start-2 pr-2 pl-2 text-sm rounded-sm`}
                         style={{backgroundColor: bgColor}}>
                        <p className="text-white font-bold">{score}</p>
                    </div>
                )}

                <div className="flex flex-col mt-1">
                    <span
                        className="text-base font-medium line-clamp-2 group-hover/item:text-orange-700">{data.name !== null ? data.name : data.alternativeName}</span>
                    <span
                        className="text-xs font-thin text-gray-500">{data.year}{Array.isArray(data.genres) && data.genres[0]?.name ? `, ` + data.genres[0].name : ""}</span>
                </div>
            </Link>
        </div>
    )
}