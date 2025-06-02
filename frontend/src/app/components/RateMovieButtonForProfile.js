import { useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { fetchNewCommentForFilm } from "@/app/utils/fetchNewScoreForFilm";
import {useAuth} from "@/app/contexts/authContext";
import {useRouter} from "next/navigation";

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

export default function App({ setScore, movieId, score }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [ rating, setRating ] = useState(0);
    const { auth } = useAuth();
    const router = useRouter();

    const handleRate = async () => {
        console.log(`Оценка фильма ${movieId}: ${rating} звезд`);
        const body = {id: movieId, score: rating};
        console.log(body);
        const res = await fetchNewCommentForFilm(body);
        setScore(rating);
        onOpenChange(false);
    };

    const handleButtonClick = () => {

        if (auth === false) {
            router.push("/auth");
        }
        else {
            return onOpen();
        }
    }

    return (
        <div className="mt-2">
            <Button onPress={() => handleButtonClick()}
                    className="flex items-center gap-2 p-1 px-2 bg-gray-100 rounded">
                         {score !== null ? (
                             <div className="flex gap-3">
                                 <div className="h-4 w-4 mb-0.5">
                                     <IconEdit/>
                                 </div>
                                 Изменить
                             </div>
                         ) : (
                             <div className="flex gap-1 items-center">
                                 <div className="h-4 w-4 mb-0.5">
                                     <img src="/icon_star.svg"/>
                                 </div>
                                 Оценить
                             </div>
                         )}
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Оценить фильм</ModalHeader>
                            <ModalBody className="flex flex-col items-center gap-4">
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className={`text-2xl ${star <= rating ? "text-orange-500" : "text-gray-400"}`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500">
                                    {rating > 0 ? `Вы выбрали ${rating} звезд` : "Выберите количество звезд"}
                                </p>
                            </ModalBody>
                            <ModalFooter className="flex justify-center">
                                <Button
                                    color="primary"
                                    onPress={handleRate}
                                    isDisabled={rating === 0}
                                >
                                    Оценить
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
