"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  /** Depth entrance — reads as the element rotating into place in 3D */
  depth: {
    hidden: { opacity: 0, y: 60, rotateX: -14, scale: 0.96 },
    visible: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
  },
  left: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
};

/**
 * Fail-safe scroll reveal.
 *
 * A one-shot IntersectionObserver can be skipped entirely by a fast flick, a
 * restored scroll position or an instant `scrollTo` — and because the element
 * starts at opacity 0, missing the trigger hides that content permanently.
 * Three guards prevent that:
 *   1. On mount, anything already at or above the fold shows immediately.
 *   2. The observer uses a negative bottom margin so it fires slightly early.
 *   3. A timeout backstop reveals anything that has entered the viewport
 *      without the observer having reported it.
 * Worst case the animation is skipped. Content is never lost.
 */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // No observer support (or a very old browser): show everything up front.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    // Guard 1 — the element's top has already entered or passed the fold.
    // `top < innerHeight` deliberately includes negative values, so content the
    // reader has scrolled past is shown rather than left blank behind them.
    if (element.getBoundingClientRect().top < window.innerHeight * 0.94) {
      setShown(true);
      return;
    }

    const revealIfReached = () => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.94) {
        setShown(true);
        return true;
      }
      return false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      // Guard 2 — fire a little before the element is fully in view
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    observer.observe(element);

    /*
      Guard 3 — a rAF loop, which is the guard that actually carries the load.
      IntersectionObserver is unreliable in some embedded/preview browsers
      (measured: zero callbacks, including the mandatory initial one), and it
      can also coalesce away a fast flick or a programmatic jump. rAF depends on
      neither the observer nor native scroll events, so it always fires.
    */
    let frame = 0;
    function poll() {
      if (revealIfReached()) {
        observer.disconnect();
        return; // stop the loop — this element is done
      }
      frame = requestAnimationFrame(poll);
    }
    frame = requestAnimationFrame(poll);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, shown };
}

export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  duration = 0.7,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  delay?: number;
  duration?: number;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const MotionTag = motion[Tag] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={cn(variant === "depth" && "preserve-3d", className)}
      initial="hidden"
      animate={shown ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggered children — pair with <RevealItem>. */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={shown ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
}) {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
