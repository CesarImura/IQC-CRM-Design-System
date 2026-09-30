// Shared-password gate for the docs site. Light protection only: it keeps casual visitors out,
// it is not per-user authentication.
export const AUTH_COOKIE = "iq_docs_auth"

export function getPassword() {
  return process.env.DOCS_PASSWORD
}

/** The cookie stores a SHA-256 of the password, never the password itself. */
export async function hashPassword(password: string) {
  const bytes = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`iq-docs:${password}`)
  )
  return Array.from(new Uint8Array(bytes), (b) =>
    b.toString(16).padStart(2, "0")
  ).join("")
}

/** Only allow same-site relative redirects after login. */
export function safeNext(next: unknown) {
  return typeof next === "string" && next.startsWith("/") && !next.startsWith("//")
    ? next
    : "/"
}
