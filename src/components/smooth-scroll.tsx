"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

/**
 * One scroll driver for the whole site.
 *
 * The jank you get from a naive setup comes from three clocks running at once:
 * Lenis on its own rAF, GSAP on another, and ScrollTrigger listening to native
 * scroll events that Lenis has already virtualised. Here they share a single
 * clock — gsap.ticker drives Lenis, and Lenis notifies ScrollTrigger — so every
 * scroll-linked value is computed once per frame, in order.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // No smoothing, but ScrollTrigger must still work off native scroll.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      // Exponential ease-out: fast pickup, long settle — reads as weight, not lag
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // native momentum on touch feels better than emulated
      touchMultiplier: 1.6,
      // Replaces the CSS smooth-scroll we removed: in-page #anchors route
      // through Lenis, offset to clear the fixed header.
      anchors: { offset: -80 },
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Lenis publishes scroll position -> ScrollTrigger recomputes in the same frame
    lenis.on("scroll", ScrollTrigger.update);

    // gsap.ticker is the single clock. Lenis expects milliseconds.
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    // Disable lag smoothing so a slow frame doesn't teleport scroll-linked values
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // Route changes land at the top, and pinned triggers re-measure against the
  // new document height.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    const id = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}

export default SmoothScroll;
