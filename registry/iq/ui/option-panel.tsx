"use client"

import * as React from "react"
import { Command } from "cmdk"
import { Checkmark, ErrorFilled, Search, SearchLocateMirror } from "@carbon/icons-react"

import { cn } from "@/lib/utils"
import { CheckboxMark } from "@/registry/iq/ui/checkbox"

// Figma: IQ Capital CRM Design System → Option Panel (527:29045) and _Option Panel / Item (338:17523).
// Item: Type Option | Label × Tone Neutral | Warning | Danger × Size Small | Medium × State Default | Hover | Disabled
//       × Selection None | Checkmark | Checkbox × Selected. Panel: Results | Empty | Error (+ Loading, not drawn in Figma), optional Search.
// Built on cmdk: wrap these parts in <OptionPanel> (a cmdk Command) for filtering and arrow-key navigation.

type OptionSize = "sm" | "md"
type OptionTone = "neutral" | "warning" | "danger"
type OptionSelection = "none" | "checkmark" | "checkbox"

const panelClass =
  "relative flex flex-col gap-(--option-panel-gap) rounded-(--option-panel-radius) border border-(--option-panel-border) bg-(--option-panel-bg) p-(--option-panel-padding) backdrop-blur-(--option-panel-blur) outline-none"

/** The panel container: a cmdk Command with the Figma surface. */
function OptionPanel({ className, ...props }: React.ComponentProps<typeof Command>) {
  return <Command data-slot="option-panel" loop className={cn(panelClass, className)} {...props} />
}

/** Search Bar at the top of the panel. */
function OptionPanelSearch({ className, ...props }: React.ComponentProps<typeof Command.Input>) {
  return (
    <div className="flex h-8 shrink-0 items-center overflow-hidden rounded-(--option-panel-radius) border border-(--option-panel-border) bg-(--option-panel-bg)">
      <span className="flex size-8 shrink-0 items-center justify-center text-white/80">
        <Search size={16} aria-hidden="true" />
      </span>
      <Command.Input
        data-slot="option-panel-search"
        className={cn(
          "h-full min-w-0 flex-1 bg-transparent pr-3 text-sm leading-[21px] text-(color:--content-default) outline-none placeholder:text-(color:--content-muted)",
          className
        )}
        {...props}
      />
    </div>
  )
}

function OptionPanelList({ className, ...props }: React.ComponentProps<typeof Command.List>) {
  return (
    <Command.List
      data-slot="option-panel-list"
      className={cn(
        "max-h-72 overflow-y-auto [scrollbar-color:var(--border-grid)_transparent] [scrollbar-width:thin] [&_[cmdk-list-sizer]]:flex [&_[cmdk-list-sizer]]:flex-col [&_[cmdk-list-sizer]]:gap-(--option-item-gap)",
        className
      )}
      {...props}
    />
  )
}

const labelSize: Record<OptionSize, string> = {
  sm: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:text-xs",
  md: "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-sm",
}

/** A group of options with its Label item (Geist Mono, uppercase, 50%). */
function OptionGroup({ size = "sm", className, ...props }: React.ComponentProps<typeof Command.Group> & { size?: OptionSize }) {
  return (
    <Command.Group
      data-slot="option-group"
      className={cn(
        "[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:leading-normal [&_[cmdk-group-heading]]:text-(color:--option-item-label) [&_[cmdk-group-heading]]:uppercase",
        "[&_[cmdk-group-items]]:flex [&_[cmdk-group-items]]:flex-col [&_[cmdk-group-items]]:gap-(--option-item-gap) [&_[cmdk-group-heading]+[cmdk-group-items]]:mt-(--option-item-gap)",
        labelSize[size],
        className
      )}
      {...props}
    />
  )
}

/** Wraps the part of `text` that matches `query` in the yellow match highlight. */
function Highlight({ text, query }: { text: string; query?: string }) {
  const q = query?.trim()
  if (!q) return <>{text}</>
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-(--option-item-match-highlight) px-0.5 font-medium text-(color:--option-item-match-content)">
        {text.slice(i, i + q.length)}
      </mark>
      {text.slice(i + q.length)}
    </>
  )
}

const toneText: Record<OptionTone, string> = {
  neutral: "text-(color:--option-item-content)",
  warning: "text-(color:--option-item-warning)/90",
  danger: "text-(color:--option-item-danger)/90",
}
const toneHover: Record<OptionTone, string> = {
  neutral: "data-[selected=true]:bg-(--option-item-bg-hover) data-[visual=hover]:bg-(--option-item-bg-hover)",
  warning: "data-[selected=true]:bg-(--option-item-bg-hover-warning) data-[visual=hover]:bg-(--option-item-bg-hover-warning)",
  danger: "data-[selected=true]:bg-(--option-item-bg-hover-danger) data-[visual=hover]:bg-(--option-item-bg-hover-danger)",
}

