import { config, logger } from "@nypl/node-utils"
import fs from "fs"
let initialized = false

const files = fs.existsSync("config") ? fs.readdirSync("config") : []
console.log("Config files in bundle:", files)

export async function bootstrapConfig() {
  if (initialized) return

  await config.loadConfig(process.env.APP_ENV || "development")

  logger.initialize({
    level: config.getConfig().LOG_LEVEL || "info",
    json: true,
  })

  initialized = true
}
