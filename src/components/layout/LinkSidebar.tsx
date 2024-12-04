'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface Props {
  href: string;
  text: string;
  icon: JSX.Element;
}

export const LinkSidebar = ({ href, text, icon }: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 p-2 rounded-md hover:bg-slate-300",
        pathname === href && "font-semibold bg-slate-300" 
      )}
    >
      {icon}
      <span>{text}</span>
    </Link>
  )
}
