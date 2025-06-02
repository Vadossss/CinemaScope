"use client"

import {useEffect, useState} from "react";
import SearchMovieCard from "./SearchMovieCard";
import MovieProfileCard from "./MovieProfileCard";
import {useCategories} from "@/app/contexts/categoriesMoviesContext";



export default function App({setUpdate, dataMovie}) {
    // const [data, setData] = useState(dataMovie.planned);
    const [searchText, setSearchText] = useState("");
    const [sortOption, setSortOptions] = useState("name_asc");
    const [selectedCategory, setSelectedCategory] = useState("total");
    const [sortedData, setSortedData] = useState([]);
    const { categories, setCategories } = useCategories();

    useEffect(() => {
        if (dataMovie) {
            setCategories(dataMovie);
        }
    }, [dataMovie]);

    // useEffect(() => {
    //     console.log(categories);
    //     dataMovie = categories;
    // }, [categories]);


    useEffect(() => {
        if (!categories) return;

        const watching = categories.watching ?? [];
        const planned = categories.planned ?? [];
        const watched = categories.watched ?? [];
        const dropped = categories.dropped ?? [];

        const total = [...watched, ...watching, ...dropped, ...planned];

        const formatingData = () => {
            if (selectedCategory === "watching") {
                return watching;
            } else if (selectedCategory === "planned") {
                return planned;
            } else if (selectedCategory === "watched") {
                return watched;
            } else if (selectedCategory === "dropped") {
                return dropped;
            } else if (selectedCategory === "total") {
                return total;
            }
        }

        const data = formatingData();

        // console.log(data);

        const filteredMovies = data.filter((item) =>
            item.name !== null
                ? item.name.toLowerCase().includes(searchText.toLowerCase())
                : item.endName.toLowerCase().includes(searchText.toLowerCase())
        );

        const sortData = [...filteredMovies].sort((a, b) => {
            if (sortOption === "name_asc") {
                return a.name.localeCompare(b.name);
            } else if (sortOption === "name_desc") {
                return b.name.localeCompare(a.name);
            }
            return 0;
        });

        setSortedData(sortData);
    }, [searchText, sortOption, selectedCategory, categories]);

    const sort = [
        {name: "По названию (A-Z)", value: "name_asc"},
        {name: "По названию (Z-A)", value: "name_desc"},
    ]

    const watching = categories?.watching?.length || 0;
    const planned = categories?.planned?.length || 0;
    const watched = categories?.watched?.length || 0;
    const dropped = categories?.dropped?.length || 0;

    const total = watching + planned + watched + dropped;

    const catalogs = [
        { name: "Все", value: total, enValue: "total" },
        { name: "Смотрю", value: watching, enValue: "watching" },
        { name: "В планах", value: planned, enValue: "planned" },
        { name: "Просмотрено", value: watched, enValue: "watched" },
        { name: "Брошено", value: dropped, enValue: "dropped" },
    ];

    console.log(sortedData)


    return (
        <div className="flex gap-6">
            <div className="flex flex-col w-[230px] bg-gray-100 rounded-xl p-4 px-2 self-start shadow-md shadow-orange-500">
                <div className="text-black opacity-75 text-sm ml-2 mb-3 relative">
                    <div className=" bg-gray-100 mb-1">Списки</div>
                    <div className="absolute opacity-45 border-t-2 -left-4  border-black ml-0 p-0 w-[230px]"></div>
                </div>
                <div className="flex flex-col gap-1">
                    {catalogs.map((item, index) => (
                        <div key={index}
                             className={`flex p-2 rounded-md text-black transition duration-1 cursor-pointer 50 ease-in-out
                             ${selectedCategory === item.enValue ? 'bg-orange-500 text-white' : "hover:bg-gray-200"}`}
                             onClick={() => setSelectedCategory(item.enValue)}
                        >
                            <div className="flex-grow">{item.name}</div>
                            <span>{item.value}</span>
                        </div>
                    ))}
                </div>
                <div className="text-black opacity-75 ml-2 mb-3 mt-4 relative">
                    <div className=" bg-gray-100 mb-1 text-sm">Сортировка</div>
                    <div className="absolute opacity-45 border-t-2 -left-4  border-black ml-0 p-0 w-[230px]"></div>
                </div>
                <div className="flex flex-col gap-1">
                    {sort.map((item, index) => (
                        <div key={index}
                             className={`flex p-2 rounded-md text-black transition duration-1 cursor-pointer 50 ease-in-out
                              ${sortOption === item.value ? 'bg-orange-500 text-white' : "hover:bg-gray-200"}`}
                             onClick={() => setSortOptions(item.value)}
                        >
                            <div
                                className=""
                            >
                                {item.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {sortedData.length > 0 ? (
                <div className="grid grid-cols-8 gap-2 ">
                    {sortedData.map((movie, index) => (
                        <MovieProfileCard key={movie.id} setUpdate={setUpdate} data={movie} dataCategory={dataMovie}/>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center m-auto">
                    <p className="text-gray-500">В этом списке пока ничего</p>
                </div>
            )}

        </div>
    )
}