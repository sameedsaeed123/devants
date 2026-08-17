import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/magnetic";
import { TechStack } from "@/components/tech-badge";
import { services } from "@/lib/services";
import { pad } from "@/lib/utils";

/** Homepage services grid — one card per service, linking into /services. */
export function ServicesOverview() {
  return (
    <section id="services" className="relative py-section">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Seven disciplines,"
            titleAccent="one accountable team"
            body="Pick one, or bring the whole problem — we'll tell you which parts actually need us."
          />
          <Reveal variant="fade" delay={0.2}>
            <Link
              href="/services"
              data-cursor="Explore"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-teal-300"
            >
              All services in detail
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <RevealItem key={service.slug} variant="depth">
                <TiltCard className="group h-full" intensity={5}>
                  <Link
                    href={`/services#${service.slug}`}
                    data-cursor="Read"
                    className="relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface p-7 transition-colors duration-400 hover:border-teal-400/40"
                  >
                    <span className="absolute top-6 right-7 font-mono text-xs text-teal-400/40">
                      {pad(index + 1)}
                    </span>

                    <span className="flex size-12 items-center justify-center rounded-xl border border-teal-400/25 bg-teal-400/[0.08] text-teal-300 transition-all duration-400 group-hover:scale-110 group-hover:bg-teal-400/[0.14]">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>

                    <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-foreground">
                      {service.name}
                    </h3>
                    <p className="mt-1 text-sm text-teal-300/80">{service.timeline}</p>

                    {/* First sentence only — the full intro lives on /services.
                        A card grid is for scanning, not for reading paragraphs. */}
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.intro.split(". ")[0]}.
                    </p>

                    <div className="mt-6">
                      <TechStack slugs={service.stack.slice(0, 5)} size="sm" showLabel={false} />
                    </div>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal-300">
                      From {service.startingAt}
                      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
