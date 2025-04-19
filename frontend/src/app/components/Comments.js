"use client";

import { fetchComments } from "../utils/fetchComments"
import { useState, useEffect, useCallback } from "react"
import Comment from "@/app/components/Comment";
import InputComment from "@/app/components/InputComment";

export default function App({ id }) {
    const [comments, setComments] = useState(null); // Только одно состояние

    const fetchData = useCallback(async () => {
        try {
            const data = await fetchComments(id);
            setComments(data ?? []); // если null, сразу пустой массив
        } catch (error) {
            console.log(error);
            setComments([]); // в случае ошибки — тоже пустой массив
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (comments === null) {
        return <div>Загрузка...</div>; // Показываем лоадер только пока comments = null
    }

    return (
        <div className="flex flex-col gap-4 mr-16 ml-16">
            <h1>Комментарии {comments.length}</h1>
            <InputComment movieId={id} fetchData={fetchData} />
            {comments.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {comments.map((data, index) => (
                        <Comment key={index} data={data} />
                    ))}
                </div>
            ) : (
                <p>Здесь пока нет ни одного комментария, вы можете стать первым!</p>
            )}
        </div>
    );
}
