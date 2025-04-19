import { useEffect, useState } from "react";
import ScrollMovie from "./ScrollMovie";
import { fetchRecommendationMovie } from '@/app/utils/fetchRecommendationMovie';
import { Spinner } from "@heroui/react";
import { fetchWithAuth } from "../utils/fetchWithAuth";

export default function App() {
    const [movieData, setMovieData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchWithAuth("/user/userPersonalCatalog?page=1&size=250",
                {
                    method: "GET",
                    redirect: "follow",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
            if (res.ok) {
                const data = await res.json();
                setMovieData(data.data)
                setLoading(false);
            }
            else {
                setMovieData(null);
                setLoading(false);
            }
            // const [result, isLoading] = await fetchRecommendationMovie();
            // setMovieData(result.data);
            // setLoading(isLoading);
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <Spinner color="default" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 mt-5">
            <span className="font-bold">Рекомендации</span>
            <ScrollMovie data={movieData} />
        </div>
    )
}