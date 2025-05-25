import { useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { fetchNewCommentForFilm } from "@/app/utils/fetchNewScoreForFilm";

export default function App({ movieId }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [rating, setRating] = useState(0);

    const handleRate = async () => {
        console.log(`Оценка фильма ${movieId}: ${rating} звезд`);
        const body = {id: movieId, score: rating};
        console.log(body);
        const res = await fetchNewCommentForFilm(body);
        onOpenChange(false); // Закрыть модалку
    };

    return (
        <div className="mt-2">
            <Button onPress={onOpen} className="bg-gray-300 pr-3 pl-2" variant="bordered">
                Оценить фильм
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
                                            className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-400"}`}
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
                                    isDisabled={rating === 0} // блокируем кнопку, если оценка не выбрана
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
