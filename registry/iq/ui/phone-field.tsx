"use client"

import * as React from "react"
import * as Popover from "@radix-ui/react-popover"
import { Command } from "cmdk"
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js"

import { cn } from "@/lib/utils"
import { countries, Flag } from "@/registry/iq/ui/flag"
import { FieldInput, FormField, type FormFieldProps } from "@/registry/iq/ui/form-field"

// Figma: IQ Capital CRM Design System → Form Field / Phone (2500:29416). Country prefix (flag,
// dial code, chevron) + number. State = Active is the open country list: an Option Panel with
// search, "Suggested" and "All countries" groups.
// Dial codes and formatting come from libphonenumber-js.

const supported = new Set<string>(getCountries())

type PhoneCountry = { code: CountryCode; name: string; dial: string }

// Every flag in the library that has a phone numbering plan, sorted by name.
const phoneCountries: PhoneCountry[] = countries
  .filter((c) => supported.has(c.code.toUpperCase()))
  .map((c) => {
    const code = c.code.toUpperCase() as CountryCode
    return { code, name: c.name, dial: `+${getCountryCallingCode(code)}` }
  })

const byCode = new Map(phoneCountries.map((c) => [c.code, c]))

type PhoneValue = {
  country: CountryCode
  /** Number as typed, formatted for the country, without the dial code. */
  national: string
  /** Full number in E.164 (e.g. "+5511912345678"), or null while incomplete. */
  e164: string | null
  /** True when the number is a valid number for the country. */
  isValid: boolean
}

type PhoneFieldProps = Pick<
  FormFieldProps,
  "label" | "helper" | "size" | "status" | "required" | "disabled" | "readOnly" | "id" | "className"
> & {
  /** Controlled value. */
  value?: { country: CountryCode; national: string }
  defaultCountry?: CountryCode
  defaultNational?: string
  onValueChange?: (value: PhoneValue) => void
  /** Countries pinned at the top of the list (Figma "Suggested"). */
  suggested?: CountryCode[]
  placeholder?: string
  /** Name for form posts; the hidden input carries the E.164 value. */
  name?: string
  labels?: { search?: string; suggested?: string; all?: string; empty?: string; country?: string }
}

// Figma "Search" and "Checkmark" (IBM Carbon).
const searchPath =
  "M14.5 13.793L10.724 10.0169C11.6313 8.92758 12.0838 7.53039 11.9872 6.11596C11.8907 4.70154 11.2525 3.37879 10.2055 2.42289C9.15856 1.46699 7.78336 0.951523 6.36601 0.983731C4.94866 1.01594 3.59829 1.59334 2.59581 2.59581C1.59334 3.59829 1.01594 4.94866 0.983731 6.36601C0.951523 7.78336 1.46699 9.15856 2.42289 10.2055C3.37879 11.2525 4.70154 11.8907 6.11596 11.9872C7.53039 12.0838 8.92758 11.6313 10.0169 10.724L13.793 14.5L14.5 13.793ZM2 6.5C2 5.60999 2.26392 4.73996 2.75839 3.99994C3.25286 3.25992 3.95566 2.68314 4.77793 2.34255C5.6002 2.00195 6.505 1.91284 7.37791 2.08647C8.25082 2.2601 9.05265 2.68869 9.68198 3.31802C10.3113 3.94736 10.7399 4.74918 10.9135 5.6221C11.0872 6.49501 10.9981 7.39981 10.6575 8.22208C10.3169 9.04435 9.74009 9.74715 9.00007 10.2416C8.26005 10.7361 7.39002 11 6.5 11C5.30694 10.9987 4.16311 10.5242 3.31949 9.68052C2.47586 8.8369 2.00133 7.69307 2 6.5Z"
const checkPath = "M6.5 12L2 7.5L2.707 6.793L6.5 10.5855L13.293 3.793L14 4.5L6.5 12Z"
const chevronPath = "M8 11L3 6.00001L3.7 5.30001L8 9.60001L12.3 5.30001L13 6.00001L8 11Z"

function toValue(country: CountryCode, national: string): PhoneValue {
  const parsed = parsePhoneNumberFromString(national, country)
  return { country, national, e164: parsed ? parsed.number : null, isValid: parsed ? parsed.isValid() : false }
}

function CountryItem({
  group,
  country,
  selected,
  onSelect,
}: {
  group: string
  country: PhoneCountry
  selected: boolean
  onSelect: () => void
}) {
  return (
    <Command.Item
      // Unique per group (a country can be in Suggested and All); search runs on the keywords.
      value={`${group}-${country.code}`}
      keywords={[country.name, country.code, country.dial]}
      onSelect={onSelect}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-(--option-panel-radius) p-2 text-sm leading-normal outline-none select-none",
        "data-[selected=true]:bg-(--option-item-bg-hover)",
        selected ? "bg-(--option-item-bg-selected) font-medium text-white" : "text-white/90"
      )}
    >
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={cn("size-4 shrink-0", !selected && "invisible")}>
        <path d={checkPath} />
      </svg>
      <Flag code={country.code} size="sm" aria-hidden />
      <span className="truncate">{country.name}</span>
      <span className="shrink-0 text-white/60">{country.dial}</span>
    </Command.Item>
  )
}

