import { config, logger } from "@nypl/node-utils"
import fs from "fs"
import path from "path"

let initialized = false

export async function bootstrapConfig() {
  if (initialized) return

  const env = process.env.APP_ENV || "development"
  const configPath = path.join(process.cwd(), "config", `${env}.yaml`)

  if (fs.existsSync(configPath)) {
    await config.loadConfig(env)
  } else {
    config.loadConfig({
      PLAINTEXT_VARIABLES: {
        LOG_LEVEL: process.env.LOG_LEVEL || "info",
        SIERRA_BASE: process.env.SIERRA_BASE,
      },
      ENCRYPTED_VARIABLES: {
        SIERRA_KEY: process.env.SIERRA_KEY,
        SIERRA_SECRET: process.env.SIERRA_SECRET,
        PLATFORM_API_CLIENT_ID: process.env.PLATFORM_API_CLIENT_ID,
        PLATFORM_API_CLIENT_SECRET: process.env.PLATFORM_API_CLIENT_SECRET,
      },
    })
  }

  logger.initialize({
    level: config.getConfig().LOG_LEVEL || "info",
    json: true,
  })

  initialized = true
}
