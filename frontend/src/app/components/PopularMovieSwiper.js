import ScrollMovie from "./ScrollMovie";

export default function App({movieData}) {

    return (
        <div className="flex flex-col gap-2 w-[1504px]">
            <span className="font-bold text-xl">Популярные новинки</span>
            <ScrollMovie data={movieData} />
        </div>
    )
}