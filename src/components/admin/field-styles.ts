import { cva } from "class-variance-authority";

export const adminFieldClassName = cva(
  "h-12 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/20",
);

export const adminTextAreaClassName = cva(
  "min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/20",
);
