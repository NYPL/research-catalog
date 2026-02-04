import { config, logger } from "@nypl/node-utils"
import configJson from "../config/vercel-config.json"
import fs from "fs"
let initialized = false

const files = fs.existsSync("config") ? fs.readdirSync("config") : []
console.log("Config files in bundle:", files)

export async function bootstrapConfig() {
  if (initialized) return

  if (process.env.VERCEL) {
    await config.loadConfigFromObject(configJson)
  } else {
    await config.loadConfig(process.env.APP_ENV || "development")
  }

  logger.initialize({
    level: config.getConfig().LOG_LEVEL || "info",
    json: true,
  })

  initialized = true
}
