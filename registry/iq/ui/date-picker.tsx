"use client"

import * as React from "react"
import * as Popover from "@radix-ui/react-popover"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "@carbon/icons-react"

import { cn } from "@/lib/utils"
import { LabelBlock } from "@/registry/iq/ui/label-block"
import { Trigger } from "@/registry/iq/ui/trigger"

// Figma: IQ Capital CRM Design System → Date Picker (1537:5159): Open × Size Small | Medium × Status Default | Focus | Error | Disabled.
// Parts: _Calendar / Pop Up (343:19793), Month Header (343:19670), Day Grid (1326:5034: Week starts Monday | Sunday,
// Selection mode Single | Range) and Day Cell (343:19475: Status × Selection × Interaction).

type DateRange = { from: Date | null; to: Date | null }
type CalendarMode = "single" | "range"

/* -------------------------------------------------------------------------------------------------
 * Date helpers (no library)
 * -----------------------------------------------------------------------------------------------*/

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
const addMonths = (d: Date, n: number) => {
  const day = d.getDate()
  const r = new Date(d.getFullYear(), d.getMonth() + n, 1)
  r.setDate(Math.min(day, new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate()))
  return r
}
const sameDay = (a?: Date | null, b?: Date | null) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
const sameMonth = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
const key = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`

/** Six weeks (42 days) starting on the week start before the 1st of the month. */
function monthGrid(month: Date, weekStartsOn: 0 | 1) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const offset = (first.getDay() - weekStartsOn + 7) % 7
  const start = addDays(first, -offset)
  return Array.from({ length: 42 }, (_, i) => addDays(start, i))
}

/* -------------------------------------------------------------------------------------------------
 * Day cell
 * -----------------------------------------------------------------------------------------------*/

type DayKind = "default" | "today" | "selected" | "middle"
type DayVisual = "hover" | "pressed" | "focus"

// Literal class sets per kind (Tailwind needs full class names): rest, live hover/pressed, and forced hover/pressed.
const dayKind: Record<DayKind, { rest: string; live: string; hover: string; pressed: string }> = {
  default: {
    rest: "",
    live: "hover:bg-(--calendar-day-bg-hover) active:bg-(--calendar-day-bg-pressed)",
    hover: "bg-(--calendar-day-bg-hover)",
    pressed: "bg-(--calendar-day-bg-pressed)",
  },
  today: {
    rest: "bg-(--calendar-day-bg-today)",
    live: "hover:bg-(--calendar-day-bg-today-hover) active:bg-(--calendar-day-bg-today-pressed)",
    hover: "bg-(--calendar-day-bg-today-hover)",
    pressed: "bg-(--calendar-day-bg-today-pressed)",
  },
  selected: {
    rest: "bg-(--calendar-day-bg-selected) text-(color:--calendar-day-content-on-selected)",
    live: "hover:bg-(--calendar-day-bg-selected-hover) active:bg-(--calendar-day-bg-selected-pressed)",
    hover: "bg-(--calendar-day-bg-selected-hover)",
    pressed: "bg-(--calendar-day-bg-selected-pressed)",
  },
  middle: {
    rest: "rounded-none bg-(--calendar-day-bg-range) text-(color:--calendar-day-content-active)",
    live: "hover:bg-(--calendar-day-bg-range-hover) active:bg-(--calendar-day-bg-range-pressed)",
    hover: "bg-(--calendar-day-bg-range-hover)",
    pressed: "bg-(--calendar-day-bg-range-pressed)",
  },
}

type DayCellProps = React.ComponentProps<"button"> & {
  kind?: DayKind
  /** Range start / end: square off the inner side. */
  edge?: "start" | "end"
  outside?: boolean
  /** Force an interaction for documentation matrices. */
  visual?: DayVisual
}

/** _Calendar / Day Cell: 32px, 12px numbers; Status × Selection × Interaction. */
function DayCell({ kind = "default", edge, outside, visual, className, ...props }: DayCellProps) {
  const k = dayKind[kind]
  const focusRing =
    kind === "selected"
      ? "shadow-[inset_0_0_0_1px_var(--focus-stroke-on-fill),0_0_0_var(--focus-spread)_var(--focus-ring)]"
      : "shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]"
  return (
    <button
      type="button"
      data-slot="calendar-day"
      data-kind={kind}
      className={cn(
        "flex aspect-square min-w-0 flex-1 cursor-pointer items-center justify-center rounded-(--calendar-radius-control) text-xs leading-[18px] text-(color:--calendar-day-content-default) outline-none tabular-nums",
        outside && kind === "default" && "text-(color:--calendar-day-content-muted)",
        k.rest,
        visual === "hover" ? k.hover : visual === "pressed" ? k.pressed : k.live,
        visual === "focus" && cn("relative z-10", focusRing),
        kind === "selected"
          ? "focus-visible:relative focus-visible:z-10 focus-visible:shadow-[inset_0_0_0_1px_var(--focus-stroke-on-fill),0_0_0_var(--focus-spread)_var(--focus-ring)]"
          : "focus-visible:relative focus-visible:z-10 focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
        edge === "start" && "rounded-r-none",
        edge === "end" && "rounded-l-none",
        "disabled:pointer-events-none disabled:bg-transparent disabled:text-(color:--content-disabled)",
        className
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------------------------------
 * Calendar
 * -----------------------------------------------------------------------------------------------*/

type CalendarProps = Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> & {
  mode?: CalendarMode
  /** Single: a Date. Range: { from, to }. */
  value?: Date | null | DateRange
  onValueChange?: (value: Date | DateRange) => void
  defaultMonth?: Date
  month?: Date
  onMonthChange?: (month: Date) => void
  /** Figma "Week starts". Default Monday. */
  weekStartsOn?: 0 | 1
  minDate?: Date
  maxDate?: Date
  /** Disable specific days. */
  isDateDisabled?: (date: Date) => boolean
  /** Defaults to the real today. */
  today?: Date
  locale?: string
  /** Move focus into the grid on mount (when opened from a Date Picker). */
  autoFocus?: boolean
}

/** _Calendar / Pop Up: month header and a six-week day grid. */
function Calendar({
  mode = "single",
  value,
  onValueChange,
  defaultMonth,
  month: monthProp,
  onMonthChange,
  weekStartsOn = 1,
  minDate,
  maxDate,
  isDateDisabled,
  today: todayProp,
  locale = "en-US",
  autoFocus,
  className,
  ...props
}: CalendarProps) {
  const today = startOfDay(todayProp ?? new Date())
  const single = mode === "single" ? ((value as Date | null | undefined) ?? null) : null
  const range = mode === "range" ? ((value as DateRange | undefined) ?? { from: null, to: null }) : { from: null, to: null }
  const anchor = single ?? range.from ?? today

  const [monthInner, setMonthInner] = React.useState(() => startOfDay(defaultMonth ?? anchor))
  const month = monthProp ?? monthInner
  const setMonth = (m: Date) => {
    if (!monthProp) setMonthInner(m)
    onMonthChange?.(m)
  }
  const [focused, setFocused] = React.useState<Date>(anchor)
  const [hovered, setHovered] = React.useState<Date | null>(null)
  const gridRef = React.useRef<HTMLDivElement>(null)
  const focusOnRender = React.useRef(Boolean(autoFocus))

  React.useEffect(() => {
    if (!focusOnRender.current) return
    focusOnRender.current = false
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-key="${key(focused)}"]`)?.focus()
  })

  const days = monthGrid(month, weekStartsOn)
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(new Date(2024, 0, 7 + weekStartsOn + i))
  )
  const disabled = (d: Date) =>
    (minDate && d < startOfDay(minDate)) || (maxDate && d > startOfDay(maxDate)) || isDateDisabled?.(d) || false
  const prevDisabled = minDate ? addMonths(month, -1) < new Date(minDate.getFullYear(), minDate.getMonth(), 1) : false
  const nextDisabled = maxDate ? addMonths(month, 1) > new Date(maxDate.getFullYear(), maxDate.getMonth(), 1) : false

  // Range preview while choosing the end date.
  const rangeEnd = range.to ?? (range.from && hovered ? hovered : null)
  const [lo, hi] =
    range.from && rangeEnd ? (range.from <= rangeEnd ? [range.from, rangeEnd] : [rangeEnd, range.from]) : [range.from, range.from]

  function select(d: Date) {
    if (disabled(d)) return
    if (mode === "single") onValueChange?.(d)
    else if (!range.from || range.to) onValueChange?.({ from: d, to: null })
    else onValueChange?.(d < range.from ? { from: d, to: range.from } : { from: range.from, to: d })
    if (!sameMonth(d, month)) setMonth(new Date(d.getFullYear(), d.getMonth(), 1))
  }

  function move(next: Date) {
    setFocused(next)
    if (!sameMonth(next, month)) setMonth(new Date(next.getFullYear(), next.getMonth(), 1))
    focusOnRender.current = true
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const map: Record<string, () => Date> = {
      ArrowLeft: () => addDays(focused, -1),
      ArrowRight: () => addDays(focused, 1),
      ArrowUp: () => addDays(focused, -7),
      ArrowDown: () => addDays(focused, 7),
      Home: () => addDays(focused, -((focused.getDay() - weekStartsOn + 7) % 7)),
      End: () => addDays(focused, 6 - ((focused.getDay() - weekStartsOn + 7) % 7)),
      PageUp: () => addMonths(focused, event.shiftKey ? -12 : -1),
      PageDown: () => addMonths(focused, event.shiftKey ? 12 : 1),
    }
    if (map[event.key]) {
      event.preventDefault()
      move(map[event.key]())
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      select(focused)
    }
  }

  const monthLabel = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(month)
  const navButton =
    "flex size-(--button-size-sm-height) shrink-0 cursor-pointer items-center justify-center rounded-(--button-radius-control) border border-(--button-secondary-border-default) bg-(--button-secondary-bg-default) text-white outline-none hover:border-(--button-secondary-border-active) focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)] disabled:pointer-events-none disabled:opacity-35 [&_svg]:size-4"

  return (
    <div
      data-slot="calendar"
      className={cn(
        "flex w-[232px] flex-col gap-(--calendar-popup-gap) rounded-(--calendar-radius-control) border border-(--calendar-popup-border) bg-(--calendar-popup-surface) p-(--calendar-popup-padding) backdrop-blur-(--calendar-popup-blur)",
        className
      )}
      {...props}
    >
      {/* _Calendar / Month Header */}
      <div className="flex items-center gap-1">
        <button type="button" aria-label="Previous month" disabled={prevDisabled} onClick={() => setMonth(addMonths(month, -1))} className={navButton}>
          <ChevronLeft aria-hidden="true" />
        </button>
        <p aria-live="polite" className="flex-1 text-center text-xs leading-[18px] text-(color:--calendar-month-content)">
          {monthLabel}
        </p>
        <button type="button" aria-label="Next month" disabled={nextDisabled} onClick={() => setMonth(addMonths(month, 1))} className={navButton}>
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      {/* _Calendar / Day Grid */}
      <div ref={gridRef} role="grid" aria-label={monthLabel} className="flex flex-col gap-(--calendar-grid-gap)" onKeyDown={onKeyDown} onMouseLeave={() => setHovered(null)}>
        <div role="row" className="flex opacity-50">
          {weekdays.map((w, i) => (
            <span key={i} role="columnheader" className="flex-1 text-center text-xs leading-[18px] text-(color:--calendar-weekday-content)">
              {w}
            </span>
          ))}
        </div>
        {Array.from({ length: 6 }, (_, week) => (
          <div key={week} role="row" className="flex">
            {days.slice(week * 7, week * 7 + 7).map((d) => {
              const outside = !sameMonth(d, month)
              const isDisabled = disabled(d)
              const isToday = sameDay(d, today)
              const isSingle = mode === "single" && sameDay(d, single)
              const isStart = mode === "range" && !!lo && sameDay(d, lo) && !!rangeEnd
              const isEnd = mode === "range" && !!hi && sameDay(d, hi) && !!rangeEnd
              const isOnly = mode === "range" && !!range.from && !rangeEnd && sameDay(d, range.from)
              const isMiddle = mode === "range" && !!lo && !!hi && d > lo && d < hi
              const filled = isSingle || isStart || isEnd || isOnly
              const selection = isSingle || isOnly ? "single" : isStart && isEnd ? "single" : isStart ? "start" : isEnd ? "end" : isMiddle ? "middle" : undefined
              return (
                <DayCell
                  key={key(d)}
                  role="gridcell"
                  data-key={key(d)}
                  data-selection={selection}
                  data-today={isToday || undefined}
                  data-outside={outside || undefined}
                  kind={filled ? "selected" : isMiddle ? "middle" : isToday ? "today" : "default"}
                  edge={selection === "start" ? "start" : selection === "end" ? "end" : undefined}
                  outside={outside}
                  aria-selected={filled || isMiddle || undefined}
                  aria-current={isToday ? "date" : undefined}
                  aria-label={new Intl.DateTimeFormat(locale, { dateStyle: "full" }).format(d)}
                  disabled={isDisabled}
                  tabIndex={sameDay(d, focused) ? 0 : -1}
                  onClick={() => {
                    setFocused(d)
                    select(d)
                  }}
                  onMouseEnter={() => setHovered(d)}
                  onFocus={() => setFocused(d)}
                >
                  {d.getDate()}
                </DayCell>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Date Picker
 * -----------------------------------------------------------------------------------------------*/

type DatePickerBase = {
  label?: React.ReactNode
  description?: React.ReactNode
  size?: "sm" | "md"
  placeholder?: string
  error?: boolean
  disabled?: boolean
  weekStartsOn?: 0 | 1
  minDate?: Date
  maxDate?: Date
  isDateDisabled?: (date: Date) => boolean
  today?: Date
  locale?: string
  /** Format the trigger text. Defaults to "Apr 8, 2025" / "Apr 8 – Apr 13, 2025". */
  format?: (value: Date | DateRange) => string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Fill the container width instead of hugging the content. */
  fill?: boolean
  /** Documentation only: force Focus, and draw the calendar in place instead of a popover. */
  visualState?: "hover" | "focus"
  inlinePanel?: boolean
  className?: string
}

type DatePickerProps =
  | (DatePickerBase & { mode?: "single"; value?: Date | null; defaultValue?: Date | null; onValueChange?: (value: Date) => void })
  | (DatePickerBase & { mode: "range"; value?: DateRange; defaultValue?: DateRange; onValueChange?: (value: DateRange) => void })

function defaultFormat(locale: string) {
  const day = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" })
  const full = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" })
  return (v: Date | DateRange) => {
    if (v instanceof Date) return full.format(v)
    if (v.from && v.to) return `${day.format(v.from)} – ${full.format(v.to)}`
    return v.from ? `${full.format(v.from)} – …` : ""
  }
}

/** Date Picker: Label Block + Trigger with the calendar 8px below. Single date or range. */
function DatePicker(props: DatePickerProps) {
  const {
    label,
    description,
    size = "sm",
    placeholder = "Select date",
    error = false,
    disabled = false,
    weekStartsOn = 1,
    minDate,
    maxDate,
    isDateDisabled,
    today,
    locale = "en-US",
    format = defaultFormat(locale),
    fill = false,
    visualState,
    inlinePanel,
    className,
  } = props
  const mode = props.mode ?? "single"
  const id = React.useId()
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const [openInner, setOpenInner] = React.useState(false)
  const open = props.open ?? openInner
  const setOpen = (o: boolean) => {
    if (props.open === undefined) setOpenInner(o)
    props.onOpenChange?.(o)
  }
  const [inner, setInner] = React.useState<Date | null | DateRange>(
    (props.defaultValue as Date | null | DateRange | undefined) ?? (mode === "range" ? { from: null, to: null } : null)
  )
  const value = (props.value as Date | null | DateRange | undefined) ?? inner

  const text =
    value instanceof Date ? format(value) : value && "from" in value && value.from ? format(value) : undefined

  function change(next: Date | DateRange) {
    if (props.value === undefined) setInner(next)
    ;(props.onValueChange as ((v: Date | DateRange) => void) | undefined)?.(next)
    if (next instanceof Date || (next.from && next.to)) setOpen(false)
  }

  const calendar = (
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
      autoFocus={!inlinePanel}
    />
  )

  const trigger = (
    <Trigger
      id={id}
      size={size}
      icon={<CalendarIcon />}
      placeholder={placeholder}
      value={text}
      open={open}
      error={error}
      disabled={disabled}
      fill={fill}
      visualState={visualState}
      aria-haspopup="dialog"
      aria-expanded={open}
      tabIndex={inlinePanel ? -1 : undefined}
      onClick={inlinePanel ? undefined : () => setOpen(!open)}
    />
  )

  return (
    <div data-slot="date-picker" data-size={size} className={cn("flex flex-col items-start gap-(--label-block-control-gap)", fill && "w-full", className)}>
      {(label || description) && <LabelBlock label={label} description={description} disabled={disabled} htmlFor={id} />}
      {inlinePanel ? (
        <div className="flex flex-col items-start gap-(--combobox-panel-offset)">
          {trigger}
          {open && calendar}
        </div>
      ) : (
        <Popover.Root open={open} onOpenChange={setOpen}>
          {/* Anchor (not Popover.Trigger asChild) so registry consumers on any shadcn style get the same markup. */}
          <Popover.Anchor ref={anchorRef} className="flex">
            {trigger}
          </Popover.Anchor>
          <Popover.Portal>
            <Popover.Content
              align="start"
              sideOffset={8}
              onOpenAutoFocus={(e) => e.preventDefault()}
              onPointerDownOutside={(e) => {
                // The trigger toggles on its own; don't let the outside-click close race it.
                if (anchorRef.current?.contains(e.target as Node)) e.preventDefault()
              }}
              className="z-50 outline-none"
            >
              {calendar}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )}
    </div>
  )
}

export { Calendar, DatePicker, DayCell }
export type { CalendarProps, DatePickerProps, DateRange }
