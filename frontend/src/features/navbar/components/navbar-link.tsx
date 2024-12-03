import { NavbarLinkInfo } from "../types/types"

interface NavbarLinkProps {
    navbar_link: NavbarLinkInfo;
}

export default function NavbarLink({ navbar_link }: NavbarLinkProps) {
  return (
    <a 
        className="text-slate-800 font-medium hover:text-slate-600"
        href={navbar_link.link}
    >
        {navbar_link.label}
    </a>
  )
}
