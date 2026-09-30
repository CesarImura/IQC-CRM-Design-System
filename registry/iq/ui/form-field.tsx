"use client"

import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Form Field page. _Form Field / Control (2402:6166),
// _Form Field / Helper (2412:6243), Form Field / Input (2407:6251), / Password (2415:5940),
// / Textarea (2536:29220), / Currency (2545:31002).
// State × Size × Content: Hover, Focus and Filled are automatic; Warning, Error, Disabled and
// Read-only are props; Active is the open state of dropdown fields (data-state="open").

type FieldSize = "sm" | "md"
type FieldStatus = "error" | "warning"

type FieldContextValue = {
  id: string
  helperId: string
  size: FieldSize
  status?: FieldStatus
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

function useField() {
  const context = React.useContext(FieldContext)
  if (!context) throw new Error("Form field parts must be used inside <FormField>.")
  return context
}

/* -------------------------------------------------------------------------------------------------
 * Icons (paths from the Figma assets, IBM Carbon)
 * -----------------------------------------------------------------------------------------------*/

function WarningIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4 shrink-0">
      <path d="M8 11.5C7.85167 11.5 7.70666 11.544 7.58333 11.6264C7.45999 11.7088 7.36386 11.8259 7.30709 11.963C7.25033 12.1 7.23548 12.2508 7.26441 12.3963C7.29335 12.5418 7.36478 12.6754 7.46967 12.7803C7.57456 12.8852 7.7082 12.9566 7.85369 12.9856C7.99917 13.0145 8.14997 12.9997 8.28702 12.9429C8.42406 12.8861 8.54119 12.79 8.62361 12.6667C8.70602 12.5433 8.75 12.3983 8.75 12.25C8.75 12.0511 8.67099 11.8603 8.53033 11.7197C8.38968 11.579 8.19892 11.5 8 11.5Z" />
      <path d="M8.5 5.99999H7.5V10.5H8.5V5.99999Z" />
      <path d="M14.5 15H1.5C1.4141 15 1.32965 14.9779 1.25478 14.9357C1.17992 14.8936 1.11717 14.8329 1.0726 14.7595C1.02802 14.686 1.00311 14.6024 1.00027 14.5165C0.997436 14.4306 1.01677 14.3455 1.0564 14.2693L7.5564 1.76929C7.59862 1.68811 7.66231 1.62007 7.74053 1.57258C7.81875 1.5251 7.9085 1.49998 8 1.49998C8.09151 1.49998 8.18126 1.5251 8.25948 1.57258C8.3377 1.62007 8.40138 1.68811 8.4436 1.76929L14.9436 14.2693C14.9832 14.3455 15.0026 14.4306 14.9997 14.5165C14.9969 14.6024 14.972 14.686 14.9274 14.7595C14.8828 14.8329 14.8201 14.8936 14.7452 14.9357C14.6704 14.9779 14.5859 15 14.5 15ZM2.32535 14H13.6747L13.6757 13.9983L8.001 3.08569H7.999L2.32435 13.9983L2.32535 14Z" />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4 shrink-0">
      <path d="M7.99999 0.999988C7.07914 0.994279 6.16632 1.17144 5.31446 1.5212C4.46261 1.87096 3.68866 2.38636 3.03751 3.03751C2.38636 3.68866 1.87096 4.46261 1.5212 5.31446C1.17144 6.16632 0.994279 7.07914 0.999988 7.99999C0.994279 8.92084 1.17144 9.83365 1.5212 10.6855C1.87096 11.5374 2.38636 12.3113 3.03751 12.9625C3.68866 13.6136 4.46261 14.129 5.31446 14.4788C6.16632 14.8285 7.07914 15.0057 7.99999 15C8.92084 15.0057 9.83365 14.8285 10.6855 14.4788C11.5374 14.129 12.3113 13.6136 12.9625 12.9625C13.6136 12.3113 14.129 11.5374 14.4788 10.6855C14.8285 9.83365 15.0057 8.92084 15 7.99999C15.0057 7.07914 14.8285 6.16632 14.4788 5.31446C14.129 4.46261 13.6136 3.68866 12.9625 3.03751C12.3113 2.38636 11.5374 1.87096 10.6855 1.5212C9.83365 1.17144 8.92084 0.994279 7.99999 0.999988ZM10.7224 11.5L4.49999 5.27784L5.27784 4.49999L11.5 10.7224L10.7224 11.5Z" />
    </svg>
  )
}

function ViewIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M19.3375 9.7875C18.6024 7.88603 17.3262 6.24164 15.6667 5.05755C14.0073 3.87347 12.0372 3.20161 10 3.125C7.96282 3.20161 5.99274 3.87347 4.33325 5.05755C2.67376 6.24164 1.3976 7.88603 0.662499 9.7875C0.612853 9.92482 0.612853 10.0752 0.662499 10.2125C1.3976 12.114 2.67376 13.7584 4.33325 14.9424C5.99274 16.1265 7.96282 16.7984 10 16.875C12.0372 16.7984 14.0073 16.1265 15.6667 14.9424C17.3262 13.7584 18.6024 12.114 19.3375 10.2125C19.3871 10.0752 19.3871 9.92482 19.3375 9.7875ZM10 15.625C6.6875 15.625 3.1875 13.1687 1.91875 10C3.1875 6.83125 6.6875 4.375 10 4.375C13.3125 4.375 16.8125 6.83125 18.0812 10C16.8125 13.1687 13.3125 15.625 10 15.625Z" />
      <path d="M10 6.25C9.25832 6.25 8.53329 6.46993 7.91661 6.88199C7.29993 7.29404 6.81928 7.87971 6.53545 8.56494C6.25162 9.25016 6.17736 10.0042 6.32205 10.7316C6.46675 11.459 6.8239 12.1272 7.34835 12.6517C7.8728 13.1761 8.54098 13.5333 9.26841 13.6779C9.99584 13.8226 10.7498 13.7484 11.4351 13.4645C12.1203 13.1807 12.706 12.7001 13.118 12.0834C13.5301 11.4667 13.75 10.7417 13.75 10C13.75 9.00544 13.3549 8.05161 12.6516 7.34835C11.9484 6.64509 10.9946 6.25 10 6.25ZM10 12.5C9.50555 12.5 9.0222 12.3534 8.61107 12.0787C8.19995 11.804 7.87952 11.4135 7.6903 10.9567C7.50108 10.4999 7.45157 9.99723 7.54804 9.51227C7.6445 9.02732 7.8826 8.58186 8.23223 8.23223C8.58186 7.8826 9.02732 7.6445 9.51227 7.54804C9.99723 7.45157 10.4999 7.50108 10.9567 7.6903C11.4135 7.87952 11.804 8.19995 12.0787 8.61107C12.3534 9.0222 12.5 9.50555 12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5Z" />
    </svg>
  )
}

// Figma has no "hidden" eye; this is the matching IBM Carbon View--off.
function ViewOffIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M5.24,22.51l1.43-1.42A14.06,14.06,0,0,1,3.07,16C5.1,10.93,10.7,7,16,7a12.38,12.38,0,0,1,4,.72l1.55-1.56A14.72,14.72,0,0,0,16,5,16.69,16.69,0,0,0,1.06,15.66a1,1,0,0,0,0,.68A16,16,0,0,0,5.24,22.51Z" />
      <path d="M12,15.73a4,4,0,0,1,3.7-3.7l1.81-1.82a6,6,0,0,0-7.33,7.33Z" />
      <path d="M30.94,15.66A16.4,16.4,0,0,0,25.2,8.22L30,3.41,28.59,2,2,28.59,3.41,30l5.1-5.1A15.29,15.29,0,0,0,16,27,16.69,16.69,0,0,0,30.94,16.34,1,1,0,0,0,30.94,15.66ZM20,16a4,4,0,0,1-6,3.44L19.44,14A4,4,0,0,1,20,16Zm-4,9a13.05,13.05,0,0,1-6-1.58l2.54-2.54a6,6,0,0,0,8.35-8.35l2.87-2.87A14.54,14.54,0,0,1,28.93,16C26.9,21.07,21.3,25,16,25Z" />
    </svg>
  )
}

