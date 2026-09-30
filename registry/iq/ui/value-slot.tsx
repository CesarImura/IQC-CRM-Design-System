import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → _Value Slot (172:8258). The content of a table cell, one
// component per Cell Type. Badge, Delta, Status Dot and Pill cells use those components directly.

const text = "block min-w-0 truncate text-sm leading-normal"

/** Cell Type = Text. Plain values such as names. */
function ValueText({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="value-text" className={cn(text, "text-(color:--value-slot-text)", className)} {...props} />
}

/** Cell Type = Mono. IDs, hashes, codes. Truncates with an ellipsis; pass `title` for the full value. */
function ValueMono({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="value-mono" className={cn(text, "font-mono text-(color:--value-slot-text)", className)} {...props} />
  )
}

/** Cell Type = Number. Pass the value already formatted for the user's locale. */
function ValueNumber({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="value-number" className={cn(text, "text-(color:--value-slot-text) tabular-nums", className)} {...props} />
  )
}

/** Cell Type = Phone. Pass `href="tel:…"` to make it callable. */
function ValuePhone({ href, className, ...props }: React.ComponentProps<"a">) {
  const Comp = href ? "a" : "span"
  return (
    <Comp
      data-slot="value-phone"
      href={href}
      className={cn(text, "text-(color:--value-slot-text) tabular-nums", href && "hover:underline focus-visible:underline outline-none", className)}
      {...props}
    />
  )
}

/** Cell Type = Link. Emails and URLs. Use `asChild` for a Next.js <Link>. */
function ValueLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a"
  return (
    <Comp
      data-slot="value-link"
      className={cn(
        text,
        "rounded-[2px] text-(color:--value-slot-link) underline underline-offset-auto outline-none hover:text-(color:--value-slot-strong) focus-visible:shadow-[0_0_0_2px_var(--focus-ring)]",
        className
      )}
      {...props}
    />
  )
}

/** Cell Type = Date. Date on the first line, optional time below. */
function ValueDate({
  date,
  time,
  dateTime,
  className,
  ...props
}: Omit<React.ComponentProps<"time">, "children"> & {
  /** Formatted date, e.g. "13 Aug, 2026". */
  date: React.ReactNode
  /** Formatted time, e.g. "23:04". */
  time?: React.ReactNode
}) {
  return (
    <time data-slot="value-date" dateTime={dateTime} className={cn("flex min-w-0 flex-col", className)} {...props}>
      <span className={cn(text, "text-(color:--value-slot-text)")}>{date}</span>
      {time !== undefined && (
        <span className="block truncate text-xs leading-normal text-(color:--value-slot-secondary)">{time}</span>
      )}
    </time>
  )
}

/** Cell Type = Exchange. Logo (24px) and name. */
function ValueExchange({
  logo,
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & {
  /** 24×24 logo, e.g. an <img> or inline SVG. Decorative; the name is the accessible text. */
  logo?: React.ReactNode
}) {
  return (
    <span data-slot="value-exchange" className={cn("flex min-w-0 items-center gap-2", className)} {...props}>
      {logo && (
        <span aria-hidden="true" className="inline-flex size-6 shrink-0 items-center justify-center overflow-hidden [&>img]:size-full [&>svg]:size-full">
          {logo}
        </span>
      )}
      <span className={cn(text, "font-medium text-(color:--value-slot-strong)")}>{children}</span>
    </span>
  )
}

export { ValueText, ValueMono, ValueNumber, ValuePhone, ValueLink, ValueDate, ValueExchange }
