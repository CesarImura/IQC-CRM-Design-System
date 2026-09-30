import Image from "next/image"
import { UserAvatar } from "@carbon/icons-react"

import { Badge, DeltaBadge } from "@/registry/iq/ui/badge"
import { Pill } from "@/registry/iq/ui/pill"
import { StatusDot } from "@/registry/iq/ui/status-dot"
import {
  ValueDate,
  ValueExchange,
  ValueLink,
  ValueMono,
  ValueNumber,
  ValuePhone,
  ValueText,
} from "@/registry/iq/ui/value-slot"

export default function ValueSlotDemo() {
  const rows = [
    ["Text", <ValueText key="t">Name</ValueText>],
    ["Mono", <ValueMono key="m" title="3083cd1f-cffe-454c-9f30-f55a11fbece3">3083cd1f-cffe-454c-9f30-f55a11fbece3</ValueMono>],
    ["Badge", <Badge key="b" color="blue">Admin</Badge>],
    ["Delta", <DeltaBadge key="d">+18%</DeltaBadge>],
    ["Date", <ValueDate key="dt" date="13 Aug, 2026" time="23:04" dateTime="2026-08-13T23:04" />],
    ["Status Dot", <StatusDot key="s">Label</StatusDot>],
    ["Link", <ValueLink key="l" href="mailto:cesar@yunicorn.vc">cesar@yunicorn.vc</ValueLink>],
    ["Number", <ValueNumber key="n">40,97</ValueNumber>],
    ["Phone", <ValuePhone key="p" href="tel:+55148734759">+55 14873-4759</ValuePhone>],
    ["Pill", <Pill key="pl" icon={<UserAvatar />}>user@email.com</Pill>],
    ["Exchange", <ValueExchange key="e" logo={<Image src="/examples/dxfeed.svg" alt="" width={24} height={24} />}>dxFeed</ValueExchange>],
  ] as const

  return (
    <table className="w-full max-w-md text-left">
      <tbody>
        {rows.map(([type, value]) => (
          <tr key={type} className="border-b border-white/5 last:border-0">
            <th scope="row" className="w-32 py-3 pr-4 text-xs font-normal text-white/40">
              {type}
            </th>
            <td className="max-w-[210px] py-3">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
