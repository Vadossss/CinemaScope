import ScrollMovie from "./ScrollMovie";

export default function App({movieData}) {

    return (
        <>
            {movieData && (
                <div className="flex flex-col gap-2 w-[1504px]">
                <span className="font-bold text-xl">Рекомендации</span>
                <ScrollMovie data={movieData}/>
            </div>) }
        </>
    )
}