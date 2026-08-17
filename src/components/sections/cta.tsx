import { ArrowUpRight, Calendar, Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-section">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.3] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/[0.09] blur-3xl" />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="fade">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-400/[0.06] px-4 py-1.5 text-xs tracking-wide text-teal-100/80">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-success" />
                <span className="relative inline-flex size-1.5 rounded-full bg-success" />
              </span>
              Two build slots open for Q4
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-7 text-display-l font-semibold">
              Got something that needs
              <br />
              <span className="text-gradient-brand">actually building?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Send us the messy version — a half-formed idea, a broken codebase, a spreadsheet
              running your operations. Forty-five minutes on a call and you&apos;ll leave with a
              scope, a range, and an honest answer about whether we&apos;re the right team for it.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href="/contact" size="lg" data-cursor="Let's talk">
                Book a scoping call
                <Calendar />
              </ButtonLink>
              <ButtonLink
                href={`mailto:${site.email}`}
                variant="outline"
                size="lg"
                data-cursor="Email"
              >
                <Mail />
                {site.email}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.32} variant="fade">
            <p className="mt-8 text-sm text-muted-foreground">
              Prefer to look around first?{" "}
              <a
                href="/work"
                className="group inline-flex items-center gap-1 text-teal-300 underline-offset-4 hover:underline"
              >
                Read a case study
                <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
