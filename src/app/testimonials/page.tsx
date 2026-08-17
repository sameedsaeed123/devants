import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Eyebrow, SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/sections/cta";
import { TestimonialForm } from "@/components/testimonials/testimonial-form";
import { TestimonialWall } from "@/components/testimonials/testimonial-rail";
import { getApprovedTestimonials, getProjectIndex } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What DevAnts clients say, in their own words — plus a form to leave your own review. Every testimonial is verified by our team before it appears.",
};

export default async function TestimonialsPage() {
  const [testimonials, projects] = await Promise.all([
    getApprovedTestimonials(),
    getProjectIndex(),
  ]);

  const average =
    testimonials.length > 0
      ? (
          testimonials.reduce((sum, item) => sum + item.rating, 0) / testimonials.length
        ).toFixed(1)
      : null;

  return (
    <>
      <header className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.28] [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_65%)]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-teal-500/[0.10] blur-3xl" />

        <div className="container-page relative">
          <Reveal variant="fade">
            <Eyebrow>Testimonials</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl text-display-l font-bold">
              We didn&apos;t write these.
              <br />
              <span className="text-gradient-brand">Our clients did.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Anyone can put five-star quotes on a website. So here&apos;s how ours work: a client
              submits a review through the form on this page, our team verifies it came from
              someone we actually worked with, and then it publishes — unedited. Reviews awaiting
              verification don&apos;t appear at all.
            </p>
          </Reveal>

          {average ? (
            <Reveal delay={0.24}>
              <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-border pt-8">
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Average rating
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-semibold text-foreground">
                    {average}
                    <span className="text-lg text-muted-foreground"> / 5</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Verified reviews
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-semibold text-foreground">
                    {testimonials.length}
                  </dd>
                </div>
                <div className="flex items-center gap-2 self-end text-sm text-teal-300">
                  <ShieldCheck className="size-4" aria-hidden="true" />
                  Each one manually approved
                </div>
              </dl>
            </Reveal>
          ) : null}
        </div>
      </header>

      <section className="pb-section">
        <div className="container-page">
          <TestimonialWall testimonials={testimonials} />
        </div>
      </section>

      {/* --- Submission form ------------------------------------------------- */}
      <section
        id="leave-a-review"
        className="scroll-mt-24 border-t border-border bg-ink-900/40 py-section"
      >
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Leave a review"
                title="Worked with us?"
                titleAccent="Tell people the truth"
                body="Good or bad, we'd rather hear it. Reviews take about two minutes and go straight to our team for verification."
              />

              <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-mono text-teal-400">01</span>
                  You submit the form — it saves as pending, invisible on the site.
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-teal-400">02</span>
                  We check it&apos;s from a real client, usually within a day.
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-teal-400">03</span>
                  Once approved it appears above, word for word as you wrote it.
                </li>
              </ul>
            </div>

            <div className="rounded-card border border-border bg-surface p-7 sm:p-9">
              <TestimonialForm projects={projects} />
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
