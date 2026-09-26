import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/PageIntro";
import { SiteLayout } from "@/components/site/SiteLayout";
import { VideoGallery } from "@/components/site/VideoGallery";

export const Route = createFileRoute("/videos")({
  head: () => ({ meta: [
    { title: "Learning Videos | Trading Zone Vellore" },
    { name: "description", content: "Find Trading Zone Vellore's YouTube channel and view learning videos when channel links have been confirmed." },
    { property: "og:title", content: "Learning Videos | Trading Zone Vellore" },
    { property: "og:description", content: "Visit the academy's video learning page and YouTube channel." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: VideosPage,
});

function VideosPage() {
  return <SiteLayout><PageIntro eyebrow="Watch & learn" title="Videos and lessons" description="Explore the academy’s learning channel. Videos will appear here only after their links are confirmed." /><VideoGallery /></SiteLayout>;
}