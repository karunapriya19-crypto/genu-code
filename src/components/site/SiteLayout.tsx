import type { ReactNode } from "react";

import { FloatingExplore } from "./FloatingExplore";
import { LeadDialogProvider } from "./LeadDialog";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { TouchFeedback } from "./TouchFeedback";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <LeadDialogProvider>
      <TouchFeedback />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <FloatingExplore />
    </LeadDialogProvider>
  );
}