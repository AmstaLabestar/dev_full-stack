"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FolderKanban,
  FileText,
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
    <nav className="grid gap-2 md:grid-cols-4">
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
              "flex items-center gap-3 rounded-3xl border px-4 py-3 text-sm font-medium transition",
              isActive
                ? "border-cyan-300/40 bg-cyan-400/10 text-white"
                : "border-white/10 bg-white/4 text-slate-300 hover:border-white/20 hover:text-white",
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
