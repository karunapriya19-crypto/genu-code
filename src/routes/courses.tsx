import { createFileRoute } from "@tanstack/react-router";
import { Courses } from "@/components/site/Courses";
import { PageIntro } from "@/components/site/PageIntro";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/courses")({
  head: () => ({ meta: [
    { title: "Courses | Trading Zone Vellore" },
    { name: "description", content: "Explore classroom and online stock market courses in Vellore, with syllabus details for options, price action, and swing trading." },
    { property: "og:title", content: "Courses | Trading Zone Vellore" },
    { property: "og:description", content: "Browse the Trading Zone Vellore course outlines and ask about current batches." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CoursesPage,
});

function CoursesPage() {
  return <SiteLayout><PageIntro eyebrow="Learn with us" title="Choose your learning path" description="Explore the course outlines, compare the focus of each program, and ask us for current fees and batch dates." /><Courses /></SiteLayout>;
}