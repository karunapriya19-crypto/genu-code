import { BookOpen, Rocket, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { BUSINESS } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { useLeadDialog } from "./LeadDialog";
import { Hero3D } from "./Hero3D";

export function Hero() {
  const { open } = useLeadDialog();

  return (
    <section id="top" className="relative isolate overflow-hidden py-12 sm:py-16 lg:py-20">
      <Hero3D />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-5">
          <p className="inline-flex items-center border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            Stock market education · Vellore & online
          </p>

          <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Trading Zone Vellore
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Learn price action, options and risk management with {BUSINESS.founder}. Classroom learning in {BUSINESS.addressShort} and online sessions in Tamil and English.
          </p>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg"><Link to="/courses">Explore courses <ArrowUpRight aria-hidden /></Link></Button>
            <Button size="lg" onClick={() => open("masterclass")}>
              <Rocket className="size-4" aria-hidden />
              Request a masterclass seat
            </Button>
            <Button size="lg" variant="ghost" onClick={() => open("ebook")}>
              <BookOpen className="size-4" aria-hidden />
              Request the guide
            </Button>
          </div>

          <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">
            Trading involves risk of loss. Educational training only; no profit promises or SEBI-registered investment advice.
          </p>
        </div>
      </div>
    </section>
  );
}
