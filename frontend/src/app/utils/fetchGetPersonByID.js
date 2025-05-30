export async function fetchGetPersonByID(id) {
    try{
        const res = await fetch(`http://localhost:8085/person/findPersonByID?id=${id}`,{
            method: "GET",
            credentials: "include",
        });


        if (!res.ok) {
            return [null, true];
            }

            const data = await res.json();
            return [data, false];
        } catch (err) {
            return [null, true];
        }
}
    