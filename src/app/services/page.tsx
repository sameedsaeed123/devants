import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Eyebrow, SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/sections/cta";
import { TechTile } from "@/components/tech-badge";
import { ButtonLink } from "@/components/ui/button";
import { process, services } from "@/lib/services";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web platforms, mobile apps, DevOps, automation, AI engineering, product design and team augmentation — what DevAnts builds, in which technologies, and what it costs.",
};

export default function ServicesPage() {
  return (
    <>
      {/* --- Page header ---------------------------------------------------- */}
      <header className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.28] [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_65%)]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-teal-500/[0.10] blur-3xl" />

        <div className="container-page relative">
          <Reveal variant="fade">
            <Eyebrow>Services</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl text-display-l font-bold">
              Everything from the first sketch
              <br />
              <span className="text-gradient-brand">to the 3am pager alert</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Seven services, one team. Most clients start with one and grow into two or three —
              a mobile app that needs a back-end, a platform that needs a deployment pipeline.
              Prices below are real starting points, not anchors: we quote a fixed range after
              scoping, and we tell you when a cheaper approach would do.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact" size="lg" data-cursor="Let's talk">
                Book a scoping call
                <ArrowUpRight />
              </ButtonLink>
              <ButtonLink href="/work" variant="outline" size="lg" data-cursor="View">
                See the results
              </ButtonLink>
            </div>
          </Reveal>

          {/* Jump nav */}
          <Reveal delay={0.32} variant="fade">
            <nav aria-label="Jump to a service" className="mt-14 border-t border-border pt-8">
              <ul className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <li key={service.slug}>
                    <a
                      href={`#${service.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400/50 hover:text-foreground"
                    >
                      <service.icon className="size-4 text-teal-400" aria-hidden="true" />
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </header>

      {/* --- One block per service ------------------------------------------ */}
      {services.map((service, index) => {
        const Icon = service.icon;
        const even = index % 2 === 0;

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`scroll-mt-24 border-t border-border py-20 lg:py-28 ${
              even ? "" : "bg-ink-900/40"
            }`}
            aria-labelledby={`${service.slug}-heading`}
          >
            <div className="container-page">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
                {/* Left: identity + meta */}
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <Reveal variant="fade">
                    <span className="font-mono text-sm text-teal-400/60">{pad(index + 1)}</span>
                  </Reveal>

                  <Reveal delay={0.06}>
                    <span className="mt-5 flex size-14 items-center justify-center rounded-2xl border border-teal-400/25 bg-teal-400/[0.08] text-teal-300">
                      <Icon className="size-7" aria-hidden="true" />
                    </span>
                  </Reveal>

                  <Reveal delay={0.12}>
                    <h2
                      id={`${service.slug}-heading`}
                      className="mt-6 text-display-m font-semibold"
                    >
                      {service.headline}
                    </h2>
                  </Reveal>

                  <Reveal delay={0.18}>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                      {service.intro}
                    </p>
                  </Reveal>

                  <Reveal delay={0.24}>
                    <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                      <div>
                        <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                          Typical timeline
                        </dt>
                        <dd className="mt-1.5 text-sm text-foreground">{service.timeline}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                          Starting at
                        </dt>
                        <dd className="mt-1.5 text-sm font-medium text-teal-300">
                          {service.startingAt}
                        </dd>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={0.3}>
                    <div className="mt-7 rounded-card border border-teal-400/20 bg-teal-400/[0.04] p-5">
                      <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-teal-300">
                        Sound familiar?
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-foreground/80">
                        {service.problem}
                      </p>
                    </div>
                  </Reveal>
                </div>

                {/* Right: capabilities, deliverables, stack */}
                <div>
                  <RevealGroup className="space-y-4" stagger={0.06}>
                    {service.capabilities.map((capability) => (
                      <RevealItem key={capability.title}>
                        <div className="group rounded-card border border-border bg-surface p-6 transition-all duration-400 hover:-translate-y-0.5 hover:border-teal-400/40">
                          <h3 className="font-display text-lg font-semibold text-foreground">
                            {capability.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {capability.body}
                          </p>
                        </div>
                      </RevealItem>
                    ))}
                  </RevealGroup>

                  <Reveal delay={0.1} className="mt-10">
                    <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      What you get
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {service.deliverables.map((deliverable) => (
                        <li key={deliverable} className="flex items-start gap-3 text-sm">
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-teal-400"
                            aria-hidden="true"
                          />
                          <span className="text-foreground/85">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal delay={0.14} className="mt-10">
                    <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      Technologies we use here
                    </h3>
                    <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                      {service.stack.map((slug) => (
                        <TechTile key={slug} slug={slug} />
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal delay={0.18} className="mt-10">
                    <Link
                      href={`/contact?service=${service.slug}`}
                      data-cursor="Enquire"
                      className="group inline-flex items-center gap-2 text-sm font-medium text-teal-300"
                    >
                      Talk to us about {service.name.toLowerCase()}
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* --- Process recap --------------------------------------------------- */}
      <section className="border-t border-border py-section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Engagement"
            title="However you start,"
            titleAccent="the process is the same"
            align="center"
            body="No service is a black box. Here's the shape of a typical engagement from first call to handover."
          />

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {process.map((stage) => (
              <RevealItem key={stage.step} variant="depth">
                <div className="group h-full rounded-card border border-border bg-surface p-7 transition-all duration-400 hover:-translate-y-1 hover:border-teal-400/40">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-4xl font-bold text-teal-400/25 transition-colors duration-400 group-hover:text-teal-400/50">
                      {stage.step}
                    </span>
                    <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                      {stage.duration}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                    {stage.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {stage.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
