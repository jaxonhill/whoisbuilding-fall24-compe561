"use client";

import { User } from "@/types/db-types";
import { NAVBAR_LINKS } from "../utils/utils";
import Logo from "./logo";
import NavbarLink from "./navbar-link";
import { create_profile_page_link } from "@/utils/utils";
import { Plus } from "lucide-react";
import { useAuth } from "@/features/auth/context/auth-context";
import ProfileDropdown from "./profile-dropdown";

export default function Navbar() {
  const { user, logout } = useAuth();
  
	return (
		<nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm h-20 flex justify-between items-center">
			<Logo />
			<div className="flex gap-6 items-center">
				{NAVBAR_LINKS.map((navbar_link) => {
					return <NavbarLink key={navbar_link.label} navbar_link={navbar_link} />
				})}
				{user ? <LoggedInSection user={user} logout={logout} /> : <LoggedOutSection />}
			</div>
		</nav>
	);
}

interface LoggedInSectionProps {
	user: User;
    logout: () => void;
}

function LoggedInSection({ user, logout }: LoggedInSectionProps) {
	return (
		<div className="flex gap-4 items-center">
			<a href="/add" className="text-sm flex gap-1 items-center h-10 px-4 py-2 rounded bg-blue-700 font-medium text-white transition-colors duration-200 hover:bg-blue-600">
				<Plus className="h-4 w-4 stroke-white" />
				<span>Add Project</span>
			</a>
			<ProfileDropdown user={user} logout={logout} />
		</div>
	)
}

function LoggedOutSection() {
	return (
		<div className="flex gap-2 items-center">
			<a href="/login" className="text-sm h-10 px-4 py-2 flex justify-center items-center rounded bg-blue-700 font-medium text-white transition-colors duration-200 hover:bg-blue-600">
				Log In
			</a>
			<a href="/signup" className="text-sm h-10 px-4 py-2 flex justify-center items-center rounded bg-slate-100 font-medium text-slate-950 transition-colors duration-200 hover:bg-slate-200">
				Sign Up
			</a>
		</div>
	);
}
