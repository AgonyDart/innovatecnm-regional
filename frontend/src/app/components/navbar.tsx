"use client";

import { usePathname } from "next/navigation";
import { Home, Sun, ChartNoAxesColumn, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/home", icon: Home },
    // { href: "/panels", icon: Sun },
    { href: "/charts", icon: ChartNoAxesColumn },
    { href: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-background w-[232px] shadow flex gap-2 p-2 justify-center rounded-full z-10">
      {links.map(({ href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isActive ? "bg-primary" : "bg-light-background"
            }`}
          >
            <Icon
              size={32}
              className={isActive ? "text-background" : "text-bone"}
            />
          </Link>
        );
      })}
    </nav>
  );
}
