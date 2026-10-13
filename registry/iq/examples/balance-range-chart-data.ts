import type { BalanceSession } from "@/registry/iq/ui/balance-range-chart"

// Sample runs for the Balance Range Chart docs: a 100,000 $ Challenge with a 106,000 $ target and a 94,000 $ max loss
// that trails 6% below the highest intraday equity (César, 13 Oct 2026: always trails in Challenge; Funded locks at
// the start balance after the first payout).

export const START = 100_000
export const MAX_LOSS = 94_000
export const TARGET = 106_000
export const DAILY_LIMIT = 1_000
export const TRAILING = true

export type Scenario = "profit" | "drawdown"

// profit: the recorded 15 sessions, highest equity 103,860 $ at #10 (max loss 97,628.40 $).
// drawdown: gains to a 104,200 $ high at #4 (max loss 97,948 $), daily-limit hits at #7 and #11, below the start
// from #9 and a close whose equity sits 192 $ above the trailing max loss.
// spike = how far the intraday high went above the session's open, close and equity.
export const SCENARIOS: Record<Scenario, { closes: number[]; float: number[]; spike: number[]; trades: number[] }> = {
  profit: {
    closes: [100150, 100420, 99780, 101460, 101760, 101180, 102050, 102680, 103210, 103400, 102230, 101950, 102480, 101900, 102400],
    float: [120, -60, 210, 380, -140, 90, 260, -110, 180, 160, -320, 70, 140, -90, 780],
    spike: [180, 240, 160, 320, 210, 150, 280, 190, 260, 300, 140, 120, 200, 110, 90],
    trades: [3, 5, 2, 6, 4, 3, 5, 4, 6, 2, 7, 3, 4, 5, 3],
  },
  drawdown: {
    closes: [100600, 101300, 102900, 103800, 103100, 102200, 100900, 100300, 99400, 99900, 98800, 99100, 98700, 98500, 98380],
    float: [80, 140, 260, 120, -180, -240, -320, 90, -150, -210, -380, -120, -260, -90, -240],
    spike: [150, 200, 240, 280, 120, 100, 90, 110, 80, 130, 70, 90, 60, 80, 50],
    trades: [3, 4, 6, 5, 4, 6, 8, 3, 5, 6, 9, 4, 5, 3, 6],
  },
}
// Scripted P&L for "Simulate session": a few wins, a big loss, then a run to the target.
export const SCRIPT = [620, -840, 1240, -2100, 1480, 960, 1320, 840, -9200]
// Profit run: five sessions that take 102,400 past the 106,000 target (passes on session #20).
export const WIN_SCRIPT = [840, 1240, -420, 960, 1180, 620, -380, 740]

export const money = (v: number) =>
  `${v < 0 ? "−" : ""}${Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $`
export const signed = (v: number) => `${v >= 0 ? "+" : "−"}${money(Math.abs(v))}`

export function dateFor(i: number) {
  const d = new Date(Date.UTC(2026, 8, 20 + i, 21, 0))
  return `${d.getUTCDate().toString().padStart(2, "0")} ${d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" })} 2026 · 21:00 UTC`
}

export function seed(scenario: Scenario = "profit"): BalanceSession[] {
  const { closes, float, spike, trades } = SCENARIOS[scenario]
  return closes.map((balance, i) => {
    const open = i === 0 ? START : closes[i - 1]
    return {
      label: `#${(i + 1).toString().padStart(2, "0")}`,
      date: dateFor(i),
      balance,
      equity: balance + float[i],
      high: Math.max(open, balance, balance + float[i]) + spike[i],
      pnl: balance - open,
      trades: trades[i],
    }
  })
}

/** One simulated session: closes at open + pnl with 140 $ floating and a 200 $ intraday high above both. */
export function nextSession(prev: BalanceSession[], pnl: number): BalanceSession {
  const n = prev.length
  const open = prev[n - 1]?.balance ?? START
  const balance = open + pnl
  return { label: `#${(n + 1).toString().padStart(2, "0")}`, date: dateFor(n), balance, equity: balance + 140, high: Math.max(open, balance + 140) + 200, pnl, trades: 4 }
}

/** Profit run played with WIN_SCRIPT until it closes at or above the target. */
export function winningRun() {
  const base = seed("profit")
  let balance = base[base.length - 1].balance
  const added: BalanceSession[] = []
  for (const pnl of WIN_SCRIPT) {
    const next = nextSession([...base, ...added], pnl)
    balance = next.balance
    added.push(next)
    if (balance >= TARGET) break
  }
  const last = added[added.length - 1]
  return { sessions: [...base, ...added], celebrate: { label: `Session ${last.label.replace("#0", "#")}`, balance: last.balance, count: base.length + added.length } }
}


/** The Drawdown run plus one more session that closes below the max loss. */
export function breachedRun(): BalanceSession[] {
  const base = seed("drawdown")
  const last = base[base.length - 1]
  const balance = 93_180
  return [...base, { label: "#16", date: dateFor(15), balance, equity: balance - 120, pnl: balance - last.balance, trades: 7 }]
}
