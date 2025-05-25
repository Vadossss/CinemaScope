import {fetchWithAuth} from "@/app/utils/fetchWithAuth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchNewCommentForFilm(body) {
    try {
        const res = await fetchWithAuth(`/user/newScoreForFilm`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        console.log(res.json());
        if (res === false) {
            // return true;
        }

    } catch (error) {
        console.log("Error");
        return null;
    }
}