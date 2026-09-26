import { createFileRoute } from "@tanstack/react-router";
import { Calculators } from "@/components/site/Calculators";
import { ChartSimulator } from "@/components/site/ChartSimulator";
import { PageIntro } from "@/components/site/PageIntro";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/tools")({
  head: () => ({ meta: [
    { title: "Trading Practice Tools | Trading Zone Vellore" },
    { name: "description", content: "Practice reading simulated candlestick charts and explore illustrative risk and compounding calculations. Not live market data or forecasts." },
    { property: "og:title", content: "Trading Practice Tools | Trading Zone Vellore" },
    { property: "og:description", content: "Educational chart simulator and risk calculators using sample and hypothetical data." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ToolsPage,
});

function ToolsPage() {
  return <SiteLayout><PageIntro eyebrow="Practice & plan" title="Learn by doing" description="Explore educational chart scenarios and test how different risk choices affect illustrative outcomes. These tools do not use live prices." /><ChartSimulator /><Calculators /></SiteLayout>;
}