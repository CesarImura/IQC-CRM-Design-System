import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Figma: IQ Capital CRM Design System → Button (343:19033), Button / Icon Only (1335:2522).
// Hover, Pressed and Focus map to :hover, :active and :focus-visible; Disabled and Loading are props.
const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-(--button-spacing-gap)",
    "whitespace-nowrap rounded-(--button-radius-control) border-(length:--button-stroke-default) border-transparent",
    "font-medium outline-none select-none transition-[color,background-color,border-color,box-shadow] duration-100",
    "disabled:pointer-events-none aria-busy:pointer-events-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-(--button-primary-bg-default) text-(color:--button-filled-content-default)",
          "hover:bg-(--button-primary-bg-hover) active:bg-(--button-primary-bg-pressed)",
          "focus-visible:border-(--focus-stroke-on-fill) focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
          "disabled:bg-(--button-primary-bg-disabled) disabled:text-(color:--button-filled-content-disabled)",
        ],
        secondary: [
          // Label and icon sit at 70% in Default and Hover, full white when pressed or focused.
          "border-(--button-secondary-border-default) bg-(--button-secondary-bg-default) text-[color-mix(in_srgb,var(--button-neutral-content-default)_calc(var(--button-neutral-content-rest-opacity)*100%),transparent)]",
          "hover:border-(--button-secondary-border-active) hover:bg-(--button-secondary-bg-hover)",
          "active:border-(--button-secondary-border-active) active:bg-(--button-secondary-bg-pressed) active:text-(color:--button-neutral-content-active)",
          "focus-visible:text-(color:--button-neutral-content-default) focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
          "disabled:border-(--button-secondary-border-disabled) disabled:bg-(--button-secondary-bg-disabled) disabled:text-(color:--button-neutral-content-disabled)",
        ],
        ghost: [
          "bg-(--form-field-surface-transparent) text-[color-mix(in_srgb,var(--button-neutral-content-default)_calc(var(--button-neutral-content-rest-opacity)*100%),transparent)]",
          "active:bg-(--button-ghost-bg-pressed) active:text-(color:--button-neutral-content-active)",
          "focus-visible:text-(color:--button-neutral-content-default) focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]",
          "disabled:text-(color:--button-neutral-content-disabled)",
        ],
        danger: [
          "bg-(--button-danger-bg-default) text-(color:--button-filled-content-default)",
          "hover:bg-(--button-danger-bg-hover) active:bg-(--button-danger-bg-pressed)",
          "focus-visible:border-(--focus-stroke-on-fill) focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-danger)]",
          "disabled:bg-(--button-danger-bg-disabled) disabled:text-(color:--button-filled-content-disabled)",
        ],
        "danger-outline": [
          "border-(--button-danger-content-default) bg-(--form-field-surface-transparent) text-(color:--button-danger-content-default)",
          "hover:bg-(--button-danger-bg-subtle-hover) active:bg-(--button-danger-bg-subtle-pressed)",
          "focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-danger)]",
          "disabled:border-(--button-danger-content-disabled) disabled:text-(color:--button-danger-content-disabled)",
        ],
      },
      size: {
        xs: "h-(--button-size-xs-height) px-(--button-size-xs-padding-x) text-(length:--font-size-xs) leading-(--line-height-xs) [&_svg:not([class*='size-'])]:size-(--button-size-xs-icon)",
        sm: "h-(--button-size-sm-height) px-(--button-size-sm-padding-x) text-(length:--font-size-sm) leading-(--line-height-sm) [&_svg:not([class*='size-'])]:size-(--button-size-sm-icon)",
        md: "h-(--button-size-md-height) px-(--button-size-md-padding-x) text-(length:--font-size-md) leading-(--line-height-md) [&_svg:not([class*='size-'])]:size-(--button-size-md-icon)",
        lg: "h-(--button-size-lg-height) px-(--button-size-lg-padding-x) text-(length:--font-size-lg) leading-(--line-height-lg) [&_svg:not([class*='size-'])]:size-(--button-size-lg-icon)",
        "icon-xs": "size-(--button-size-xs-height) [&_svg:not([class*='size-'])]:size-(--button-size-xs-icon)",
        "icon-sm": "size-(--button-size-sm-height) [&_svg:not([class*='size-'])]:size-(--button-size-sm-icon)",
        icon: "size-(--button-size-md-height) [&_svg:not([class*='size-'])]:size-(--button-size-md-icon)",
        "icon-lg": "size-(--button-size-lg-height) [&_svg:not([class*='size-'])]:size-(--button-size-lg-icon)",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render the child element (e.g. a Next.js `<Link>`) with button styles. `loading` is ignored. */
    asChild?: boolean
    /** Shows the loading indicator, keeps the button's width and blocks clicks. */
    loading?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  children,
  onClick,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Slot>
    )
  }

  return (
    <button
      data-slot="button"
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={
        // Keyboard activation still fires click events, so guard here as well as with pointer-events.
        // Only attach a handler when needed so the Button stays usable from Server Components.
        loading
          ? (event) => event.preventDefault()
          : onClick
      }
      {...props}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center gap-(--button-spacing-gap)",
          loading && "invisible"
        )}
      >
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
          <span className="sr-only">Loading</span>
        </span>
      )}
    </button>
  )
}

