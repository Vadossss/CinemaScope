import React, {useEffect} from "react";
import {
    Button,
    ButtonGroup,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/react";
import { fetchAddWishlist } from "../utils/fetchAddWishlist";
import {useAuth} from "@/app/contexts/authContext";
import {useRouter} from "next/navigation";
import {fetchChangeListMovie} from "@/app/utils/fetchChangeListMovie";

export const ChevronDownIcon = () => {
    return (
        <svg fill="none" height="14" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
                fill="currentColor"
            />
        </svg>
    );
};

export const Bookmark = () => {
    return (
        <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
            <path
                d="M713-600 600-713l56-57 57 57 141-142 57 57-198 198ZM200-120v-640q0-33 23.5-56.5T280-840h240v80H280v518l200-86 200 86v-278h80v400L480-240 200-120Zm80-640h240-240Z"/>
        </svg>
    )
}

export default function App({movieId}) {
    const [selectedOption, setSelectedOption] = React.useState(new Set(["planned"]));
    const {auth, categories, setCategories} = useAuth();
    const router = useRouter();
    const [movieCategory, setMovieCategory] = React.useState(null);

    useEffect(() => {
        if (categories !== null && movieId) {
            const foundCategory = Object.entries(categories).find(
                ([category, movieIds]) => movieIds.includes(String(movieId))
            );

            setMovieCategory(foundCategory ? foundCategory[0] : null);
            if (foundCategory != null) {
                setSelectedOption(new Set([foundCategory[0]]));
            }
        }
    }, [categories, movieId]);


    const labelsMap = {
        planned: "В планах",
        watching: "Смотрю",
        watched: "Просмотрено",
        dropped: "Брошено",
    };

    const addHandler = async () => {
        if (auth !== true) {
            router.push("/login");
        }
        else {
            if (movieCategory === null) {
                await fetchAddWishlist(movieId, selectedOptionValue);
                setMovieCategory(selectedOptionValue);
                const updatedCategories = {...categories};

                for (const key of Object.keys(updatedCategories)) {
                    updatedCategories[key] = updatedCategories[key].filter(id => id !== String(movieId));
                }

                updatedCategories[selectedOptionValue] = [
                    ...updatedCategories[selectedOptionValue],
                    String(movieId),
                ];

                setCategories(updatedCategories);
                setMovieCategory(selectedOptionValue);

            }
            else {
                const data = {
                    movieId: movieId,
                    fromCategory: movieCategory,
                    toCategory: selectedOptionValue
                }
                await fetchChangeListMovie(data);
                const updatedCategories = {...categories};

                for (const key of Object.keys(updatedCategories)) {
                    updatedCategories[key] = updatedCategories[key].filter(id => id !== String(movieId));
                }

                updatedCategories[selectedOptionValue] = [
                    ...updatedCategories[selectedOptionValue],
                    String(movieId),
                ];

                setCategories(updatedCategories);
                setMovieCategory(selectedOptionValue);
            }

            console.log("Добавлено в категорию:", selectedOptionValue);
        }
    }

    const selectedOptionValue = Array.from(selectedOption)[0];

    return (
        <ButtonGroup className="justify-start" variant="flat">
            {movieCategory !== null ? (
                <Button startContent={<Bookmark />} onPress={() => addHandler()} className="bg-orange-500 text-white font-bold">
                    {labelsMap[selectedOptionValue]}
                </Button>
            ) : (
                <Button onPress={() => addHandler()} className="bg-gray-300">{labelsMap[selectedOptionValue]}</Button>
            )}

            <Dropdown placement="bottom">
                <DropdownTrigger>
                    <Button className={`${movieCategory !== null ? "bg-orange-500" : "bg-gray-300"}`} isIconOnly>
                        <ChevronDownIcon />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    disallowEmptySelection
                    aria-label="Merge options"
                    className="max-w-[300px] items-start"
                    selectedKeys={selectedOption}
                    selectionMode="single"
                    onSelectionChange={setSelectedOption}
                >
                    <DropdownItem key="planned">
                        {labelsMap["planned"]}
                    </DropdownItem>
                    <DropdownItem key="watching">
                        {labelsMap["watching"]}
                    </DropdownItem>
                    <DropdownItem key="watched">
                        {labelsMap["watched"]}
                    </DropdownItem>
                    <DropdownItem key="dropped">
                        {labelsMap["dropped"]}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </ButtonGroup>
    );
}

