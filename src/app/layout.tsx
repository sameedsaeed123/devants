import type { Metadata, Viewport } from "next";
import { Anton, Instrument_Sans, Sometype_Mono } from "next/font/google";
import { Cursor } from "@/components/cursor";
import { Loader } from "@/components/loader";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { site } from "@/lib/site";
import "./globals.css";

/*
  Type system, chosen as free stand-ins for a Druk / PP Neue Montreal / Sometype
  Mono stack:
    Anton          -> ultra-condensed heavy display, for the oversized headlines
    Instrument Sans-> neo-grotesque body with more character than Inter
    Sometype Mono  -> small tracked-out labels and eyebrows
*/
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const sometypeMono = Sometype_Mono({
  variable: "--font-sometype",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/brand/devants-mark.png" },
};

export const viewport: Viewport = {
  themeColor: "#04090a",
  // Never block zoom — users must be able to scale text
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${anton.variable} ${sometypeMono.variable}`}
    >
      <body className="antialiased">
        <Loader />
        <SmoothScroll />
        <Cursor />
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
