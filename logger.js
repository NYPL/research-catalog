import { logger, config } from "@nypl/node-utils"

let initialized = false

export async function initLogger() {
  if (initialized) return logger

  await config.loadConfig(process.env.NODE_ENV || "development")

  logger.initialize({
    level: process.env.LOG_LEVEL || "info",
    json: true,
  })

  initialized = true
  return logger
}

export default logger
