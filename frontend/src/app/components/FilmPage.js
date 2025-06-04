"use client"

import { useState, useEffect } from "react"
import { fetchGetMovieById } from "@/app/utils/fetchGetMovieById";
import { useParams } from "next/navigation"
import Comments from "@/app/components/Comments";
import MovieHeader from "@/app/components/MovieHeader";
import MovieBody from "@/app/components/MovieBody";
import {Spinner} from "@heroui/react";
import {useQuery} from "@tanstack/react-query";

export default function App() {
    const [filmData, setFilmData] = useState(null);
    const params = useParams();
    const id = params.filmId;

    const { data: filmDataQuery, isLoading, isError } = useQuery({
        queryKey: ['film', id],
        queryFn: () => fetchGetMovieById(id),
        enabled: !!id,
    })

    useEffect(() => {
        if (Array.isArray(filmDataQuery)) {
            setFilmData(filmDataQuery[0]);
            console.log(filmDataQuery)
        }
    }, [filmDataQuery])

    if (isLoading || !filmData) {
        return (
            <div className="min-h-screen bg-white w-full max-w-[1504px] rounded-xl flex justify-center items-center px-4">
                <Spinner color="warning" />
            </div>
        );
    }
    console.log(filmData)

    return (
        <div className="max-w-[1504px] 2xl:w-[1504px] rounded-xl bg-white min-h-screen sm:px-6 lg:px-8 py-2">
            <main className=" mx-auto rounded-lg p-8">
                <div className="flex flex-col lg:flex-row gap-10 mb-10">

                    <div className="flex flex-col gap-6 w-full lg:w-1/3">
                        <img
                            className="w-full h-auto rounded-lg shadow-md"
                            src={filmData.poster.url}
                            alt="Постер фильма"
                        />

                        {filmData.trailer && (
                            <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
                                <iframe
                                    className="w-full h-full"
                                    src={filmData.trailer}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </div>

                    <div className="w-full lg:w-2/3 flex flex-col gap-6">
                        <MovieHeader filmData={filmData} />
                        <MovieBody filmData={filmData} description={"О фильме"}/>
                    </div>
                </div>

                <div className="mt-10">
                    <Comments id={filmData.id}/>
                </div>
            </main>
        </div>
    );
}