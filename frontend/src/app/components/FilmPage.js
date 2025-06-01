"use client"

import { useState, useEffect } from "react"
import { fetchGetMovieById } from "@/app/utils/fetchGetMovieById";
import { useParams } from "next/navigation"
import Comments from "@/app/components/Comments";
import MovieHeader from "@/app/components/MovieHeader";
import MovieBody from "@/app/components/MovieBody";

export default function App() {
    const [filmData, setFilmData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const params = useParams();
    const id = params.filmId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [result, isLoading] = await fetchGetMovieById(id);
                setFilmData(result);
            } catch (error) {

            } finally {
                setLoading(false);
            }
        }

        fetchData();

    }, [])

    if (isLoading) {
        return (
            <div>Загрузка</div>
        )
    }
    console.log(filmData)

    return (
        <div className="w-[1504px] mx-auto bg-white p-5 rounded shadow-lg">
            <main>
                <div className="flex flex-col w-[1280px] mx-auto">
                    <div className="flex justify-between gap-10 mb-8">
                        <div className="flex flex-col gap-6 w-[400px]">
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

                        <div className="flex flex-col w-[840px]">
                            <MovieHeader filmData={filmData} />
                            <MovieBody filmData={filmData} />
                        </div>
                    </div>

                    <div className="mt-10">
                        <Comments id={filmData.id} />
                    </div>
                </div>
            </main>
        </div>
    );
}