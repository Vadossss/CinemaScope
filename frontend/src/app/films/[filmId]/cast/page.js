"use client"

import { useParams } from "next/navigation";

export default function App() {
    const params = useParams();
    const filmId = params.filmId;
    console.log(filmId);

    return (
        <div>Каст</div>
    )
}