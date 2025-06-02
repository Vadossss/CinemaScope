"use client"

import {useEffect, useState} from 'react';
import { useParams } from "next/navigation";
import {fetchGetMovieById} from "@/app/utils/fetchGetMovieById";
import {Spinner} from "@heroui/react";

export default function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Все');
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const params = useParams();
    const filmId = params.filmId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [result, isLoading] = await fetchGetMovieById(filmId);
                setData(result.persons);
            } catch (error) {

            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    const groupedCast = data.reduce((acc, person) => {
        const profession = person.profession || 'Неизвестно';
        if (!acc[profession]) acc[profession] = [];
        acc[profession].push(person);
        return acc;
    }, {});

    const professions = ['Все', ...Object.keys(groupedCast)];

    const filteredCast = activeTab === 'Все'
        ? data.filter(person =>
            (person.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                person.enName?.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        : groupedCast[activeTab]?.filter(person =>
        (person.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.enName?.toLowerCase().includes(searchTerm.toLowerCase()))
    ) || [];

    if (isLoading) {
        return (
            <div className="w-[1600px] h-screen bg-white flex justify-center rounded-xl items-center">
                <Spinner color="warning" />
            </div>
        )
    }

    return (
        <div className="lg:w-[1504px] min-h-screen bg-gray-50 rounded-xl">

            <div className="container mx-auto px-8 mt-8 relative z-10">
                <div className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-sm bg-opacity-90 border border-gray-200">
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Поиск по имени или фамилии..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                            />
                            <svg
                                className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {professions.map((profession) => (
                            <button
                                key={profession}
                                onClick={() => setActiveTab(profession)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                                    activeTab === profession
                                        ? 'bg-orange-500 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {profession}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-8 py-12">
                {filteredCast.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {filteredCast.map((person, index) => (
                            <PersonCard key={index} person={person} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <svg
                            className="mx-auto h-16 w-16 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">Нет результатов</h3>
                        <p className="mt-1 text-gray-500">Попробуйте изменить параметры поиска.</p>
                    </div>
                )}
            </main>
        </div>
    );
}

function PersonCard({ person }) {
    return (
        <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="aspect-square relative overflow-hidden">
                <img
                    src={person.photo || 'https://placehold.co/360x360?text=No+Image '}
                    alt={person.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                {person.description && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="bg-orange-500 bg-opacity-70 inline-block rounded p-1 px-2">
                            <span className="text-white font-medium">{person.description}</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">{person.name}</h3>
                {person.enName && <p className="text-sm text-gray-500">{person.enName}</p>}
                <p className="mt-2 text-xs text-orange-600 font-medium uppercase tracking-wide">
                    {person.profession}
                </p>
            </div>
        </div>
    );
}