import { Youtube } from "lucide-react";

import { BUSINESS, YOUTUBE_VIDEOS } from "@/lib/site-data";

/** Embeds owner-supplied videos in their supplied order; view counts are unknown. */
export function VideoGallery() {
  return (
    <section id="youtube" className="py-20" aria-labelledby="videos-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl space-y-2 text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand-video">
            {BUSINESS.youtubeChannelName}
          </p>
          <h2 id="videos-heading" className="text-3xl font-black sm:text-4xl">
            Watch on YouTube
          </h2>
          <p className="text-sm text-muted-foreground">
            Nifty 9am Tamil — play directly below.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {YOUTUBE_VIDEOS.map((video) => (
              <div key={video.id} className="surface-panel overflow-hidden rounded-lg">
                <div className="aspect-video w-full">
                  <iframe
                    className="size-full"
                    src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={BUSINESS.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-brand-video/40 bg-brand-video/10 px-4 py-2 text-xs font-semibold text-brand-video hover:bg-brand-video/20"
          >
            <Youtube className="size-4" aria-hidden />
              Open {BUSINESS.youtubeChannelName} on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

