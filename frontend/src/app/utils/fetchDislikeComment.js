const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchDislikeComment(commentId) {
    const data = { commentId: commentId }
    try {
        const res = await fetch(`${BASE_URL}/user/comment/${commentId}/dislike`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });

        const dataRes = await res.json();

        console.log(dataRes);

        if (res.ok) {
            return dataRes;
        } else {
            console.log(dataRes);
        }
    } catch (error) {
        console.log("может тут");

    }
}