import fs from "fs"
import path from "path"

const dir = path.join(process.cwd(), "config")
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

const yaml = `
PLAINTEXT_VARIABLES:
  LOG_LEVEL: info
  SIERRA_BASE: \${SIERRA_BASE}
  AWS_REGION: \${AWS_REGION}

ENCRYPTED_VARIABLES:
  SIERRA_SECRET: \${SIERRA_SECRET}
  SIERRA_KEY: \${SIERRA_KEY}
  PLATFORM_API_CLIENT_ID: \${PLATFORM_API_CLIENT_ID}
  PLATFORM_API_CLIENT_SECRET: \${PLATFORM_API_CLIENT_SECRET}
  AWS_ACCESS_KEY_ID: \${AWS_ACCESS_KEY_ID}
  AWS_SECRET_ACCESS_KEY: \${AWS_SECRET_ACCESS_KEY}
`

fs.writeFileSync(path.join(dir, "development.yaml"), yaml.trim())

console.log("Generated config/development.yaml at build time")
