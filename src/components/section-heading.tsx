import { MaskReveal } from "@/components/mask-reveal";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/** Small monospaced label above a section title, with a teal rule. */
export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-teal-300",
        className,
      )}
    >
      <span className="h-px w-8 bg-teal-400/50" aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  body,
  align = "left",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  /** Second line, rendered in the teal gradient */
  titleAccent?: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal variant="fade">
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}

      {/* Masked line reveal — the heading is uncovered line by line as it
          enters, rather than fading in as one block. */}
      <Tag className="mt-5 text-display-m uppercase">
        <MaskReveal delay={0.06}>{title}</MaskReveal>
        {titleAccent ? (
          <MaskReveal delay={0.15} lineClassName="text-gradient-brand">
            {titleAccent}
          </MaskReveal>
        ) : null}
      </Tag>

      {body ? (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {body}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
