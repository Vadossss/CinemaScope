export async function fetchNewCommentForFilm(body) {
    try {
        const res = await fetch(`http://localhost:8085/user/newCommentForFilm`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            return true;
        }
        else if (res.status === 404) {
            console.log("Ошибка");
            return false;
        }
    } catch (error) {
        console.log("Error");
        return null;
    }
}