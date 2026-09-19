import { Clock3, ExternalLink, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BUSINESS, whatsappLink } from "@/lib/site-data";

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address)}`;

export function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-border bg-surface-strong py-20"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="space-y-6 lg:col-span-5">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Get in touch
            </p>
            <h2 id="contact-heading" className="mt-2 text-3xl font-black sm:text-4xl">
              Contact Trading Zone Vellore
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Ask about upcoming batches, classroom training, or online mentorship.
            </p>
          </div>

          <div className="space-y-3">
            <ContactRow icon={MapPin} title="Campus address">
              <p>{BUSINESS.address}</p>
            </ContactRow>
            <ContactRow icon={Phone} title="Phone and WhatsApp">
              <a className="font-bold text-primary hover:underline" href={`tel:${BUSINESS.phone}`}>
                {BUSINESS.phoneDisplay}
              </a>
            </ContactRow>
            <ContactRow icon={Clock3} title="Office hours">
              <p>{BUSINESS.hours}</p>
            </ContactRow>
            <ContactRow icon={Youtube} title="YouTube">
              <a
                id="youtube"
                className="font-bold text-brand-video hover:underline"
                href={BUSINESS.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {BUSINESS.youtubeChannelName} ({BUSINESS.youtubeHandle})
              </a>
            </ContactRow>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button asChild>
              <a
                href={whatsappLink(`Hello ${BUSINESS.name}, I would like details about your courses.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden />
                WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={`tel:${BUSINESS.phone}`}>
                <Phone className="size-4" aria-hidden />
                Call now
              </a>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="surface-panel flex min-h-[380px] flex-col items-center justify-center rounded-2xl p-6 text-center sm:min-h-[430px]">
            <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin className="size-8" aria-hidden />
            </span>
            <h3 className="mt-5 text-xl font-black">Thottapalayam, Vellore</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              The academy supplied this postal address, but an exact Google Maps place pin has
              not yet been confirmed. Please call before travelling.
            </p>
            <Button asChild className="mt-6" variant="secondary">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-4" aria-hidden />
                Search this address in Google Maps
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="surface-panel flex items-start gap-4 rounded-xl p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4" aria-hidden />
      </span>
      <div className="min-w-0 text-xs leading-relaxed text-muted-foreground">
        <h3 className="mb-1 text-sm font-bold text-foreground">{title}</h3>
        {children}
      </div>
    </div>
  );
}