"use client"

import * as React from "react"
import * as Popover from "@radix-ui/react-popover"
import { Command } from "cmdk"
import { ChevronDown, Search } from "@carbon/icons-react"

import { cn } from "@/lib/utils"
import {
  OptionGroup,
  OptionItem,
  OptionPanelList,
  OptionPanelSearch,
  OptionPanelStatus,
  optionPanelClass,
  type OptionTone,
} from "@/registry/iq/ui/option-panel"

// Figma: IQ Capital CRM Design System → Combo Box → Combo Box / Select (1542:24942) and
// Combo Box / Autocomplete (1542:4716): State Default | Focus | Error | Disabled × Open × Hover × Size Small | Medium.
// Parts: _Label Block, Trigger (341:17619), Option Panel (527:29045).

type ComboboxSize = "sm" | "md"

type ComboboxOption = {
  value: string
  label: string
  secondary?: React.ReactNode
  /** Group heading (Figma Label item). */
  group?: string
  tone?: OptionTone
  icon?: React.ReactNode
  disabled?: boolean
}

type VisualState = "hover" | "focus"

// Figma "Error Icon" (filled circle with a slash), same path as Form Field.
function ErrorIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="text-(color:--button-danger-content-default)">
      <path d="M7.99999 0.999988C7.07914 0.994279 6.16632 1.17144 5.31446 1.5212C4.46261 1.87096 3.68866 2.38636 3.03751 3.03751C2.38636 3.68866 1.87096 4.46261 1.5212 5.31446C1.17144 6.16632 0.994279 7.07914 0.999988 7.99999C0.994279 8.92084 1.17144 9.83365 1.5212 10.6855C1.87096 11.5374 2.38636 12.3113 3.03751 12.9625C3.68866 13.6136 4.46261 14.129 5.31446 14.4788C6.16632 14.8285 7.07914 15.0057 7.99999 15C8.92084 15.0057 9.83365 14.8285 10.6855 14.4788C11.5374 14.129 12.3113 13.6136 12.9625 12.9625C13.6136 12.3113 14.129 11.5374 14.4788 10.6855C14.8285 9.83365 15.0057 8.92084 15 7.99999C15.0057 7.07914 14.8285 6.16632 14.4788 5.31446C14.129 4.46261 13.6136 3.68866 12.9625 3.03751C12.3113 2.38636 11.5374 1.87096 10.6855 1.5212C9.83365 1.17144 8.92084 0.994279 7.99999 0.999988ZM10.7224 11.5L4.49999 5.27784L5.27784 4.49999L11.5 10.7224L10.7224 11.5Z" />
    </svg>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Trigger surface (Figma Trigger)
 * -----------------------------------------------------------------------------------------------*/

const triggerSize: Record<ComboboxSize, string> = {
  sm: "h-(--button-size-sm-height) px-(--button-size-sm-padding-x) text-sm leading-[21px]",
  md: "h-(--button-size-md-height) px-(--button-size-md-padding-x) text-base leading-6",
}

function triggerClasses(size: ComboboxSize, error: boolean) {
  return cn(
    "group/trigger flex w-full min-w-0 items-center gap-(--button-spacing-gap) rounded-(--button-radius-control) border font-medium backdrop-blur-(--combobox-blur) outline-none",
    "[&_svg]:size-4 [&_svg]:shrink-0",
    triggerSize[size],
    error
      ? // Error: no fill, red border, red 3px ring, red text.
        "border-(--form-field-error-border) bg-(--button-secondary-bg-disabled) text-(color:--button-danger-content-default) shadow-[0_0_0_var(--focus-spread)_var(--focus-danger)]"
      : cn(
          "border-(--button-secondary-border-default) bg-(--button-secondary-bg-default) text-(color:--button-neutral-content-default)",
          // Hover
          "hover:border-(--button-secondary-border-active) data-[visual=hover]:border-(--button-secondary-border-active)",
          // Open (Figma Active), and Open + Hover
          "data-[open=true]:border-(--button-secondary-border-active) data-[open=true]:bg-(--button-secondary-bg-hover)",
          "data-[open=true]:hover:bg-(--button-secondary-bg-pressed) data-[open=true]:data-[visual=hover]:bg-(--button-secondary-bg-pressed)",
          // Focus (keyboard)
          "focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)] data-[visual=focus]:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]"
        ),
    "data-[disabled=true]:pointer-events-none data-[disabled=true]:border-(--button-secondary-border-disabled) data-[disabled=true]:bg-(--button-secondary-bg-disabled) data-[disabled=true]:text-(color:--button-neutral-content-disabled) data-[disabled=true]:shadow-none"
  )
}

