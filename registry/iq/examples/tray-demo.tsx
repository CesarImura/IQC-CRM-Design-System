"use client"

import { Button } from "@/registry/iq/ui/button"
import { Dropdown } from "@/registry/iq/ui/combobox"
import { FieldGrid, FieldGridRow } from "@/registry/iq/ui/field-grid"
import { StatusDot } from "@/registry/iq/ui/status-dot"
import { Tabs, TabsContent, TabsLineList, TabsLineTrigger } from "@/registry/iq/ui/tabs"
import { Tray, TrayBody, TrayContent, TrayHeader, TraySection, TrayTrigger } from "@/registry/iq/ui/tray"

function Details() {
  return (
    <Tabs defaultValue="overview" className="flex min-h-0 flex-1 flex-col gap-0">
      <TrayHeader
        title="Cesar Imura"
        description="cesar.imura@gmail.com"
        onCollapse={() => {}}
        status={
          <>
            <StatusDot tone="warning">KYC pending</StatusDot>
            <StatusDot tone="neutral">Customer since Jan 2026</StatusDot>
            <StatusDot tone="neutral">Brazil</StatusDot>
          </>
        }
        actions={
          <>
            <Button size="md">Send message</Button>
            <Dropdown label="More" hideLabel placeholder="More" size="md" search={false} options={[{ value: "edit", label: "Edit" }, { value: "archive", label: "Archive" }]} />
          </>
        }
        tabs={
          <TabsLineList divider="both">
            <TabsLineTrigger value="overview">Overview</TabsLineTrigger>
            <TabsLineTrigger value="orders" count={4}>
              Orders
            </TabsLineTrigger>
            <TabsLineTrigger value="notes">Notes</TabsLineTrigger>
          </TabsLineList>
        }
      />
      <TrayBody>
        <TabsContent value="overview">
          <TraySection title="Details">
            <FieldGrid>
              <FieldGridRow label="Name" copyValue="Cesar Imura">Cesar Imura</FieldGridRow>
              <FieldGridRow label="Email" copyValue="cesar.imura@gmail.com">cesar.imura@gmail.com</FieldGridRow>
              <FieldGridRow label="Plan">Pro · yearly</FieldGridRow>
              <FieldGridRow label="Country">Brazil</FieldGridRow>
            </FieldGrid>
          </TraySection>
          <TraySection title="Purchases" inset="page">
            <div className="grid grid-cols-3 gap-4 text-sm">
              {[
                ["First purchase", "12 Jan, 2026"],
                ["Last purchase", "28 Aug, 2026"],
                ["Customer for", "7 months"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col">
                  <span className="text-white/50">{k}</span>
                  <span className="text-base text-white">{v}</span>
                </div>
              ))}
            </div>
          </TraySection>
        </TabsContent>
        <TabsContent value="orders">
          <TraySection title="Orders">
            <p className="px-2 text-sm text-white/50">Four orders in the last 90 days.</p>
          </TraySection>
        </TabsContent>
        <TabsContent value="notes">
          <TraySection title="Notes">
            <p className="px-2 text-sm text-white/50">No notes yet.</p>
          </TraySection>
        </TabsContent>
      </TrayBody>
    </Tabs>
  )
}

export default function TrayDemo() {
  return (
    <Tray>
      <TrayTrigger asChild>
        <Button variant="secondary">Open customer</Button>
      </TrayTrigger>
      <TrayContent>
        <Details />
      </TrayContent>
    </Tray>
  )
}

export { Details as TrayDetails }
