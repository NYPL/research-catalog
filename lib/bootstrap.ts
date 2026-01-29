import { config, logger } from "@nypl/node-utils"
import fs from "fs"
import path from "path"

console.log("CWD:", process.cwd())
const configDir = path.join(process.cwd(), "config")
console.log("Config dir exists:", fs.existsSync(configDir))
console.log(
  "Config files:",
  fs.existsSync(configDir) ? fs.readdirSync(configDir) : []
)

let initialized = false

export async function bootstrapConfig() {
  if (initialized) return

  await config.loadConfig(process.env.APP_ENV || "development")

  logger.initialize({
    level: config.getConfig().LOG_LEVEL || "info",
    json: true,
  })

  initialized = true
}
