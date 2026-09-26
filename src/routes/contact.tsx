import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site/Contact";
import { PageIntro } from "@/components/site/PageIntro";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact & Visit | Trading Zone Vellore" },
    { name: "description", content: "Contact Trading Zone Vellore about courses and batches by phone or WhatsApp. Find the supplied Thottapalayam address and location guidance." },
    { property: "og:title", content: "Contact & Visit | Trading Zone Vellore" },
    { property: "og:description", content: "Phone, WhatsApp and location details for Trading Zone Vellore." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ContactPage,
});

function ContactPage() {
  return <SiteLayout><PageIntro eyebrow="Get in touch" title="Let's talk about your next step" description="Questions about a program or the next batch? Reach the academy directly, and call before travelling to the classroom." /><Contact /></SiteLayout>;
}