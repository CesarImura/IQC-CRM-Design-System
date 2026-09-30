import * as React from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Breadcrumb (711:2334), _Breadcrumb / Item (706:2318),
// _Breadcrumb / Overflow (708:2370), which opens an Option Panel (1240:2918).

// Shared 40px hit area. The focus stroke is inset so focusing never shifts the layout.
const control =
  "inline-flex items-center rounded-(--breadcrumb-radius-control) p-(--breadcrumb-hit-padding) outline-none transition-colors duration-100 focus-visible:bg-(--breadcrumb-surface-focus) focus-visible:text-(color:--breadcrumb-text-link-hover) focus-visible:shadow-[inset_0_0_0_1px_var(--focus-stroke-on-fill),0_0_0_var(--focus-spread)_var(--focus-ring)]"

function Breadcrumb({ "aria-label": ariaLabel = "Breadcrumb", ...props }: React.ComponentProps<"nav">) {
  return <nav data-slot="breadcrumb" aria-label={ariaLabel} {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center text-(length:--font-size-md) leading-(--line-height-md) font-normal break-words",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="breadcrumb-item" className={cn("inline-flex min-w-0 items-center", className)} {...props} />
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  /** Render the child element (e.g. a Next.js `<Link>`) with link styles. */
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        control,
        "block max-w-[calc(var(--breadcrumb-item-max-width)+2*var(--breadcrumb-hit-padding))] truncate",
        "text-(color:--breadcrumb-text-link-default) hover:text-(color:--breadcrumb-text-link-hover)",
        "active:bg-(--breadcrumb-surface-pressed) active:text-(color:--breadcrumb-text-link-hover)",
        className
      )}
      {...props}
    />
  )
}

/** The current page. Not a link; exposed to assistive tech with aria-current="page". */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn(
        "block max-w-[calc(var(--breadcrumb-item-max-width)+2*var(--breadcrumb-hit-padding))] truncate p-(--breadcrumb-hit-padding) text-(color:--breadcrumb-text-current)",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("ms-(--breadcrumb-item-gap) text-(color:--breadcrumb-text-separator) select-none", className)}
      {...props}
    >
      {children ?? "/"}
    </li>
  )
}

/**
 * Collapsed ancestors. Renders the "…" trigger and an Option Panel menu.
 * Pass `BreadcrumbOverflowItem`s as children.
 */
function BreadcrumbOverflow({
  children,
  label = "Show hidden breadcrumbs",
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenu.Root> & {
  /** Accessible name for the trigger. */
  label?: string
  className?: string
}) {
  return (
    <DropdownMenu.Root {...props}>
      <DropdownMenu.Trigger
        data-slot="breadcrumb-overflow"
        aria-label={label}
        className={cn(
          control,
          "cursor-pointer text-(color:--breadcrumb-text-link-default)",
          "hover:text-(color:--breadcrumb-text-link-hover) hover:underline",
          "active:bg-(--breadcrumb-surface-open) active:text-(color:--breadcrumb-text-link-hover) active:underline",
          "data-[state=open]:bg-(--breadcrumb-surface-open)",
          className
        )}
      >
        <span aria-hidden="true">…</span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          data-slot="breadcrumb-overflow-content"
          align="start"
          sideOffset={8}
          className={cn(
            "z-50 flex max-h-(--radix-dropdown-menu-content-available-height) w-(--option-panel-width) flex-col gap-1 overflow-y-auto",
            "rounded-(--option-panel-radius) border border-(--option-panel-border) bg-(--option-panel-bg) p-(--option-panel-padding) backdrop-blur-[100px]",
            "text-(length:--font-size-sm) leading-(--line-height-sm) text-(color:--option-item-content) outline-none"
          )}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

/** An ancestor inside the overflow menu. Use `asChild` with a link. */
function BreadcrumbOverflowItem({ className, ...props }: React.ComponentProps<typeof DropdownMenu.Item>) {
  return (
    <DropdownMenu.Item
      data-slot="breadcrumb-overflow-item"
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-(--option-panel-radius) p-2 outline-none select-none",
        "data-highlighted:bg-(--option-item-bg-hover) data-disabled:pointer-events-none data-disabled:text-(color:--content-disabled)",
        className
      )}
      {...props}
    />
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbOverflow,
  BreadcrumbOverflowItem,
}
