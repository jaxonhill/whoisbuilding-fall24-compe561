"use client";

import { User } from "@/types/common-types";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for token and fetch user data on mount
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await fetch("http://127.0.0.1:8000/auth/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    }
                } catch (error) {
                    console.error("Auth check failed:", error);
                    localStorage.removeItem("token");
                }
            }
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const formData = new FormData();
        formData.append("username", email);
        formData.append("password", password);

        const response = await fetch("http://127.0.0.1:8000/auth/token", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();
        localStorage.setItem("token", data.access_token);

        // Fetch user data
        const userResponse = await fetch("http://127.0.0.1:8000/auth/me", {
            headers: {
                Authorization: `Bearer ${data.access_token}`,
            },
        });

        if (userResponse.ok) {
            const userData = await userResponse.json();
            setUser(userData);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
} 