/* -------------------------------------------------------------------------------------------------
 * FormField (root), control frame, helper
 * -----------------------------------------------------------------------------------------------*/

type FormFieldProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** Caption shown inside the control, uppercase. */
  label: React.ReactNode
  /** Text under the control. Its tone follows `status`. */
  helper?: React.ReactNode
  size?: FieldSize
  /** Warning or Error chrome + helper icon. */
  status?: FieldStatus
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  /** Id for the input. Generated when omitted. */
  id?: string
  /** Element before the value (e.g. currency symbol). */
  prefix?: React.ReactNode
  /** Element after the value (e.g. icon or button). */
  trailing?: React.ReactNode
  /** Positioned on the right edge across the full height (e.g. the currency stepper). */
  aside?: React.ReactNode
  /** Open state for dropdown fields (Figma State = Active). */
  open?: boolean
  /** The actual control: <FieldInput />, <FieldTextarea /> or a custom element using useField(). */
  children: React.ReactNode
}

const frameVariants = cva(
  [
    "group/field relative flex cursor-text items-center gap-2 overflow-hidden rounded-(--form-field-radius) border px-(--form-field-px) transition-[background-color,border-color,box-shadow] duration-100",
    "border-(--form-field-border) bg-(--form-field-bg)",
    "hover:border-(--form-field-border-hover) hover:bg-(--form-field-bg-hover)",
    "focus-within:border-(--form-field-border) focus-within:bg-(--form-field-bg-focus) focus-within:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
    "data-[state=open]:border-(--form-field-border-active) data-[state=open]:bg-(--form-field-bg-hover) data-[state=open]:shadow-[0_0_0_var(--focus-spread)_var(--form-field-ring-active)]",
    // Status chrome stays on in every interaction state.
    "data-[status=warning]:border-(--form-field-warning-border) data-[status=warning]:bg-(--form-field-bg) data-[status=warning]:shadow-[0_0_0_var(--focus-spread)_var(--focus-warning)]",
    "data-[status=error]:border-(--form-field-error-border) data-[status=error]:bg-(--form-field-bg) data-[status=error]:shadow-[0_0_0_var(--focus-spread)_var(--focus-danger)]",
    "data-readonly:border-(--form-field-border) data-readonly:bg-(--form-field-bg-readonly) data-readonly:shadow-none",
    "data-disabled:pointer-events-none data-disabled:border-(--form-field-border-disabled) data-disabled:bg-(--form-field-bg) data-disabled:shadow-none",
  ],
  {
    variants: {
      size: {
        sm: "py-(--form-field-py-sm) [--field-icon:16px] [--field-text:14px] [--field-gap:6px]",
        md: "py-(--form-field-py-md) [--field-icon:20px] [--field-text:16px] [--field-gap:8px]",
      },
    },
  }
)

