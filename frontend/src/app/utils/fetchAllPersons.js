export async function getPersons(page, size=15) {
    try{
        const res = await fetch(`http://localhost:8085/person/getPersons?page=${page}&size=${size}`,{
            method: "GET",
            credentials: "include",
            headers:{
                "Content-Type": "application/json"
            },
        });


        if (res.ok) {
            return [await res.json(), false];
        }

        else if (res.status === 404) {
            console.log("Ошибка");
            return [null, false]
        }
        
        } catch (error) {
            console.log("Error");
            return [, null];
        }
}