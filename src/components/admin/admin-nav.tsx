"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  LayoutDashboard,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
};

const navigation: NavItem[] = [
  {
    href: "/admin",
    label: "Vue d'ensemble",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/admin/profile",
    label: "Profil",
    icon: UserRound,
  },
  {
    href: "/admin/projects",
    label: "Projets",
    icon: FolderKanban,
  },
  {
    href: "/admin/experiences",
    label: "Experiences",
    icon: BriefcaseBusiness,
  },
  {
    href: "/admin/cv",
    label: "CV",
    icon: FileText,
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-2 md:grid-cols-5">
      {navigation.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center gap-3 rounded-3xl border px-4 py-3 text-sm font-medium transition",
              isActive
                ? "border-cyan-300/35 bg-cyan-400/12 text-white shadow-[0_18px_40px_rgba(34,211,238,0.12)]"
                : "border-white/10 bg-white/4 text-slate-300 hover:border-white/20 hover:bg-white/7 hover:text-white",
            )}
          >
            <span
              className={cn(
                "flex size-9 items-center justify-center rounded-2xl border transition",
                isActive
                  ? "border-cyan-300/25 bg-cyan-400/12 text-cyan-100"
                  : "border-white/8 bg-slate-950/35 text-slate-400 group-hover:text-slate-100",
              )}
            >
              <Icon className="size-4" />
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}