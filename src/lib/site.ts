export const site = {
  name: "DevAnts",
  tagline: "Small colony. Heavy lifting.",
  /** Used in <title> templates and OG metadata */
  description:
    "DevAnts is a product engineering studio building web platforms, mobile apps and automation for teams who need to ship something real. Flutter, React Native, MERN, Next.js, Laravel, .NET, Django and the DevOps to keep it standing.",
  url: "https://devants.dev",
  email: "hello@devants.dev",
  phone: "+92 300 000 0000",
  location: "Lahore, PK — working across GMT+5 to GMT-8",
  founded: 2021,
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
] as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/devants", handle: "@devants" },
  { label: "LinkedIn", href: "https://linkedin.com/company/devants", handle: "/devants" },
  { label: "Dribbble", href: "https://dribbble.com/devants", handle: "@devants" },
  { label: "X", href: "https://x.com/devants", handle: "@devants" },
] as const;

/** Headline numbers. Keep these honest — they're the first thing a client checks. */
export const stats = [
  { value: "60+", label: "Products shipped", detail: "Web, mobile and internal tooling since 2021" },
  { value: "14", label: "Countries served", detail: "From single founders to Series-B engineering teams" },
  { value: "9", label: "Avg. weeks to launch", detail: "Discovery to production for a v1 product" },
  { value: "97%", label: "Retained clients", detail: "Most engagements turn into a second phase" },
] as const;

export const budgetRanges = [
  "Under $5k",
  "$5k – $15k",
  "$15k – $40k",
  "$40k – $100k",
  "$100k+",
  "Not sure yet",
] as const;
