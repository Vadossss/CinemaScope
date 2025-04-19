export async function fetchAddWishlist(itemId, categoryName) {
    const data = { itemId, categoryName };
    try {
        const res = await fetch(`http://localhost:8085/user/addItemToList`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });

        const dataRes = await res.json();

        console.log(dataRes);

        if (res.status === 200) {

        } else {
            setLoginMessage(dataRes.error);
            console.log(dataRes);
        }
    } catch (error) {
        // setLoginMessage(error);
    }
}