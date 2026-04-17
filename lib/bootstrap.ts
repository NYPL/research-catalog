import { config, logger } from "@nypl/node-utils"
import configJson from "../config/vercel-config.json"
let initialized = false

export async function bootstrapConfig() {
  if (initialized) return

  console.log(process.env.NODE_ENV, process.env.NEXT_PUBLIC_APP_ENV)
  if (process.env.VERCEL) {
    await config.loadConfigFromObject(configJson)
  } else {
    await config.loadConfig(process.env.NEXT_PUBLIC_APP_ENV || "development")
  }

  logger.initialize({
    level: config.getConfig().LOG_LEVEL || "info",
    json: true,
  })

  initialized = true
}
