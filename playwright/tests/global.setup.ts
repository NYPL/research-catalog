import { test as setup } from "@playwright/test"
import { resetPatronData } from "./utils"

setup("reset test patron account data", async () => {
  await resetPatronData()
})
