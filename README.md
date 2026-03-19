# HamzaDev Portfolio

Socle du portfolio full-stack avec Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Prisma, ESLint, Prettier et architecture modulaire.

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

## Structure actuelle

- `prisma/schema.prisma` : modele relationnel du portfolio
- `prisma/seed.ts` : seed initial de la base
- `src/app` : point d'entree App Router
- `src/components` : composants UI et sections
- `src/data` : seed temporaire et fallback local
- `src/hooks` : hooks React dedies a la presentation
- `src/lib` : utilitaires transverses et client Prisma
- `src/repositories` : acces aux donnees et mappers Prisma
- `src/schemas` : contrats metier Zod
- `src/services` : orchestration applicative
- `src/test` : setup de tests
- `src/types` : types partages
- `components.json` : configuration shadcn/ui
- `prisma.config.ts` : configuration Prisma
- `vitest.config.ts` : configuration des tests unitaires

## Verification

Executer les commandes suivantes avant de passer a l'etape 5 :

```bash
npm run prisma:generate
npm run lint
npm run typecheck
npm run format:check
npm run test:run
npm run build
```
