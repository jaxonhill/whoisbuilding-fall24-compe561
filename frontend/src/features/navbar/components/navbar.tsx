"use client";

import Logo from "./logo";
import { useAuth } from "@/features/auth/context/auth-context";

export default function Navbar() {
    const { user, login, logout } = useAuth();

    return (
        <nav className="h-24 flex justify-between items-center">
            <Logo />
            <div className="flex gap-4 items-center">
                {user ? (
                    <>
                        <span className="text-slate-700">{user.name}</span>
                        <button 
                            onClick={logout}
                            className="h-10 px-4 rounded bg-blue-700 font-medium text-white hover:bg-blue-600"
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <button
							onClick={() => login("string", "test")}
							className="h-10 px-4 rounded bg-blue-700 font-medium text-white hover:bg-blue-600"
						>
                            Log In
                        </button>
                        <a className="text-blue-700 hover:underline hover:cursor-pointer">
                            Sign Up
                        </a>
                    </>
                )}
            </div>
        </nav>
    );
}