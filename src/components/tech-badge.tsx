"use client";

import { getTech, techList, type Tech } from "@/lib/tech";
import { cn } from "@/lib/utils";

/**
 * A single technology chip. The brand colour is applied to the icon only on
 * hover — at rest everything sits in the teal system so the page reads as one
 * palette rather than a bag of logos.
 */
export function TechBadge({
  tech,
  size = "md",
  showLabel = true,
  className,
}: {
  tech: Tech;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}) {
  const Icon = tech.icon;

  const sizes = {
    sm: { wrap: "gap-1.5 px-2.5 py-1 text-xs", icon: "size-3.5" },
    md: { wrap: "gap-2 px-3 py-1.5 text-sm", icon: "size-4" },
    lg: { wrap: "gap-2.5 px-4 py-2 text-base", icon: "size-5" },
  }[size];

  return (
    <span
      className={cn(
        "group/badge inline-flex shrink-0 items-center rounded-full border border-border bg-surface-raised/70 text-muted-foreground transition-all duration-200",
        "hover:border-teal-400/40 hover:bg-teal-400/[0.07] hover:text-foreground",
        sizes.wrap,
        className,
      )}
      // Never rely on colour alone — the label carries the meaning
      title={tech.name}
    >
      <Icon
        className={cn(sizes.icon, "transition-colors duration-200")}
        style={{ color: `color-mix(in oklab, ${tech.color} 65%, currentColor)` }}
        aria-hidden="true"
      />
      {showLabel ? <span className="whitespace-nowrap">{tech.name}</span> : null}
      {!showLabel ? <span className="sr-only">{tech.name}</span> : null}
    </span>
  );
}

/** Render a comma-separated stack string (as stored on Project.stack). */
export function TechStack({
  slugs,
  size = "sm",
  max,
  showLabel = true,
  className,
}: {
  slugs: string[];
  size?: "sm" | "md" | "lg";
  /** Truncate and show a "+n" chip */
  max?: number;
  showLabel?: boolean;
  className?: string;
}) {
  const all = techList(slugs);
  const shown = max ? all.slice(0, max) : all;
  const overflow = max ? all.length - shown.length : 0;

  if (shown.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {shown.map((tech) => (
        <li key={tech.slug}>
          <TechBadge tech={tech} size={size} showLabel={showLabel} />
        </li>
      ))}
      {overflow > 0 ? (
        <li>
          <span className="inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
            +{overflow} more
          </span>
        </li>
      ) : null}
    </ul>
  );
}

/**
 * Large icon-only tile used in the services "stack" grid.
 * Reveals the real brand colour on hover as a glow behind the glyph.
 */
export function TechTile({ slug }: { slug: string }) {
  const tech = getTech(slug);
  if (!tech) return null;
  const Icon = tech.icon;

  return (
    <li className="group/tile relative">
      <div className="relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-border bg-surface/60 p-3 transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-teal-400/40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 40%, ${tech.color}26, transparent 70%)`,
          }}
        />
        <Icon
          className="relative size-7 text-muted-foreground transition-all duration-300 group-hover/tile:scale-110 sm:size-8"
          style={{ ["--tw-text-opacity" as string]: 1 }}
          aria-hidden="true"
        />
        <span className="relative text-center text-[11px] leading-tight text-muted-foreground transition-colors duration-300 group-hover/tile:text-foreground">
          {tech.name}
        </span>
      </div>
    </li>
  );
}
