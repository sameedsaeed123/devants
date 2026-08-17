"use client";

import { useActionState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { login } from "@/lib/actions";
import { emptyState } from "@/lib/form-state";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, emptyState);

  return (
    <form action={formAction} className="space-y-5">
      <Field label="Password" htmlFor="password" error={state.errors?.password}>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          error={!!state.errors?.password}
        />
      </Field>

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Checking…
          </>
        ) : (
          <>
            Sign in
            <LogIn />
          </>
        )}
      </Button>
    </form>
  );
}
