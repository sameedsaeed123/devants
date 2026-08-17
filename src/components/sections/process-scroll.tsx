"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { process } from "@/lib/services";

/**
 * Horizontally scrolling process rail: the section is pinned while vertical
 * scroll translates the track sideways. Falls back to a normal vertical stack
 * below lg, where a horizontal hijack would fight the touch gesture.
 */
export function ProcessScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Track is ~6 cards wide; move it just far enough to bring the last into view
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative bg-ink-900/40 py-section lg:py-0">
      {/* Mobile / tablet: vertical stack */}
      <div className="container-page lg:hidden">
        <SectionHeading
          eyebrow="How we work"
          title="Six stages,"
          titleAccent="no surprises"
          body="Every engagement runs the same way. You always know what week you're in and what lands next."
        />
        <ol className="mt-12 space-y-5">
          {process.map((stage) => (
            <li
              key={stage.step}
              className="rounded-card border border-border bg-surface p-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-sm text-teal-400">{stage.step}</span>
                <span className="text-xs text-muted-foreground">{stage.duration}</span>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                {stage.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Desktop: pinned horizontal rail */}
      <div ref={sectionRef} className="hidden h-[340vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="container-page">
            <SectionHeading
              eyebrow="How we work"
              title="Six stages,"
              titleAccent="no surprises"
              body="Every engagement runs the same way. You always know what week you're in, what lands next, and what it costs."
            />
          </div>

          <motion.ol style={{ x }} className="mt-14 flex gap-6 pl-[var(--spacing-gutter)]">
            {process.map((stage, index) => (
              <li
                key={stage.step}
                className="group relative w-[26rem] shrink-0 overflow-hidden rounded-card border border-border bg-surface p-8 transition-colors duration-400 hover:border-teal-400/40"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-teal-500/[0.08] blur-2xl transition-opacity duration-500 group-hover:opacity-180"
                />
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-5xl font-bold text-teal-400/25 transition-colors duration-400 group-hover:text-teal-400/50">
                    {stage.step}
                  </span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    {stage.duration}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground">
                  {stage.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stage.body}</p>

                {index < process.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -right-6 h-px w-6 bg-border"
                  />
                ) : null}
              </li>
            ))}
          </motion.ol>

          {/* Scroll progress rail */}
          <div className="container-page mt-12">
            <div className="h-px w-full bg-border">
              <motion.div style={{ width: progressWidth }} className="h-px bg-teal-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
