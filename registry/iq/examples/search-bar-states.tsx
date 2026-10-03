"use client"

import { SearchBar } from "@/registry/iq/ui/search-bar"

const scope = { options: [{ value: "all", label: "Value/Label" }] }

// The Figma matrix: Size × State.
export default function SearchBarStates() {
  return (
    <div className="grid w-full gap-4 lg:grid-cols-2">
      {(["sm", "md"] as const).flatMap((size) =>
        (["Default", "Focus", "Active", "Error", "Disabled"] as const).map((state) => (
          <div key={`${size}-${state}`} className="flex flex-col gap-1.5">
            <span className="text-xs text-white/40">
              {size === "sm" ? "Small" : "Medium"} · {state}
            </span>
            <SearchBar
              size={size}
              aria-label={`${state} search`}
              placeholder="Placeholder text"
              defaultValue={state === "Default" ? "" : state === "Active" ? "pay" : "Text"}
              scope={scope}
              error={state === "Error"}
              disabled={state === "Disabled"}
              visualState={state === "Focus" ? "focus" : state === "Active" ? "active" : undefined}
              tabIndex={-1}
            />
          </div>
        ))
      )}
    </div>
  )
}
