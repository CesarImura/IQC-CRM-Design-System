"use client"

import { Checkbox } from "@/registry/iq/ui/checkbox"

export default function CheckboxStates() {
  return (
    <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
      <Checkbox defaultChecked={false}>Unchecked</Checkbox>
      <Checkbox defaultChecked>Checked</Checkbox>
      <Checkbox checked="indeterminate">Indeterminate</Checkbox>
      <Checkbox disabled>Disabled</Checkbox>
      <Checkbox disabled defaultChecked>
        Disabled checked
      </Checkbox>
      <Checkbox disabled checked="indeterminate">
        Disabled indeterminate
      </Checkbox>
    </div>
  )
}
