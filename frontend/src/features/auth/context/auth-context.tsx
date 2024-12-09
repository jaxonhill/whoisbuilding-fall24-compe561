"use client";

import { User } from "@/types/db-types";
import {
  UserLoginError,
  UserLoginErrorName,
} from "@/core/errors/types/UserLoginError";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createUserRegistration } from "@/lib/api/user";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<User | void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

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
            setToken(token);
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

    // check invalid responses
    if (response.status === 401) {
      // handle incorrect credentials
      const { detail } = await response.json();
      throw new UserLoginError({
        name: UserLoginErrorName.INVALID_CREDENTIALS,
        message: detail,
      });
    } else if (response.status === 429) {
      // handle rate limit exceeded
      const { detail } = await response.json();
      throw new UserLoginError({
        name: UserLoginErrorName.LOGIN_ATTEMPT_THRESHOLD_MET,
        message: detail,
      });
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
      const userData: User = await userResponse.json();

      setUser(userData);
      setToken(data.access_token);
      return userData;
    }
  };

  const signup = async (email: string, password: string) => {
    const registration = await createUserRegistration(email, password);
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, isLoading }}
    >
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
