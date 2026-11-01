import { BookOpen, CandlestickChart, GraduationCap, MapPin, PlayCircle } from "lucide-react";

// Order is intentional: Videos, Courses, Practice Tools, The Mentor, Contact.
export const SITE_LINKS = [
  { to: "/videos", label: "Videos", detail: "Explore the channel", icon: PlayCircle },
  { to: "/courses", label: "Courses", detail: "Find your learning path", icon: GraduationCap },
  {
    to: "/tools",
    label: "Practice Tools",
    detail: "Try charts and calculators",
    icon: CandlestickChart,
  },
  { to: "/mentor", label: "The Mentor", detail: "Meet your guide", icon: BookOpen },
  { to: "/contact", label: "Contact", detail: "Talk to the academy", icon: MapPin },
] as const;

