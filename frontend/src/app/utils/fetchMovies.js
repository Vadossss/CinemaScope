const raw = JSON.stringify({
    limit: 100,
    types: [
        "movie"
    ]
});

export async function fetchMovies() {
    try {
        const res = await fetch("http://localhost:8085/films/movie", {
            method: "POST",
            body: raw,
            redirect: "follow",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (res.ok) {
            return [await res.json(), false];
        }
        else {
            console.log("Ошибка");
            return [null, false]
        }
    } catch (error) {
        console.log(error);
        return [, null];
    }
}