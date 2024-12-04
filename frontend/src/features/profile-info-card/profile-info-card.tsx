"use client";

import Discord from "@/components/discord-icon";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, SquarePen } from "lucide-react";

interface ProfileInfoCardProps {
    first_name: string | null;
    last_name: string | null;
    username: string | null;
    bio: string | null;
    github_username: string | null;
    github_avatar_url: string | null;
    linkedin_url: string | null;
    discord_username: string | null;
    is_editable?: boolean;
    onEdit?: () => void;
    placeholder_text?: {
        name?: string;
        username?: string;
        bio?: string;
        github?: string;
        discord?: string;
        linkedin?: string;
    };
}

export default function ProfileInfoCard({
    first_name,
    last_name,
    username,
    bio,
    github_username,
    github_avatar_url,
    linkedin_url,
    discord_username,
    is_editable = false,
    onEdit,
    placeholder_text,
}: ProfileInfoCardProps) {
    const defaultPlaceholders = {
        name: "Your Name",
        username: "Your Username",
        bio: "Tell us about yourself...",
        github: "GitHub Username",
        discord: "Discord Username",
        linkedin: "LinkedIn URL",
    };

    const placeholders = { ...defaultPlaceholders, ...placeholder_text };

    const displayName = first_name && last_name 
        ? `${first_name} ${last_name}`
        : placeholders.name;

    const displayUsername = username || placeholders.username;
    const displayBio = bio || placeholders.bio;

    return (
        <section className="w-full flex flex-col gap-4">
            <img 
                className="w-full aspect-square rounded-lg" 
                src={github_avatar_url || "/test.png"} 
                alt={`${displayUsername}'s avatar`} 
            />
            <div className="flex flex-col">
                <h2 className={`text-2xl font-medium ${!first_name && !last_name ? 'text-slate-400' : ''}`}>
                    {displayName}
                </h2>
                <h3 className={`text-2xl ${username ? 'text-slate-600' : 'text-slate-400'}`}>
                    @{displayUsername}
                </h3>
            </div>
            <p className={`leading-loose ${bio ? 'text-slate-600' : 'text-slate-400'}`}>
                {displayBio}
            </p>
            <div className="flex flex-col gap-2">
                <SocialLinkContainer
                    label={github_username || placeholders.github}
                    icon={<Github className="flex-shrink-0 h-6 w-6 stroke-slate-800" />}
                    link={github_username ? `https://github.com/${github_username}` : "#"}
                    isPlaceholder={!github_username}
                />
                <SocialLinkContainer
                    label={linkedin_url || placeholders.linkedin}
                    icon={<Linkedin className="flex-shrink-0 h-6 w-6 stroke-slate-800" />}
                    link={linkedin_url || "#"}
                    isPlaceholder={!linkedin_url}
                />
                <SocialLinkContainer
                    label={discord_username || placeholders.discord}
                    icon={<Discord className="flex-shrink-0 h-6 w-6 stroke-slate-800 fill-slate-800" />}
                    link={discord_username ? "https://discord.com/" : "#"}
                    isPlaceholder={!discord_username}
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