"use client";

import { useState } from "react";
import { Check, Star, Trash2, X } from "lucide-react";
import {
  approveTestimonial,
  deleteTestimonial,
  rejectTestimonial,
  toggleTestimonialFeatured,
} from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { cn, formatDate } from "@/lib/utils";

export type AdminTestimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  quote: string;
  rating: number;
  projectSlug: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  featured: boolean;
  adminNote: string;
  submittedAt: Date;
  reviewedAt: Date | null;
};

const statusStyles = {
  PENDING: "border-warning/40 bg-warning/[0.08] text-warning",
  APPROVED: "border-success/40 bg-success/[0.08] text-success",
  REJECTED: "border-destructive/40 bg-destructive/[0.08] text-destructive",
} as const;

function Stars({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${value} of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < value ? "fill-teal-400 text-teal-400" : "fill-transparent text-border-strong",
          )}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function TestimonialRow({ testimonial }: { testimonial: AdminTestimonial }) {
  const [rejecting, setRejecting] = useState(false);

  return (
    <li className="rounded-card border border-border bg-surface p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="font-medium text-foreground">{testimonial.name}</h3>
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide",
                statusStyles[testimonial.status],
              )}
            >
              {testimonial.status}
            </span>
            {testimonial.featured ? (
              <span className="rounded-full border border-teal-400/40 bg-teal-400/[0.08] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-teal-300">
                Featured
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {testimonial.role} · {testimonial.company}
            {testimonial.email ? ` · ${testimonial.email}` : ""}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <Stars value={testimonial.rating} />
          <span className="text-xs text-muted-foreground">
            {formatDate(testimonial.submittedAt)}
          </span>
        </div>
      </div>

      <blockquote className="mt-4 border-l-2 border-teal-400/40 pl-4 text-sm leading-relaxed text-foreground/85">
        {testimonial.quote}
      </blockquote>

      {testimonial.projectSlug ? (
        <p className="mt-3 text-xs text-muted-foreground">
          Linked project: <code className="text-teal-300">{testimonial.projectSlug}</code>
        </p>
      ) : null}

      {testimonial.adminNote ? (
        <p className="mt-3 rounded-lg border border-border bg-ink-900/60 px-3 py-2 text-xs text-muted-foreground">
          Note: {testimonial.adminNote}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-5">
        {testimonial.status !== "APPROVED" ? (
          <form action={approveTestimonial}>
            <input type="hidden" name="id" value={testimonial.id} />
            <Button type="submit" size="sm">
              <Check />
              Approve &amp; publish
            </Button>
          </form>
        ) : null}

        {testimonial.status === "APPROVED" ? (
          <form action={toggleTestimonialFeatured}>
            <input type="hidden" name="id" value={testimonial.id} />
            <Button type="submit" size="sm" variant="outline">
              <Star />
              {testimonial.featured ? "Unfeature" : "Feature"}
            </Button>
          </form>
        ) : null}

        {testimonial.status !== "REJECTED" ? (
          rejecting ? (
            <form action={rejectTestimonial} className="flex flex-wrap items-center gap-2">
              <input type="hidden" name="id" value={testimonial.id} />
              <Input
                name="adminNote"
                placeholder="Why? (internal note)"
                className="h-9 w-56 text-sm"
                autoFocus
              />
              <Button type="submit" size="sm" variant="destructive">
                Confirm reject
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => setRejecting(false)}>
                Cancel
              </Button>
            </form>
          ) : (
            <Button type="button" size="sm" variant="outline" onClick={() => setRejecting(true)}>
              <X />
              Reject
            </Button>
          )
        ) : null}

        <form action={deleteTestimonial} className="ml-auto">
          <input type="hidden" name="id" value={testimonial.id} />
          <Button type="submit" size="sm" variant="ghost" aria-label="Delete permanently">
            <Trash2 />
            Delete
          </Button>
        </form>
      </div>
    </li>
  );
}

export function ModerationQueue({
  pending,
  reviewed,
}: {
  pending: AdminTestimonial[];
  reviewed: AdminTestimonial[];
}) {
  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center gap-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Awaiting review</h2>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              pending.length > 0
                ? "bg-warning/15 text-warning"
                : "bg-muted text-muted-foreground",
            )}
          >
            {pending.length}
          </span>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">
          These are invisible on the public site until you approve them.
        </p>

        {pending.length > 0 ? (
          <ul className="mt-6 space-y-4">
            {pending.map((testimonial) => (
              <TestimonialRow key={testimonial.id} testimonial={testimonial} />
            ))}
          </ul>
        ) : (
          <p className="mt-6 rounded-card border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
            Queue is empty — nothing waiting on you.
          </p>
        )}
      </section>

      <section>
        <div className="flex items-center gap-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Already reviewed</h2>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {reviewed.length}
          </span>
        </div>

        {reviewed.length > 0 ? (
          <ul className="mt-6 space-y-4">
            {reviewed.map((testimonial) => (
              <TestimonialRow key={testimonial.id} testimonial={testimonial} />
            ))}
          </ul>
        ) : (
          <p className="mt-6 rounded-card border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
            Nothing reviewed yet.
          </p>
        )}
      </section>
    </div>
  );
}
