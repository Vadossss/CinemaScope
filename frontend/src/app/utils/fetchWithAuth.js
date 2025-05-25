const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchWithAuth = async (url, options = {}) => {
    const response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        credentials: "include",
    });
    console.log("тут");

    if (response.status === 403) {
        console.log("а теперь тут");
        // Пробуем обновить токен
        const refreshResponse = await fetch(`${BASE_URL}/auth/updateRefreshToken`, {
            method: "POST",
            credentials: "include",
        });

        if (refreshResponse.ok) {
            // Успешно обновили — повторяем исходный запрос
            const retryResponse = await fetch(`${BASE_URL}${url}`, {
                ...options,
                credentials: "include",
            });
            return retryResponse;
        } else {
            return false;
            // throw new Error("Unauthorized and refresh failed");
        }
    }

    return response;
};
