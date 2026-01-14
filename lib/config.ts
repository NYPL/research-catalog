import { config, logger } from "@nypl/node-utils"

let initialized = false

/**
 * Ensure that config is loaded and logger is initialized.
 */
export async function ensureConfig() {
  if (!initialized) {
    await config.loadConfig(process.env.APP_ENV || "development")
    logger.initialize({
      level: config.getConfig().LOG_LEVEL || "info",
    })

    initialized = true
  }
  return config
}

/**
 * Throws if called before config is loaded.
 */
export function getConfig() {
  if (!initialized) {
    throw new Error(
      "NYPL node-utils config has not been initialized. Call ensureConfig() first."
    )
  }
  return config.getConfig()
}
