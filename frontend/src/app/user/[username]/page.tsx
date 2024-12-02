"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function UserPage({  }) {
  const pathname: string = usePathname();

  console.log(pathname);

  return (
    <div>
      {pathname}
    </div>
  )
}
