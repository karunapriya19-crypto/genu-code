/**
 * Single source of truth for business information shown on the site.
 *
 * VERIFICATION STATUS
 * -------------------
 * Values below come from the owner-supplied draft website. Anything that could
 * not be independently verified is either removed from the UI or marked with
 * `verified: false` so it is never presented as a confirmed fact.
 *
 * Owner must confirm: address, phone, WhatsApp number, YouTube channel,
 * years of experience, student counts, ratings, course fees, batch schedule.
 */

export const BUSINESS = {
  name: "Trading Zone Vellore",
  tagline: "Stock Market Training Academy",
  founder: "D. Srinivasan",
  founderRole: "Founder & Lead Mentor",
  phone: "+917540010050",
  phoneDisplay: "+91 75400 10050",
  whatsapp: "917540010050",
  youtubeHandle: "@nifty9amtamil",
  youtubeUrl: "https://www.youtube.com/@nifty9amtamil",
  youtubeChannelName: "Nifty 9am Tamil",
  address:
    "2nd floor, opp. Pachayappas Silks, Bus stop, Thottapalayam, Vellore, Tamil Nadu 632004",
  addressShort: "Thottapalayam, Vellore",
  hours: "Mon – Sat, 9:00 AM – 7:00 PM IST",
  /** Owner has NOT yet confirmed a Google Maps place ID / coordinates. */
  mapVerified: false,
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type Course = {
  id: string;
  category: "intraday" | "priceaction" | "swing";
  categoryLabel: string;
  level: string;
  title: string;
  duration: string;
  summary: string;
  highlights: string[];
  /** Fees are not published until the owner confirms them. */
  fee: null | string;
  syllabus: { module: string; detail: string }[];
};

export const COURSES: Course[] = [
  {
    id: "options-mastery",
    category: "intraday",
    categoryLabel: "Intraday & Options",
    level: "Flagship program",
    title: "Nifty & BankNifty Options Program",
    duration: "6 weeks",
    summary:
      "An intraday option buying and selling framework covering Greeks, open interest reading, strike selection and momentum breakouts.",
    highlights: [
      "Live market sessions from 9:15 AM",
      "Scalping and momentum setup models",
      "Risk-defined option hedging",
      "Vellore classroom + online access",
    ],
    fee: null,
    syllabus: [
      {
        module: "Module 1 — Option basics & pricing",
        detail:
          "Contract mechanics, premium behaviour, expiry effects and the Greeks that actually matter intraday.",
      },
      {
        module: "Module 2 — Open interest & strike selection",
        detail:
          "Reading OI build-up and unwinding, choosing strikes by liquidity and delta rather than by tips.",
      },
      {
        module: "Module 3 — Intraday execution",
        detail:
          "Entry checklists, stop placement, partial exits and a written trade journal routine.",
      },
      {
        module: "Module 4 — Risk control",
        detail:
          "Position sizing, daily loss limits, and rules for stepping away from the screen.",
      },
    ],
  },
  {
    id: "price-action",
    category: "priceaction",
    categoryLabel: "Price Action",
    level: "Advanced",
    title: "Institutional Price Action Blueprint",
    duration: "4 weeks",
    summary:
      "Read order flow the way desks do: market structure, liquidity sweeps and supply–demand imbalance zones, without lagging indicators.",
    highlights: [
      "Clean charting without indicators",
      "Liquidity trap identification",
      "Multi-timeframe confluence",
      "Mentorship by D. Srinivasan",
    ],
    fee: null,
    syllabus: [
      {
        module: "Module 1 — Market structure",
        detail:
          "Trends, ranges, break of structure and where continuation actually fails.",
      },
      {
        module: "Module 2 — Supply & demand zones",
        detail:
          "Marking zones objectively, grading them, and waiting for confirmation.",
      },
      {
        module: "Module 3 — Liquidity & traps",
        detail:
          "Stop hunts, false breakouts and how to avoid chasing the first candle.",
      },
      {
        module: "Module 4 — Multi-timeframe planning",
        detail:
          "Building a daily plan from higher timeframe bias down to execution timeframe.",
      },
    ],
  },
  {
    id: "swing-investing",
    category: "swing",
    categoryLabel: "Swing & Investing",
    level: "Part-time friendly",
    title: "Swing Trading & Positional Investing",
    duration: "3 weeks",
    summary:
      "Built for working professionals and beginners who can review charts on weekends rather than watch screens all day.",
    highlights: [
      "Sector rotation and breakout screening",
      "Positional risk management",
      "Fundamental filters plus chart timing",
      "Community access for enrolled students",
    ],
    fee: null,
    syllabus: [
      {
        module: "Module 1 — Screening",
        detail:
          "Building a weekly watchlist from sector strength and relative performance.",
      },
      {
        module: "Module 2 — Entry & exit planning",
        detail:
          "Swing entry triggers, stop distance, and scaling out on strength.",
      },
      {
        module: "Module 3 — Portfolio risk",
        detail:
          "Position count, correlation, and how much of the portfolio a single idea may risk.",
      },
    ],
  },
];

export const COURSE_FILTERS = [
  { value: "all", label: "All programs" },
  { value: "intraday", label: "Intraday & Options" },
  { value: "priceaction", label: "Price Action" },
  { value: "swing", label: "Swing & Investing" },
] as const;

/**
 * YouTube videos.
 * Only entries the owner confirms belong to the Nifty 9am Tamil channel should
 * be listed here. The draft site contained placeholder / unrelated video IDs
 * (e.g. dQw4w9WgXcQ, kJQP7kiw5Fk), so the gallery ships empty and links to the
 * channel instead of showing videos that may not exist.
 */
export const YOUTUBE_VIDEOS: { id: string; title: string; views?: number }[] = [];
