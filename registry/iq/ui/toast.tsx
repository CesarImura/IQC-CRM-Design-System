"use client"

import * as React from "react"
import { Toaster as Sonner, toast as sonner, type ExternalToast, type ToasterProps } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/iq/ui/button"

// Figma: IQ Capital CRM Design System → Toast (2790:4950). Tone Neutral | Loading | Info | Success | Warning | Error;
// each tone keeps its own layout. Stacking, timers, swipe and the live region come from sonner.
// Needs the `toast-progress` and `toast-indeterminate` keyframes (shipped in the registry item's css).

type ToastTone = "neutral" | "loading" | "info" | "success" | "warning" | "error"

/* Icons: paths from the Figma assets (IBM Carbon). */
const iconPaths: Record<"info" | "success" | "warning" | "error", string> = {
  info: "M12 1.5C9.92329 1.5 7.89322 2.11581 6.16651 3.26957C4.43979 4.42332 3.09398 6.0632 2.29926 7.98182C1.50454 9.90045 1.2966 12.0116 1.70175 14.0484C2.10689 16.0852 3.10692 17.9562 4.57537 19.4246C6.04383 20.8931 7.91475 21.8931 9.95155 22.2982C11.9883 22.7034 14.0995 22.4955 16.0182 21.7007C17.9368 20.906 19.5767 19.5602 20.7304 17.8335C21.8842 16.1068 22.5 14.0767 22.5 12C22.5 9.21523 21.3937 6.54451 19.4246 4.57538C17.4555 2.60625 14.7848 1.5 12 1.5V1.5ZM12 6C12.2225 6 12.44 6.06598 12.625 6.1896C12.81 6.31321 12.9542 6.48891 13.0394 6.69448C13.1245 6.90005 13.1468 7.12625 13.1034 7.34448C13.06 7.56271 12.9528 7.76316 12.7955 7.9205C12.6382 8.07783 12.4377 8.18498 12.2195 8.22838C12.0012 8.27179 11.775 8.24951 11.5695 8.16436C11.3639 8.07922 11.1882 7.93502 11.0646 7.75002C10.941 7.56501 10.875 7.3475 10.875 7.125C10.875 6.82663 10.9935 6.54048 11.2045 6.3295C11.4155 6.11853 11.7016 6 12 6ZM15 18.0938H9V16.4062H11.1562V12.0938H9.75V10.4062H12.8437V16.4062H15V18.0938Z",
  success: "M12 1.5C9.92329 1.5 7.89322 2.11581 6.16651 3.26957C4.43979 4.42332 3.09398 6.0632 2.29926 7.98182C1.50454 9.90045 1.2966 12.0116 1.70175 14.0484C2.10689 16.0852 3.10692 17.9562 4.57537 19.4246C6.04383 20.8931 7.91475 21.8931 9.95155 22.2982C11.9883 22.7034 14.0995 22.4955 16.0182 21.7007C17.9368 20.906 19.5767 19.5602 20.7304 17.8335C21.8842 16.1068 22.5 14.0767 22.5 12C22.5 9.21523 21.3937 6.54451 19.4246 4.57538C17.4555 2.60625 14.7848 1.5 12 1.5ZM10.5 16.1931L6.75 12.4431L7.94295 11.25L10.5 13.8069L16.0575 8.25L17.2543 9.43943L10.5 16.1931Z",
  warning: "M10.9393 1.95315L1.95315 10.9393C1.3674 11.5251 1.3674 12.4749 1.95315 13.0606L10.9393 22.0468C11.5251 22.6326 12.4749 22.6326 13.0606 22.0468L22.0468 13.0606C22.6326 12.4749 22.6326 11.5251 22.0468 10.9393L13.0606 1.95315C12.4749 1.3674 11.5251 1.3674 10.9393 1.95315ZM11.25 6.75H12.75V13.5H11.25V6.75ZM12 17.25C11.3775 17.25 10.875 16.7475 10.875 16.125C10.875 15.5025 11.3775 15 12 15C12.6225 15 13.125 15.5025 13.125 16.125C13.125 16.7475 12.6225 17.25 12 17.25Z",
  error: "M12 1.49998C10.6187 1.49142 9.24948 1.75716 7.9717 2.2818C6.69391 2.80644 5.53299 3.57954 4.55627 4.55627C3.57954 5.53299 2.80644 6.69391 2.2818 7.9717C1.75716 9.24948 1.49142 10.6187 1.49998 12C1.49142 13.3813 1.75716 14.7505 2.2818 16.0283C2.80644 17.3061 3.57954 18.467 4.55627 19.4437C5.53299 20.4204 6.69391 21.1935 7.9717 21.7182C9.24948 22.2428 10.6187 22.5085 12 22.5C13.3813 22.5085 14.7505 22.2428 16.0283 21.7182C17.3061 21.1935 18.467 20.4204 19.4437 19.4437C20.4204 18.467 21.1935 17.3061 21.7182 16.0283C22.2428 14.7505 22.5085 13.3813 22.5 12C22.5085 10.6187 22.2428 9.24948 21.7182 7.9717C21.1935 6.69391 20.4204 5.53299 19.4437 4.55627C18.467 3.57954 17.3061 2.80644 16.0283 2.2818C14.7505 1.75716 13.3813 1.49142 12 1.49998ZM16.0837 17.25L6.74998 7.91676L7.91676 6.74998L17.25 16.0836L16.0837 17.25Z",
}
const renewPath =
  "M19.4625 5.73746L19.466 5.73453C19.3972 5.65248 19.3183 5.57996 19.2467 5.50016C19.1086 5.34633 18.9713 5.19266 18.824 5.04791C18.7204 4.94606 18.6098 4.85193 18.5015 4.75488C18.3642 4.63151 18.2273 4.50843 18.083 4.39308C17.9636 4.29716 17.8397 4.20813 17.7158 4.11806C17.5718 4.01306 17.4267 3.91046 17.2768 3.81341C17.1461 3.72881 17.0126 3.64931 16.8776 3.57056C16.7236 3.48126 16.5673 3.39606 16.4087 3.31496C16.2702 3.24431 16.1312 3.17651 15.9887 3.11246C15.8219 3.03746 15.6519 2.96891 15.4802 2.90298C15.3381 2.84876 15.1969 2.79386 15.0517 2.74623C14.867 2.68511 14.6782 2.63418 14.4887 2.58401C14.3501 2.54703 14.2131 2.50713 14.0721 2.47668C13.8546 2.42913 13.6322 2.39613 13.4096 2.36358C13.2904 2.34633 13.1738 2.32218 13.0531 2.30898C11.4515 2.13115 9.83089 2.35512 8.33759 2.96066C6.8443 3.56619 5.52538 4.53422 4.5 5.77728V2.99996H3V8.99996H9V7.49996H5.10863C5.85379 6.3501 6.87455 5.40473 8.0781 4.74981C9.28165 4.09489 10.6298 3.75119 12 3.74996C12.2979 3.75073 12.5956 3.76748 12.8918 3.80013C12.9939 3.81108 13.0928 3.83163 13.1937 3.84626C13.3819 3.87371 13.5698 3.90191 13.7538 3.94188C13.8732 3.96783 13.9896 4.00188 14.1072 4.03301C14.267 4.07516 14.4266 4.11836 14.5823 4.16966C14.7056 4.21068 14.8261 4.25718 14.9468 4.30331C15.0912 4.35896 15.2344 4.41648 15.3746 4.47948C15.4955 4.53401 15.6141 4.59198 15.7319 4.65198C15.8657 4.72013 15.9973 4.79181 16.1265 4.86701C16.2413 4.93398 16.355 5.00201 16.4663 5.07386C16.5923 5.15553 16.7144 5.24201 16.8355 5.32983C16.9409 5.40678 17.0468 5.48261 17.1482 5.56421C17.2694 5.66126 17.3849 5.76491 17.5007 5.86893C17.5926 5.95143 17.6866 6.03153 17.7746 6.11793C17.8997 6.24063 18.0164 6.37136 18.1335 6.50171C19.026 7.49726 19.663 8.69493 19.9895 9.99148C20.3161 11.288 20.3224 12.6445 20.008 13.9441C19.6935 15.2436 19.0677 16.4472 18.1846 17.451C17.3014 18.4548 16.1873 19.2288 14.9384 19.7062C13.6895 20.1836 12.3433 20.3501 11.0157 20.1914C9.68812 20.0326 8.41906 19.5534 7.31794 18.795C6.21682 18.0365 5.31667 17.0217 4.6951 15.8379C4.07352 14.6542 3.74917 13.337 3.75 12H2.25C2.24802 13.5683 2.62441 15.114 3.34724 16.5059C4.07007 17.8977 5.11799 19.0947 6.4021 19.9951C7.6862 20.8956 9.16858 21.473 10.7234 21.6784C12.2783 21.8837 13.8598 21.7109 15.3336 21.1747C16.8074 20.6385 18.1302 19.7546 19.1895 18.5981C20.2489 17.4416 21.0137 16.0466 21.4189 14.5315C21.8241 13.0164 21.8579 11.4259 21.5173 9.89497C21.1767 8.36404 20.4719 6.93786 19.4625 5.73746V5.73746Z"

