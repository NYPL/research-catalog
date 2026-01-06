import { config, logger } from "@nypl/node-utils"

let initialized = false

export async function initConfig() {
  if (initialized) return

  await config.loadConfig(process.env.APP_ENV || "development")

  logger.initialize({
    level: config.getConfig().LOG_LEVEL || "info",
  })

  initialized = true
}

export function getConfig() {
  return config.getConfig()
}
