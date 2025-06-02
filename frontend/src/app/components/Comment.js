"use client"

import { User, Tooltip } from "@heroui/react"
import { useEffect, useState } from "react"
import { fetchLikeComment } from "../utils/fetchLikeComment";
import { useAuth } from "../contexts/authContext";
import { useRouter } from "next/navigation";
import { fetchDeleteComment } from "../utils/fetchDeleteComment";
import { fetchDislikeComment } from "@/app/utils/fetchDislikeComment";


export const IconArrow = ({ props, colorArrow }) => {
    return (
        <svg className={props} width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 5L6 11M12 5L18 11" strokeWidth="2" stroke={colorArrow} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconDelete = ({ props }) => {
    return (
        <svg className={props} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1f1f1f">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 
            33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
    )
}

export default function App({ data }) {
    const [grade, setGrade] = useState(data.likes.length - data.dislikes.length);
    const [isLiked, setIsLiked] = useState();
    const [isDisliked, setIsDisliked] = useState();
    const { auth, role, userId } = useAuth();
    const [gradeColor, setGradeColor] = useState(null);
    const [colorLikeArrow, setColorLikeArrow] = useState(null);
    const [colorDislikeArrow, setColorDislikeArrow] = useState(null);
    const [deleteComment, setDeleteComment] = useState(false);

    const router = useRouter();
    console.log(data);
    console.log(userId);


    useEffect(() => {
        setGrade(data.likes.length - data.dislikes.length);
        setColorLikeArrow(data.likes.includes(userId) ? "#3cce7b" : "#1f1f1f");
        setColorDislikeArrow(data.dislikes.includes(userId) ? "#ff1414" : "#1f1f1f");
    }, [data, userId]);

    useEffect(() => {
        if (grade > 0) setGradeColor("#3cce7b");
        else if (grade < 0) setGradeColor("#ff0000");
        else setGradeColor("#000000");
    }, [grade]);

    // useEffect(() => {
    //     if (data.likes.includes(userId)) {
    //         setColorLikeArrow("#3cce7b");
    //     } else {
    //         setColorLikeArrow("#1f1f1f");
    //     }
    //
    //     if (data.dislikes.includes(userId)) {
    //         setColorDislikeArrow("#ff1414");
    //     } else {
    //         setColorDislikeArrow("#1f1f1f");
    //     }
    //
    //     setGrade(data.likes.length - data.dislikes.length);
    // }, [data, userId]);

    // useEffect(() => {
    //     if (isLiked) {
    //         setColorLikeArrow("#3cce7b");
    //         setColorDislikeArrow("#1f1f1f");
    //     }
    //     else if (!isLiked) {
    //         setColorLikeArrow("#1f1f1f");
    //     }
    // }, [isLiked])
    //
    // useEffect(() => {
    //     if (isDisliked) {
    //         setColorLikeArrow("#1f1f1f");
    //         setColorDislikeArrow("#f44336");
    //     }
    //     else if (!isDisliked && !isLiked) {
    //         setColorLikeArrow("#1f1f1f");
    //         setColorDislikeArrow("#1f1f1f");
    //     }
    //     // setColoArrow(isLiked ? "#3cce7b" : isDisliked ? "#f44336" : "#1f1f1f");
    // }, [isDisliked])


    const handlerLike = async (id) => {
        if (!auth) {
            router.push('/auth');
        }
        else {
            const res = await fetchLikeComment(id)
            console.log(res);

            if (res !== null) {
                setGrade(res.count);
                if (res.status === 'reaction_removed') {
                    setColorLikeArrow("#1f1f1f");
                }
                else if ("liked") {
                    setColorLikeArrow("#3cce7b")
                    setColorDislikeArrow("#1f1f1f");
                }
            }
        }
    }

    const handlerDislike = async (id) => {
        if (!auth) {
            router.push('/auth');
        }
        else {
            const res = await fetchDislikeComment(id)
            console.log(res);

            if (res !== null) {
                setGrade(res.count);
                if (res.status === 'reaction_removed') {
                    setColorDislikeArrow("#1f1f1f");
                }
                else if ("disliked") {
                    setColorDislikeArrow("#f44336")
                    setColorLikeArrow("#1f1f1f");
                }
            }
        }
        // if (isDisliked) {
        //     setGrade(prev => prev + 1);
        // }
        // else {
        //     setGrade(prev => prev - 1);
        // }
        // setIsDisliked(!isDisliked);
        // setIsLiked(false);
    }

    const handlerDelete = async () => {
        try {
            const res = await fetchDeleteComment(data.commentId);
            if (res) {
                setDeleteComment(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {!deleteComment ? (<div className="flex flex-col gap-2">
                <div className="flex gap-1 items-center">
                    <div className="flex gap-1 items-center">
                        <User
                            avatarProps={{
                                size: "sm",
                                src: "/icon_avatar1.png",
                            }}
                            classNames={{
                                name: "text-default-600",
                                description: "text-default-500",
                            }}
                        />
                        <span className="text-sm">{data.userName}</span>
                        <span className="text-gray-500 text-sm">{data.createdAt}</span>
                        {role === "ROLE_ADMIN" && <Tooltip content="Удалить комментарий">
                            <button onClick={() => handlerDelete(data.commentId)} className="group hover:bg-dislike-hover transition duration-300 ease-in-out rounded">
                                <IconDelete props="group-hover:fill-red-700 transition duration-300 ease-in-out" />
                            </button>
                        </Tooltip>}
                    </div>
                </div>
                <div>
                    <p>{data.comment}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => handlerLike(data.commentId)} className="group font-bold text-gray-500 hover:bg-like-hover rounded">
                        <IconArrow colorArrow={colorLikeArrow} props={`transition-colors duration-200 group-hover:stroke-like-arrow-hover stroke-black`} />
                    </button>
                    <span style={{ color: gradeColor }}>{grade}</span>
                    <button onClick={() => handlerDislike(data.commentId)} className="group font-bold text-gray-500 hover:bg-dislike-hover rounded">
                        <IconArrow colorArrow={colorDislikeArrow} props={`-scale-100 transition-colors duration-200 group-hover:stroke-dislike-arrow-hover stroke-black`} />
                    </button>
                </div>
            </div>) :
                <div>Комментарий удалён</div>}
        </div>
    )
}