const wellClass: Record<"info" | "success" | "warning" | "error", string> = {
  info: "bg-(--toast-icon-well-neutral) text-(color:--content-default) [&_svg]:opacity-(--toast-opacity-icon)",
  success: "bg-(--toast-icon-well-success) text-(color:--toast-icon-success)",
  warning: "bg-(--toast-icon-well-warning) text-(color:--toast-icon-warning)",
  error: "bg-(--toast-icon-well-error) text-(color:--toast-icon-error)",
}

const progressColor: Record<ToastTone, string> = {
  neutral: "bg-(--toast-progress-neutral)",
  loading: "bg-(--toast-progress-neutral)",
  info: "bg-(--toast-progress-neutral)",
  success: "bg-(--toast-progress-success)",
  warning: "bg-(--toast-progress-warning)",
  error: "bg-(--toast-progress-error)",
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z" />
    </svg>
  )
}

type ToastProps = Omit<React.ComponentProps<"div">, "title"> & {
  tone?: ToastTone
  title: React.ReactNode
  /** Info, Success, Warning and Error only. */
  description?: React.ReactNode
  /** Success, Warning and Error only, e.g. { label: "Undo", onClick }. */
  action?: { label: React.ReactNode; onClick: () => void }
  /** Shows the close button. */
  onClose?: () => void
  /** Milliseconds for the progress bar to run out; it pauses while the stack is hovered. Omit for a static bar. */
  duration?: number
}

