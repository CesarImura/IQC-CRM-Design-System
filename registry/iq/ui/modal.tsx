"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"
import { backdropClasses, type BackdropIntensity } from "@/registry/iq/ui/backdrop"

// Figma: IQ Capital CRM Design System → Modal (1369:21195): Size Small | Medium | Large × Intent Default | Danger.
// Parts: _Modal / Header (409:27017), _Modal / Body (1369:20812, Scroll Auto | Fixed), _Modal / Footer (409:27638,
// Layout Double | Split | Stack | Single), _Modal / Overlay (1369:21551: Backdrop Default + Soft blur).
// Built on Radix Dialog: focus is trapped, Esc and the close button dismiss, the page behind doesn't scroll.

type ModalSize = "sm" | "md" | "lg"

const sizeClass: Record<ModalSize, string> = {
  sm: "w-[min(var(--modal-width-sm),calc(100vw-32px))]",
  md: "w-[min(var(--modal-width-md),calc(100vw-32px))]",
  lg: "w-[min(var(--modal-width-lg),calc(100vw-32px))]",
}

const surfaceClass =
  "flex max-h-[calc(100dvh-32px)] flex-col overflow-hidden rounded-(--modal-radius) border border-(--modal-border) bg-(--modal-surface) pt-(--modal-padding) shadow-[0_16px_48px_0_var(--modal-shadow)] outline-none"

// Header parts use Radix Title / Description inside a live dialog, plain elements in static previews.
const InDialogContext = React.createContext(false)

const Modal = DialogPrimitive.Root
const ModalTrigger = DialogPrimitive.Trigger
const ModalClose = DialogPrimitive.Close

type ModalContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  size?: ModalSize
  /** Backdrop intensity. Figma's overlay uses Default with the soft blur. */
  backdrop?: BackdropIntensity
  backdropBlur?: boolean
}

/** The dialog: backdrop + centered surface. Put ModalHeader, ModalBody and ModalFooter inside. */
function ModalContent({ size = "md", backdrop = "default", backdropBlur = true, className, children, ...props }: ModalContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        data-slot="modal-backdrop"
        className={cn(
          "fixed inset-0 z-50",
          backdropClasses(backdrop, backdropBlur),
          "data-[state=open]:animate-[overlay-in_var(--modal-motion-in)_ease-out] data-[state=closed]:animate-[overlay-out_var(--modal-motion-out)_ease-in_forwards] motion-reduce:animate-none"
        )}
      />
      <DialogPrimitive.Content
        data-slot="modal"
        data-size={size}
        className={cn(
          surfaceClass,
          sizeClass[size],
          "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
          "data-[state=open]:animate-[modal-in_var(--modal-motion-in)_cubic-bezier(0.16,1,0.3,1)] data-[state=closed]:animate-[modal-out_var(--modal-motion-out)_ease-in_forwards] motion-reduce:animate-none",
          className
        )}
        {...props}
      >
        <InDialogContext.Provider value={true}>{children}</InDialogContext.Provider>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

/** The same surface without a dialog, for documentation and static layouts. */
function ModalPanel({ size = "md", className, ...props }: React.ComponentProps<"div"> & { size?: ModalSize }) {
  return <div data-slot="modal-panel" data-size={size} className={cn(surfaceClass, sizeClass[size], className)} {...props} />
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z" />
    </svg>
  )
}

type ModalHeaderProps = Omit<React.ComponentProps<"div">, "title"> & {
  title: React.ReactNode
  description?: React.ReactNode
  /** Small label above the title (Figma "Optional label"). */
  eyebrow?: React.ReactNode
  /** Show the close button. Default true. */
  closable?: boolean
  closeLabel?: string
}

/** _Modal / Header: optional eyebrow, title, description and the close button. */
function ModalHeader({ title, description, eyebrow, closable = true, closeLabel = "Close", className, ...props }: ModalHeaderProps) {
  const inDialog = React.useContext(InDialogContext)
  const Title = inDialog ? DialogPrimitive.Title : "h2"
  const Description = inDialog ? DialogPrimitive.Description : "p"
  const closeClass =
    "flex size-(--modal-close-hit) shrink-0 cursor-pointer items-center justify-center rounded-(--radius-control) text-(color:--content-default) opacity-(--modal-close-opacity) outline-none transition-opacity hover:opacity-80 focus-visible:opacity-100 focus-visible:shadow-[0_0_0_var(--focus-spread)_var(--focus-ring)]"
  return (
    <div data-slot="modal-header" className={cn("flex items-center gap-2 px-(--modal-padding) pb-(--modal-gap)", className)} {...props}>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {eyebrow && <p className="text-xs leading-[18px] text-(color:--modal-body) opacity-70">{eyebrow}</p>}
        <Title className="text-base leading-6 font-medium text-(color:--modal-title)">{title}</Title>
        {description && <Description className="text-sm leading-[21px] text-(color:--modal-body)">{description}</Description>}
      </div>
      {closable &&
        (inDialog ? (
          <DialogPrimitive.Close aria-label={closeLabel} className={closeClass}>
            <CloseIcon />
          </DialogPrimitive.Close>
        ) : (
          <button type="button" aria-label={closeLabel} className={closeClass} tabIndex={-1}>
            <CloseIcon />
          </button>
        ))}
    </div>
  )
}

type ModalBodyProps = React.ComponentProps<"div"> & {
  /** Auto: grows with the content (up to the screen). Fixed: capped at 384px and scrolls. */
  scroll?: "auto" | "fixed"
}

/** _Modal / Body: the slot. 24px sides, 16px between blocks, 14px body text. */
function ModalBody({ scroll = "auto", className, ...props }: ModalBodyProps) {
  return (
    <div
      data-slot="modal-body"
      data-scroll={scroll}
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-(--modal-gap) overflow-y-auto px-(--modal-padding) [&>*]:shrink-0 text-sm leading-[21px] text-(color:--modal-body) [scrollbar-color:var(--border-grid)_transparent] [scrollbar-width:thin]",
        scroll === "fixed" && "max-h-(--modal-body-max-height) flex-none",
        className
      )}
      {...props}
    />
  )
}

type ModalFooterLayout = "double" | "split" | "stack" | "single"

const footerLayout: Record<ModalFooterLayout, string> = {
  // Figma Double: the two buttons side by side, aligned to the start.
  double: "flex-row items-center justify-start",
  split: "flex-row items-center justify-between",
  stack: "flex-col items-stretch [&>*]:w-full",
  single: "flex-col items-stretch [&>*]:w-full",
}

/** _Modal / Footer: 24px padding, 8px between buttons. Stack puts the primary action first. */
function ModalFooter({ layout = "double", className, ...props }: React.ComponentProps<"div"> & { layout?: ModalFooterLayout }) {
  return <div data-slot="modal-footer" data-layout={layout} className={cn("flex gap-2 p-(--modal-padding)", footerLayout[layout], className)} {...props} />
}

export { Modal, ModalTrigger, ModalClose, ModalContent, ModalPanel, ModalHeader, ModalBody, ModalFooter }
export type { ModalSize, ModalContentProps, ModalHeaderProps, ModalBodyProps, ModalFooterLayout }
