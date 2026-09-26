import { BookOpen, CandlestickChart, GraduationCap, MapPin, PlayCircle } from "lucide-react";

export const SITE_LINKS = [
  { to: "/courses", label: "Courses", detail: "Find your learning path", icon: GraduationCap },
  { to: "/tools", label: "Practice tools", detail: "Try charts and calculators", icon: CandlestickChart },
  { to: "/mentor", label: "The mentor", detail: "Meet your guide", icon: BookOpen },
  { to: "/videos", label: "Videos", detail: "Explore the channel", icon: PlayCircle },
  { to: "/contact", label: "Contact", detail: "Talk to the academy", icon: MapPin },
] as const;