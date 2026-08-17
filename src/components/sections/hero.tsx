"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ChevronScene } from "@/components/three/chevron-scene";

/**
 * Hero — structure cloned from brikken.co, rebuilt in the DevAnts palette.
 *
 * Source measurements (captured from the live page, not eyeballed):
 *   wordmark  full-bleed sans, tight tracking, superscript ™
 *   subhead   20px / 26px, weight 500
 *   CTA       mono 14px, letter-spacing 1.4px, padding 14px 20px, radius 5px,
 *             solid brand fill, white text
 *   backdrop  faint vertical column rules
 *
 * The site header is deliberately absent here — it fades in only after the
 * hero has scrolled away (see SiteNav).
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const markY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction"
      className="relative h-[165vh] bg-ink-950"
    >
      {/*
        justify-start + mt-auto on the bottom block, NOT justify-between.
        With justify-between, any content taller than the container makes flex
        overflow the FIRST child upward past the padding edge — which clipped
        the top of the wordmark. Anchoring from the top sends overflow downward
        instead, where the size cap below prevents it entirely.
      */}
      <div className="sticky top-0 flex h-screen flex-col justify-start pt-16 pb-10 sm:pt-20">
        {/* Column rules — the faint vertical guides behind everything */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex justify-between overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="h-full w-px bg-teal-300/[0.07]" />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-teal-500/[0.05] via-transparent to-teal-800/[0.10]" />

        {/*
          3D mark. Two things matter here, both taken from the reference:
            1. It lands FIRST — before any type — hence the short delay and the
               longer, heavier drop easing.
            2. It sits IN FRONT of the wordmark (z-20 vs z-10), overlapping its
               lower half rather than sitting below it in the flow.
        */}
        <motion.div
          style={{ y: markY }}
          className="animate-object-drop pointer-events-none absolute top-[28%] right-0 left-0 z-20 mx-auto h-[56%] w-[80%] sm:w-[54%] lg:w-[40%]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-teal-500/[0.12] blur-[80px]"
          />
          <ChevronScene scrollTargetId="hero" />
        </motion.div>

        {/* Wordmark — full-bleed across the top, entering after the mark */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 px-[var(--spacing-gutter)]"
        >
          {/*
            font-sans overrides the global h1 -> display(Anton) rule. The source
            sets its wordmark in the BODY grotesque, not the condensed display
            face — inheriting Anton here reads as a completely different brand.
            24.5vw sizes 7 characters to roughly the full column width, matching
            the source's full-bleed wordmark proportion.
          */}
          <h1
            // leading-[1] not [0.85]: at this size a sub-1 line-height makes the
            // glyph box shorter than the ascenders, which clips the tops of the
            // letters against the container edge.
            /*
              Two guards against the top of the letters being cut off:
                - min(vw, vh) caps the size on BOTH axes, so a short window
                  shrinks the wordmark instead of pushing it off screen.
                - pt-[0.18em] is headroom in EM, so it scales with the font.
                  Ink sits ~11% of the font size above the element box, and a
                  fixed pixel padding only happens to be enough at one size.
            */
            className="animate-rise-fade flex items-start pt-[0.18em] font-sans text-[clamp(2.5rem,min(20vw,30vh),16rem)] leading-[1] font-semibold tracking-[-0.045em] text-foreground"
            style={{ animationDelay: "0.5s" }}
          >
            DevAnts
            <span className="mt-[0.3em] ml-[0.04em] text-[0.14em] font-medium tracking-normal">
              ™
            </span>
          </h1>
        </motion.div>

        {/* Subhead + CTA — pushed to the bottom with mt-auto */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 mt-auto px-[var(--spacing-gutter)]"
        >
          <p
            className="animate-rise-fade max-w-xl text-lg leading-[1.3] font-medium text-foreground sm:text-xl"
            style={{ animationDelay: "0.78s" }}
          >
            We turn ambitious ideas into web platforms, mobile apps and systems
            teams can actually run.
          </p>

          <div className="animate-rise-fade mt-7" style={{ animationDelay: "0.94s" }}>
            <Link
              href="/contact"
              data-cursor="Let's talk"
              className="group inline-flex items-center gap-2.5 rounded-[5px] bg-teal-400 px-5 py-3.5 font-mono text-sm tracking-[0.1em] text-ink-950 uppercase transition-colors duration-200 hover:bg-teal-300"
            >
              Build with us
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