function FormField({
  label,
  helper,
  size = "sm",
  status,
  required,
  disabled,
  readOnly,
  id: idProp,
  prefix,
  trailing,
  aside,
  open,
  className,
  children,
  ...props
}: FormFieldProps) {
  const generatedId = React.useId()
  const id = idProp ?? generatedId
  const helperId = `${id}-helper`
  const frameRef = React.useRef<HTMLDivElement>(null)

  return (
    <FieldContext.Provider value={{ id, helperId: helper ? helperId : "", size, status, disabled, readOnly, required }}>
      <div data-slot="form-field" className={cn("flex w-full flex-col gap-(--form-field-gap)", className)} {...props}>
        <div
          ref={frameRef}
          data-slot="form-field-control"
          data-status={status}
          data-disabled={disabled || undefined}
          data-readonly={readOnly || undefined}
          data-state={open ? "open" : undefined}
          className={frameVariants({ size })}
          onMouseDown={(event) => {
            // Clicking the frame (not a control inside it) focuses the input, like a big label.
            const target = event.target as HTMLElement
            if (target.closest("input, textarea, button, a, [role=button], [tabindex]")) return
            event.preventDefault()
            frameRef.current?.querySelector<HTMLElement>("input, textarea, [data-field-input]")?.focus()
          }}
        >
          <div className="flex min-w-0 flex-1 flex-col">
            <label
              htmlFor={id}
              className={cn(
                "flex min-w-0 items-center gap-1 text-xs leading-4 font-medium tracking-(--form-field-label-tracking) whitespace-nowrap uppercase text-(color:--content-muted)",
                disabled && "text-(color:--content-disabled)"
              )}
            >
              <span className="truncate">{label}</span>
              {required && (
                <span aria-hidden="true" className={cn("font-semibold", disabled ? "text-(color:--content-disabled)" : "text-(color:--danger)")}>
                  *
                </span>
              )}
            </label>
            <div className="flex min-w-0 items-start gap-2 pt-(--field-gap)">
              {prefix && (
                <span className="flex shrink-0 items-center gap-2 text-(length:--field-text) leading-5 font-medium text-(color:--content-default) group-data-disabled/field:text-(color:--content-disabled)">
                  {prefix}
                  <span aria-hidden="true" className="h-4 w-px bg-(--form-field-divider)" />
                </span>
              )}
              {children}
            </div>
          </div>
          {trailing && (
            <span className="inline-flex shrink-0 items-center text-(color:--form-field-icon) group-data-disabled/field:text-(color:--content-disabled) [&_svg]:size-(--field-icon)">
              {trailing}
            </span>
          )}
          {aside}
        </div>
        {helper && (
          <HelperContent id={helperId} status={status} disabled={disabled}>
            {helper}
          </HelperContent>
        )}
      </div>
    </FieldContext.Provider>
  )
}

