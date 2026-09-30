"use client"

import { ConditionPoint } from "@carbon/icons-react"

import { OptionGroup, OptionItem, OptionPanel, OptionPanelList, OptionPanelSearch } from "@/registry/iq/ui/option-panel"

// The Option Panel on its own: search, a Label, tones, selected, disabled and a matched query.
export default function OptionPanelDemo() {
  return (
    <OptionPanel className="w-[303px]">
      <OptionPanelSearch placeholder="Placeholder text" />
      <OptionPanelList>
        <OptionGroup heading="Option label">
          <OptionItem selection="checkmark" checked icon={<ConditionPoint />} label="Option Label" secondary="Option Label" />
          <OptionItem selection="checkmark" icon={<ConditionPoint />} label="Option Label" secondary="Option Label" />
          <OptionItem selection="checkmark" tone="warning" icon={<ConditionPoint />} label="Warning option" secondary="Option Label" />
          <OptionItem selection="checkmark" tone="danger" icon={<ConditionPoint />} label="Danger option" secondary="Option Label" />
          <OptionItem selection="checkmark" disabled icon={<ConditionPoint />} label="Disabled option" secondary="Option Label" />
          <OptionItem selection="checkmark" label="Matched Text" query="Match" />
        </OptionGroup>
      </OptionPanelList>
    </OptionPanel>
  )
}
