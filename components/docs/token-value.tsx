import { aliasOf, isColor, resolveToken } from "@/lib/tokens"
import { cn } from "@/lib/utils"

/** Checkerboard swatch so translucent colors read correctly. */
export function Swatch({ value, size = "sm" }: { value: string; size?: "sm" | "lg" }) {
  if (!isColor(value)) {
    return size === "lg" ? (
      <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-[2px] border border-grid font-mono text-[10px] text-white/50">
        {resolveToken(value).replace("px", "")}
      </span>
    ) : (
      <span aria-hidden className="size-5 shrink-0" />
    )
  }
  return (
    <span
      aria-hidden
      className={cn(
        "shrink-0 rounded-[2px] border border-white/10 bg-[linear-gradient(45deg,#1a1d1c_25%,transparent_25%,transparent_75%,#1a1d1c_75%),linear-gradient(45deg,#1a1d1c_25%,transparent_25%,transparent_75%,#1a1d1c_75%)]",
        size === "lg" ? "size-8 bg-size-[8px_8px] bg-position-[0_0,4px_4px]" : "size-5 bg-size-[6px_6px] bg-position-[0_0,3px_3px]"
      )}
    >
      <span className="block size-full" style={{ background: resolveToken(value) }} />
    </span>
  )
}

/** Resolved value, plus the token it points to when it is an alias. */
export function TokenValue({ value }: { value: string }) {
  const alias = aliasOf(value)
  return (
    <span className="flex flex-col items-end gap-0.5 text-right font-mono text-xs">
      <span className="text-white/60">{resolveToken(value)}</span>
      {alias && <span className="text-white/35">→ {alias}</span>}
    </span>
  )
}