function ComboboxLabel({
  size,
  disabled,
  htmlFor,
  onClick,
  children,
}: {
  size: ComboboxSize
  disabled?: boolean
  htmlFor?: string
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <label
      htmlFor={htmlFor}
      onClick={onClick}
      className={cn(
        "font-medium",
        size === "sm" ? "text-sm leading-[21px]" : "text-base leading-6",
        disabled ? "text-(color:--content-disabled)" : "text-(color:--combobox-label)"
      )}
    >
      {children}
    </label>
  )
}

function groupOptions(options: ComboboxOption[]) {
  const groups = new Map<string | undefined, ComboboxOption[]>()
  for (const o of options) groups.set(o.group, [...(groups.get(o.group) ?? []), o])
  return [...groups.entries()]
}

type PanelProps = {
  options: ComboboxOption[]
  isChecked: (value: string) => boolean
  onSelect: (value: string) => void
  selection: "checkmark" | "checkbox" | "none"
  search?: boolean
  searchPlaceholder?: string
  query?: string
  status: "ready" | "loading" | "error"
  onRetry?: () => void
}

function PanelBody({ options, isChecked, onSelect, selection, status, onRetry, query }: Omit<PanelProps, "search" | "searchPlaceholder">) {
  if (status !== "ready") return <OptionPanelStatus status={status} onRetry={onRetry} />
  return (
    <OptionPanelList>
      <Command.Empty>
        <OptionPanelStatus status="empty" query={query} />
      </Command.Empty>
      {groupOptions(options).map(([group, items]) => {
        const rendered = items.map((o) => (
          <OptionItem
            key={o.value}
            value={o.value}
            keywords={[o.label]}
            label={o.label}
            secondary={o.secondary}
            icon={o.icon}
            tone={o.tone}
            disabled={o.disabled}
            selection={selection}
            checked={isChecked(o.value)}
            query={query}
            onSelect={() => onSelect(o.value)}
          />
        ))
        return group ? (
          <OptionGroup key={group} heading={group}>
            {rendered}
          </OptionGroup>
        ) : (
          <React.Fragment key="_">{rendered}</React.Fragment>
        )
      })}
    </OptionPanelList>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Select
 * -----------------------------------------------------------------------------------------------*/

type SelectBaseProps = {
  label?: React.ReactNode
  size?: ComboboxSize
  options: ComboboxOption[]
  placeholder?: string
  /** Search bar at the top of the panel. */
  search?: boolean
  searchPlaceholder?: string
  error?: boolean
  disabled?: boolean
  /** Leading 16px icon in the trigger. */
  icon?: React.ReactNode
  status?: "ready" | "loading" | "error"
  onRetry?: () => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Documentation only: force Hover or Focus, and draw the panel in place instead of a popover. */
  visualState?: VisualState
  inlinePanel?: boolean
  className?: string
  id?: string
  name?: string
}

type SelectSingleProps = SelectBaseProps & {
  multiple?: false
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string) => void
}

type SelectMultipleProps = SelectBaseProps & {
  multiple: true
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

type SelectProps = SelectSingleProps | SelectMultipleProps

function useControllable<T>(value: T | undefined, defaultValue: T, onChange?: (v: T) => void) {
  const [inner, setInner] = React.useState(defaultValue)
  const controlled = value !== undefined
  const current = controlled ? value : inner
  const set = React.useCallback(
    (v: T) => {
      if (!controlled) setInner(v)
      onChange?.(v)
    },
    [controlled, onChange]
  )
  return [current, set] as const
}

/** Combo Box / Select: a trigger that opens the Option Panel. Checkmarks for one value, checkboxes for many. */
function Select(props: SelectProps) {
  const {
    label,
    size = "sm",
    options,
    placeholder = "Select…",
    search = true,
    searchPlaceholder = "Search",
    error = false,
    disabled = false,
    icon,
    status = "ready",
    onRetry,
    visualState,
    inlinePanel,
    className,
    name,
  } = props
  const autoId = React.useId()
  const id = props.id ?? autoId
  const [open, setOpen] = useControllable(props.open, props.defaultOpen ?? false, props.onOpenChange)
  const [single, setSingle] = useControllable<string | null>(
    props.multiple ? undefined : props.value,
    props.multiple ? null : (props.defaultValue ?? null),
    props.multiple ? undefined : (props.onValueChange as ((v: string | null) => void) | undefined)
  )
  const [many, setMany] = useControllable<string[]>(
    props.multiple ? props.value : undefined,
    props.multiple ? (props.defaultValue ?? []) : [],
    props.multiple ? props.onValueChange : undefined
  )
  const [query, setQuery] = React.useState("")

  const chosen = props.multiple ? options.filter((o) => many.includes(o.value)) : options.filter((o) => o.value === single)
  const display =
    chosen.length === 0 ? null : chosen.length === 1 ? chosen[0].label : `${chosen[0].label} +${chosen.length - 1}`

  function select(value: string) {
    if (props.multiple) {
      setMany(many.includes(value) ? many.filter((v) => v !== value) : [...many, value])
    } else {
      setSingle(value)
      setOpen(false)
    }
  }

  const trigger = (
    <>
      {icon && <span className="flex [&_svg]:size-4">{icon}</span>}
      <span
        className={cn(
          "min-w-0 flex-1 truncate text-left",
          !error && (open ? "text-(color:--combobox-value-active)" : "text-(color:--combobox-value)"),
          error && (open ? "opacity-80" : "opacity-70"),
          disabled && "text-(color:--button-neutral-content-disabled) opacity-100"
        )}
      >
        {display ?? placeholder}
      </span>
      {error && !disabled && <ErrorIcon />}
      <ChevronDown aria-hidden="true" className={cn(!disabled && "text-white")} />
    </>
  )

  const panel = (
    <Command
      loop
      label={typeof label === "string" ? `${label} options` : "Options"}
      className={cn(optionPanelClass, "w-full")}
      filter={(value, q, keywords) => ((keywords?.join(" ") ?? value).toLowerCase().includes(q.toLowerCase()) ? 1 : 0)}
    >
      {search && <OptionPanelSearch placeholder={searchPlaceholder} value={query} onValueChange={setQuery} autoFocus={!inlinePanel} />}
      <PanelBody
        options={options}
        isChecked={(v) => (props.multiple ? many.includes(v) : single === v)}
        onSelect={select}
        selection={props.multiple ? "checkbox" : "checkmark"}
        status={status}
        onRetry={onRetry}
        query={query}
      />
    </Command>
  )

  const triggerProps = {
    id,
    "data-open": open,
    "data-disabled": disabled,
    "data-visual": visualState,
    "aria-invalid": error || undefined,
    disabled,
    className: triggerClasses(size, error),
  }

  return (
    <div data-slot="combobox-select" data-size={size} className={cn("flex w-full flex-col gap-(--combobox-label-gap)", className)}>
      {label && (
        <ComboboxLabel size={size} disabled={disabled} htmlFor={id}>
          {label}
        </ComboboxLabel>
      )}
      {inlinePanel ? (
        <div className="flex flex-col gap-(--combobox-panel-offset)">
          <button type="button" {...triggerProps} tabIndex={-1}>
            {trigger}
          </button>
          {open && panel}
        </div>
      ) : (
        <Popover.Root open={open} onOpenChange={(o) => { setOpen(o); if (!o) setQuery("") }}>
          <Popover.Trigger {...triggerProps} aria-haspopup="listbox">
            {trigger}
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              align="start"
              sideOffset={8}
              className="z-50 w-(--radix-popper-anchor-width) min-w-56 outline-none"
            >
              {panel}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )}
      {name && <input type="hidden" name={name} value={props.multiple ? many.join(",") : (single ?? "")} />}
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Autocomplete
 * -----------------------------------------------------------------------------------------------*/

type AutocompleteProps = {
  label?: React.ReactNode
  size?: ComboboxSize
  options: ComboboxOption[]
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Called when a suggestion is picked. */
  onSelectOption?: (option: ComboboxOption) => void
  error?: boolean
  disabled?: boolean
  /** Leading 16px icon. Defaults to Search. */
  icon?: React.ReactNode
  status?: "ready" | "loading" | "error"
  onRetry?: () => void
  /** Documentation only. */
  visualState?: VisualState
  open?: boolean
  inlinePanel?: boolean
  className?: string
  name?: string
}

/** Combo Box / Autocomplete: a text field that suggests matching options as you type. */
function Autocomplete({
  label,
  size = "sm",
  options,
  placeholder = "Type to search",
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onSelectOption,
  error = false,
  disabled = false,
  icon = <Search />,
  status = "ready",
  onRetry,
  visualState,
  open: openProp,
  inlinePanel,
  className,
  name,
}: AutocompleteProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange)
  const [openState, setOpen] = React.useState(false)
  const matches = options.filter((o) => o.label.toLowerCase().includes(value.trim().toLowerCase()))
  const open = openProp ?? (openState && value.trim().length > 0 && (matches.length > 0 || status !== "ready"))

  function pick(v: string) {
    const option = options.find((o) => o.value === v)
    if (!option) return
    setValue(option.label)
    onSelectOption?.(option)
    setOpen(false)
  }

  const body = (
    <PanelBody
      options={matches}
      isChecked={() => false}
      onSelect={pick}
      selection="none"
      status={status}
      onRetry={onRetry}
      query={value}
    />
  )

  const frame = (
    <div
      data-open={open}
      data-disabled={disabled}
      data-visual={visualState}
      className={cn(
        triggerClasses(size, error),
        "cursor-text",
        !error && "has-[input:focus-visible]:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]"
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {icon && <span className="flex [&_svg]:size-4">{icon}</span>}
      <Command.Input
        ref={inputRef}
        value={value}
        onValueChange={(v) => {
          setValue(v)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false)
        }}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={error || undefined}
        className={cn(
          "h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-white/50",
          !error && (open ? "text-(color:--combobox-value-active)" : "text-(color:--combobox-value)"),
          disabled && "text-(color:--button-neutral-content-disabled) placeholder:text-(color:--button-neutral-content-disabled)"
        )}
      />
      {error && !disabled && <ErrorIcon />}
    </div>
  )

  return (
    <div data-slot="combobox-autocomplete" data-size={size} className={cn("flex w-full flex-col gap-(--combobox-label-gap)", className)}>
      {label && (
        <ComboboxLabel size={size} disabled={disabled} onClick={() => inputRef.current?.focus()}>
          {label}
        </ComboboxLabel>
      )}
      {/* cmdk names the input from `label` (it replaces the input's id). */}
      <Command
        label={typeof label === "string" ? label : undefined}
        shouldFilter={false}
        loop
        className="relative flex flex-col gap-(--combobox-panel-offset)"
      >
        {inlinePanel ? (
          <>
            {frame}
            {open && <div className={optionPanelClass}>{body}</div>}
          </>
        ) : (
          <Popover.Root open={open}>
            <Popover.Anchor>{frame}</Popover.Anchor>
            <Popover.Portal>
              <Popover.Content
                align="start"
                sideOffset={8}
                onOpenAutoFocus={(e) => e.preventDefault()}
                onMouseDown={(e) => e.preventDefault()}
                className={cn(optionPanelClass, "z-50 w-(--radix-popper-anchor-width) min-w-56")}
              >
                {body}
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        )}
      </Command>
      {name && <input type="hidden" name={name} value={value} />}
    </div>
  )
}

export { Select, Autocomplete }
export type { SelectProps, AutocompleteProps, ComboboxOption, ComboboxSize }
