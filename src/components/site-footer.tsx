import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/logo";
import { TextMarquee } from "@/components/marquee";
import { services } from "@/lib/services";
import { nav, site, socials } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-ink-900">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-teal-500/[0.07] blur-3xl" />

      <TextMarquee text="DevAnts · DevAnts · DevAnts ·" className="relative border-b border-border/60" />

      <div className="container-page relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-6">
            <div className="h-8">
              <Logo variant="horizontal" />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              A small engineering colony that moves heavy things. We design, build and run
              software products — then hand you the keys, documented.
            </p>
            <div className="space-y-2 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-foreground transition-colors duration-200 hover:text-teal-300"
              >
                <Mail className="size-4 text-teal-400" aria-hidden="true" />
                {site.email}
              </a>
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-4 text-teal-400" aria-hidden="true" />
                {site.location}
              </p>
            </div>
          </div>

          <nav aria-labelledby="footer-nav-pages">
            <h2
              id="footer-nav-pages"
              className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
            >
              Studio
            </h2>
            <ul className="space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-foreground/80 transition-colors duration-200 hover:text-teal-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-nav-services">
            <h2
              id="footer-nav-services"
              className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
            >
              Services
            </h2>
            <ul className="space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-foreground/80 transition-colors duration-200 hover:text-teal-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-nav-social">
            <h2
              id="footer-nav-social"
              className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
            >
              Elsewhere
            </h2>
            <ul className="space-y-3 text-sm">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1.5 text-foreground/80 transition-colors duration-200 hover:text-teal-300"
                  >
                    {social.label}
                    <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Building since {site.founded}.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/testimonials#leave-a-review" className="transition-colors hover:text-teal-300">
              Leave a review
            </Link>
            <Link href="/admin" className="transition-colors hover:text-teal-300">
              Admin
            </Link>
            <span className="flex items-center gap-2">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-success" />
                <span className="relative inline-flex size-1.5 rounded-full bg-success" />
              </span>
              Taking projects for Q4
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