/** The Toast surface. Use `toast.*()` with <Toaster /> to show them; render <Toast> directly only for static layouts. */
function Toast({ tone = "neutral", title, description, action, onClose, duration, className, ...props }: ToastProps) {
  const rich = tone === "info" || tone === "success" || tone === "warning" || tone === "error"
  const withAction = (tone === "success" || tone === "warning" || tone === "error") && action

  return (
    <div
      data-slot="toast"
      data-tone={tone}
      className={cn(
        "relative flex w-(--toast-width) max-w-full items-center gap-(--toast-gap) overflow-hidden rounded-(--toast-radius) border-(length:--toast-stroke) border-(--toast-border) bg-(--toast-surface) py-(--toast-padding-inset)",
        rich ? "px-(--toast-padding-inset)" : "px-(--toast-padding-x)",
        className
      )}
      {...props}
    >
      {tone === "loading" && (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="size-6 shrink-0 animate-spin text-(color:--content-default) opacity-(--toast-opacity-leading) [animation-direction:reverse] [animation-duration:1.5s] motion-reduce:animate-none"
        >
          <path d={renewPath} />
        </svg>
      )}
      {rich && (
        <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-(--toast-radius-icon)", wellClass[tone])}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
            <path d={iconPaths[tone]} />
          </svg>
        </span>
      )}

      {rich ? (
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-(length:--toast-font-title) leading-[1.3] font-medium text-(color:--toast-content-title)">{title}</p>
          {description && (
            <p className="text-(length:--toast-font-description) leading-normal text-(color:--toast-content-description)">{description}</p>
          )}
        </div>
      ) : (
        <p className="min-w-0 flex-1 text-(length:--toast-font-title) leading-[1.3] text-(color:--toast-content-body)">{title}</p>
      )}

      {(withAction || onClose) && (
        <div className="flex shrink-0 items-center gap-(--toast-gap-tight)">
          {withAction && (
            <Button variant="secondary" size="sm" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" size="icon-sm" aria-label="Dismiss" onClick={onClose} className="text-(color:--content-muted) hover:text-(color:--content-default)">
              <CloseIcon />
            </Button>
          )}
        </div>
      )}

      {/* Progress: 1px at the bottom; runs out over `duration`. Loading has no end, so it moves back and forth. */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
        <span
          className={cn(
            "block h-full origin-left",
            progressColor[tone],
            tone === "loading"
              ? "w-2/5 animate-[toast-indeterminate_1.6s_ease-in-out_infinite] motion-reduce:animate-none"
              : duration
                ? "w-full animate-[toast-progress_linear_forwards] [[data-sonner-toaster]:hover_&]:[animation-play-state:paused]"
                : "w-[65%]"
          )}
          style={duration && tone !== "loading" ? { animationDuration: `${duration}ms` } : undefined}
        />
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Toaster + toast()
 * -----------------------------------------------------------------------------------------------*/

const DEFAULT_DURATION = 5000

/** Mount once near the root. Bottom-right, 409px wide, newest on top. */
function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-right"
      gap={8}
      visibleToasts={4}
      style={{ "--width": "var(--toast-width)" } as React.CSSProperties}
      toastOptions={{ unstyled: true }}
      {...props}
    />
  )
}

type ToastOptions = Pick<ToastProps, "description" | "action"> &
  Pick<ExternalToast, "id" | "duration" | "onDismiss" | "onAutoClose"> & {
    /** Hide the close button. */
    dismissible?: boolean
  }

function show(tone: ToastTone, title: React.ReactNode, options: ToastOptions = {}) {
  const { description, action, dismissible = true, ...rest } = options
  const duration = tone === "loading" ? Infinity : (options.duration ?? DEFAULT_DURATION)
  return sonner.custom(
    (id) => (
      <Toast
        tone={tone}
        title={title}
        description={description}
        action={action && { label: action.label, onClick: () => { action.onClick(); sonner.dismiss(id) } }}
        onClose={dismissible ? () => sonner.dismiss(id) : undefined}
        duration={Number.isFinite(duration) ? duration : undefined}
      />
    ),
    { ...rest, duration }
  )
}

/**
 * toast("Saved"), toast.success("Deal won", { description, action: { label: "Undo", onClick } }).
 * Pass the id from toast.loading() to replace it: toast.success("Done", { id }).
 */
const toast = Object.assign((title: React.ReactNode, options?: ToastOptions) => show("neutral", title, options), {
  loading: (title: React.ReactNode, options?: ToastOptions) => show("loading", title, options),
  info: (title: React.ReactNode, options?: ToastOptions) => show("info", title, options),
  success: (title: React.ReactNode, options?: ToastOptions) => show("success", title, options),
  warning: (title: React.ReactNode, options?: ToastOptions) => show("warning", title, options),
  error: (title: React.ReactNode, options?: ToastOptions) => show("error", title, options),
  dismiss: sonner.dismiss,
})

export { Toast, Toaster, toast }
export type { ToastProps, ToastTone, ToastOptions }
