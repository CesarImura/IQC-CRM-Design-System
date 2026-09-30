import { Badge, type BadgeColor } from "@/registry/iq/ui/badge"

const colors: BadgeColor[] = ["gray", "white", "blue", "green", "yellow", "red", "purple"]
const sizes = ["sm", "md", "lg"] as const
const variants = ["filled", "outline", "ghost"] as const

/** Mirrors the Figma Badge matrix: Size × Style rows, Color columns. */
export function BadgeMatrix() {
  return (
    <div className="overflow-x-auto rounded-[2px] border border-grid">
      <table className="w-full min-w-[820px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-grid">
            <th scope="col" className="w-32 px-4 py-3 text-left text-xs font-medium text-white/50">Size · Style</th>
            {colors.map((c) => (
              <th key={c} scope="col" className="border-l border-grid px-3 py-3 text-xs font-medium text-white/80 capitalize">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes.flatMap((size) =>
            variants.map((variant, i) => (
              <tr key={`${size}-${variant}`} className={i === 0 ? "border-t border-grid" : undefined}>
                <th scope="row" className="px-4 py-3 text-left text-xs font-normal text-white/50">
                  <span className="text-white/80 uppercase">{size}</span> · {variant}
                </th>
                {colors.map((color) => (
                  <td key={color} className="border-l border-grid px-3 py-3 text-center">
                    <Badge color={color} variant={variant} size={size} dot>
                      Label
                    </Badge>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