/** Figma Form Field / Phone. */
function PhoneField({
  value: valueProp,
  defaultCountry = "BR",
  defaultNational = "",
  onValueChange,
  suggested = ["BR", "PT", "US", "ES"],
  placeholder,
  name,
  labels,
  ...field
}: PhoneFieldProps) {
  const [inner, setInner] = React.useState({ country: defaultCountry, national: defaultNational })
  const current = valueProp ?? inner
  const country = byCode.get(current.country) ?? phoneCountries[0]
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  // After picking a country, focus goes to the number so the user can keep typing.
  const returnToInput = React.useRef(false)

  const update = (next: { country: CountryCode; national: string }) => {
    if (valueProp === undefined) setInner(next)
    onValueChange?.(toValue(next.country, next.national))
  }

  const locked = field.disabled || field.readOnly
  const suggestedCountries = suggested.map((c) => byCode.get(c)).filter(Boolean) as PhoneCountry[]
  const e164 = toValue(current.country, current.national).e164

  const select = (next: PhoneCountry) => {
    const digits = current.national.replace(/\D/g, "")
    update({ country: next.code, national: new AsYouType(next.code).input(digits) })
    returnToInput.current = true
    setOpen(false)
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <FormField
        {...field}
        open={open}
        // The list anchors to the whole control frame, like the Figma Active state.
        wrapControl={(frame) => <Popover.Anchor>{frame}</Popover.Anchor>}
        prefix={
          <Popover.Trigger
              ref={triggerRef}
              type="button"
              disabled={locked}
              aria-label={`${labels?.country ?? "Country"}: ${country.name} ${country.dial}`}
              className="-m-1 flex cursor-pointer items-center gap-2 rounded-[2px] p-1 outline-none focus-visible:shadow-[0_0_0_2px_var(--focus-ring)] disabled:cursor-default"
            >
              <Flag code={country.code} aria-hidden className={field.size === "md" ? "h-[18px] w-6" : "h-[15px] w-5"} />
              <span className={cn("tabular-nums", field.readOnly && "text-(color:--content-muted)")}>{country.dial}</span>
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                className={cn("size-4 text-(color:--form-field-icon) transition-transform", open && "rotate-180", field.disabled && "text-(color:--content-disabled)")}
              >
                <path d={chevronPath} />
              </svg>
          </Popover.Trigger>
        }
      >
        <FieldInput
          ref={inputRef}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder={placeholder ?? "Phone number"}
          value={current.national}
          onChange={(e) => update({ country: current.country, national: new AsYouType(current.country).input(e.target.value) })}
          className="tabular-nums"
        />
      </FormField>
      {name && <input type="hidden" name={name} value={e164 ?? ""} />}
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={8}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => {
            if (!returnToInput.current) return
            e.preventDefault()
            returnToInput.current = false
            inputRef.current?.focus()
          }}
          className="z-50 w-(--radix-popper-anchor-width) min-w-64 rounded-(--option-panel-radius) border border-(--option-panel-border) bg-(--option-panel-bg) p-(--option-panel-padding) backdrop-blur-[100px] outline-none"
        >
          <Command loop className="flex flex-col gap-3">
            <div className="flex h-8 items-center overflow-hidden rounded-(--option-panel-radius) border border-(--option-panel-border) bg-(--option-panel-bg)">
              <span className="flex size-8 shrink-0 items-center justify-center text-white/80">
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4">
                  <path d={searchPath} />
                </svg>
              </span>
              <Command.Input
                autoFocus
                placeholder={labels?.search ?? "Search country or code"}
                className="h-full min-w-0 flex-1 bg-transparent pr-3 text-sm leading-[21px] text-white outline-none placeholder:text-white/50"
              />
            </div>
            <Command.List className="max-h-72 overflow-y-auto [scrollbar-color:var(--border-grid)_transparent] [scrollbar-width:thin]">
              <Command.Empty className="px-2 py-6 text-center text-sm text-white/50">
                {labels?.empty ?? "No country found."}
              </Command.Empty>
              {[
                { heading: labels?.suggested ?? "Suggested", items: suggestedCountries },
                { heading: labels?.all ?? "All countries", items: phoneCountries },
              ].map((group) => (
                <Command.Group
                  key={group.heading}
                  heading={group.heading}
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-1 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:leading-normal [&_[cmdk-group-heading]]:text-white/50 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-items]]:flex [&_[cmdk-group-items]]:flex-col [&_[cmdk-group-items]]:gap-1"
                >
                  {group.items.map((c) => (
                    <CountryItem key={`${group.heading}-${c.code}`} group={group.heading} country={c} selected={c.code === country.code} onSelect={() => select(c)} />
                  ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export { PhoneField, phoneCountries }
export type { PhoneFieldProps, PhoneValue, PhoneCountry }
