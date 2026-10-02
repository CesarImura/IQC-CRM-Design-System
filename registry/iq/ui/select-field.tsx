"use client"

import * as React from "react"
import * as Popover from "@radix-ui/react-popover"
import { Command } from "cmdk"
import { Calendar as CalendarIcon, ChevronDown } from "@carbon/icons-react"

import { cn } from "@/lib/utils"
import { ComboboxPanelBody, type ComboboxOption } from "@/registry/iq/ui/combobox"
import { Calendar, type DateRange } from "@/registry/iq/ui/date-picker"
import { FieldInput, FormField, useField, type FormFieldProps } from "@/registry/iq/ui/form-field"
import { OptionPanelSearch, optionPanelClass } from "@/registry/iq/ui/option-panel"

// Figma: IQ Capital CRM Design System → Form Field / Select (2415:6419), / Autocomplete (2418:26212)
// and / Date (2418:26950). The Form Field control with an Option Panel or Calendar 8px below it.
// State = Active is the open panel (or typing, for Autocomplete); everything else comes from FormField.

type FieldBaseProps = Pick<
  FormFieldProps,
  "label" | "helper" | "size" | "status" | "required" | "disabled" | "readOnly" | "id" | "className" | "visualState"
>

/** The value as the popover trigger inside the control: white medium text, or the placeholder at 50%. */
function FieldButton({
  placeholder,
  hasValue,
  children,
  className,
  ...props
}: React.ComponentProps<typeof Popover.Trigger> & { placeholder: string; hasValue: boolean }) {
  const field = useField()
  return (
    <Popover.Trigger
      type="button"
      id={field.id}
      data-field-input
      disabled={field.disabled || field.readOnly}
      aria-invalid={field.status === "error" || undefined}
      aria-describedby={field.helperId || undefined}
      aria-required={field.required || undefined}
      aria-readonly={field.readOnly || undefined}
      className={cn(
        "w-full min-w-0 flex-1 cursor-pointer truncate bg-transparent p-0 text-left text-(length:--field-text) leading-(--field-leading) outline-none",
        hasValue ? "font-medium text-(color:--content-default)" : "font-normal text-(color:--content-muted)",
        field.readOnly && "cursor-default text-(color:--content-muted)",
        field.disabled && "text-(color:--content-disabled)",
        className
      )}
      {...props}
    >
      {hasValue ? children : placeholder}
    </Popover.Trigger>
  )
}

function Chevron({ open }: { open: boolean }) {
  return <ChevronDown aria-hidden="true" className={cn("transition-transform duration-150 motion-reduce:transition-none", open && "rotate-180")} />
}

function useOpen(open: boolean | undefined, onOpenChange?: (open: boolean) => void) {
  const [inner, setInner] = React.useState(false)
  const value = open ?? inner
  const set = (next: boolean) => {
    if (open === undefined) setInner(next)
    onOpenChange?.(next)
  }
  return [value, set] as const
}

const panelContent = "z-50 w-(--radix-popper-anchor-width) min-w-56 outline-none"

/* -------------------------------------------------------------------------------------------------
 * Select
 * -----------------------------------------------------------------------------------------------*/

type SelectFieldProps = FieldBaseProps & {
  options: ComboboxOption[]
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string) => void
  placeholder?: string
  /** Search bar at the top of the panel. */
  search?: boolean
  searchPlaceholder?: string
  status?: FieldBaseProps["status"]
  /** Panel body state: loading or error instead of the options. */
  panelStatus?: "ready" | "loading" | "error"
  onRetry?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  name?: string
}

