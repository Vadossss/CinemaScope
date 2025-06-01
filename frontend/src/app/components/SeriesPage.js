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
    const id = params.serialId;

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
        <div className="w-[1504px] flex bg-white pt-5 pb-5 rounded justify-center">
            <main>
                <div className="flex flex-col w-[1280px]">
                    <div className="flex mr-16 ml-16 gap-10">
                        <div className="flex flex-col gap-4">
                            <div>
                                <img className="w-[400px] rounded" src={filmData.poster.url}></img>
                            </div>
                            <div>
                                {filmData.trailer && (
                                    <div>
                                        <iframe
                                            className="rounded w-[315px] h-[200px]"
                                            src={filmData.trailer}

                                            title="YouTube video player" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                        {/*<div className="plyr__video-embed" id="player">*/}
                                        {/*    <iframe*/}
                                        {/*        className="rounded"*/}
                                        {/*        src={`${filmData.trailer}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;controls=0;showinfo=1&amp;rel=0&amp;enablejsapi=1`}*/}
                                        {/*        // allowFullScreen*/}
                                        {/*        // allowTransparency*/}
                                        {/*        allow="autoplay"*/}
                                        {/*    ></iframe>*/}
                                        {/*</div>*/}

                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col w-[840px]">
                            <MovieHeader filmData={filmData}/>
                            <MovieBody filmData={filmData}/>
                        </div>

                    </div>
                    <Comments id={filmData.id}/>
                </div>
            </main>
        </div>
    )
}