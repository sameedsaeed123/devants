"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, Loader2, Send, ShieldCheck, Star } from "lucide-react";
import { submitTestimonial } from "@/lib/actions";
import { emptyState } from "@/lib/form-state";
import { Field, Input, Label, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function RatingPicker({ value, onChange }: { value: number; onChange: (next: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = hovered ?? value;

  return (
    <div className="space-y-2">
      <Label htmlFor="rating-1">How was it?</Label>
      <div
        className="flex items-center gap-1"
        role="radiogroup"
        aria-label="Rating out of five"
        onPointerLeave={() => setHovered(null)}
      >
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            id={`rating-${score}`}
            type="button"
            role="radio"
            aria-checked={value === score}
            aria-label={`${score} star${score === 1 ? "" : "s"}`}
            onClick={() => onChange(score)}
            onPointerEnter={() => setHovered(score)}
            className="flex size-11 cursor-pointer items-center justify-center rounded-lg transition-transform duration-150 hover:scale-110"
          >
            <Star
              className={cn(
                "size-6 transition-colors duration-150",
                score <= shown ? "fill-teal-400 text-teal-400" : "fill-transparent text-border-strong",
              )}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">{shown} / 5</span>
      </div>
      <input type="hidden" name="rating" value={value} />
    </div>
  );
}

export function TestimonialForm({
  projects,
}: {
  projects: { slug: string; title: string }[];
}) {
  const [state, formAction, pending] = useActionState(submitTestimonial, emptyState);
  const [rating, setRating] = useState(5);

  if (state.ok) {
    return (
      <div className="rounded-card border border-success/30 bg-success/[0.06] p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-success" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">
          Review submitted
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" error={state.errors?.name}>
          <Input id="name" name="name" autoComplete="name" required error={!!state.errors?.name} />
        </Field>

        <Field label="Your role" htmlFor="role" error={state.errors?.role}>
          <Input
            id="role"
            name="role"
            placeholder="Head of Product"
            autoComplete="organization-title"
            required
            error={!!state.errors?.role}
          />
        </Field>

        <Field label="Company or product" htmlFor="company" error={state.errors?.company}>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            required
            error={!!state.errors?.company}
          />
        </Field>

        <Field
          label="Email"
          hint="optional"
          htmlFor="email"
          error={state.errors?.email}
          help="Only used if we need to check something with you. Never published."
        >
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            error={!!state.errors?.email}
          />
        </Field>
      </div>

      {projects.length > 0 ? (
        <Field label="Which project?" hint="optional" htmlFor="projectSlug">
          <Select id="projectSlug" name="projectSlug" defaultValue="">
            <option value="">Not tied to one project</option>
            {projects.map((project) => (
              <option key={project.slug} value={project.slug}>
                {project.title}
              </option>
            ))}
          </Select>
        </Field>
      ) : null}

      <RatingPicker value={rating} onChange={setRating} />

      <Field
        label="Your review"
        htmlFor="quote"
        error={state.errors?.quote}
        help="What did we work on, and what changed for you? Specifics beat superlatives."
      >
        <Textarea
          id="quote"
          name="quote"
          rows={6}
          minLength={40}
          maxLength={1200}
          required
          error={!!state.errors?.quote}
          placeholder="DevAnts rebuilt our booking flow in Next.js and cut checkout time from 90 seconds to under 20…"
        />
      </Field>

      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground sm:max-w-sm">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-teal-400" aria-hidden="true" />
          Reviews are read by our team before they appear on the site. We never edit the words —
          we only check the review is genuine.
        </p>

        <Button type="submit" size="lg" disabled={pending} className="shrink-0">
          {pending ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Submit review
              <Send />
            </>
          )}
        </Button>
      </div>

      {state.message && !state.ok ? (
        <p className="rounded-xl border border-destructive/30 bg-destructive/[0.08] px-4 py-3 text-sm text-destructive" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