/** Figma Form Field / Select: pick one option from a list. */
function SelectField({
  options,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  placeholder = "Select an option",
  search = false,
  searchPlaceholder = "Search",
  panelStatus = "ready",
  onRetry,
  open: openProp,
  onOpenChange,
  name,
  ...field
}: SelectFieldProps) {
  const [open, setOpen] = useOpen(openProp, onOpenChange)
  const [inner, setInner] = React.useState<string | null>(defaultValue)
  const value = valueProp !== undefined ? valueProp : inner
  const [query, setQuery] = React.useState("")
  const chosen = options.find((o) => o.value === value)
  const locked = field.disabled || field.readOnly

  const select = (next: string) => {
    if (valueProp === undefined) setInner(next)
    onValueChange?.(next)
    setOpen(false)
  }

  return (
    <Popover.Root
      open={open && !locked}
      onOpenChange={(o) => {
        setOpen(o)
        if (!o) setQuery("")
      }}
    >
      <FormField
        {...field}
        open={open && !locked}
        wrapControl={(frame) => (
          // Clicking anywhere on the control opens the panel; the value button toggles on its own.
          <Popover.Anchor onClick={(e) => !locked && !(e.target as HTMLElement).closest("[data-field-input]") && setOpen(true)}>{frame}</Popover.Anchor>
        )}
        trailing={<Chevron open={open && !locked} />}
      >
        <FieldButton placeholder={placeholder} hasValue={Boolean(chosen)} aria-haspopup="listbox">
          {chosen?.label}
        </FieldButton>
      </FormField>
      <Popover.Portal>
        <Popover.Content align="start" sideOffset={8} className={panelContent}>
          <Command
            loop
            label={typeof field.label === "string" ? `${field.label} options` : "Options"}
            className={cn(optionPanelClass, "w-full")}
            filter={(v, q, keywords) => ((keywords?.join(" ") ?? v).toLowerCase().includes(q.toLowerCase()) ? 1 : 0)}
          >
            {search && <OptionPanelSearch placeholder={searchPlaceholder} value={query} onValueChange={setQuery} autoFocus />}
            <ComboboxPanelBody
              options={options}
              isChecked={(v) => v === value}
              onSelect={select}
              selection="checkmark"
              status={panelStatus}
              onRetry={onRetry}
              query={query}
            />
          </Command>
        </Popover.Content>
      </Popover.Portal>
      {name && <input type="hidden" name={name} value={value ?? ""} />}
    </Popover.Root>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Autocomplete
 * -----------------------------------------------------------------------------------------------*/

type AutocompleteFieldProps = FieldBaseProps & {
  options: ComboboxOption[]
  /** The typed text. */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Fires when a suggestion is picked. */
  onSelectOption?: (option: ComboboxOption) => void
  placeholder?: string
  panelStatus?: "ready" | "loading" | "error"
  onRetry?: () => void
  /** Documentation only: keep the panel open. */
  open?: boolean
  name?: string
}

/** Figma Form Field / Autocomplete: type, and pick from the matching suggestions. */
function AutocompleteField({
  options,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onSelectOption,
  placeholder = "Type to search",
  panelStatus = "ready",
  onRetry,
  open: openProp,
  name,
  ...field
}: AutocompleteFieldProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const value = valueProp ?? inner
  const setValue = (next: string) => {
    if (valueProp === undefined) setInner(next)
    onValueChange?.(next)
  }
  const [openState, setOpen] = React.useState(false)
  const matches = options.filter((o) => o.label.toLowerCase().includes(value.trim().toLowerCase()))
  const locked = field.disabled || field.readOnly
  const open = !locked && (openProp ?? (openState && value.trim().length > 0 && (matches.length > 0 || panelStatus !== "ready")))

  const pick = (v: string) => {
    const option = options.find((o) => o.value === v)
    if (!option) return
    setValue(option.label)
    onSelectOption?.(option)
    setOpen(false)
  }

  return (
    // cmdk handles ↑ ↓ and Enter from the input (it bubbles to the Command root); filtering is ours.
    <Command shouldFilter={false} loop label={typeof field.label === "string" ? `${field.label} suggestions` : "Suggestions"} className="w-full">
      <Popover.Root open={open}>
        <FormField {...field} open={open} wrapControl={(frame) => <Popover.Anchor>{frame}</Popover.Anchor>}>
          <FieldInput
            value={value}
            placeholder={placeholder}
            autoComplete="off"
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            onChange={(e) => {
              setValue(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false)
            }}
          />
        </FormField>
        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={8}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
            className={cn(optionPanelClass, panelContent)}
          >
            <ComboboxPanelBody
              options={matches}
              isChecked={() => false}
              onSelect={pick}
              selection="none"
              status={panelStatus}
              onRetry={onRetry}
              query={value}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      {name && <input type="hidden" name={name} value={value} />}
    </Command>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Date
 * -----------------------------------------------------------------------------------------------*/

type DateFieldBase = FieldBaseProps & {
  placeholder?: string
  weekStartsOn?: 0 | 1
  minDate?: Date
  maxDate?: Date
  isDateDisabled?: (date: Date) => boolean
  today?: Date
  locale?: string
  /** Formats the chosen date (or range) for the field. */
  format?: (value: Date | DateRange) => string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  name?: string
}

type DateFieldProps =
  | (DateFieldBase & { mode?: "single"; value?: Date | null; defaultValue?: Date | null; onValueChange?: (value: Date) => void })
  | (DateFieldBase & { mode: "range"; value?: DateRange; defaultValue?: DateRange; onValueChange?: (value: DateRange) => void })

// "29 Sep 2026", as in Figma: day, short month, year.
function defaultFormat(locale: string) {
  const month = new Intl.DateTimeFormat(locale, { month: "short" })
  const one = (d: Date) => `${d.getDate()} ${month.format(d).replace(".", "")} ${d.getFullYear()}`
  return (v: Date | DateRange) => {
    if (v instanceof Date) return one(v)
    if (v.from && v.to) return `${one(v.from)} – ${one(v.to)}`
    return v.from ? `${one(v.from)} – …` : ""
  }
}

/** Figma Form Field / Date: a date (or range) picked from a calendar as wide as the field. */
function DateField(props: DateFieldProps) {
  const {
    mode = "single",
    placeholder = "Pick a date",
    weekStartsOn = 1,
    minDate,
    maxDate,
    isDateDisabled,
    today,
    locale = "en-US",
    format = defaultFormat(locale),
    open: openProp,
    onOpenChange,
    name,
  } = props
  const { label, helper, size, status, required, disabled, readOnly, id, className, visualState } = props
  const field = { label, helper, size, status, required, disabled, readOnly, id, className, visualState }
  const [open, setOpen] = useOpen(openProp, onOpenChange)
  const [inner, setInner] = React.useState<Date | null | DateRange>(
    (props.defaultValue as Date | null | DateRange | undefined) ?? (mode === "range" ? { from: null, to: null } : null)
  )
  const value = (props.value as Date | null | DateRange | undefined) ?? inner
  const locked = field.disabled || field.readOnly
  const text = value instanceof Date ? format(value) : value && "from" in value && value.from ? format(value) : undefined

  const change = (next: Date | DateRange) => {
    if (props.value === undefined) setInner(next)
    ;(props.onValueChange as ((v: Date | DateRange) => void) | undefined)?.(next)
    if (next instanceof Date || (next.from && next.to)) setOpen(false)
  }

  const iso = (d: Date | null | undefined) => (d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` : "")

  return (
    <Popover.Root open={open && !locked} onOpenChange={setOpen}>
      <FormField
        {...field}
        open={open && !locked}
        wrapControl={(frame) => (
          // Clicking anywhere on the control opens the panel; the value button toggles on its own.
          <Popover.Anchor onClick={(e) => !locked && !(e.target as HTMLElement).closest("[data-field-input]") && setOpen(true)}>{frame}</Popover.Anchor>
        )}
        trailing={<CalendarIcon aria-hidden="true" />}
      >
        <FieldButton placeholder={placeholder} hasValue={Boolean(text)} aria-haspopup="dialog">
          {text}
        </FieldButton>
      </FormField>
      <Popover.Portal>
        <Popover.Content align="start" sideOffset={8} onOpenAutoFocus={(e) => e.preventDefault()} className="z-50 w-(--radix-popper-anchor-width) min-w-[232px] outline-none">
          <Calendar
            mode={mode}
            value={value}
            onValueChange={change}
            weekStartsOn={weekStartsOn}
            minDate={minDate}
            maxDate={maxDate}
            isDateDisabled={isDateDisabled}
            today={today}
            locale={locale}
            autoFocus
            className="w-full"
          />
        </Popover.Content>
      </Popover.Portal>
      {name && (
        <input
          type="hidden"
          name={name}
          value={value instanceof Date ? iso(value) : value && "from" in value ? [iso(value.from), iso(value.to)].filter(Boolean).join("/") : ""}
        />
      )}
    </Popover.Root>
  )
}

export { SelectField, AutocompleteField, DateField }
export type { SelectFieldProps, AutocompleteFieldProps, DateFieldProps }