function HelperContent({
  id,
  status,
  disabled,
  children,
}: {
  id: string
  status?: FieldStatus
  disabled?: boolean
  children: React.ReactNode
}) {
  const tone = disabled ? "disabled" : (status ?? "neutral")
  return (
    <p
      id={id}
      data-slot="form-field-helper"
      className={cn(
        "flex items-start gap-2 text-xs leading-[18px]",
        tone === "neutral" && "text-(color:--content-muted)",
        tone === "disabled" && "text-(color:--content-disabled)",
        tone === "warning" && "text-(color:--warning)",
        tone === "error" && "text-(color:--danger)"
      )}
    >
      {tone === "warning" && <WarningIcon />}
      {tone === "error" && <ErrorIcon />}
      <span className="min-w-0 flex-1">{children}</span>
    </p>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Inputs
 * -----------------------------------------------------------------------------------------------*/

const valueClasses =
  "w-full min-w-0 flex-1 bg-transparent p-0 text-(length:--field-text) leading-5 font-medium text-(color:--content-default) outline-none placeholder:font-normal placeholder:text-(color:--content-muted) read-only:text-(color:--content-muted) disabled:text-(color:--content-disabled) disabled:placeholder:text-(color:--content-disabled)"

function useInputA11y() {
  const field = useField()
  return {
    field,
    props: {
      id: field.id,
      disabled: field.disabled,
      readOnly: field.readOnly,
      required: field.required,
      "aria-invalid": field.status === "error" || undefined,
      "aria-describedby": field.helperId || undefined,
    },
  }
}

/** The text input inside a FormField. */
function FieldInput({ className, ...props }: React.ComponentProps<"input">) {
  const { props: a11y } = useInputA11y()
  return <input data-slot="form-field-input" className={cn(valueClasses, className)} {...a11y} {...props} />
}

/** The textarea inside a FormField. Grows with its content up to `maxRows`, and can be resized. */
function FieldTextarea({ className, rows = 3, ...props }: React.ComponentProps<"textarea">) {
  const { props: a11y } = useInputA11y()
  return (
    <textarea
      data-slot="form-field-textarea"
      rows={rows}
      className={cn(
        valueClasses,
        "min-h-[60px] resize-y [field-sizing:content] [&::-webkit-resizer]:bg-transparent",
        className
      )}
      {...a11y}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------------------------------
 * Ready-made fields
 * -----------------------------------------------------------------------------------------------*/

type FieldBaseProps = Pick<
  FormFieldProps,
  "label" | "helper" | "size" | "status" | "required" | "disabled" | "readOnly" | "id" | "className"
>

type TextFieldProps = FieldBaseProps &
  Omit<React.ComponentProps<"input">, "size" | "id" | "className"> & {
    /** Trailing icon or element. */
    trailing?: React.ReactNode
    /** Classes for the <input>. */
    inputClassName?: string
  }

function splitFieldProps<T extends FieldBaseProps>(props: T) {
  const { label, helper, size, status, required, disabled, readOnly, id, className, ...rest } = props
  return { field: { label, helper, size, status, required, disabled, readOnly, id, className }, rest }
}

/** Figma Form Field / Input. */
function TextField(props: TextFieldProps) {
  const { field, rest } = splitFieldProps(props)
  const { trailing, inputClassName, ...inputProps } = rest
  return (
    <FormField {...field} trailing={trailing}>
      <FieldInput className={inputClassName} {...inputProps} />
    </FormField>
  )
}

/** Figma Form Field / Password. The eye button shows and hides the value. */
function PasswordField(props: Omit<TextFieldProps, "type" | "trailing">) {
  const { field, rest } = splitFieldProps(props)
  const { inputClassName, ...inputProps } = rest
  const [visible, setVisible] = React.useState(false)
  return (
    <FormField
      {...field}
      trailing={
        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          disabled={field.disabled}
          onClick={() => setVisible((v) => !v)}
          className="-m-1 inline-flex cursor-pointer rounded-[2px] p-1 outline-none hover:text-(color:--content-default) focus-visible:shadow-[0_0_0_2px_var(--focus-ring)]"
        >
          {visible ? <ViewOffIcon /> : <ViewIcon />}
        </button>
      }
    >
      <FieldInput type={visible ? "text" : "password"} autoComplete="current-password" className={inputClassName} {...inputProps} />
    </FormField>
  )
}

type TextareaFieldProps = FieldBaseProps &
  Omit<React.ComponentProps<"textarea">, "id" | "className"> & { textareaClassName?: string }

/** Figma Form Field / Textarea. */
function TextareaField(props: TextareaFieldProps) {
  const { field, rest } = splitFieldProps(props)
  const { textareaClassName, ...textareaProps } = rest
  return (
    <FormField
      {...field}
      aside={
        // Figma resize handle: 12px triangle, 10% white, 7px from the corner.
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className="pointer-events-none absolute right-[7px] bottom-[7px] size-3 text-(color:--form-field-resize-handle)"
        >
          <path d="M12 0V12H0L12 0Z" fill="currentColor" />
        </svg>
      }
    >
      <FieldTextarea className={textareaClassName} {...textareaProps} />
    </FormField>
  )
}

type CurrencyFieldProps = FieldBaseProps &
  Omit<React.ComponentProps<"input">, "size" | "id" | "className" | "value" | "defaultValue" | "onChange" | "type"> & {
    /** Numeric value, or null when empty. */
    value?: number | null
    defaultValue?: number | null
    onValueChange?: (value: number | null) => void
    /** Symbol before the value. */
    currency?: string
    /** Locale for formatting, e.g. "pt-BR". Defaults to the user's locale. */
    locale?: string
    /** Decimal places. */
    fractionDigits?: number
    /** Amount added or removed by the stepper buttons. */
    step?: number
    min?: number
    max?: number
    /** Hide the +/− stepper. */
    hideStepper?: boolean
  }

/** Figma Form Field / Currency, with the _Form Field / Stepper. */
function CurrencyField(props: CurrencyFieldProps) {
  const { field, rest } = splitFieldProps(props)
  const {
    value: valueProp,
    defaultValue = null,
    onValueChange,
    currency = "$",
    locale,
    fractionDigits = 2,
    step = 1,
    min,
    max,
    hideStepper = false,
    placeholder = "0.00",
    onBlur,
    ...inputProps
  } = rest

  const [inner, setInner] = React.useState<number | null>(defaultValue)
  const value = valueProp !== undefined ? valueProp : inner
  const [draft, setDraft] = React.useState<string | null>(null)

  const format = React.useCallback(
    (n: number | null) =>
      n === null
        ? ""
        : new Intl.NumberFormat(locale, { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }).format(n),
    [locale, fractionDigits]
  )

  const clamp = (n: number) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, n))
  const commit = (n: number | null) => {
    const next = n === null ? null : clamp(Number(n.toFixed(fractionDigits)))
    if (valueProp === undefined) setInner(next)
    onValueChange?.(next)
  }

  // Parse "1.250,50" or "1,250.50": the last separator is the decimal one.
  const parse = (text: string): number | null => {
    const cleaned = text.replace(/[^\d.,-]/g, "")
    if (!cleaned) return null
    const lastSep = Math.max(cleaned.lastIndexOf("."), cleaned.lastIndexOf(","))
    const normalized =
      lastSep === -1
        ? cleaned
        : cleaned.slice(0, lastSep).replace(/[.,]/g, "") + "." + cleaned.slice(lastSep + 1).replace(/[.,]/g, "")
    const n = Number(normalized)
    return Number.isFinite(n) ? n : null
  }

  const interactive = !field.disabled && !field.readOnly

  return (
    <FormField
      {...field}
      prefix={currency}
      aside={
        !hideStepper && (
          <span className="absolute inset-y-0 right-0 flex w-10 flex-col gap-1.5 p-1.5">
            {[
              { label: "Increase", delta: step, d: "M8.5 7.5V2.5H7.5V7.5H2.5V8.5H7.5V13.5H8.5V8.5H13.5V7.5H8.5Z" },
              { label: "Decrease", delta: -step, d: "M2.5 7.5V8.5H13.5V7.5H2.5Z" },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                tabIndex={-1}
                aria-label={b.label}
                disabled={!interactive}
                onClick={() => commit((value ?? 0) + b.delta)}
                className="flex min-h-0 flex-1 cursor-pointer items-center justify-center rounded-(--button-radius-control) border border-(--button-secondary-border-default) bg-(--button-secondary-bg-default) text-(color:--form-field-icon) outline-none hover:border-(--button-secondary-border-active) active:bg-(--button-secondary-bg-pressed) disabled:pointer-events-none disabled:text-(color:--content-disabled)"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4">
                  <path d={b.d} />
                </svg>
              </button>
            ))}
          </span>
        )
      }
    >
      <FieldInput
        inputMode="decimal"
        placeholder={placeholder}
        value={draft ?? format(value)}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={(e) => {
          if (draft !== null) commit(parse(draft))
          setDraft(null)
          onBlur?.(e)
        }}
        onKeyDown={(e) => {
          if (!interactive) return
          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault()
            const base = draft !== null ? parse(draft) : value
            setDraft(null)
            commit((base ?? 0) + (e.key === "ArrowUp" ? step : -step))
          }
          if (e.key === "Enter") e.currentTarget.blur()
        }}
        className={cn("tabular-nums", !hideStepper && "pr-7")}
        {...inputProps}
      />
    </FormField>
  )
}

export { FormField, FieldInput, FieldTextarea, TextField, PasswordField, TextareaField, CurrencyField, useField }
export type { FormFieldProps, TextFieldProps, TextareaFieldProps, CurrencyFieldProps, FieldSize, FieldStatus }
