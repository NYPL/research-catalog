import { config, logger } from "@nypl/node-utils"

let initialized = false

export async function bootstrapConfig() {
  if (initialized) return
  console.error("Here")

  await config.loadConfig(process.env.APP_ENV || "development")

  logger.initialize({
    level: config.getConfig().LOG_LEVEL || "info",
    json: true,
  })

  initialized = true
}
