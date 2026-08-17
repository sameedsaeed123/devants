import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-xl border bg-ink-900/60 px-4 text-foreground placeholder:text-muted-foreground/60 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function Label({
  className,
  children,
  hint,
  ...props
}: React.ComponentProps<"label"> & { hint?: string }) {
  return (
    <label className={cn("block text-sm font-medium text-foreground/90", className)} {...props}>
      {children}
      {hint ? <span className="ml-2 font-normal text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export function Input({
  className,
  error,
  ...props
}: React.ComponentProps<"input"> & { error?: boolean }) {
  return (
    <input
      aria-invalid={error || undefined}
      className={cn(
        controlBase,
        "h-11",
        error ? "border-destructive/70" : "border-border hover:border-border-strong",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  error,
  ...props
}: React.ComponentProps<"textarea"> & { error?: boolean }) {
  return (
    <textarea
      aria-invalid={error || undefined}
      className={cn(
        controlBase,
        "min-h-32 resize-y py-3 leading-relaxed",
        error ? "border-destructive/70" : "border-border hover:border-border-strong",
        className,
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  error,
  ...props
}: React.ComponentProps<"select"> & { error?: boolean }) {
  return (
    <select
      aria-invalid={error || undefined}
      className={cn(
        controlBase,
        "h-11 cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%238aa5a4%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11",
        error ? "border-destructive/70" : "border-border hover:border-border-strong",
        className,
      )}
      {...props}
    />
  );
}

/** Inline error rendered directly under its field, never only at the top of the form. */
export function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p className="flex items-center gap-1.5 text-sm text-destructive" role="alert">
      <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Field({
  label,
  hint,
  htmlFor,
  error,
  help,
  children,
  className,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  error?: string;
  help?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={htmlFor} hint={hint}>
        {label}
      </Label>
      {children}
      {help && !error ? <p className="text-xs text-muted-foreground">{help}</p> : null}
      <FieldError>{error}</FieldError>
    </div>
  );
}
