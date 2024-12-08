import { NavbarLinkInfo } from "../types/types"
import { usePathname } from "next/navigation"

interface NavbarLinkProps {
    navbar_link: NavbarLinkInfo;
}

export default function NavbarLink({ navbar_link }: NavbarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === navbar_link.link;

  return (
    <a 
        className={`text-sm ${isActive ? 'font-semibold text-blue-600' : 'font-normal text-slate-800'}`}
        href={navbar_link.link}
    >
        {navbar_link.label}
    </a>
  )
}
