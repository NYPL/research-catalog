import { test as setup } from "@playwright/test"
import { setUpTestPatron } from "./utils"

setup("reset test patron account data", async () => {
  await setUpTestPatron()
})
