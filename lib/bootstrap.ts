import { config, logger } from "@nypl/node-utils"
import configJson from "../config/vercel-config.json"
let initialized = false

export async function bootstrapConfig() {
  if (initialized) return

  if (process.env.VERCEL) {
    console.log("CONFIG KEYS", Object.keys(configJson))
    await config.loadConfigFromObject(configJson)
  } else {
    console.log("BOOTSTRAP START", Date.now())
    await config.loadConfig(process.env.NEXT_PUBLIC_APP_ENV || "development")
  }

  logger.initialize({
    level: config.getConfig().LOG_LEVEL || "info",
    json: true,
  })

  initialized = true
}
