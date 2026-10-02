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
    ],
  },
  {
    title: "Foundations",
    items: [
      { title: "Tokens", href: "/docs/tokens" },
      { title: "Typography", href: "/docs/typography" },
      { title: "Page Grid", href: "/docs/page-grid" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Backdrop", href: "/docs/components/backdrop" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Combobox", href: "/docs/components/combobox" },
      { title: "Data Table", href: "/docs/components/data-table" },
      { title: "Date Picker", href: "/docs/components/date-picker" },
      { title: "Dropdown", href: "/docs/components/dropdown" },
      { title: "Empty", href: "/docs/components/empty" },
      { title: "Flag", href: "/docs/components/flag" },
      { title: "Form Field", href: "/docs/components/form-field" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Item", href: "/docs/components/item" },
      { title: "Label Block", href: "/docs/components/label-block" },
      { title: "Line Chart", href: "/docs/components/line-chart" },
      { title: "Modal", href: "/docs/components/modal" },
      { title: "Option Panel", href: "/docs/components/option-panel" },
      { title: "Page Header", href: "/docs/components/page-header" },
      { title: "Pagination", href: "/docs/components/pagination" },
      { title: "Partner Logo", href: "/docs/components/partner-logo" },
      { title: "Pill", href: "/docs/components/pill" },
      { title: "Radio Group", href: "/docs/components/radio-group" },
      { title: "Ring Chart", href: "/docs/components/ring-chart" },
      { title: "Scroll Bar", href: "/docs/components/scroll-bar" },
      { title: "Search Bar", href: "/docs/components/search-bar" },
      { title: "Selection Bar", href: "/docs/components/selection-bar" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Stat Card", href: "/docs/components/stat-card" },
      { title: "Status Dot", href: "/docs/components/status-dot" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Text Area", href: "/docs/components/text-area" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Toggle", href: "/docs/components/toggle" },
      { title: "Toolbar", href: "/docs/components/toolbar" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Trigger", href: "/docs/components/trigger" },
      { title: "Value Slot", href: "/docs/components/value-slot" },
    ],
  },
]
