import { createFileRoute } from "@tanstack/react-router";
import { Mentor } from "@/components/site/Mentor";
import { Testimonials } from "@/components/site/Testimonials";
import { PageIntro } from "@/components/site/PageIntro";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/mentor")({
  head: () => ({ meta: [
    { title: "Meet the Mentor | Trading Zone Vellore" },
    { name: "description", content: "Meet D. Srinivasan and learn about the teaching approach at Trading Zone Vellore, with transparent standards for student reviews." },
    { property: "og:title", content: "Meet the Mentor | Trading Zone Vellore" },
    { property: "og:description", content: "Learn about Trading Zone Vellore's mentor and approach to verified student feedback." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: MentorPage,
});

function MentorPage() {
  return <SiteLayout><PageIntro eyebrow="Our approach" title="Meet the mentor" description="Get to know the person behind the teaching and how we handle student feedback responsibly." /><Mentor /><Testimonials /></SiteLayout>;
}