"use client"

import * as React from "react"
import { CheckmarkFilled, Close, Copy, Renew, Play, Money } from "@carbon/icons-react"

import { BalanceRangeChart, BalanceRangeLegend, BalanceRangeRail, BalanceRangeRailBlock, maxLossLevels, type BalanceSession } from "@/registry/iq/ui/balance-range-chart"
import { Button } from "@/registry/iq/ui/button"
import { Modal, ModalBody, ModalClose, ModalContent, ModalFooter, ModalHeader } from "@/registry/iq/ui/modal"
import { Tabs, TabsPillList, TabsPillTrigger } from "@/registry/iq/ui/tabs"
import { toast } from "@/registry/iq/ui/toast"

import {
  DAILY_LIMIT,
  MAX_LOSS,
  SCRIPT,
  START,
  TARGET,
  TRAILING,
  WIN_SCRIPT,
  money,
  nextSession,
  seed,
  signed,
  winningRun,
  type Scenario,
} from "@/registry/iq/examples/balance-range-chart-data"

type BalanceRangeChartDemoProps = {
  /** Preview only: start in Funded mode. */
  initialMode?: "challenge" | "funded"
  /** Preview only: pin the hover on a session (1-based), e.g. for screenshots. */
  pinnedSession?: number
  /** Which recorded run to start from. */
  initialScenario?: Scenario
  /** Preview only (Profit run): play the winning sessions on load to show the target-reached state. */
  autoPass?: boolean
  /** With autoPass: open the celebration modal (default) or show only the chart. */
  autoPassModal?: boolean
}

