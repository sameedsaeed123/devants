"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Masked line reveal — the signature agency-site heading effect.
 *
 * Each line sits inside an `overflow-hidden` wrapper and slides up from below
 * its own baseline, so the type appears to be uncovered rather than faded in.
 * Lines are split on explicit `\n`, never on measured text, so the reveal can
 * never desync from how the browser actually wraps the copy.
 *
 * Uses the same three-guard visibility approach as <Reveal>: a missed trigger
 * costs the animation, never the words.
 */
export function MaskReveal({
  children,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "span",
}: {
  /** Use "\n" to mark deliberate line breaks */
  children: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "span" | "div";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const lines = children.split("\n");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const reveal = () => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
        setShown(true);
        return true;
      }
      return false;
    };

    if (reveal()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );
    observer.observe(element);

    const backstop = window.setInterval(() => {
      if (reveal()) {
        observer.disconnect();
        window.clearInterval(backstop);
      }
    }, 400);

    return () => {
      observer.disconnect();
      window.clearInterval(backstop);
    };
  }, []);

  const Wrapper = Tag === "div" ? motion.div : motion.span;

  return (
    <Wrapper ref={ref} className={cn("block", className)}>
      {lines.map((line, index) => (
        // The clipping wrapper: pb/-mb pair stops descenders (g, y, p) being
        // shaved off by the overflow while still hiding the pre-reveal offset.
        <span key={index} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <motion.span
            className={cn("block", lineClassName)}
            initial={{ y: "110%" }}
            animate={shown ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.85,
              delay: delay + index * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Wrapper>
  );
}
