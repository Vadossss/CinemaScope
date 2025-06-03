"use client"

import {Input, NavbarContent, Tab, Tabs} from "@heroui/react";
import {SearchIcon} from "@/app/components/Navbar";
import {fetchSearchByRegex} from "@/app/utils/fetchSearchByRegex";
import {useEffect, useRef, useState} from "react";
import SearchMovieCard from "./SearchMovieCard"
import { fetchSearchPersonByRegex } from "../utils/fetchSearchPersonByRegex";
import SearchPersonCard from "./SearchPersonCard";

export default function App() {
    const [input, setInput] = useState("");
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef(null);
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
  if (!input.trim()) {
    setData(null);
    setPersons([]);
    return;
  }

  setLoading(true);

  const delayDebounce = setTimeout(() => {
            Promise.all([
            fetchSearchByRegex(input),      // фильмы и сериалы
            fetchSearchPersonByRegex(input) // персоны
            ])
            .then(([movieResult, personResult]) => {
                setData(movieResult[0]);      // movies и series
                setPersons(personResult[0]);  // персоны
                setLoading(false);
            })
            .catch((error) => {
                console.error("Ошибка при поиске:", error);
                setLoading(false);
            });
        }, 500);

        return () => clearTimeout(delayDebounce);
        }, [input]);

    console.log(data);


    return (
        <NavbarContent as="div" className="relative items-center" justify="end">
            <div ref={containerRef} className="relative w-full max-w-full sm:max-w-[20rem]">
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[20rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper:
                            "h-full font-normal text-black bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Фильмы, сериалы, персоны"
                    size="sm"
                    startContent={<SearchIcon size={18}/>}
                    onChange={(e) => {
                        setInput(e.target.value);
                        setIsFocused(true);
                    }}
                    onFocus={() => setIsFocused(true)}
                    onFocusOut={() => setIsFocused(false)}
                    value={input}
                    type="search"
                />

                {isFocused && data && (
                    <div className="absolute flex flex-col items-center top-full mt-2 z-50 w-full bg-white shadow-md rounded p-2">
                        <Tabs aria-label="Options">
                            <Tab className="w-full" key="movies" title="Фильмы">
                                <div className="relative flex flex-col gap-1 w-full max-h-[400px] overflow-y-auto pr-2">
                                    {data.filter(movie => movie.isSeries === false).length > 0 ? (
                                        data
                                            .filter(movie => movie.isSeries === false)
                                            .map(movie => (
                                                <SearchMovieCard key={movie.id} movie={movie} />
                                            ))
                                    ) : (
                                        <div className="h-40 flex justify-center items-center w-full text-center">
                                            Мы ничего не нашли :(
                                        </div>
                                    )}
                                </div>
                            </Tab>

                            <Tab className="w-full" key="series" title="Сериалы">
                                <div className="relative flex flex-col gap-1 w-full max-h-[400px] overflow-y-auto pr-2">
                                    {data.filter(movie => movie.isSeries === true).length > 0 ? (
                                        data
                                            .filter(movie => movie.isSeries === true)
                                            .map(movie => (
                                                <SearchMovieCard key={movie.id} movie={movie} />
                                            ))
                                    ) : (
                                        <div className="h-40 flex justify-center items-center w-full text-center">
                                            Мы ничего не нашли :(
                                        </div>
                                    )}
                                </div>
                            </Tab>

                            <Tab className="w-full" key="persons" title="Персоны">
                                <div className="relative flex flex-col gap-1 w-full max-h-[400px] overflow-y-auto pr-2">
                                    {persons && persons.length > 0 ? (
                                    persons.map(person => (
                                        <SearchPersonCard key={person.id} person={person} />
                                    ))
                                    ) : (
                                    <div className="h-40 flex justify-center items-center w-full text-center">
                                        Мы ничего не нашли :(
                                    </div>
                                    )}
                                </div>
                            </Tab>
                        </Tabs>
                        <div className="text-black pt-2 pl-2 pb-2 font-bold rounded text-sm bg-gray-200 h-full w-full">Результаты поиска</div>
                    </div>
                )}
            </div>
        </NavbarContent>
    )
}