type OptionItemProps = Omit<React.ComponentProps<typeof Command.Item>, "children"> & {
  size?: OptionSize
  tone?: OptionTone
  selection?: OptionSelection
  /** The option is chosen (Figma Selected). */
  checked?: boolean
  /** Leading 16px icon. */
  icon?: React.ReactNode
  label: string
  /** Secondary text at 60%, e.g. an email next to a name. */
  secondary?: React.ReactNode
  /** Highlights this substring of the label. */
  query?: string
  /** Force the hover look for documentation matrices. */
  visualState?: "hover"
}

/** _Option Panel / Item, Type=Option. */
function OptionItem({
  size = "sm",
  tone = "neutral",
  selection = "none",
  checked = false,
  icon,
  label,
  secondary,
  query,
  visualState,
  disabled,
  className,
  ...props
}: OptionItemProps) {
  return (
    <Command.Item
      data-slot="option-item"
      data-checked={checked || undefined}
      data-visual={visualState}
      disabled={disabled}
      value={props.value ?? label}
      className={cn(
        "group/option flex cursor-pointer items-center gap-2 rounded-(--option-panel-radius) leading-normal outline-none select-none",
        size === "sm" ? "p-2 text-sm leading-normal" : "px-3 py-2 text-base leading-normal",
        "[&_svg]:shrink-0",
        toneText[tone],
        toneHover[tone],
        // Selected: 10% fill, medium weight, white (tone color drops).
        "data-checked:bg-(--option-item-bg-selected) data-checked:font-medium data-checked:text-(color:--content-default)",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:text-(color:--content-disabled)",
        className
      )}
      {...props}
    >
      {selection === "checkmark" && (
        <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
          {checked && <Checkmark size={16} />}
        </span>
      )}
      {selection === "checkbox" && (
        <CheckboxMark
          size={16}
          checked={checked}
          disabled={disabled}
          // Highlighted row (hover / arrow keys) or pressed: 64% border, like Checkbox hover.
          className={cn(
            !disabled &&
              "group-data-[selected=true]/option:border-(--checkbox-border-hover) group-data-[visual=hover]/option:border-(--checkbox-border-hover) group-active/option:border-(--checkbox-border-hover)"
          )}
        />
      )}
      {icon && <span className="flex size-4 shrink-0 items-center justify-center [&_svg]:size-4">{icon}</span>}
      <span className="shrink-0 whitespace-nowrap">
        <Highlight text={label} query={query} />
      </span>
      {secondary && (
        <span className={cn("min-w-0 truncate", disabled ? "" : "text-(color:--option-item-secondary)")}>{secondary}</span>
      )}
    </Command.Item>
  )
}

type OptionPanelStatusProps = {
  status: "empty" | "loading" | "error"
  /** Empty: the search text that found nothing. */
  query?: string
  /** Error: retry handler; shows "Try again" as a button. */
  onRetry?: () => void
  labels?: { empty?: string; loading?: string; error?: string; retry?: string }
}

/** Empty, Loading and Error bodies. Render Empty inside <Command.Empty> so cmdk shows it when nothing matches. */
function OptionPanelStatus({ status, query, onRetry, labels }: OptionPanelStatusProps) {
  return (
    <div
      role={status === "error" ? "alert" : "status"}
      className="flex flex-col items-center justify-center gap-2 p-2 text-center text-sm leading-normal"
    >
      {status === "empty" && <SearchLocateMirror size={24} aria-hidden="true" className="text-white/80" />}
      {status === "loading" && (
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 animate-spin text-white/80 [animation-direction:reverse] motion-reduce:animate-none">
          <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          <path d="M8 1.5a6.5 6.5 0 0 1 6.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
      {status === "error" && <ErrorFilled size={16} aria-hidden="true" className="text-(color:--danger)" />}
      <div className="flex flex-col items-center">
        <p className="text-(color:--content-muted)">
          {status === "empty"
            ? (labels?.empty ?? "No Results for")
            : status === "loading"
              ? (labels?.loading ?? "Loading options…")
              : (labels?.error ?? "Unable to load options")}
        </p>
        {status === "empty" && query && <p className="text-white/90">”{query}”</p>}
        {status === "error" &&
          (onRetry ? (
            <button type="button" onClick={onRetry} className="cursor-pointer rounded-[2px] text-white/90 outline-none hover:text-(color:--content-default) focus-visible:ring-2 focus-visible:ring-(--focus-ring)">
              {labels?.retry ?? "Try again"}
            </button>
          ) : (
            <p className="text-white/90">{labels?.retry ?? "Try again"}</p>
          ))}
      </div>
    </div>
  )
}

export { OptionPanel, OptionPanelSearch, OptionPanelList, OptionGroup, OptionItem, OptionPanelStatus, Highlight, panelClass as optionPanelClass }
export type { OptionItemProps, OptionSize, OptionTone, OptionSelection, OptionPanelStatusProps }
