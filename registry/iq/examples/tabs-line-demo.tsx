"use client"

import { ListBulleted } from "@carbon/icons-react"

import { Tabs, TabsContent, TabsLineList, TabsLineTrigger } from "@/registry/iq/ui/tabs"

export default function TabsLineDemo() {
  return (
    <Tabs defaultValue="activity" className="w-full gap-0">
      <TabsLineList aria-label="Record">
        <TabsLineTrigger value="activity" icon={<ListBulleted />}>Activity</TabsLineTrigger>
        <TabsLineTrigger value="deals" icon={<ListBulleted />} tone="accent" count={3}>Deals</TabsLineTrigger>
        <TabsLineTrigger value="tasks" icon={<ListBulleted />} tone="warning" count={2}>Tasks</TabsLineTrigger>
        <TabsLineTrigger value="issues" icon={<ListBulleted />} tone="danger" count={1}>Issues</TabsLineTrigger>
        <TabsLineTrigger value="files" disabled>Files</TabsLineTrigger>
      </TabsLineList>
      {["activity", "deals", "tasks", "issues"].map((v) => (
        <TabsContent key={v} value={v} className="px-6 py-5 text-sm text-white/60">
          {v[0].toUpperCase() + v.slice(1)} for this record.
        </TabsContent>
      ))}
    </Tabs>
  )
}
