import { test as setup, chromium } from "@playwright/test"

const username = process.env.QA_USERNAME
const password = process.env.QA_PASSWORD

// Logs in the test patron and saves their storage state for the following Playwright tests
setup("authenticate test patron", async () => {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto("")
  console.log("Url rn:", page.url())
  await page.getByRole("link", { name: /my account/i }).click()

  console.log("Url rn 2:", page.url())
  await page.getByLabel(/barcode/i).fill(username)
  await page.getByLabel(/pin/i).fill(password)

  await page.getByRole("button", { name: /submit/i }).click()

  await page.waitForURL("**/account", { timeout: 15000 })

  await page.context().storageState({ path: "playwright/auth/user.json" })

  await browser.close()
})
