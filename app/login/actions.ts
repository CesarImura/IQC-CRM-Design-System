"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { AUTH_COOKIE, getPassword, hashPassword, safeNext } from "@/lib/auth"

type LoginState = { error?: string }

export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  const expected = getPassword()
  const password = formData.get("password")

  if (!expected || typeof password !== "string" || password !== expected) {
    return { error: "Incorrect password." }
  }

  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE, await hashPassword(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })

  redirect(safeNext(formData.get("next")))
}
