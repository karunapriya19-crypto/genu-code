import { PlayCircle, Youtube } from "lucide-react";

import { BUSINESS, YOUTUBE_VIDEOS } from "@/lib/site-data";

/**
 * Plays the channel's most-watched videos directly on the page (embedded via
 * youtube-nocookie.com). Sorts by `views` descending — only videos the owner
 * has actually confirmed belong to the channel should ever be added to
 * YOUTUBE_VIDEOS in site-data.ts. See the comment there for the exact format.
 */
export function VideoGallery() {
  const topVideos = [...YOUTUBE_VIDEOS]
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 6);

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
            Explore learning videos from the academy. Only confirmed videos are embedded here.
          </p>
        </div>

        {topVideos.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topVideos.map((video) => (
              <div key={video.id} className="surface-panel overflow-hidden rounded-2xl">
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
                <div className="p-4">
                  <p className="line-clamp-2 text-sm font-semibold">{video.title}</p>
                  {typeof video.views === "number" && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {video.views.toLocaleString("en-IN")} views
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="surface-panel mx-auto max-w-xl rounded-2xl p-8 text-center">
            <PlayCircle className="mx-auto mb-3 size-8 text-brand-video" aria-hidden />
            <p className="text-sm text-muted-foreground">
              No videos are embedded yet because the channel and video links have not been confirmed.
            </p>
          </div>
        )}

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

