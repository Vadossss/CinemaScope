"use client"
import React, { useState, useEffect } from "react";
import { fetchGetUserProfileById } from "@/app/utils/fetchGetUserProfileById";
import { useParams } from "next/navigation";
import GraficScore from "../../components/GraficScore";
import PieGraficScore from "../../components/PieGraficScore";
import {Tab, Tabs} from "@heroui/react";
import GenresGraphScore from "../../components/GenresGraphScore";
import GraphMovieByYear from "../../components/GraphMoviesByYear";


const mockMovies = {
    "5437615": { title: "Приключения в большом городе", year: 2023, genre: "комедия", poster: "https://picsum.photos/id/1018/200/300"  },
    "7109670": { title: "Тихая гавань", year: 2022, genre: "драма", poster: "https://picsum.photos/id/1015/200/300"  },
    "5897895": { title: "Невидимый враг", year: 2021, genre: "боевик", poster: "https://picsum.photos/id/1019/200/300"  },
    "6275518": { title: "Светлый путь", year: 2020, genre: "драма", poster: "https://picsum.photos/id/1027/200/300"  },
    "7004161": { title: "Время перемен", year: 2023, genre: "триллер", poster: "https://picsum.photos/id/1024/200/300"  },
    "6802673": { title: "Любовь и выбор", year: 2021, genre: "романтика", poster: "https://picsum.photos/id/1012/200/300"  },
    "5518231": { title: "Странники", year: 2022, genre: "приключения", poster: "https://picsum.photos/id/1011/200/300"  },
    "6802674": { title: "Город будущего", year: 2023, genre: "фантастика", poster: "https://picsum.photos/id/1035/200/300"  },
    "7176947": { title: "Мир без границ", year: 2020, genre: "драма", poster: "https://picsum.photos/id/1033/200/300"  }
};

