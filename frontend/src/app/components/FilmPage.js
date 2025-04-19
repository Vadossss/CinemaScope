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

    return (
        <div className="flex bg-white pt-5 pb-5 rounded justify-center">
            <main>
                <div className="flex flex-col w-[1280px]">
                    <div className="flex mr-16 ml-16 gap-10">
                        <div className="flex flex-col">
                            <div>
                                <img className="w-[302px] rounded" src={filmData.poster.url}></img>
                            </div>
                            <div>
                                {/* <video controls autoPlay muted playsInline src="https://disk.yandex.ru/i/fN22N7ErD_POWg"></video> */}
                            </div>
                        </div>
                        <div className="flex flex-col w-[840px]">
                            <MovieHeader filmData={filmData}/>
                            <MovieBody filmData={filmData}/>
                        </div>

                    </div>
                    <Comments id={filmData.id} />
                </div>
            </main >
        </div >
    )
}