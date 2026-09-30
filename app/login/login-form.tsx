"use client"

import { useActionState } from "react"

import { Button } from "@/registry/iq/ui/button"
import { login } from "./actions"

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(login, { error: undefined })

  return (
    <form action={action} className="mt-8 flex flex-col gap-3">
      <input type="hidden" name="next" value={next} />
      <label htmlFor="password" className="text-sm text-white/80">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoFocus
        required
        autoComplete="current-password"
        aria-invalid={state.error ? true : undefined}
        aria-describedby={state.error ? "password-error" : undefined}
        className="h-10 rounded-(--button-radius-control) border border-white/10 bg-white/[0.04] px-3 text-white outline-none focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)] aria-invalid:border-(--button-danger-content-default)"
      />
      {state.error && (
        <p id="password-error" className="text-sm text-(color:--button-danger-content-default)">
          {state.error}
        </p>
      )}
      <Button type="submit" loading={pending} className="mt-2">
        Continue
      </Button>
    </form>
  )
}
