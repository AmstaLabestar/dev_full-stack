"use client";

import { useActionState } from "react";
import { adminSignInAction } from "@/app/admin/sign-in/actions";
import type { AdminSignInState } from "@/app/admin/sign-in/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const initialState: AdminSignInState = {};

export function AdminSignInForm() {
  const [state, formAction, isPending] = useActionState<
    AdminSignInState,
    FormData
  >(adminSignInAction, initialState);

  return (
    <Card className="w-full max-w-md border-white/10 bg-slate-950/80">
      <CardContent className="space-y-6 p-8">
        <div className="space-y-2 text-center">
          <h1 className="font-display text-3xl font-semibold text-white">
            Connexion admin
          </h1>
          <p className="text-sm leading-6 text-slate-400">
            Acces reserve au back-office du portfolio.
          </p>
        </div>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-200"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition outline-none focus:border-cyan-300"
              placeholder="admin@portfolio.dev"
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-200"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition outline-none focus:border-cyan-300"
              placeholder="��������"
            />
          </div>
          {state.error ? (
            <p className="text-sm text-rose-300">{state.error}</p>
          ) : null}
          <Button
            className="h-12 w-full rounded-2xl"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
