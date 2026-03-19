# HamzaDev Portfolio

Socle du portfolio full-stack avec Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Prisma, Auth.js, ESLint, Prettier et architecture modulaire.

## Prerequis

- Node.js 22+
- npm 11+
- PostgreSQL 15+ pour les migrations locales

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
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

## Structure actuelle

- `prisma/schema.prisma` : modele relationnel du portfolio et des comptes admin
- `prisma/seed.ts` : seed initial de la base et de l'utilisateur admin
- `src/app` : point d'entree App Router et pages admin protegees
- `src/auth.ts` : configuration Auth.js
- `src/components` : composants UI, sections et formulaire d'authentification
- `src/data` : seed temporaire et fallback local
- `src/hooks` : hooks React dedies a la presentation
- `src/lib` : utilitaires transverses, autorisation, hashage et client Prisma
- `src/repositories` : acces aux donnees et mappers Prisma
- `src/schemas` : contrats metier Zod
- `src/services` : orchestration applicative
- `src/test` : setup de tests
- `src/types` : types partages et augmentation NextAuth
- `middleware.ts` : protection des routes `/admin/*`
- `components.json` : configuration shadcn/ui
- `prisma.config.ts` : configuration Prisma
- `vitest.config.ts` : configuration des tests unitaires

## Verification

Executer les commandes suivantes avant de passer a l'etape 6 :

```bash
npm run prisma:generate
npm run lint
npm run typecheck
npm run format:check
npm run test:run
npm run build
```
