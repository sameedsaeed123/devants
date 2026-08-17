import { MARQUEE_TECH, techList } from "@/lib/tech";
import { cn } from "@/lib/utils";

/**
 * Infinite logo rail. The track holds the list twice and translates -50%,
 * so the loop is seamless. Pure CSS animation — no JS, no layout thrash.
 */
export function TechMarquee({
  slugs = MARQUEE_TECH,
  reverse = false,
  className,
}: {
  slugs?: string[];
  reverse?: boolean;
  className?: string;
}) {
  const items = techList(slugs);
  const doubled = [...items, ...items];

  return (
    <div
      className={cn("group/marquee relative overflow-hidden py-2", className)}
      aria-hidden="true"
    >
      {/* Edge fades so logos dissolve instead of hard-cutting at the viewport */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent sm:w-40" />

      <ul
        className={cn(
          "flex w-max items-center gap-10 will-change-transform sm:gap-14",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          "group-hover/marquee:[animation-play-state:paused]",
        )}
      >
        {doubled.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <li
              key={`${tech.slug}-${index}`}
              className="flex shrink-0 items-center gap-3 text-muted-foreground/70 transition-colors duration-300 hover:text-foreground"
            >
              <Icon className="size-6 sm:size-7" />
              <span className="text-sm font-medium whitespace-nowrap sm:text-base">
                {tech.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Oversized scrolling text band, used as a section divider. */
export function TextMarquee({
  text,
  reverse = false,
  className,
}: {
  text: string;
  reverse?: boolean;
  className?: string;
}) {
  // 12 copies = the 6-item track duplicated, so the -50% loop is seamless
  const repeated = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className={cn("relative overflow-hidden py-6", className)} aria-hidden="true">
      <ul
        className={cn(
          "flex w-max items-center gap-8 will-change-transform",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {repeated.map((index) => (
          <li
            key={index}
            className="font-display text-4xl font-semibold tracking-tight whitespace-nowrap text-transparent sm:text-6xl md:text-7xl"
            style={{ WebkitTextStroke: "1px rgba(47,207,201,0.22)" }}
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
