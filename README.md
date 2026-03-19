# HamzaDev Portfolio

Portfolio full-stack de niveau production construit avec Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Prisma, PostgreSQL, Auth.js, Zod, React Hook Form, TanStack Query, Framer Motion, Vitest et Playwright.

## Prerequis

- Node.js 22+
- npm 11+
- PostgreSQL 15+ pour les migrations locales

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run format
npm run format:check
npm run test:run
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
- enrichir le SEO de base avec metadata Next.js et contenu structure pour la landing page
- livrer un back-office admin avec dashboard, CRUD projets et experiences
- brancher l upload de fichiers pour le CV, les images et les videos projet

## Front public actuel

- hero premium avec CTA et positionnement clair
- highlights de profil
- projets featured avec tags, liens et indicateurs
- services proposes
- competences groupees
- experiences avec accomplissements
- processus de contact
- animations de reveal avec Framer Motion
- metadata de page et layout optimisees pour le referencement de base

## Back-office actuel

- authentification admin securisee avec Auth.js
- dashboard admin avec indicateurs de contenu
- navigation dediee vers les modules metier
- CRUD projets avec React Hook Form + Zod + server actions
- CRUD experiences avec React Hook Form + Zod + server actions
- upload local de CV PDF avec activation automatique de la version courante
- upload image et video pour les projets avec stockage dans `public/uploads`
- historique des assets CV en base Prisma

## Stockage fichiers

- `public/uploads/cv` : CV PDF
- `public/uploads/images` : images projet
- `public/uploads/videos` : videos projet
- validation MIME et taille avant persistance
- metadonnees d asset en base via Prisma

## Structure actuelle

- `prisma/schema.prisma` : modele relationnel du portfolio, des comptes admin et des assets fichiers
- `prisma/seed.ts` : seed initial de la base et de l'utilisateur admin
- `src/app` : App Router, page publique, routes admin et actions serveur
- `src/auth.ts` : configuration Auth.js
- `src/components/admin` : shell admin, navigation, formulaires RHF, uploaders et actions de suppression
- `src/components/auth` : formulaire d'authentification admin
- `src/components/sections` : sections du front public et preview experience
- `src/components/ui` : design system partage, primitives et animations reveal
- `src/data` : seed temporaire et fallback local enrichi
- `src/hooks` : hooks React dedies a la presentation
- `src/lib` : utilitaires transverses, autorisation, hashage, stockage fichier et client Prisma
- `src/repositories` : acces aux donnees Prisma, portfolio et admin
- `src/schemas` : contrats metier Zod, publics, admin et upload
- `src/services` : orchestration applicative
- `src/test` : setup de tests
- `src/types` : types partages et augmentation NextAuth
- `middleware.ts` : protection des routes `/admin/*`
- `components.json` : configuration shadcn/ui
- `prisma.config.ts` : configuration Prisma
- `vitest.config.ts` : configuration des tests unitaires

## Verification

Executer les commandes suivantes avant de passer a l'etape 9 :

```bash
npm run prisma:generate
npm run lint
npm run typecheck
npm run test:run
npm run build
```
