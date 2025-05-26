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

        const contentType = res.headers.get("content-type");
        let dataRes;

        if (contentType && contentType.includes("application/json")) {
            dataRes = await res.json();
        } else {
            dataRes = await res.text();
        }

        console.log(dataRes);

        if (res.status === 200) {
            await refreshAuth();
            router.push(from || "/");
            setAuth(true);
        } else {
            setLoginMessage(
                typeof dataRes === "string"
                    ? dataRes
                    : "Неверный логин или пароль"
            );
        }
    } catch (error) {
        console.error("Ошибка при логине:", error.message);
        setLoginMessage("Произошла ошибка при соединении с сервером");
    }
}