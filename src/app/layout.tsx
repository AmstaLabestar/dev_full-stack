import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.example.com"),
  title: {
    default: "HamzaDev Portfolio",
    template: "%s | HamzaDev Portfolio",
  },
  description:
    "Portfolio full-stack professionnel construit avec Next.js, TypeScript, Prisma et Auth.js pour presenter produits, experiences et expertise technique.",
  keywords: [
    "full-stack developer",
    "next.js",
    "typescript",
    "prisma",
    "portfolio senior",
    "architecture logicielle",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn("dark font-sans", manrope.variable, fraunces.variable)}
    >
      <body>{children}</body>
    </html>
  );
}
