"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TechStack } from "@/components/tech-badge";
import { cn, splitList } from "@/lib/utils";
import type { WorkListItem } from "@/components/work/hover-reveal-list";

/**
 * Filterable project grid. Filtering is client-side over the full published set
 * so switching category is instant and never refetches.
 */
export function ProjectGrid({
  projects,
  categories,
}: {
  projects: WorkListItem[];
  categories: string[];
}) {
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  );

  const tabs = ["All", ...categories];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="flex flex-wrap items-center gap-2"
      >
        {tabs.map((tab) => {
          const selected = filter === tab;
          const count = tab === "All" ? projects.length : projects.filter((p) => p.category === tab).length;

          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(tab)}
              className={cn(
                "relative cursor-pointer rounded-full px-4 py-2 text-sm transition-colors duration-200",
                selected ? "text-ink-950" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {selected ? (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-teal-400"
                  transition={{ type: "spring", stiffness: 340, damping: 30 }}
                />
              ) : (
                <span className="absolute inset-0 rounded-full border border-border" />
              )}
              <span className="relative">
                {tab}
                <span className={cn("ml-2 text-xs", selected ? "text-ink-950/60" : "text-muted-foreground/70")}>
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.li
              key={project.id}
              layout
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                // Give the first card of every group of five a full-width feature slot
                index % 5 === 0 && "sm:col-span-2",
              )}
            >
              <ProjectCard project={project} featured={index % 5 === 0} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {filtered.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
          Nothing in {filter} yet. Try another category.
        </p>
      ) : null}
    </div>
  );
}

export function ProjectCard({
  project,
  featured = false,
}: {
  project: WorkListItem;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="Case study"
      className="group relative block h-full overflow-hidden rounded-card border border-border bg-surface transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-teal-400/40 hover:shadow-[0_30px_70px_-30px_rgba(4,86,92,0.9)]"
    >
      <div className={cn("relative overflow-hidden", featured ? "aspect-[16/8]" : "aspect-[16/10]")}>
        <Image
          src={project.coverImage}
          alt={`${project.title} — ${project.subtitle}`}
          fill
          sizes={featured ? "(max-width: 640px) 100vw, 1200px" : "(max-width: 640px) 100vw, 600px"}
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />

        <span className="absolute top-4 left-4 rounded-full border border-teal-300/25 bg-ink-950/70 px-3 py-1 text-xs text-teal-100 backdrop-blur-sm">
          {project.category}
        </span>

        <span className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full border border-teal-300/25 bg-ink-950/70 text-teal-200 opacity-0 backdrop-blur-sm transition-all duration-400 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3
            className={cn(
              "font-display font-semibold tracking-tight text-foreground",
              featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
            )}
          >
            {project.title}
          </h3>
          <span className="shrink-0 font-mono text-xs text-muted-foreground">{project.year}</span>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">{project.subtitle}</p>

        {/* Summary slides in on hover — the payoff for exploring */}
        <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-foreground/70 opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:max-h-24 group-hover:opacity-100">
          {project.summary}
        </p>

        <div className="mt-5">
          <TechStack slugs={splitList(project.stack)} max={featured ? 6 : 4} size="sm" />
        </div>
      </div>
    </Link>
  );
}
