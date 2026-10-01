import { PartnerLogo } from "@/registry/iq/ui/partner-logo"

export default function PartnerLogoDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <PartnerLogo partner="dxFeed" size="md" />
      <PartnerLogo partner="Trading View" size="md" />
      <PartnerLogo partner="Ninja Trader" size="md" />
    </div>
  )
}
