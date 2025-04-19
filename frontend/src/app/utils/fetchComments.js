export async function fetchComments(id) {
    try {
        const res = await fetch(`http://localhost:8085/comments/getCommentsForMovie?movieId=${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (res.ok) {
            return await res.json();
        }
        else if (res.status === 404) {
            console.log("Ошибка");
            return null;
        }
    } catch (error) {
        console.log("Error");
        return null;
    }
}