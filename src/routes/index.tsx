import { createFileRoute } from "@tanstack/react-router";

import { Calculators } from "@/components/site/Calculators";
import { ChartSimulator } from "@/components/site/ChartSimulator";
import { Contact } from "@/components/site/Contact";
import { Courses } from "@/components/site/Courses";
import { Hero } from "@/components/site/Hero";
import { LeadDialogProvider } from "@/components/site/LeadDialog";
import { Mentor } from "@/components/site/Mentor";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Testimonials } from "@/components/site/Testimonials";
import { TickerBar } from "@/components/site/TickerBar";
import { VideoGallery } from "@/components/site/VideoGallery";
import { TouchFeedback } from "@/components/site/TouchFeedback";

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
          "Explore Trading Zone Vellore courses, teaching tools, calculators, and verified contact details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LeadDialogProvider>
      <TouchFeedback />
      <SiteHeader />
      <main>
        <TickerBar />
        <Hero />
        <Mentor />
        <VideoGallery />
        <Courses />
        <ChartSimulator />
        <Calculators />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
    </LeadDialogProvider>
  );
}
