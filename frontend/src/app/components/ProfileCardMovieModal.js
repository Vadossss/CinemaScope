import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import RateMovieButtonForProfile from "./RateMovieButtonForProfile";
import DropdownProfileMovieCard from "./DropdownProfileMovieCard";
import {useCategories} from "@/app/contexts/categoriesMoviesContext";
import {fetchChangeListMovie} from "@/app/utils/fetchChangeListMovie";
import { fetchDeleteMovieFromTheList } from "@/app/utils/fetchDeleteMovieFromTheList"

const IconDelete = () => {
    return (
        <svg
            className="fill-rose-600"
            xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1f1f1f">
            <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
        </svg>
    )
}

const IconSave = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
            <path
                d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
        </svg>
    )
}

const IconEdit = () => {
    return (
        <svg
            className="fill-black"
            width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 21H12" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

const moveMovie = (categories, from, to, targetId) => {
    const newCategories = {
        ...categories,
        [from]: [...categories[from]],
        [to]: [...categories[to]],
    };

    const index = newCategories[from].findIndex(item => item.id === targetId);
    if (index === -1) return categories;

    const [item] = newCategories[from].splice(index, 1);
    newCategories[to].push(item);

    return newCategories;
};

const deleteMovie = (categories, from, targetId) => {
    const newCategories = {
        ...categories,
        [from]: [...categories[from]],
    };

    const index = newCategories[from].findIndex(item => item.id === targetId);
    if (index === -1) return categories;

    newCategories[from].splice(index, 1);

    return newCategories;
};


export default function App({isOpen, setScore, onopen, onOpenChange, score, bgColor, movieId, categoryName, setCategoryName }) {
    const { categories, setCategories, category } = useCategories();
    const saveHandler = () => {
        if (categoryName !== category) {
            const updatedCategories = moveMovie(categories, categoryName, category, movieId);
            setCategories(updatedCategories);
            const data = {
                movieId: movieId,
                fromCategory: categoryName,
                toCategory: category
            }
            const fetch = async () => {
                await fetchChangeListMovie(data);
            }
            fetch();
        }
    }

    const deleteHandler = () => {
        const updatedCategories = deleteMovie(categories, categoryName, movieId);
        setCategories(updatedCategories);
        const data = {
            movieId: movieId,
            fromCategory: categoryName,
        }
        const fetch = async () => {
            await fetchDeleteMovieFromTheList(data);
        }
        fetch();
    }

    console.log(category);

    return (
        <>
            <Modal
                backdrop="opaque"
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                }}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Редактирование</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                               <span className="opacity-60">Моя оценка:  </span>
                                               {score !== null ? (
                                                   <div
                                                       className={`py-1 px-3 text-white rounded font-bold`}
                                                       style={{backgroundColor: bgColor}}
                                                   >
                                                       {score}
                                                   </div>
                                               ) : (
                                                   <div className="p-2 rounded font-bold">Отсутствует</div>
                                               )}
                                        </div>
                                        <RateMovieButtonForProfile setScore={setScore} movieId={movieId} score={score}/>
                                    </div>
                                    <DropdownProfileMovieCard categoryName={categoryName} setCategoryName={setCategoryName} />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="text-rose-600 font-bold hover:bg-rose-200 gap-1" color="danger"
                                        variant="light" onPress={onClose}>
                                    <IconDelete/>
                                    <div
                                        onClick={() => deleteHandler()}
                                        className="text">
                                        Удалить
                                    </div>
                                </Button>
                                <Button className="text-white font-bold bg-green-400 gap-1" color="primary"
                                        onPress={onClose}>
                                    <IconSave/>
                                    <div
                                        onClick={() => saveHandler()}
                                        className="text">
                                        Сохранить
                                    </div>
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
