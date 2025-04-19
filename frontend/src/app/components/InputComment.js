"use client"

import { Textarea, Button } from "@heroui/react";
import { fetchNewCommentForFilm } from "../utils/fetchNewCommentForFilm";
import { useEffect, useState } from "react";

export default function App({ movieId, fetchData }) {
    const [commentText, setCommentText] = useState("");
    const [stateButton, setStateButton] = useState(true)

    useEffect(() => {
        if (commentText.length > 0) {
            setStateButton(false);
        }
        else {
            setStateButton(true);
        }
    }, [commentText])

    const handlerInput = async () => {
        console.log("Ono");

        const body = { id: movieId, comment: commentText }
        const res = await fetchNewCommentForFilm(body);
        if (res) {
            setCommentText("");
            fetchData();
        }
    }

    return (
        <div className="w-full flex flex-col gap-3">
            <Textarea
                key="bordered"
                className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                label="Ваш комментарий"
                labelPlacement="outside"
                placeholder="Пиши пиши свои букавы"
                variant="bordered"
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
            />
            <div className="flex justify-end">
                <Button

                    isDisabled={stateButton}
                    onPress={() => handlerInput()}
                    className="p-2 rounded bg-gray-300 text-sm font-bold">Отправить</Button>
            </div>
        </div>
    );
}