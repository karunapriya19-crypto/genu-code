import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="border-b border-border bg-surface-strong py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/" className="mb-7 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"><ArrowLeft className="size-4" aria-hidden /> Home</Link>
        <p className="mb-3 font-mono text-xs font-bold uppercase text-primary">{eyebrow}</p>
        <h1 className="max-w-3xl text-3xl font-black sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>
      </div>
    </div>
  );
}