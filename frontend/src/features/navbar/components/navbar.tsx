import { User } from "@/types/common-types";
import { NAVBAR_LINKS } from "../utils/utils";
import Logo from "./logo";
import NavbarLink from "./navbar-link";
import { create_username_link, CURRENT_TEST_USER } from "@/utils/utils";
import { Plus } from "lucide-react";

// const user: User = CURRENT_TEST_USER;
const user = CURRENT_TEST_USER;

export default function Navbar() {
	return (
		<nav className="h-24 flex justify-between items-center">
			<Logo />
			<div className="flex gap-8 items-center">
				{NAVBAR_LINKS.map((navbar_link) => {
					return <NavbarLink key={navbar_link.label} navbar_link={navbar_link} />
				})}
				{user ? <LoggedInSection user={user} /> : <LoggedOutSection />}
			</div>
		</nav>
	);
}

interface LoggedInSectionProps {
	user: User;
}

function LoggedInSection({ user }: LoggedInSectionProps) {
	return (
		<div className="flex gap-4 items-center">
			<a href="/add" className="flex gap-2 items-center h-12 px-4 rounded bg-blue-700 font-medium text-white hover:bg-blue-600">
				<Plus className="h-6 w-6 stroke-white" />
				<span>Add Project</span>
			</a>
			<a href={create_username_link(user.whois_username)} className="rounded-full w-8 h-8">
				<img className="rounded-full w-full h-full" src={user.avatar_img_url} alt={`${user.github_username}'s avatar`} />
			</a>
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