"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/registry/iq/ui/checkbox"
import { FieldHelper } from "@/registry/iq/ui/form-field"
import { RadioGroup, RadioGroupItem } from "@/registry/iq/ui/radio-group"
import { Toggle } from "@/registry/iq/ui/toggle"

// Figma: IQ Capital CRM Design System → Form Field / Radio group (2539:9435) and
// Form Field / Checkbox group (2540:9270) and Form Field / Toggle (2563:31775). Caption above the options, helper below.
// Warning and Error only change the helper; Disabled and Read-only disable every option
// (Read-only keeps a neutral helper).

type ChoiceOption = {
  value: string
  label: React.ReactNode
  /** Second line (radio only, Figma _Label Block description). */
  description?: React.ReactNode
  disabled?: boolean
}

type ChoiceFieldBaseProps = {
  /** Caption above the options (sentence case). */
  label: React.ReactNode
  helper?: React.ReactNode
  status?: "warning" | "error"
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  options: ChoiceOption[]
  className?: string
}

function ChoiceFieldShell({
  captionId,
  helperId,
  label,
  helper,
  status,
  required,
  disabled,
  readOnly,
  className,
  children,
}: Omit<ChoiceFieldBaseProps, "options"> & { captionId: string; helperId: string; children: React.ReactNode }) {
  return (
    <div data-slot="choice-field" className={cn("flex w-full flex-col gap-(--form-field-gap)", className)}>
      <p id={captionId} className="flex min-h-[18px] items-center gap-1 text-xs leading-4 font-medium whitespace-nowrap text-(color:--content-muted)">
        <span className="truncate">{label}</span>
        {required && (
          <span aria-hidden="true" className="leading-[18px] font-semibold text-(color:--danger)">
            *
          </span>
        )}
      </p>
      {children}
      {helper && (
        <FieldHelper id={helperId} status={readOnly ? undefined : status} disabled={disabled}>
          {helper}
        </FieldHelper>
      )}
    </div>
  )
}

type RadioGroupFieldProps = ChoiceFieldBaseProps & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
}

/** Figma Form Field / Radio group: one choice out of a few. */
function RadioGroupField({
  options,
  value,
  defaultValue,
  onValueChange,
  name,
  ...shell
}: RadioGroupFieldProps) {
  const id = React.useId()
  const locked = shell.disabled || shell.readOnly
  return (
    <ChoiceFieldShell {...shell} captionId={`${id}-caption`} helperId={`${id}-helper`}>
      <RadioGroup
        aria-labelledby={`${id}-caption`}
        aria-describedby={shell.helper ? `${id}-helper` : undefined}
        aria-invalid={shell.status === "error" || undefined}
        aria-readonly={shell.readOnly || undefined}
        aria-required={shell.required || undefined}
        required={shell.required}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={locked}
      >
        {options.map((option) => (
          <RadioGroupItem
            key={option.value}
            value={option.value}
            description={option.description}
            disabled={locked || option.disabled}
          >
            {option.label}
          </RadioGroupItem>
        ))}
      </RadioGroup>
    </ChoiceFieldShell>
  )
}

type CheckboxGroupFieldProps = ChoiceFieldBaseProps & {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  name?: string
}

/** Figma Form Field / Checkbox group: any number of choices. */
function CheckboxGroupField({
  options,
  value: valueProp,
  defaultValue = [],
  onValueChange,
  name,
  ...shell
}: CheckboxGroupFieldProps) {
  const id = React.useId()
  const [inner, setInner] = React.useState<string[]>(defaultValue)
  const value = valueProp ?? inner
  const locked = shell.disabled || shell.readOnly

  const toggle = (optionValue: string, checked: boolean) => {
    const next = checked ? [...value, optionValue] : value.filter((v) => v !== optionValue)
    if (valueProp === undefined) setInner(next)
    onValueChange?.(next)
  }

  return (
    <ChoiceFieldShell {...shell} captionId={`${id}-caption`} helperId={`${id}-helper`}>
      <div
        role="group"
        aria-labelledby={`${id}-caption`}
        aria-describedby={shell.helper ? `${id}-helper` : undefined}
        aria-invalid={shell.status === "error" || undefined}
        className="flex flex-col"
      >
        {options.map((option) => (
          <Checkbox
            key={option.value}
            name={name}
            value={option.value}
            checked={value.includes(option.value)}
            onCheckedChange={(checked) => toggle(option.value, checked === true)}
            disabled={locked || option.disabled}
            rowClassName="flex"
          >
            {option.label}
          </Checkbox>
        ))}
      </div>
    </ChoiceFieldShell>
  )
}

type ToggleFieldProps = Omit<ChoiceFieldBaseProps, "options"> & {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  /** Optional text next to the switch (Figma shows the switch alone). */
  toggleLabel?: React.ReactNode
  name?: string
  /** Documentation only: force the switch's Hover, Focus or Pressed (Figma State = Active) look. */
  visualState?: "hover" | "focus" | "pressed"
}

/** Figma Form Field / Toggle: one on / off setting with a caption and helper. */
function ToggleField({ checked, defaultChecked, onCheckedChange, toggleLabel, name, visualState, ...shell }: ToggleFieldProps) {
  const id = React.useId()
  return (
    <ChoiceFieldShell {...shell} captionId={`${id}-caption`} helperId={`${id}-helper`}>
      <Toggle
        aria-labelledby={toggleLabel ? undefined : `${id}-caption`}
        aria-describedby={shell.helper ? `${id}-helper` : undefined}
        aria-invalid={shell.status === "error" || undefined}
        aria-readonly={shell.readOnly || undefined}
        aria-required={shell.required || undefined}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        name={name}
        // Read-only shows the switch in its disabled look, like Figma.
        disabled={shell.disabled || shell.readOnly}
        visualState={visualState}
        rowClassName="self-start"
      >
        {toggleLabel}
      </Toggle>
    </ChoiceFieldShell>
  )
}

export { RadioGroupField, CheckboxGroupField, ToggleField }
export type { RadioGroupFieldProps, CheckboxGroupFieldProps, ToggleFieldProps, ChoiceOption }
