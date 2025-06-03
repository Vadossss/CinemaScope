"use client"

import React, { useState, useEffect } from "react";
import { fetchGetUserProfileById } from "@/app/utils/fetchGetUserProfileById";
import {useParams, useRouter} from "next/navigation";
import GraficScore from "../../components/GraficScore";
import PieGraficScore from "../../components/PieGraficScore";
import PieGraphGenresCount from "../../components/PieGraphGenresCount";
import PieGraphCatalogsCount from "../../components/PieGraphCatalogsCount";
import {Spinner, Tab, Tabs} from "@heroui/react";
import GenresGraphScore from "../../components/GenresGraphScore";
import GraphMovieByYear from "../../components/GraphMoviesByYear";
import MovieListForUser from "../../components/MovieListForUser";
import {CategoriesContextProvider} from "@/app/contexts/categoriesMoviesContext";
import {useAuth} from "@/app/contexts/authContext";
import SettingsModal from "../../components/SettingsModal";

const App = () => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [isUpdate, setUpdate] = useState(false);
    const params = useParams();
    const paramsUserId = params.userId;
    const router = useRouter();
    const { avatar, auth, userId } = useAuth();
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const [result, isLoading] = await fetchGetUserProfileById(paramsUserId);
            setUserData(result);
            setAvatarUrl(result?.avatarUrl)
            console.log(result);
            setLoading(false);
            setUpdate(false);
        }
        fetchData();
    }, [isUpdate]);

    useEffect(() => {
        if (!isLoading && userData === null) {
            router.push("/error");
        }
    }, [userData, isLoading, router]);

    if (isLoading || userData === null) {
        return (
            <div className="w-[1600px] h-screen bg-white flex justify-center rounded-xl items-center">
                <Spinner color="warning" />
            </div>
        )
    }

    const getAvatarSrc = () => {
        if (paramsUserId === userId) {
            return avatar || "/icon_avatar1.png";
        } else {
            return avatarUrl || "/icon_avatar1.png";
        }
    };

    return (
        <div className="w-[1600px] min-h-screen bg-white rounded-xl text-white">
            <main className="container mx-auto px-4 py-10">
                <div
                    className="bg-blue-950 bg-opacity-60 rounded-xl p-6 mb-5 backdrop-blur-sm shadow-lg shadow-orange-500">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500 shadow-lg">
                            <img src={getAvatarSrc()} alt="User Avatar"
                                 className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold">{userData.user}</h2>
                            {userId === paramsUserId && (
                                <SettingsModal />
                            )}
                            <div className="flex gap-1">
                                {/*<p className="text-white opacity-95 max-w-lg">Любимые жанры: </p>*/}
                                {/*<span className="font-bold text-orange-500">{user.favoriteGenres.join(", ")}</span>*/}
                            </div>
                        </div>
                    </div>
                </div>

                {/*<div className="flex flex-wrap gap-4 mb-5">*/}
                <Tabs
                    classNames={{
                        tabList: "gap-10 w-full relative rounded-none p-0 border-b border-divider",
                        cursor: "w-full bg-orange-500",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-orange-500 group-data-[selected=true]:font-bold",
                    }}
                    aria-label="Tabs variants" variant="underlined">
                    <Tab className="px-0" key="view" title="Обзор">
                        <section className="mb-12 mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">


                            <div className="bg-blue-950 bg-opacity-60 rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Количество фильмов по жанрам</h3>
                                <PieGraphGenresCount data={userData.categorizedMovies}/>
                            </div>

                            <div className="bg-blue-950 bg-opacity-60 rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Количество фильмов в коллекциях</h3>
                                <PieGraphCatalogsCount data={userData.categorizedMovies}/>
                            </div>


                            <div className="bg-blue-950 bg-opacity-60 rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Добавленные фильмы по годам</h3>
                                <GraphMovieByYear data={userData.categorizedMovies}/>
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
                                <h3 className="text-xl font-bold mb-4">Распределение по оценкам</h3>
                                <GenresGraphScore data={userData.scoredMovies}/>
                            </div>
                        </section>

                    </Tab>
                    <Tab className="px-0" key="movies" title={
                        <div className="flex items-center space-x-2 ">
                            <span>Фильмы</span>
                        </div>
                    }>
                        <CategoriesContextProvider>
                            <section className="mb-1">
                                <MovieListForUser setUpdate={setUpdate} dataMovie={userData.categorizedMovies}/>
                            </section>
                        </CategoriesContextProvider>
                    </Tab>
                </Tabs>
            </main>
        </div>
    );
};

export default App;
