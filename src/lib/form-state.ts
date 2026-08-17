/**
 * Shared shape for useActionState forms.
 *
 * This lives outside actions.ts on purpose: a "use server" module may only
 * export async functions, so the initial-state object and its type cannot be
 * declared alongside the actions themselves.
 */
export type FormState = {
  ok: boolean;
  message: string;
  /** Field-level errors keyed by input name */
  errors?: Record<string, string>;
};

export const emptyState: FormState = { ok: false, message: "" };
