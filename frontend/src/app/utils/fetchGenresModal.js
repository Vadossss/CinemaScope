const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchGenresModal(favoriteGenres) {

    try {

        const data = {favoriteGenres};
        console.log(data)
        const res = await fetch(`${BASE_URL}/user/setFavoriteGenres`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });

        const dataRes = await res.text();

        console.log(dataRes);

        // if (res.ok) {
        //     return dataRes;
        // } else {
        //     console.log(dataRes);
        // }
    } catch (error) {
        console.log("может тут");

    }
}