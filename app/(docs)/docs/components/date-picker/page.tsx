import type { Metadata } from "next"
import { Launch } from "@carbon/icons-react"

import { figmaNode } from "@/lib/docs"
import { Button } from "@/registry/iq/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TokenTable } from "@/components/docs/token-table"
import { DatePickerMatrix, DayCellMatrix } from "@/components/docs/date-picker-matrix"
import { Callout, H2, H3, P, PageHeader, UL } from "@/components/docs/typography"

export const metadata: Metadata = {
  title: "Date Picker",
  description: "Pick a date or a date range from a calendar.",
}

export default function DatePickerDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Date Picker"
        description="Pick one date or a date range. A Label Block and Trigger open the calendar 8px below. Small or Medium; Default, Focus, Error and Disabled; weeks start on Monday or Sunday."
      >
        <Button asChild variant="secondary" size="sm">
          <a href={figmaNode("1537:5159")} target="_blank" rel="noreferrer">
            Figma: Date Picker
            <Launch />
          </a>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <a href={figmaNode("343:19793")} target="_blank" rel="noreferrer">
            Calendar
            <Launch />
          </a>
        </Button>
      </PageHeader>

      <P>Single date and range. In range mode, pick the start, then the end; the range previews as you hover.</P>
      <ComponentPreview name="date-picker-demo" className="items-start" />

      <H2>Calendar</H2>
      <P>Single, range, and a Sunday-first calendar limited to Apr 3–25 (days outside are disabled).</P>
      <ComponentPreview name="calendar-demo" className="items-start" />

      <H2>All variants</H2>
      <DatePickerMatrix />

      <H2>Day cell</H2>
      <DayCellMatrix />

      <H2>Anatomy</H2>
      <H3>Pop-up</H3>
      <UL>
        <li>232px wide, surface-subtle (#141716) fill, 1px border-panel (white 8%), 2px radius, 4px padding, 8px between header and grid.</li>
        <li>Month header: 32px previous / next buttons (Secondary), month label 12/18 at 72% in the middle.</li>
        <li>Weekday row: narrow names, 12/18 at 32% (row at 50%).</li>
      </UL>
      <H3>Day cell</H3>
      <UL>
        <li>32px, 2px radius, number 12/18 at 72%; 2px between weeks, no gap between days.</li>
        <li>Today: #141716 fill. Outside the month: 32%. Disabled: 32%, no hover.</li>
        <li>Selected (single, range start and end): green fill, black number; start / end square off toward the range.</li>
        <li>Range middle: green 8% fill, white number. Hover and pressed brighten each kind.</li>
        <li>Focus: 3px teal ring; on green cells also a 1px black inner line.</li>
      </UL>

      <H2>Tokens</H2>
      <TokenTable
        title="Pop-up"
        rows={[
          ["Fill", "calendar-popup-surface"],
          ["Border", "calendar-popup-border"],
          ["Padding", "calendar-popup-padding"],
          ["Header → grid", "calendar-popup-gap"],
          ["Radius", "calendar-radius-control"],
          ["Blur", "calendar-popup-blur"],
          ["Month label", "calendar-month-content"],
          ["Weekday", "calendar-weekday-content"],
          ["Week gap", "calendar-grid-gap"],
        ]}
      />
      <TokenTable
        title="Day cell"
        rows={[
          ["Size", "calendar-day-size"],
          ["Hit area", "calendar-day-hit-area"],
          ["Number", "calendar-day-content-default"],
          ["Number, range", "calendar-day-content-active"],
          ["Number, outside month", "calendar-day-content-muted"],
          ["Number, selected", "calendar-day-content-on-selected"],
          ["Hover", "calendar-day-bg-hover"],
          ["Pressed", "calendar-day-bg-pressed"],
          ["Today", "calendar-day-bg-today"],
          ["Today hover", "calendar-day-bg-today-hover"],
          ["Today pressed", "calendar-day-bg-today-pressed"],
          ["Selected", "calendar-day-bg-selected"],
          ["Selected hover", "calendar-day-bg-selected-hover"],
          ["Selected pressed", "calendar-day-bg-selected-pressed"],
          ["Range", "calendar-day-bg-range"],
          ["Range hover", "calendar-day-bg-range-hover"],
          ["Range pressed", "calendar-day-bg-range-pressed"],
          ["Focus inner line", "focus-stroke-on-fill"],
        ]}
      />

      <H2>Behavior</H2>
      <UL>
        <li>Opening moves focus to the selected day (or today). ← → ↑ ↓ move by day and week, Home / End to the week’s ends, PageUp / PageDown change month (with Shift, year).</li>
        <li>Enter or Space picks. A single date closes the calendar; a range closes after the end date.</li>
        <li>Each day is read with its full date; today is marked as the current date.</li>
      </UL>

      <Callout tone="warning">
        <strong className="text-white">Figma notes:</strong>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>In the Pop Up, the Month Header is absolutely positioned and overlaps the weekday row.</li>
          <li>The weekday color is 32% and the row is also at 50% opacity, so weekdays end up at about 16%.</li>
          <li>The Day Cell’s 44px hit area is offset from the cell (left −21.5px, top −28px), so it doesn’t center on the day. The build keeps the 32px cell as the target.</li>
          <li>Focus on unselected days isn’t visible in the Day Cell set; the build uses the teal ring.</li>
          <li>There’s no Disabled + Open variant, and no year or month picker.</li>
        </ul>
      </Callout>
    </>
  )
}
