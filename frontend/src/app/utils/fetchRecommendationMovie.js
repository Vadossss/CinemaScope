export async function fetchRecommendationMovie() {
    try {
        const res = await fetch("http://localhost:8085/user/userPersonalCatalog?page=1&size=250", {
            method: "GET",
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