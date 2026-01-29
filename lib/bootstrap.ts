import { config, logger } from "@nypl/node-utils"
import fs from "fs"
import path from "path"
import yaml from "js-yaml"

let initialized = false

export async function bootstrapConfig() {
  if (initialized) return

  const env = process.env.APP_ENV || "development"
  const configPath = path.join(process.cwd(), "config", `${env}.yaml`)

  if (!fs.existsSync(configPath)) {
    console.log(`Generating temp config for ${env}`)
    const tmpYaml = yaml.dump({
      PLAINTEXT_VARIABLES: {
        LOG_LEVEL: process.env.LOG_LEVEL || "info",
        PLATFORM_API_CLIENT_ID: process.env.PLATFORM_API_CLIENT_ID,
        PLATFORM_API_CLIENT_SECRET: process.env.PLATFORM_API_CLIENT_SECRET,
        SIERRA_SECRET: process.env.SIERRA_SECRET,
        SIERRA_BASE: process.env.SIERRA_BASE,
        SIERRA_KEY: process.env.SIERRA_KEY,
      },
      ENCRYPTED_VARIABLES: {},
    })
    fs.writeFileSync(configPath, tmpYaml)
  }

  await config.loadConfig(env)

  logger.initialize({
    level: config.getConfig().LOG_LEVEL || "info",
    json: true,
  })

  initialized = true
}
