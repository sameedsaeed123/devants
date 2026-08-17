"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
  featured: boolean;
};

function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn(
            "size-3.5",
            index < value ? "fill-teal-400 text-teal-400" : "fill-transparent text-border-strong",
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <span
      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-teal-400/25 bg-teal-400/[0.08] text-sm font-semibold text-teal-200"
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: TestimonialItem;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-card border border-border bg-surface p-7 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-teal-400/40",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-teal-500/[0.07] blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative">
        <Quote className="size-7 text-teal-400/40" aria-hidden="true" />
        <blockquote className="mt-4 text-base leading-relaxed text-foreground/90">
          {testimonial.quote}
        </blockquote>
      </div>

      <figcaption className="relative mt-7 flex items-center gap-3 border-t border-border pt-6">
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar}
            alt=""
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-full border border-border object-cover"
          />
        ) : (
          <Initials name={testimonial.name} />
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{testimonial.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
        <div className="ml-auto shrink-0">
          <Rating value={testimonial.rating} />
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Masonry-ish testimonial wall. Columns keep long and short quotes from
 * forcing a uniform card height.
 */
export function TestimonialWall({ testimonials }: { testimonials: TestimonialItem[] }) {
  if (testimonials.length === 0) {
    return (
      <p className="rounded-card border border-dashed border-border py-16 text-center text-muted-foreground">
        No approved reviews yet. Worked with us?{" "}
        <a href="#leave-a-review" className="text-teal-300 underline underline-offset-4">
          Be the first to leave one.
        </a>
      </p>
    );
  }

  return (
    <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
      {testimonials.map((testimonial, index) => (
        <Reveal key={testimonial.id} delay={(index % 6) * 0.05} className="mb-5 break-inside-avoid">
          <TestimonialCard testimonial={testimonial} />
        </Reveal>
      ))}
    </div>
  );
}
