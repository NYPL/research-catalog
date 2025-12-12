import { test as setup, chromium } from "@playwright/test"

const STORAGE_PATH = "playwright/auth/user.json"

const username = process.env.QA_USERNAME
const password = process.env.QA_PASSWORD

setup("authenticate test patron", async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto("http://local.nypl.org:8080/research/research-catalog")
  await page.getByRole("link", { name: /my account/i }).click()

  await page.getByLabel(/barcode/i).fill(username)
  await page.getByLabel(/pin/i).fill(password)

  await page.getByRole("button", { name: /submit/i }).click()

  await page.waitForURL("**/account")

  await page.context().storageState({ path: STORAGE_PATH })

  await browser.close()
})
