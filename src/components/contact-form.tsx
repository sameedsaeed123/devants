"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitInquiry } from "@/lib/actions";
import { emptyState } from "@/lib/form-state";
import { Field, Input, Label, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import { budgetRanges } from "@/lib/site";

export function ContactForm({ preselectedService }: { preselectedService?: string }) {
  const [state, formAction, pending] = useActionState(submitInquiry, emptyState);

  if (state.ok) {
    return (
      <div className="rounded-card border border-success/30 bg-success/[0.06] p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-success" aria-hidden="true" />
        <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
          Message received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {state.message} In the meantime, the fastest way to speed things up is to reply to our
          email with any links, designs or repo access you already have.
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

        <Field label="Email" htmlFor="email" error={state.errors?.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            error={!!state.errors?.email}
          />
        </Field>

        <Field label="Company" hint="optional" htmlFor="company">
          <Input id="company" name="company" autoComplete="organization" />
        </Field>

        <Field
          label="Budget range"
          hint="optional"
          htmlFor="budget"
          help="A range helps us propose something realistic rather than guessing."
        >
          <Select id="budget" name="budget" defaultValue="">
            <option value="">Prefer not to say</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-foreground/90">
          What do you need?
          <span className="ml-2 font-normal text-muted-foreground">pick any</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {services.map((service) => (
            <label
              key={service.slug}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-all duration-200 hover:border-teal-400/50 hover:text-foreground has-checked:border-teal-400 has-checked:bg-teal-400/10 has-checked:text-foreground"
            >
              <input
                type="checkbox"
                name="services"
                value={service.slug}
                defaultChecked={preselectedService === service.slug}
                className="size-4 cursor-pointer accent-teal-400"
              />
              <service.icon className="size-4 text-teal-400" aria-hidden="true" />
              {service.name}
            </label>
          ))}
        </div>
      </fieldset>

      <Field
        label="Tell us about the project"
        htmlFor="message"
        error={state.errors?.message}
        help="What are you trying to build or fix? What exists already? Any deadline we should know about?"
      >
        <Textarea
          id="message"
          name="message"
          rows={7}
          minLength={20}
          maxLength={4000}
          required
          error={!!state.errors?.message}
          placeholder="We run a clinic booking system on a spreadsheet and it's breaking. Roughly 200 appointments a week, three locations…"
        />
      </Field>

      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted-foreground sm:max-w-sm">
          We reply to every enquiry within one working day, even the ones we&apos;re not the right
          fit for. No automated sequences.
        </p>
        <Button type="submit" size="lg" disabled={pending} className="shrink-0">
          {pending ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <Send />
            </>
          )}
        </Button>
      </div>

      {state.message && !state.ok ? (
        <p
          className="rounded-xl border border-destructive/30 bg-destructive/[0.08] px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
