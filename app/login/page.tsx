import type { Metadata } from "next"

import { safeNext } from "@/lib/auth"
import { LoginForm } from "./login-form"

export const metadata: Metadata = { title: "Sign in" }

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="text-xs font-medium tracking-widest text-white/40 uppercase">IQ Capital</p>
        <h1 className="mt-2 text-2xl font-semibold text-white">CRM Design System</h1>
        <p className="mt-2 text-sm text-white/60">Enter the team password to view the docs.</p>
        <LoginForm next={safeNext(next)} />
      </div>
    </main>
  )
}
