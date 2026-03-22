import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export function PublicFooter() {
  return (
    <footer className="pb-10 pt-2">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-6 text-sm text-slate-500 dark:border-white/8 dark:text-slate-400 sm:flex-row">
          <p>
            {siteConfig.name} - Produits web, mobile et IA concus pour des usages reels.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-slate-700 dark:hover:text-slate-200"
            >
              GitHub
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-slate-700 dark:hover:text-slate-200"
            >
              LinkedIn
            </a>
            <a
              href="/admin/sign-in"
              aria-label="Acces admin"
              title="Acces admin"
              className="inline-flex size-5 items-center justify-center rounded-full text-slate-300 transition hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-300"
            >
              •
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}