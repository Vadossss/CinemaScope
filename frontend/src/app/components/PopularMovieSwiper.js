import { useEffect, useState } from "react";
import ScrollMovie from "./ScrollMovie";
import { fetchPopularMovie } from '@/app/utils/fetchPopularMovie';
import { Spinner } from "@heroui/react";

export default function App() {
    const [movieData, setMovieData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const [result, isLoading] = await fetchPopularMovie();
            setMovieData(result);
            setLoading(isLoading);
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
        <div className="flex flex-col gap-2">
            <span className="font-bold">Популярные новинки</span>
            <ScrollMovie data={movieData} />
        </div>
    )
}