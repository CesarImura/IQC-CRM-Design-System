"use client"

import * as React from "react"
import * as Popover from "@radix-ui/react-popover"
import { Command } from "cmdk"
import { Search } from "@carbon/icons-react"

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
import { TriggerContent, TriggerErrorIcon, triggerClasses } from "@/registry/iq/ui/trigger"

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

/* -------------------------------------------------------------------------------------------------
 * Label
 * -----------------------------------------------------------------------------------------------*/

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
  /** full: the trigger fills its container (forms). auto: it hugs its content (Dropdown). */
  width?: "full" | "auto"
  /** Panel alignment to the trigger: start (left edge) or end (right edge). */
  align?: "start" | "end"
  /** Fixed panel width; defaults to the trigger's width. */
  panelWidth?: number | string
  /** Icon-only square trigger (Dropdown / Icon Only). `label` becomes its accessible name. */
  iconOnly?: React.ReactNode
  /** Hide the visible label (still used as the accessible name). */
  hideLabel?: boolean
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
    width = "full",
    align = "start",
    panelWidth,
    iconOnly,
    hideLabel,
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

  const trigger = iconOnly ? (
    <span className={cn("flex", !disabled && "text-(color:--content-default)")}>{iconOnly}</span>
  ) : (
    <TriggerContent icon={icon} placeholder={placeholder} value={display} open={open} error={error} disabled={disabled} fill={width === "full"} />
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
    "aria-label": iconOnly && typeof label === "string" ? label : undefined,
    disabled,
    className: cn(triggerClasses(size, error, Boolean(iconOnly)), width === "full" && !iconOnly && "w-full justify-start"),
  }
  const panelStyle = panelWidth !== undefined ? { width: panelWidth } : undefined

  return (
    <div
      data-slot="combobox-select"
      data-size={size}
      className={cn("flex flex-col gap-(--combobox-label-gap)", width === "full" ? "w-full" : "w-fit", align === "end" && width === "auto" && "items-end", className)}
    >
      {label && !hideLabel && !iconOnly && (
        <ComboboxLabel size={size} disabled={disabled} htmlFor={id}>
          {label}
        </ComboboxLabel>
      )}
      {inlinePanel ? (
        <div className={cn("flex flex-col gap-(--combobox-panel-offset)", align === "end" ? "items-end" : "items-start")}>
          <button type="button" {...triggerProps} tabIndex={-1}>
            {trigger}
          </button>
          {open && <div style={panelStyle ?? { width: "100%" }}>{panel}</div>}
        </div>
      ) : (
        <Popover.Root open={open} onOpenChange={(o) => { setOpen(o); if (!o) setQuery("") }}>
          <Popover.Trigger {...triggerProps} aria-haspopup="listbox">
            {trigger}
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              align={align}
              sideOffset={8}
              style={panelStyle}
              className={cn("z-50 outline-none", !panelStyle && "w-(--radix-popper-anchor-width) min-w-56")}
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
        "w-full cursor-text justify-start",
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
          "h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-(color:--content-muted)",
          !error && (open ? "text-(color:--combobox-value-active)" : "text-(color:--combobox-value)"),
          disabled && "text-(color:--button-neutral-content-disabled) placeholder:text-(color:--button-neutral-content-disabled)"
        )}
      />
      {error && !disabled && <TriggerErrorIcon />}
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

/* -------------------------------------------------------------------------------------------------
 * Dropdown
 * -----------------------------------------------------------------------------------------------*/

// Figma: Dropdown (1541:7655) and Dropdown / Icon Only (1284:4339): the Trigger hugs its content and the
// Option Panel opens at a fixed width, aligned to the trigger's left or right edge.
type DropdownProps = SelectProps & { align?: "start" | "end" }

/** Dropdown: a compact Select for toolbars and filters. Pass `iconOnly` for the square ⋮ version. */
function Dropdown(props: DropdownProps) {
  return (
    <Select
      width="auto"
      panelWidth={props.iconOnly ? "var(--dropdown-panel-width-icon)" : "var(--dropdown-panel-width)"}
      {...props}
    />
  )
}

export { Select, Autocomplete, Dropdown }
export type { SelectProps, AutocompleteProps, DropdownProps, ComboboxOption, ComboboxSize }
