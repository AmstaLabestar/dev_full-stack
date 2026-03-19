import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HamzaDev Portfolio",
    template: "%s | HamzaDev Portfolio",
  },
  description:
    "Portfolio full-stack professionnel construit avec Next.js, TypeScript et Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
