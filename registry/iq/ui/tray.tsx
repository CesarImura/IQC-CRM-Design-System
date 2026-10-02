"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { CloseLarge, ShrinkScreen } from "@carbon/icons-react"

import { cn } from "@/lib/utils"
import { backdropClasses } from "@/registry/iq/ui/backdrop"
import { Button } from "@/registry/iq/ui/button"

// Figma: IQ Capital CRM Design System → Tray (333:6506), _Tray / Header (333:6505), _Tray / Section Title (333:6548),
// _Tray / Overlay (1562:21742: Backdrop Default + Soft). A right-docked detail panel: header (title, description,
// collapse / close, status, actions, tabs) and a scrolling body of sections. Built on Radix Dialog.

const panelClass =
  "flex h-full w-[min(var(--tray-width),100vw)] flex-col border-l border-(--tray-border) bg-(--tray-surface) pt-(--tray-padding-y) outline-none"

const InTrayContext = React.createContext(false)

const Tray = DialogPrimitive.Root
const TrayTrigger = DialogPrimitive.Trigger
const TrayClose = DialogPrimitive.Close

/** The docked panel with its backdrop. Put TrayHeader and TrayBody inside. */
function TrayContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        data-slot="tray-backdrop"
        className={cn(
          "fixed inset-0 z-50",
          backdropClasses("default", true),
          "data-[state=open]:animate-[overlay-in_var(--tray-motion-in)_ease-out] data-[state=closed]:animate-[overlay-out_var(--tray-motion-out)_ease-in_forwards] motion-reduce:animate-none"
        )}
      />
      <DialogPrimitive.Content
        data-slot="tray"
        className={cn(
          panelClass,
          "fixed inset-y-0 right-0 z-50",
          "data-[state=open]:animate-[tray-in_var(--tray-motion-in)_cubic-bezier(0.16,1,0.3,1)] data-[state=closed]:animate-[tray-out_var(--tray-motion-out)_ease-in_forwards] motion-reduce:animate-none",
          className
        )}
        {...props}
      >
        <InTrayContext.Provider value={true}>{children}</InTrayContext.Provider>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

/** The same panel without a dialog, for documentation and in-page layouts. */
function TrayPanel({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="tray-panel" className={cn(panelClass, className)} {...props} />
}

type TrayHeaderProps = Omit<React.ComponentProps<"div">, "title"> & {
  title: React.ReactNode
  /** Second line in Geist Mono at 50%, e.g. an email or ID. */
  description?: React.ReactNode
  /** Status Dots under the title. */
  status?: React.ReactNode
  /** Main actions: usually a Medium Primary Button and a Dropdown. */
  actions?: React.ReactNode
  /** Tabs / Line (with dividers top and bottom) at the foot of the header. */
  tabs?: React.ReactNode
  /** Adds the collapse button next to close. */
  onCollapse?: () => void
  /** Hide the close button. */
  closable?: boolean
  labels?: { close?: string; collapse?: string }
}

/** _Tray / Header: identity, status, actions and tabs. */
function TrayHeader({ title, description, status, actions, tabs, onCollapse, closable = true, labels, className, ...props }: TrayHeaderProps) {
  const inTray = React.useContext(InTrayContext)
  const Title = inTray ? DialogPrimitive.Title : "h2"
  const Description = inTray ? DialogPrimitive.Description : "p"
  return (
    <div data-slot="tray-header" className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="flex flex-col px-(--tray-padding-x)">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col gap-1">
            <Title className="truncate text-lg leading-[27px] font-medium text-(color:--tray-title)">{title}</Title>
            {description && <Description className="truncate font-mono text-sm leading-[21px] text-(color:--tray-description)">{description}</Description>}
          </div>
          <div className="-mt-1.5 -mr-1.5 flex shrink-0">
            {onCollapse && (
              <span className="flex size-11 items-center justify-center">
                <Button variant="ghost" size="icon-sm" aria-label={labels?.collapse ?? "Collapse"} onClick={onCollapse}>
                  <ShrinkScreen />
                </Button>
              </span>
            )}
            {closable && (
              <span className="flex size-11 items-center justify-center">
                {inTray ? (
                  <DialogPrimitive.Close asChild>
                    <Button variant="ghost" size="icon-sm" aria-label={labels?.close ?? "Close"}>
                      <CloseLarge />
                    </Button>
                  </DialogPrimitive.Close>
                ) : (
                  <Button variant="ghost" size="icon-sm" aria-label={labels?.close ?? "Close"} tabIndex={-1}>
                    <CloseLarge />
                  </Button>
                )}
              </span>
            )}
          </div>
        </div>
        {status && <div className="flex flex-wrap items-center gap-4 pt-2 pb-4">{status}</div>}
        {actions && <div className={cn("flex flex-wrap items-center gap-2", !status && "pt-4")}>{actions}</div>}
      </div>
      {tabs}
    </div>
  )
}

/** The scrolling body under the header: stack TraySections inside. */
function TrayBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tray-body"
      className={cn("flex min-h-0 flex-1 flex-col overflow-y-auto pb-(--tray-padding-y) [scrollbar-color:var(--border-grid)_transparent] [scrollbar-width:thin]", className)}
      {...props}
    />
  )
}

type TraySectionProps = Omit<React.ComponentProps<"section">, "title"> & {
  title: React.ReactNode
  /** Trailing actions in the section title (Dropdown, Small Button). */
  actions?: React.ReactNode
  /** Content padding: "inset" (16px sides, for Field Grid / Data Table, default) or "page" (24px sides). */
  inset?: "inset" | "page"
}

/** _Tray / Section Title + its content. */
function TraySection({ title, actions, inset = "inset", className, children, ...props }: TraySectionProps) {
  return (
    <section data-slot="tray-section" className={cn("flex flex-col", className)} {...props}>
      <div className="flex min-h-14 items-center justify-between gap-2 px-6 pt-4 pb-2">
        <h3 className="text-base leading-6 font-medium text-(color:--tray-title)">{title}</h3>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className={inset === "inset" ? "px-4 pb-4" : "px-6"}>{children}</div>
    </section>
  )
}

export { Tray, TrayTrigger, TrayClose, TrayContent, TrayPanel, TrayHeader, TrayBody, TraySection }
export type { TrayHeaderProps, TraySectionProps }
