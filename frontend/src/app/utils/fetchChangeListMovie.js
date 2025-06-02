const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchChangeListMovie(data) {
    try {
        const res = await fetch(`${BASE_URL}/user/changeListMovie`, {
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