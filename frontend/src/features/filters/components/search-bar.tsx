import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { UserDisplay } from "@/types/db-types";
import { searchUsers } from "@/lib/api/users";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "@/hooks/use-toast";

export default function SearchBar({ value, onChange }: { value: string, onChange: (text: string) => void }) {
	const [isFocused, setIsFocused] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [possibleUsers, setPossibleUsers] = useState<UserDisplay[]>([]);
	const [loading, setLoading] = useState(false);
	
	const debouncedSearchText = useDebounce(searchText, 500);

	useEffect(() => {
		async function fetchUsers() {
			if (!debouncedSearchText || debouncedSearchText === "@") {
				setPossibleUsers([]);
				return;
			}

			setLoading(true);
			try {
				const results = await searchUsers(debouncedSearchText);
				setPossibleUsers(results);
			} catch (error) {
				toast({
					title: "Failed to fetch users",
					description: "Please try again later",
					variant: "destructive",
				});
				setPossibleUsers([]);
			} finally {
				setLoading(false);
			}
		}

		fetchUsers();
	}, [debouncedSearchText]);

	const handleUserSelect = (username: string) => {
		onChange(username);
		setSearchText("");
		setPossibleUsers([]);
		setIsFocused(false);
	};

	return (
		<div className="relative w-full">
			<div className={cn(
				"flex gap-2 items-center border border-slate-300 rounded-lg px-4 h-12 w-full",
				isFocused && "ring-2 ring-slate-200"
			)}>
				<Search className="h-5 w-5 stroke-slate-400 flex-shrink-0 stroke-[1.5px]" />
				<input
					type="text"
					placeholder="Search by username"
					className="placeholder-slate-400 w-full focus:outline-none"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => {
						setTimeout(() => setIsFocused(false), 200);
					}}
				/>
			</div>

			{/* Dropdown Menu */}
			{isFocused && (
				<div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-50">
					{loading ? (
						<div className="px-4 py-2 text-sm text-slate-500">Loading...</div>
					) : possibleUsers.length > 0 ? (
						<div className="px-2">
							{possibleUsers.map((user) => (
								<button
									key={user.username}
									onClick={() => handleUserSelect(user.username)}
									className="w-full text-left px-2 py-2 hover:bg-slate-50 rounded-md"
								>
									<div className="flex items-center gap-2">
										<img 
											src={user.profile_image_url} 
											alt={`${user.username}'s avatar`}
											className="w-6 h-6 rounded-full"
										/>
										<span className="text-sm text-slate-500">@{user.username}</span>
									</div>
								</button>
							))}
						</div>
					) : searchText ? (
						<div className="px-4 py-2 text-sm text-slate-500">No users found</div>
					) : (
						<div className="px-4 py-2 text-sm text-slate-500">
							Start typing to search...
						</div>
					)}
				</div>
			)}
		</div>
	);
}
