# HamzaDev Portfolio

Socle du portfolio full-stack avec Next.js App Router, TypeScript, Tailwind CSS, ESLint, Prettier et architecture modulaire.

## Prerequis

- Node.js 22+
- npm 11+

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run format:check
npm run test:run
npm run build
```

## Objectifs couverts

- generer un socle Next.js propre
- activer TypeScript strict
- configurer Tailwind CSS
- configurer ESLint
- configurer Prettier avec tri Tailwind
- structurer l'application par couches metier
- ajouter une base de tests unitaires avec Vitest

## Structure actuelle

- `src/app` : point d'entree App Router
- `src/components` : composants UI et sections
- `src/data` : jeux de donnees temporaires
- `src/hooks` : hooks React dedies a la presentation
- `src/lib` : utilitaires transverses
- `src/repositories` : acces aux donnees
- `src/schemas` : contrats metier Zod
- `src/services` : orchestration applicative
- `src/test` : setup de tests
- `src/types` : types partages
- `eslint.config.mjs` : regles de linting
- `.prettierrc.json` : formatage partage
- `tsconfig.json` : configuration TypeScript
- `vitest.config.ts` : configuration des tests unitaires

## Verification

Executer les commandes suivantes avant de passer a l'etape 3 :

```bash
npm run lint
npm run typecheck
npm run format:check
npm run test:run
npm run build
```
