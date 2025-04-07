import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [username, setUsername] = useState(null)

    useEffect(() => {
        const checkMe = async () => {
            try {
                const res = await fetch("http://localhost:8085/auth/me", {
                    method: "GET",
                    credentials: "include"
                });

                if (res.ok) {
                    const data = await res.text();
                    setUsername(data);
                    setAuth(true);
                }
                else {
                    setAuth(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        checkMe();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, username }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}