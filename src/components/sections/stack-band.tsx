import { Reveal } from "@/components/reveal";
import { TechMarquee } from "@/components/marquee";
import { Eyebrow } from "@/components/section-heading";
import { MARQUEE_TECH } from "@/lib/tech";

/** Two counter-scrolling logo rails, splitting the deck roughly in half. */
export function StackBand() {
  const half = Math.ceil(MARQUEE_TECH.length / 2);

  return (
    <section
      aria-labelledby="stack-band-heading"
      className="relative overflow-hidden border-y border-border bg-ink-900/50 py-16 lg:py-20"
    >
      <div className="container-page">
        <Reveal variant="fade" className="text-center">
          <Eyebrow>Our toolkit</Eyebrow>
          <h2
            id="stack-band-heading"
            className="mx-auto mt-4 max-w-2xl text-xl leading-relaxed font-normal text-muted-foreground sm:text-2xl"
          >
            We&apos;re not loyal to a framework — we&apos;re loyal to whatever your team can
            still maintain in three years.
          </h2>
        </Reveal>
      </div>

      <div className="mt-12 space-y-6">
        <TechMarquee slugs={MARQUEE_TECH.slice(0, half)} />
        <TechMarquee slugs={MARQUEE_TECH.slice(half)} reverse />
      </div>
    </section>
  );
}
