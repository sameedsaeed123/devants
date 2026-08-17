"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/logo";

/**
 * First-visit preloader.
 *
 * Two rules keep this from becoming an obstacle:
 *   1. It only ever runs once per session (sessionStorage), so internal
 *      navigation is never gated behind an animation the user already watched.
 *   2. It resolves on `window.load` OR a hard 2.2s ceiling, whichever lands
 *      first — a stalled image can never trap someone on a splash screen.
 * Under prefers-reduced-motion it doesn't render at all.
 */
export function Loader() {
  const [done, setDone] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const seen = sessionStorage.getItem("devants:loaded");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduceMotion) return;

    setDone(false);
    document.body.style.overflow = "hidden";

    // Ease toward 90% while assets load; the finish() call takes it to 100.
    const crawl = window.setInterval(() => {
      setProgress((current) => (current >= 90 ? current : current + (90 - current) * 0.12 + 1));
    }, 90);

    let exitTimer = 0;
    const finish = () => {
      window.clearInterval(crawl);
      setProgress(100);
      exitTimer = window.setTimeout(() => {
        setDone(true);
        document.body.style.overflow = "";
        sessionStorage.setItem("devants:loaded", "1");
      }, 420);
    };

    if (document.readyState === "complete") {
      window.setTimeout(finish, 550);
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    // Ceiling — never hold the page hostage to a slow asset
    const ceiling = window.setTimeout(finish, 2200);

    return () => {
      window.clearInterval(crawl);
      window.clearTimeout(ceiling);
      window.clearTimeout(exitTimer);
      window.removeEventListener("load", finish);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink-950"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-live="polite"
          aria-label="Loading DevAnts"
        >
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25]" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/[0.09] blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-9 sm:h-11"
          >
            <Logo variant="horizontal" href={null} priority />
          </motion.div>

          {/* Progress rail — a real number, not a decorative spinner */}
          <div className="relative mt-9 h-px w-52 overflow-hidden bg-border sm:w-64">
            <motion.div
              className="h-full bg-teal-400"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.18 }}
            />
          </div>

          <span className="relative mt-4 font-mono text-xs tracking-[0.2em] text-muted-foreground">
            {String(Math.round(progress)).padStart(3, "0")}
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Loader;
