"use client";

import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { useAuth } from "@/features/auth/context/auth-context";

interface EditProfileButtonProps {
    username: string;
}

export default function EditProfileButton({ username }: EditProfileButtonProps) {
    const { user } = useAuth();

    const isEditable: boolean = user?.username === username;

    if (!isEditable) return null;
    return (
        <div className="w-full pt-4">
            <Button
                onClick={() => {}}
                className="flex gap-2 w-full p-0 items-center bg-blue-700 h-12 hover:bg-blue-600"
            >
                <SquarePen className="h-6 w-6 stroke-white flex-shrink-0" />
                <span className="text-white font-medium flex-shrink-0 text-base">Edit Profile</span>
            </Button>
        </div>
    );
}