const App = () => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const params = useParams();
    const userId = params.userId;
    useEffect(() => {
        const fetchData = async () => {
            const [result, isLoading] = await fetchGetUserProfileById(userId);
            setUserData(result);
            setLoading(false);
        }
        fetchData();
    }, []);


    const [activeTab, setActiveTab] = useState("planned");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [movingMovieId, setMovingMovieId] = useState(null);
    const [user, setUser] = useState({
        _id: "15",
        username: "vladyka",
        favoriteGenres: ["комедия", "драма"],
        categories: {
            watched: [],
            dropped: [],
            planned: ["5437615", "7109670", "5897895", "6275518", "7004161", "6802673", "5518231", "6802674", "7176947"],
            watching: []
        },
        scores: {
            "5427621": 6,
            "5450038": 10,
            "6267717": 7,
            "6559163": 8,
            "7035692": 2
        }
    });

    // Статистика жанров
    const getGenreStats = () => {
        const genresCount = {};
        Object.values(user.categories).flat().forEach(movieId => {
            const genre = mockMovies[movieId]?.genre || "неизвестный";
            genresCount[genre] = (genresCount[genre] || 0) + 1;
        });
        return genresCount;
    };

    // Статистика оценок
    const getScoreStats = () => {
        const scoreCount = {};
        Object.entries(user.scores).forEach(([_, score]) => {
            scoreCount[score] = (scoreCount[score] || 0) + 1;
        });
        return scoreCount;
    };

    const handleMoveClick = (movieId) => {
        setMovingMovieId(movieId === movingMovieId ? null : movieId);
    };

    const moveToCategory = (targetCategory) => {
        if (!movingMovieId) return;

        setUser(prevUser => {
            const oldCategory = Object.keys(prevUser.categories).find(cat =>
                prevUser.categories[cat].includes(movingMovieId)
            );

            if (oldCategory === targetCategory) return prevUser;

            const updatedCategories = { ...prevUser.categories };
            updatedCategories[oldCategory] = updatedCategories[oldCategory].filter(id => id !== movingMovieId);
            updatedCategories[targetCategory] = [...updatedCategories[targetCategory], movingMovieId];

            return { ...prevUser, categories: updatedCategories };
        });

        setMovingMovieId(null);
    };

    const filteredMovies = user.categories[activeTab]
        .map(id => ({ id, ...mockMovies[id] }))
        .filter(movie => !selectedGenre || movie.genre === selectedGenre);

    const genreStats = getGenreStats();
    const scoreStats = getScoreStats();

    if (isLoading) {
        return (
            <div>Загрузка</div>
        )
    }

    console.log(userData);

    return (
        <div className="w-[1600px] min-h-screen bg-white rounded-xl text-white">

            {/* Main Content */}
            <main className="container mx-auto px-4 py-10">
                {/* User Info Card */}
                <div
                    className="bg-blue-950 bg-opacity-60 rounded-xl p-6 mb-5 backdrop-blur-sm shadow-lg shadow-orange-500">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500 shadow-lg">
                            <img src="/icon_avatar1.png" alt="User Avatar"
                                 className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold">{userData.user}</h2>
                            <div className="flex gap-1">
                                <p className="text-white opacity-95 max-w-lg">Любимые жанры: </p>
                                <span className="font-bold text-orange-500">{user.favoriteGenres.join(", ")}</span>
                            </div>
                            {/*<div className="flex flex-wrap gap-2 mt-2">*/}
                            {/*    {Object.entries(user.categories).map(([category, list]) => (*/}
                            {/*        <div key={category} onClick={() => setActiveTab(category)}*/}
                            {/*             className={`px-4 py-2 rounded-full cursor-pointer hover:bg-opacity-70 transition-all ${activeTab === category ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white" : "bg-gray-700 bg-opacity-50 text-gray-300"}`}>*/}
                            {/*            {category.charAt(0).toUpperCase() + category.slice(1)} ({list.length})*/}
                            {/*        </div>*/}
                            {/*    ))}*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>

                {/*<div className="flex flex-wrap gap-4 mb-5">*/}
                    <Tabs
                        classNames={{
                            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                            cursor: "w-full bg-orange-500",
                            tab: "max-w-fit px-0 h-12",
                            tabContent: "group-data-[selected=true]:text-orange-500 group-data-[selected=true]:font-bold",
                        }}
                        aria-label="Tabs variants" variant="underlined">
                        <Tab className="px-0" key="view" title="Обзор">
                            <section className="mb-12 mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">

                                <div className="bg-blue-950 bg-opacity-60 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold mb-4">Оценки пользователя</h3>
                                    <GraficScore data={userData.scoredMovies}/>
                                </div>

                                <div className="bg-blue-950 bg-opacity-60 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold mb-4">Распределение по оценкам</h3>
                                    <PieGraficScore data={userData.scoredMovies}/>
                                </div>

                                <div className="bg-blue-950 bg-opacity-60 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold mb-4">Распределение по оценкам</h3>
                                    <GenresGraphScore data={userData.scoredMovies}/>
                                </div>

                                <div className="bg-blue-950 bg-opacity-60 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold mb-4">Добавленные фильмы по годам</h3>
                                    <GraphMovieByYear data={userData.categorizedMovies}/>
                                </div>

                                <div className="bg-blue-950 bg-opacity-60 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold mb-4">Распределение по жанрам</h3>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        {Object.entries(genreStats).map(([genre, count]) => (
                                            <div key={genre} className="flex justify-between items-center">
                                                <span>{genre}</span>
                                                <span className="font-semibold text-purple-400">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gray-800 bg-opacity-60 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold mb-4">Оценки фильмов</h3>
                                    <div className="flex gap-2 items-end h-24">
                                        {Array.from({length: 10}, (_, i) => {
                                            const score = i + 1;
                                            const height = (scoreStats[score] || 0) * 10;
                                            return (
                                                <div key={score}
                                                     className="w-6 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t"
                                                     style={{height: `${height}px`}}
                                                     title={`Оценка ${score}: ${scoreStats[score] || 0}`}></div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </section>
                        </Tab>
                        <Tab className="px-0" key="scores" title="Оценки">
                            <section className="mb-12 mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">

                                <div className="bg-blue-950 bg-opacity-60 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold mb-4">Оценки пользователя</h3>
                                    <GraficScore data={userData.scoredMovies}/>
                                </div>

                                <div className="bg-blue-950 bg-opacity-60 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold mb-4">Распределение по оценкам</h3>
                                    <PieGraficScore data={userData.scoredMovies}/>
                                </div>

                                <div className="bg-blue-950 bg-opacity-60 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold mb-4">Распределение по жанрам</h3>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        {Object.entries(genreStats).map(([genre, count]) => (
                                            <div key={genre} className="flex justify-between items-center">
                                                <span>{genre}</span>
                                                <span className="font-semibold text-purple-400">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gray-800 bg-opacity-60 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold mb-4">Оценки фильмов</h3>
                                    <div className="flex gap-2 items-end h-24">
                                        {Array.from({length: 10}, (_, i) => {
                                            const score = i + 1;
                                            const height = (scoreStats[score] || 0) * 10;
                                            return (
                                                <div key={score}
                                                     className="w-6 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t"
                                                     style={{height: `${height}px`}}
                                                     title={`Оценка ${score}: ${scoreStats[score] || 0}`}></div>
                                            );
                                        })}
                                    </div>
                                    </div>
                                </section>

                        </Tab>
                        <Tab className="px-0" key="movies" title={
                            <div className="flex items-center space-x-2 ">
                                <span>Фильмы</span>
                            </div>
                        }/>

                    </Tabs>
                {/*</div>*/}

                {/* Charts Section */}
                {/*<section className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8">*/}

                {/*    <div className="bg-blue-950 bg-opacity-60 rounded-xl p-6 shadow-lg">*/}
                {/*        <h3 className="text-xl font-bold mb-4">Оценки пользователя</h3>*/}
                {/*        <GraficScore data={userData.scoredMovies}/>*/}
                {/*    </div>*/}

                {/*    <div className="bg-blue-950 bg-opacity-60 rounded-xl p-6 shadow-lg">*/}
                {/*        <h3 className="text-xl font-bold mb-4">Распределение по оценкам</h3>*/}
                {/*        <PieGraficScore data={userData.scoredMovies}/>*/}
                {/*    </div>*/}

                {/*    <div className="bg-blue-950 bg-opacity-60 rounded-xl p-6 shadow-lg">*/}
                {/*        <h3 className="text-xl font-bold mb-4">Распределение по жанрам</h3>*/}
                {/*        <div className="grid grid-cols-2 gap-2 text-sm">*/}
                {/*            {Object.entries(genreStats).map(([genre, count]) => (*/}
                {/*                <div key={genre} className="flex justify-between items-center">*/}
                {/*                    <span>{genre}</span>*/}
                {/*                    <span className="font-semibold text-purple-400">{count}</span>*/}
                {/*                </div>*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className="bg-gray-800 bg-opacity-60 rounded-xl p-6 shadow-lg">*/}
                {/*        <h3 className="text-xl font-bold mb-4">Оценки фильмов</h3>*/}
                {/*        <div className="flex gap-2 items-end h-24">*/}
                {/*            {Array.from({length: 10}, (_, i) => {*/}
                {/*                const score = i + 1;*/}
                {/*                const height = (scoreStats[score] || 0) * 10;*/}
                {/*                return (*/}
                {/*                    <div key={score}*/}
                {/*                         className="w-6 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t"*/}
                {/*                         style={{height: `${height}px`}}*/}
                {/*                         title={`Оценка ${score}: ${scoreStats[score] || 0}`}></div>*/}
                {/*                );*/}
                {/*            })}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</section>*/}

                {/* Movie Grid with Dropdown Move Menu */}
                <section className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold capitalize">
                            {activeTab === "planned" ? "Планируется к просмотру" : activeTab === "watched" ? "Просмотренные фильмы" : activeTab === "watching" ? "Смотрю сейчас" : "Брошенные фильмы"}
                        </h2>
                        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}
                                className="bg-gray-700 text-white rounded px-3 py-1">
                            <option value="">Все жанры</option>
                            {Object.keys(genreStats).map(genre => <option key={genre} value={genre}>{genre}</option>)}
                        </select>
                    </div>

                    {filteredMovies.length === 0 ? (
                        <p className="text-gray-400">Нет фильмов в этой категории.</p>
                    ) : (
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {filteredMovies.map(movie => (
                                <div
                                    key={movie.id}
                                    className="bg-gray-800 bg-opacity-70 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-700 relative"
                                >
                                    <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover"/>
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold">{movie.title}</h3>
                                        <p className="text-sm text-gray-400">{movie.year} • {movie.genre}</p>
                                        {user.scores[movie.id] !== undefined && (
                                            <div className="mt-2 flex items-center">
                                                <span
                                                    className="text-yellow-400 font-semibold">Оценка: {user.scores[movie.id]}</span>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleMoveClick(movie.id)}
                                        className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition"
                                    >
                                        Переместить
                                    </button>

                                    {/* Dropdown menu */}
                                    {movingMovieId === movie.id && (
                                        <div
                                            className="absolute top-2 right-2 bg-gray-800 border border-gray-600 rounded shadow-lg z-20">
                                            <ul>
                                                {Object.keys(user.categories).map(category => (
                                                    <li
                                                        key={category}
                                                        onClick={() => moveToCategory(category)}
                                                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                                    >
                                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default App;