export default function BalanceRangeChartDemo({
  initialMode = "challenge",
  pinnedSession,
  initialScenario = "profit",
  autoPass = false,
  autoPassModal = true,
}: BalanceRangeChartDemoProps = {}) {
  const [mode, setMode] = React.useState<"challenge" | "funded">(initialMode)
  const [scenario, setScenario] = React.useState<Scenario>(initialScenario)
  const [initial] = React.useState(() => (autoPass ? winningRun() : null))
  const [sessions, setSessions] = React.useState<BalanceSession[]>(() => initial?.sessions ?? seed(initialScenario))
  const [step, setStep] = React.useState(0)
  const [open, setOpen] = React.useState<number | null>(null)
  const [status, setStatus] = React.useState<"active" | "passed" | "breached">(initial ? "passed" : "active")
  const [celebrate, setCelebrate] = React.useState<{ label: string; balance: number; count: number } | null>(autoPassModal ? (initial?.celebrate ?? null) : null)

  const funded = mode === "funded"
  const last = sessions[sessions.length - 1]
  const balance = last.balance
  const { levels, peak, locked } = maxLossLevels(START, sessions, MAX_LOSS, TRAILING)
  const level = levels[levels.length - 1]
  const room = last.equity - level
  // Share of the cushion used: from the highest equity (or the start) down to the line.
  const cushionTop = locked ? Math.max(START, ...sessions.map((s) => s.equity)) : peak
  const used = Math.min(1, Math.max(0, (cushionTop - last.equity) / Math.max(1, cushionTop - level)))
  const best = sessions.reduce((a, b) => (b.pnl > a.pnl ? b : a))
  const worst = sessions.reduce((a, b) => (b.pnl < a.pnl ? b : a))
  const selected = open !== null ? sessions[open] : null
  const passSession = funded ? undefined : sessions.find((s) => s.balance >= TARGET)
  const breachIndex = sessions.findIndex((s, i) => s.equity < levels[i + 1])
  const breachSession = breachIndex >= 0 ? sessions[breachIndex] : undefined

  function simulate() {
    if (status !== "active") return
    const script = scenario === "profit" ? WIN_SCRIPT : SCRIPT
    const pnl = script[step % script.length]
    const session = nextSession(sessions, pnl)
    const next = session.balance
    const n = sessions.length
    const nextLevel = maxLossLevels(START, [...sessions, session], MAX_LOSS, TRAILING).levels[n + 1]
    setSessions((prev) => [...prev, session])
    setStep((s) => s + 1)
    const label = `Session #${n + 1}`
    if (session.equity < nextLevel) {
      setStatus("breached")
      toast.error("Max loss breached", { description: `${label} closed with ${money(session.equity)} equity, below the ${money(nextLevel)} max loss. The account is disabled.` })
    } else if (!funded && next >= TARGET) {
      setStatus("passed")
      toast.success("Profit target reached", { description: `${label} closed at ${money(next)}. Phase 1 passed.` })
      setCelebrate({ label, balance: next, count: n + 1 })
    } else if (pnl <= -DAILY_LIMIT) {
      toast.warning("Daily loss limit hit", {
        description: `${label} lost ${money(Math.abs(pnl))}. Trading is paused until 00:00 UTC.`,
      })
    } else {
      toast(`${label} closed`, { description: `${signed(pnl)} · balance ${money(next)}` })
    }
  }

  // Funded: withdraw half the profit at the last close. The first payout locks the max loss at the start balance.
  function payout() {
    const amount = Math.floor((balance - START) / 20) * 10
    if (amount <= 0) return
    setSessions((prev) =>
      prev.map((s, i) =>
        i === prev.length - 1 ? { ...s, balance: s.balance - amount, equity: s.equity - amount, payout: (s.payout ?? 0) + amount } : s
      )
    )
    toast.success("Payout sent", { description: `${money(amount)} withdrawn at session ${last.label}. Max loss locked at ${money(START)}.` })
  }

  function pickMode(next: "challenge" | "funded") {
    setMode(next)
    // Payouts only exist in Funded: going back to Challenge restarts the run.
    if (next === "challenge" && sessions.some((s) => s.payout)) pickScenario(scenario)
  }

  function pickScenario(next: Scenario) {
    setScenario(next)
    setSessions(seed(next))
    setStep(0)
    setStatus("active")
  }

  function reset() {
    setSessions(seed(scenario))
    setStep(0)
    setStatus("active")
    setCelebrate(null)
    toast.info("Snapshots reset", { description: "Back to the 15 recorded sessions." })
  }

  return (
    <div className="flex w-full max-w-[1432px] flex-col gap-3">
      {/* Section header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg leading-6 font-medium text-(color:--content-default)">Snapshots</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" onClick={simulate} disabled={status !== "active"}>
            <Play />
            Simulate session
          </Button>
          {funded && (
            <Button variant="secondary" size="sm" onClick={payout} disabled={status !== "active" || balance <= START}>
              <Money />
              Request payout
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={reset}>
            <Renew />
            Reset
          </Button>
          <Tabs value={scenario} onValueChange={(v) => pickScenario(v as Scenario)}>
            <TabsPillList size="sm" aria-label="Example run">
              <TabsPillTrigger value="profit">Profit run</TabsPillTrigger>
              <TabsPillTrigger value="drawdown">Drawdown</TabsPillTrigger>
            </TabsPillList>
          </Tabs>
          <Tabs value={mode} onValueChange={(v) => pickMode(v as "challenge" | "funded")}>
            <TabsPillList size="sm" aria-label="Account type">
              <TabsPillTrigger value="challenge">Challenge</TabsPillTrigger>
              <TabsPillTrigger value="funded">Funded</TabsPillTrigger>
            </TabsPillList>
          </Tabs>
        </div>
      </div>

      <section className="rounded-(--radius-modal) border border-(--border-grid) bg-(--surface-raised)">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-y-4 border-b border-(--border-grid) px-3.5 py-6 lg:grid-cols-4">
          <Stat label="Balance" value={money(balance)} caption={`start ${money(START)}`} />
          <Stat label="Equity" value={money(last.equity)} tone={last.equity >= START ? "up" : "down"} caption={`${signed(last.equity - balance)} floating`} />
          <Stat label="Daily net P&L" value={signed(last.pnl)} tone={last.pnl >= 0 ? "up" : "down"} caption={`session ${last.label} · ${last.date.split(" · ")[0]}`} />
          <Stat
            label="Sessions traded"
            value={String(sessions.length)}
            caption={`best ${signed(best.pnl)} (${best.label}) · worst ${signed(worst.pnl)} (${worst.label})`}
          />
        </div>

        {/* Chart + rail */}
        <div className="grid gap-8 px-6 pt-6 pb-5 xl:grid-cols-[minmax(0,1fr)_280px]">
          <BalanceRangeChart
            start={START}
            sessions={sessions}
            maxLoss={MAX_LOSS}
            trailing={TRAILING}
            target={funded ? undefined : TARGET}
            height={440}
            onSessionSelect={setOpen}
            activeIndex={pinnedSession}
          />
          <BalanceRangeRail>
            {funded ? (
              <BalanceRangeRailBlock title="Payout available" value={signed(Math.max(0, balance - START))} valueTone="up" caption="Profit above the start balance · no cap" />
            ) : passSession ? (
              <BalanceRangeRailBlock
                title="Profit target"
                value="Phase 1 passed"
                valueTone="up"
                progress={1}
                progressColor="var(--balance-range-up)"
                caption={`Reached at session ${passSession.label} · ${signed(passSession.balance - START)}`}
              />
            ) : (
              <BalanceRangeRailBlock
                title="Profit target"
                value={balance >= TARGET ? "Reached" : `${money(TARGET - balance)} to go`}
                progress={(balance - START) / (TARGET - START)}
                progressColor="var(--balance-range-up)"
                caption={`${Math.max(0, Math.round(((balance - START) / (TARGET - START)) * 100))}% of the way · ${money(Math.max(0, balance - START))} of ${money(TARGET - START)}`}
              />
            )}
            {breachSession ? (
              <BalanceRangeRailBlock
                title="Room to max loss"
                value="Breached"
                progress={1}
                progressColor="var(--balance-range-down)"
                caption={`Equity closed below the ${money(levels[breachIndex + 1])} max loss at session ${breachSession.label} · account disabled`}
              />
            ) : (
              <BalanceRangeRailBlock
                title="Room to max loss"
                value={money(Math.max(0, room))}
                progress={used}
                progressColor="var(--balance-range-down)"
                caption={
                  locked
                    ? `Locked at the start balance ${money(START)} after the first payout · ${Math.round(used * 100)}% used`
                    : `Line at ${money(level)} · trails 6% below the ${money(peak)} high · ${Math.round(used * 100)}% used`
                }
              />
            )}
            <BalanceRangeRailBlock
              title="Daily loss limit"
              value={`${money(Math.max(0, DAILY_LIMIT + Math.min(0, last.pnl)))} left today`}
              progress={Math.min(1, Math.max(0, -last.pnl) / DAILY_LIMIT)}
              progressColor="var(--warning)"
              caption="Resets 00:00 UTC · max position loss 1,000.00 $"
            />
          </BalanceRangeRail>
        </div>
        <BalanceRangeLegend funded={funded} trailing={TRAILING} className="px-6 pb-6" />
      </section>

      {/* Profit target reached */}
      <Modal open={celebrate !== null} onOpenChange={(o) => !o && setCelebrate(null)}>
        <ModalContent size="md">
          {celebrate && (
            <>
              <ModalClose asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Close" className="absolute top-4 right-4">
                  <Close />
                </Button>
              </ModalClose>
              <div className="flex flex-col items-center gap-4 px-6 pt-10 text-center">
                <span className="relative flex size-16 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] [animation-iteration-count:2]" />
                  <CheckmarkFilled className="relative size-8 text-(color:--accent)" />
                </span>
              </div>
              <ModalHeader
                className="pt-4 text-center [&_h2]:text-2xl [&_h2]:leading-8 [&_h2]:font-semibold [&_p]:mx-auto [&>div]:items-center [&>div]:gap-2"
                closable={false}
                eyebrow="Challenge · Phase 1"
                title="Profit target reached"
                description={`${celebrate.label} closed at ${money(celebrate.balance)}. You passed Phase 1 of the evaluation.`}
              />
              <ModalBody>
                <div className="flex flex-col gap-2 rounded-(--radius-modal) border border-(--border-grid) p-4">
                  <div className="flex items-baseline justify-between text-sm leading-[21px]">
                    <span className="text-(color:--content-muted)">Profit target</span>
                    <span className="text-base leading-6 font-medium text-(color:--balance-range-up)">{signed(celebrate.balance - START)}</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-[1px] bg-(--balance-range-segment-empty)">
                    <span className="block h-full w-full rounded-[1px] bg-(--balance-range-up)" />
                  </div>
                  <span className="text-xs leading-[18px] text-(color:--content-muted)">
                    {money(TARGET - START)} goal · {(((celebrate.balance - START) / START) * 100).toFixed(2)}% on {money(START)}
                  </span>
                </div>
                <dl className="mt-4 grid grid-cols-3 gap-x-6 gap-y-4">
                  <Field label="Sessions" value={String(celebrate.count)} />
                  <Field label="Best session" value={signed(best.pnl)} tone="up" />
                  <Field label="Loss limit used" value={`${Math.round(used * 100)}%`} />
                </dl>
              </ModalBody>
              <ModalFooter layout="double">
                <ModalClose asChild>
                  <Button variant="secondary">View chart</Button>
                </ModalClose>
                <ModalClose asChild>
                  <Button onClick={() => toast.success("Phase 2 is ready", { description: "A new Phase 2 account was created with the same rules." })}>
                    Start Phase 2
                  </Button>
                </ModalClose>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Session snapshot */}
      <Modal open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <ModalContent size="md">
          {selected && (
            <>
              <ModalHeader eyebrow={funded ? "Funded account" : "Challenge · Phase 1"} title={`Session ${selected.label}`} description={selected.date} />
              <ModalBody>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <Field label="Balance" value={money(selected.balance)} />
                  <Field label="Equity" value={money(selected.equity)} />
                  <Field label="Session P&L" value={signed(selected.pnl)} tone={selected.pnl >= 0 ? "up" : "down"} />
                  <Field label="Trades" value={String(selected.trades)} />
                  {!funded && <Field label="To profit target" value={money(Math.max(0, TARGET - selected.balance))} />}
                  <Field label="Max loss" value={money(levels[open! + 1])} />
                  <Field label="Equity above max loss" value={money(selected.equity - levels[open! + 1])} />
                </dl>
              </ModalBody>
              <ModalFooter layout="double">
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard?.writeText(`Session ${selected.label} · ${money(selected.balance)} · ${signed(selected.pnl)}`).catch(() => {})
                    toast.success("Snapshot copied", { description: `Session ${selected.label} is on your clipboard.` })
                  }}
                >
                  <Copy />
                  Copy snapshot
                </Button>
                <ModalClose asChild>
                  <Button onClick={() => toast.info("Risk log opened", { description: `Showing the rule checks for session ${selected.label}.` })}>
                    Open risk log
                  </Button>
                </ModalClose>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

function Stat({ label, value, caption, tone }: { label: string; value: string; caption: string; tone?: "up" | "down" }) {
  return (
    <div className="flex flex-col gap-1 border-(--border-grid) px-6 lg:[&:not(:first-child)]:border-l">
      <span className="text-sm leading-[21px] text-(color:--content-muted)">{label}</span>
      <span
        className={
          tone === "up"
            ? "text-xl leading-[26px] font-medium text-(color:--balance-range-up)"
            : tone === "down"
              ? "text-xl leading-[26px] font-medium text-(color:--balance-range-down)"
              : "text-xl leading-[26px] font-medium text-(color:--content-default)"
        }
      >
        {value}
      </span>
      <span className="text-sm leading-[21px] text-(color:--content-muted)">{caption}</span>
    </div>
  )
}

function Field({ label, value, tone }: { label: string; value: string; tone?: "up" | "down" }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs leading-[18px] text-(color:--content-muted)">{label}</dt>
      <dd
        className="text-base leading-6 font-medium"
        style={{ color: tone === "up" ? "var(--balance-range-up)" : tone === "down" ? "var(--balance-range-down)" : "var(--content-default)" }}
      >
        {value}
      </dd>
    </div>
  )
}
