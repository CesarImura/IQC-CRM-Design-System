"use client"

import { ListBulleted } from "@carbon/icons-react"

import { Tabs, TabsPillList, TabsPillTrigger } from "@/registry/iq/ui/tabs"

export default function TabsPillDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Tabs defaultValue="overview">
        <TabsPillList aria-label="Sections">
          <TabsPillTrigger value="overview">Overview</TabsPillTrigger>
          <TabsPillTrigger value="analytics">Analytics</TabsPillTrigger>
          <TabsPillTrigger value="reports">Reports</TabsPillTrigger>
          <TabsPillTrigger value="settings" disabled>
            Settings
          </TabsPillTrigger>
        </TabsPillList>
      </Tabs>
      <Tabs defaultValue="all">
        <TabsPillList aria-label="Deals">
          <TabsPillTrigger value="all" icon={<ListBulleted />} count={12}>
            All
          </TabsPillTrigger>
          <TabsPillTrigger value="open" icon={<ListBulleted />} count={8}>
            Open
          </TabsPillTrigger>
          <TabsPillTrigger value="won" icon={<ListBulleted />} count={2}>
            Won
          </TabsPillTrigger>
        </TabsPillList>
      </Tabs>
    </div>
  )
}
