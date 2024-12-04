"use client";

import Discord from "@/components/discord-icon";
import { Button } from "@/components/ui/button";
import { User } from "@/types/db-types";
import { Github, Linkedin, SquarePen } from "lucide-react";

interface ProfileInfoCardProps {
    user: User;
    is_editable?: boolean;
    onEdit?: () => void;
}

export default function ProfileInfoCard({
    user,
    is_editable = false,
    onEdit,
}: ProfileInfoCardProps) {
    return (
        <section className="w-full flex flex-col gap-4">
            <img 
                className="w-full aspect-square rounded-lg" 
                src={user.github_avatar_url} 
                alt={`${user.username}'s avatar`} 
            />
            <div className="flex flex-col">
                <h2 className="text-2xl font-medium">
                    {user.first_name} {user.last_name}
                </h2>
                <h3 className="text-2xl text-slate-600">
                    @{user.username}
                </h3>
            </div>
            <p className="leading-loose text-slate-600">
                {user.bio}
            </p>
            <div className="flex flex-col gap-2">
                <SocialLinkContainer
                    label={user.github_username}
                    icon={<Github className="flex-shrink-0 h-6 w-6 stroke-slate-800" />}
                    link={`https://github.com/${user.github_username}`}
                    isPlaceholder={false}
                />
                <SocialLinkContainer
                    label={user.linkedin_url || "N/A"}
                    icon={<Linkedin className="flex-shrink-0 h-6 w-6 stroke-slate-800" />}
                    link={user.linkedin_url || "#"}
                    isPlaceholder={!user.linkedin_url}
                />
                <SocialLinkContainer
                    label={user.discord_username || "N/A"}
                    icon={<Discord className="flex-shrink-0 h-6 w-6 stroke-slate-800 fill-slate-800" />}
                    link={user.discord_username ? "https://discord.com/" : "#"}
                    isPlaceholder={!user.discord_username}
                />
            </div>
            {is_editable && (
                <div className="w-full pt-4">
                    <Button
                        onClick={onEdit}
                        className="flex gap-2 w-full p-0 items-center bg-blue-700 h-12 hover:bg-blue-600"
                    >
                        <SquarePen className="h-6 w-6 stroke-white flex-shrink-0" />
                        <span className="text-white font-medium flex-shrink-0 text-base">Edit Profile</span>
                    </Button>
                </div>
            )}
        </section>
    );
}

interface SocialLinkProps {
    label: string;
    icon: JSX.Element;
    link: string;
    isPlaceholder?: boolean;
}

function SocialLinkContainer({ icon, label, link, isPlaceholder = false }: SocialLinkProps) {
    const baseClasses = "flex items-center gap-3";
    const classes = isPlaceholder 
        ? `${baseClasses} text-slate-400 cursor-default` 
        : baseClasses;

    const Content = () => (
        <div className={classes}>
            {icon}
            <span className="truncate">{label}</span>
        </div>
    );

    if (isPlaceholder) {
        return <Content />;
    } else {
        return (
            <a href={link} className={classes}>
                {icon}
                <span className="truncate">{label}</span>
            </a>
        );
    }
}