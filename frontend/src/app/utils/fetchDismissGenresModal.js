const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchDismissGenresModal() {
    try {
        const res = await fetch(`${BASE_URL}/user/genresDismiss`, {
            method: "PUT",
            credentials: "include"
        });

        const dataRes = await res.json();

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