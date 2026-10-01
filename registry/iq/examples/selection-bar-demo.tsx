"use client"

import { Button } from "@/registry/iq/ui/button"
import { Dropdown } from "@/registry/iq/ui/combobox"
import { SelectionBar } from "@/registry/iq/ui/selection-bar"

// The Figma specimen: count, Export, Actions, Deactivate, divider, Clear.
export default function SelectionBarDemo() {
  return (
    <SelectionBar count={8} onClear={() => {}}>
      <Button variant="secondary" size="sm">Export</Button>
      <Dropdown
        label="Actions"
        hideLabel
        placeholder="Actions"
        search={false}
        align="end"
        options={[
          { value: "assign", label: "Assign owner" },
          { value: "tag", label: "Add tag" },
          { value: "merge", label: "Merge" },
        ]}
      />
      <Button variant="danger" size="sm">Deactivate</Button>
    </SelectionBar>
  )
}
