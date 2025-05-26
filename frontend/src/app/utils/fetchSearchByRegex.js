export async function fetchSearchByRegex(searchString) {
    try {
        const res = await fetch("http://localhost:8085/films/findByRegex?regex=" + searchString, {
            method: "GET",
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