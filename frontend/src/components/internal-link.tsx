import { ReactNode } from "react";

interface InternalLinkProps {
    href: string;
    text: string | ReactNode;
}

export function InternalLink({ href, text }: InternalLinkProps) {
    return <a className="text-blue-700 hover:underline" href={href}>{text}</a>;
} 