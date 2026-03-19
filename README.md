# HamzaDev Portfolio

Portfolio full-stack de niveau production construit avec Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Prisma, PostgreSQL, Auth.js, Zod, React Hook Form, TanStack Query, Framer Motion, Vitest et Playwright.

## Prerequis

- Node.js 22+
- npm 11+
- PostgreSQL 15+ pour les migrations locales

## Scripts

```bash
npm run dev
npm run dev:test
npm run lint
npm run typecheck
npm run format
npm run format:check
npm run test:run
npm run test:e2e
npm run test:e2e:ui
npm run build
npm run prisma:generate
npm run prisma:migrate:dev
npm run prisma:seed
npm run prisma:studio
```

## Objectifs couverts

- generer un socle Next.js propre
- activer TypeScript strict
- configurer Tailwind CSS
- configurer ESLint
- configurer Prettier avec tri Tailwind
- structurer l'application par couches metier
- ajouter une base de tests unitaires avec Vitest
- poser un design system partage avec shadcn/ui
- definir les tokens visuels, typographies et primitives UI
- integrer Prisma et modeliser la base PostgreSQL du portfolio
- securiser l'acces admin avec Auth.js et Prisma Adapter
- construire un front public premium avec animations, sections editoriales et CTA de conversion
- livrer un back-office admin avec dashboard, CRUD projets et experiences
- brancher l upload de fichiers pour le CV, les images et les videos projet
- renforcer le SEO et la performance avec metadata avancees, JSON-LD, sitemap, robots, manifest et ISR
- mettre en place une strategie de tests complete avec Vitest et Playwright

## Front public actuel

- hero premium avec CTA et positionnement clair
- highlights de profil
- projets featured avec tags, liens et indicateurs
- services proposes
- competences groupees
- experiences avec accomplissements
- processus de contact
- animations de reveal avec Framer Motion
- metadata avancees, Open Graph et Twitter Cards
- JSON-LD Person et WebSite
- page d accueil servie en ISR avec revalidation 1h

## Back-office actuel

- authentification admin securisee avec Auth.js
- dashboard admin avec indicateurs de contenu
- navigation dediee vers les modules metier
- CRUD projets avec React Hook Form + Zod + server actions
- CRUD experiences avec React Hook Form + Zod + server actions
- upload local de CV PDF avec activation automatique de la version courante
- upload image et video pour les projets avec stockage dans `public/uploads`
- historique des assets CV en base Prisma

## SEO et perf

- `src/app/robots.ts` : robots.txt genere
- `src/app/sitemap.ts` : sitemap.xml genere
- `src/app/manifest.ts` : web manifest
- `src/app/opengraph-image.tsx` et `src/app/twitter-image.tsx` : images sociales generees
- `src/lib/seo.ts` : helpers JSON-LD testes
- `src/services/portfolio.service.ts` : cache ISR pour la landing
- `next.config.ts` : compression, `poweredByHeader` desactive, `optimizePackageImports` pour `lucide-react`

## Strategie de tests

- `vitest.config.ts` : scope unitaire limite a `src/**/*.{test,spec}.{ts,tsx}`
- `playwright.config.ts` : tests e2e avec web server Next.js local
- `e2e/app.spec.ts` : parcours landing publique et redirection admin
- `e2e/seo.spec.ts` : robots, sitemap, manifest et images sociales
- `.gitignore` : exclusion de `playwright-report` et `test-results`

## Stockage fichiers

- `public/uploads/cv` : CV PDF
- `public/uploads/images` : images projet
- `public/uploads/videos` : videos projet
- validation MIME et taille avant persistance
- metadonnees d asset en base via Prisma

## Structure actuelle

- `prisma/schema.prisma` : modele relationnel du portfolio, des comptes admin et des assets fichiers
- `prisma/seed.ts` : seed initial de la base et de l'utilisateur admin
- `src/app` : App Router, page publique, routes admin, routes SEO et actions serveur
- `src/auth.ts` : configuration Auth.js
- `src/components/admin` : shell admin, navigation, formulaires RHF, uploaders et actions de suppression
- `src/components/auth` : formulaire d'authentification admin
- `src/components/sections` : sections du front public et preview experience
- `src/components/ui` : design system partage, primitives et animations reveal
- `src/data` : seed temporaire et fallback local enrichi
- `src/hooks` : hooks React dedies a la presentation
- `src/lib` : utilitaires transverses, autorisation, hashage, stockage fichier, config de site et SEO helpers
- `src/repositories` : acces aux donnees Prisma, portfolio et admin
- `src/schemas` : contrats metier Zod, publics, admin et upload
- `src/services` : orchestration applicative et cache de la landing
- `src/test` : setup de tests unitaires
- `e2e` : tests Playwright end-to-end
- `src/types` : types partages et augmentation NextAuth
- `middleware.ts` : protection des routes `/admin/*`
- `components.json` : configuration shadcn/ui
- `prisma.config.ts` : configuration Prisma
- `vitest.config.ts` : configuration des tests unitaires
- `playwright.config.ts` : configuration des tests e2e

## Verification

Executer les commandes suivantes avant de passer a l'etape 11 :

```bash
npm run lint
npm run typecheck
npm run test:run
npm run test:e2e
npm run build
```
