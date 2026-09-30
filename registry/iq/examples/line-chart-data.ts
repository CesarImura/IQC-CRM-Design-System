// Sample data shaped like the Figma Line Chart (Orders, 1–20 Jul).

export const categories = Array.from({ length: 20 }, (_, i) => `${i + 1} Jul 2026`)

// Axis labels as drawn in Figma: evenly spaced, not tied to data points.
export const xLabels = ["1 Jul", "2 Jul", "3 Jul", "4 Jul", "5 Jul", "6 Jul", "7 Jul", "8 Jul", "9 Jul", "Today"]

export const newOrders = [1960, 1660, 1660, 1660, 1660, 1680, 1720, 1760, 1740, 1700, 1680, 1920, 1680, 1690, 1680, 1860, 2020, 2100, 2190, 2140]
export const oldOrders = [520, 680, 760, 860, 900, 820, 700, 860, 1020, 980, 760, 1320, 1360, 720, 900, 1020, 1140, 820, 1100, 1480]
export const returns = [220, 200, 380, 560, 440, 360, 200, 190, 470, 180, 260, 340, 260, 210, 190, 220, 270, 330, 200, 30]

// Small cards in Figma use a 0–1.5k scale.
export const newOrdersSmall = [960, 750, 750, 750, 750, 760, 790, 820, 800, 780, 760, 920, 760, 770, 760, 840, 980, 1040, 1100, 1070]
export const oldOrdersSmall = [260, 330, 380, 430, 470, 520, 540, 470, 400, 330, 390, 580, 560, 420, 430, 420, 330, 260, 480, 680]
export const returnsSmall = [420, 380, 460, 520, 420, 360, 500, 420, 380, 300, 460, 620, 480, 420, 400, 380, 300, 260, 540, 820]

// Figma formats the axis as "2,5k" and "$0".
export const formatY = (v: number) => (v === 0 ? "$0" : `${String(v / 1000).replace(".", ",")}k`)

export const ranges = ["24h", "30d", "3m", "1y"]
