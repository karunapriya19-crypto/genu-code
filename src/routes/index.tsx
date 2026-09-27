import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import { Hero } from "@/components/site/Hero";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TickerBar } from "@/components/site/TickerBar";
import { Button } from "@/components/ui/button";
import { BUSINESS, whatsappLink } from "@/lib/site-data";
import { SITE_LINKS } from "@/lib/site-navigation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trading Zone Vellore | Stock Market Training Academy" },
      {
        name: "description",
        content:
          "Stock market training in Vellore with classroom and online programs covering price action, options, swing trading, and risk management.",
      },
      { property: "og:title", content: "Trading Zone Vellore | Stock Market Training Academy" },
      {
        property: "og:description",
        content:
          "Find courses, practice tools, mentor information, learning videos, and contact details on dedicated pages.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <TickerBar />
      <Hero />
      <section aria-labelledby="explore-heading" className="border-y border-border bg-surface-strong py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div><p className="mb-2 font-mono text-xs font-bold uppercase text-primary">Explore the academy</p><h2 id="explore-heading" className="text-2xl font-black sm:text-3xl">Where would you like to start?</h2></div>
            <p className="max-w-sm text-sm text-muted-foreground">Go straight to what matters to you.</p>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-5">
            {SITE_LINKS.map(({ to, label, detail, icon: Icon }, index) => (
              <Link to={to} key={to} className="group flex min-h-36 flex-col justify-between rounded-md border border-border bg-surface p-3.5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:bg-accent focus-visible:border-primary sm:min-h-40 sm:p-5">
                <div className="flex items-start justify-between gap-2"><span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary sm:size-10"><Icon className="size-5" aria-hidden /></span><span className="font-mono text-xs text-muted-foreground">0{index + 1}</span></div>
                <div><h3 className="mt-4 text-base font-bold sm:text-lg">{label}</h3><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div>
                <ArrowUpRight className="mt-3 size-4 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div><p className="mb-2 font-mono text-xs font-bold uppercase text-primary">Questions?</p><h2 className="text-2xl font-black sm:text-3xl">Talk to a real person.</h2><p className="mt-2 text-sm text-muted-foreground">Ask about courses and current batches before deciding.</p></div>
          <div className="flex flex-wrap gap-3"><Button asChild><a href={whatsappLink(`Hello ${BUSINESS.name}, I would like details about your courses.`)} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden /> WhatsApp the academy</a></Button><Button asChild variant="outline"><Link to="/contact">Contact details <ArrowUpRight aria-hidden /></Link></Button></div>
        </div>
      </section>
    </SiteLayout>
  );
}
