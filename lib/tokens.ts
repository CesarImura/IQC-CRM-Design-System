import tokens from "@/registry/iq/tokens/tokens.json"

export type Token = { name: string; value: string; figma: string }
export type TokenGroup = (typeof tokens.groups)[number] & { tier?: "semantic" | "primitive" }

export const groups = tokens.groups as TokenGroup[]
export const byName = new Map<string, Token>(groups.flatMap((g) => g.tokens.map((t) => [t.name, t] as const)))

const VAR = /^var\(--([a-z0-9-]+)\)$/

/** The token this one points to, e.g. "surface-canvas" for `var(--surface-canvas)`. */
export function aliasOf(value: string) {
  return VAR.exec(value)?.[1]
}

/** Follows var() aliases down to the raw value. */
export function resolveToken(value: string): string {
  let current = value
  for (let i = 0; i < 10; i++) {
    const next = aliasOf(current)
    if (!next) return current
    current = byName.get(next)?.value ?? current
  }
  return current
}

export const isColor = (value: string) => resolveToken(value).startsWith("#")
