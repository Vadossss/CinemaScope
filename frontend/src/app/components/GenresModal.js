"use client"

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import {useEffect, useState} from "react";
import GenreModalButton from "./GenresModalButton";
import { fetchGenresModal } from "../utils/fetchGenresModal";
import { fetchDismissGenresModal } from "../utils/fetchDismissGenresModal";
import {useAuth} from "@/app/contexts/authContext";

const genres = [
    { name: "аниме", slug: "anime" },
    { name: "биография", slug: "biografiya" },
    { name: "боевик", slug: "boevik" },
    { name: "вестерн", slug: "vestern" },
    { name: "военный", slug: "voennyy" },
    { name: "детектив", slug: "detektiv" },
    { name: "детский", slug: "detskiy" },
    { name: "для взрослых", slug: "dlya-vzroslyh" },
    { name: "документальный", slug: "dokumentalnyy" },
    { name: "драма", slug: "drama" },
    { name: "игра", slug: "igra" },
    { name: "история", slug: "istoriya" },
    { name: "комедия", slug: "komediya" },
    { name: "концерт", slug: "koncert" },
    { name: "короткометражка", slug: "korotkometrazhka" },
    { name: "криминал", slug: "kriminal" },
    { name: "мелодрама", slug: "melodrama" },
    { name: "музыка", slug: "muzyka" },
    { name: "мультфильм", slug: "multfilm" },
    { name: "мюзикл", slug: "myuzikl" },
    { name: "новости", slug: "novosti" },
    { name: "приключения", slug: "priklyucheniya" },
    { name: "реальное ТВ", slug: "realnoe-TV" },
    { name: "семейный", slug: "semeynyy" },
    { name: "спорт", slug: "sport" },
    { name: "ток-шоу", slug: "tok-shou" },
    { name: "триллер", slug: "triller" },
    { name: "ужасы", slug: "uzhasy" },
    { name: "фантастика", slug: "fantastika" },
    { name: "фильм-нуар", slug: "film-nuar" },
    { name: "фэнтези", slug: "fentezi" },
    { name: "церемония", slug: "ceremoniya" }
];

export default function App({showGenreModal}) {
    const [isOpen, setIsOpen] = useState(false);
    const [genresArray, setGenresArray] = useState([]);
    const { setHasChosenGenres, setLastDismissed } = useAuth();

    const modalButtonHandler = (genre) => {
        if (genresArray.includes(genre)) {
            setGenresArray(genresArray.filter(g => g !== genre));
        }
        else {
            setGenresArray([...genresArray, genre]);
        }
    }

    useEffect(() => {
        console.log(genresArray);
    }, [genresArray])


    useEffect(() => {
        setIsOpen(showGenreModal);
    }, [showGenreModal]);

    return (
        <>
            <Modal
                backdrop="opaque"
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                }}
                isOpen={isOpen}
                onOpenChange={(open) => setIsOpen(open)}
                size="2xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-orange-500">Выберите свои любимые жанры</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-wrap gap-2">
                                    {genres.map((genre, index) => (
                                        <GenreModalButton
                                            key={index}
                                            name={genre.name}
                                            onClick={modalButtonHandler}
                                        />
                                    ))}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={async () => {
                                        await fetchDismissGenresModal();
                                        setLastDismissed(new Date());
                                        onClose();
                                }}>
                                    Потом
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={async () => {
                                        await fetchGenresModal(genresArray);
                                        setHasChosenGenres(true);
                                        setLastDismissed(new Date());
                                        onClose();
                                    }}>
                                    Сохранить
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
