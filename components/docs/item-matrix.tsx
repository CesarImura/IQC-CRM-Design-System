import { Close, Link, Package } from "@carbon/icons-react"

import { Button } from "@/registry/iq/ui/button"
import { Item, type ItemSize, type ItemStyle } from "@/registry/iq/ui/item"

const sizes: ItemSize[] = ["sm", "md", "lg"]
const styles: { value: ItemStyle; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "outline", label: "Outline" },
  { value: "muted", label: "Muted" },
]

/** Item: Size × Style, plus the optional icon and trailing controls. */
export function ItemMatrix() {
  return (
    <div className="my-6 overflow-x-auto rounded-[2px] border border-grid">
      <table className="border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-16 px-4 py-3 text-left text-xs font-medium text-white/50">Size</th>
            {styles.map((s) => (
              <th key={s.value} scope="col" className="border-l border-grid px-4 py-3 text-xs font-medium text-white/80">{s.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes.map((size) => (
            <tr key={size} className="border-t border-grid">
              <th scope="row" className="px-4 text-left text-xs font-medium text-white/50">{size}</th>
              {styles.map((s) => (
                <td key={s.value} className="border-l border-grid p-5 align-top">
                  <div className="flex w-[360px] flex-col gap-3">
                    <Item size={size} variant={s.value} label="Item label placeholder" description="Item label placeholder" />
                    <Item
                      size={size}
                      variant={s.value}
                      icon={<Package />}
                      label="Quarterly report"
                      description="PDF · 2.4 MB"
                      trailing={
                        <>
                          <Button size="icon-sm" variant="ghost" aria-label="Open link" tabIndex={-1}>
                            <Link />
                          </Button>
                          <Button size="icon-sm" variant="ghost" aria-label="Dismiss" tabIndex={-1}>
                            <Close />
                          </Button>
                        </>
                      }
                    />
                    <Item
                      size={size}
                      variant={s.value}
                      label="Northwind Ventures"
                      trailing={
                        <Button size="sm" variant="secondary" tabIndex={-1}>
                          Action
                        </Button>
                      }
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
