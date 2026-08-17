"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [open, setOpen] = useState(false);

  // The homepage hero owns the full viewport with no chrome over it — the
  // header only enters once the hero has been scrolled past. Every other route
  // shows it immediately, since those pages have no full-bleed hero.
  const hidesUntilScrolled = pathname === "/";

  /*
    Header state is driven by a rAF loop reading `scrollY` directly.

    Two things rule out the more obvious approaches here:
      - `window.addEventListener("scroll")` never fires, because Lenis
        virtualises scrolling and emits no native scroll events.
      - IntersectionObserver is unreliable in some embedded/preview browsers
        (it produced zero callbacks during testing, including the initial one).

    A rAF poll depends on neither, so it behaves identically under Lenis,
    native scrolling and reduced-motion. The `lastY` guard keeps it to one
    setState per actual scroll change rather than one per frame.
  */
  useEffect(() => {
    if (!hidesUntilScrolled) {
      setRevealed(true);
      return;
    }

    let frame = 0;
    let lastY = -1;

    function read() {
      const y = window.scrollY;
      if (y !== lastY) {
        lastY = y;
        const past = y > window.innerHeight * 0.72;
        setScrolled(y > 24);
        setRevealed(past);
      }
      frame = requestAnimationFrame(read);
    }

    frame = requestAnimationFrame(read);
    return () => cancelAnimationFrame(frame);
  }, [hidesUntilScrolled]);

  // Close the mobile sheet on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-teal-400 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-950"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-expo)]",
          scrolled
            ? "border-b border-border/80 bg-ink-950/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
          // Slides up out of view over the hero, drops in once past it.
          // `invisible` (not just opacity) so hidden links stay out of the tab order.
          revealed
            ? "translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-full opacity-0",
        )}
      >
        <nav className="container-page flex h-18 items-center justify-between gap-6" aria-label="Main">
          <div className="h-7 shrink-0 sm:h-8">
            <Logo variant="horizontal" priority />
          </div>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm transition-colors duration-200",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-teal-400/[0.09] ring-1 ring-teal-400/25"
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <ButtonLink href="/contact" size="sm" data-cursor="Let's talk">
              Start a project
              <ArrowUpRight />
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-200 hover:border-teal-400/50 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink-950/97 backdrop-blur-xl lg:hidden"
          >
            <div className="container-page flex h-full flex-col justify-center gap-2 pt-20 pb-10">
              {nav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-border/60 py-5 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.5 }}
                className="mt-8 space-y-4"
              >
                <ButtonLink href="/contact" size="lg" className="w-full">
                  Start a project
                  <ArrowUpRight />
                </ButtonLink>
                <a
                  href={`mailto:${site.email}`}
                  className="block text-center text-sm text-muted-foreground"
                >
                  {site.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
