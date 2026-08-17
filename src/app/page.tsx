import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { ProcessScroll } from "@/components/sections/process-scroll";
import { StackBand } from "@/components/sections/stack-band";
import { CtaSection } from "@/components/sections/cta";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { HoverRevealList } from "@/components/work/hover-reveal-list";
import { TestimonialCard } from "@/components/testimonials/testimonial-rail";
import { principles } from "@/lib/services";
import { stats } from "@/lib/site";
import { getApprovedTestimonials, getFeaturedProjects } from "@/lib/queries";

export default async function HomePage() {
  const [featured, testimonials] = await Promise.all([
    getFeaturedProjects(5),
    getApprovedTestimonials(),
  ]);

  return (
    <>
      <Hero />

      {/* --- Numbers band (moved out of the hero, which is type-only now) ---- */}
      <section aria-label="Studio at a glance" className="border-y border-border bg-ink-900/40">
        <dl className="container-page grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4 lg:py-16">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <div>
                <dt className="font-mono text-[11px] tracking-[0.16em] text-teal-300 uppercase">
                  {stat.label}
                </dt>
                <dd className="mt-3 font-display text-5xl leading-none text-foreground lg:text-6xl">
                  {stat.value}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* --- Positioning statement ------------------------------------------ */}
      <section className="relative py-section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
            <div>
              <Reveal variant="fade">
                <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-teal-300">
                  <span className="h-px w-8 bg-teal-400/50" aria-hidden="true" />
                  The studio
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 text-display-m font-semibold">
                  Agencies sell you hours.
                  <br />
                  <span className="text-gradient-brand">We sell you a working thing.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-7 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  Small on purpose. The people who scope your project write the code — so nothing
                  is lost in a handover, and nobody quotes a timeline they don&apos;t have to meet.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <Link
                  href="/about"
                  data-cursor="About us"
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-teal-300"
                >
                  How we think about building
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            </div>

            <ul className="space-y-4">
              {principles.map((principle, index) => (
                <Reveal
                  key={principle.title}
                  as="li"
                  variant="right"
                  delay={index * 0.08}
                  className="rounded-card border border-border bg-surface p-6 transition-colors duration-400 hover:border-teal-400/40"
                >
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {principle.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ServicesOverview />

      {/* --- Featured work --------------------------------------------------- */}
      <section id="work" className="relative border-t border-border py-section">
        <div className="container-page">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Selected work"
              title="Things we built"
              titleAccent="that are still running"
              body="Each one shipped, and each one is still running."
            />
            <Reveal variant="fade" delay={0.2}>
              <Link
                href="/work"
                data-cursor="All work"
                className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-teal-300"
              >
                View all projects
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14">
            {featured.length > 0 ? (
              <HoverRevealList projects={featured} />
            ) : (
              <p className="rounded-card border border-dashed border-border py-20 text-center text-muted-foreground">
                No featured projects yet. Add one from{" "}
                <Link href="/admin" className="text-teal-300 underline underline-offset-4">
                  the admin dashboard
                </Link>{" "}
                and tick &ldquo;Featured&rdquo;.
              </p>
            )}
          </div>
        </div>
      </section>

      <StackBand />
      <ProcessScroll />

      {/* --- Testimonials --------------------------------------------------- */}
      <section className="relative border-t border-border py-section">
        <div className="container-page">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Client words"
              title="Reviewed by the people"
              titleAccent="who signed the invoices"
              body="Submitted by real clients. Verified by us. Never edited."
            />
            <Reveal variant="fade" delay={0.2}>
              <Link
                href="/testimonials#leave-a-review"
                data-cursor="Write one"
                className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-teal-300"
              >
                Worked with us? Leave a review
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>

          {testimonials.length > 0 ? (
            <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <Reveal key={testimonial.id} as="li" variant="depth" delay={index * 0.08}>
                  <TestimonialCard testimonial={testimonial} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <p className="mt-14 rounded-card border border-dashed border-border py-16 text-center text-muted-foreground">
              No approved reviews yet — they appear here once a client submits one and an admin
              approves it.
            </p>
          )}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
