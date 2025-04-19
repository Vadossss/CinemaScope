export async function fetchDeleteComment(id) {
    try {
        const res = await fetch(`http://localhost:8085/admin/deleteComment?id=${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
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