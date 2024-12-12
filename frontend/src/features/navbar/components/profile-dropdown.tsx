"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/db-types";
import { UserRound, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileDropdown({
  user,
  logout,
}: {
  user: User;
  logout: () => void;
}) {
  const router = useRouter();

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            className="rounded-full w-8 h-8 hover:opacity-95"
          >
            {user.profile_image_url ? (
              <img
                className="rounded-full w-8 h-8"
                src={user.profile_image_url}
                alt={`${user.username}'s avatar`}
              />
            ) : (
              <div className="rounded-full w-8 h-8 bg-slate-200" />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute right-[-16px] top-3">
          <DropdownMenuItem
            className="py-2 text-base text-slate-950"
            onClick={() => router.push(`/profile/${user.username}`)}
          >
            <UserRound className="size-5" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="py-2 text-base text-slate-950"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            <LogOut className="size-5" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