// Figma "Loading indicator" (IBM Carbon Renew), recolored with currentColor.
function Spinner() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className="animate-spin [animation-direction:reverse] motion-reduce:animate-none"
    >
      <path d="M12.975 3.82497L12.9774 3.82302C12.9315 3.76832 12.8789 3.71997 12.8311 3.66677C12.7391 3.56422 12.6475 3.46177 12.5494 3.36527C12.4803 3.29737 12.4066 3.23462 12.3344 3.16992C12.2428 3.08767 12.1515 3.00562 12.0553 2.92872C11.9757 2.86477 11.8931 2.80542 11.8106 2.74537C11.7145 2.67537 11.6178 2.60697 11.5179 2.54227C11.4307 2.48587 11.3417 2.43287 11.2518 2.38037C11.1491 2.32084 11.0448 2.26404 10.9391 2.20997C10.8468 2.16287 10.7541 2.11767 10.6591 2.07497C10.5479 2.02497 10.4346 1.97927 10.3201 1.93532C10.2254 1.89917 10.1313 1.86257 10.0345 1.83082C9.9113 1.79007 9.78545 1.75612 9.6591 1.72267C9.5667 1.69802 9.4754 1.67142 9.3814 1.65112C9.2364 1.61942 9.08815 1.59742 8.93975 1.57572C8.86025 1.56422 8.7825 1.54812 8.70205 1.53932C7.63435 1.42077 6.55393 1.57008 5.5584 1.97377C4.56286 2.37746 3.68359 3.02281 3 3.85152V1.99997H2V5.99997H6V4.99997H3.40575C3.90253 4.2334 4.58303 3.60316 5.3854 3.16654C6.18776 2.72993 7.08654 2.50079 8 2.49997C8.19862 2.50049 8.39708 2.51165 8.5945 2.53342C8.6626 2.54072 8.7285 2.55442 8.7958 2.56417C8.92125 2.58247 9.0465 2.60127 9.1692 2.62792C9.2488 2.64522 9.3264 2.66792 9.4048 2.68867C9.51135 2.71677 9.6177 2.74557 9.72155 2.77977C9.8037 2.80712 9.88405 2.83812 9.9645 2.86887C10.0608 2.90597 10.1563 2.94432 10.2498 2.98632C10.3303 3.02267 10.4094 3.06132 10.4879 3.10132C10.5771 3.14676 10.6648 3.19454 10.751 3.24467C10.8275 3.28932 10.9033 3.33467 10.9776 3.38257C11.0615 3.43702 11.143 3.49467 11.2237 3.55322C11.294 3.60452 11.3645 3.65507 11.4322 3.70947C11.513 3.77417 11.59 3.84327 11.6672 3.91262C11.7284 3.96762 11.7911 4.02102 11.8498 4.07862C11.9332 4.16042 12.0109 4.24757 12.089 4.33447C12.684 4.99817 13.1086 5.79662 13.3263 6.66099C13.544 7.52535 13.5483 8.42969 13.3386 9.29605C13.129 10.1624 12.7118 10.9648 12.123 11.634C11.5343 12.3032 10.7916 12.8192 9.95896 13.1375C9.12636 13.4557 8.22885 13.5668 7.3438 13.4609C6.45874 13.3551 5.61271 13.0356 4.87863 12.53C4.14455 12.0244 3.54445 11.3478 3.13007 10.5586C2.71568 9.76945 2.49945 8.89133 2.5 7.99997H1.5C1.49868 9.04555 1.74961 10.076 2.23149 11.0039C2.71338 11.9318 3.412 12.7298 4.26807 13.3301C5.12413 13.9304 6.11239 14.3153 7.14896 14.4522C8.18553 14.5891 9.23983 14.4739 10.2224 14.1165C11.205 13.759 12.0868 13.1697 12.793 12.3987C13.4993 11.6277 14.0091 10.6977 14.2793 9.68767C14.5494 8.67761 14.5719 7.61727 14.3449 6.59665C14.1178 5.57603 13.6479 4.62524 12.975 3.82497V3.82497Z" />
    </svg>
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
