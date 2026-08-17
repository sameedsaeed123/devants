"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TechStack } from "@/components/tech-badge";
import { pad, splitList } from "@/lib/utils";

export type WorkListItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  summary: string;
  coverImage: string;
  stack: string;
};

/**
 * Editorial project list. Hovering a row lifts the title, dims its siblings,
 * and floats that project's cover image under the cursor.
 * On touch devices the image sits inline instead — nothing depends on hover.
 */
export function HoverRevealList({ projects }: { projects: WorkListItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 140, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 140, damping: 18, mass: 0.5 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const active = activeIndex !== null ? projects[activeIndex] : null;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setActiveIndex(null)}
      className="relative"
    >
      {/* Cursor-following preview — desktop only */}
      <AnimatePresence>
        {active ? (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: springX, y: springY }}
            className="pointer-events-none absolute top-0 left-0 z-20 hidden lg:block"
          >
            <div className="-translate-x-1/2 -translate-y-1/2">
              <div className="relative h-56 w-88 overflow-hidden rounded-2xl border border-teal-400/25 shadow-[0_24px_70px_-20px_rgba(4,86,92,0.85)]">
                <Image
                  src={active.coverImage}
                  alt=""
                  fill
                  sizes="352px"
                  className="object-cover"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <ul className="relative border-t border-border">
        {projects.map((project, index) => {
          const dimmed = activeIndex !== null && activeIndex !== index;

          return (
            <li key={project.id} className="border-b border-border">
              <Link
                href={`/work/${project.slug}`}
                onPointerEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
                data-cursor="Case study"
                className="group block py-7 transition-opacity duration-400 lg:py-9"
                style={{ opacity: dimmed ? 0.32 : 1 }}
              >
                <div className="flex items-start gap-5 sm:items-center sm:gap-8">
                  <span className="mt-1 font-mono text-xs text-teal-400/70 sm:mt-0 sm:text-sm">
                    {pad(index + 1)}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight text-foreground transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 sm:text-3xl lg:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                      {project.subtitle}
                    </p>

                    {/* Mobile: inline image, since there's no hover to reveal it */}
                    <div className="relative mt-4 h-44 w-full overflow-hidden rounded-xl border border-border sm:h-52 lg:hidden">
                      <Image
                        src={project.coverImage}
                        alt={`${project.title} — ${project.subtitle}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 0px"
                        className="object-cover"
                      />
                    </div>

                    <div className="mt-4 lg:mt-3">
                      <TechStack slugs={splitList(project.stack)} max={4} size="sm" />
                    </div>
                  </div>

                  <div className="hidden shrink-0 items-center gap-8 sm:flex">
                    <span className="text-sm text-muted-foreground">{project.category}</span>
                    <span className="font-mono text-sm text-muted-foreground">{project.year}</span>
                    <span className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-teal-400/60 group-hover:bg-teal-400/10 group-hover:text-teal-300">
                      <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
