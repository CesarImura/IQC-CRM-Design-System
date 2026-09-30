"use client"

import { Command } from "cmdk"

import { OptionItem, OptionPanel, OptionPanelList, OptionPanelSearch, OptionPanelStatus } from "@/registry/iq/ui/option-panel"

// Option Panel states: Results (checkbox), Empty, Loading, Error.
export default function OptionPanelStates() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      <OptionPanel className="w-[303px]">
        <OptionPanelSearch placeholder="Placeholder text" />
        <OptionPanelList>
          <OptionItem selection="checkbox" checked label="Option Label" secondary="Option Label" />
          <OptionItem selection="checkbox" label="Option Label" secondary="Option Label" />
          <OptionItem selection="checkbox" label="Option Label" secondary="Option Label" />
        </OptionPanelList>
      </OptionPanel>
      <OptionPanel className="w-[303px]">
        <OptionPanelSearch placeholder="Placeholder text" value="ADASD" readOnly />
        <OptionPanelList>
          <Command.Empty>
            <OptionPanelStatus status="empty" query="ADASD" />
          </Command.Empty>
        </OptionPanelList>
      </OptionPanel>
      <OptionPanel className="w-[303px]">
        <OptionPanelSearch placeholder="Placeholder text" />
        <OptionPanelStatus status="loading" />
      </OptionPanel>
      <OptionPanel className="w-[303px]">
        <OptionPanelSearch placeholder="Placeholder text" />
        <OptionPanelStatus status="error" onRetry={() => {}} />
      </OptionPanel>
    </div>
  )
}
