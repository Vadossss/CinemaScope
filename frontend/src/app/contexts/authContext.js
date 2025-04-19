import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [role, setRole] = useState(null);
    const [username, setUsername] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const checkMe = async () => {
            try {
                const res = await fetch(`${BASE_URL}/auth/me`, {
                    method: "GET",
                    credentials: "include"
                });

                if (res.ok) {
                    const data = await res.json();
                    setUsername(data.username);
                    setRole(data.role);
                    setUserId(data.id);
                    setAuth(true);
                }
                else if (res.status === 403) {
                    console.log("Я здесь");

                    const updateRefreshToken = async () => {
                        try {
                            const res = await fetch(`${BASE_URL}/auth/updateRefreshToken`, {
                                method: "POST",
                                credentials: "include"
                            });

                            if (res.ok) {
                                checkMe();
                            }
                            else if (res.status === 401) {


                                setAuth(false);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    updateRefreshToken();

                    // setAuth(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        checkMe();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, username, role, userId }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}