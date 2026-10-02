"use client"

import { Badge } from "@/registry/iq/ui/badge"
import { FieldGrid, FieldGridRow } from "@/registry/iq/ui/field-grid"
import { ValueLink, ValueMono } from "@/registry/iq/ui/value-slot"

export default function FieldGridDemo() {
  return (
    <div className="w-full max-w-[447px] border border-grid">
      <FieldGrid>
        <FieldGridRow label="Company" copyValue="Acme Robotics" badge={<Badge color="green" size="sm">Active</Badge>}>
          Acme Robotics
        </FieldGridRow>
        <FieldGridRow label="Deal ID" copyValue="3083cd1f-cff2">
          <ValueMono>3083cd1f-cff2</ValueMono>
        </FieldGridRow>
        <FieldGridRow label="Contact" copyValue="ana@acme.com">
          <ValueLink href="mailto:ana@acme.com">ana@acme.com</ValueLink>
        </FieldGridRow>
        <FieldGridRow label="Round">Series A</FieldGridRow>
        <FieldGridRow label="Amount" copyValue="$12,500,000">$12,500,000</FieldGridRow>
        <FieldGridRow label="Close date">29 Sep 2026</FieldGridRow>
      </FieldGrid>
    </div>
  )
}
