export async function fetchLogin(event, { setAuth, router, setLoginMessage, refreshAuth, from }) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log('Submitting form:', data);

    try {
        const res = await fetch(`http://localhost:8085/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });

        const dataRes = await res.json();

        console.log(dataRes);

        if (res.status === 200) {
            await refreshAuth();
            router.push(from || "/");
            setAuth(true);
        } else {
            setLoginMessage(dataRes.error);
            console.log(dataRes);
        }
    } catch (error) {
        // setLoginMessage(error);
    }
}