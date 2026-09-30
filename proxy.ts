import { NextResponse, type NextRequest } from "next/server"

import { AUTH_COOKIE, getPassword, hashPassword } from "@/lib/auth"

export async function proxy(request: NextRequest) {
  const password = getPassword()

  if (!password) {
    // Fail closed in production so a missing env var never publishes the docs.
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("DOCS_PASSWORD is not configured.", { status: 500 })
    }
    return NextResponse.next()
  }

  const { pathname, search } = request.nextUrl

  // Registry JSON is fetched by the shadcn CLI, which sends the password as a Bearer token
  // (configured in the consumer's components.json).
  if (pathname.startsWith("/r/")) {
    const header = request.headers.get("authorization")
    if (header === `Bearer ${password}`) return NextResponse.next()
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const cookie = request.cookies.get(AUTH_COOKIE)?.value
  if (cookie && cookie === (await hashPassword(password))) {
    return NextResponse.next()
  }

  const login = new URL("/login", request.url)
  login.searchParams.set("next", pathname + search)
  return NextResponse.redirect(login)
}

export const config = {
  matcher: ["/((?!login|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|ico|woff2?)$).*)"],
}
