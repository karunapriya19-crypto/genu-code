import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { z } from "zod";
import { AlertTriangle, MessageCircle } from "lucide-react";

import { BUSINESS, whatsappLink } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type LeadKind = "masterclass" | "ebook";

type LeadDialogContextValue = {
  open: (kind: LeadKind) => void;
};

const LeadDialogContext = createContext<LeadDialogContextValue | null>(null);

export function useLeadDialog() {
  const ctx = useContext(LeadDialogContext);
  if (!ctx) throw new Error("useLeadDialog must be used inside LeadDialogProvider");
  return ctx;
}

/**
 * Lead capture.
 *
 * There is no backend connected yet, so this form never claims a registration
 * was stored. It validates the input and hands the enquiry to WhatsApp, which
 * is a real delivery channel the academy already uses. The user is told exactly
 * what happens before they submit.
 */
const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(80, "Name must be under 80 characters."),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .pipe(
      z
        .string()
        .regex(
          /^(\+91)?[6-9]\d{9}$/,
          "Enter a valid 10-digit Indian mobile number.",
        ),
    ),
  mode: z.enum(["classroom", "online"]),
});

const COPY: Record<
  LeadKind,
  { title: string; description: string; cta: string; showMode: boolean }
> = {
  masterclass: {
    title: "Request a free masterclass seat",
    description:
      "Seats are confirmed by our team on WhatsApp — this form does not book a seat by itself.",
    cta: "Send request on WhatsApp",
    showMode: true,
  },
  ebook: {
    title: "Request the free price action guide",
    description:
      "The guide is sent manually by our team on WhatsApp. There is no automatic download on this site yet.",
    cta: "Request guide on WhatsApp",
    showMode: false,
  },
};

export function LeadDialogProvider({ children }: { children: React.ReactNode }) {
  const [kind, setKind] = useState<LeadKind | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mode, setMode] = useState<"classroom" | "online">("classroom");

  const open = useCallback((next: LeadKind) => {
    setErrors({});
    setKind(next);
  }, []);

  const value = useMemo(() => ({ open }), [open]);
  const copy = kind ? COPY[kind] : null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!kind) return;
    const form = new FormData(event.currentTarget);
    const parsed = leadSchema.safeParse({
      name: form.get("name"),
      phone: form.get("phone"),
      mode,
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        next[String(issue.path[0])] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    const { name, phone } = parsed.data;
    const message =
      kind === "masterclass"
        ? `Hello ${BUSINESS.name}, I would like a seat in the free masterclass.\nName: ${name}\nMobile: ${phone}\nPreferred mode: ${
            mode === "classroom" ? "Vellore classroom" : "Online (Tamil/English)"
          }`
        : `Hello ${BUSINESS.name}, please send me the free price action guide.\nName: ${name}\nMobile: ${phone}`;

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setKind(null);
  }

  return (
    <LeadDialogContext.Provider value={value}>
      {children}
      <Dialog open={kind !== null} onOpenChange={(o) => !o && setKind(null)}>
        <DialogContent className="max-w-md">
          {copy && (
            <>
              <DialogHeader>
                <DialogTitle>{copy.title}</DialogTitle>
                <DialogDescription>{copy.description}</DialogDescription>
              </DialogHeader>

              <div className="flex items-start gap-3 rounded-lg bg-notice/60 p-3 text-xs text-notice-foreground">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
                <p>
                  Your details are not stored on this website. Pressing the button
                  opens WhatsApp with a prefilled message you can review before
                  sending.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="space-y-1.5">
                  <Label htmlFor="lead-name">Full name</Label>
                  <Input
                    id="lead-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "lead-name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="lead-name-error" className="text-xs text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="lead-phone">WhatsApp mobile number</Label>
                  <Input
                    id="lead-phone"
                    name="phone"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="10-digit mobile number"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "lead-phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="lead-phone-error" className="text-xs text-destructive">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {copy.showMode && (
                  <div className="space-y-1.5">
                    <Label htmlFor="lead-mode">Preferred learning mode</Label>
                    <Select
                      value={mode}
                      onValueChange={(v) => setMode(v as "classroom" | "online")}
                    >
                      <SelectTrigger id="lead-mode">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classroom">
                          Vellore classroom (Thottapalayam)
                        </SelectItem>
                        <SelectItem value="online">
                          Online live (Tamil / English)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button type="submit" className="w-full">
                  <MessageCircle className="size-4" aria-hidden />
                  {copy.cta}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </LeadDialogContext.Provider>
  );
}
