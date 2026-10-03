"use client"

import * as React from "react"
import * as Popover from "@radix-ui/react-popover"
import { ChevronDown, Close, Search } from "@carbon/icons-react"

import { cn } from "@/lib/utils"
import { OptionItem, OptionPanel, OptionPanelList } from "@/registry/iq/ui/option-panel"

// Figma: IQ Capital CRM Design System → Search Bar (529:36926). Size Small | Medium × State Default | Focus | Error | Disabled | Active.
// Focus (teal ring) is keyboard focus; Active (neutral-500 border, white 12% ring) is editing: focused with the pointer, or typing.
// Icon, Dropdown (scope) and Show Clear are independent.

type SearchBarScope = {
  options: { value: string; label: string }[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Accessible name for the scope menu. */
  label?: string
}

type SearchBarProps = Omit<React.ComponentProps<"input">, "size" | "onChange" | "value" | "defaultValue"> & {
  size?: "sm" | "md"
  error?: boolean
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Search icon on the left. */
  icon?: boolean
  /** Clear (×) button while there's text. */
  clearable?: boolean
  /** Scope dropdown before the input, e.g. "Contacts / Deals / Companies". */
  scope?: SearchBarScope
  /** Force Focus or Active for documentation matrices. */
  visualState?: "focus" | "active"
  frameClassName?: string
}

/** Search Bar: icon, optional scope, input and clear in one 32px (Small) or 40px (Medium) frame. */
function SearchBar({
  size = "sm",
  error = false,
  disabled,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  icon = true,
  clearable = true,
  scope,
  visualState,
  placeholder = "Search",
  className,
  frameClassName,
  ...props
}: SearchBarProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [inner, setInner] = React.useState(defaultValue)
  const value = valueProp ?? inner
  const setValue = (v: string) => {
    if (valueProp === undefined) setInner(v)
    onValueChange?.(v)
  }

  const [scopeInner, setScopeInner] = React.useState(scope?.defaultValue ?? scope?.options[0]?.value)
  const scopeValue = scope?.value ?? scopeInner
  const [scopeOpen, setScopeOpen] = React.useState(false)
  const md = size === "md"
  const pointerRef = React.useRef(false)
  const [interactionState, setInteraction] = React.useState<"focus" | "active" | null>(null)
  const interaction = error || disabled ? undefined : (visualState ?? interactionState ?? undefined)

  return (
    <div
      data-slot="search-bar"
      data-size={size}
      data-status={error ? "error" : undefined}
      data-disabled={disabled || undefined}
      data-interaction={interaction}
      className={cn(
        "group/search flex w-full min-w-0 items-stretch rounded-(--button-radius-control) border",
        md ? "h-(--button-size-md-height)" : "h-(--button-size-sm-height)",
        "border-(--button-secondary-border-default) bg-(--button-secondary-bg-default)",
        // Focus (keyboard): no fill, teal ring
        "data-[interaction=focus]:bg-(--form-field-surface-transparent) data-[interaction=focus]:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
        // Active (editing): 2% fill, neutral-500 border, white 12% ring
        "data-[interaction=active]:border-(--input-border-hover) data-[interaction=active]:bg-(--input-bg-active) data-[interaction=active]:shadow-[0_0_0_var(--focus-spread)_var(--input-ring-active)]",
        // Error: 2px red border, red ring
        "data-[status=error]:border-(length:--search-bar-error-border-width) data-[status=error]:border-(--form-field-error-border) data-[status=error]:bg-(--form-field-surface-transparent) data-[status=error]:shadow-[0_0_0_var(--focus-spread)_var(--focus-danger)]",
        // Disabled
        "data-disabled:pointer-events-none data-disabled:border-(--search-bar-border-disabled) data-disabled:shadow-none",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        frameClassName
      )}
      onPointerDownCapture={() => {
        pointerRef.current = true
      }}
      onFocus={() => {
        const viaPointer = pointerRef.current
        pointerRef.current = false
        setInteraction((current) => (viaPointer ? "active" : (current ?? "focus")))
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null) && !scopeOpen) setInteraction(null)
      }}
      onKeyDown={(event) => {
        const navigation = ["Tab", "Shift", "Escape", "Meta", "Control", "Alt", "CapsLock", "ArrowUp", "ArrowDown", "Enter"]
        if (interactionState === "focus" && event.target === inputRef.current && !navigation.includes(event.key)) setInteraction("active")
      }}
      onMouseDown={(event) => {
        if ((event.target as HTMLElement).closest("button, input")) return
        event.preventDefault()
        inputRef.current?.focus()
      }}
    >
      {icon && (
        <span className={cn("flex items-center px-(--search-bar-cell-px)", disabled ? "text-(color:--content-disabled)" : "text-white/80")}>
          <Search aria-hidden="true" />
        </span>
      )}

      {scope && (
        <Popover.Root open={scopeOpen} onOpenChange={setScopeOpen}>
          <Popover.Trigger
            disabled={disabled}
            aria-label={scope.label ?? "Search in"}
            className={cn(
              "flex shrink-0 cursor-pointer items-center gap-(--button-spacing-gap) border-x border-(--button-secondary-border-default) font-medium whitespace-nowrap outline-none",
              md ? "px-(--button-size-md-padding-x) text-base leading-6" : "px-(--button-size-sm-padding-x) text-sm leading-[21px]",
              disabled ? "text-(color:--content-disabled)" : "text-white/70 hover:text-white/90 data-[state=open]:text-white/90"
            )}
          >
            {scope.options.find((o) => o.value === scopeValue)?.label}
            <ChevronDown aria-hidden="true" />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content align="start" sideOffset={8} className="z-50 w-56 outline-none">
              <OptionPanel label={scope.label ?? "Search in"}>
                <OptionPanelList>
                  {scope.options.map((o) => (
                    <OptionItem
                      key={o.value}
                      value={o.value}
                      label={o.label}
                      selection="checkmark"
                      checked={o.value === scopeValue}
                      onSelect={() => {
                        if (scope.value === undefined) setScopeInner(o.value)
                        scope.onValueChange?.(o.value)
                        setScopeOpen(false)
                        inputRef.current?.focus()
                      }}
                    />
                  ))}
                </OptionPanelList>
              </OptionPanel>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )}

      <input
        ref={inputRef}
        type="search"
        data-slot="search-bar-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && value) {
            e.preventDefault()
            setValue("")
          }
        }}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={error || undefined}
        className={cn(
          "h-full min-w-0 flex-1 bg-transparent px-(--input-px) text-(color:--input-text) outline-none [&::-webkit-search-cancel-button]:hidden group-data-[interaction=active]/search:text-(color:--input-text-active) disabled:text-(color:--content-disabled)",
          md ? "text-base leading-6" : "text-sm leading-[21px]",
          "placeholder:text-(color:--input-placeholder) disabled:placeholder:text-(color:--content-disabled)",
          className
        )}
        {...props}
      />

      {clearable && value && !disabled && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setValue("")
            inputRef.current?.focus()
          }}
          className="flex cursor-pointer items-center px-(--search-bar-cell-px) text-(color:--content-muted) outline-none hover:text-(color:--content-default) focus-visible:text-(color:--content-default)"
        >
          <Close aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export { SearchBar }
export type { SearchBarProps, SearchBarScope }
