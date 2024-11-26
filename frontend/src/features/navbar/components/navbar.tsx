import Logo from "./logo";

export default function Navbar() {
	return (
		<nav className="h-24 flex justify-between items-center">
			<Logo />
			<div className="flex gap-4 items-center">
				<button className="h-10 px-4 rounded bg-blue-700 font-medium text-white hover:bg-blue-600">
					Log In
				</button>
				<a className="text-blue-700 hover:underline hover:cursor-pointer">
					Sign Up
				</a>
			</div>
		</nav>
	);
}
