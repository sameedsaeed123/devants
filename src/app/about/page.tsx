import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Eyebrow, SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/sections/cta";
import { StackBand } from "@/components/sections/stack-band";
import { principles, process } from "@/lib/services";
import { site, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "DevAnts is a small product engineering studio. How we work, what we believe about building software, and who ends up on your project.",
};

const roles = [
  {
    title: "Engineering",
    count: "6 people",
    body: "Full-stack, mobile and infrastructure engineers. Everyone here has shipped and then maintained something in production — which changes how you write code.",
  },
  {
    title: "Design",
    count: "2 people",
    body: "Product designers who work in the browser as much as in Figma, so what gets designed is what gets built.",
  },
  {
    title: "Delivery",
    count: "1 person",
    body: "One lead accountable for your timeline and your invoice. Not a layer between you and the team — a person who removes blockers.",
  },
];

export default function AboutPage() {
  return (
    <>
      <header className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.28] [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_65%)]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-teal-500/[0.10] blur-3xl" />

        <div className="container-page relative">
          <Reveal variant="fade">
            <Eyebrow>The studio</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl text-display-l font-bold">
              Named after the ant
              <br />
              <span className="text-gradient-brand">for the obvious reason</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                An ant carries fifty times its own weight, coordinates without a manager, and
                builds structures that outlast any individual in the colony. That&apos;s a
                reasonable brief for a nine-person studio taking on work that larger agencies
                quote six figures for.
              </p>
              <p>
                We started in {site.founded} doing overflow work for other agencies — the
                unglamorous back-end jobs their designers didn&apos;t want. It turned out to be
                good training. You learn a lot about writing maintainable code when you&apos;re
                the third team to touch a codebase.
              </p>
              <p>
                Today we work directly with founders and in-house engineering teams. We&apos;re
                still small, still deliberately so, and we still take the jobs that need
                engineering rather than decoration.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <dl className="mt-14 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-semibold text-foreground sm:text-4xl">
                      {stat.value}
                    </span>
                    <span className="mt-2 block text-sm font-medium text-foreground/80">
                      {stat.label}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                      {stat.detail}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </header>

      {/* --- Principles ------------------------------------------------------ */}
      <section className="border-t border-border py-section">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we believe"
            title="Four things we won't"
            titleAccent="compromise on"
            body="These aren't values on a wall. They're the reasons we've turned down work, and the reasons clients come back."
          />

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.08}>
            {principles.map((principle, index) => (
              <RevealItem key={principle.title} variant="depth">
                <div className="group h-full rounded-card border border-border bg-surface p-8 transition-all duration-400 hover:-translate-y-1 hover:border-teal-400/40">
                  <span className="font-mono text-sm text-teal-400/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-foreground sm:text-2xl">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {principle.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* --- Team shape ------------------------------------------------------ */}
      <section className="border-t border-border bg-ink-900/40 py-section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Who you get"
            title="Nine people,"
            titleAccent="no bench warmers"
            body="We don't sell you a senior in the pitch and staff a junior on the build. The people in your kickoff call are the people in your repo."
          />

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.08}>
            {roles.map((role) => (
              <RevealItem key={role.title} variant="depth">
                <div className="h-full rounded-card border border-border bg-surface p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {role.title}
                    </h3>
                    <span className="rounded-full border border-teal-400/25 bg-teal-400/[0.06] px-3 py-1 text-xs text-teal-200">
                      {role.count}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{role.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <StackBand />

      {/* --- Process --------------------------------------------------------- */}
      <section className="border-t border-border py-section">
        <div className="container-page">
          <SectionHeading
            eyebrow="How it runs"
            title="The engagement,"
            titleAccent="stage by stage"
          />

          <ol className="mt-14 space-y-0">
            {process.map((stage, index) => (
              <Reveal
                key={stage.step}
                as="li"
                delay={index * 0.05}
                className="group grid gap-4 border-t border-border py-8 transition-colors duration-400 hover:border-teal-400/40 sm:grid-cols-[auto_1fr_1.4fr] sm:items-start sm:gap-10"
              >
                <span className="font-display text-3xl font-bold text-teal-400/25 transition-colors duration-400 group-hover:text-teal-400/60 sm:w-16">
                  {stage.step}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {stage.title}
                  </h3>
                  <p className="mt-1.5 text-xs uppercase tracking-[0.14em] text-teal-300/70">
                    {stage.duration}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {stage.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
