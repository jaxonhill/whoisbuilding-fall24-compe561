"use client";

import { User } from "@/types/db-types";
import { NAVBAR_LINKS } from "../utils/utils";
import Logo from "./logo";
import NavbarLink from "./navbar-link";
import { create_profile_page_link } from "@/utils/utils";
import { Plus } from "lucide-react";
import { useAuth } from "@/features/auth/context/auth-context";

const PLACEHOLDER_GITHUB_AVATAR_URL: string = "https://avatars.githubusercontent.com/u/103388144?v=4";

export default function Navbar() {
    const { user, logout } = useAuth();

	return (
		<nav className="h-24 flex justify-between items-center">
			<Logo />
			<div className="flex gap-8 items-center">
				{NAVBAR_LINKS.map((navbar_link) => {
					return <NavbarLink key={navbar_link.label} navbar_link={navbar_link} />
				})}
				{user ? <LoggedInSection user={user} onLogoutButtonClick={logout} /> : <LoggedOutSection />}
			</div>
		</nav>
	);
}

interface LoggedInSectionProps {
	user: User;
    onLogoutButtonClick: () => void;
}

function LoggedInSection({ user, onLogoutButtonClick }: LoggedInSectionProps) {
	return (
		<div className="flex gap-4 items-center">
			<a href="/add" className="flex gap-2 items-center h-12 px-4 rounded bg-blue-700 font-medium text-white hover:bg-blue-600">
				<Plus className="h-6 w-6 stroke-white" />
				<span>Add Project</span>
			</a>
			<a href={create_profile_page_link(user.username)} className="rounded-full w-8 h-8">
				<img className="rounded-full w-full h-full" src={PLACEHOLDER_GITHUB_AVATAR_URL} alt={`${user.username}'s avatar`} />
			</a>
            <button onClick={onLogoutButtonClick} className="text-blue-700 bg-transparent p-0 hover:underline hover:cursor-pointer">Log Out</button>
		</div>
	)
}

function LoggedOutSection() {
	return (
		<div className="flex gap-4 items-center">
			<a href="/login" className="h-10 flex justify-center items-center px-4 rounded bg-blue-700 font-medium text-white hover:bg-blue-600">
				Log In
			</a>
			<a href="/signup" className="text-blue-700 hover:underline hover:cursor-pointer">
				Sign Up
			</a>
		</div>
	);
}