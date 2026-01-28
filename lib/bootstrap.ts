import { config, logger } from "@nypl/node-utils"
import fs from "fs"
import path from "path"

let initialized = false

export async function bootstrapConfig() {
  if (initialized) return

  const env = process.env.APP_ENV || "development"

  const configPath = path.join(process.cwd(), "config", `${env}.yaml`)

  if (fs.existsSync(configPath)) {
    console.log(configPath)
    await config.loadConfig(env)
  } else {
    throw new Error(`Config file not found at ${configPath}`)
  }

  logger.initialize({
    level: config.getConfig().LOG_LEVEL || "info",
    json: true,
  })

  initialized = true
}
