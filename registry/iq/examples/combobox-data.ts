import type { ComboboxOption } from "@/registry/iq/ui/combobox"

export const owners: ComboboxOption[] = [
  { value: "ana", label: "Ana Souza", secondary: "ana@iqcapital.com", group: "Sales" },
  { value: "bruno", label: "Bruno Lima", secondary: "bruno@iqcapital.com", group: "Sales" },
  { value: "carla", label: "Carla Mendes", secondary: "carla@iqcapital.com", group: "Sales" },
  { value: "diego", label: "Diego Rocha", secondary: "diego@iqcapital.com", group: "Partnerships" },
  { value: "elisa", label: "Elisa Prado", secondary: "elisa@iqcapital.com", group: "Partnerships", disabled: true },
]

export const stages: ComboboxOption[] = [
  { value: "lead", label: "Lead", group: "Open" },
  { value: "qualified", label: "Qualified", group: "Open" },
  { value: "proposal", label: "Proposal", group: "Open" },
  { value: "stalled", label: "Stalled", tone: "warning", group: "Attention" },
  { value: "lost", label: "Lost", tone: "danger", group: "Attention" },
]

export const domains: ComboboxOption[] = [
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "yahoo.com",
  "iqcapital.com",
  "proton.me",
].map((d) => ({ value: d, label: d, group: "Domains" }))
