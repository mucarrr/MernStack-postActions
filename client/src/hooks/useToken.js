import { useState, useEffect } from "react";

export const useToken = () => {
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            try {
                if (storedToken) {
                    setToken(storedToken);
                }
            } catch (error) {
                console.error("Error parsing token from localStorage:", error);
                setToken(storedToken); // Fallback to raw string
            }
        }
    }, []);

    const updateToken = (newToken) => {
        if (newToken) {
            localStorage.setItem("token", newToken);
            setToken(newToken);
        } else {
            localStorage.removeItem("token");
            setToken("");
        }
    };

    const clearToken = () => {
        localStorage.removeItem("token");
        setToken("");
    };

    return [token, updateToken, clearToken];
};