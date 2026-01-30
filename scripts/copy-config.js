import fs from "fs"
import path from "path"

const src = path.resolve("config")
const dest = path.resolve(".next/standalone/config")

fs.mkdirSync(dest, { recursive: true })

for (const file of fs.readdirSync(src)) {
  fs.copyFileSync(path.join(src, file), path.join(dest, file))
}

console.log("Copied config YAML into standalone output")
