"use client"

import { useState } from "react"
import { Analytics, Catalog, Chat, Home, Integration, Notification, Purchase, Settings, UserMultiple } from "@carbon/icons-react"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/registry/iq/ui/breadcrumb"
import { Button } from "@/registry/iq/ui/button"
import { SearchBar } from "@/registry/iq/ui/search-bar"
import { SideMenu, SideMenuDivider, SideMenuLink, SideMenuSection, SubMenu, SubMenuGroup, TopMenu } from "@/registry/iq/ui/navigation"

const sections = [
  [{ label: "Customers & transactions", icon: <UserMultiple /> }, { label: "Payments, fraud & risk", icon: <Purchase /> }],
  [{ label: "Catalog, pricing & discounts", icon: <Catalog /> }, { label: "Reporting & analytics", icon: <Analytics /> }, { label: "Communication", icon: <Chat /> }],
  [{ label: "Integrations & system", icon: <Integration /> }],
]

export default function NavigationDemo() {
  const [expanded, setExpanded] = useState(true)
  const [current, setCurrent] = useState("Customers & transactions")
  return (
    <div className="flex h-[560px] w-full flex-col overflow-hidden rounded-[2px] border border-grid">
      <TopMenu
        brand={<span className="flex size-10 items-center justify-center rounded-[2px] bg-(--primitive-accent-10) text-sm font-semibold text-(--accent)">IQ</span>}
        trail={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{current}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
        actions={
          <>
            <div className="hidden w-60 sm:block">
              <SearchBar placeholder="Search" />
            </div>
            <Button variant="secondary" size="icon-sm" aria-label="Notifications">
              <Notification />
            </Button>
            <Button variant="secondary" size="icon-sm" aria-label="Settings">
              <Settings />
            </Button>
          </>
        }
      />
      <div className="flex min-h-0 flex-1">
        <SideMenu expanded={expanded} aria-label="Main">
          <SideMenuLink label="Admin Panel" icon={<Home />} href="#" onClick={(e) => { e.preventDefault(); setExpanded((v) => !v) }} />
          {sections.map((links, i) => (
            <div key={i} className="contents">
              <SideMenuDivider />
              <SideMenuSection>
                {links.map((l) => (
                  <SideMenuLink
                    key={l.label}
                    label={l.label}
                    icon={l.icon}
                    href="#"
                    active={current === l.label}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrent(l.label)
                    }}
                  />
                ))}
              </SideMenuSection>
            </div>
          ))}
        </SideMenu>
        <SubMenu title={current} aria-label="Section" className="hidden md:flex">
          <SubMenuGroup label="Manage">
            <SideMenuLink label="Users" href="#" active />
            <SideMenuLink label="Orders" href="#" />
            <SideMenuLink label="Subscriptions" href="#" />
            <SideMenuLink label="Renewals" href="#" />
          </SubMenuGroup>
        </SubMenu>
        <div className="flex-1 p-6 text-sm text-white/40">Click “Admin Panel” to collapse or expand the rail.</div>
      </div>
    </div>
  )
}
