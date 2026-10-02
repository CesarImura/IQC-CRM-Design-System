"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Navigation page. _Side Menu / Link (132:2387): State Default | Hover | Active |
// Focus | Disabled. Side Menu (132:2513): Expanded True | False (320px with labels, 56px icon rail). Sub Menu (409:25476):
// secondary rail with a title and grouped text links. Top Menu (233:8612): 56px app bar with brand, breadcrumb and actions.

const SideMenuContext = React.createContext({ expanded: true })

type SideMenuProps = React.ComponentProps<"nav"> & {
  /** Expanded shows labels (320px); collapsed is the 56px icon rail. */
  expanded?: boolean
}

/** Side Menu: the primary rail. Stack SideMenuLink, SideMenuDivider and SideMenuSection inside. */
function SideMenu({ expanded = true, className, ...props }: SideMenuProps) {
  return (
    <SideMenuContext.Provider value={{ expanded }}>
      <nav
        data-slot="side-menu"
        data-expanded={expanded}
        className={cn(
          "flex h-full shrink-0 flex-col gap-(--nav-gap) overflow-y-auto border-r border-(--nav-border) bg-(--nav-surface) px-(--nav-padding-x) py-(--nav-padding-y) [scrollbar-width:none]",
          expanded ? "w-(--nav-width)" : "w-(--nav-width-collapsed) items-center",
          className
        )}
        {...props}
      />
    </SideMenuContext.Provider>
  )
}

/** A group of links, 4px apart. */
function SideMenuSection({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="side-menu-section" className={cn("flex flex-col gap-(--nav-section-gap)", className)} {...props} />
}

/** 1px rule at white 10% between sections. */
function SideMenuDivider({ className, ...props }: React.ComponentProps<"hr">) {
  return <hr data-slot="side-menu-divider" className={cn("w-full border-0 border-t border-(--nav-border)", className)} {...props} />
}

type SideMenuLinkProps = Omit<React.ComponentProps<"a">, "children"> & {
  label: string
  /** 24px leading icon. Required in the collapsed rail. */
  icon?: React.ReactNode
  /** The current page (Figma Active). */
  active?: boolean
  disabled?: boolean
  /** Force a state for documentation matrices. */
  visualState?: "hover" | "focus"
  /** Render a different element (e.g. a framework Link) with the same styles. */
  render?: (props: React.ComponentProps<"a"> & { "data-slot": string }) => React.ReactElement
}

const linkClass = cn(
  "flex h-(--nav-link-hit) min-w-0 shrink-0 cursor-pointer items-center gap-(--nav-link-gap) rounded-(--nav-link-radius) px-(--nav-link-px) py-(--nav-link-py) text-base leading-6 text-(color:--nav-link-content) outline-none transition-colors duration-100",
  "[&_svg]:size-(--nav-link-icon) [&_svg]:shrink-0",
  "hover:bg-(--nav-link-bg-hover) data-[visual=hover]:bg-(--nav-link-bg-hover)",
  "focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)] data-[visual=focus]:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
  "aria-[current=page]:bg-(--nav-link-bg-active) aria-[current=page]:font-medium aria-[current=page]:text-(color:--nav-link-content-active)",
  "aria-disabled:pointer-events-none aria-disabled:text-(color:--nav-link-content-disabled)"
)

/** _Side Menu / Link: a 44px row with a 24px icon and a 16px label. */
function SideMenuLink({ label, icon, active, disabled, visualState, render, className, ...props }: SideMenuLinkProps) {
  const { expanded } = React.useContext(SideMenuContext)
  const linkProps = {
    "data-slot": "side-menu-link",
    "data-visual": visualState,
    "aria-current": active ? ("page" as const) : undefined,
    "aria-disabled": disabled || undefined,
    "aria-label": expanded ? undefined : label,
    title: expanded ? undefined : label,
    tabIndex: disabled ? -1 : props.tabIndex,
    className: cn(linkClass, !expanded && "size-10 h-10 justify-center px-0", className),
    ...props,
    children: (
      <>
        {icon}
        {expanded && <span className="truncate">{label}</span>}
      </>
    ),
  }
  return render ? render(linkProps) : <a {...linkProps} />
}

type SubMenuProps = React.ComponentProps<"nav"> & {
  title: React.ReactNode
}

/** Sub Menu: the secondary rail with a title and SubMenuGroups of text links. */
function SubMenu({ title, className, children, ...props }: SubMenuProps) {
  return (
    <SideMenuContext.Provider value={{ expanded: true }}>
      <nav
        data-slot="sub-menu"
        className={cn("flex h-full w-(--nav-width) shrink-0 flex-col overflow-y-auto border-r border-(--nav-border) bg-(--nav-surface)", className)}
        {...props}
      >
        <p className="px-6 py-4 text-lg leading-[1.2] font-medium text-(color:--nav-title)">{title}</p>
        {children}
      </nav>
    </SideMenuContext.Provider>
  )
}

/** A Sub Menu group: Geist Mono label at 50%, then links (16px inset, no icons). */
function SubMenuGroup({ label, className, children, ...props }: React.ComponentProps<"div"> & { label?: React.ReactNode }) {
  return (
    <div data-slot="sub-menu-group" className={cn("flex flex-col border-t border-(--nav-border) pb-2", className)} {...props}>
      {label && <p className="px-6 pt-4 pb-2 font-mono text-sm leading-[21px] text-(color:--nav-section-label)">{label}</p>}
      <div className="flex flex-col gap-(--nav-section-gap) px-2 [&_[data-slot=side-menu-link]]:px-4">{children}</div>
    </div>
  )
}

type TopMenuProps = React.ComponentProps<"header"> & {
  /** Brand mark / logo. */
  brand?: React.ReactNode
  /** Usually a Breadcrumb. */
  trail?: React.ReactNode
  /** Right side: Search Bar and Secondary icon buttons. */
  actions?: React.ReactNode
}

/** Top Menu: the 56px app bar. */
function TopMenu({ brand, trail, actions, className, ...props }: TopMenuProps) {
  return (
    <header
      data-slot="top-menu"
      className={cn("flex h-(--top-menu-height) items-center justify-between gap-2 border-b border-(--nav-border) bg-(--nav-surface) p-2", className)}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-3">
        {brand}
        {trail}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  )
}

export { SideMenu, SideMenuSection, SideMenuDivider, SideMenuLink, SubMenu, SubMenuGroup, TopMenu }
export type { SideMenuProps, SideMenuLinkProps, SubMenuProps, TopMenuProps }
