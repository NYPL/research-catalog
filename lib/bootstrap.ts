import { config, logger } from "@nypl/node-utils"
import fs from "fs"

const files = fs.existsSync("config") ? fs.readdirSync("config") : []
console.log("Config files in bundle:", files)
console.log("CWD:", process.cwd())
console.log("Files:", fs.readdirSync("config"))

let initialized = false

export async function bootstrapConfig() {
  if (initialized) return
  console.error("Back")

  await config.loadConfig(process.env.APP_ENV || "development")

  logger.initialize({
    level: config.getConfig().LOG_LEVEL || "info",
    json: true,
  })

  initialized = true
}
