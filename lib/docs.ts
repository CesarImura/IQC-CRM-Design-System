export const FIGMA_FILE =
  "https://www.figma.com/design/6gc2fkxSUQG7VaiOSUz30L/IQ-Capital-CRM-Design-System"

export function figmaNode(nodeId: string) {
  return `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`
}

export type NavItem = { title: string; href: string; badge?: string }
export type NavSection = { title: string; items: NavItem[] }

export const nav: NavSection[] = [
  {
    title: "Getting started",
    items: [
      { title: "Introduction", href: "/" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Foundations",
    items: [{ title: "Tokens", href: "/docs/tokens" }],
  },
  {
    title: "Components",
    items: [
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Data Table", href: "/docs/components/data-table" },
      { title: "Flag", href: "/docs/components/flag" },
      { title: "Pagination", href: "/docs/components/pagination" },
      { title: "Pill", href: "/docs/components/pill" },
      { title: "Stat Card", href: "/docs/components/stat-card" },
      { title: "Status Dot", href: "/docs/components/status-dot" },
      { title: "Value Slot", href: "/docs/components/value-slot" },
    ],
  },
]
