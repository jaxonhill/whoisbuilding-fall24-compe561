export type Option = {
    id: string;
    label: string;
    isSelected: boolean;
}

export type User = {
    id: number;
    name: string;
    email: string;
    github_username: string;
    expertise: string;
    socials: string;
    disabled: boolean;
    created_at: string;
}