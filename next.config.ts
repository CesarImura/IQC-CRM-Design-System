import { existsSync } from "node:fs"
import path from "node:path"
import type { NextConfig } from "next"

// Inside the IQC CRM workspace (../package.json with workspaces) dependencies are hoisted to ../node_modules.
// Point Turbopack at the workspace root only then; a standalone checkout (and Vercel) keeps the default.
const workspaceRoot = path.join(__dirname, "..")
const inWorkspace =
  !existsSync(path.join(__dirname, "node_modules/next")) && existsSync(path.join(workspaceRoot, "node_modules/next"))

const nextConfig: NextConfig = {
  ...(inWorkspace && { turbopack: { root: workspaceRoot } }),
}

export default nextConfig
