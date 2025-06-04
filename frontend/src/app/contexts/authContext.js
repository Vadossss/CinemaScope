import { createContext, useState, useEffect, useContext } from "react";
import { fetchWithAuth } from "@/app/utils/fetchWithAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [role, setRole] = useState(null);
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    const [hasChosenGenres, setHasChosenGenres] = useState(null);
    const [lastDismissed, setLastDismissed] = useState(null);
    const [scores, setScores] = useState([]);
    const [categories, setCategories] = useState([]);
    const [avatar, setAvatar] = useState(null);

    const resetAuthState = () => {
        setAuth(false);
        setRole(null);
        setUsername(null);
        setUserId(null);
        setHasChosenGenres(null);
        setLastDismissed(null);
        setScores(null);
        setCategories(null);
        setAvatar(null);
    };

    const refreshAuth = async () => {
        try {
            const res = await fetchWithAuth("/auth/me", {
                method: "GET",
            });

            if (res && res.ok) {
                const data = await res.json();
                console.log(data);
                setUsername(data.username);
                setRole(data.role);
                setUserId(data.id);
                setHasChosenGenres(data.hasChosenGenres);
                setLastDismissed(data.lastDismissedGenresAt);
                setCategories(data.categories);
                setScores(data.scores);
                setAvatar(data.avatarUrl)
                setAuth(true);
            } else {
                console.log("Пользователь не авторизован или обновление токена не удалось");
                resetAuthState();
            }
        } catch (error) {
            console.error("Ошибка сети при проверке авторизации:", error);
            resetAuthState();
        }
    };

    useEffect(() => {
        refreshAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, username, categories, setCategories, avatar, setAvatar, setHasChosenGenres, hasChosenGenres, lastDismissed,
            scores, setLastDismissed, role, userId, resetAuthState, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
